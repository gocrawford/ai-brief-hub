# Launches — Launch Intelligence

## Mission

Track new AI products, model releases, and funding rounds with an evaluation lens. Every Top Pick gets an explicit recommendation: EVALUATE NOW, ADD TO WATCHLIST, MONITOR, or SKIP.

## Source list

**Frontier-lab announcements (Tier 1, primary sources only):**
- openai.com/blog, anthropic.com/news, blog.google/technology/ai, ai.meta.com/blog, mistral.ai/news, x.ai/blog, deepmind.google/discover/blog
- Hugging Face blog (model releases)

**Product launches:**
- Product Hunt — top launches of the week with AI tag
- YC Launch (ycombinator.com/launches) — recent batches' AI launches
- a16z portfolio AI launches
- Sequoia AI portfolio updates

**Funding:**
- TechCrunch AI funding announcements (verify against company press release)
- Pitchbook public-info funding (cross-check)

**Enterprise:**
- AWS, Azure, Google Cloud AI announcements
- Snowflake, Databricks, Salesforce AI feature launches
- Nvidia (esp. around GTC)

## Method

1. Pull each source for the week's window.
2. **Verification is critical here** — funding numbers, model claims, pricing. Cross-check funding announcements against the company's own site, not just press coverage.
3. For each candidate, classify by category: Frontier Model / Enterprise AI / Dev Tools / AI Agent / Vertical SaaS / Open Source / Hardware.
4. Apply evaluation badge:
   - **EVALUATE NOW** — High strategic relevance, GA or near-GA, fits a regulated enterprise context.
   - **ADD TO WATCHLIST** — Promising but early; track for next 1–2 quarters.
   - **MONITOR** — Worth knowing about; not a near-term decision.
   - **SKIP** — Hype-driven, not enterprise-relevant.

## Output structure (`launches.json`)

`tab_id: "launches"`, `subtitle: "Launch Intelligence"`, `icon: "Rocket"`.

**Sections:**
1. `executive_summary` — 3–5 bullets covering biggest launches
2. `top_picks` — 5–8 launches with `category`, `evaluation`, `competitive_context`, `pricing` where known
3. `product_hunt` — Top 8–12 PH launches sorted by upvotes
4. `frontier_models` — Any new model releases (separate from Top Picks for visibility)
5. `enterprise_ai` — Enterprise platform launches
6. `funding` — Notable AI funding rounds (verified)
7. `open_source` — Notable open-source releases
8. `to_watch` — Early-stage with high signal
9. `index` — All launches considered
10. `suggested_refinements`

## Per-item required fields

- `title`, `source` (vendor / publication), `date`, `primary_url` (vendor announcement first; press article only if no vendor source), `summary`, `score`, `category`, `evaluation`, `verified`, `verified_at`
- Top Picks: `competitive_context`, `pricing`, `key_takeaways`

## What to drop

- "Pre-launch" / waitlist-only items with no real product
- Re-announcements of existing features
- Funding rounds where the company press release contradicts the news article (flag in `flagged_unverified`)
- Pure consumer apps with no enterprise relevance, unless the underlying technology is novel
