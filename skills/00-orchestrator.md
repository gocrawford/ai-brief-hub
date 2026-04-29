# Weekly Orchestrator

Runs every Sunday 8 PM ET. Produces a complete, validated, deduplicated week of research as JSON committed to the repo, then deploys the static site.

## Inputs

- `week_start` — Monday's date (YYYY-MM-DD), ET. The week is Mon 00:00 ET → Sun 23:59 ET.
- Repo path: `/home/user/workspace/ai-brief-hub`

## Steps

1. **Compute window.** `week_start` to `week_end` (Sunday). Confirm no folder exists at `data/<week_start>/` — if it does, abort with a notification (manual override required).

2. **Spawn 7 research subagents in parallel**, one per tab. Each follows its skill (`01-youtube.md` … `07-research-regulation.md`) and writes:
   - Output JSON to `data/<week_start>/<tab>.json`
   - Validation against `schemas/tab.schema.json`

   Each subagent must:
   - Use only the tab's allowed sources.
   - Verify every Top Pick URL (HTTP 200, content matches claim).
   - Apply the scoring rubric from `99-editorial-voice.md`.
   - Quarantine unverified items into `flagged_unverified`.

3. **Cross-tab deduplication.** Build a canonical-story index by `id` slug. If the same story appears as a Top Pick in 2+ tabs, keep the highest-scoring placement; in others, drop to a section reference (not Top Pick).

4. **Generate `meta.json`.** Sum source counts. Write the 5–7 bullet executive summary stitched from the tab summaries.

5. **Validate.** Run `scripts/validate.mjs` (uses Ajv). The validator enforces:
   - JSON Schema conformance against `schemas/tab.schema.json`
   - `freshness.pct_new >= freshness.target_pct_new` (per-tab target: 0.80 most tabs, 0.85 launches)
   - `index.length >= min_items` (per-tab floor: youtube 12, x 15, reddit 20, builders 15, launches 20, social 15, research 10)
   - All Top Picks have `verified: true` and a `verified_at` timestamp
   - All Builders Top Picks and Research Top Picks have `enterprise_adaptation` populated
   - All Social items have `enterprise_translation` populated
   - No item has `recurrence` set when its `id` slug doesn't appear in last week's `index` (catches false-recurrence labels)

   If any check fails, **abort and notify** with the specific tab + field. Do not commit a partial week.

6. **Commit.** Branch `weekly/<week_start>`. Single commit: "Week of <week_label>". Push, open PR for the user to review, OR merge directly if `auto_merge: true`.

7. **Build & deploy.** GitHub Action triggers on merge to `main`, builds the Vite site, deploys to GitHub Pages.

8. **Notify.** Send the user the URL, source counts, and the executive summary as a notification.

## Failure modes (explicit)

- Schema validation fails → abort, notify with the specific tab and field that failed. Never silently render a degraded page.
- A research subagent returns < 3 verified Top Picks → notify, do not auto-publish; user decides whether to ship a thin tab or rerun.
- URL verification fails for > 30% of candidates in a tab → notify, the source list likely needs refinement.

## Manual rerun

`pplx-tool schedule_cron` cadence handles automatic runs. To rerun a week manually, invoke this skill with `week_start` set explicitly. The week's existing folder must be deleted or moved first.
