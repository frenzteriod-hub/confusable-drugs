#!/usr/bin/env python3
"""Build a score-free registered-name search index for reviewer voice input."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOOLS_PATH = ROOT / "viewer" / "data" / "cebuano_tools.json"
QUEUE_PATH = ROOT / "viewer" / "data" / "expert_queue.json"
OUTPUT_PATH = ROOT / "viewer" / "data" / "reviewer_search_names.json"


def main() -> None:
    tools = json.loads(TOOLS_PATH.read_text(encoding="utf-8"))
    queue_payload = json.loads(QUEUE_PATH.read_text(encoding="utf-8"))
    queue_rows = queue_payload.get("rows", queue_payload)
    active_names = {
        str(row[key]).strip().casefold()
        for row in queue_rows
        for key in ("a", "b")
        if str(row.get(key, "")).strip()
    }
    names = [
        [row[1], row[3], row[4]]
        for row in tools["names"]
        if str(row[1]).strip().casefold() in active_names
    ]
    names.sort(key=lambda row: (str(row[0]).casefold(), str(row[0])))
    OUTPUT_PATH.write_text(
        json.dumps({"version": 1, "names": names}, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    print(json.dumps({"status": "pass", "output": str(OUTPUT_PATH), "registered_names": len(names)}))


if __name__ == "__main__":
    main()
