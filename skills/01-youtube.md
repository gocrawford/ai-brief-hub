# YouTube — Video Intelligence

## Mission

Surface the highest-signal AI/agent/automation videos published in the week. Bias toward technical depth, primary-source demos from labs and serious builders, sober analysis (anti-hype), and tutorials that translate to enterprise patterns.

## Source list (locked April 2026; refine via Suggested Refinements)

### Tier 1 — Always check (sober, technical, primary-source-aligned)
- **AI Explained** (@AIExplainedYT) — calm, paper-driven, anti-hype. Best single voice for sober analysis.
- **Matthew Berman** (@matthew_berman) — hands-on model/agent testing; among the most consistently useful weekly signals.
- **Latent Space / AI Engineer** (@swyxTV and the AI Engineer channel) — practitioner conference talks, deep technical episodes (Karpathy, Yi Tay, etc.).
- **OpenAI** (@OpenAI), **Anthropic** (@AnthropicAI on YT), **Google DeepMind** — primary-source channels. Use only for actual launches/research talks, not promo reels.
- **Two Minute Papers** — only when the video covers a primary paper (always cite the paper, not the video).

### Tier 2 — Builders / weekly intelligence
- **Matt Wolfe** (@mreflow) — best curator of "what shipped this week"
- **The AI Advantage** (@aiadvantage) — practical tool walkthroughs
- **Wes Roth** (@WesRoth) — consistent weekly news synthesis
- **TheAIGRID** (@TheAiGRID) — fast on breaking AI news
- **David Ondrej** (@DavidOndrej) — agent builds, n8n, automation patterns
- **Liam Ottley** (@LiamOttley) — SMB agent business builds (excellent consumer-to-enterprise translation source)
- **Cole Medin** — agent architectures, RAG implementations
- **AI Jason** — model comparisons, agent builds
- **All About AI** — practical implementations
- **IndyDevDan** — Claude Code power-user content
- **Sam Witteveen** — LangGraph, multi-agent patterns

### Tier 3 — Use cases / enterprise / SMB patterns
- **Riley Brown** (@rileybrownai) — vibe coding, Cursor, agent workflows
- **Alex Finn** (@AlexFinnOfficial) — AI agent business builds
- **Nick Saraev** (@nicksaraev) — n8n automation specialist
- **Skill Leap AI** (@SkillLeapAI) — practical tool tutorials
- **AI Tech Pro** (@ai_tech_pro1) — solid tutorials
- **Curious Refuge** (@curiousrefuge) — generative video/film
- **YC Root Access** (@ycrootaccess), **This Week in Startups** (@startups) — founder/deal flow

### Tier 4 — Occasional appearances worth catching
- **Ethan Mollick** (Wharton) — when he makes a video appearance, it usually reframes how a leader should think about AI at work
- **Cleo Abram** — tech explainer, occasional AI focus

### Skip for this dashboard (low signal-to-minute for AI dashboard purposes; not a quality judgment)
Futurepedia, Brain Project, Greg Isenberg, MattVidPro, Jeremy Orozco, Paul J Lipsky (rotate in if a specific video hits — don't sweep weekly).

## Method

1. Use `search_web` and `search_vertical(vertical='video')` for the date window. Queries:
   - "Claude Code <month> 2026"
   - "Cursor Composer agent <month>"
   - "<frontier model name> launch demo"
   - "OpenAI <month> 2026 announcement"
   - "Anthropic <month> 2026"
   - "AI agent enterprise <month> 2026"
2. Sweep each Tier 1 + Tier 2 channel for the week's uploads. For Tier 3, sample — don't sweep all.
3. For each candidate, fetch the video page (YouTube URL) to confirm publish date, view count, channel.
4. Watch transcript or read description carefully for top candidates. **Do NOT summarize from titles alone.**
5. Score per `99-editorial-voice.md`. Top Picks ≥ 7.5.

## Freshness & recurrence

Set `freshness.target_pct_new = 0.80` and `min_items = 12`. Against last week's `data/<prev_week>/youtube.json`:

- **Same video** — exclude entirely.
- **Same creator covering the same model/tool** — `recurrence: "returning"` if it was a Top Pick last week, with a `recurrence_note` describing what's new in this video.
- **Same trend across multiple creators** — fold into `emerging_signals` rather than re-listing.
- Empty section line: `"No major new developments this week."`

## Output structure (`youtube.json`)

`tab_id: "youtube"`, `subtitle: "Video Intelligence"`, `icon: "Video"`.

**Sections (in order):**
1. `executive_summary` — 3 bullets, what changed in YouTube AI content this week
2. `top_picks` — 4–6 videos
3. `tool_updates` — Major tool/model demos shown on YouTube this week (cards: tool / feature / one-line takeaway)
4. `tutorials` — How-tos worth replicating, with `key_takeaways`
5. `use_cases` — Demos of agents/automation in real workflows. Each gets `enterprise_translation`.
6. `emerging_signals` — Patterns observed across multiple videos
7. `index` — All videos considered, **min 12 rows** (`min_items: 12`) (sortable table)
8. `suggested_refinements`

## Per-item required fields

- `title`, `source` (channel), `author`, `date`, `primary_url` (canonical YouTube URL), `summary`, `score`, `engagement.views`, `verified`, `verified_at`
- Top Picks add: `key_takeaways` (3 bullets), `suggested_actions` (2–3 bullets)

## What to drop

- Reaction videos with no primary content
- "I asked ChatGPT to..." entertainment content
- Videos < 4 minutes (too thin to score)
- Channels that recycle press releases without demo or analysis
- Clickbait titles where the video doesn't deliver on the headline (verify by skimming)
