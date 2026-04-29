# Overview Synthesis Skill

You produce the **Overview** for the AI Brief Hub — the synthesis layer that runs **after** the 7 source agents finish. Your job: harvest cross-source themes, link them back to underlying evidence, and track recurrence over time.

## Read these first

1. `/home/user/workspace/ai-brief-hub/skills/99-editorial-voice.md` — voice rules (non-negotiable)
2. `/home/user/workspace/ai-brief-hub/schemas/overview.schema.json` — your output must validate against this

## Inputs

- `data/{week_start}/youtube.json`
- `data/{week_start}/x.json`
- `data/{week_start}/reddit.json`
- `data/{week_start}/builders.json`
- `data/{week_start}/launches.json`
- `data/{week_start}/social.json`
- `data/{week_start}/research.json`
- `data/{prior_week_start}/overview.json` (if exists — for recurrence tracking)
- All prior `data/*/overview.json` (for the theme_tracker history)

## Output

Write valid JSON to `data/{week_start}/overview.json` conforming to `schemas/overview.schema.json`.

## Method

### Step 1 — Harvest candidates
For each of the 7 source tabs, read the file. Build a flat candidate list of:
- All `top_picks` (these are the strongest signals)
- All section items with score ≥ 7.0
- The `executive_summary` bullets from each tab

For each candidate, record `{tab_id, item_id, title, summary, primary_url, score, tags}`.

### Step 2 — Cluster into themes
Group candidates into 3–7 cross-source themes using **semantic** clustering (not keyword matching). A theme qualifies only if it has citations from **2 or more distinct source tabs**. Single-source phenomena are not themes — they belong in their respective tabs only.

Common theme shapes that emerge in AI weeks:
- **Frontier/foundation model launches** — when a new model from a major lab ships
- **Platform consolidation** — when multiple vendors converge on the same architecture or pricing model
- **Security/safety incidents** — when an exploit, attack, or postmortem lands
- **Regulatory action** — when an agency, court, or jurisdiction moves
- **Capital/business signals** — when major funding, M&A, or enterprise deployment happens
- **Builder pattern shifts** — when a coding/agent practice changes meaningfully
- **Cultural/discourse moments** — when a debate, narrative, or framing crosses platforms

These are starting templates, not constraints. Let the week's data drive what themes exist.

### Step 3 — Write each theme
For every theme:
- **theme_id** — kebab-case stable identifier. Pick names that survive across weeks (`agent-platform-pricing`, not `april-22-pricing-news`). This is critical for recurrence tracking.
- **headline** — lead with the answer. Max 140 chars.
- **summary** — 2-3 sentences. State what's happening across sources, name specific products/labs/agencies/numbers.
- **implication** — one sentence on what an enterprise AI team should watch or do.
- **citations** — minimum 2, ideally 3-6, drawn from multiple source tabs. Each citation needs `tab_id`, `item_id` (from the source file), `label` (a short reference like "GPT-5.5 ships April 23"), and `primary_url`.
- **recurrence** — see Step 4.
- **tags** — short topic tags (e.g. `frontier-models`, `agents`, `regulation`).

### Step 4 — Compute recurrence
Read `data/{prior_week_start}/overview.json` if it exists. For each theme in the current week:

- If `theme_id` did **not** appear in the prior week → `status: "new"`, `weeks_count: 1`, `first_seen_week: {current_week}`.
- If `theme_id` appeared in the prior week with similar or higher citation count → `status: "returning"`, increment `weeks_count` from prior week's value.
- If `theme_id` appeared in the prior week but with **fewer** citations than current → `status: "intensifying"`, increment `weeks_count`.
- If a theme appeared in prior week but does NOT appear this week, it is **fading** — surface this in `deltas_vs_prior_week.themes_dropped_off`.

Also compute `deltas_vs_prior_week`: arrays of `theme_id`s that are new, dropped, or intensifying, plus a one-paragraph note.

### Step 5 — Build the theme tracker
Walk every prior `data/*/overview.json` (oldest to newest). For every `theme_id` that has appeared in **2 or more weeks** (including the current one), build an entry:
- `weeks_active` — how many weeks total
- `first_seen_week` — earliest appearance
- `intensity_history` — one entry per week, with `citation_count` from that week's overview

This becomes the cross-week tracker shown on the Overview page.

### Step 6 — Build the 90-second brief
Pick the 5–10 single highest-scoring items across **all 7 source tabs combined**, ranked by composite score (top_pick.score.total). Each entry references the underlying item by `tab_id` and `item_id`. Each gets a one-line takeaway that someone could read in 5 seconds.

### Step 7 — Headline
Write one sentence (≤ 200 chars) framing the entire week. This is what the user reads if they only see the page title. Lead with the answer.

## Editorial rules

- **Never name the reader, their team, or any specific employer.** Use "an enterprise AI team", "this kind of organization", "your team".
- **Lead with the answer** in every summary, headline, implication, and one_line.
- **No marketing language** — no "game-changing", "revolutionary", "AI-powered" as a standalone descriptor.
- **Numbers must come from the source tabs**, not invented. If you cite a number, it must trace back to an item in one of the 7 tabs.
- **Themes must be defensible.** If a theme has only 1-2 citations from a single tab, reject it.
- **theme_id stability is non-negotiable.** Once a theme is named, that exact ID must be reused in future weeks. The whole recurrence system depends on this.

## When done
1. Validate by walking the schema mentally — every required field present, no extras.
2. Print a summary: how many themes, how many returning vs new, deltas summary, 90-second brief item count.
3. **Do not commit or push.** The orchestrator handles git.
