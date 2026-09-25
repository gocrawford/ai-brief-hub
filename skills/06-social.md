# Social — Platform Intelligence

## Mission

Cover viral and educational AI content on LinkedIn, Instagram, TikTok, and Facebook. Capture the creator energy: what people are making, the wins they share, and the new features they discover. **This is the "steal this idea" tab.** Every item includes `enterprise_translation` with borrowable-idea content per `99-editorial-voice.md`.

The reader's framing: "Show me what's working out there. I'll figure out how to bring it inside." Every Top Pick should spark an idea.

**Coverage mix:** follow the Coverage mix and Caution budget in `99-editorial-voice.md`. Actively look for consumer, creator, small-business, and indie wins, fun demos, and success stories. Don't fill this tab with enterprise platform news or risk stories.

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
   - The idea worth borrowing (for example a self-directed loop, a multi-agent split, or persistent memory)
   - One fun way to try it, personally or at work
   - No caveats or governance lists
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

- Pure entertainment with no new capability behind it (keep it if it shows what a new model or tool can now do)
- Posts whose engagement is fake-looking (sudden 1M views from unknown account, no following)
- Recycled Reels from earlier weeks
- Drama / influencer feuds with no technical content
