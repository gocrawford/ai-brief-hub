import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import TabNav from "./components/TabNav";
import TabView from "./components/TabView";
import { fetchWeekIndex, fetchMeta, fetchTab } from "./lib/data";
import type { Meta, Tab, TabId, WeekIndexEntry } from "./types";

const DEFAULT_TAB: TabId = "youtube";

export default function App() {
  const [weeks, setWeeks] = useState<WeekIndexEntry[] | null>(null);
  const [activeWeek, setActiveWeek] = useState<string | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>(DEFAULT_TAB);
  const [tabData, setTabData] = useState<Tab | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingTab, setLoadingTab] = useState(false);

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

  // 2. Load meta when activeWeek changes
  useEffect(() => {
    if (!activeWeek) return;
    setMeta(null);
    fetchMeta(activeWeek)
      .then(setMeta)
      .catch((e) => setError(e.message));
  }, [activeWeek]);

  // 3. Load tab data when (activeWeek, activeTab) changes
  useEffect(() => {
    if (!activeWeek) return;
    setLoadingTab(true);
    setTabData(null);
    fetchTab(activeWeek, activeTab)
      .then(setTabData)
      .catch((e) => setError(e.message))
      .finally(() => setLoadingTab(false));
  }, [activeWeek, activeTab]);

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
      <Hero meta={meta} weeks={weeks} activeWeek={activeWeek} onSelectWeek={setActiveWeek} />
      <TabNav active={activeTab} onChange={setActiveTab} />
      <main>
        {loadingTab || !tabData ? (
          <div className="max-w-6xl mx-auto px-6 py-20 text-center">
            <div className="text-slate-500 text-sm font-mono uppercase tracking-wider">
              Loading…
            </div>
          </div>
        ) : (
          <TabView tab={tabData} />
        )}
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
