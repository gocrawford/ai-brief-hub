# Reddit — Community Intelligence

## Mission

Reddit shows what's actually working (or breaking) for practitioners outside the marketing layer. Long-form post-mortems, honest tool reviews, and emerging frustrations show up here first.

## Source list

**Tier 1 — always search (lab + frontier-tool communities):**
- r/ClaudeAI, r/ClaudeCode, r/OpenAI, r/ChatGPT, r/ChatGPTCoding
- r/perplexity_ai, r/cursor
- r/ManusOfficial, r/AutoGPT, r/google_antigravity (also r/GoogleAntigravityIDE), r/notebooklm

**Tier 2 — core AI communities:**
- r/artificial, r/ArtificialInteligence (note the typo — it's the larger sub), r/MachineLearning
- r/singularity (signal-filter heavily — high noise), r/LocalLLaMA, r/LocalLLM
- r/AI_Agents, r/AutoGenAI, r/LangChain, r/LangGraph

**Tier 3 — business / practical / critical:**
- r/SaaS, r/startups, r/Entrepreneur, r/SideProject, r/productivity
- r/EnterpriseAI, r/automation, r/n8n
- r/BetterOffline (deliberate inclusion — the AI-skeptic angle catches enterprise risks the boosters miss)

## Method

1. For each Tier 1 and Tier 2 subreddit, fetch posts from the week sorted by Top, Hot, and Rising. Use `browser_task` against `old.reddit.com/r/<sub>/top/?t=week` for cleaner DOM, or the JSON API at `reddit.com/r/<sub>/top.json?t=week`.
2. Filter by upvote threshold per subreddit (the threshold varies — set per-sub minimums in the index, e.g., r/ClaudeAI ≥ 50, r/MachineLearning ≥ 100, r/LocalLLaMA ≥ 75, r/BetterOffline ≥ 100).
3. Run cross-subreddit search queries: `Claude Code`, `Manus`, `Perplexity Computer`, `NotebookLM`, `Antigravity IDE`, `MCP server`, `AI agents production`, `multi-agent system`, `RAG implementation`, `AI cost optimization`, `AI enterprise deployment`.
4. For each candidate, verify the URL resolves and capture upvotes + top comment count.
5. Read at least the post body and top 3 comments before summarizing — Reddit threads often have the real signal in comments.
6. Tool Reviews section: when a thread is a review, capture community sentiment (split positive/negative if significant).

## Freshness & recurrence

Set `freshness.target_pct_new = 0.80` and `min_items = 20`. Compare every candidate against last week's `data/<prev_week>/reddit.json` index by `id` slug:

- **Direct duplicate** (same thread): exclude entirely — do not list anywhere.
- **Same topic, new thread**: include with `recurrence: "returning_theme"` and a one-line `recurrence_note`.
- **Same tool, new discussion**: include with `recurrence: "returning"` if it was a Top Pick last week.
- **Otherwise**: `recurrence: "new"` (default).

If a section has nothing new, set `freshness.empty_week_note: "No major new developments this week."` and ship the section empty rather than padding.

## Output structure (`reddit.json`)

`tab_id: "reddit"`, `subtitle: "Community Intelligence"`, `icon: "MessageCircle"`.

**Sections:**
1. `executive_summary` — 3–4 bullets
2. `top_picks` — 4–6 threads
3. `viral_threads` — Threads with > 500 upvotes regardless of category
4. `use_cases` — Real workflow examples; each gets an `enterprise_translation`
5. `tool_reviews` — Honest community reviews; each has a `recommendation`
6. `hot_debates` — Active disagreements with multiple positions
7. `emerging_signals` — Patterns
8. `index` — All threads, **min 20 rows** (`min_items: 20`)
9. `suggested_refinements`

## Per-item required fields

- `title`, `source` (subreddit name with r/ prefix), `author` (u/handle), `date`, `primary_url` (reddit.com permalink), `summary`, `score`, `engagement.upvotes`, `engagement.comments`, `verified`, `verified_at`

## What to drop

- Image/meme posts
- "ChatGPT prompt that will change your life" listicles
- Pure career/job posts
- Cross-posted news without unique commentary
