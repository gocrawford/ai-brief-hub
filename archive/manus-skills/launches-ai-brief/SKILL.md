---
name: launches-ai-brief
description: Research Product Hunt, GitHub Trending, YC/startup ecosystem, enterprise AI platforms, and developer tool launches to produce a weekly publication-ready intelligence brief for Bill's AI Intelligence Hub. Use when asked to "create the Launches brief", "write the Launches AI brief", "produce the weekly Launches intelligence brief", "generate the Launches report", or "run the Launches brief pipeline".
---

# Launches AI Intelligence Brief — Weekly Production Skill

Research Product Hunt, GitHub Trending, YC/startup ecosystem, enterprise AI platforms, and developer tool launches from the past 7 days. Produce a comprehensive, publication-ready markdown brief for Bill's AI Intelligence Hub dashboard under the "Launches" tab.

This brief focuses on **new product launches, funding rounds, and platform updates** — what is shipping in the AI ecosystem this week.

## Bill's Context

Bill is an **AI & Innovation Leader at a publicly traded company** (Microsoft shop). His team uses: **Claude Code** (primary coding agent), **Manus** (autonomous AI agent), **OpenClaw** (open-source agent framework), **Perplexity Computer** (research agent), **Google Antigravity** (AI IDE), **NotebookLM** (research notebook), **Claude Desktop / Claude Cowork**.

Never upload or reference sensitive company information.

## Workflow

1. **Research** — Monitor launch platforms, execute search queries, collect launches (minimum 20, target 25-30)
2. **Score** — Apply 5-dimension scoring methodology
3. **Deduplicate** — Compare against prior week's brief (85% freshness target)
4. **Write** — Produce the brief in the exact 10-section structure
5. **Output** — Save as `weekly_launches_brief_[YYYY_MM_DD].md` (Monday date)

## Step 1: Research

### Sources to Monitor

For the full source list organized by category, read `references/sources-and-queries.md`.

**Product Launch Platforms:** Product Hunt, GitHub Trending, Hacker News (Launch HN / Show HN), ProductCool.

**Startup & Funding:** TechCrunch, VentureBeat, SiliconAngle, TechFundingNews, Y Combinator (W26/S26).

**Enterprise Platforms:** Microsoft Blog, Anthropic Blog, OpenAI Blog, Google AI Blog, AWS/Azure/GCP.

### Search Queries

| # | Query | Purpose |
|---|-------|---------|
| 1 | `AI product launch this week` | General launches |
| 2 | `AI startup funding 2026` | Funding rounds |
| 3 | `AI agent platform launch` | Agentic tools |
| 4 | `Product Hunt AI` | PH launches |
| 5 | `GitHub trending AI` | Open source |
| 6 | `YC W26 AI` | Y Combinator companies |
| 7 | `enterprise AI platform` | Enterprise launches |
| 8 | `MCP server launch` | Model Context Protocol tools |
| 9 | `AI developer tools new` | Dev tool launches |
| 10 | `AI automation tool launch` | Workflow tools |

### Content Selection

Collect minimum **20 launches** (target 25-30). For each, record: product/company name, launch date, source URL, description, pricing model, funding (if applicable), competitive context, relevance to Bill's stack.

## Step 2: Scoring

Score each launch on a **5-dimension, 10-point scale**. Final score = average, reported to one decimal.

| Dimension | 10 | 7 | 4 | 1 |
|---|---|---|---|---|
| **Market Traction** | Massive adoption/funding | Strong early traction | Early stage | Pre-launch |
| **Innovation** | Category-defining | Significant improvement | Incremental | Me-too product |
| **Enterprise Readiness** | Enterprise-grade, SOC2, etc. | Team-ready | Individual use | Prototype |
| **Tool Stack Fit** | Directly integrates with Bill's tools | Adjacent | General AI | Unrelated |
| **Timing** | Launched this week | Updated this week | Announced this week | Older news |

## Step 3: Deduplication

Compare all candidates against the prior week's Launches brief.

1. **Direct Duplicates** — Same launch from last week: exclude entirely (do NOT re-list)
2. **Updates to Prior Launches** — Genuinely new info (features, pricing, funding): include with `[RETURNING]` badge
3. **GitHub Repos** — Trending last week AND this week: include with `[RETURNING]` badge, note star count change
4. **Thematic Overlap** — Same category, different product: include normally
5. **Freshness Target** — At least 85% of content must be entirely new launches
6. **No Launches** — Write: *"No significant new launches this week in this category."*

## Step 4: Write the Brief

Produce a single markdown file with **exactly 10 sections**. For the exact section templates and formatting, read `references/output-format.md`.

### Section Structure Overview

| Section | Title | Content |
|---------|-------|---------|
| Header | Weekly Launches AI Intelligence Brief | Date, category line |
| 1 | Executive Summary | Overview + top 5 launches Bill should know |
| 2 | Top Picks | Top 3-5 launches with competitive context and pricing |
| 3 | Product Hunt Highlights | Table of top PH AI launches (min 8 rows) |
| 4 | GitHub Trending | Table of trending AI repos (min 6 rows) |
| 5 | YC & Startup Ecosystem | 3-6 notable YC companies and funded startups |
| 6 | Enterprise AI Platforms | 3-5 enterprise platform launches/updates |
| 7 | Open Source & Developer Tools | 3-5 open-source/dev tool launches |
| 8 | Launches to Watch | 3-5 promising early-stage tools |
| 9 | Full Launch Index | Table of ALL launches (min 20 rows) |
| 10 | Suggested Search Refinements | 3-5 recommendations |
| Refs | References | Numbered list of all source URLs |

## Quality Standards

1. **Tone:** Professional, analytical. Written for a senior executive evaluating tools for enterprise adoption.
2. **Depth:** Top Pick descriptions must include competitive context, pricing, and a clear evaluation recommendation.
3. **Actionability:** Every Top Pick must end with an explicit recommendation: "Evaluate Now," "Monitor," or "Add to Watchlist" with rationale.
4. **Completeness:** All 10 sections populated every week.
5. **Links:** Every launch must include a source URL.
6. **Launch Focus:** Only NEW things shipping. No general news, opinion, or analysis without a specific product launch.
7. **Length:** 2,500-4,500 words total.

## Step 5: Output

Save as: `weekly_launches_brief_[YYYY_MM_DD].md` where the date is the Monday of the coverage week.
