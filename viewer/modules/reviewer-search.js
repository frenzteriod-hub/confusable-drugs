import { jaroWinkler, trigrams } from "./similarity.js?v=20260809-8";
import { normalizeName } from "./name-normalization.js?v=20260809-8";

const MIN_QUERY_LENGTH = 4;
const MAX_SHORTLIST = 700;
const AUTO_MATCH_MINIMUM = 0.93;
const AUTO_MATCH_MARGIN = 0.025;

function compact(value) {
  return normalizeName(value);
}

function recordFromRow(row, index) {
  const name = String(row?.[0] || "").trim();
  const normalized = compact(row?.[1] || name);
  const paths = [...new Set((Array.isArray(row?.[2]) ? row[2] : [])
    .map(compact)
    .filter(Boolean))];
  return { index, name, normalized, paths };
}

export function createReviewerSearchIndex(rows = []) {
  const names = rows.map(recordFromRow).filter(record => record.name && record.normalized);
  const exact = new Map();
  const grams = new Map();

  names.forEach(record => {
    if (!exact.has(record.normalized)) exact.set(record.normalized, []);
    exact.get(record.normalized).push(record.index);
    for (const gram of new Set([
      ...trigrams(record.normalized),
      ...record.paths.flatMap(trigrams),
    ])) {
      if (!grams.has(gram)) grams.set(gram, []);
      grams.get(gram).push(record.index);
    }
  });

  return { names, exact, grams };
}

function shortlist(index, queries) {
  const overlap = new Map();
  for (const query of queries) {
    for (const exactIndex of index.exact.get(query) || []) overlap.set(exactIndex, 10_000);
    for (const gram of new Set(trigrams(query))) {
      for (const nameIndex of index.grams.get(gram) || []) {
        overlap.set(nameIndex, (overlap.get(nameIndex) || 0) + 1);
      }
    }
  }
  let indexes = [...overlap.entries()]
    .sort((first, second) => second[1] - first[1])
    .slice(0, MAX_SHORTLIST)
    .map(([nameIndex]) => nameIndex);
  if (indexes.length < 80) {
    const longest = Math.max(...queries.map(query => query.length));
    indexes = index.names
      .filter(record => Math.abs(record.normalized.length - longest) <= Math.max(7, Math.floor(longest * 0.65)))
      .map(record => record.index);
  }
  return [...new Set(indexes)];
}

export function rankReviewerMedicineNames(index, transcripts, limit = 4) {
  const queries = [...new Set((Array.isArray(transcripts) ? transcripts : [transcripts])
    .map(compact)
    .filter(query => query.length >= MIN_QUERY_LENGTH))];
  if (!queries.length) return [];

  const seen = new Set();
  return shortlist(index, queries)
    .map(nameIndex => {
      const record = index.names[nameIndex];
      let score = 0;
      let matchedTranscript = queries[0];
      for (const query of queries) {
        const candidateScore = Math.max(
          jaroWinkler(query, record.normalized),
          ...record.paths.map(path => jaroWinkler(query, path)),
        );
        if (candidateScore > score) {
          score = candidateScore;
          matchedTranscript = query;
        }
      }
      return { name: record.name, normalized: record.normalized, score, matchedTranscript };
    })
    .filter(match => match.score >= 0.72)
    .sort((first, second) => second.score - first.score || first.name.localeCompare(second.name))
    .filter(match => {
      if (seen.has(match.normalized)) return false;
      seen.add(match.normalized);
      return true;
    })
    .slice(0, limit);
}

export function automaticReviewerSearchMatch(transcripts, matches) {
  if (!matches.length) return null;
  const normalizedTranscripts = new Set((Array.isArray(transcripts) ? transcripts : [transcripts]).map(compact));
  const exact = matches.find(match => normalizedTranscripts.has(match.normalized));
  if (exact) return exact;
  const [first, second] = matches;
  if (first.score < AUTO_MATCH_MINIMUM) return null;
  if (second && first.score - second.score < AUTO_MATCH_MARGIN) return null;
  return first;
}
