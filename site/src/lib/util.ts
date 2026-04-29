export function fmtNum(n?: number): string {
  if (n === undefined || n === null) return "";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function fmtScore(n?: number): string {
  if (n === undefined || n === null) return "—";
  return n.toFixed(1);
}

// Returns the canonical button label for a primary_url based on its host.
export function actionLabel(url: string): string {
  try {
    const u = new URL(url);
    const h = u.hostname.replace(/^www\./, "");
    if (h.includes("youtube.com") || h.includes("youtu.be")) return "Watch on YouTube";
    if (h.includes("x.com") || h.includes("twitter.com")) return "View on X";
    if (h.includes("reddit.com")) return "View on Reddit";
    if (h.includes("github.com")) return "View on GitHub";
    if (h.includes("news.ycombinator.com")) return "View on HN";
    if (h.includes("producthunt.com")) return "View on Product Hunt";
    if (h.includes("linkedin.com")) return "View on LinkedIn";
    if (h.includes("tiktok.com")) return "View on TikTok";
    if (h.includes("instagram.com")) return "View on Instagram";
    if (h.includes("arxiv.org")) return "View on arXiv";
    if (h.includes("nist.gov")) return "View on NIST";
    if (h.includes("sec.gov")) return "View on EDGAR";
    if (h.includes("artificialintelligenceact.eu")) return "View AI Act source";
    return "View source";
  } catch {
    return "View source";
  }
}

export function recurrenceLabel(r?: string): string | null {
  if (!r || r === "new") return null;
  const map: Record<string, string> = {
    returning: "RETURNING",
    returning_theme: "RETURNING THEME",
    returning_trend: "RETURNING TREND",
    returning_metric: "RETURNING METRIC",
    returning_pattern: "RETURNING PATTERN",
  };
  return map[r] ?? null;
}

export function evaluationPillClass(ev?: string): string {
  switch (ev) {
    case "EVALUATE NOW":
      return "pill pill-green";
    case "ADD TO WATCHLIST":
      return "pill pill-amber";
    case "MONITOR":
      return "pill pill-blue";
    case "SKIP":
      return "pill pill-red";
    default:
      return "pill";
  }
}

export function priorityPillClass(p?: string): string {
  switch (p) {
    case "CRITICAL":
      return "pill pill-red";
    case "HIGH":
      return "pill pill-amber";
    case "MEDIUM":
      return "pill pill-blue";
    case "LOW":
      return "pill";
    default:
      return "pill";
  }
}
