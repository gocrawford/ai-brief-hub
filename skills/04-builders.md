# Builders — Builder Intelligence

## Mission

What practitioners are actually building. Code-level signal: trending repos, HN technical threads, n8n/Make automation patterns, indie hacker case studies. The richest tab — every Top Pick gets implementation detail and enterprise translation.

## Source list

**Tier 1 — primary builder communities:**
- **Hacker News** — Front page AI/LLM threads, **Show HN** posts with > 50 points (`https://hn.algolia.com/?dateRange=last_week&query=ai`); also `Show HN` filter directly
- **Dev.to** — top AI articles by week (filter: tag `ai`, `llm`, `agents`, `automation`)
- **n8n Community** (`community.n8n.io`) — workflow automation builds and templates
- **Make Community** (`community.make.com`) — visual automation builds
- **Latent Space** (`latent.space`) — swyx's AI engineering newsletter / podcast

**Tier 2 — technical platforms:**
- **GitHub Trending** — AI/agent/LLM filter: `https://github.com/trending?since=weekly`
- **GitHub watch list** for releases: openai/openai-python, anthropics/anthropic-sdk-python, langchain-ai/langchain, microsoft/autogen, joaomdmoura/crewAI, run-llama/llama_index, vercel/ai, getcursor/cursor (releases), continuedev/continue, modelcontextprotocol (MCP servers/clients)
- **Product Hunt** — new AI developer tools (also surfaced on Launches; capture builder-relevant ones here too)
- **Weights & Biases** (`wandb.ai/site/articles`) — ML tooling, eval frameworks, training reports
- **Indie Hackers** — AI-tagged product launches and case studies
- **arXiv** + **Papers with Code** — filter to **Agents**, **Workflow**, **Tool Use**, **Code Generation** categories. Prefer papers with reproducible code linked.
- **Hugging Face** — top trending models/spaces
- **Replicate** — featured models

**Tier 3 — supplementary:**
- Stack Overflow — tag `ai-agent`, `langchain`, `mcp` for implementation Q&A patterns
- Substack / Medium practitioner posts (only if they include reproducible code or measurable results)

## Method

1. For each source, pull the week's top items.
2. **GitHub trending:** capture repo, weekly star delta (not total — delta is the signal), description, and check the README for what's actually new.
3. **HN:** filter to threads with technical depth. Read the thread to capture the disagreement or insight.
4. **n8n / Make / Indie Hackers:** look for templates/case studies with measurable results (time saved, cost reduced, accuracy improved). Reject anything without numbers.
5. **arXiv / Papers with Code:** include only papers with linked code (or HF Space) so a builder team can actually run them.
6. Every Top Pick must populate `enterprise_adaptation` per the schema definition (implementation pattern + regulated-environment caveats + 30-day experiment).

## Cross-source search queries

| # | Query | Purpose |
|---|-------|---------|
| 1 | `AI agent workflow production` | Production implementations |
| 2 | `Claude Code automation` | Frontier-tool patterns |
| 3 | `n8n AI automation template` | Workflow automation |
| 4 | `AI agent architecture` | System design |
| 5 | `RAG implementation production` | RAG builds |
| 6 | `MCP model context protocol` | Integration standard |
| 7 | `AI testing automation` / `agent eval` | QA |
| 8 | `multi-agent system` | Orchestration |
| 9 | `AI cost optimization` | Efficiency |
| 10 | `agent memory persistence` | State patterns |

## Freshness & recurrence

Set `freshness.target_pct_new = 0.80` and `min_items = 15`. Against last week's `data/<prev_week>/builders.json`:

- **Same project/post** — exclude entirely.
- **Same pattern, new implementation** — `recurrence: "returning_pattern"` with note.
- **Same metric resurfacing with new evidence** — `recurrence: "returning_metric"` with note.
- **Same tool, new build** — `recurrence: "returning"`.
- Empty section line: `"No major new implementations this week."`

## Output structure (`builders.json`)

`tab_id: "builders"`, `subtitle: "Builder Intelligence"`, `icon: "Hammer"`.

**Sections:**
1. `executive_summary` — 3 bullets + 1 key takeaway
2. `top_picks` — 5–7 builder stories. Each Top Pick **MUST** include `key_takeaways`, `results` (with verification), and `enterprise_adaptation` (required field, see schema).
3. `automation_wins` — Concrete automation patterns with measurable outcomes (n8n / Make / Zapier-AI / custom)
4. `agent_and_rag` — Agent architecture and RAG implementations worth studying
5. `tools_and_platforms` — Top 5 leaderboard of tools gaining traction
6. `emerging_patterns` — Cross-source patterns (e.g., "MCP servers proliferating")
7. `index` — All items, **min 15 rows** (`min_items: 15`)
8. `suggested_refinements`

## Per-item required fields

- `title`, `source` (GitHub / HN / n8n / IH / Dev.to / HF), `primary_url`, `summary`, `score`, `verified`, `verified_at`
- For GitHub: `engagement.stars` (week delta), `category` (e.g., "Agent Framework", "Dev Tool")
- For HN: `engagement.upvotes`, `engagement.comments`
- For n8n / Make / Indie Hackers: capture template URL + measurable result in `results`
- Top Picks: `key_takeaways`, `results`, **`enterprise_adaptation`** (required)

## What to drop

- Repos without a working demo or README explaining what's new
- "I built X with Cursor in 5 minutes" content with no technical substance
- Listicles or aggregator posts on HN
- Repos with star manipulation patterns (sudden spike, no commits)
