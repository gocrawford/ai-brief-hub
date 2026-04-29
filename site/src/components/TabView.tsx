import { useMemo, useState } from "react";
import {
  Sparkles,
  Star,
  ListOrdered,
  TrendingUp,
  AlertTriangle,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import type { Tab, Section } from "../types";
import ItemCard from "./ItemCard";
import IndexTable from "./IndexTable";
import { fmtScore } from "../lib/util";

type SubTab =
  | { kind: "summary" }
  | { kind: "top_picks" }
  | { kind: "section"; section: Section }
  | { kind: "signals" }
  | { kind: "unverified" }
  | { kind: "index" }
  | { kind: "refinements" };

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

export default function TabView({ tab }: { tab: Tab }) {
  const subtabs = useMemo<SubTab[]>(() => {
    const list: SubTab[] = [{ kind: "summary" }];
    if (tab.top_picks?.length) list.push({ kind: "top_picks" });
    for (const s of tab.sections ?? []) list.push({ kind: "section", section: s });
    if (tab.emerging_signals?.length) list.push({ kind: "signals" });
    if (tab.flagged_unverified?.length) list.push({ kind: "unverified" });
    if (tab.index?.length) list.push({ kind: "index" });
    list.push({ kind: "refinements" });
    return list;
  }, [tab]);

  const [activeIdx, setActiveIdx] = useState(0);

  const subtabLabel = (s: SubTab): { label: string; Icon: any } => {
    switch (s.kind) {
      case "summary":
        return { label: "Executive Summary", Icon: Sparkles };
      case "top_picks":
        return { label: "Top Picks", Icon: Star };
      case "section":
        return { label: s.section.title, Icon: TrendingUp };
      case "signals":
        return { label: "Emerging Signals", Icon: TrendingUp };
      case "unverified":
        return { label: "Flagged / Unverified", Icon: AlertTriangle };
      case "index":
        return { label: "Index", Icon: ListOrdered };
      case "refinements":
        return { label: "Refinements", Icon: Wrench };
    }
  };

  const active = subtabs[activeIdx];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Tab title */}
      <div className="mb-8">
        <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-300/80 mb-1.5">
          {tab.subtitle}
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
          {tab.tab_name}
        </h2>
        {tab.freshness && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span
              className={
                tab.freshness.pct_new >= tab.freshness.target_pct_new
                  ? "pill pill-green"
                  : "pill pill-red"
              }
            >
              <CheckCircle2 className="w-3 h-3" />
              {Math.round(tab.freshness.pct_new * 100)}% new
              <span className="text-slate-500 ml-1 font-normal">
                / target {Math.round(tab.freshness.target_pct_new * 100)}%
              </span>
            </span>
            <span className="pill font-mono">
              <span className="text-amber-300">{tab.freshness.items_new}</span>
              <span className="text-slate-500 mx-0.5">new</span>
              <span className="text-slate-500 mx-1">·</span>
              <span className="text-slate-300">{tab.freshness.items_returning}</span>
              <span className="text-slate-500 ml-1">returning</span>
            </span>
          </div>
        )}
      </div>

      {/* Sub-tab nav */}
      <div className="border-b border-white/5 mb-8 overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-1 min-w-max">
          {subtabs.map((s, i) => {
            const { label, Icon } = subtabLabel(s);
            const isActive = i === activeIdx;
            return (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                data-active={isActive}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-amber-400 text-amber-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-tab content */}
      {active.kind === "summary" && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm max-w-3xl">
            High-signal headlines for the week. Each line is grounded in a primary source — click
            through to verify.
          </p>
          <div className="space-y-3">
            {tab.executive_summary.map((b, i) => (
              <div key={i} className="card">
                <div className="flex items-start gap-4">
                  <span className="section-num shrink-0">{pad2(i + 1)}</span>
                  <div className="flex-1">
                    <h4 className="font-display font-semibold text-white text-base mb-1.5">
                      {b.headline}
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{b.body}</p>
                    {b.primary_url && (
                      <a
                        href={b.primary_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-300 hover:text-amber-200 text-xs mt-2 inline-block"
                      >
                        Primary source →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {active.kind === "top_picks" && (
        <div>
          <p className="text-slate-400 text-sm max-w-3xl mb-6">
            The strongest signals of the week, surfaced by composite score with primary-source
            verification. Each pick scores ≥ 7.5 / 10.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {tab.top_picks.map((it) => (
              <ItemCard key={it.id} item={it} />
            ))}
          </div>
        </div>
      )}

      {active.kind === "section" && (
        <div>
          {active.section.description && (
            <p className="text-slate-400 text-sm max-w-3xl mb-6">{active.section.description}</p>
          )}
          {active.section.items.length === 0 ? (
            <div className="card text-center py-10">
              <p className="text-slate-400 text-sm">No major new developments this week.</p>
            </div>
          ) : active.section.layout === "table" || active.section.layout === "leaderboard" ? (
            <div className="space-y-5">
              {active.section.items.map((it) => (
                <ItemCard key={it.id} item={it} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {active.section.items.map((it) => (
                <ItemCard key={it.id} item={it} />
              ))}
            </div>
          )}
        </div>
      )}

      {active.kind === "signals" && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm max-w-3xl">
            Cross-source patterns and signals worth tracking — observed across multiple
            independent sources this week.
          </p>
          <div className="space-y-3">
            {(tab.emerging_signals ?? []).map((s, i) => (
              <div key={i} className="card">
                <div className="flex items-start gap-4">
                  <span className="section-num shrink-0">{pad2(i + 1)}</span>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-display font-semibold text-white text-base">
                      {s.pattern}
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{s.evidence}</p>
                    {s.what_to_watch && (
                      <div className="text-xs text-slate-400 border-l-2 border-amber-400/40 pl-3 italic">
                        Watch for: {s.what_to_watch}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {active.kind === "unverified" && (
        <div className="space-y-3">
          <p className="text-slate-400 text-sm max-w-3xl">
            Surfaced this week but failed verification. Listed for transparency, not promoted.
          </p>
          {(tab.flagged_unverified ?? []).map((u, i) => (
            <div key={i} className="card border-red-400/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-slate-200">{u.claim}</p>
                  <p className="text-xs text-slate-400 mt-1">Reason: {u.reason}</p>
                  {u.attempted_url && (
                    <p className="text-xs text-slate-500 mt-1 font-mono break-all">
                      {u.attempted_url}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {active.kind === "index" && (
        <div>
          <p className="text-slate-400 text-sm max-w-3xl mb-6">
            Every item considered for this tab, ranked by composite score. {tab.index.length}{" "}
            entries.
          </p>
          <IndexTable items={tab.index} />
        </div>
      )}

      {active.kind === "refinements" && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm max-w-3xl">
            How this tab improves next week — sources to add, drop, and topics to track.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tab.suggested_refinements.sources_to_add &&
              tab.suggested_refinements.sources_to_add.length > 0 && (
                <div className="card">
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-green-300 mb-3">
                    + Add sources
                  </h4>
                  <ul className="space-y-1.5 text-sm text-slate-300">
                    {tab.suggested_refinements.sources_to_add.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            {tab.suggested_refinements.sources_to_drop &&
              tab.suggested_refinements.sources_to_drop.length > 0 && (
                <div className="card">
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-red-300 mb-3">
                    − Drop sources
                  </h4>
                  <ul className="space-y-1.5 text-sm text-slate-300">
                    {tab.suggested_refinements.sources_to_drop.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            {tab.suggested_refinements.topics_to_add &&
              tab.suggested_refinements.topics_to_add.length > 0 && (
                <div className="card">
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-amber-300 mb-3">
                    Topics to track
                  </h4>
                  <ul className="space-y-1.5 text-sm text-slate-300">
                    {tab.suggested_refinements.topics_to_add.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            {tab.suggested_refinements.notes && (
              <div className="card md:col-span-2">
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-3">
                  Notes
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {tab.suggested_refinements.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer score scale legend (only on first sub-tab) */}
      {active.kind === "summary" && (
        <div className="mt-12 pt-6 border-t border-white/5 text-[11px] text-slate-500 font-mono">
          Score = signal (0–3) + novelty (0–3) + actionability (0–2) + source quality (0–2). Top
          Picks ≥ {fmtScore(7.5)}.
        </div>
      )}
    </div>
  );
}
