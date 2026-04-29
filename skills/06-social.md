# Social — Platform Intelligence

## Mission

Cover viral and educational AI content on LinkedIn, Instagram, TikTok, and Facebook. Translate consumer/creator energy into enterprise concepts. **This is the consumer-to-enterprise translation tab** — every item includes `enterprise_translation`.

The reader's framing: "We can't always install the new tool on managed laptops, but we can extract the design principles (self-learning loops, distributed memory, subagents) and bake them into our internal agent projects." Every Top Pick should serve that exercise.

## Source list

**LinkedIn (primary — enterprise AI signals):**
- Tier 1 voices: **Ethan Mollick** (Wharton, AI research / education), **Allie K. Miller** (enterprise AI strategy), Andrew Ng, Andrej Karpathy (cross-post), Cassie Kozyrkov, Aleksandra Przegalinska, Bernard Marr, Sam Witteveen
- Tier 2 voices: Bikash Jain, Mark Hinkle, Quang Anh Tran, Benjamin Tannenbaum
- Major AI companies' LinkedIn pages: Anthropic, OpenAI, Microsoft, Google DeepMind, Perplexity, NVIDIA, Hugging Face
- Posts with > 500 reactions on AI topics

**TikTok (primary — highest signal for emerging consumer-AI sentiment):**
- Creator watch list: **@rpn** (Roberto Nickson — AI tools), @nocode.joshua (no-code AI), @marcinteodoru (AI workflows), @nessalazne, @digitalsamaritan (AI education), @aiwithjames (AI tutorials)
- Hashtag sweep: #ClaudeCode, #AITools, #VibeCoding, #AIAgents, #AgenticAI, #AIAutomation, #Cursor, #PerplexityAI
- Filter to videos > 50K views, < 3 minutes, from accounts that produce repeatable technical content (not pure entertainment)

**Instagram (secondary — practitioner workflows):**
- Creator watch list: **@danmartell** (AI business), **@alliekmiller** (AI strategy, cross-post from LinkedIn), @openyourais, @yusushica
- Tech educators: @airevolution.ai, @ai.learnings, @futuretools.io, @noco.ai
- Hashtag sweep: #AITools2026, #AIWorkflow, #AIBusiness
- Reels with > 50K views

**Facebook (secondary — community signals):**
- Groups: DeepNet Group, AI Philosophy, AI for Business
- Pages: Meta AI official, Nas Daily (when AI content)
- Generally lowest-signal — fine to ship empty if there's nothing.

**Other:**
- YouTube Shorts — cross-reference viral AI shorts surfacing on TikTok / Instagram
- Threads (Meta) — emerging discussions

## Method

1. Use `browser_task` for each platform to find the week's top content matching the source list. **This is the trickiest tab to verify** — engagement numbers change quickly. Capture them at fetch time.
2. For each candidate, write a 2-sentence summary: what the creator demonstrated, and why it spread.
3. Then write `enterprise_translation` — 1–3 sentences on:
   - The design principle the consumer demo exposes (e.g., self-directed loop, multi-agent decomposition, persistent memory across sessions)
   - The enterprise pattern that principle maps to (internal agent project, internal RAG, agent-as-coworker)
   - One concrete experiment a public-company innovation team could run within 30 days
4. Tools Trending: count cross-platform mentions of the week's hot tools.

## Freshness & recurrence

Set `freshness.target_pct_new = 0.80` and `min_items = 15`. Against last week's `data/<prev_week>/social.json`:

- **Direct duplicate** — exclude entirely.
- **Same creator, new content** — `recurrence: "new"` (no badge — creators repeating themselves is normal here).
- **Same tool, new coverage** — `recurrence: "returning"` if the tool was a Top Pick last week.
- **Same trend, new evidence** — `recurrence: "returning_trend"` with `recurrence_note`.
- Empty section line per platform: `"No significant AI content this week on [platform]."`

## Output structure (`social.json`)

`tab_id: "social"`, `subtitle: "Platform Intelligence"`, `icon: "Share2"`.

**Sections:**
1. `executive_summary` — 3 bullets, especially: which design principles are surfacing across platforms
2. `top_picks` — 5–7 posts, each with **required** `enterprise_translation`
3. `linkedin` — 4–6 posts
4. `tiktok` — 4–6 videos with engagement metrics
5. `instagram` — 3–5 posts
6. `facebook` — 0–3 posts (often empty — that's fine)
7. `tools_trending` — Top 8 list of tools mentioned across platforms
8. `emerging_signals` — Cross-platform behavioral patterns
9. `index` — All considered, **min 15 rows** (`min_items: 15`)
10. `suggested_refinements`

## Per-item required fields

- `title`, `source` (platform), `author` (@handle or display name), `date`, `primary_url`, `summary`, `enterprise_translation` (REQUIRED here), `score`, `engagement` (platform-appropriate), `verified`, `verified_at`

## What to drop

- Pure entertainment (e.g., AI-generated dance videos)
- Posts whose engagement is fake-looking (sudden 1M views from unknown account, no following)
- Recycled Reels from earlier weeks
- Drama / influencer feuds with no technical content
