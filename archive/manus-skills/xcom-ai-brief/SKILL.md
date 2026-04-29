---
name: xcom-ai-brief
description: Research X.com (Twitter) for the latest AI discourse, announcements, threads, and debates and produce a weekly publication-ready intelligence brief for Bill's AI Intelligence Hub. Use when asked to "create the X.com brief", "write the X brief", "produce the weekly X/Twitter AI brief", "generate the X.com AI report", or "run the X.com brief pipeline".
---

# X.com AI Intelligence Brief — Weekly Production Skill

Research X.com (Twitter) for the latest AI discourse, announcements, threads, and debates published in the past 7 days. Produce a comprehensive, publication-ready markdown brief for Bill's AI Intelligence Hub dashboard under the "X.com" tab.

## Bill's Context

Bill is an **AI & Innovation Leader at a publicly traded company** (Microsoft shop). His team uses: **Claude Code** (primary coding agent), **Manus** (autonomous AI agent), **OpenClaw** (open-source agent framework), **Perplexity Computer** (research agent), **Google Antigravity** (AI IDE), **NotebookLM** (research notebook), **Claude Desktop / Claude Cowork**.

Every recommendation must be actionable for a senior AI leader at a publicly traded Microsoft-shop company. Never upload or reference sensitive company information.

## Workflow

1. **Research** — Monitor priority accounts, execute search queries, collect posts/threads (minimum 25, target 30-35)
2. **Score** — Apply 5-dimension scoring methodology (minimum 7.0/10 threshold)
3. **Deduplicate** — Compare against prior week's brief (80% freshness target)
4. **Write** — Produce the brief in the exact 8-section structure
5. **Output** — Save as `weekly_x_brief_[YYYY_MM_DD].md` (Monday date)

## Step 1: Research

### Priority Accounts

For the full tiered account list, read `references/accounts-and-queries.md`.

**Key Tier 1 accounts (always check):** @sama, @OpenAI, @AnthropicAI, @claudeai, @satyanadella, @karpathy, @ylecun, @emollick, @perplexity_ai.

### Search Queries

Run these searches filtered to the past 7 days on X.com:

| # | Query | Purpose |
|---|-------|---------|
| 1 | `AI agents` (min_faves:100) | Agentic discourse |
| 2 | `Claude Code` OR `Claude update` | Bill's primary tool |
| 3 | `OpenClaw` OR `open claw` | Bill's agent framework |
| 4 | `GPT` from:sama OR from:OpenAI | OpenAI developments |
| 5 | `Copilot` from:satyanadella OR from:Microsoft | Microsoft AI |
| 6 | `AI enterprise` (min_faves:50) | Enterprise AI |
| 7 | `AI coding tools` | Dev tool landscape |
| 8 | `Perplexity Computer` | Bill's research agent |
| 9 | `AI safety` OR `AI governance` (min_faves:100) | Policy/safety |
| 10 | `AI agents production` OR `agentic workflows` | Production agents |

Also check: X.com trending topics related to AI, major hashtags (#AIAgents, #ClaudeCode, #GPT, #AgenticAI).

### Content Selection

Collect minimum **25 posts/threads** (target 30-35). For each, record: author name, handle, date, full text or thread summary, direct X.com URL, engagement metrics (likes, retweets, replies), post type (standalone/thread/repost).

## Step 2: Scoring

Score each post/thread on a **5-dimension, 10-point scale**. Final score = average, reported to one decimal place.

| Dimension | 10 | 7-8 | 4-6 | 1-3 |
|---|---|---|---|---|
| **Practical Applicability** | Immediately actionable for Bill | Useful with adaptation | Informational | Not applicable |
| **Recency** | Breaking news this week | This week's discourse | Recent rehash | Old news |
| **Source Credibility** | CEO/CTO/official account | Recognized expert | Established practitioner | Unknown |
| **Tool Stack Fit** | Directly about Bill's tools | Adjacent tools | General AI | Unrelated |
| **Uniqueness of Signal** | First/exclusive signal | Unique angle | Widely covered | Duplicate |

Only include posts scoring **7.0/10 or above** in the main sections.

## Step 3: Deduplication

Compare all candidates against the prior week's X.com brief.

1. **Direct Duplicates** — Same post/thread from last week: exclude entirely
2. **Thematic Overlap** — Same topic, new post/source: include with `[RETURNING THEME]` badge
3. **Returning Accounts** — Same author, new content: include normally (no badge)
4. **Freshness Target** — At least 80% of content must be entirely new
5. **No Updates** — Write: *"No major new developments this week."*

## Step 4: Write the Brief

Produce a single markdown file with **exactly 8 sections**. For the exact section templates and formatting, read `references/output-format.md`.

### Section Structure Overview

| Section | Title | Content |
|---------|-------|---------|
| Header | Weekly X.com AI Intelligence Brief | Date range, about-this-brief block |
| 1 | Executive Summary — Top 5 Things Bill Needs to Know | 5 numbered analytical paragraphs with bold action items |
| 2 | Top Picks — Highest-Scored Posts & Threads | Top 5 posts (min 8.0/10) with quotes, takeaways, actions |
| 3 | Tool Announcements — New Launches & Major Updates | Table of tools (min 8 rows) with relevance ratings |
| 4 | Key Insights & Threads — Best Substantive Content | 3-5 threads with multi-paragraph summaries |
| 5 | Hot Takes & Debates — Significant Discussions | 3-4 debates with enterprise implications |
| 6 | Emerging Signals — Early Trends Gaining Traction | 4-6 emerging signals with analysis |
| 7 | Full Post Index — All Posts Reviewed | Table of ALL posts (min 25 rows) |
| 8 | Suggested Search Refinements | Accounts to add/deprioritize, topics to add |

## Quality Standards

1. **Tone:** Professional, analytical, executive-level. No hype. No emoji.
2. **Depth:** Each Top Pick must include direct quotes or close paraphrases. Summaries: 3-5 sentences of substantive analysis.
3. **Actionability:** Every Top Pick and Thread must end with specific recommendations for Bill.
4. **Completeness:** All 8 sections populated. No empty sections.
5. **Links:** Every post must include a direct X.com URL. No shortened URLs.
6. **Prose Style:** Professional paragraphs for analysis. Tables for structured data. Bullet points for takeaways/actions.
7. **Length:** 3,000-6,000 words total.

## Step 5: Output

Save as: `weekly_x_brief_[YYYY_MM_DD].md` where the date is the Monday of the coverage week.
