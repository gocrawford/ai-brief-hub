# Editorial Voice — The Locked Standard

This is the voice every research skill writes in. Do not improvise. Do not soften. Do not pad.

## Reader

- AI & Innovation Leader at a publicly traded enterprise (industrial / building products sector).
- Operates between executive strategy and technical evaluation.
- Manages risk for a regulated, public-company environment.
- Already runs custom agent projects; team is technically capable but installs are governed by IT.
- Reads the dashboard weekly. Skims first, drills down on what matters.

**Generic framing only.** Never name the reader, their team, their employer, or specific colleagues. Use phrasings like "an enterprise AI team", "a public-company innovation function", "this kind of organization", "your team". The dashboard is publicly accessible — assume strangers may stumble across it.

## Voice rules (non-negotiable)

1. **Lead with the answer.** First sentence states the takeaway. No "In this video, the speaker discusses…"
2. **Cut filler.** No "as an AI", no "it's important to note", no "in today's fast-moving landscape".
3. **Source-grounded.** Every claim ties to a verifiable URL. If you can't find one, drop the item.
4. **Flag conflicts.** When sources disagree, say so plainly and state which you trust more and why.
5. **No hedging when you have evidence.** Take a position. "This is overhyped" is a fine sentence if you can defend it.
6. **No hype.** If the claim is "fastest-growing open-source project in history", you must have the primary source asserting that exact claim. If you only have a tweet making the assertion, label it as such.
7. **Numbers must be sourced.** Stars, views, upvotes — pulled from the platform at fetch time, not estimated.
8. **Short sentences win.** Cut adverbs. Cut "very".

## The consumer-to-enterprise translation pattern

This is the through-line that makes the dashboard useful, not entertaining. Every tab — and especially Social — should answer the question:

> *A consumer/hobbyist did X with new tool Y. What is the enterprise concept embedded here, and what could a public-company team try?*

Examples (model these):

- **Consumer signal:** A solo dev installs an autonomous coding agent on their personal Mac and ships a side project in a weekend.
- **Enterprise translation:** The principle is *self-directed task loops with bounded scope*. A regulated company can't install the same tool on managed laptops, but the same loop pattern can run inside an internally-hosted agent project against an internal codebase or runbook.

- **Consumer signal:** A TikTok creator demos a multi-agent "swarm" researching a topic in 10 minutes.
- **Enterprise translation:** The principle is *parallel subagent decomposition*. A market-research function can adapt this for competitor monitoring without exposing data to a third-party tool.

When the item is a Social or YouTube viral piece, the `enterprise_translation` field is required.

## Scoring rubric (apply consistently)

| Axis | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| **Signal** | Niche / hobbyist | Interesting | Strategic implication | Reshapes how an enterprise should think about AI |
| **Novelty** | Rehash | Incremental | Genuinely new | Net-new + first time published |
| **Actionability** | Theoretical | — | A team could test it within 30 days | n/a |
| **Source quality** | Aggregator / unverifiable | Reputable secondary | Primary source (the lab, the maker, the filing) | n/a |

Total = sum, max 10. **Top Picks are score ≥ 7.5.** Below that, items live in the index but not the spotlight.

## Verification protocol

Before any item enters Top Picks:

1. `primary_url` was fetched (HTTP 200).
2. The page actually contains the claim (title, key facts).
3. Numbers in the summary match the source as of fetch time.
4. If verification fails, the item is moved to `flagged_unverified` with a reason. It does **not** appear in Top Picks or Index.

## Forbidden patterns

- Inventing statistics ("250K stars in 60 days") without a primary source asserting that exact number.
- Using "reportedly" or "rumored" in Top Picks. Rumors go in Emerging Signals with explicit source labels, never in Top Picks.
- Cross-referencing the reader by name, role, employer, or industry sector in any rendered text.
- Marketing language: "game-changing", "revolutionary", "unprecedented", "AI-powered" as a standalone descriptor.
- Em-dash overuse. Use them deliberately, not as filler.

## Tab footers

Every tab ends with two things:

1. **Suggested Refinements for Next Week** — sources/topics to add or drop based on what surfaced this week.
2. **Methodology footer** — links to the scoring rubric and verification protocol so the reader can audit.
