# Research & Regulation — Primary-Source Intelligence

## Mission

The highest-trust tab. Track the substrate beneath the news cycle: arXiv papers being widely discussed, model cards, NIST AI RMF updates, EU AI Act implementation milestones, US executive actions, and AI disclosures in peer 10-K/10-Q filings.

This tab exists because hype cycles obscure the slower-moving but higher-impact signals: regulation, capability disclosures from frontier labs, and how peer public companies are framing AI to investors.

## Source list

**Research:**
- arXiv cs.AI, cs.CL, cs.LG — papers with significant traction (Twitter/X discussion, GitHub stars, citation velocity)
- Major lab papers (Anthropic, OpenAI, DeepMind, Meta, Mistral) — published with their model cards
- AlphaXiv, Papers with Code — for traction signals
- Hugging Face papers section

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
5. Every Top Pick must populate `enterprise_adaptation` per the schema definition (implementation pattern + regulated-environment caveats + 30-day experiment) — Research Top Picks earn the same actionability bar as Builders.

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
3. `papers` — arXiv and lab papers with traction
4. `model_cards` — New model/system card analyses
5. `regulation_us` — US regulatory activity
6. `regulation_global` — EU AI Act, UK, ISO, China
7. `enterprise_disclosures` — Public company AI mentions in filings (use generic framing)
8. `emerging_signals` — Patterns
9. `index` — All considered
10. `suggested_refinements`

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
