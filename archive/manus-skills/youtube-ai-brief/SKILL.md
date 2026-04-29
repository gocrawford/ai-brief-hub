---
name: youtube-ai-brief
description: Research YouTube for the latest AI videos and produce a weekly publication-ready intelligence brief for Bill's AI Intelligence Hub. Use when asked to "create the YouTube brief", "write the YouTube AI brief", "produce the weekly YouTube intelligence brief", "generate the YouTube AI report", or "run the YouTube brief pipeline".
---

# YouTube AI Intelligence Brief — Weekly Production Skill

Produce a comprehensive, publication-ready markdown brief from YouTube AI content published in the past 7 days. The brief feeds into Bill's live AI Intelligence Hub dashboard under the "YouTube" tab.

## Bill's Context

Bill is an **AI & Innovation Leader at a publicly traded company** (Microsoft shop). His team uses: **Claude Code** (primary coding agent), **Manus** (autonomous AI agent), **OpenClaw** (open-source agent framework), **Perplexity Computer** (research agent), **Google Antigravity** (AI IDE), **NotebookLM** (research notebook), **Claude Desktop / Claude Cowork**.

Every recommendation must be actionable for Bill's role and tool stack. Never upload or reference sensitive company information.

## Workflow

1. **Research** — Execute search queries, collect videos (minimum 15, target 20-25)
2. **Score** — Apply 5-dimension scoring methodology (minimum 7.0/10 threshold)
3. **Deduplicate** — Compare against prior week's brief (80% freshness target)
4. **Write** — Produce the brief in the exact 8-section structure
5. **Output** — Save as `weekly_ai_brief_[YYYY_MM_DD].md` (Monday date)

## Step 1: Research

### Search Queries

Run all YouTube searches filtered to past 7 days, sorted by relevance and view count.

**Core Queries (MUST run all 10):**

| # | Query | Purpose |
|---|-------|----------|
| 1 | `AI agents 2026` | Agentic workflow content |
| 2 | `Claude Code tutorial` | Bill's primary coding tool |
| 3 | `OpenClaw tutorial 2026` | Bill's agent framework |
| 4 | `Perplexity Computer` | Bill's research agent |
| 5 | `NotebookLM tutorial` | Bill's research notebook |
| 6 | `Google Antigravity AI` | Bill's AI IDE |
| 7 | `AI automation workflow business` | Enterprise automation |
| 8 | `enterprise AI strategy 2026` | Strategic content |
| 9 | `AI tools comparison 2026` | Tool landscape |
| 10 | `Manus AI agent` | Bill's autonomous agent |

**Supplementary Queries (run at least 5 of 10):** `AI news this week`, `GPT latest update`, `Gemini AI update`, `AI coding tools`, `AI agent framework`, `MCP model context protocol`, `AI productivity enterprise`, `open source AI models`, `AI safety governance`, `Copilot AI update`.

### Video Selection

For each video, record: title, channel name, upload date, URL, view count, like count (if visible), duration, brief content description.

## Step 2: Scoring

Score each video on a **5-dimension, 10-point scale**. Final score = average of all five, reported to one decimal place.

| Dimension | 10 | 7 | 4 | 1 |
|---|---|---|---|---|
| **Practical Applicability** | Immediately actionable for Bill's team | Useful with adaptation | Informational only | Not applicable |
| **Recency** | Breaking news this week | This week's content | Recent but not new | Rehashed older content |
| **Source Credibility** | Recognized expert/official channel | Established creator | Emerging creator | Unknown/unverified |
| **Tool Stack Fit** | Directly covers Bill's tools | Adjacent/complementary tools | General AI | Unrelated tools |
| **Uniqueness of Signal** | First coverage of this topic | Unique angle | Common coverage | Duplicate of widely covered news |

Only include videos scoring **7.0/10 or above** in the brief. Videos below 7.0 appear in the Full Video Index only.

## Step 3: Deduplication

Compare all candidates against the prior week's brief.

1. **Direct Duplicates** — Same video from last week: exclude entirely
2. **Thematic Overlap** — Same topic, different source, new info: include with `[RETURNING THEME]` badge
3. **Returning Tools** — Tool featured last week with genuinely new updates: include with `[RETURNING]` badge
4. **Freshness Target** — At least 80% of content must be entirely new
5. **No Updates** — Write: *"No major new developments this week. See [prior week date] brief for the most recent coverage."*

## Step 4: Write the Brief

Produce a single markdown file with **exactly 8 sections**. For the exact section templates and formatting requirements, read `references/output-format.md`.

### Section Structure Overview

| Section | Title | Content |
|---------|-------|----------|
| Header | Weekly YouTube AI Intelligence Brief | Date, prepared for Bill |
| 1 | Executive Summary | 4-5 numbered key themes (2-3 sentences each) |
| 2 | Top Picks (Highest Scored Content) | Top 3-5 videos (min score 8.5/10) with full analysis |
| 3 | Tool Updates | Table of tools with updates (min 4 rows) |
| 4 | Tutorials & How-Tos | 2-3 practical tutorial videos with steps |
| 5 | Use Cases & Demos | 2-3 real-world demos with action items |
| 6 | Emerging Signals | 3-5 early trends observed across content |
| 7 | Full Video Index | Table of ALL videos reviewed (min 15), sorted by score |
| 8 | Suggested Search Refinements | 3-5 recommendations for next week |
| Refs | References | Numbered list of all YouTube URLs cited |

## Quality Standards

1. **Tone:** Professional, analytical, written for a senior executive. No hype. No emoji.
2. **Depth:** Each Top Pick summary must be 3-5 sentences of substantive analysis.
3. **Actionability:** Every section must include at least one specific recommendation for Bill.
4. **Completeness:** All 8 sections populated. No empty sections. No placeholder text.
5. **Links:** Every video must include a working YouTube URL.
6. **Prose Style:** Complete paragraphs for summaries. Bullet points only for takeaways/actions. Tables for structured data.
7. **Length:** 2,000-4,000 words total.

## Step 5: Output

Save as: `weekly_ai_brief_[YYYY_MM_DD].md` where the date is the Monday of the coverage week.
