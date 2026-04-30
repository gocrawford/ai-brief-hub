# Builders — Builder Intelligence

## Mission

**What practitioners are actually building** — code, repos, side projects, automations. The signal here is _open source velocity_ and _community-built tools_. This page anchors on **GitHub trending repos** because that is where AI frameworks, agent skills, and MCP servers emerge before they become mainstream.

This is **NOT** a place for vendor product launches, platform pricing news, or enterprise releases. Those belong in the Launches tab. If a story would fit there, do not put it here.

## What belongs here vs. Launches (strict)

**Belongs in Builders:**

- A new open-source repo someone published this week (preferably independent / individual / small-team)
- A `Show HN` post with a working repo or live demo
- A new MCP server or agent skill someone built
- An n8n / Make / custom automation with a measurable outcome
- A standout side project, indie tool, or weird-but-cool experiment
- A self-hosted alternative to a closed-source tool gaining traction
- A community-published agent eval, dataset, or benchmark

**Does NOT belong in Builders (route to Launches instead):**

- OpenAI / Anthropic / Google / Microsoft product launches
- Vercel / GitHub / AWS platform announcements (e.g., GitHub Copilot billing, Vercel AI Gateway)
- MCP **spec** updates (those are Launches); MCP **server implementations** stay here
- API release notes from major model labs
- Anything you'd see in a corporate press release

When in doubt: if the source URL is a vendor's `.com/blog` or PR wire, it goes to Launches. If it's `github.com/<individual-or-small-org>/<repo>` or `news.ycombinator.com`, it stays here.

## Source list

**Tier 1 — primary builder signals (must be sampled every run):**

- **GitHub Trending — Weekly** (`https://github.com/trending?since=weekly`) — filter to AI/agent/LLM-relevant repos. Capture **weekly star delta**, not lifetime stars. This is the spine of the page.
- **GitHub Trending — Monthly** (`https://github.com/trending?since=monthly`) for context — repos with sustained momentum, not just a one-week spike.
- **Hacker News — Show HN, last 7 days** — filter to AI/LLM posts with > 50 points and a working repo or demo. (`https://hn.algolia.com/?dateRange=last_week&query=Show+HN+AI`)
- **Hacker News — front-page AI threads** with technical depth (read the comments to capture the disagreement or insight)
- **Awesome lists & weekly compilations** — `awesome-mcp-servers`, `awesome-llm-agents`, `awesome-claude-skills` — note new entries added this week
- **r/LocalLLaMA** weekly hot — open-weight community builds, fine-tunes, eval benchmarks
- **Latent Space** (`latent.space`) — swyx's newsletter, especially "what's new in AI engineering" sections

**Tier 2 — frameworks & ecosystem releases (capture only meaningful releases — major versions, breaking changes, or new capabilities):**

- GitHub releases watch list: `langchain-ai/langchain`, `microsoft/autogen`, `joaomdmoura/crewAI`, `run-llama/llama_index`, `vercel/ai`, `continuedev/continue`, `getcursor/cursor`, `huggingface/transformers`, `openai/swarm`, `anthropics/anthropic-sdk-*`
- **MCP servers** registry: new servers added to `modelcontextprotocol/servers` and the broader MCP server ecosystem
- **Hugging Face** trending models / Spaces (filter to community-published, not corporate)

**Tier 3 — automation & indie:**

- **n8n Community** (`community.n8n.io`) — workflow templates with measurable outcomes
- **Make Community** (`community.make.com`) — visual automation builds
- **Indie Hackers** — AI-tagged launches and case studies with revenue or usage numbers
- **Replicate** — featured community models
- **arXiv / Papers with Code** — agent / tool-use / RAG papers **with linked code repo only** (no code = goes to Research tab, not here)

## Method

1. **Start with GitHub Trending Weekly.** Pull the top 30 AI-related repos, sort by star delta, filter out forks/duplicates and known corporate repos that are simply trending due to a launch (those go to Launches).
2. **Verify each repo is a real build, not a launch artifact** — open the repo, scan the README, check the commit history. If it's just a corporate launch repo (e.g., `openai/something-just-shipped`), it goes to Launches; if it's an individual or community-built thing, it stays here.
3. **Capture for every repo:** weekly star delta, total stars, primary language, what it does in one sentence, what's new this week (latest commit / release notes), and whether it's individually-maintained vs. company-backed.
4. **Cross-reference Show HN** — if a repo appeared in a Show HN this week, link both (the Show HN URL becomes a `secondary_url` and the comment count goes into `engagement.upvotes`).
5. **Identify a New Skills & MCP Servers cohort** — anything tagged or described as an agent skill, MCP server, or prompt/eval library. These get their own section because they are highly relevant to readers building agentic systems.
6. **Find Show HN gems** — even if star count is modest, a working demo + > 50 HN points + interesting technical idea earns a spot.
7. **Automation wins** — n8n / Make / custom implementations with measurable outcomes (time saved, cost reduced, accuracy improved). Reject anything without numbers.
8. **Every Top Pick** must populate `enterprise_adaptation` (implementation pattern + regulated-environment caveats + a 30-day experiment a public-enterprise team could actually run).

## Cross-source search queries

| #   | Query                                                       | Purpose                                |
| --- | ----------------------------------------------------------- | -------------------------------------- |
| 1   | `site:github.com/trending AI`                               | Trending repos (anchor)                |
| 2   | `Show HN AI agent` (HN, last 7 days, > 50 points)           | Indie builds                           |
| 3   | `MCP server github` (this week)                             | New MCP servers                        |
| 4   | `agent skill github 2026`                                   | New agent skills repos                 |
| 5   | `r/LocalLLaMA weekly` / `r/LocalLLaMA hot`                  | Community open-weight builds           |
| 6   | `awesome-mcp-servers new entries`                           | Curated MCP additions                  |
| 7   | `n8n AI template results time saved`                        | Automation with measurable outcomes    |
| 8   | `langchain release notes` / `crewai release` / `autogen v…` | Framework updates that matter          |
| 9   | `huggingface space trending community`                      | Community-built spaces                 |
| 10  | `papers with code agent github`                             | Reproducible research with linked repo |

## Freshness & recurrence

`freshness.target_pct_new = 0.85` (higher than other tabs because GitHub trending refreshes weekly), `min_items = 18`. Against last week's `data/<prev_week>/builders.json`:

- **Same project/repo** — exclude entirely _unless_ it shipped a major release this week, in which case `recurrence: "returning"` with note explaining what's new.
- **Same pattern, new implementation** — `recurrence: "returning_pattern"` with note.
- **Same metric resurfacing with new evidence** — `recurrence: "returning_metric"` with note.
- Empty-section line: `"No major new <category> this week."` — never fabricate.

## Output structure (`builders.json`)

`tab_id: "builders"`, `subtitle: "Builder Intelligence"`, `icon: "Hammer"`.

**Sections (in this order):**

1. `executive_summary` — 3 bullets + 1 key takeaway. Lead with the strongest open-source build of the week.
2. `top_picks` — 5–7 standout builds. **Strong preference for individual or small-team projects** over corporate releases. Each Top Pick **MUST** include `key_takeaways`, `results` (with verification), and `enterprise_adaptation`.
3. `trending_repos` — **8–10 repos**, ranked by weekly star delta. Each row needs: title (org/repo), one-sentence description, weekly stars, total stars, primary language, what's new this week. Format as a leaderboard. **This is the spine of the page.**
4. `new_skills_and_mcp_servers` — **5–8 items**. Newly-published agent skills, MCP servers, prompt libraries, eval frameworks. Same format as trending repos but a dedicated section to surface this fast-growing category.
5. `show_hn_and_indie_builds` — **4–6 items**. Show HN posts with working repos/demos, indie hacker projects, side-project standouts. Include the HN points/comments and what makes it interesting.
6. `agent_and_rag_implementations` — **2–4 items**. Production-shaped agent or RAG builds worth studying — with linked code or a detailed write-up.
7. `automation_wins` — **2–4 items**. n8n / Make / custom automations with measurable outcomes (numbers required).
8. `framework_releases` — **2–4 items**. Meaningful releases from major frameworks (LangChain, AutoGen, CrewAI, llama_index, vercel/ai, etc.) — major versions or new capabilities only, not patch releases.
9. `emerging_patterns` — **2–3 cross-source patterns** the agent observed across the week's repos (e.g., "Agents are converging on three-tool patterns").
10. `index` — All items, **min 18 rows** (`min_items: 18`)
11. `suggested_refinements`

## Per-item required fields

- `title`, `source`, `primary_url`, `summary`, `score`, `verified`, `verified_at`
- **For GitHub repos:** `engagement.stars` (this is **weekly star delta**, NOT total stars — delta is the signal). Optional: `engagement.total_stars` for context. `category` (e.g., "Agent Framework", "MCP Server", "Agent Skill", "Eval Framework", "Dev Tool").
- **For HN posts:** `engagement.upvotes`, `engagement.comments`
- **For automation entries:** `results` field with concrete number (e.g., "saved 3 hrs/week", "reduced cost 40%")
- **For Top Picks:** `key_takeaways`, `results`, **`enterprise_adaptation`** (required)
- Never write `0` as a placeholder for engagement values; omit the field instead.

## What to drop

- Vendor product launches and platform pricing news (route to Launches)
- Repos without a working demo or README explaining what they do
- "I built X with Cursor in 5 minutes" content with no technical substance
- Listicles, aggregator posts, "10 best AI tools" content
- Repos with star-manipulation patterns (sudden spike, no commits, generic README)
- arXiv papers without linked code (route to Research)
- Major-lab API release notes (route to Launches)
