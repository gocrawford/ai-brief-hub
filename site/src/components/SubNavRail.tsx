import { useEffect, useState } from "react";

export interface SubNavLink {
  id: string;
  label: string;
  Icon?: any;
}

/**
 * Sticky in-page anchor rail for a single tab.
 * - Renders horizontally on mobile (just below the source tabs).
 * - Highlights the section currently in view via IntersectionObserver.
 * - Clicking scrolls smoothly to the anchor.
 */
export default function SubNavRail({ links }: { links: SubNavLink[] }) {
  const [activeId, setActiveId] = useState<string | null>(links[0]?.id ?? null);

  useEffect(() => {
    if (links.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the section closest to the top of the viewport that is
        // currently intersecting. We prefer the one with the smallest
        // positive top value.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // top offset accounts for the sticky tab nav (~60px) + sub-rail (~50px)
        rootMargin: "-130px 0px -60% 0px",
        threshold: [0, 0.1, 0.25],
      },
    );
    for (const link of links) {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [links]);

  function jump(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    // Smooth scroll, accounting for the sticky tab nav offset (~60px) and
    // the rail itself (~50px = ~110px).
    const y = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveId(id);
  }

  if (links.length === 0) return null;

  return (
    <nav
      aria-label="In-page navigation"
      className="sticky top-[60px] z-10 bg-ink-900/95 backdrop-blur border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin py-2.5 -mb-px">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mr-3 shrink-0">
            Jump to
          </span>
          {links.map(({ id, label, Icon }) => {
            const isActive = id === activeId;
            return (
              <button
                key={id}
                onClick={() => jump(id)}
                className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors border ${
                  isActive
                    ? "border-amber-400/40 bg-amber-400/8 text-amber-300"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
