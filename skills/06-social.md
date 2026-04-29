# Social — Platform Intelligence

## Mission

Cover viral and educational AI content on LinkedIn, Instagram, TikTok, and Facebook. Translate consumer/creator energy into enterprise concepts. **This is the consumer-to-enterprise translation tab** — every item includes `enterprise_translation`.

The reader's framing: "We can't always install the new tool on managed laptops, but we can extract the design principles (self-learning loops, distributed memory, subagents) and bake them into our internal agent projects." Every Top Pick should serve that exercise.

## Source list

**LinkedIn:**
- AI thought leaders: Allie K. Miller, Andrew Ng, Andrej Karpathy (cross-post), Ethan Mollick, Cassie Kozyrkov, Aleksandra Przegalinska, Bernard Marr, Sam Witteveen
- Major AI companies' LinkedIn pages for posts
- Posts with > 500 reactions on AI topics

**Instagram:**
- AI/tech educators: @airevolution.ai, @ai.learnings, @futuretools.io, @themarketingmillennials (when AI), @noco.ai (no-code AI)
- AI tool walkthroughs (Reels) with > 50K views

**TikTok:**
- Creators teaching specific tools: search hashtags #ClaudeCode #AIagent #Cursor #PerplexityAI #AIautomation
- Filter to videos > 50K views and < 3 minutes from accounts that produce repeatable, technical content (not pure entertainment)

**Facebook:**
- Generally lowest-signal — include only if a substantial post breaks here first (rare). Mostly use for reshare patterns.

## Method

1. Use `browser_task` for each platform to find the week's top content matching the source list. **This is the trickiest tab to verify** — engagement numbers change quickly. Capture them at fetch time.
2. For each candidate, write a 2-sentence summary: what the creator demonstrated, and why it spread.
3. Then write `enterprise_translation` — 1–3 sentences on:
   - The design principle the consumer demo exposes (e.g., self-directed loop, multi-agent decomposition, persistent memory across sessions)
   - The enterprise pattern that principle maps to (internal agent project, internal RAG, agent-as-coworker)
   - One concrete experiment a public-company innovation team could run within 30 days
4. Tools Trending: count cross-platform mentions of the week's hot tools.

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
9. `index` — All considered
10. `suggested_refinements`

## Per-item required fields

- `title`, `source` (platform), `author` (@handle or display name), `date`, `primary_url`, `summary`, `enterprise_translation` (REQUIRED here), `score`, `engagement` (platform-appropriate), `verified`, `verified_at`

## What to drop

- Pure entertainment (e.g., AI-generated dance videos)
- Posts whose engagement is fake-looking (sudden 1M views from unknown account, no following)
- Recycled Reels from earlier weeks
- Drama / influencer feuds with no technical content
