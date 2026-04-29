# Reddit — Community Intelligence

## Mission

Reddit shows what's actually working (or breaking) for practitioners outside the marketing layer. Long-form post-mortems, honest tool reviews, and emerging frustrations show up here first.

## Source list

**Subreddits:**
- r/ClaudeAI, r/ClaudeCode, r/OpenAI, r/ChatGPT, r/ChatGPTCoding, r/cursor
- r/LocalLLaMA, r/LocalLLM
- r/MachineLearning, r/singularity (signal-filter heavily — r/sing has noise)
- r/AI_Agents, r/AutoGenAI, r/LangChain
- r/perplexity_ai, r/automation, r/n8n
- r/artificial, r/EnterpriseAI

## Method

1. For each subreddit, fetch posts from the week sorted by Top. Use `browser_task` against `old.reddit.com/r/<sub>/top/?t=week` for cleaner DOM, or the JSON API at `reddit.com/r/<sub>/top.json?t=week`.
2. Filter by upvote threshold per subreddit (the threshold varies — set per-sub minimums in the index, e.g., r/ClaudeAI ≥ 50, r/MachineLearning ≥ 100, r/LocalLLaMA ≥ 75).
3. For each candidate, verify the URL resolves and capture upvotes + top comment count.
4. Read at least the post body and top 3 comments before summarizing — Reddit threads often have the real signal in comments.
5. Tool Reviews section: when a thread is a review, capture community sentiment (split positive/negative if significant).

## Output structure (`reddit.json`)

`tab_id: "reddit"`, `subtitle: "Community Intelligence"`, `icon: "MessageCircle"`.

**Sections:**
1. `executive_summary` — 3 bullets
2. `top_picks` — 4–6 threads
3. `viral_threads` — Threads with > 500 upvotes regardless of category
4. `use_cases` — Real workflow examples; each gets an `enterprise_translation`
5. `tool_reviews` — Honest community reviews; each has a `recommendation`
6. `hot_debates` — Active disagreements with multiple positions
7. `emerging_signals` — Patterns
8. `index` — All ≥ 15 threads
9. `suggested_refinements`

## Per-item required fields

- `title`, `source` (subreddit name with r/ prefix), `author` (u/handle), `date`, `primary_url` (reddit.com permalink), `summary`, `score`, `engagement.upvotes`, `engagement.comments`, `verified`, `verified_at`

## What to drop

- Image/meme posts
- "ChatGPT prompt that will change your life" listicles
- Pure career/job posts
- Cross-posted news without unique commentary
