import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import TabNav, { type View } from "./components/TabNav";
import TabView from "./components/TabView";
import OverviewView from "./components/OverviewView";
import { fetchWeekIndex, fetchMeta, fetchTab, fetchOverview, fetchPodcast } from "./lib/data";
import type { Meta, Tab, TabId, WeekIndexEntry, Overview, PodcastEpisode } from "./types";

const DEFAULT_VIEW: View = "overview";

// ---- Hash routing ----
// #/ -> overview
// #/<tab>           -> source tab, no item highlighted
// #/<tab>/<item_id> -> source tab, scroll-and-highlight that item
type Route = { view: View; itemId: string | null };

function parseHash(): Route {
  const h = window.location.hash.replace(/^#\/?/, "");
  if (!h) return { view: "overview", itemId: null };
  const [view, itemId] = h.split("/");
  const validViews: View[] = ["overview", "youtube", "x", "reddit", "builders", "launches", "social", "research"];
  if (!validViews.includes(view as View)) return { view: "overview", itemId: null };
  return { view: view as View, itemId: itemId || null };
}

function setHash(view: View, itemId?: string | null) {
  const target = itemId ? `#/${view}/${itemId}` : `#/${view}`;
  if (window.location.hash !== target) window.location.hash = target;
}

export default function App() {
  const [weeks, setWeeks] = useState<WeekIndexEntry[] | null>(null);
  const [activeWeek, setActiveWeek] = useState<string | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);

  const initial = parseHash();
  const [activeView, setActiveView] = useState<View>(initial.view || DEFAULT_VIEW);
  const [pendingItemId, setPendingItemId] = useState<string | null>(initial.itemId);

  const [tabData, setTabData] = useState<Tab | null>(null);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [podcast, setPodcast] = useState<PodcastEpisode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 1. Load week index on mount
  useEffect(() => {
    fetchWeekIndex()
      .then((idx) => {
        setWeeks(idx.weeks);
        const latest = idx.weeks.find((w) => w.is_latest) ?? idx.weeks[0];
        if (latest) setActiveWeek(latest.week_start);
        else setError("No weeks available yet — first brief publishes Sunday.");
      })
      .catch((e) => setError(e.message));
  }, []);

  // 2. Load meta + podcast when activeWeek changes
  useEffect(() => {
    if (!activeWeek) return;
    setMeta(null);
    setPodcast(null);
    fetchMeta(activeWeek)
      .then(setMeta)
      .catch((e) => setError(e.message));
    // Podcast is optional — swallow errors so a missing episode doesn't break the page
    fetchPodcast(activeWeek).then(setPodcast).catch(() => setPodcast(null));
  }, [activeWeek]);

  // 3. Load active view data when (activeWeek, activeView) changes
  useEffect(() => {
    if (!activeWeek) return;
    setLoading(true);
    if (activeView === "overview") {
      setTabData(null);
      fetchOverview(activeWeek)
        .then(setOverview)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    } else {
      setOverview(null);
      fetchTab(activeWeek, activeView as TabId)
        .then(setTabData)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [activeWeek, activeView]);

  // 4. After tab data loads, if we have a pendingItemId, scroll to and highlight it
  useEffect(() => {
    if (!tabData || !pendingItemId) return;
    // Wait for DOM to render
    const t = setTimeout(() => {
      const el = document.querySelector(`[data-item-id="${pendingItemId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("deep-link-highlight");
        setTimeout(() => {
          el.classList.remove("deep-link-highlight");
        }, 2400);
      }
      setPendingItemId(null);
    }, 250);
    return () => clearTimeout(t);
  }, [tabData, pendingItemId]);

  // 5. Listen for hash changes (e.g. browser back/forward)
  useEffect(() => {
    const onHash = () => {
      const r = parseHash();
      setActiveView(r.view);
      if (r.itemId) setPendingItemId(r.itemId);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // 6. Sync active view to hash (without item id, for plain tab clicks)
  const handleSelectView = (view: View) => {
    setActiveView(view);
    setHash(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 7. Cross-tab navigation from Overview citations
  const handleNavigate = (tabId: TabId, itemId: string) => {
    setActiveView(tabId);
    setPendingItemId(itemId);
    setHash(tabId, itemId);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="card max-w-md text-center">
          <h2 className="font-display text-xl text-white mb-2">Brief unavailable</h2>
          <p className="text-sm text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!weeks || !activeWeek || !meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500 text-sm font-mono uppercase tracking-wider">
          Loading brief…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-900">
      <Hero meta={meta} weeks={weeks} activeWeek={activeWeek} onSelectWeek={setActiveWeek} podcast={podcast} />
      <TabNav active={activeView} onChange={handleSelectView} />
      <main>
        {loading ? (
          <div className="max-w-6xl mx-auto px-6 py-20 text-center">
            <div className="text-slate-500 text-sm font-mono uppercase tracking-wider">
              Loading…
            </div>
          </div>
        ) : activeView === "overview" ? (
          overview ? (
            <OverviewView overview={overview} onNavigate={handleNavigate} />
          ) : (
            <div className="max-w-3xl mx-auto px-6 py-20 text-center">
              <h2 className="font-display text-xl text-white mb-2">Overview not yet generated</h2>
              <p className="text-sm text-slate-400">
                The cross-source synthesis hasn't been produced for this week yet. Browse the source tabs above
                to read the underlying intelligence.
              </p>
            </div>
          )
        ) : tabData ? (
          <TabView tab={tabData} />
        ) : null}
      </main>
      <footer className="border-t border-white/5 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <span>AI Brief Hub · Generated {new Date(meta.generated_at).toLocaleString()}</span>
          <a
            href="https://github.com/gocrawford/ai-brief-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300"
          >
            github.com/ai-brief-hub
          </a>
        </div>
      </footer>
    </div>
  );
}
