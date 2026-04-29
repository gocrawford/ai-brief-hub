import { Compass, ArrowRight, Sparkles, TrendingUp, RotateCw, ExternalLink, Zap } from "lucide-react";
import type { Overview, OverviewTheme, NinetySecondBriefItem, ThemeTrackerEntry, TabId } from "../types";

const TAB_LABELS: Record<TabId, string> = {
  youtube: "YouTube",
  x: "X.com",
  reddit: "Reddit",
  builders: "Builders",
  launches: "Launches",
  social: "Social",
  research: "Research",
};

function recurrenceStyle(status: string): { label: string; classes: string } {
  switch (status) {
    case "new":
      return { label: "NEW THIS WEEK", classes: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" };
    case "intensifying":
      return { label: "INTENSIFYING", classes: "border-amber-400/40 bg-amber-400/10 text-amber-300" };
    case "returning":
      return { label: "RETURNING", classes: "border-sky-400/40 bg-sky-400/10 text-sky-300" };
    case "fading":
      return { label: "FADING", classes: "border-slate-500/40 bg-slate-500/10 text-slate-400" };
    default:
      return { label: status.toUpperCase(), classes: "border-slate-500/30 bg-slate-500/10 text-slate-400" };
  }
}

function CitationChip({
  tab_id,
  item_id,
  label,
  onNavigate,
}: {
  tab_id: TabId;
  item_id: string;
  label: string;
  onNavigate: (tabId: TabId, itemId: string) => void;
}) {
  return (
    <button
      onClick={() => onNavigate(tab_id, item_id)}
      className="inline-flex items-center gap-2 max-w-full text-left px-2.5 py-1.5 rounded-md border border-white/10 bg-white/[0.02] hover:bg-amber-400/10 hover:border-amber-400/40 transition-colors group"
    >
      <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400/80 group-hover:text-amber-300 shrink-0">
        {TAB_LABELS[tab_id]}
      </span>
      <span className="text-xs text-slate-300 group-hover:text-white truncate">{label}</span>
      <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-amber-300 shrink-0" />
    </button>
  );
}

function ThemeCard({
  theme,
  index,
  onNavigate,
}: {
  theme: OverviewTheme;
  index: number;
  onNavigate: (tabId: TabId, itemId: string) => void;
}) {
  const rec = recurrenceStyle(theme.recurrence.status);
  const cited_tabs = Array.from(new Set(theme.citations.map((c) => c.tab_id)));

  return (
    <article className="card p-6 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
          Theme {String(index + 1).padStart(2, "0")}
        </span>
        <span className={`pill text-[10px] tracking-wider border ${rec.classes}`}>
          {rec.label}
          {theme.recurrence.weeks_count > 1 && (
            <span className="ml-1 opacity-70">· wk {theme.recurrence.weeks_count}</span>
          )}
        </span>
        <span className="font-mono text-[10px] text-slate-500">
          {cited_tabs.length} {cited_tabs.length === 1 ? "source" : "sources"} · {theme.citations.length} citation
          {theme.citations.length === 1 ? "" : "s"}
        </span>
      </div>

      <h3 className="font-display text-xl text-white leading-snug">{theme.headline}</h3>

      <p className="text-sm text-slate-300 leading-relaxed">{theme.summary}</p>

      <div className="bg-amber-400/[0.04] border border-amber-400/20 rounded-md p-3">
        <div className="font-mono text-[10px] tracking-[0.18em] text-amber-300/80 uppercase mb-1.5">
          Implication
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">{theme.implication}</p>
      </div>

      <div>
        <div className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase mb-2">
          Evidence across sources
        </div>
        <div className="flex flex-wrap gap-1.5">
          {theme.citations.map((c, i) => (
            <CitationChip key={`${c.tab_id}-${c.item_id}-${i}`} {...c} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      {theme.tags && theme.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {theme.tags.map((t) => (
            <span key={t} className="font-mono text-[10px] text-slate-500">
              #{t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

function NinetySecondBrief({
  items,
  onNavigate,
}: {
  items: NinetySecondBriefItem[];
  onNavigate: (tabId: TabId, itemId: string) => void;
}) {
  return (
    <section id="ninety-second-brief" className="scroll-mt-32">
      <div className="flex items-baseline gap-3 mb-2">
        <Zap className="w-4 h-4 text-amber-400" />
        <h2 className="font-display text-2xl text-white">The Brief in 90 Seconds</h2>
      </div>
      <p className="text-sm text-slate-400 mb-6">
        The highest-signal items across all seven sources, ranked by composite score. If you only have ninety seconds, read this list.
      </p>
      <ol className="space-y-2">
        {items.map((item, i) => (
          <li key={`${item.tab_id}-${item.item_id}`}>
            <button
              onClick={() => onNavigate(item.tab_id, item.item_id)}
              className="w-full flex items-start gap-4 p-4 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-amber-400/[0.03] hover:border-amber-400/30 transition-colors text-left group"
            >
              <span className="font-mono text-xs text-slate-500 mt-0.5 w-6 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-amber-300/80">
                    {TAB_LABELS[item.tab_id]}
                  </span>
                  {item.source_label && (
                    <span className="font-mono text-[10px] text-slate-500">· {item.source_label}</span>
                  )}
                  <span className="font-mono text-[10px] text-slate-400">· {item.score.toFixed(1)}/10</span>
                </div>
                <div className="text-sm font-medium text-white leading-snug group-hover:text-amber-100">
                  {item.title}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">{item.one_line}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-300 mt-1 shrink-0" />
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ThemeTracker({ entries }: { entries: ThemeTrackerEntry[] }) {
  if (!entries || entries.length === 0) return null;
  return (
    <section id="theme-tracker" className="scroll-mt-32">
      <div className="flex items-baseline gap-3 mb-2">
        <RotateCw className="w-4 h-4 text-sky-400" />
        <h2 className="font-display text-2xl text-white">Theme Tracker</h2>
      </div>
      <p className="text-sm text-slate-400 mb-6">
        Themes that have appeared in two or more weeks. Intensity = how many sources cited the theme each week.
      </p>
      <div className="space-y-3">
        {entries.map((t) => {
          const max = Math.max(1, ...t.intensity_history.map((p) => p.citation_count));
          return (
            <div key={t.theme_id} className="card p-4">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h4 className="text-sm font-medium text-white">{t.headline}</h4>
                <span className="font-mono text-[10px] text-slate-500 shrink-0">
                  {t.weeks_active} weeks
                </span>
              </div>
              <div className="flex items-end gap-1 h-10">
                {t.intensity_history.map((p) => {
                  const h = Math.max(8, (p.citation_count / max) * 40);
                  return (
                    <div
                      key={p.week_start}
                      className="flex-1 bg-sky-400/30 rounded-t hover:bg-sky-400/60 transition-colors"
                      style={{ height: `${h}px` }}
                      title={`${p.week_start} · ${p.citation_count} sources`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-1 font-mono text-[9px] text-slate-600">
                <span>{t.intensity_history[0]?.week_start}</span>
                <span>{t.intensity_history[t.intensity_history.length - 1]?.week_start}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function OverviewView({
  overview,
  onNavigate,
}: {
  overview: Overview;
  onNavigate: (tabId: TabId, itemId: string) => void;
}) {
  const newThemes = overview.themes.filter((t) => t.recurrence.status === "new");
  const returningThemes = overview.themes.filter((t) => t.recurrence.status !== "new");

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-16">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] tracking-[0.18em] text-amber-300 uppercase border border-amber-400/30 rounded-full px-3 py-1 bg-amber-400/5 inline-flex items-center gap-2">
            <Compass className="w-3 h-3" />
            Cross-Source Synthesis
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-white leading-tight">
          The Week in {overview.themes.length} {overview.themes.length === 1 ? "Theme" : "Themes"}
        </h1>
        {overview.headline && (
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">{overview.headline}</p>
        )}
        <div className="flex flex-wrap gap-2 pt-2">
          {newThemes.length > 0 && (
            <span className="pill border border-emerald-400/40 bg-emerald-400/10 text-emerald-300">
              <Sparkles className="w-3 h-3" />
              {newThemes.length} NEW
            </span>
          )}
          {returningThemes.length > 0 && (
            <span className="pill border border-sky-400/40 bg-sky-400/10 text-sky-300">
              <TrendingUp className="w-3 h-3" />
              {returningThemes.length} RETURNING
            </span>
          )}
        </div>
      </header>

      {/* Deltas vs prior week */}
      {overview.deltas_vs_prior_week?.note && (
        <section className="border-l-2 border-slate-700 pl-4 py-1">
          <div className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase mb-1">
            What changed vs last week
          </div>
          <p className="text-sm text-slate-400 italic">{overview.deltas_vs_prior_week.note}</p>
        </section>
      )}

      {/* Themes */}
      <section id="themes" className="scroll-mt-32">
        <div className="flex items-baseline gap-3 mb-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h2 className="font-display text-2xl text-white">Themes</h2>
        </div>
        <p className="text-sm text-slate-400 mb-6">
          Each theme is grounded in evidence from two or more sources. Click any chip to jump to the underlying item.
        </p>
        <div className="space-y-6">
          {overview.themes.map((theme, i) => (
            <ThemeCard key={theme.theme_id} theme={theme} index={i} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* 90 second brief */}
      <NinetySecondBrief items={overview.ninety_second_brief} onNavigate={onNavigate} />

      {/* Theme tracker */}
      {overview.theme_tracker && overview.theme_tracker.length > 0 && (
        <ThemeTracker entries={overview.theme_tracker} />
      )}

      {/* Footer note */}
      <div className="border-t border-white/5 pt-6 flex items-center gap-2 text-xs text-slate-500 font-mono">
        <ExternalLink className="w-3 h-3" />
        <span>Every theme citation links to the verified primary source via its source tab.</span>
      </div>
    </div>
  );
}
