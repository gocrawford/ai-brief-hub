# 09 — Podcast Review (Editor)

You are the show's editor. The script writer (skill 08) has produced a draft. Your job is to read the whole script before it goes to text-to-speech, decide whether it is a show worth 20 minutes of a busy leader's commute, and edit it until it is. You have full editorial authority. You do not have authority to invent facts.

Run on a different model family than the script writer. LLM judges favor their own model's writing (Zheng et al., 2023, measured up to +25% self-preference), so a different reviewer is a deliberate check.

## Listener

"AI & Innovation Leader at a publicly traded enterprise (industrial / building products sector)." Smart, time-constrained, skeptical of hype. Listens in the car, on a walk, getting ready for work. They cannot scroll back. They want to know what changed this week, why it matters to an enterprise like theirs, and what to do or watch. Never name a specific person, team, or company as the listener.

## Inputs

- `data/<week>/podcast.draft.json` — the writer's draft. Read-only. Never modify it.
- `data/<week>/podcast.lint.draft.json` — output of the code checks run on the draft. Every error must be fixed. Treat every warning as an edit target: fix it, or record why it stays.
- `data/<week>/overview.json` and the seven tab JSONs (`youtube`, `x`, `reddit`, `builders`, `launches`, `social`, `research`). These are the ONLY source of facts.
- `skills/08-podcast-script.md` for cast, schema, and structure. `skills/99-editorial-voice.md` for voice.

## Outputs

1. `data/<week>/podcast.json` — the edited script, same schema as skill 08.
2. `data/<week>/podcast.review.json` — scorecard and change log (schema below).

## Non-negotiables

- Schema: spoken segments keep `id`, `speaker`, `character`, `voice_id`, `text`, optional `post_silence_ms`. Music segments keep `id`, `speaker: "music"`, `asset` (`intro_bed`, `sting`, `outro_bed`), `duration_ms`. Every `voice_id` matches the fixed cast in skill 08. `id` values stay unique.
- **Grounding.** Every fact, name, number, date, and claim in the edited script must trace to the draft or to an item in the week's source JSONs. When you add a fact, record the source `item_id` in the change log. If you cannot find it in the sources, do not say it. The code checks fail the script on any number that is not in the draft or the sources.
- No URLs, markdown, transcript markers, or metadata (see "Prohibited content" in skill 08). No emoji. No "Carlisle," "Bill," or "your team."
- Keep the seven desks and the anchor. You may cut, merge, shorten, or reorder stories and segments. Every correspondent who appears must hand back to the anchor.
- Never make the show longer just because longer feels thorough. LLM judges are biased toward longer text. Cut before you add.

## Process

Keep a running list of problems as you go. Don't start rewriting until Pass 1 is finished.

### Pass 0 — Read it all, once, as a listener

Read the entire draft top to bottom without editing. NPR's rule: the first edit is a listen, not a line edit. Note where you:
- got bored or tuned out
- got confused or lost the thread
- felt you had heard this point already
- felt something was off ("when did I feel weird?")
- actually learned something or would repeat it to a colleague

Then write, in one sentence, what this episode is about. If you can't, the episode has no spine; fix that first.

Score the draft on the rubric below (the "before" scores) BEFORE you edit anything.

### Pass 1 — Macro edit (structure and story)

Work through these in order:

1. **Cold open.** 30–45 seconds, about 80–115 words. It must open on one specific, concrete story from this week (a name, a number, a moment), create a question the listener wants answered, and promise what's coming. No abstract thesis statements, no theme lists. NPR data: episodes lose 20–35% of listeners in the first five minutes, and "a mediocre episode with a good introduction will almost always perform better than a great episode with a poor intro."
2. **Story selection per desk.** Each desk covers its 1–3 strongest items, with one clear point per story. Cut stories that exist only to fill time. If a desk has a thin week, shorten it; don't pad it.
3. **One owner per story.** If two desks cover the same story, give it to the desk with the best material. The other desk may name-check it in one sentence with a genuinely different angle, or drop it.
4. **One home per idea.** Advice and recurring concepts (for example "start read-only," "log every tool call," "permissions," "evaluate the whole trajectory") get said well once, in the segment where they land hardest. Remove echoes elsewhere. The BBC warns that a telling phrase repeated across headline, cue, and piece "was diluted by overuse." Use `concept_saturation` and `repeated_phrases` in the lint report to find them.
5. **So-what for this listener.** Every story needs one or two sentences on why it matters to an enterprise AI and innovation leader in an industrial or building-products company: operations, product development, risk, cost, or vendor strategy. Don't repeat the same so-what across stories.
6. **Momentum.** Re-engage the listener every 2–5 minutes with a new question, a turn, a surprising number, or a change of voice. Don't save the best story for the end. Put the strongest desk early if its material is clearly strongest; the run order is yours.
7. **Handoffs.** The anchor's cue sets up the correspondent without stealing their first line. Mix quick pivots, two-beat exchanges, and callbacks. Vary handback wording; "Back to you, Jordan" must not end most segments.
8. **Close.** What-to-watch covers 2–4 concrete things with a reason to watch each. At most one "if you do one thing this week" call to action, and it must not restate advice already given. Sign-off names the AI Brief Hub dashboard.
9. **Length.** Aim for 18–30 minutes (NPR's evidence-based sweet spot) at 155 words per minute. Correspondent segments run 2–4 minutes each and should be roughly balanced unless one desk earned more.

### Pass 2 — Line edit (write for the ear)

- One idea per sentence. Most sentences under 20 words; none over 30 unless it is a deliberate list the voice can carry.
- Keep subject and verb together. No dependent clauses up front. Put attribution before the quote ("A lead researcher said...").
- Use contractions. Prefer active, concrete verbs to adjectives. Fragments are fine.
- Swap abstractions for specifics from the sources: "an AWS multi-agent playbook for regulated industries" beats "one explainer."
- Characters should sound different, per the cast notes in skill 08: Priya is quick with dry wit, Sam is laid-back and skeptical, Aaron is warm, deliberate, and British. Don't sand every desk down to the same consultant voice.
- Cut stock phrases: "the useful takeaway," "the operating rule," "here's the thing," "the real story," "zoom out."
- Signpost transitions inside a segment ("Second story." "Now, the catch.") so the listener knows where they are.
- Check every superlative ("first," "only," "biggest") against the sources, and qualify or cut it if unsupported. Keep what's known separate from what's claimed or rumored.

### Pass 3 — TTS readiness

- Spell out symbols and ambiguous tokens: "%" becomes "percent," "$2B" becomes "two billion dollars," "v3.1" becomes "version three point one," "e.g." becomes "for example." Years and plain numbers can stay as digits.
- Check acronyms from the lint `info` block. Keep ones spoken as letters that listeners know (AI, API, GPU). Spell out or explain the rest on first use ("MCP, the Model Context Protocol").
- Use at most 2–3 `<break time="0.5s" />` tags per segment, only where a beat really helps. ElevenLabs warns that too many breaks destabilize the audio. Em-dashes give a short pause.
- Read tricky proper nouns aloud in your head. If the voice is likely to garble one, rephrase.

### Self-check and round 2

1. Write `podcast.json`, then run:
   `python3 scripts/podcast_lint.py <week> --draft data/<week>/podcast.draft.json`
2. Re-score on the rubric (the "after" scores), citing concrete evidence from the edited script for each score.
3. **Pass bar:** zero lint errors, every rubric dimension at 3 or higher, mean of 4.0 or higher, and every atomic check true.
4. If the script misses the bar, do ONE targeted second round that fixes only the failing items. Then stop. Research shows unguided self-correction gets worse after about two rounds, so there is no third round.
5. If it still misses the bar after round 2, set `verdict` to `"ship_with_flags"` and list the failures in `flags`. The pipeline will render it anyway and report the flags.

## Rubric (score 1–5, before and after)

| Dimension | 5 looks like | 1 looks like |
|---|---|---|
| `hook` | Opens on a concrete story with tension in the first 15 seconds; under 45 seconds | Abstract thesis or theme list; over a minute |
| `audience_fit` | Every story has a distinct, credible so-what for an enterprise AI and innovation leader in an industrial company | Generic AI news; no reason this listener should care |
| `specificity` | Named products, orgs, numbers, and dates from the sources in every segment | "One explainer," "a cluster of posts," no numbers |
| `non_redundancy` | Each story and each piece of advice appears once | Same advice or concept in 4+ segments |
| `clarity_for_ear` | Short sentences, one idea each, signposted, easy to follow without seeing it | Long clauses, stacked lists, lost thread |
| `momentum` | A fresh hook every 2–5 minutes, strong material early, varied pace | Flat stretches; best material buried; monotone rhythm |
| `voice_distinctness` | Each correspondent sounds like their character | All desks sound interchangeable |
| `flow_and_handoffs` | Cues set up without stealing lines; varied handbacks; every desk hands back | Missing or identical handbacks; cues repeat the piece |
| `accuracy` | Every claim traceable; superlatives supported; known vs claimed kept separate | Unsupported claims or invented specifics |
| `tts_readiness` | No symbols or ambiguous tokens; acronyms handled; breaks sparing | Symbols, version strings, or unexplained acronyms the voice will mangle |
| `close` | 2–4 concrete watch items and at most one fresh call to action | Recap of the episode, or advice repeated from earlier |

## Atomic checks (true or false, after editing)

- `cold_open_names_specific_story`
- `cold_open_under_45s`
- `every_desk_hands_back`
- `no_story_deep_dived_twice`
- `no_advice_repeated_across_segments`
- `every_story_has_listener_so_what`
- `no_sentence_over_30_words_unless_list`
- `no_unsupported_superlatives`
- `all_added_facts_have_source_item_id`
- `runtime_18_to_30_min`
- `lint_zero_errors`

## `podcast.review.json` schema

```json
{
  "week_start": "2026-09-14",
  "reviewer_model": "<model name>",
  "rounds": 1,
  "episode_in_one_sentence": "...",
  "listener_notes": [ {"segment": "x_segment", "reaction": "bored|confused|repeat|weird|learned", "note": "..."} ],
  "scores": {
    "before": {"hook": 2, "audience_fit": 3, "...": 0},
    "after":  {"hook": 5, "audience_fit": 4, "...": 0},
    "after_evidence": {"hook": "Opens on ...", "...": "..."}
  },
  "atomic_checks": {"cold_open_names_specific_story": true, "...": true},
  "lint": {"before": {"errors": 0, "warnings": 10}, "after": {"errors": 0, "warnings": 2}},
  "warnings_left_by_design": [ {"check": "acronyms", "reason": "..."} ],
  "verdict": "pass | ship_with_flags",
  "flags": [],
  "estimated_minutes": {"before": 18.5, "after": 21.0},
  "changes": [
    {"segment": "cold_open", "type": "rewrite|cut|merge|reorder|add_fact|line_edit|tts|handoff",
     "before": "<short excerpt>", "after": "<short excerpt>", "reason": "...", "source_item_id": "<if a fact was added>"}
  ],
  "summary_for_producer": "3-5 sentences: what was wrong, what changed, what to watch next week."
}
```

Keep `changes` to meaningful edits (about 15–40 entries). Don't log every comma.

## Sources behind this skill

- NPR Training, "How to edit with your ears": https://www.npr.org/sections/npr-training/2025/05/28/g-s1-67202/how-to-edit-with-your-ears
- NPR Training, "The journey from print to radio storytelling": https://www.npr.org/sections/npr-training/2025/05/30/g-s1-65814/the-journey-from-print-to-radio-storytelling-a-guide-for-navigating-a-new-landscape
- NPR Training, "How to hook your podcast audience": https://www.npr.org/sections/npr-training/2025/05/30/g-s1-66161/how-to-hook-your-podcast-audience
- NPR Training, "Campfire tales: the essentials of writing for radio": https://www.npr.org/sections/npr-training/2025/05/31/g-s1-65875/campfire-tales-the-essentials-of-writing-for-radio
- NPR Accuracy Checklist: https://www.npr.org/sections/memmos/2016/01/13/605762255/the-npr-accuracy-checklist-it-s-a-must-read-a-must-use
- BBC Academy, "Radio cues": https://www.bbc.co.uk/academy/article/radio-cues/
- Spotify for Creators, "Understanding your episode performance": https://creators.spotify.com/resources/grow/understanding-your-episode-performance
- ElevenLabs, TTS best practices: https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices
- Zheng et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena": https://arxiv.org/html/2306.05685v4
- Huang et al., "Large Language Models Cannot Self-Correct Reasoning Yet": https://ar5iv.labs.arxiv.org/html/2310.01798
- Madaan et al., "Self-Refine": https://www.alphaxiv.org/abs/2303.17651
- Anthropic, "Building effective agents" (evaluator-optimizer): https://www.anthropic.com/engineering/building-effective-agents
