import { useEffect, useRef, useState } from "react";
import { Play, Pause, Download, Headphones, Rewind, FastForward } from "lucide-react";
import type { PodcastEpisode } from "../types";

function fmt(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const SPEEDS = [1, 1.1, 1.25, 1.5];

export default function PodcastPlayer({ episode }: { episode: PodcastEpisode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(episode.duration_seconds || 0);
  const [speed, setSpeed] = useState(1);
  const [scrubbing, setScrubbing] = useState(false);

  // Reset on episode change
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    setPlaying(false);
    setCurrent(0);
    setDuration(episode.duration_seconds || 0);
  }, [episode.audio_url, episode.duration_seconds]);

  // Audio event wiring
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => { if (!scrubbing) setCurrent(a.currentTime); };
    const onMeta = () => setDuration(a.duration || episode.duration_seconds);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => { setPlaying(false); setCurrent(0); };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnd);
    };
  }, [scrubbing, episode.duration_seconds]);

  // Apply playback rate
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed, episode.audio_url]);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  }

  function skip(delta: number) {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(duration, a.currentTime + delta));
  }

  function onSeekChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseFloat(e.target.value);
    setCurrent(v);
  }
  function onSeekCommit() {
    if (audioRef.current) audioRef.current.currentTime = current;
    setScrubbing(false);
  }

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className="mt-7 relative z-10 rounded-xl border border-amber-400/20 bg-gradient-to-br from-amber-950/30 via-slate-900/40 to-slate-900/60 backdrop-blur-sm p-4 md:p-5 shadow-[0_0_40px_-12px_rgba(251,191,36,0.25)]">
      <audio ref={audioRef} src={episode.audio_url} preload="metadata" />

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Play button + label */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={toggle}
            aria-label={playing ? "Pause episode" : "Play episode"}
            className="flex-none w-12 h-12 md:w-14 md:h-14 rounded-full bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 grid place-items-center transition shadow-lg shadow-amber-400/20"
          >
            {playing ? <Pause className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" /> : <Play className="w-5 h-5 md:w-6 md:h-6 translate-x-[1px]" fill="currentColor" />}
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-amber-300 uppercase">
              <Headphones className="w-3 h-3" />
              <span>Listen · {fmt(duration)}</span>
            </div>
            <div className="text-white text-sm md:text-base font-medium leading-tight mt-0.5">
              {episode.title}
            </div>
          </div>
        </div>

        {/* Scrubber + controls (full width on mobile, fills remaining on desktop) */}
        <div className="flex-1 flex items-center gap-3 min-w-0">
          <span className="font-mono text-xs text-slate-300 tabular-nums w-12 text-right hidden sm:inline">{fmt(current)}</span>

          <div className="relative flex-1 h-9 flex items-center group">
            {/* Track background */}
            <div className="absolute inset-x-0 h-1 rounded-full bg-white/10" />
            {/* Progress fill */}
            <div className="absolute h-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 pointer-events-none" style={{ width: `${pct}%` }} />
            {/* Native input on top, transparent */}
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={1}
              value={current}
              onChange={onSeekChange}
              onMouseDown={() => setScrubbing(true)}
              onTouchStart={() => setScrubbing(true)}
              onMouseUp={onSeekCommit}
              onTouchEnd={onSeekCommit}
              onKeyUp={onSeekCommit}
              aria-label="Seek"
              className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                         [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-300
                         [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(251,191,36,0.2)]
                         [&::-webkit-slider-thumb]:transition-transform
                         hover:[&::-webkit-slider-thumb]:scale-125
                         [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5
                         [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-300
                         [&::-moz-range-thumb]:border-0"
            />
          </div>

          <span className="font-mono text-xs text-slate-300 tabular-nums w-12 hidden sm:inline">{fmt(duration - current)}</span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => skip(-15)}
              aria-label="Back 15 seconds"
              className="hidden sm:grid place-items-center w-8 h-8 rounded-full hover:bg-white/5 text-slate-300 hover:text-white transition"
              title="Back 15s"
            >
              <Rewind className="w-4 h-4" />
            </button>
            <button
              onClick={() => skip(30)}
              aria-label="Forward 30 seconds"
              className="hidden sm:grid place-items-center w-8 h-8 rounded-full hover:bg-white/5 text-slate-300 hover:text-white transition"
              title="Forward 30s"
            >
              <FastForward className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const i = SPEEDS.indexOf(speed);
                setSpeed(SPEEDS[(i + 1) % SPEEDS.length]);
              }}
              aria-label={`Playback speed ${speed}x`}
              className="font-mono text-[11px] tabular-nums px-2 h-8 rounded-md hover:bg-white/5 text-slate-300 hover:text-amber-300 transition border border-white/10"
              title="Playback speed"
            >
              {speed}×
            </button>
            <a
              href={episode.audio_url}
              download
              aria-label="Download MP3"
              className="grid place-items-center w-8 h-8 rounded-full hover:bg-white/5 text-slate-300 hover:text-white transition"
              title="Download MP3"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile time row */}
      <div className="sm:hidden mt-2 flex items-center justify-between font-mono text-xs text-slate-300 tabular-nums">
        <span>{fmt(current)}</span>
        <span>{fmt(duration)}</span>
      </div>

      {episode.music_credit && (
        <div className="mt-3 text-[11px] text-slate-400 font-mono leading-snug">
          {episode.music_credit}
        </div>
      )}
    </div>
  );
}
