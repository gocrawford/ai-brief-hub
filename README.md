# AI Brief Hub

A weekly multi-source intelligence brief covering AI tools, communities, launches, and primary research.

The brief is generated weekly (Sundays) and rendered as a static dashboard.

- **Live site:** https://gocrawford.github.io/ai-brief-hub/
- **Data:** `data/<YYYY-MM-DD>/{youtube,x,reddit,builders,launches,social,research,meta}.json`
- **Schemas:** `schemas/tab.schema.json`
- **Site source:** `site/`

## Local development

```bash
cd site
npm install
# Sync the latest data into the site bundle
rm -rf public/data && cp -R ../data public/data
npm run dev
```

## Validation

```bash
cd site
npm run validate            # validate every week
npm run validate 2026-04-27 # validate one week
```

## Build

```bash
cd site
npm run build
```

The site deploys automatically via GitHub Actions on every push to `main` that touches `site/`, `data/`, or the workflow file.
