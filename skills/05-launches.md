# Launches — Launch Intelligence

## Mission

Track new AI products, model releases, and funding rounds with an evaluation lens. Every Top Pick gets an explicit recommendation: EVALUATE NOW, ADD TO WATCHLIST, MONITOR, or SKIP.

## Source list

**Tier 1 — frontier-lab primary sources (always check):**
- openai.com/blog, anthropic.com/news, blog.google/technology/ai, ai.meta.com/blog, mistral.ai/news, x.ai/blog, deepmind.google/discover/blog
- Hugging Face blog (model releases)
- **Microsoft Blog** (`blogs.microsoft.com/ai`, `microsoft.com/en-us/microsoft-copilot/blog`) — Copilot, M365 AI, Azure AI feature drops. Critical for the Microsoft-shop reader.

**Product launch platforms:**
- **Product Hunt** — top launches of the week with AI tag
- **GitHub Trending** — weekly trending AI repos that ship as products
- **Hacker News** — `Launch HN` and `Show HN` posts with AI relevance
- **YC Launch** (`ycombinator.com/launches`) and the **YC W26/S26 batch page** as it fills in
- **ProductCool** — curated AI product launches (secondary)

**Startup & funding (cross-check every claim against the company's own announcement):**
- **TechCrunch** AI funding tag (`techcrunch.com/category/artificial-intelligence`)
- **VentureBeat** — enterprise AI platform announcements (`venturebeat.com/ai`)
- **SiliconAngle** — AI infrastructure news
- **TechFundingNews** — AI funding rounds
- a16z and Sequoia portfolio AI launches (when public)
- Pitchbook public-info funding for cross-check

**Enterprise & cloud platforms:**
- **AWS** (`aws.amazon.com/blogs/machine-learning`, `aws.amazon.com/about-aws/whats-new`)
- **Azure** (`azure.microsoft.com/en-us/blog`, focus AI/Copilot tags)
- **Google Cloud** (`cloud.google.com/blog/products/ai-machine-learning`)
- **Snowflake**, **Databricks**, **Salesforce** AI feature launches
- **Nvidia** (esp. around GTC)

## Method

1. Pull each source for the week's window.
2. **Verification is critical here** — funding numbers, model claims, pricing. Cross-check funding announcements against the company's own site, not just press coverage. If a TechCrunch number contradicts the company's press release, drop the item into `flagged_unverified`.
3. For each candidate, classify by category: Frontier Model / Enterprise AI / Dev Tools / AI Agent / Vertical SaaS / Open Source / Hardware.
4. Apply evaluation badge:
   - **EVALUATE NOW** — High strategic relevance, GA or near-GA, fits a regulated enterprise context.
   - **ADD TO WATCHLIST** — Promising but early; track for next 1–2 quarters.
   - **MONITOR** — Worth knowing about; not a near-term decision.
   - **SKIP** — Hype-driven, not enterprise-relevant.

## Cross-source search queries

| # | Query | Purpose |
|---|-------|---------|
| 1 | `AI product launch this week` | General launches |
| 2 | `AI startup funding 2026` / `AI Series A 2026` | Funding rounds |
| 3 | `AI agent platform launch` | Agentic tools |
| 4 | `Product Hunt AI top` | PH launches |
| 5 | `GitHub trending AI weekly` | Open source |
| 6 | `YC W26 AI` / `YC S26 AI` | Y Combinator |
| 7 | `enterprise AI platform launch` | Enterprise GA |
| 8 | `MCP server launch` | MCP ecosystem |
| 9 | `Microsoft Copilot update` | Microsoft-shop relevant |
| 10 | `Azure AI new feature` | Azure AI |

## Freshness & recurrence

Set `freshness.target_pct_new = 0.85` (launches need higher freshness than discussion tabs) and `min_items = 20`. Against last week's `data/<prev_week>/launches.json`:

- **Direct duplicate** — exclude entirely (do NOT re-list).
- **Updates to prior launch** with genuinely new info (features, pricing, funding) — `recurrence: "returning"` with `recurrence_note` describing what changed.
- **GitHub repos** trending two weeks running — `recurrence: "returning"`, note the star count delta.
- **Same category, different product** — `recurrence: "new"`.
- Empty section line: `"No significant new launches this week in this category."`

## Output structure (`launches.json`)

`tab_id: "launches"`, `subtitle: "Launch Intelligence"`, `icon: "Rocket"`.

**Sections:**
1. `executive_summary` — 3–5 bullets covering biggest launches
2. `top_picks` — 5–8 launches with `category`, `evaluation`, `competitive_context`, `pricing` where known
3. `product_hunt` — Top 8–12 PH launches sorted by upvotes (table)
4. `github_trending` — Top trending AI repos (min 6 rows, table)
5. `frontier_models` — Any new model releases (separate from Top Picks for visibility)
6. `yc_and_startups` — 3–6 notable YC W26/S26 companies and funded startups
7. `enterprise_ai` — Enterprise platform launches (Microsoft / cloud / data platforms)
8. `funding` — Notable AI funding rounds (verified against company source)
9. `open_source` — Notable open-source releases / dev tool launches
10. `to_watch` — Early-stage with high signal
11. `index` — All launches considered, **min 20 rows** (`min_items: 20`)
12. `suggested_refinements`

## Per-item required fields

- `title`, `source` (vendor / publication), `date`, `primary_url` (vendor announcement first; press article only if no vendor source), `summary`, `score`, `category`, `evaluation`, `verified`, `verified_at`
- Top Picks: `competitive_context`, `pricing`, `key_takeaways`

## What to drop

- "Pre-launch" / waitlist-only items with no real product
- Re-announcements of existing features
- Funding rounds where the company press release contradicts the news article (flag in `flagged_unverified`)
- Pure consumer apps with no enterprise relevance, unless the underlying technology is novel
