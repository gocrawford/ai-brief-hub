---
name: social-ai-brief
description: Research TikTok, LinkedIn, Instagram, Facebook, and other social media platforms (excluding X.com and Reddit) for AI signals and produce a weekly publication-ready intelligence brief for Bill's AI Intelligence Hub. Use when asked to "create the Social brief", "write the Social AI brief", "produce the weekly Social media intelligence brief", "generate the Social AI report", or "run the Social brief pipeline".
---

# Social Media AI Intelligence Brief — Weekly Production Skill

Research TikTok, LinkedIn, Instagram, Facebook, and other social media platforms for the latest AI signals, viral content, tool discussions, and practitioner workflows published in the past 7 days. Produce a comprehensive, publication-ready markdown brief for Bill's AI Intelligence Hub dashboard under the "Social" tab.

**Key Distinction:** This brief covers social media platforms OTHER than X.com (Twitter) and Reddit, which have their own dedicated briefs. Focus on TikTok, LinkedIn, Instagram, Facebook, and emerging platforms.

## Bill's Context

Bill is an **AI & Innovation Leader at a publicly traded company** (Microsoft shop). His team uses: **Claude Code** (primary coding agent), **Manus** (autonomous AI agent), **OpenClaw** (open-source agent framework), **Perplexity Computer** (research agent), **Google Antigravity** (AI IDE), **NotebookLM** (research notebook), **Claude Desktop / Claude Cowork**.

The brief captures **street-level sentiment** — what practitioners, creators, and business leaders are actually saying about AI tools on social media, which often differs from official announcements. Never upload or reference sensitive company information.

## Workflow

1. **Research** — Monitor platforms and creators, execute search queries, collect items (minimum 15, target 20-25)
2. **Score** — Apply 5-dimension scoring methodology
3. **Deduplicate** — Compare against prior week's brief (80% freshness target)
4. **Write** — Produce the brief in the exact 10-section structure
5. **Output** — Save as `weekly_social_brief_[YYYY_MM_DD].md` (Monday date)

## Step 1: Research

### Platforms & Sources

For the full platform list with key creators, hashtags, and communities, read `references/platforms-and-creators.md`.

**TikTok (Primary — highest signal for emerging AI tool sentiment):** Search AI tools, Claude Code, vibe coding, AI agents, AI automation. Check key creators and hashtags.

**LinkedIn (Primary — enterprise AI signals):** Search AI agents enterprise, AI strategy, AI tools comparison. Check key voices and company pages.

**Instagram (Secondary):** Search AI tools, AI workflow, AI business. Check key creators and hashtags.

**Facebook (Secondary):** Check groups: DeepNet Group, AI Philosophy, AI for Business. Check Meta AI official page.

**Other:** YouTube Shorts cross-references, Threads (Meta) emerging discussions.

### Search Queries (Cross-Platform)

| # | Query | Purpose |
|---|-------|---------|
| 1 | `AI tools 2026` | General tool landscape |
| 2 | `Claude Code skills` | Bill's primary tool |
| 3 | `vibe coding` | Natural language coding trend |
| 4 | `AI agents enterprise` | Business applications |
| 5 | `OpenClaw` | Bill's agent framework |
| 6 | `AI automation workflow` | Practical implementations |
| 7 | `NotebookLM` | Bill's research tool |
| 8 | `Google Antigravity` | Bill's AI IDE |
| 9 | `AI tool comparison` | Tool evaluations |
| 10 | `AI coding tools` | Developer tool landscape |

### Content Selection

Collect minimum **15 items** (target 20-25) across all platforms. For each, record: platform, creator name/handle, post date, direct URL, engagement metrics (likes, shares, comments, views), content summary, platform-specific context.

## Step 2: Scoring

Score each item on a **5-dimension, 10-point scale**. Final score = average, reported to one decimal.

| Dimension | 10 | 7 | 4 | 1 |
|---|---|---|---|---|
| **Practical Applicability** | Immediately actionable for Bill | Useful with adaptation | Informational | Not applicable |
| **Virality / Reach** | Massive engagement (10K+ likes) | Strong engagement | Moderate | Minimal |
| **Source Credibility** | Recognized industry expert | Established creator | Emerging voice | Unknown |
| **Tool Stack Fit** | Directly about Bill's tools | Adjacent tools | General AI | Unrelated |
| **Uniqueness of Signal** | Exclusive insight not found elsewhere | Unique angle | Common coverage | Duplicate |

## Step 3: Deduplication

Compare all candidates against the prior week's Social brief.

1. **Direct Duplicates** — Same post from last week: exclude entirely
2. **Same Creator, New Content** — Include normally (no badge)
3. **Same Tool, New Coverage** — Include with `[RETURNING]` badge if it was a Top Pick last week
4. **Same Trend, New Evidence** — Include with `[RETURNING TREND]` badge
5. **Freshness Target** — At least 80% of content must be entirely new
6. **No Content** — Write: *"No significant AI content this week on [platform]."*

## Step 4: Write the Brief

Produce a single markdown file with **exactly 10 sections**. For the exact section templates and formatting, read `references/output-format.md`.

### Section Structure Overview

| Section | Title | Content |
|---------|-------|---------|
| Header | Weekly Social Media AI Intelligence Brief | Date, prepared for Bill, category line |
| 1 | Executive Summary | Overview + top 3 social media AI signals |
| 2 | Top Picks | Top 3-5 posts across all platforms |
| 3 | LinkedIn Highlights | 3-5 notable LinkedIn posts |
| 4 | TikTok Viral | 3-5 viral/notable TikTok posts |
| 5 | Instagram Discoveries | 2-4 notable Instagram posts |
| 6 | Facebook Community Signals | 2-4 notable Facebook posts/discussions |
| 7 | Tools Trending on Social | 4-6 tools getting most social attention |
| 8 | Emerging Social Signals | 3-5 early trends across platforms |
| 9 | Full Content Index | Table of ALL content (min 15 rows) |
| 10 | Suggested Search Refinements | Keywords, accounts, hashtags, communities |
| Refs | References | All source URLs |

## Quality Standards

1. **Tone:** Professional but attuned to social media culture. Acknowledge virality without being informal.
2. **Depth:** Top Picks must include specific engagement metrics, creator context, and actionable takeaways.
3. **Actionability:** Every Top Pick must end with "Practical Takeaway for Bill's Team."
4. **Completeness:** All 10 sections populated. If a platform has no content, note it explicitly.
5. **Links:** Every item must include a direct URL.
6. **Sentiment Capture:** Include specific community reactions, comment highlights, and engagement patterns.
7. **Cross-Platform Patterns:** Identify when the same tool or trend appears across multiple platforms.
8. **Length:** 2,000-4,000 words total.

## Step 5: Output

Save as: `weekly_social_brief_[YYYY_MM_DD].md` where the date is the Monday of the coverage week.
