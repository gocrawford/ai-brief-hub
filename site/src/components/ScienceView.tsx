import { FlaskConical, ArrowRight, ExternalLink, Share2, Beaker, Lightbulb } from "lucide-react";
import type { Science, ScienceItem, ScienceLabPick, TabId } from "../types";

const TAB_LABELS: Record<TabId, string> = {
  youtube: "YouTube",
  x: "X.com",
  reddit: "Reddit",
  builders: "Builders",
  launches: "Launches",
  social: "Social",
  research: "Research",
};

type Nav = (tabId: TabId, itemId: string) => void;

function SourceButton({ tab_id, item_id, onNavigate }: { tab_id: TabId; item_id: string; onNavigate: Nav }) {
  return (
    <button
      onClick={() => onNavigate(tab_id, item_id)}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02] hover:bg-teal-400/10 hover:border-teal-400/40 transition-colors text-xs text-slate-300 hover:text-white"
    >
      <span className="font-mono text-[10px] uppercase tracking-wider text-teal-300/90">{TAB_LABELS[tab_id]}</span>
      <span>See details</span>
      <ArrowRight className="w-3 h-3" />
    </button>
  );
}

function ExternalButton({ href }: { href?: string }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-colors text-xs text-slate-300 hover:text-white"
    >
      <ExternalLink className="w-3 h-3" />
      <span>Original source</span>
    </a>
  );
}

function LabPick({ pick, onNavigate }: { pick: ScienceLabPick; onNavigate: Nav }) {
  const fields: { label: string; value: string }[] = [
    { label: "What they did", value: pick.what_they_did },
    { label: "The result", value: pick.result },
    { label: "Why researchers will care", value: pick.why_researchers_care },
    { label: "How to share it", value: pick.how_to_share },
  ];
  return (
    <section id="lab-pick" className="scroll-mt-32">
      <article className="rounded-xl border border-teal-400/30 bg-gradient-to-br from-teal-400/[0.08] to-transparent p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-teal-300" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal-300">
            Share this with your lab
          </span>
        </div>
        <h2 className="font-display text-2xl text-white leading-snug">{pick.title}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.label} className="rounded-lg border border-white/5 bg-ink-900/40 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-1.5">{f.label}</div>
              <p className="text-sm text-slate-200 leading-relaxed">{f.value}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <SourceButton tab_id={pick.tab_id} item_id={pick.item_id} onNavigate={onNavigate} />
          <ExternalButton href={pick.primary_url} />
        </div>
      </article>
    </section>
  );
}

function ItemRow({ item, onNavigate }: { item: ScienceItem; onNavigate: Nav }) {
  return (
    <li className="p-4 rounded-lg border border-white/5 bg-white/[0.01] space-y-2">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="text-[15px] font-medium text-white leading-snug">{item.title}</h4>
        {item.source && <span className="font-mono text-[11px] text-slate-500">{item.source}</span>}
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">{item.one_line}</p>
      {item.try_this && (
        <p className="text-sm text-teal-100/90 leading-relaxed">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-teal-300 mr-2">Try this</span>
          {item.try_this}
        </p>
      )}
      <div className="flex flex-wrap gap-2 pt-1">
        <SourceButton tab_id={item.tab_id} item_id={item.item_id} onNavigate={onNavigate} />
        <ExternalButton href={item.primary_url} />
      </div>
    </li>
  );
}

export default function ScienceView({ science, onNavigate }: { science: Science | null; onNavigate: Nav }) {
  const sections = (science?.sections ?? []).filter((s) => s.items && s.items.length > 0);
  const isEmpty = !science || (!science.lab_pick && sections.length === 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-teal-300" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal-300">AI for Science & R&D</span>
        </div>
        {science ? (
          <>
            <h1 className="font-display text-3xl text-white leading-tight max-w-4xl">{science.headline}</h1>
            <p className="text-base text-slate-300 leading-relaxed max-w-3xl">{science.summary_for_scientists}</p>
            {science.coverage_note && (
              <p className="text-sm text-slate-400 italic max-w-3xl">{science.coverage_note}</p>
            )}
          </>
        ) : (
          <h1 className="font-display text-3xl text-white leading-tight">Science summary</h1>
        )}
      </header>

      {isEmpty ? (
        <div className="card p-8 text-center max-w-2xl">
          <h2 className="font-display text-xl text-white mb-2">No science summary for this week</h2>
          <p className="text-sm text-slate-400">
            The Science page pulls AI-for-science and R&D items from all seven sources. Summaries start with late
            September 2026; for earlier weeks, browse the Research tab.
          </p>
        </div>
      ) : (
        <>
          {science!.lab_pick && <LabPick pick={science!.lab_pick} onNavigate={onNavigate} />}

          {sections.map((s) => (
            <section key={s.section_id} id={`science-${s.section_id}`} className="scroll-mt-32 space-y-3">
              <div className="flex items-baseline gap-3">
                <Beaker className="w-4 h-4 text-teal-300" />
                <h2 className="font-display text-xl text-white">{s.title}</h2>
                <span className="font-mono text-[11px] text-slate-500">{s.items.length}</span>
              </div>
              {s.description && <p className="text-sm text-slate-400 max-w-3xl">{s.description}</p>}
              <ul className="grid gap-3 md:grid-cols-2">
                {s.items.map((it) => (
                  <ItemRow key={`${it.tab_id}-${it.item_id}`} item={it} onNavigate={onNavigate} />
                ))}
              </ul>
            </section>
          ))}

          {science!.try_in_the_lab && science!.try_in_the_lab.length > 0 && (
            <section id="try-in-the-lab" className="scroll-mt-32">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-4 h-4 text-amber-300" />
                  <h2 className="font-display text-xl text-white">Try it in the lab this week</h2>
                </div>
                <ol className="space-y-3 list-decimal list-inside marker:text-amber-300/80">
                  {science!.try_in_the_lab.map((t, i) => (
                    <li key={i} className="text-sm text-slate-200 leading-relaxed">
                      {t}
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
