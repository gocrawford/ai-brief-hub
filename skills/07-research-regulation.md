# Research — AI for Science, Breakthroughs & Regulation

## Mission

The highest-trust tab, and the brief's **AI-for-science desk**. The reader leads innovation in an R&D function of materials and building scientists and wants to get them using more AI. Lead with **AI for science**: materials discovery, chemistry, physics simulation, building science, and self-driving labs. Also cover **how R&D teams are getting scientists to adopt AI**, plus general papers and model cards that show AI can now do something it couldn't. Then cover the slower signals: NIST, EU AI Act, and US executive actions, plus AI disclosures in peer 10-K/10-Q filings.

**Balance:** at least half of the Top Picks should be capability or breakthrough research. This tab also **owns** security, safety, and regulation for the whole brief. Keep it here, stated plainly, so the other tabs don't have to.

This tab exists because hype cycles obscure the slower, higher-impact signals: scientific capability, how research labs actually use AI, and (secondarily) regulation and peer disclosures.

**Balance for Top Picks (4–6):** at least 2 AI-for-science or R&D-adoption items when the week has them, 1–2 general AI capability papers or model cards, and at most 1–2 safety or regulation items.

**Pick the "share this with your lab" item:** choose ONE item (from this tab, or any tab's AI-for-science find) that would most likely win over a skeptical scientist, because it's concrete, reproducible, and in or near materials, chemistry, physics, or building science. Put it first in `top_picks`, and start its `enterprise_adaptation` with "Share with your lab:" followed by one line on why it would land with researchers.

## Source list

**Research:**
- arXiv cs.AI, cs.CL, cs.LG — papers with significant traction (Twitter/X discussion, GitHub stars, citation velocity)
- Major lab papers (Anthropic, OpenAI, DeepMind, Meta, Mistral) — published with their model cards
- AlphaXiv, Papers with Code — for traction signals
- Hugging Face papers section

**AI for materials, chemistry, and physics (check every week):**
- arXiv cond-mat.mtrl-sci, physics.comp-ph, physics.chem-ph, and cs.LG papers applied to materials
- ChemRxiv; journals Digital Discovery, npj Computational Materials, Nature Computational Science, and Nature/Science AI-for-science papers
- Lab and industry announcements: materials foundation models, machine-learned interatomic potentials, generative materials design, self-driving and autonomous labs, AI-for-science startups
- Open tools with traction: materials and chemistry model repos and benchmarks (for example Matbench-style leaderboards)

**AI for building science:**
- Building energy modeling with ML, surrogate models for heat, moisture, airflow, and structural simulation, building-performance digital twins, and AI in building codes and standards work
- Sources: arXiv (eess.SY, physics.app-ph), Energy and Buildings, Building and Environment, and national lab announcements (for example NREL, LBNL, ORNL)

**Scientist and R&D adoption stories:**
- How research groups, national labs, universities, and corporate R&D teams are getting scientists to use AI: literature-review agents, experiment design, lab notebooks and data, and training programs, with measured results where available
- Sources: lab and university news, R&D trade press, Nature careers and news features, and practitioner posts on X, LinkedIn, and Reddit (for example r/labrats, r/comp_chem, r/materials)

**Model cards / system cards:**
- Each frontier lab's published model card for new releases
- Capability and safety disclosures specifically

**Regulation (US):**
- NIST AI Risk Management Framework updates (nist.gov/itl/ai-risk-management-framework)
- White House OSTP / executive orders on AI
- FTC AI-related actions
- SEC AI-related disclosures and statements
- State-level: California, Colorado AI laws

**Regulation (EU & global):**
- EU AI Act implementation milestones (artificialintelligenceact.eu, EU AI Office)
- UK AI Safety Institute publications
- ISO/IEC 42001 (AI management system) developments
- China — Cyberspace Administration AI rules

**Industry:**
- Carlisle peer-set 10-K / 10-Q AI mentions (industrial / building products): companies like Carlisle (CSL), Owens Corning (OC), Johns Manville (JM, parent BRK.B), Eagle Materials (EXP), Martin Marietta (MLM), Vulcan Materials (VMC), Masonite (DOOR), Trex (TREX), Boise Cascade (BCC). Look for AI-related risk factors, capex guidance, supplier mentions. Use SEC EDGAR full-text search for `"artificial intelligence"` filed in the week.
- Note: never name "Carlisle" or peers in the rendered text — use generic framing like "industrial-sector peers" or "public-company industrial issuers". This is for the reader's mental model; the dashboard is public.

## Method

1. **arXiv:** filter to last week. Cross-reference with X discussion volume and GitHub repos that implement the paper. Top picks need both academic substance and practitioner traction.
2. **Model cards:** when a frontier lab releases, read the actual card, not the press release. Capture capability claims, safety eval results, and what the card *doesn't* address.
3. **Regulation:** read the primary document, not the news summary. Capture the specific clause/section that changed.
4. **SEC:** EDGAR full-text search for "artificial intelligence" in 10-K/10-Q/8-K filed during the week, scoped to industrial sector. Summarize what the filing says, with the exact filing URL on EDGAR.
5. Every Top Pick must populate `enterprise_adaptation`. For capability papers, give "steal this idea" content and one experiment. For regulation or safety items, say in one or two plain sentences what changed and who it affects. No checklists.

## Freshness & recurrence

Set `freshness.target_pct_new = 0.80` and `min_items = 10`. Against last week's `data/<prev_week>/research.json`:

- **Same paper / same regulatory document** — exclude entirely.
- **Multi-week regulatory rollout** (e.g., EU AI Act phased deadlines) — `recurrence: "returning"` with a `recurrence_note` capturing what changed this week.
- **Recurring research theme** (e.g., the agent-evals literature compounding) — `recurrence: "returning_theme"` with a note linking to last week's anchor item.
- Empty section line: `"No major new developments this week."`

## Output structure (`research.json`)

`tab_id: "research"`, `subtitle: "Primary-Source Intelligence"`, `icon: "FileText"`.

**Sections:**
1. `executive_summary` — 3–5 bullets
2. `top_picks` — 4–6 items spanning research, regulation, and disclosures
3. `ai_for_science` — Materials, chemistry, physics-simulation, and building-science AI (3–6 items)
4. `lab_adoption` — How R&D teams and scientists are adopting AI, with results (2–4 items)
5. `papers` — Other arXiv and lab papers with traction
6. `model_cards` — New model/system card analyses
7. `regulation_us` — US regulatory activity
8. `regulation_global` — EU AI Act, UK, ISO, China
9. `enterprise_disclosures` — Public company AI mentions in filings (use generic framing)
10. `emerging_signals` — Patterns
11. `index` — All considered
12. `suggested_refinements`

## Per-item required fields

- `title`, `source` (arXiv / NIST / EU AI Office / SEC / lab name), `author`, `date`, `primary_url` (must be primary — arxiv.org, nist.gov, sec.gov, lab domain), `summary`, `score`, `verified`, `verified_at`
- Source quality on this tab is almost always 2/2 (primary). If you're tempted to give 1/2, you probably shouldn't include the item.
- Top Picks: **`enterprise_adaptation`** (required — same definition as Builders)
- Index requires **min 10 rows** (`min_items: 10`)

## Specific anti-patterns

- Never cite a Twitter summary of a paper as the primary source — link to arxiv.org/abs/XXXX
- Never cite a news article as the primary source for regulation — link to the .gov / .europa.eu document
- Never cite a press release for a 10-K mention — link to EDGAR
- Never name the reader, employer, or specific peer companies in rendered text
