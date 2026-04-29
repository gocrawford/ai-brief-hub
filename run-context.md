# Test Run Context — Week of Apr 20–26, 2026

This is the test run for the AI Brief Hub. Output goes to `data/2026-04-20/<tab>.json` for the tab you're assigned.

## Time window
- **Week:** Monday April 20, 2026 00:00 ET → Sunday April 26, 2026 23:59 ET
- **Today's date:** Wednesday April 29, 2026 (today is the day after the week ended; you're researching the week that just closed)
- Only include items published, posted, or trending **within that 7-day window**. Reject older items even if they're surfacing now.

## Repository
- Root: `/home/user/workspace/ai-brief-hub`
- Schema: `schemas/tab.schema.json` — your output MUST validate against this
- Editorial voice: `skills/99-editorial-voice.md` — read this first, it is non-negotiable
- Your tab skill: `skills/<NN>-<tab>.md` — full source list and method

## Reader (verbatim from voice skill)
- AI & Innovation Leader at a publicly traded enterprise (industrial / building products sector)
- **Generic framing only.** Never name the reader, their team, their employer, or specific colleagues. Use phrasings like "an enterprise AI team", "a public-company innovation function", "this kind of organization", "your team". The dashboard is publicly accessible.

## Hard requirements

1. **Read your skill file end-to-end before researching.** The source list there is the locked starting point.
2. **Verify every Top Pick.** Fetch the primary_url, confirm HTTP 200, confirm the page contains the claim. If it doesn't verify, move it to `flagged_unverified`.
3. **Score every item** using the rubric in 99-editorial-voice.md (Signal 0–3 + Novelty 0–3 + Actionability 0–2 + Source quality 0–2 = /10). Top Picks score ≥ 7.5.
4. **Hit the floors:**
   - youtube: min 12 in index, freshness target 0.80
   - x: min 15, target 0.80
   - reddit: min 20, target 0.80
   - builders: min 15, target 0.80
   - launches: min 20, target 0.85
   - social: min 15, target 0.80
   - research: min 10, target 0.80
5. **Lead with the answer.** No "In this video the speaker discusses…". First sentence of every summary states the takeaway.
6. **No marketing language.** No "game-changing", "revolutionary", "AI-powered" as a standalone descriptor.
7. **Generic framing in `enterprise_translation` and `enterprise_adaptation`.** Never name the reader or their employer.
8. **Numbers must be sourced** at fetch time — views, likes, stars, upvotes pulled from the platform, not estimated.

## Output requirements

- Write valid JSON to `/home/user/workspace/ai-brief-hub/data/2026-04-20/<tab_id>.json`
- Conform to `schemas/tab.schema.json` — use `additionalProperties: false` on items, every required field present
- Top Picks (3–8 items, score ≥ 7.5, all verified)
- Sections per your tab skill's "Output structure"
- Index with at least your tab's `min_items` floor
- `freshness` object with target_pct_new, pct_new, items_total/new/returning
- `suggested_refinements` (sources_to_add, sources_to_drop, topics_to_add, notes)

## Tabs that need extra fields

- **Builders & Research Top Picks:** require `enterprise_adaptation` (3 parts: implementation pattern + regulated-environment caveats + 30-day experiment)
- **Social section items:** require `enterprise_translation` (the consumer-to-enterprise pattern translation)

## When you're done

1. Validate by reading your output JSON and walking the schema mentally — every required field present, no extras.
2. Print a one-paragraph summary: how many Top Picks you produced, freshness pct_new, anything you flagged.
3. **Do not commit or push.** The orchestrator handles git.
