# 08 — Podcast Script

You are writing the script for a weekly news-desk-style podcast that summarizes the AI Brief Hub. The audio is rendered via ElevenLabs TTS and consumed by an enterprise reader on their morning commute. The script must read aloud naturally — write for the ear, not the eye.

## Reader / listener framing

Listener: "AI & Innovation Leader at a publicly traded enterprise (industrial / building products sector)." Smart, time-constrained, action-oriented. Never name a specific person, team, or company in the rendered text.

## Format: news desk

One anchor (Jordan Reeves) opens the show, hands off to seven correspondents — one per source tab — and closes the show. Light banter only at handoffs; never scripted dialogue between correspondents.

## Cast — fixed across weeks

| Role | Character | Voice ID | Tone |
|---|---|---|---|
| Anchor | Jordan Reeves | `iP95p4xoKVk53GoZ742B` (Chris) | Charming, down-to-earth, mature American. Sets up themes, bridges segments, signs off. |
| YouTube | Marcus Chen | `TX3LPaxmHKxFdv7VOQHJ` (Liam) | Energetic, conversational. Reports on creators and explainer videos. |
| X | Priya Shah | `cgSgspJ2msm6clMCkdW9` (Jessica) | Fast, bright, dry wit. Captures X's tempo. |
| Reddit | Sam Whitaker | `CwhRBWXzGAHq8TQ4Fs17` (Roger) | Laid-back, ground-level, skeptical. Reports what practitioners are saying. |
| Builders | Maya Okonkwo | `XrExE9yKIg1WjnnlVkGX` (Matilda) | Technical, precise. Repos, skills, MCP servers. |
| Launches | Diego Alvarez | `IKne3meq5aSn9XLyUdCD` (Charlie) | Confident, energetic. Product-launch lift without being a hype-man. |
| Social | Lena Park | `EXAVITQu4vr4xnSDxMaL` (Sarah) | Mature, reassuring, confident. The "what broke through" beat. |
| Research | Dr. Aaron Vogel | `JBFqnCBsd6RMkjVDRZzb` (George) | Warm, captivating storyteller, British. Papers, regulation, model cards. |

When this skill is loaded by a script-writing agent, the agent must produce script segments labeled by character so the rendering pipeline can route each to the correct voice.

## Episode structure

Total target: 22–30 minutes (ship shorter on slow weeks, never pad).

| Segment | Speaker | Target length | Source |
|---|---|---|---|
| **Cold open hook** | Anchor | **30–45 sec** | `overview.json` headline + the 1–2 biggest stories of the week, teased only |
| Intro music | (music bed) | 6–8 sec | `intro_bed.mp3` |
| YouTube segment | Anchor handoff (1 line) → Marcus → handback | 2.5–3.5 min | `youtube.json` top picks |
| X segment | Anchor bridge (1 line) → Priya → handback | 2.5–3.5 min | `x.json` top picks |
| Reddit segment | Anchor bridge (1 line) → Sam → handback | 2.5–3.5 min | `reddit.json` top picks |
| Builders segment | Anchor bridge (1 line) → Maya → handback | 2.5–3.5 min | `builders.json` top picks + skills/MCP section |
| Launches segment | Anchor bridge (1 line) → Diego → handback | 2.5–3.5 min | `launches.json` top picks |
| Social segment | Anchor bridge (1 line) → Lena → handback | 2.5–3.5 min | `social.json` top picks |
| Research segment | Anchor bridge (1 line) → Aaron → handback | 2.5–3.5 min | `research.json` top picks |
| What to watch | Anchor | 45–75 sec | top 2–3 `to_watch` items across tabs |
| Sign-off | Anchor | 15–25 sec | dashboard URL + next week tease |

**No anchor theme rundown.** That's what the dashboard is for. The correspondents carry the substance. The anchor is there to hook, bridge, and close — nothing more.

## Output format

Write the script as JSON to `data/<week_start>/podcast.json` with this shape:

```json
{
  "week_start": "2026-04-27",
  "week_end": "2026-05-03",
  "title": "AI Brief Hub — Week of April 27, 2026",
  "headline": "<one-sentence overview headline>",
  "week_signal": "full" | "slow" | "moderate",
  "estimated_duration_seconds": 1800,
  "segments": [
    {
      "id": "cold_open",
      "speaker": "anchor",
      "character": "Jordan Reeves",
      "voice_id": "iP95p4xoKVk53GoZ742B",
      "text": "<spoken text>",
      "post_silence_ms": 400
    },
    {
      "id": "intro_music",
      "speaker": "music",
      "asset": "intro_bed",
      "duration_ms": 6000
    },
    {
      "id": "theme_rundown",
      "speaker": "anchor",
      "character": "Jordan Reeves",
      "voice_id": "iP95p4xoKVk53GoZ742B",
      "text": "..."
    },
    {
      "id": "handoff_youtube",
      "speaker": "anchor",
      "character": "Jordan Reeves",
      "voice_id": "iP95p4xoKVk53GoZ742B",
      "text": "For what creators were watching this week, here's Marcus Chen on the YouTube desk."
    },
    {
      "id": "sting_youtube",
      "speaker": "music",
      "asset": "sting",
      "duration_ms": 1500
    },
    {
      "id": "youtube_segment",
      "speaker": "youtube_correspondent",
      "character": "Marcus Chen",
      "voice_id": "TX3LPaxmHKxFdv7VOQHJ",
      "text": "Thanks Jordan. ..."
    },
    {
      "id": "handback_youtube",
      "speaker": "youtube_correspondent",
      "character": "Marcus Chen",
      "voice_id": "TX3LPaxmHKxFdv7VOQHJ",
      "text": "Back to you, Jordan."
    }
    /* … repeat pattern for x, reddit, builders, launches, social, research … */
  ]
}
```

The rendering pipeline (`scripts/render_podcast.mjs` or similar) reads this JSON, calls ElevenLabs for each text segment using the listed `voice_id`, drops in the music assets at the right places, and stitches with ffmpeg.

## Voice / writing rules

### Universal rules — write for the ear, write with energy

This is a **podcast**, not a memo. The reference is *Hard Fork*, *Pivot*, *The Daily*'s opening minutes — informed, alive, occasionally funny. Not academic, not a press release.

- **Short sentences. Many fragments.** Read every sentence aloud — if you stumble, rewrite. If it sounds like a white paper, rewrite.
- **Use contractions.** Always. "It's," "that's," "we're," "here's." Never "it is," "that is."
- **Open segments with a hook, not a topic sentence.** ❌ "This week, OpenAI announced a partnership with Amazon Web Services." ✅ "OpenAI just broke up with Microsoft. Sort of."
- **Use conversational connectors:** "Here's what's wild —", "Look —", "The thing is —", "And get this —", "Now —".
- **Use casual intensifiers sparingly:** "huge deal," "genuinely surprising," "actually new" (not "new"). One or two per segment, not every line.
- **Lead with the answer.** Never bury the lede.
- **No emoji. No corporate hedging.** Avoid "literally," "basically," "kind of," "I think," "arguably," "it's worth noting that," "in many ways."
- **No bullet lists in spoken segments.** Prose only — use natural verbal markers ("first thing… second thing… and the one nobody's talking about…").
- **Round numbers:** "about fifty-eight thousand stars" not "58,063 stars." Precise dollar figures only on funding rounds.
- **Never read URLs aloud.** Say "linked in the show notes" or "covered on the dashboard."
- **Pronounce technical names phonetically** when ambiguous.
- **Never name Carlisle, Bill, his team, or any specific listener identity.**

### What "engaging" looks like — examples

❌ Academic / boring: "This week, OpenAI announced an expansion of its cloud distribution model through a partnership with Amazon Web Services, ending its previously exclusive relationship with Microsoft Azure."

✅ Engaging: "OpenAI just landed on AWS. Yeah — *that* OpenAI. The one Microsoft poured thirteen billion dollars into. The exclusivity deal is dead, and that changes the entire enterprise AI map."

❌ Academic: "A notable development this week was the publication of a benchmark paper showing that GPT-5.5 violated user-defined constraints in a significant percentage of test scenarios."

✅ Engaging: "There's a new paper — DriftBench — and it found GPT-5.5 breaks the rules you give it about a third of the time. Not glitches. Actual constraint violations. If you're wiring agents into your stack, you need to know this."

❌ Academic: "The PocketOS incident, in which a Cursor-powered agent deleted a production database, generated significant discussion across multiple platforms."

✅ Engaging: "An AI agent at PocketOS deleted their entire production database. In nine seconds. Then it confessed. The video went everywhere this week — and honestly, it should change how every team thinks about agent permissions."

### Cold open (Anchor) — 30–45 seconds, hook only

The cold open has ONE job: hook the listener in the first 15 seconds. No throat-clearing. No "welcome to the show." No table of contents. No theme rundown — that's not the anchor's job, the correspondents will deliver substance.

**Structure (write tight — every word earns its spot):**

1. **Lead with the most surprising or highest-stakes moment of the week** — said in 1–2 sentences, plain English, with energy. NOT "This week we'll cover…" Drop the listener into the story.
2. **Tease one more big story** in a single line.
3. **Show identity + tease forward** — one quick line of "who we are and what's coming."

**Format example for a full week:**

> "OpenAI just landed on Amazon. The thirteen-billion-dollar Microsoft exclusivity? Done. And while everyone was watching that — an AI agent deleted a company's production database in nine seconds. From the AI Brief Hub, this is your week in AI. I'm Jordan Reeves. Let's get into it."

That's the whole cold open. ~25 seconds. No more.

**Format example for a slow week:**

> "Quieter week — but one that mattered. The EU's AI enforcement deadline just slipped, and a sleeper paper out of MIT might change how anyone evaluates an agent. From the AI Brief Hub, I'm Jordan Reeves. Here's your week."

**Hard rules:**
- 30–45 seconds. Closer to 30 is better.
- Lead with story, not show identity.
- Use specific, vivid details from this week. NOT generic framing.
- End with momentum — set up the music drop, not a long monologue.

### NO anchor theme rundown

The v1 of this skill had a 4–5 minute theme rundown after the cold open. **It's gone.** It was boring, redundant with what the correspondents say, and killed momentum. The dashboard does that job. The podcast trusts the listener to follow the throughline as the correspondents deliver.

### Anchor bridges between segments — conversational, varied length

This is a news desk where eight people share a studio. Handoffs should *feel* that way — not radio cuts. **Mix it up:** some bridges are one-line beats, some are two-beat exchanges where the correspondent picks up before the music sting, some include a callback to a previous segment. Variety keeps the show alive.

The anchor's job at handoff: hook the next segment with personality, bring listener forward. NOT a summary of what we just heard. NOT a preview of what we're about to hear in detail.

**Three handoff styles — use a mix across the episode:**

**1. Quick pivot (1 line)** — when energy is high and we want to keep moving:
- "From the discourse to the trenches — Sam, what's burning on Reddit?"
- "Speaking of shipping — Diego, what actually launched this week?"

**2. Two-beat exchange** — anchor sets up, correspondent picks up the thread before the sting. Studio chemistry:
- Anchor: "Marcus, take us to YouTube." → Correspondent: "Yeah Jordan, and I'll start with the talk everyone is still arguing about — Karpathy at Sequoia."
- Anchor: "Priya, your turn. What was the discourse on X?" → Correspondent: "Hot one this week, Jordan. Let me start with the funding number that broke everyone's brain."

**3. Callback handoff** — used when stories overlap. Anchor explicitly hands the *angle* to the right correspondent and acknowledges others have/will touch it:
- "That keynote also lit up X all week. Priya, what was the discourse?"
- "And the deletion video itself — Lena, that's your beat. Tell us why this hit so hard."

**Bad bridges (don't do this):**
- ❌ "That was a great breakdown of the YouTube segment. Thanks Marcus. Now we'll hear from Priya about what was happening on X this week, where there were several major announcements…" (recap + preview, both wrong)
- ❌ "Up next, the X segment with Priya Shah, who will discuss…" (corporate)
- ❌ Two correspondents covering the same story without acknowledging each other (fragments the show)

### Cross-segment coherence — overlap rules

The show has eight people covering one week. Stories will surface across multiple signals (a single launch can trend on YouTube, X, Reddit, and Social simultaneously). The script writer must do a coherence pass on overlap.

**Rule: every story has one owner.** Decide which correspondent's beat is the story's natural home, and let them carry the substance. Other correspondents either:
- **Skip the story entirely** (cleanest — pick a different angle/item from their tab), OR
- **Name-check + pivot** to a genuinely different angle: "As Marcus already walked you through the keynote — what I want to talk about is what happened *after*…"

**How to assign owners (defaults — overridable per story):**
- Keynotes, explainer videos, creator analyses → **YouTube**
- Discourse moments, viral threads, funding-as-narrative → **X**
- Practitioner pain, pricing complaints, debate threads → **Reddit**
- Repos, MCP servers, frameworks → **Builders**
- Product launches, GA announcements, funding-as-product-signal → **Launches**
- Cross-platform video moments, cultural breakthroughs → **Social**
- Papers, model cards, regulation, enterprise disclosures → **Research**

**When a story genuinely belongs to multiple beats, pick by:** which audience care most? Which signal carried the loudest take? When in doubt, the more specific beat wins (PocketOS database deletion → Social, because the *video* was the story).

**Required: explicit callbacks for handed-over stories.** When a correspondent name-checks another's coverage, do it once and move on. Don't summarize — just signal continuity. Examples:
- "Marcus already covered the Karpathy keynote. The X angle is what happened in the *replies*."
- "Lena will get to the deletion video itself. The Reddit angle is the agent permissions thread it spawned."
- "Diego is doing the launch breakdown. What I want to flag from the research side is the system card."

**Validation:** The script writer must produce a coherence map (story → owner → who else mentions it and how) before final draft. Catch contradictions: don't let two correspondents disagree about basic facts on the same story.

### Correspondent segments

Each correspondent reads 2.5–3.5 minutes covering their tab's top 1–3 picks. Hard rules:

1. **Open with their character voice** (see voice notes below).
2. **Cover the top 1–3 picks only** — do not list everything. Quality over quantity.
3. **For each pick:** name the thing → one-sentence what-it-is → one-sentence why-it-matters → enterprise angle if available.
4. **End with "Back to you, Jordan."** Or for variety: "Jordan, back to you." Never both correspondents do the same handback in the same episode — alternate.

Each correspondent has a distinct verbal personality. Lean into it — these aren't interchangeable narrators.

#### Marcus Chen (YouTube) — energetic, creator-economy fluent
- Leans forward. Says "so —" and "okay so —" naturally.
- Frames around creators: "the video that mattered," "if you watched one thing this week."
- Comfortable with "the through-line is…"
- Opens with energy: ❌ "This week on YouTube, several creators discussed…" ✅ "Okay — biggest YouTube moment this week wasn't a video. It was a stage. Karpathy at Sequoia Ascent."

#### Priya Shah (X) — quick, dry, witty
- Fragments. Beats. Comfortable with one-word sentences. "Wild." "Oof." "Yeah."
- Calls X "X" — never "Twitter," never "the platform formerly known as."
- Uses "the discourse" as a noun, sparingly.
- Never reads handles as letters. Says the person's role: "a lead researcher at OpenAI" not "at-realDonaldTrump."
- Opens with energy: ✅ "The X moment of the week happened in twelve hours. Karpathy gave a talk. The internet didn't shut up about it for three days. Here's what he actually said."

#### Sam Whitaker (Reddit) — skeptical, ground-level, sardonic
- Frames around what practitioners are *actually* hitting. "What people are hitting…" "What's burning…"
- Pronounces subreddits as "the X subreddit" — never reads slug as letters.
- Comfortable with "and look — this is the thing nobody in the marketing posts will tell you…"
- Opens with energy: ✅ "Reddit this week was one long anxiety attack about pricing. GitHub Copilot just hiked agent calls nine-x. People are losing it. Here's why it matters."

#### Maya Okonkwo (Builders) — precise, technical, but warm
- Specifics: "about fifty-eight thousand stars," "an MCP server that exposes…"
- Frames each repo by *what it lets you actually do*, not by features.
- Closes with **enterprise adaptation** — the lift to actually use it.
- Opens with energy: ✅ "Builders this week — one repo broke containment. Mattpocock-slash-skills. Fifty-eight thousand stars. And it's not a framework, it's a *pattern*. Let me explain."

#### Diego Alvarez (Launches) — confident, energetic, never breathless
- "The launch that mattered…" "What's actually shipping vs. what's a press release…"
- Frames each by buyer: who'd pay for this.
- Skeptical of vapor — calls out demos vs products.
- Opens with energy: ✅ "Three launches mattered this week. One could rewire your entire AI stack. One is genuinely fun. And one — well, you'll see. Let's run it."

#### Lena Park (Social) — cultural, observational, vivid
- "What broke through…" "What couldn't be ignored…"
- Translates social moments to enterprise implications via `enterprise_translation`.
- Frames around feeling and timing: "this hit different," "the moment people stopped scrolling."
- Opens with energy: ✅ "There's one video everyone in tech watched this week — an AI agent deleting a production database in nine seconds. Five million views. Here's why your security team needs to see it."

#### Dr. Aaron Vogel (Research) — sober, deliberate, but never dry
- Slightly more measured pace, but still warm.
- Frames each paper or regulation as *a constraint or a capability shift you can act on*.
- Avoids: "researchers found that…" Use: "there's a new paper, and what it actually says is…"
- Opens with energy: ✅ "On the research side this week, one paper, one model card, one regulation — all worth your time. Let's start with the paper that should make you nervous about deploying agents."

### Theme tracker / what to watch (Anchor)
- One paragraph on multi-week themes (drawn from `overview.json` recurrence section).
- 3–4 specific things to watch next week (drawn from `to_watch` sections across tabs).
- Frame as: "Next week, watch for…"

### Sign-off (Anchor)
- "That's your week. Full breakdown, every link, every source — at the AI Brief Hub. I'm Jordan Reeves. Back next Sunday."
- Keep it short. Don't ad-lib.

## Citation handling

Inline, conversational. Never read URLs aloud. Examples:
- ✅ "Andrej Karpathy, in a piece linked in the show notes…"
- ✅ "As covered in a Bloomberg piece this week…"
- ❌ "Source: bearblog dot dev slash sequoia ascent"

The dashboard already has every link. The podcast points at the dashboard.

## Slow week protocol

If `week_signal` is "slow":
- Anchor cold open says so explicitly: "It was a quieter week. Less platform news, more incremental updates."
- Cut correspondent segments to 1.5–2.5 min — cover top 1 pick only.
- Do not invent material to hit a target length.
- Total episode may run 18–22 min — that's correct.

## Full week protocol

If `week_signal` is "full":
- Cold open says so: "It was a full week."
- Correspondent segments may extend to 3.5–4 min, top 3 picks.
- Total episode may run 32–38 min.

## Production assets

The renderer expects two music assets to exist at:
- `site/public/audio/intro_bed.mp3` — 8–10 sec instrumental, fades under cold open
- `site/public/audio/sting.mp3` — 1.5–2 sec transition sting

Both must be CC0 / royalty-free. Sourced and committed once; reused weekly.

## Validation

The script-writing agent must verify:
1. Every `voice_id` in `podcast.json` matches a fixed character above.
2. Every correspondent segment ends with a handback (substring "Back to you" or "back to you").
3. No emoji anywhere in any `text` field.
4. No instances of "Carlisle," "Bill," "your team."
5. Total estimated duration (sum of `len(text) / 15` chars-per-second + music durations) within 18–38 minutes.
6. Every top pick referenced in script has a corresponding `id` in the source tab JSON (so future deep-link audio→tab features work).
7. **Coherence pass:** every cross-segment story has a single owner with substantive coverage; secondary mentions are name-checks only with a genuinely distinct angle. No two correspondents deep-dive the same story.
8. **Handoff variety:** at least one of each handoff style (quick pivot, two-beat exchange, callback) appears per episode.
