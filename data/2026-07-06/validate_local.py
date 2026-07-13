import json
from jsonschema import Draft202012Validator

schema = json.load(open("/home/user/workspace/ai-brief-hub/schemas/tab.schema.json"))
data = json.load(open("/home/user/workspace/ai-brief-hub/data/2026-07-06/reddit.json"))

v = Draft202012Validator(schema)
errors = sorted(v.iter_errors(data), key=lambda e: e.path)
if not errors:
    print("VALID against schema")
else:
    print(f"{len(errors)} error(s):")
    for e in errors:
        print(" - path:", list(e.path), "message:", e.message)

# Extra checks not fully covered by schema (root additionalProperties already false)
assert "week_start" not in data and "week_end" not in data, "root must not include week_start/week_end"
for sec in data.get("sections", []):
    for it in sec.get("items", []):
        assert "what_to_watch" not in it, f"section item has what_to_watch: {it.get('id')}"

ids = []
for tp in data.get("top_picks", []):
    ids.append(tp["id"])
for sec in data.get("sections", []):
    for it in sec["items"]:
        ids.append(it["id"])

import re
kebab = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
bad_ids = [i for i in ids if not kebab.match(i)]
print("bad kebab-case ids:", bad_ids)
print("duplicate ids:", [i for i in set(ids) if ids.count(i) > 1])

for tp in data.get("top_picks", []):
    total = tp["score"]["total"]
    sq = tp["score"]["source_quality"]
    ok = total >= 7.5 and isinstance(sq, int) and not isinstance(sq, bool)
    print(tp["id"], "total=", total, "source_quality=", sq, type(sq), "OK" if ok else "FAIL")

fr = data.get("freshness", {})
print("freshness:", fr)
print("min_items:", data.get("min_items"), "index length:", len(data.get("index", [])))
