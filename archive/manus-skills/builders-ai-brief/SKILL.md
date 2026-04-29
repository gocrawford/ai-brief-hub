---
name: builders-ai-brief
description: Research developer communities, hacker forums, ML platforms, and technical blogs for practical AI implementations and produce a weekly publication-ready intelligence brief for Bill's AI Intelligence Hub. Use when asked to "create the Builders brief", "write the Builders AI brief", "produce the weekly Builders intelligence brief", "generate the Builders report", or "run the Builders brief pipeline".
---

# Builders AI Intelligence Brief — Weekly Production Skill

Research developer communities, hacker forums, ML platforms, and technical blogs for the latest practical AI implementations, automation workflows, and builder stories published in the past 7 days. Produce a comprehensive, publication-ready markdown brief for Bill's AI Intelligence Hub dashboard under the "Builders" tab.

**CRITICAL:** This brief uses a **fixed 7-section structure** every week. This is NOT a news brief — every item must describe something someone actually built, implemented, or deployed.

## Bill's Context

Bill is an **AI & Innovation Leader at a publicly traded company** (Microsoft shop). His team uses: **Claude Code** (primary coding agent), **Manus** (autonomous AI agent), **OpenClaw** (open-source agent framework), **Perplexity Computer** (research agent), **Google Antigravity** (AI IDE), **NotebookLM** (research notebook), **Claude Desktop / Claude Cowork**.

The brief focuses on **real implementations** — not announcements or hype. Every item must describe a workflow, architecture, or system that someone actually built and shared. Never upload or reference sensitive company information.

## Workflow

1. **Research** — Monitor builder communities, execute search queries, collect items (minimum 15, target 18-22)
2. **Score** — Apply 5-dimension scoring methodology
3. **Deduplicate** — Compare against prior week's brief (80% freshness target)
4. **Write** — Produce the brief in the exact 7-section structure
5. **Output** — Save as `weekly_builders_brief_[YYYY_MM_DD].md` (Monday date)

## Step 1: Research

### Sources to Monitor

For the full tiered source list, read `references/sources-and-queries.md`.

**Tier 1 (primary):** Hacker News (Show HN), Dev.to, n8n Community, Make Community, Latent Space.

**Tier 2 (technical):** GitHub Trending, Product Hunt, Weights & Biases, Indie Hackers, arXiv/Papers with Code (filter: Agents, Workflow).

**Tier 3 (supplementary):** Discord communities (AutoGPT, LangChain), Stack Overflow, Medium/Substack.

### Search Queries

| # | Query | Purpose |
|---|-------|---------|
| 1 | `AI agent workflow production` | Production implementations |
| 2 | `Claude Code automation` | Bill's primary tool |
| 3 | `OpenClaw workflow` | Bill's agent framework |
| 4 | `n8n AI automation template` | Workflow automation |
| 5 | `AI agent architecture` | System design patterns |
| 6 | `RAG implementation production` | RAG builds |
| 7 | `MCP model context protocol` | Integration standard |
| 8 | `AI testing automation` | Quality assurance |
| 9 | `multi-agent system` | Orchestration patterns |
| 10 | `AI cost optimization` | Efficiency patterns |

### Content Selection

Collect minimum **15 items** (target 18-22). Prioritize content with: specific implementation details (architecture, code, tools used), measurable results (time saved, accuracy, cost), replicable workflows Bill's team could adapt.

## Step 2: Scoring

Score each item on a **5-dimension, 10-point scale**. Final score = average, reported to one decimal.

| Dimension | 10 | 7 | 4 | 1 |
|---|---|---|---|---|
| **Practical Replicability** | Bill's team can implement this week | Adaptable with effort | Conceptual value | Not replicable |
| **Implementation Specificity** | Full architecture + code + results | Detailed workflow | High-level overview | Vague claims |
| **Measurable Results** | Hard metrics (time, cost, accuracy) | Qualitative results | Anecdotal | No results shared |
| **Tool Stack Fit** | Uses Bill's exact tools | Adjacent tools | General AI | Unrelated |
| **Uniqueness** | Novel approach | Creative adaptation | Standard pattern | Commonly known |

## Step 3: Deduplication

Compare all candidates against the prior week's Builders brief.

1. **Direct Duplicates** — Same project/post from last week: exclude entirely
2. **Thematic Overlap** — Same pattern, new implementation: include with `[RETURNING METRIC]` or `[RETURNING PATTERN]` badge
3. **Returning Tools** — Same tool, new build: include with `[RETURNING]` badge
4. **Freshness Target** — At least 80% of content must be entirely new
5. **No Updates** — Write: *"No major new implementations this week."*

## Step 4: Write the Brief

Produce a single markdown file with **exactly 7 sections**. For the exact section templates and formatting, read `references/output-format.md`.

### Section Structure Overview

| Section | Title | Content |
|---------|-------|---------|
| Header | Weekly Builders AI Intelligence Brief | Date, prepared for Bill & Team |
| 1 | Executive Summary | Overview + top 3 builder stories + key takeaway |
| 2 | Top Picks | Top 3-4 implementations with full analysis |
| 3 | Automation Wins & Implementations | 3-5 automation builds as subsections |
| 4 | Agent & Architecture Insights | 3-5 technical builds as subsections |
| 5 | Emerging Patterns & Market Shifts | 3-5 recurring themes across builders |
| 6 | Full Content Index (Scored & Ranked) | Table of ALL items (min 15 rows) |
| 7 | Suggested Search Refinements for Next Week | 3-5 recommendations |
| Refs | References | Numbered list of all source URLs |

## Quality Standards

1. **Tone:** Technical but accessible. Written for a senior leader who understands AI but wants implementation details.
2. **Depth:** Top Pick summaries must include specific architecture details, tools used, and measurable results.
3. **Actionability:** Every Top Pick must end with "How Bill's Team Could Adapt This" — specific, practical recommendations.
4. **Completeness:** All 7 sections populated every week.
5. **Links:** Every item must include a source URL.
6. **Builder Focus:** Every item must describe something someone actually built, implemented, or deployed.
7. **Length:** 2,500-4,500 words total.

## Step 5: Output

Save as: `weekly_builders_brief_[YYYY_MM_DD].md` where the date is the Monday of the coverage week.
