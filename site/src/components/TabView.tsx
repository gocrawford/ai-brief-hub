import { useMemo, type ReactNode } from "react";
import {
  Sparkles,
  Star,
  ListOrdered,
  TrendingUp,
  AlertTriangle,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import type { Tab } from "../types";
import ItemCard from "./ItemCard";
import IndexTable from "./IndexTable";
import SubNavRail, { type SubNavLink } from "./SubNavRail";
import { fmtScore } from "../lib/util";

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface SectionBlock {
  anchor: string;
  label: string;
  Icon: any;
  render: () => ReactNode;
}

export default function TabView({ tab }: { tab: Tab }) {
  const blocks = useMemo<SectionBlock[]>(() => {
    const list: SectionBlock[] = [];

    // 1. Executive Summary
    list.push({
      anchor: "executive-summary",
      label: "Executive Summary",
      Icon: Sparkles,
      render: () => (
        <section id="executive-summary" className="scroll-mt-32">
          <SectionHeader title="Executive Summary" subtitle="High-signal headlines for the week. Each line is grounded in a primary source — click through to verify." />
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
        </section>
      ),
    });

    // 2. Top Picks
    if (tab.top_picks?.length) {
      list.push({
        anchor: "top-picks",
        label: "Top Picks",
        Icon: Star,
        render: () => (
          <section id="top-picks" className="scroll-mt-32">
            <SectionHeader
              title="Top Picks"
              subtitle="The strongest signals of the week, surfaced by composite score with primary-source verification. Each pick scores ≥ 7.5 / 10."
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {tab.top_picks.map((it) => (
                <ItemCard key={it.id} item={it} />
              ))}
            </div>
          </section>
        ),
      });
    }

    // 3. Each declared section
    for (const s of tab.sections ?? []) {
      const anchor = `section-${s.section_id}` || slug(s.title);
      list.push({
        anchor,
        label: s.title,
        Icon: TrendingUp,
        render: () => (
          <section id={anchor} className="scroll-mt-32">
            <SectionHeader title={s.title} subtitle={s.description} />
            {s.items.length === 0 ? (
              <div className="card text-center py-10">
                <p className="text-slate-400 text-sm">
                  No major new developments this week.
                </p>
              </div>
            ) : (
              <div
                className={
                  s.layout === "table" || s.layout === "leaderboard"
                    ? "space-y-5"
                    : "grid grid-cols-1 lg:grid-cols-2 gap-5"
                }
              >
                {s.items.map((it) => (
                  <ItemCard key={it.id} item={it} />
                ))}
              </div>
            )}
          </section>
        ),
      });
    }

    // 4. Patterns to Watch (top-level emerging_signals — distinct from any section also named 'Emerging Signals')
    if (tab.emerging_signals?.length) {
      list.push({
        anchor: "patterns-to-watch",
        label: "Patterns to Watch",
        Icon: TrendingUp,
        render: () => (
          <section id="patterns-to-watch" className="scroll-mt-32">
            <SectionHeader
              title="Patterns to Watch"
              subtitle="Cross-source patterns and signals worth tracking — observed across multiple independent sources this week."
            />
            <div className="space-y-3">
              {tab.emerging_signals!.map((s, i) => (
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
          </section>
        ),
      });
    }

    // 5. Flagged / Unverified
    if (tab.flagged_unverified?.length) {
      list.push({
        anchor: "flagged",
        label: "Flagged / Unverified",
        Icon: AlertTriangle,
        render: () => (
          <section id="flagged" className="scroll-mt-32">
            <SectionHeader
              title="Flagged / Unverified"
              subtitle="Surfaced this week but failed verification. Listed for transparency, not promoted."
            />
            <div className="space-y-3">
              {tab.flagged_unverified!.map((u, i) => (
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
          </section>
        ),
      });
    }

    // 6. Index
    if (tab.index?.length) {
      list.push({
        anchor: "index",
        label: "Index",
        Icon: ListOrdered,
        render: () => (
          <section id="index" className="scroll-mt-32">
            <SectionHeader
              title="Index"
              subtitle={`Every item considered for this tab, ranked by composite score. ${tab.index.length} entries.`}
            />
            <IndexTable items={tab.index} />
          </section>
        ),
      });
    }

    // 7. Refinements
    list.push({
      anchor: "refinements",
      label: "Refinements",
      Icon: Wrench,
      render: () => (
        <section id="refinements" className="scroll-mt-32">
          <SectionHeader
            title="Refinements"
            subtitle="How this tab improves next week — sources to add, drop, and topics to track."
          />
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
        </section>
      ),
    });

    return list;
  }, [tab]);

  const railLinks: SubNavLink[] = blocks.map((b) => ({
    id: b.anchor,
    label: b.label,
    Icon: b.Icon,
  }));

  return (
    <>
      <SubNavRail links={railLinks} />
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Tab title */}
        <div className="mb-10">
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

        {/* All blocks rendered linearly, separated by generous vertical rhythm */}
        <div className="space-y-16">
          {blocks.map((b, i) => (
            <div key={b.anchor}>
              {i > 0 && <div className="border-t border-white/5 -mt-6 mb-10" />}
              {b.render()}
            </div>
          ))}
        </div>

        {/* Score scale legend */}
        <div className="mt-16 pt-6 border-t border-white/5 text-[11px] text-slate-500 font-mono">
          Score = signal (0–3) + novelty (0–3) + actionability (0–2) + source quality (0–2). Top
          Picks ≥ {fmtScore(7.5)}.
        </div>
      </div>
    </>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h3 className="font-display text-2xl md:text-[1.7rem] font-bold text-white mb-2">
        {title}
      </h3>
      {subtitle && (
        <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
