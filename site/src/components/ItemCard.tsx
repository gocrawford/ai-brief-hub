import { ExternalLink, Calendar, User, Tag, AlertCircle, ArrowUpRight } from "lucide-react";
import type { Item } from "../types";
import {
  fmtScore,
  fmtNum,
  actionLabel,
  recurrenceLabel,
  evaluationPillClass,
  priorityPillClass,
} from "../lib/util";

function ScoreBar({ score }: { score?: number }) {
  if (score === undefined || score === null) return null;
  const pct = Math.max(0, Math.min(100, (score / 10) * 100));
  return (
    <div className="flex items-center gap-2 min-w-[140px]">
      <div className="score-bar flex-1">
        <div className="fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="font-mono text-xs text-amber-300 tabular-nums shrink-0">
        {fmtScore(score)}
      </span>
    </div>
  );
}

export default function ItemCard({ item }: { item: Item }) {
  const recurrence = recurrenceLabel(item.recurrence);
  const engagement = item.engagement ?? {};
  // Filter out unknown/missing engagement values. A 0 means the research agent
  // couldn't fetch a real number — show nothing rather than a misleading "0".
  const engagementEntries = Object.entries(engagement).filter(
    ([, v]) => v !== undefined && v !== null && v !== 0,
  );

  return (
    <article className="card flex flex-col gap-3 transition-shadow" data-item-id={item.id}>
      {/* Top meta row */}
      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        {item.priority && (
          <span className={priorityPillClass(item.priority)}>{item.priority}</span>
        )}
        {item.evaluation && (
          <span className={evaluationPillClass(item.evaluation)}>{item.evaluation}</span>
        )}
        {recurrence && (
          <span className="pill pill-blue font-mono">{recurrence}</span>
        )}
        {item.category && (
          <span className="pill">
            <Tag className="w-3 h-3" />
            {item.category}
          </span>
        )}
        {!item.verified && (
          <span className="pill pill-red">
            <AlertCircle className="w-3 h-3" />
            UNVERIFIED
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display text-lg md:text-xl font-semibold text-white leading-snug">
        {item.title}
      </h3>
      {item.subtitle && (
        <p className="text-sm text-slate-400 -mt-1">{item.subtitle}</p>
      )}

      {/* Source + author + date */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
        {item.source && (
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-amber-400" />
            <span className="text-slate-300">{item.source}</span>
          </span>
        )}
        {item.author && (
          <span className="inline-flex items-center gap-1">
            <User className="w-3 h-3" />
            {item.author}
          </span>
        )}
        {item.date && (
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {item.date}
          </span>
        )}
      </div>

      {/* Score + engagement */}
      {(item.score?.total !== undefined || engagementEntries.length > 0) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {item.score?.total !== undefined && <ScoreBar score={item.score.total} />}
          {engagementEntries.length > 0 && (
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-400 font-mono">
              {engagementEntries.map(([k, v]) => (
                <span key={k}>
                  <span className="text-slate-500 uppercase tracking-wider mr-1">{k}</span>
                  {fmtNum(v as number)}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      <p className="text-sm text-slate-300 leading-relaxed">{item.summary}</p>

      {/* Recurrence note */}
      {item.recurrence_note && (
        <div className="text-xs text-slate-400 border-l-2 border-blue-400/40 pl-3 italic">
          {item.recurrence_note}
        </div>
      )}

      {/* Why it matters / pricing / results — short fields */}
      {(item.why_it_matters || item.pricing || item.results || item.competitive_context) && (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
          {item.why_it_matters && (
            <div>
              <dt className="text-slate-500 uppercase tracking-wider text-[10px] font-mono mb-0.5">
                Why it matters
              </dt>
              <dd className="text-slate-300">{item.why_it_matters}</dd>
            </div>
          )}
          {item.competitive_context && (
            <div>
              <dt className="text-slate-500 uppercase tracking-wider text-[10px] font-mono mb-0.5">
                Competitive context
              </dt>
              <dd className="text-slate-300">{item.competitive_context}</dd>
            </div>
          )}
          {item.pricing && (
            <div>
              <dt className="text-slate-500 uppercase tracking-wider text-[10px] font-mono mb-0.5">
                Pricing
              </dt>
              <dd className="text-slate-300">{item.pricing}</dd>
            </div>
          )}
          {item.results && (
            <div>
              <dt className="text-slate-500 uppercase tracking-wider text-[10px] font-mono mb-0.5">
                Results
              </dt>
              <dd className="text-slate-300">{item.results}</dd>
            </div>
          )}
        </dl>
      )}

      {/* Key takeaways */}
      {item.key_takeaways && item.key_takeaways.length > 0 && (
        <div>
          <div className="text-slate-500 uppercase tracking-wider text-[10px] font-mono mb-1.5">
            Key takeaways
          </div>
          <ul className="space-y-1.5 text-sm text-slate-300">
            {item.key_takeaways.map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-amber-400 mt-1.5 text-[6px] shrink-0">●</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested actions */}
      {item.suggested_actions && item.suggested_actions.length > 0 && (
        <div>
          <div className="text-slate-500 uppercase tracking-wider text-[10px] font-mono mb-1.5">
            Suggested actions
          </div>
          <ul className="space-y-1.5 text-sm text-slate-300">
            {item.suggested_actions.map((t, i) => (
              <li key={i} className="flex gap-2">
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Enterprise translation / adaptation — call-out box */}
      {(item.enterprise_translation || item.enterprise_adaptation) && (
        <div className="mt-1 rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-300 mb-1.5">
            {item.enterprise_adaptation ? "Enterprise adaptation" : "Enterprise translation"}
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            {item.enterprise_adaptation ?? item.enterprise_translation}
          </p>
        </div>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <span key={t} className="pill text-[10px]">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Action footer */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/5">
        <a
          href={item.primary_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 text-xs font-medium"
        >
          {actionLabel(item.primary_url)}
          <ExternalLink className="w-3 h-3" />
        </a>
        {item.secondary_urls?.map((s) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 text-xs"
          >
            {s.label}
            <ExternalLink className="w-3 h-3" />
          </a>
        ))}
      </div>
    </article>
  );
}
