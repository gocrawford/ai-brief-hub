#!/usr/bin/env python3
"""Deterministic quality checks for a podcast script.

Usage:
  python3 scripts/podcast_lint.py <week_start> [--script PATH] [--draft PATH] [--out PATH]

Defaults: --script data/<week>/podcast.json, --out data/<week>/podcast.lint.json.
If --draft is supplied (the pre-review script), a grounding check flags any
number in the reviewed script that appears in neither the draft nor the week's
source JSONs, so the reviewer cannot invent statistics.

Exit code 0 = no errors (warnings allowed). Exit code 1 = at least one error.
Errors block rendering; warnings go to the reviewer as edit targets.
"""
import argparse, collections, json, re, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

CAST = {
    "Jordan Reeves": "iP95p4xoKVk53GoZ742B",
    "Marcus Chen": "TX3LPaxmHKxFdv7VOQHJ",
    "Priya Shah": "cgSgspJ2msm6clMCkdW9",
    "Sam Whitaker": "CwhRBWXzGAHq8TQ4Fs17",
    "Maya Okonkwo": "XrExE9yKIg1WjnnlVkGX",
    "Diego Alvarez": "IKne3meq5aSn9XLyUdCD",
    "Lena Park": "EXAVITQu4vr4xnSDxMaL",
    "Dr. Aaron Vogel": "JBFqnCBsd6RMkjVDRZzb",
}
TABS = ["youtube", "x", "reddit", "builders", "launches", "social", "research"]
BLEED = ["http://", "https://", "{ts:", "**subreddit", "arXiv:", "arxiv.org", "###",
         "author:", "author.", ".com/", ".ai/", ".org/", "www."]
BANNED = [r"\bCarlisle\b", r"\bBill\b", r"\byour team\b"]
EMOJI = re.compile("[\U0001F300-\U0001FAFF\u2600-\u27BF]")
# Speaking rate calibrated on 2026-09-14: 2,829 words rendered to 18m41s incl. music.
WPM = 155
MUSIC_SECONDS_DEFAULT = 2.0
# Filler / stock phrases that signal generic writing when overused.
STOCK = ["the real story", "here's the thing", "at the end of the day", "it's worth noting",
         "the takeaway is", "the useful takeaway", "the operating rule", "the lesson is",
         "zoom out", "the big picture", "game changer", "game-changer", "unpack"]
STOP = set("""a an the and or but of to in on for with at by from is are was were be been it its it's
that this these those as not no so if then than there their they them we our you your i he she his her
what which who when where why how all any each more most other some such only own same too very can will
just don't should now into about over after before up down out off again further once here also do does
did have has had jordan back that's it's here's there's isn't doesn't""".split())


def words(t):
    return re.findall(r"[A-Za-z0-9'][A-Za-z0-9'\-.]*", t)


def sentences(t):
    t = re.sub(r"<break[^>]*/>", " ", t)
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z\"'])", t.strip())
    return [p for p in parts if p.strip()]


def source_corpus(week):
    buf = []
    for name in TABS + ["overview"]:
        p = REPO / "data" / week / f"{name}.json"
        if p.exists():
            buf.append(p.read_text(encoding="utf-8"))
    return "\n".join(buf)


def numbers_in(t):
    # Normalize "1,200" -> "1200"; ignore bare single digits (list ordinals, "one of").
    out = set()
    for m in re.findall(r"\d[\d,]*(?:\.\d+)?", t):
        n = m.replace(",", "").rstrip(".")
        if len(n) >= 2 or "." in n:
            out.add(n)
    return out


def lint(week, script_path, draft_path=None):
    d = json.loads(Path(script_path).read_text(encoding="utf-8"))
    segs = d.get("segments", [])
    errors, warnings, info = [], [], []
    spoken = [s for s in segs if s.get("speaker") != "music"]
    music = [s for s in segs if s.get("speaker") == "music"]

    # ---------- schema + hard rules ----------
    ids = collections.Counter(s.get("id") for s in segs)
    for i, c in ids.items():
        if c > 1:
            errors.append({"check": "duplicate_id", "segment": i, "detail": f"id used {c} times"})
    for s in spoken:
        sid = s.get("id", "?")
        for f in ("id", "speaker", "character", "voice_id", "text"):
            if not s.get(f):
                errors.append({"check": "schema", "segment": sid, "detail": f"missing {f}"})
        ch, vid = s.get("character"), s.get("voice_id")
        if ch in CAST and CAST[ch] != vid:
            errors.append({"check": "voice_id", "segment": sid, "detail": f"{ch} must use {CAST[ch]}"})
        if ch and ch not in CAST:
            errors.append({"check": "voice_id", "segment": sid, "detail": f"unknown character {ch}"})
        t = s.get("text", "")
        for m in BLEED:
            if m in t:
                k = t.find(m)
                errors.append({"check": "bleed", "segment": sid, "detail": f"'{m}': ...{t[max(0,k-40):k+60]}..."})
                break
        for b in BANNED:
            if re.search(b, t):
                errors.append({"check": "banned_name", "segment": sid, "detail": b})
        if EMOJI.search(t):
            errors.append({"check": "emoji", "segment": sid, "detail": "emoji present"})
        if len(re.findall(r"<break", t)) > 3:
            warnings.append({"check": "tts_breaks", "segment": sid,
                             "detail": "more than 3 <break> tags; ElevenLabs warns excess breaks cause instability"})
    for s in music:
        if s.get("asset") not in ("intro_bed", "sting", "outro_bed"):
            errors.append({"check": "schema", "segment": s.get("id"), "detail": "music asset must be intro_bed, sting or outro_bed"})

    # ---------- duration ----------
    wc = {s["id"]: len(words(s.get("text", ""))) for s in spoken if s.get("id")}
    total_words = sum(wc.values())
    music_s = sum((s.get("duration_ms") or MUSIC_SECONDS_DEFAULT * 1000) / 1000 for s in music)
    est_min = total_words / WPM + music_s / 60
    if est_min < 18:
        warnings.append({"check": "duration", "segment": None,
                         "detail": f"estimated {est_min:.1f} min; NPR evidence puts the sweet spot at 18-30 min"})
    if est_min > 30:
        warnings.append({"check": "duration", "segment": None, "detail": f"estimated {est_min:.1f} min; over 30 min"})

    # ---------- structure ----------
    cold = next((s for s in spoken if s.get("id") == "cold_open"), None)
    if cold is None:
        errors.append({"check": "structure", "segment": None, "detail": "no cold_open segment"})
    else:
        cs = wc.get("cold_open", 0) / WPM * 60
        if cs > 60:
            warnings.append({"check": "cold_open_length", "segment": "cold_open",
                             "detail": f"~{cs:.0f}s; target 30-45s. Long intros drive early drop-off"})
        if not re.search(r"\d|[A-Z][a-z]+ [A-Z][a-z]+", cold.get("text", "")):
            warnings.append({"check": "cold_open_hook", "segment": "cold_open",
                             "detail": "no concrete number or named entity; open with a specific story, not an abstraction"})
    corr = [s for s in spoken if s.get("id", "").endswith("_segment")]
    lens = [wc[s["id"]] for s in corr]
    if lens:
        for s in corr:
            secs = wc[s["id"]] / WPM * 60
            if secs > 240:
                warnings.append({"check": "segment_length", "segment": s["id"], "detail": f"~{secs/60:.1f} min; over 4 min"})
            if not re.search(r"back to you|over to you|jordan\.?\s*$", s["text"].strip()[-120:], re.I):
                warnings.append({"check": "handback", "segment": s["id"], "detail": "no handback in final lines"})
        # identical handback lines
        tails = collections.Counter(re.sub(r"\W+", " ", s["text"].strip().split(".")[-2 if s["text"].strip().endswith(".") else -1]).strip().lower() for s in corr)
        for tline, c in tails.items():
            if c >= 3 and tline:
                warnings.append({"check": "handback_monotony", "segment": None, "detail": f"'{tline}' ends {c} segments"})

    # ---------- sentence-level (write for the ear) ----------
    long_sents = []
    all_sent_lens = []
    for s in spoken:
        for sent in sentences(s.get("text", "")):
            n = len(words(sent))
            all_sent_lens.append(n)
            if n > 30:
                long_sents.append({"segment": s["id"], "words": n, "sentence": sent[:160]})
    if long_sents:
        warnings.append({"check": "long_sentences", "segment": None,
                         "detail": f"{len(long_sents)} sentences over 30 words (one idea per sentence)",
                         "examples": long_sents[:12]})
    avg_sent = sum(all_sent_lens) / max(1, len(all_sent_lens))

    # ---------- TTS readiness ----------
    tts = []
    for s in spoken:
        t = s.get("text", "")
        for m in re.finditer(r"[%$&@#+/]|\b\d+(?:\.\d+){2,}\b|\bv\d[\d.]*\b|\b\d+[kKmMbB]\b|\be\.g\.|\bi\.e\.|\betc\.", t):
            tts.append({"segment": s["id"], "token": m.group(0), "context": t[max(0, m.start()-30):m.end()+30]})
    if tts:
        warnings.append({"check": "tts_symbols", "segment": None,
                         "detail": f"{len(tts)} symbols/abbreviations; write them as spoken words", "examples": tts[:15]})
    acr = collections.Counter()
    for s in spoken:
        acr.update(re.findall(r"\b[A-Z]{2,6}s?\b", s.get("text", "")))
    info.append({"check": "acronyms", "detail": "confirm each is pronounced as intended (letters vs word)",
                 "tokens": dict(acr.most_common(40))})

    # ---------- redundancy ----------
    seg_tokens = {}
    for s in spoken:
        toks = [w.lower().strip(".'") for w in words(s.get("text", ""))]
        seg_tokens[s["id"]] = toks
    # repeated 4-grams across different segments (ignoring stop-word-only grams)
    gram_segs = collections.defaultdict(set)
    for sid, toks in seg_tokens.items():
        for g in zip(toks, toks[1:], toks[2:], toks[3:]):
            if sum(1 for w in g if w not in STOP) >= 2:
                gram_segs[" ".join(g)].add(sid)
    rep = sorted(((g, sorted(v)) for g, v in gram_segs.items() if len(v) >= 3), key=lambda x: -len(x[1]))
    if rep:
        warnings.append({"check": "repeated_phrases", "segment": None,
                         "detail": f"{len(rep)} four-word phrases appear in 3+ segments",
                         "examples": [{"phrase": g, "segments": v} for g, v in rep[:15]]})
    # concept saturation: a content word used in 4+ correspondent segments
    corr_ids = [s["id"] for s in corr]
    df = collections.Counter()
    for sid in corr_ids:
        df.update(set(w for w in seg_tokens[sid] if w not in STOP and len(w) > 5))
    sat = {w: c for w, c in df.items() if c >= 5}
    if sat:
        warnings.append({"check": "concept_saturation", "segment": None,
                         "detail": "content words in 5+ of 7 correspondent segments; is the same point being made repeatedly?",
                         "terms": dict(sorted(sat.items(), key=lambda x: -x[1])[:20])})
    full = " ".join(s.get("text", "").lower() for s in spoken)
    stock = {p: full.count(p) for p in STOCK if full.count(p) >= 2}
    if stock:
        warnings.append({"check": "stock_phrases", "segment": None, "detail": "generic phrases used 2+ times", "phrases": stock})


    # ---------- caution budget (cautions live only in the Research reality check) ----------
    CAUTION = [r"\bbe careful\b", r"\bcaution", r"\bunverified\b", r"\bnot verified\b", r"\bunproven\b",
               r"\bnot a guarantee\b", r"\bisn't a guarantee\b", r"\bhypothesis\b", r"\bbefore you (?:act|trust|deploy)\b",
               r"\bread-only\b", r"\bguardrails?\b", r"\bgovernance\b", r"\baudit(?:s|ed|ing)?\b", r"\bpermissions?\b",
               r"\bcompliance\b", r"\brisks?\b", r"\bpilot (?:it|first)\b", r"\bdon't (?:act|trust|rely)\b",
               r"\bproceed with\b", r"\bverify\b", r"\bprove it\b", r"\bwarning\b"]
    caution_hits = collections.Counter()
    for s_ in spoken:
        if s_.get("id") == "research_segment":
            continue
        t = s_.get("text", "").lower()
        n = sum(len(re.findall(c, t)) for c in CAUTION)
        if n:
            caution_hits[s_["id"]] = n
    caution_total = sum(caution_hits.values())
    if caution_total > 3:
        warnings.append({"check": "caution_language", "segment": None,
                         "detail": f"{caution_total} caution words outside the Research reality check (budget 3); move to research_segment or cut",
                         "by_segment": dict(caution_hits)})
    ENT = [r"\benterprise", r"\bcompan(?:y|ies)\b", r"\bIT\b", r"\bprocurement\b", r"\bvendor"]
    ent_total = sum(len(re.findall(e, s_.get("text", ""), re.I if e != r"\bIT\b" else 0)) for s_ in spoken for e in ENT)

    # ---------- specificity ----------
    for s in corr:
        t = s["text"]
        nums = len(numbers_in(t))
        names = len(set(re.findall(r"(?<![.!?]\s)\b[A-Z][a-zA-Z0-9]+(?:\s[A-Z][a-zA-Z0-9]+)*", t)) - {"Jordan", "I"})
        if nums == 0 and names < 5:
            warnings.append({"check": "abstract_segment", "segment": s["id"],
                             "detail": f"{nums} numbers, ~{names} named entities; add concrete facts from the source JSON"})

    # ---------- grounding (only when a draft is supplied) ----------
    ungrounded = []
    if draft_path:
        draft = json.loads(Path(draft_path).read_text(encoding="utf-8"))
        draft_txt = " ".join(x.get("text", "") for x in draft.get("segments", []))
        corpus = source_corpus(week) + " " + draft_txt
        corpus_nums = numbers_in(corpus)
        for s in spoken:
            for n in numbers_in(s.get("text", "")):
                if n not in corpus_nums:
                    ungrounded.append({"segment": s["id"], "number": n})
        if ungrounded:
            errors.append({"check": "ungrounded_numbers", "segment": None,
                           "detail": "numbers not found in draft or source JSONs; remove or correct",
                           "examples": ungrounded[:20]})

    metrics = {
        "spoken_segments": len(spoken), "music_segments": len(music), "total_words": total_words,
        "estimated_minutes": round(est_min, 1), "avg_sentence_words": round(avg_sent, 1),
        "long_sentences": len(long_sents), "repeated_phrases": len(rep), "tts_symbols": len(tts),
        "caution_words_outside_research": caution_total, "enterprise_words": ent_total,
        "segment_words": wc,
    }
    return {"week": week, "script": str(script_path), "pass": not errors,
            "errors": errors, "warnings": warnings, "info": info, "metrics": metrics}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("week")
    ap.add_argument("--script")
    ap.add_argument("--draft")
    ap.add_argument("--out")
    a = ap.parse_args()
    script = a.script or REPO / "data" / a.week / "podcast.json"
    out = Path(a.out) if a.out else REPO / "data" / a.week / "podcast.lint.json"
    r = lint(a.week, script, a.draft)
    out.write_text(json.dumps(r, indent=2), encoding="utf-8")
    m = r["metrics"]
    print(f"{'PASS' if r['pass'] else 'FAIL'}  errors={len(r['errors'])} warnings={len(r['warnings'])}  "
          f"~{m['estimated_minutes']} min  {m['total_words']} words  avg sentence {m['avg_sentence_words']}w")
    for e in r["errors"]:
        print("  ERROR", e["check"], e.get("segment") or "", "-", e["detail"])
    for w in r["warnings"]:
        print("  warn ", w["check"], w.get("segment") or "", "-", w["detail"])
    print("  report:", out)
    sys.exit(0 if r["pass"] else 1)


if __name__ == "__main__":
    main()
