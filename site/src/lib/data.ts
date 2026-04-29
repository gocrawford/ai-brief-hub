import type { Tab, Meta, WeekIndex, TabId, Overview } from "../types";

// Data files live in /public/data/ so Vite copies them as-is into dist/data/.
// Vite prepends import.meta.env.BASE_URL to absolute paths, so this works in
// both dev (base = '/') and prod under GitHub Pages (base = '/ai-brief-hub/').
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "");

function url(path: string): string {
  return `${BASE}/${path}`.replace(/\/+/g, "/");
}

export async function fetchWeekIndex(): Promise<WeekIndex> {
  const res = await fetch(url("data/index.json"));
  if (!res.ok) throw new Error(`Could not load week index (${res.status})`);
  return res.json();
}

export async function fetchMeta(weekStart: string): Promise<Meta> {
  const res = await fetch(url(`data/${weekStart}/meta.json`));
  if (!res.ok) throw new Error(`Could not load meta for ${weekStart} (${res.status})`);
  return res.json();
}

export async function fetchTab(weekStart: string, tabId: TabId): Promise<Tab> {
  const res = await fetch(url(`data/${weekStart}/${tabId}.json`));
  if (!res.ok) throw new Error(`Could not load ${tabId} for ${weekStart} (${res.status})`);
  return res.json();
}

export async function fetchOverview(weekStart: string): Promise<Overview | null> {
  const res = await fetch(url(`data/${weekStart}/overview.json`));
  if (!res.ok) return null; // Overview is optional — weeks without it just don't show that page
  return res.json();
}
