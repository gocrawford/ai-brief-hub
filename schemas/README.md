# Data Schemas — The Contract

Every weekly run produces JSON files conforming to these schemas. The site renderer treats these schemas as the source of truth. **If a research skill returns malformed JSON, the build fails — it does not silently render a degraded page.** This is the architectural fix that prevents the drift problem.

## Files per week (under `data/YYYY-MM-DD/`)

The `YYYY-MM-DD` is the **Monday** of the week (week starts Monday, runs Mon–Sun).

| File | Schema | Description |
|---|---|---|
| `meta.json` | `meta.schema.json` | Week range, source counts, generation timestamp |
| `youtube.json` | `tab.schema.json` | YouTube — Video Intelligence |
| `x.json` | `tab.schema.json` | X.com — Social Intelligence |
| `reddit.json` | `tab.schema.json` | Reddit — Community Intelligence |
| `builders.json` | `tab.schema.json` | Builders — GitHub/HN/n8n/Indie Hackers |
| `launches.json` | `tab.schema.json` | Launches — Lab releases + Product Hunt + YC |
| `social.json` | `tab.schema.json` | Social — LinkedIn/Instagram/TikTok/Facebook |
| `research.json` | `tab.schema.json` | Research & Regulation (NEW) — arXiv/NIST/EU AI Act/peer 10-Ks |

## Universal scoring rubric (replaces vibes-based 9.5)

Every Top Pick gets a transparent score on 4 axes, totaled to /10:

- **Signal (0–3)** — Strategic importance to enterprise AI leadership
- **Novelty (0–3)** — New vs. rehash. Net-new beats reframed.
- **Actionability (0–2)** — Can the team take a concrete step within 30 days?
- **Source quality (0–2)** — Primary (2) > secondary (1) > aggregator (0)

The rubric is rendered in the footer of every tab so readers can audit.

## Verification gate

Every item must include:
- `primary_url` — A working URL fetched and verified (HTTP 200, content matches the claim)
- `verified` — boolean
- `verified_at` — ISO timestamp of the fetch

Items that fail verification are dropped from Top Picks and moved to a "Flagged / Unverified" appendix or omitted entirely. **No fabrications.** If the primary lab announcement can't be located, the item is dropped, period.

## Cross-tab dedup

The orchestrator runs a final pass: same story (e.g., a major model launch) appears in only one tab as a Top Pick. Other tabs may reference it but link back to the canonical placement.
