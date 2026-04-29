import { Video, Twitter, MessageCircle, Hammer, Rocket, Share2, FileText } from "lucide-react";
import type { TabId } from "../types";

const TABS: { id: TabId; label: string; subtitle: string; Icon: any }[] = [
  { id: "youtube", label: "YouTube", subtitle: "Video Intelligence", Icon: Video },
  { id: "x", label: "X.com", subtitle: "Social Intelligence", Icon: Twitter },
  { id: "reddit", label: "Reddit", subtitle: "Community Intelligence", Icon: MessageCircle },
  { id: "builders", label: "Builders", subtitle: "Builder Intelligence", Icon: Hammer },
  { id: "launches", label: "Launches", subtitle: "Launch Intelligence", Icon: Rocket },
  { id: "social", label: "Social", subtitle: "Platform Intelligence", Icon: Share2 },
  { id: "research", label: "Research", subtitle: "Primary-Source Intelligence", Icon: FileText },
];

export default function TabNav({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (tab: TabId) => void;
}) {
  return (
    <nav className="sticky top-0 z-20 bg-ink-900/95 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mr-3 shrink-0">
            Source
          </span>
          {TABS.map(({ id, label, subtitle, Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                data-active={isActive}
                onClick={() => onChange(id)}
                className="tab shrink-0"
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="w-4 h-4" />
                <div className="text-left leading-tight">
                  <div className="font-medium">{label}</div>
                  <div className="text-[10px] text-slate-500">{subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export { TABS };
