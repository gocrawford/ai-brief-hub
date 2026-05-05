#!/usr/bin/env node
// Render podcast.json into a final MP3 via ElevenLabs TTS + ffmpeg stitching.
// Usage: ELEVENLABS_API_KEY=xxx node scripts/render_podcast.mjs <week_start>
//   or:  node scripts/render_podcast.mjs <week_start> (loads from .secrets/elevenlabs.env)

import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawn } from 'node:child_process';

const REPO_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WORKSPACE_ROOT = path.resolve(REPO_ROOT, '..');

// Load API key
let API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  const envPath = path.join(WORKSPACE_ROOT, '.secrets', 'elevenlabs.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    const match = content.match(/ELEVENLABS_API_KEY=(.+)/);
    if (match) API_KEY = match[1].trim();
  }
}
if (!API_KEY) {
  console.error('ELEVENLABS_API_KEY not set');
  process.exit(1);
}

const weekStart = process.argv[2];
if (!weekStart) {
  console.error('Usage: node render_podcast.mjs <week_start>');
  process.exit(1);
}

const dataDir = path.join(REPO_ROOT, 'data', weekStart);
const audioOutDir = path.join(REPO_ROOT, 'site', 'public', 'audio', weekStart);
const audioAssetsDir = path.join(REPO_ROOT, 'site', 'public', 'audio');
const tmpDir = path.join(WORKSPACE_ROOT, 'podcast_tmp', weekStart);

fs.mkdirSync(audioOutDir, { recursive: true });
fs.mkdirSync(tmpDir, { recursive: true });

const script = JSON.parse(fs.readFileSync(path.join(dataDir, 'podcast.json'), 'utf-8'));
console.log(`Rendering: ${script.title}`);
console.log(`Segments: ${script.segments.length}`);

// Per-character voice settings — tuned for energetic, podcast-ready delivery
// speed: 1.0 = baseline, 1.10 = ~10% faster (caps at 1.20 in API)
// Lower stability = more emotional range. style adds expressive variation.
const VOICE_SETTINGS = {
  default:           { stability: 0.40, similarity_boost: 0.75, style: 0.45, speed: 1.10, use_speaker_boost: true },
  'Jordan Reeves':   { stability: 0.45, similarity_boost: 0.78, style: 0.50, speed: 1.10, use_speaker_boost: true }, // anchor: alive but steady
  'Marcus Chen':     { stability: 0.35, similarity_boost: 0.75, style: 0.60, speed: 1.12, use_speaker_boost: true }, // energetic, fastest
  'Priya Shah':      { stability: 0.35, similarity_boost: 0.75, style: 0.60, speed: 1.10, use_speaker_boost: true }, // playful, fragments
  'Sam Whitaker':    { stability: 0.45, similarity_boost: 0.75, style: 0.45, speed: 1.08, use_speaker_boost: true }, // laid-back, slightly slower
  'Maya Okonkwo':    { stability: 0.45, similarity_boost: 0.78, style: 0.45, speed: 1.10, use_speaker_boost: true }, // precise but warm
  'Diego Alvarez':   { stability: 0.40, similarity_boost: 0.78, style: 0.55, speed: 1.10, use_speaker_boost: true }, // confident energy
  'Lena Park':       { stability: 0.38, similarity_boost: 0.75, style: 0.60, speed: 1.10, use_speaker_boost: true }, // observational, vivid
  'Dr. Aaron Vogel': { stability: 0.50, similarity_boost: 0.78, style: 0.40, speed: 1.06, use_speaker_boost: true }, // sober, slightly slower
};

async function ttsRender(text, voiceId, character, outPath) {
  const settings = VOICE_SETTINGS[character] || VOICE_SETTINGS.default;
  const body = {
    text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: settings,
  };

  // Retry up to 3 times with exponential backoff
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`HTTP ${res.status}: ${err.slice(0, 300)}`);
      }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1000) throw new Error(`Suspiciously small payload: ${buf.length} bytes`);
      fs.writeFileSync(outPath, buf);
      return;
    } catch (e) {
      if (attempt === 3) throw e;
      console.log(`    retry ${attempt}: ${e.message}`);
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
}

// Render all spoken segments in parallel batches (5 at a time to be polite)
const segments = script.segments;
const renderQueue = [];
for (let i = 0; i < segments.length; i++) {
  const seg = segments[i];
  if (seg.speaker === 'music') continue;
  if (!seg.text || !seg.voice_id) continue;
  const outPath = path.join(tmpDir, `seg_${String(i).padStart(2, '0')}_${seg.id}.mp3`);
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) {
    console.log(`  [cached] ${seg.id} (${seg.character})`);
    seg._audioPath = outPath;
    continue;
  }
  renderQueue.push({ seg, idx: i, outPath });
}

console.log(`\nTTS queue: ${renderQueue.length} segments to render`);
const BATCH = 5;
for (let b = 0; b < renderQueue.length; b += BATCH) {
  const batch = renderQueue.slice(b, b + BATCH);
  await Promise.all(batch.map(async ({ seg, idx, outPath }) => {
    console.log(`  [${idx+1}/${segments.length}] ${seg.id} (${seg.character}, ${seg.text.length} chars)`);
    await ttsRender(seg.text, seg.voice_id, seg.character, outPath);
    seg._audioPath = outPath;
  }));
}

// Resolve music asset paths
for (const seg of segments) {
  if (seg.speaker === 'music') {
    seg._audioPath = path.join(audioAssetsDir, `${seg.asset}.mp3`);
    if (!fs.existsSync(seg._audioPath)) {
      throw new Error(`Music asset missing: ${seg._audioPath}`);
    }
  }
}

// Build ffmpeg concat list
console.log('\nStitching final MP3 with ffmpeg...');
const concatList = path.join(tmpDir, 'concat.txt');
const lines = [];

// Add slight pause between segments (200ms silence files generated as needed)
const silencePath = path.join(tmpDir, 'silence_400ms.mp3');
if (!fs.existsSync(silencePath)) {
  execSync(`ffmpeg -y -f lavfi -i "anullsrc=r=44100:cl=stereo" -t 0.4 -b:a 192k "${silencePath}"`, { stdio: ['ignore', 'ignore', 'inherit'] });
}
const stingGapPath = path.join(tmpDir, 'silence_300ms.mp3');
if (!fs.existsSync(stingGapPath)) {
  execSync(`ffmpeg -y -f lavfi -i "anullsrc=r=44100:cl=stereo" -t 0.3 -b:a 192k "${stingGapPath}"`, { stdio: ['ignore', 'ignore', 'inherit'] });
}

// Normalize each input to common sample rate / channels before concat
const normalizedDir = path.join(tmpDir, 'normalized');
fs.mkdirSync(normalizedDir, { recursive: true });

for (let i = 0; i < segments.length; i++) {
  const seg = segments[i];
  const inputPath = seg._audioPath;
  const normPath = path.join(normalizedDir, `n_${String(i).padStart(2, '0')}.mp3`);
  if (!fs.existsSync(normPath)) {
    // Re-encode to consistent format (44100 Hz, stereo, 192kbps)
    execSync(`ffmpeg -y -i "${inputPath}" -ar 44100 -ac 2 -b:a 192k -af "loudnorm=I=-16:LRA=11:TP=-1.5" "${normPath}"`, { stdio: ['ignore', 'ignore', 'pipe'] });
  }
  lines.push(`file '${normPath}'`);

  // Add silence after spoken segments (not after music or final segment)
  if (seg.speaker !== 'music' && i < segments.length - 1) {
    const next = segments[i + 1];
    if (next.speaker === 'music' && next.asset === 'sting') {
      // Tiny gap before sting
      lines.push(`file '${stingGapPath}'`);
    } else if (seg.speaker !== 'music') {
      lines.push(`file '${silencePath}'`);
    }
  }
}

fs.writeFileSync(concatList, lines.join('\n'));

const finalPath = path.join(audioOutDir, 'episode.mp3');
execSync(`ffmpeg -y -f concat -safe 0 -i "${concatList}" -c:a libmp3lame -b:a 192k -ar 44100 -ac 2 "${finalPath}"`, { stdio: ['ignore', 'ignore', 'inherit'] });

// Probe duration
const dur = execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${finalPath}"`).toString().trim();
const sizeMB = (fs.statSync(finalPath).size / 1024 / 1024).toFixed(2);
const min = Math.floor(parseFloat(dur) / 60);
const sec = Math.round(parseFloat(dur) % 60);

console.log(`\n✓ Episode rendered: ${finalPath}`);
console.log(`  Duration: ${min}m ${sec}s`);
console.log(`  Size: ${sizeMB} MB`);

// Build cast list from segments (unique character/role pairs)
const seenChars = new Set();
const cast = [];
for (const seg of segments) {
  if (!seg.character || seenChars.has(seg.character)) continue;
  seenChars.add(seg.character);
  const role = seg.speaker === 'anchor'
    ? 'Anchor'
    : seg.speaker?.replace(/_correspondent$/, '').replace(/^./, c => c.toUpperCase()) + ' correspondent';
  cast.push({ role, character: seg.character });
}

// Write episode metadata (also written into data/<week>/podcast.meta.json so the
// cron's `cp -r data/<week> site/public/data/<week>` step propagates it.)
const meta = {
  week_start: weekStart,
  week_end: script.week_end,
  title: script.title,
  headline: script.headline,
  audio_url: `/audio/${weekStart}/episode.mp3`,
  duration_seconds: parseFloat(dur),
  duration_human: `${min}m ${sec}s`,
  size_bytes: fs.statSync(finalPath).size,
  bitrate_kbps: 192,
  cast,
  music_credit: 'Music: Kevin MacLeod (incompetech.com), CC-BY 4.0',
  generated_at: new Date().toISOString(),
};
fs.writeFileSync(path.join(audioOutDir, 'episode.json'), JSON.stringify(meta, null, 2));
console.log(`  Meta: ${path.join(audioOutDir, 'episode.json')}`);

// Also write the manifest into the data tree so the cron's data→site copy step picks it up.
const dataMetaPath = path.join(dataDir, 'podcast.meta.json');
fs.writeFileSync(dataMetaPath, JSON.stringify(meta, null, 2));
console.log(`  Manifest: ${dataMetaPath}`);
