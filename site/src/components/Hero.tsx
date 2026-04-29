import { Shield, Zap, Calendar } from "lucide-react";
import type { Meta, WeekIndexEntry } from "../types";
import Logo from "./Logo";

const TAB_LABELS: Record<string, string> = {
  youtube: "YouTube Videos",
  x: "X.com Posts",
  reddit: "Reddit Threads",
  builders: "Builder Stories",
  launches: "New Launches",
  social: "Social Posts",
  research: "Primary Sources",
};

export default function Hero({
  meta,
  weeks,
  activeWeek,
  onSelectWeek,
}: {
  meta: Meta;
  weeks: WeekIndexEntry[];
  activeWeek: string;
  onSelectWeek: (weekStart: string) => void;
}) {
  return (
    <header className="hero-bg border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-8 relative">
        {/* Top row: logo + briefing badge */}
        <div className="flex items-center gap-3 mb-8 relative z-10">
          <Logo size={26} className="text-amber-400" />
          <span className="font-mono text-[11px] tracking-[0.18em] text-amber-300 uppercase border border-amber-400/30 rounded-full px-3 py-1 bg-amber-400/5 inline-flex items-center gap-2">
            <Shield className="w-3 h-3" />
            Intelligence Briefing
          </span>
        </div>

        {/* Title */}
        <div className="relative z-10">
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.05] text-white">
            Weekly AI{" "}
            <span className="bg-amber-gradient bg-clip-text text-transparent">
              Intelligence Hub
            </span>
          </h1>

          {/* Week + latest pill */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="pill pill-amber font-mono">
              <Calendar className="w-3.5 h-3.5" />
              {meta.week_label}
            </span>
            {weeks.find((w) => w.week_start === activeWeek)?.is_latest && (
              <span className="pill pill-amber">
                <Zap className="w-3.5 h-3.5" />
                LATEST BRIEF
              </span>
            )}
          </div>

          <p className="mt-5 text-slate-400 max-w-2xl text-sm leading-relaxed">
            Multi-source intelligence aggregated across YouTube, X.com, Reddit,
            developer communities, product launches, social platforms, and
            primary research and regulatory sources. Select a source below to
            explore.
          </p>

          {/* Stat pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {meta.tabs.map((t) => (
              <span key={t.tab_id} className="pill">
                <span className="font-mono text-amber-300 mr-1">{t.item_count}</span>
                {TAB_LABELS[t.tab_id] ?? t.tab_id}
              </span>
            ))}
          </div>
        </div>

        {/* Week archive */}
        {weeks.length > 1 && (
          <div className="mt-10 relative z-10">
            <div className="flex items-center gap-2 mb-3 text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">
              <Calendar className="w-3 h-3" />
              Week Archive
            </div>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
              {weeks.map((w) => (
                <button
                  key={w.week_start}
                  onClick={() => onSelectWeek(w.week_start)}
                  className={`shrink-0 px-3 py-2 rounded-lg border text-xs transition-all ${
                    w.week_start === activeWeek
                      ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                      : "border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200"
                  }`}
                >
                  <span className="font-mono">{w.week_label}</span>
                  {w.is_latest && (
                    <span className="ml-2 text-[9px] text-amber-300 uppercase tracking-wider">
                      Latest
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
