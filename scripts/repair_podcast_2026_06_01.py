#!/usr/bin/env python3
"""Transform 2026-06-01 podcast.json from the subagent's variant shape to
the renderer's expected shape. Idempotent — re-run safe.

Renderer expects per spoken segment:
  id, speaker, character, voice_id, text, [post_silence_ms]
Renderer expects per music segment:
  id, speaker='music', asset, duration_ms
"""
import json, shutil
from pathlib import Path

DATA = Path('/home/user/workspace/ai-brief-hub/data/2026-06-01/podcast.json')
BACKUP = DATA.with_suffix('.json.bak')

if not BACKUP.exists():
    shutil.copy(DATA, BACKUP)

p = json.loads(DATA.read_text())

# Voice/speaker mapping
char_to_speaker = {
    'Jordan Reeves': 'anchor',
    'Marcus Chen': 'youtube_correspondent',
    'Priya Shah': 'x_correspondent',
    'Sam Whitaker': 'reddit_correspondent',
    'Maya Okonkwo': 'builders_correspondent',
    'Diego Alvarez': 'launches_correspondent',
    'Lena Park': 'social_correspondent',
    'Dr. Aaron Vogel': 'research_correspondent',
}

# Sting asset rotation — match the file structure used in prior weeks
# (we'll use 'sting' for inter-segment stings and 'intro_bed' for the first one)
new_segments = []
for i, s in enumerate(p['segments']):
    stype = s.get('type')
    if stype == 'sting':
        # First sting after cold_open uses intro_bed; the rest use the short sting
        asset = 'intro_bed' if s.get('segment_id') == 'intro_music' else 'sting'
        duration_ms = '6000' if asset == 'intro_bed' else '1500'
        new_segments.append({
            'id': s.get('segment_id', f'sting_{i}'),
            'speaker': 'music',
            'asset': asset,
            'duration_ms': duration_ms,
        })
        continue

    # Spoken segment
    character = s.get('speaker')
    speaker_role = char_to_speaker.get(character, 'anchor')
    out = {
        'id': s.get('segment_id', f'seg_{i}'),
        'speaker': speaker_role,
        'character': character,
        'voice_id': s.get('voice_id'),
        'text': s.get('script') or s.get('text') or '',
    }
    # Add post_silence_ms for major transitions
    if stype in ('cold_open', 'correspondent', 'what_to_watch'):
        out['post_silence_ms'] = '400' if stype != 'correspondent' else '300'
    new_segments.append(out)

p['segments'] = new_segments

DATA.write_text(json.dumps(p, indent=2))

# Sanity
spoken = [s for s in new_segments if s['speaker'] != 'music']
empty = [s for s in spoken if not s.get('text', '').strip()]
print(f'Total segments: {len(new_segments)}')
print(f'Spoken: {len(spoken)}, Music: {len(new_segments) - len(spoken)}')
print(f'Empty-text spoken segments: {len(empty)}')
if empty:
    for s in empty:
        print('  EMPTY:', s['id'])
total_chars = sum(len(s['text']) for s in spoken)
print(f'Total spoken chars: {total_chars}  (~{total_chars/15:.0f} sec @ 15 cps)')
