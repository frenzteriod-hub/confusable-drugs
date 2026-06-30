#!/usr/bin/env python3
"""Download PH FDA PI/PIL files and extract sourced description/indication text.

This script never generates missing medical information. It preserves each PDF,
its SHA-256 hash, page-level extracted/OCR text, extraction method, page numbers,
and review status. OCR-derived sections always require human review.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
import shutil
import subprocess
import sys
import tempfile
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from difflib import SequenceMatcher
from pathlib import Path
from typing import Iterable
from urllib.parse import parse_qs, urlparse

import requests
from pypdf import PdfReader


PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_INPUT = PROJECT_ROOT / "data" / "ph_fda" / "raw" / "ph_fda_leaflets.csv"
DEFAULT_OUTPUT = PROJECT_ROOT / "data" / "ph_fda" / "leaflet_extraction"
SOURCE = "PH_FDA_VERIFICATION_PORTAL"

DESCRIPTION_HEADINGS = (
    "product description",
    "description",
    "pharmaceutical form",
    "product characteristics",
)
DESCRIPTION_STOPS = (
    "formulation",
    "composition",
    "qualitative and quantitative composition",
    "pharmacodynamics and pharmacokinetics",
    "pharmacological properties",
    "indications",
)
INDICATION_HEADINGS = (
    "indications",
    "indication",
    "therapeutic indications",
    "clinical indications",
    "uses",
)
INDICATION_STOPS = (
    "dosage and administration",
    "dose and method of administration",
    "posology and method of administration",
    "contraindications",
    "warnings and precautions",
    "special warnings and precautions for use",
)


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def normalize_space(value: str | None) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def safe_filename(value: str) -> str:
    readable = re.sub(r"[^A-Za-z0-9._-]+", "_", value).strip("_") or "document"
    digest = hashlib.sha256(value.encode("utf-8")).hexdigest()[:10]
    return f"{readable}_{digest}"


def google_drive_download_url(url: str) -> str:
    parsed = urlparse(url)
    if "drive.google.com" not in parsed.netloc:
        return url
    match = re.search(r"/file/d/([^/]+)", parsed.path)
    file_id = match.group(1) if match else parse_qs(parsed.query).get("id", [""])[0]
    if not file_id:
        return url
    return f"https://drive.google.com/uc?export=download&id={file_id}"


def find_binary(name: str) -> str | None:
    found = shutil.which(name)
    if found:
        return found
    bundled = (
        Path.home()
        / ".cache"
        / "codex-runtimes"
        / "codex-primary-runtime"
        / "dependencies"
        / "bin"
        / name
    )
    return str(bundled) if bundled.exists() else None


def download_pdf(
    session: requests.Session,
    source_url: str,
    destination: Path,
    retries: int,
    timeout: int,
    max_bytes: int,
) -> tuple[str, int]:
    destination.parent.mkdir(parents=True, exist_ok=True)
    url = google_drive_download_url(source_url)
    last_error: Exception | None = None
    for attempt in range(retries + 1):
        temporary = destination.with_suffix(".pdf.tmp")
        try:
            with session.get(url, timeout=timeout, stream=True, allow_redirects=True) as response:
                response.raise_for_status()
                size = 0
                digest = hashlib.sha256()
                with temporary.open("wb") as output:
                    for chunk in response.iter_content(chunk_size=1024 * 256):
                        if not chunk:
                            continue
                        size += len(chunk)
                        if size > max_bytes:
                            raise ValueError(f"PDF exceeds {max_bytes} bytes")
                        digest.update(chunk)
                        output.write(chunk)
            with temporary.open("rb") as downloaded:
                if downloaded.read(5) != b"%PDF-":
                    raise ValueError("Downloaded file is not a PDF")
            temporary.replace(destination)
            return digest.hexdigest(), size
        except Exception as error:  # network and source-file failures are logged alike
            last_error = error
            temporary.unlink(missing_ok=True)
            if attempt < retries:
                time.sleep(min(60, 2 ** (attempt + 1)))
    raise RuntimeError(str(last_error))


def digital_page_text(pdf_path: Path) -> list[str]:
    reader = PdfReader(str(pdf_path))
    if reader.is_encrypted:
        try:
            reader.decrypt("")
        except Exception as error:
            raise RuntimeError(f"encrypted_pdf: {error}") from error
    return [(page.extract_text() or "").strip() for page in reader.pages]


def ocr_page(pdf_path: Path, page_number: int, temporary_dir: Path, dpi: int) -> str:
    pdftoppm = find_binary("pdftoppm")
    tesseract = find_binary("tesseract")
    if not pdftoppm or not tesseract:
        raise RuntimeError("OCR requires pdftoppm and tesseract")
    prefix = temporary_dir / f"page_{page_number:04d}"
    subprocess.run(
        [
            pdftoppm,
            "-f",
            str(page_number),
            "-l",
            str(page_number),
            "-singlefile",
            "-png",
            "-r",
            str(dpi),
            str(pdf_path),
            str(prefix),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
        text=True,
    )
    image_path = prefix.with_suffix(".png")
    completed = subprocess.run(
        [
            tesseract,
            str(image_path),
            "stdout",
            "-l",
            "eng",
            "--psm",
            "11",
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    return completed.stdout.strip()


def extract_pages(pdf_path: Path, temporary_root: Path, dpi: int) -> tuple[list[str], str]:
    pages = digital_page_text(pdf_path)
    needs_ocr = [index for index, text in enumerate(pages) if len(normalize_space(text)) < 80]
    if not needs_ocr:
        return pages, "digital_text"
    with tempfile.TemporaryDirectory(prefix="leaflet_", dir=temporary_root) as temp:
        temporary_dir = Path(temp)
        for index in needs_ocr:
            pages[index] = ocr_page(pdf_path, index + 1, temporary_dir, dpi)
    method = "ocr" if len(needs_ocr) == len(pages) else "digital_text_and_ocr"
    return pages, method


def normalized_heading(line: str) -> str:
    text = normalize_space(line).lower()
    text = re.sub(r"^[\d.ivx]+[.)\s-]+", "", text)
    text = re.sub(r"[^a-z ]+", " ", text)
    return normalize_space(text)


def heading_score(line: str, aliases: Iterable[str]) -> float:
    candidate = normalized_heading(line)
    if not candidate or len(candidate) > 90:
        return 0.0
    best = 0.0
    for alias in aliases:
        if candidate == alias or candidate.startswith(f"{alias} "):
            return 1.0
        best = max(best, SequenceMatcher(None, candidate, alias).ratio())
    return best


def looks_like_new_heading(line: str, stop_aliases: Iterable[str]) -> bool:
    if heading_score(line, stop_aliases) >= 0.76:
        return True
    stripped = normalize_space(line)
    letters = [character for character in stripped if character.isalpha()]
    if not letters or len(stripped) > 100:
        return False
    uppercase_ratio = sum(character.isupper() for character in letters) / len(letters)
    return (stripped.endswith(":") or stripped.endswith(".")) and uppercase_ratio >= 0.8


@dataclass
class Section:
    text: str
    start_page: int | None
    end_page: int | None
    heading: str
    heading_score: float


def extract_section(
    pages: list[str],
    aliases: Iterable[str],
    stop_aliases: Iterable[str],
) -> Section:
    best: tuple[float, int, int, str] | None = None
    page_lines = [page.splitlines() for page in pages]
    for page_index, lines in enumerate(page_lines):
        for line_index, line in enumerate(lines):
            score = heading_score(line, aliases)
            if score >= 0.72 and (best is None or score > best[0]):
                best = (score, page_index, line_index, normalize_space(line))
    if best is None:
        return Section("", None, None, "", 0.0)

    score, start_page_index, start_line_index, heading = best
    collected: list[str] = []
    end_page_index = start_page_index
    for page_index in range(start_page_index, len(page_lines)):
        lines = page_lines[page_index]
        first_line = start_line_index + 1 if page_index == start_page_index else 0
        for line in lines[first_line:]:
            if looks_like_new_heading(line, stop_aliases):
                return Section(
                    normalize_space("\n".join(collected)),
                    start_page_index + 1,
                    end_page_index + 1,
                    heading,
                    score,
                )
            collected.append(line)
            end_page_index = page_index
        if collected:
            collected.append(f"\n[Page {page_index + 2}]\n")
    return Section(
        normalize_space("\n".join(collected)),
        start_page_index + 1,
        end_page_index + 1,
        heading,
        score,
    )


def determine_review_status(method: str, description: Section, indication: Section) -> tuple[str, str]:
    both_found = bool(description.text and indication.text)
    scores = [score for score in (description.heading_score, indication.heading_score) if score]
    minimum_score = min(scores, default=0.0)
    if method == "digital_text" and both_found and minimum_score >= 0.9:
        return "machine_extracted_review_recommended", "high"
    if both_found:
        return "needs_human_review", "medium" if minimum_score >= 0.8 else "low"
    if description.text or indication.text:
        return "needs_human_review_missing_section", "low"
    return "needs_human_review_no_sections_found", "low"


def atomic_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(f"{path.suffix}.tmp")
    temporary.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    temporary.replace(path)


def write_csv(path: Path, fieldnames: list[str], rows: list[dict[str, object]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(f"{path.suffix}.tmp")
    with temporary.open("w", encoding="utf-8", newline="") as output:
        writer = csv.DictWriter(output, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)
    temporary.replace(path)


def read_leaflet_rows(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        raise FileNotFoundError(f"Leaflet link CSV not found: {path}")
    with path.open(encoding="utf-8", newline="") as source:
        rows = list(csv.DictReader(source))
    required = {"registration_number", "file_url"}
    missing = required.difference(rows[0].keys() if rows else set())
    if missing:
        raise ValueError(f"Leaflet CSV missing columns: {', '.join(sorted(missing))}")
    return rows


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--max-documents", type=int, default=100)
    parser.add_argument("--all", action="store_true")
    parser.add_argument("--delay-seconds", type=float, default=1.0)
    parser.add_argument("--retries", type=int, default=3)
    parser.add_argument("--timeout-seconds", type=int, default=90)
    parser.add_argument("--max-pdf-mb", type=int, default=50)
    parser.add_argument("--ocr-dpi", type=int, default=300)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    limit = float("inf") if args.all else args.max_documents
    output_dir = args.output_dir.resolve()
    pdf_dir = output_dir / "pdf"
    text_dir = output_dir / "page_text"
    state_path = output_dir / "state" / "checkpoint.json"
    temporary_root = PROJECT_ROOT / "tmp" / "pdfs"
    temporary_root.mkdir(parents=True, exist_ok=True)

    state = (
        json.loads(state_path.read_text(encoding="utf-8"))
        if state_path.exists()
        else {"schema_version": 1, "created_at": utc_now(), "processed": {}, "failed": {}}
    )
    rows = read_leaflet_rows(args.input.resolve())
    session = requests.Session()
    session.headers["User-Agent"] = "ConfusableDrugsResearch/1.0 (PH FDA leaflet processing)"

    processed_this_run = 0
    try:
        for row in rows:
            if processed_this_run >= limit:
                break
            registration = normalize_space(row.get("registration_number"))
            file_url = normalize_space(row.get("file_url"))
            document_key = hashlib.sha256(f"{registration}|{file_url}".encode()).hexdigest()
            if document_key in state["processed"]:
                continue
            base_name = safe_filename(f"{registration}_{row.get('document_version', '')}_{file_url}")
            pdf_path = pdf_dir / f"{base_name}.pdf"
            try:
                print(f"[{processed_this_run + 1}] {registration}: downloading leaflet")
                pdf_hash, byte_size = download_pdf(
                    session,
                    file_url,
                    pdf_path,
                    retries=args.retries,
                    timeout=args.timeout_seconds,
                    max_bytes=args.max_pdf_mb * 1024 * 1024,
                )
                pages, method = extract_pages(pdf_path, temporary_root, args.ocr_dpi)
                description = extract_section(pages, DESCRIPTION_HEADINGS, DESCRIPTION_STOPS)
                indication = extract_section(pages, INDICATION_HEADINGS, INDICATION_STOPS)
                review_status, confidence = determine_review_status(method, description, indication)
                page_text_path = text_dir / f"{base_name}.json"
                page_payload = {
                    "source": SOURCE,
                    "registration_number": registration,
                    "file_url": file_url,
                    "pdf_sha256": pdf_hash,
                    "extraction_method": method,
                    "pages": [
                        {"page_number": index + 1, "text": text}
                        for index, text in enumerate(pages)
                    ],
                }
                atomic_json(page_text_path, page_payload)
                state["processed"][document_key] = {
                    "source": SOURCE,
                    "registration_number": registration,
                    "generic_name_raw": row.get("generic_name_raw", ""),
                    "brand_name_raw": row.get("brand_name_raw", ""),
                    "document_version": row.get("document_version", ""),
                    "document_category": row.get("document_category", ""),
                    "file_url": file_url,
                    "pdf_path": str(pdf_path.relative_to(output_dir)),
                    "page_text_path": str(page_text_path.relative_to(output_dir)),
                    "pdf_sha256": pdf_hash,
                    "pdf_bytes": byte_size,
                    "page_count": len(pages),
                    "extraction_method": method,
                    "description_extracted": description.text,
                    "description_start_page": description.start_page or "",
                    "description_end_page": description.end_page or "",
                    "description_heading": description.heading,
                    "indications_extracted": indication.text,
                    "indications_start_page": indication.start_page or "",
                    "indications_end_page": indication.end_page or "",
                    "indications_heading": indication.heading,
                    "extraction_confidence": confidence,
                    "review_status": review_status,
                    "processed_at": utc_now(),
                }
                state["failed"].pop(document_key, None)
                processed_this_run += 1
                print(
                    f"  {method}; description={'yes' if description.text else 'no'}; "
                    f"indications={'yes' if indication.text else 'no'}; {review_status}"
                )
            except Exception as error:
                state["failed"][document_key] = {
                    "registration_number": registration,
                    "file_url": file_url,
                    "error": str(error),
                    "failed_at": utc_now(),
                }
                print(f"  FAILED: {error}", file=sys.stderr)
            finally:
                state["updated_at"] = utc_now()
                atomic_json(state_path, state)
                if args.delay_seconds:
                    time.sleep(args.delay_seconds)
    finally:
        shutil.rmtree(temporary_root, ignore_errors=True)

    result_rows = sorted(
        state["processed"].values(),
        key=lambda item: (str(item["registration_number"]), str(item["file_url"])),
    )
    columns = [
        "source",
        "registration_number",
        "generic_name_raw",
        "brand_name_raw",
        "document_version",
        "document_category",
        "file_url",
        "pdf_path",
        "page_text_path",
        "pdf_sha256",
        "pdf_bytes",
        "page_count",
        "extraction_method",
        "description_extracted",
        "description_start_page",
        "description_end_page",
        "description_heading",
        "indications_extracted",
        "indications_start_page",
        "indications_end_page",
        "indications_heading",
        "extraction_confidence",
        "review_status",
        "processed_at",
    ]
    write_csv(output_dir / "ph_fda_leaflet_sections.csv", columns, result_rows)
    failures = sorted(state["failed"].values(), key=lambda item: str(item["registration_number"]))
    write_csv(
        output_dir / "failed_leaflets.csv",
        ["registration_number", "file_url", "error", "failed_at"],
        failures,
    )
    report = {
        "source": SOURCE,
        "generated_at": utc_now(),
        "input_leaflet_links": len(rows),
        "processed_documents": len(result_rows),
        "failed_documents": len(failures),
        "ocr_documents": sum(
            item["extraction_method"] != "digital_text" for item in result_rows
        ),
        "documents_with_description": sum(bool(item["description_extracted"]) for item in result_rows),
        "documents_with_indications": sum(bool(item["indications_extracted"]) for item in result_rows),
        "documents_requiring_review": sum(
            "review" in str(item["review_status"]) for item in result_rows
        ),
    }
    atomic_json(output_dir / "extraction_report.json", report)
    print(json.dumps(report, indent=2))
    return 2 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
