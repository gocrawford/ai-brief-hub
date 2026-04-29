// Mirrors schemas/tab.schema.json — kept narrow on purpose.

export type TabId =
  | "youtube"
  | "x"
  | "reddit"
  | "builders"
  | "launches"
  | "social"
  | "research";

export type Recurrence =
  | "new"
  | "returning"
  | "returning_theme"
  | "returning_trend"
  | "returning_metric"
  | "returning_pattern";

export interface Score {
  total: number;
  signal: number;
  novelty: number;
  actionability: number;
  source_quality: number;
}

export interface Engagement {
  views?: number;
  likes?: number;
  upvotes?: number;
  comments?: number;
  stars?: number;
  shares?: number;
}

export interface SecondaryUrl {
  label: string;
  url: string;
}

export interface Item {
  id: string;
  title: string;
  subtitle?: string;
  source?: string;
  author?: string;
  date?: string;
  primary_url: string;
  secondary_urls?: SecondaryUrl[];
  verified: boolean;
  verified_at: string;
  summary: string;
  score?: Score;
  engagement?: Engagement;
  tags?: string[];
  category?: string;
  evaluation?: "EVALUATE NOW" | "ADD TO WATCHLIST" | "MONITOR" | "SKIP";
  priority?: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  key_takeaways?: string[];
  suggested_actions?: string[];
  enterprise_translation?: string;
  enterprise_adaptation?: string;
  why_it_matters?: string;
  competitive_context?: string;
  pricing?: string;
  results?: string;
  thumbnail_url?: string;
  platform?: string;
  recurrence?: Recurrence;
  recurrence_note?: string;
}

export interface ExecBullet {
  headline: string;
  body: string;
  primary_url?: string;
}

export interface Section {
  section_id: string;
  title: string;
  description?: string;
  layout?: "cards" | "table" | "leaderboard" | "list" | "debate";
  items: Item[];
}

export interface EmergingSignal {
  pattern: string;
  evidence: string;
  what_to_watch?: string;
}

export interface Freshness {
  target_pct_new: number;
  pct_new: number;
  items_total: number;
  items_new: number;
  items_returning: number;
  empty_week_note?: string;
}

export interface Refinements {
  sources_to_add?: string[];
  sources_to_drop?: string[];
  topics_to_add?: string[];
  topics_to_drop?: string[];
  notes?: string;
}

export interface Tab {
  tab_id: TabId;
  tab_name: string;
  subtitle: string;
  icon?: string;
  freshness?: Freshness;
  min_items?: number;
  executive_summary: ExecBullet[];
  top_picks: Item[];
  sections: Section[];
  index: Array<{
    title: string;
    source?: string;
    author?: string;
    date?: string;
    primary_url: string;
    score: number;
  }>;
  emerging_signals?: EmergingSignal[];
  flagged_unverified?: Array<{ claim: string; reason: string; attempted_url?: string }>;
  suggested_refinements: Refinements;
}

export interface Meta {
  week_start: string; // YYYY-MM-DD (Monday)
  week_end: string; // YYYY-MM-DD (Sunday)
  week_label: string;
  generated_at: string;
  tabs: Array<{
    tab_id: TabId;
    item_count: number;
  }>;
  exec_summary: ExecBullet[];
}

export interface WeekIndexEntry {
  week_start: string;
  week_end: string;
  week_label: string;
  is_latest: boolean;
}

export interface WeekIndex {
  weeks: WeekIndexEntry[];
}
