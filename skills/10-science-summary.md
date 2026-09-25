# 10 — Science Summary (AI for Science & R&D page)

You build the dashboard's **Science** page for one week. It pulls every AI-for-science and R&D-adoption item from all seven tabs into one page that an innovation leader can forward to a team of materials and building scientists to get them excited about using AI.

## Reader

Two readers:
1. **The innovation leader** (see `99-editorial-voice.md`), who leads an R&D function of materials-science and building-science researchers and wants them using more AI.
2. **The scientists they forward it to**: smart, skeptical, busy, and unimpressed by hype. They're convinced by concrete methods, real results, and things they could reproduce.

Write for the scientist: specific, plain, and enthusiastic. No marketing language. No cautions or "be careful" framing; the Research tab owns those. Never name or describe the reader's employer or industry.

## Inputs

- `data/<week_start>/research.json`, especially the sections `ai_for_science` and `lab_adoption`, plus its first top pick (the "Share with your lab" pick; its `enterprise_adaptation` starts with "Share with your lab:").
- The other six tab JSONs (`youtube`, `x`, `reddit`, `builders`, `launches`, `social`). Scan top_picks, every section, and the index for AI-for-science items.
- `data/<week_start>/overview.json` for context.

These files are the ONLY source of facts. Don't invent numbers, and don't browse for new items.

## What counts as science

In scope:
- AI for materials discovery, chemistry, polymers, coatings, adhesives, and interatomic potentials
- Physics simulation and surrogate models: heat, moisture, airflow, fluids, structures
- Building science: energy modeling, building performance, digital twins, codes and standards work
- Lab automation and self-driving labs
- Math and scientific reasoning breakthroughs (formal proofs, theorem proving), when present
- How scientists, R&D teams, labs, and universities are adopting AI (literature agents, experiment design, lab notebooks and data, training), with results
- General AI tools a researcher would use directly (for example a research agent or a data-analysis feature), when clearly aimed at scientific work

Out of scope: generic enterprise, marketing, or consumer AI news with no science use.

## Output: `data/<week_start>/science.json`

```json
{
  "week_start": "2026-09-21",
  "week_end": "2026-09-27",
  "generated_at": "<ISO timestamp>",
  "headline": "One sentence (<= 160 chars) on what's newly possible in AI for science this week. Lead with the answer.",
  "summary_for_scientists": "2-4 sentences a researcher would read in 15 seconds: the biggest shifts and why they matter at the bench.",
  "lab_pick": {
    "tab_id": "research", "item_id": "<exact id from the tab JSON>",
    "title": "...", "primary_url": "...",
    "what_they_did": "1-2 sentences, concrete method",
    "result": "1-2 sentences with the number if the source has one",
    "why_researchers_care": "1-2 sentences, framed for a materials or building scientist",
    "how_to_share": "1-2 sentences: how to put it in front of a research team (lab meeting demo, a 20-minute replication, a journal-club slot)"
  },
  "sections": [
    {"section_id": "materials_chemistry", "title": "Materials & Chemistry", "description": "...", "items": []},
    {"section_id": "simulation_building_science", "title": "Simulation & Building Science", "description": "...", "items": []},
    {"section_id": "lab_automation", "title": "Lab Automation & Scientific Reasoning", "description": "...", "items": []},
    {"section_id": "rd_adoption", "title": "How R&D Teams Are Adopting AI", "description": "...", "items": []},
    {"section_id": "research_tools", "title": "Tools Researchers Can Use Now", "description": "...", "items": []}
  ],
  "try_in_the_lab": ["2-4 concrete, fun experiments a research team could run this week, drawn from the items above"],
  "coverage_note": "Optional. Use only when the week is thin, for example: 'A lighter week for materials AI; most science signal was in mathematical reasoning.'"
}
```

Each section item:

```json
{"tab_id": "builders", "item_id": "<exact id>", "title": "...", "source": "<channel, lab, repo, or journal>",
 "primary_url": "...", "one_line": "What it is and the result, in one or two sentences.",
 "try_this": "Optional: one line on how a researcher could try it."}
```

## Rules

- **Every `tab_id` + `item_id` must exist** in that tab's JSON (top_picks, sections, or index). The validator fails the week on any dangling reference. Copy ids exactly.
- `lab_pick`: prefer research.json's first top pick. If a clearly stronger science item exists in another tab, use it. Use `null` only if the week truly has no science item.
- Put each item in exactly one section. Order items within a section by interest to a scientist. Drop empty sections from the array.
- Aim for 6–15 items total. Quality over count. On thin weeks, fewer is fine; add a `coverage_note`.
- Numbers only from the tab JSONs.
- No emoji, no URLs in prose fields (URLs go only in `primary_url`), no mention of the reader's employer or industry.

## When done

Run `cd site && npm run validate -- <week_start>` and fix any `[science]` errors. Don't commit or push; the orchestrator handles git.
