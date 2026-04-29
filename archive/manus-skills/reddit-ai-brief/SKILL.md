---
name: reddit-ai-brief
description: Research Reddit for the latest AI discussions, tool reviews, practical workflows, and community debates and produce a weekly publication-ready intelligence brief for Bill's AI Intelligence Hub. Use when asked to "create the Reddit brief", "write the Reddit AI brief", "produce the weekly Reddit intelligence brief", "generate the Reddit AI report", or "run the Reddit brief pipeline".
---

# Reddit AI Intelligence Brief — Weekly Production Skill

Research Reddit for the latest AI discussions, tool reviews, practical workflows, and community debates published in the past 7 days. Produce a comprehensive, publication-ready markdown brief for Bill's AI Intelligence Hub dashboard under the "Reddit" tab.

**CRITICAL:** This brief uses a **fixed 7-section structure** every week. Do not merge, split, or rename sections.

## Bill's Context

Bill is an **AI & Innovation Leader at a publicly traded company** (Microsoft shop). His team uses: **Claude Code** (primary coding agent), **Manus** (autonomous AI agent), **OpenClaw** (open-source agent framework), **Perplexity Computer** (research agent), **Google Antigravity** (AI IDE), **NotebookLM** (research notebook), **Claude Desktop / Claude Cowork**.

Never upload or reference sensitive company information.

## Workflow

1. **Research** — Monitor subreddits, execute search queries, collect threads (minimum 20, target 25-30)
2. **Score** — Apply 5-dimension scoring methodology (minimum 7.0/10 threshold)
3. **Deduplicate** — Compare against prior week's brief (80% freshness target)
4. **Write** — Produce the brief in the exact 7-section structure
5. **Output** — Save as `weekly_reddit_brief_[YYYY_MM_DD].md` (Monday date)

## Step 1: Research

### Subreddits to Monitor

For the full tiered subreddit list, read `references/subreddits-and-queries.md`.

**Tier 1 (Bill's tool stack):** r/ClaudeAI, r/ClaudeCode, r/perplexity_ai, r/ManusOfficial, r/AutoGPT, r/google_antigravity, r/notebooklm.

**Tier 2 (core AI):** r/artificial, r/ArtificialInteligence, r/MachineLearning, r/singularity, r/LocalLLaMA, r/ChatGPT, r/OpenAI, r/AI_Agents.

**Tier 3 (business/practical):** r/SaaS, r/startups, r/Entrepreneur, r/SideProject, r/productivity, r/LangChain, r/LangGraph, r/BetterOffline.

### Search Queries

For each Tier 1 and Tier 2 subreddit, search for posts from the past 7 days sorted by: Top (this week), Hot, and Rising. Also run cross-subreddit searches:

| # | Query | Purpose |
|---|-------|---------|
| 1 | `AI agents production` | Agentic workflow discussions |
| 2 | `Claude Code` | Bill's primary tool |
| 3 | `OpenClaw` | Bill's agent framework |
| 4 | `Perplexity Computer` | Bill's research agent |
| 5 | `NotebookLM` | Bill's research tool |
| 6 | `Antigravity IDE` | Bill's AI IDE |
| 7 | `AI automation workflow` | Practical implementations |
| 8 | `AI enterprise` | Business applications |
| 9 | `AI coding tools comparison` | Tool landscape |
| 10 | `Manus AI` | Bill's autonomous agent |

### Thread Selection

Collect minimum **20 threads** (target 25-30). For each, record: title, subreddit, post date, URL, upvote count, comment count, post summary, top community reactions/comments.

## Step 2: Scoring

Score each thread on a **5-dimension, 10-point scale**. Final score = average, reported to one decimal.

| Dimension | 10 | 7 | 4 | 1 |
|---|---|---|---|---|
| **Practical Applicability** | Immediately actionable for Bill | Useful with adaptation | Informational | Not applicable |
| **Recency** | Breaking discussion this week | Active this week | Recent rehash | Old topic |
| **Source Credibility** | Verified expert/detailed technical post | Experienced practitioner | General user | Low-effort post |
| **Tool Stack Fit** | Directly about Bill's tools | Adjacent tools | General AI | Unrelated |
| **Uniqueness of Signal** | Novel insight/workflow | Unique angle | Common discussion | Frequently repeated |

## Step 3: Deduplication

Compare all candidates against the prior week's Reddit brief.

1. **Direct Duplicates** — Same thread from last week: exclude entirely
2. **Thematic Overlap** — Same topic, new thread: include with `[RETURNING THEME]` badge
3. **Returning Tools** — Same tool, new discussion: include with `[RETURNING]` badge if it was a Top Pick last week
4. **Freshness Target** — At least 80% of content must be entirely new
5. **No Updates** — Write: *"No major new developments this week."*

## Step 4: Write the Brief

Produce a single markdown file with **exactly 7 sections**. For the exact section templates and formatting, read `references/output-format.md`.

### Section Structure Overview

| Section | Title | Content |
|---------|-------|---------|
| Header | Weekly Reddit AI Intelligence Brief | Date, prepared for Bill, focus statement |
| 1 | Executive Summary | 3-4 bullet themes with analysis and references |
| 2 | Top Picks | Top 3-5 threads with summaries and action items |
| 3 | Viral Threads & Hot Debates | 5-8 high-engagement threads and debates as subsections |
| 4 | Practical Use Cases & Workflows | 2-4 real-world implementations |
| 5 | Emerging Signals | 2-4 niche trends gaining traction |
| 6 | Full Thread Index | Table of ALL threads (min 20 rows) |
| 7 | Suggested Search Refinements for Next Week | 3-5 recommendations |
| Refs | References | Numbered list of all Reddit URLs |

## Quality Standards

1. **Tone:** Professional, analytical, executive-level. No hype. No emoji.
2. **Depth:** Top Pick summaries must be 2-3 paragraphs with specific details from the thread and community reaction.
3. **Actionability:** Every Top Pick and Use Case must include specific "Action Items for Bill."
4. **Completeness:** All 7 sections populated every week. No empty sections.
5. **Links:** Every thread must include a direct Reddit URL.
6. **Community Voice:** Include specific upvote counts, comment counts, and notable community reactions.
7. **Length:** 2,000-4,000 words total.

## Step 5: Output

Save as: `weekly_reddit_brief_[YYYY_MM_DD].md` where the date is the Monday of the coverage week.
