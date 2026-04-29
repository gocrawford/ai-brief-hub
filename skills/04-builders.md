# Builders — Builder Intelligence

## Mission

What practitioners are actually building. Code-level signal: trending repos, HN technical threads, n8n/Make automation patterns, indie hacker case studies. The richest tab — every Top Pick gets implementation detail and enterprise translation.

## Source list

**GitHub:**
- Trending repos (filter to AI/agent/LLM topics): `https://github.com/trending?since=weekly`
- Watch list of major projects for new releases: openai/openai-python, anthropics/anthropic-sdk-python, langchain-ai/langchain, microsoft/autogen, joaomdmoura/crewAI, run-llama/llama_index, vercel/ai, getcursor/cursor (releases page), continuedev/continue, BloopAI/bloop, modelcontextprotocol (MCP servers/clients)

**Hacker News:**
- Front page threads tagged AI/LLM during the week (use `https://hn.algolia.com/?dateRange=last_week&query=ai`)
- Show HN posts with > 50 points

**Other builder hubs:**
- n8n.io community templates and Reddit r/n8n popular workflows
- Indie Hackers product launches with AI tag
- Dev.to top AI articles
- Hugging Face — top trending models/spaces
- Replicate — featured models

## Method

1. For each source, pull the week's top items.
2. **GitHub trending:** capture repo, weekly star delta (not total — delta is the signal), description, and check the README for what's actually new.
3. **HN:** filter to threads with technical depth. Read the thread to capture the disagreement or insight.
4. **n8n / Indie Hackers:** look for templates/case studies with measurable results (time saved, cost reduced, accuracy improved).
5. Every Top Pick must answer: *"What is the implementation pattern, and how would a regulated enterprise team adapt it?"*

## Output structure (`builders.json`)

`tab_id: "builders"`, `subtitle: "Builder Intelligence"`, `icon: "Hammer"`.

**Sections:**
1. `executive_summary` — 3 bullets
2. `top_picks` — 5–7 builder stories. Each includes `key_takeaways`, `results` (with verification), `enterprise_translation`.
3. `automation_wins` — Concrete automation patterns with measurable outcomes
4. `agent_and_rag` — Agent architecture and RAG implementations worth studying
5. `tools_and_platforms` — Top 5 leaderboard of tools gaining traction
6. `emerging_patterns` — Cross-source patterns (e.g., "MCP servers proliferating")
7. `index` — All ≥ 18 items
8. `suggested_refinements`

## Per-item required fields

- `title`, `source` (GitHub / HN / n8n / IH / Dev.to / HF), `primary_url`, `summary`, `score`, `verified`, `verified_at`
- For GitHub: `engagement.stars` (week delta), `category` (e.g., "Agent Framework", "Dev Tool")
- For HN: `engagement.upvotes`, `engagement.comments`
- Top Picks: `key_takeaways`, `results`, `enterprise_translation`

## What to drop

- Repos without a working demo or README explaining what's new
- "I built X with Cursor in 5 minutes" content with no technical substance
- Listicles or aggregator posts on HN
- Repos with star manipulation patterns (sudden spike, no commits)
