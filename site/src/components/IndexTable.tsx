import { ExternalLink } from "lucide-react";
import { fmtScore } from "../lib/util";
import type { Tab } from "../types";

export default function IndexTable({ items }: { items: Tab["index"] }) {
  // Sort by score desc
  const sorted = [...items].sort((a, b) => b.score - a.score);
  return (
    <div className="overflow-x-auto rounded-xl border border-white/5">
      <table className="w-full text-sm">
        <thead className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase tracking-wider text-slate-500 font-mono">
          <tr>
            <th className="text-left px-4 py-2 font-medium w-12">#</th>
            <th className="text-left px-4 py-2 font-medium">Title</th>
            <th className="text-left px-4 py-2 font-medium hidden md:table-cell">Source</th>
            <th className="text-left px-4 py-2 font-medium hidden md:table-cell">Date</th>
            <th className="text-right px-4 py-2 font-medium w-20">Score</th>
            <th className="text-right px-4 py-2 font-medium w-12"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {sorted.map((it, i) => (
            <tr key={`${it.primary_url}-${i}`} className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 text-slate-500 font-mono text-xs">{i + 1}</td>
              <td className="px-4 py-3">
                <a
                  href={it.primary_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-100 hover:text-amber-300"
                >
                  {it.title}
                </a>
                {it.author && (
                  <span className="text-slate-500 text-xs block mt-0.5">{it.author}</span>
                )}
              </td>
              <td className="px-4 py-3 text-slate-400 hidden md:table-cell text-xs">
                {it.source ?? "—"}
              </td>
              <td className="px-4 py-3 text-slate-500 hidden md:table-cell text-xs font-mono">
                {it.date ?? ""}
              </td>
              <td className="px-4 py-3 text-right">
                <span className="font-mono text-amber-300 tabular-nums text-xs">
                  {fmtScore(it.score)}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <a
                  href={it.primary_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-amber-300 inline-flex"
                  aria-label="Open"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
