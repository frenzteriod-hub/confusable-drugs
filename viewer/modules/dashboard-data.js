import { buildDailyCounts, buildDailyReviewActivity } from "./review-stats.js";
import { includedReviewSeconds, summarizeReviewDurations } from "./review-timing.js";
import { buildInterimReviewStats } from "./interim-review.js";

// Cap simultaneous reads. Page by ascending ID so new labels append after older rows.
async function readPages(query) {
  const size = 1000;
  const first = await query(true).range(0, size - 1);
  if (first.error) throw first.error;
  const rows = first.data.slice();
  for (let offset = size; offset < first.count; offset += size * 3) {
    const pages = [];
    for (let from = offset; from < Math.min(offset + size * 3, first.count); from += size) {
      pages.push(query(false).range(from, from + size - 1));
    }
    for (const page of await Promise.all(pages)) {
      if (page.error) throw page.error;
      rows.push(...page.data);
    }
  }
  return rows;
}

const missing = new WeakMap();
async function summaryRpc(db, name) {
  if (missing.get(db)?.has(name)) return null;
  const result = await db.rpc(name);
  if (!result.error) return result.data;
  if (result.error.code !== "PGRST202") throw result.error;
  if (!missing.has(db)) missing.set(db, new Set());
  missing.get(db).add(name);
  return null;
}

export async function loadOwnActivity(db, id) {
  const summary = await summaryRpc(db, "own_review_activity");
  if (summary) return summary;
  const [pairs, completed, rows] = await Promise.all([
    db.from("review_pairs").select("id", { head: true, count: "exact" }).eq("is_active", true),
    db.from("reviews").select("id,review_pairs!inner(is_active)", { head: true, count: "exact" })
      .eq("reviewer_id", id).eq("review_pairs.is_active", true),
    readPages(count => db.from("reviews").select("id,reviewed_at,review_duration_seconds", count ? { count: "exact" } : {})
      .eq("reviewer_id", id).order("id")),
  ]);
  if (pairs.error || completed.error) throw pairs.error || completed.error;
  return { pairCount: pairs.count, completed: completed.count,
    days: buildDailyReviewActivity(rows, undefined, includedReviewSeconds), ...summarizeReviewDurations(rows) };
}

export function createAdminReader(db, onProgress = () => {}) {
  let lastSnapshot, lastSignature, lastScope, since, lastScan = 0;
  let byId = new Map();
  return async function read() {
    const summary = await summaryRpc(db, "admin_review_snapshot");
    if (summary) return summary;
    const [pairs, profiles] = await Promise.all([
      db.from("review_pairs").select("id", { count: "exact", head: true }).eq("is_active", true),
      db.from("profiles").select("id,display_name").eq("role", "reviewer").eq("is_test_account", false).order("display_name").order("id"),
    ]);
    if (pairs.error || profiles.error) throw pairs.error || profiles.error;
    const experts = profiles.data;
    const ids = experts.map(p => p.id);
    const base = (columns, options) => db.from("reviews").select(columns + ",review_pairs!inner()", options)
      .in("reviewer_id", ids).eq("review_pairs.is_active", true);
    const latest = ids.length ? await base("id,updated_at", { count: "exact" }).order("updated_at", { ascending: false })
      .order("id", { ascending: false }).limit(1) : { count: 0, data: [] };
    if (latest.error) throw latest.error;
    onProgress({ pairCount: pairs.count, reviewerCount: experts.length, completed: latest.count });
    const scope = JSON.stringify([pairs.count, experts]);
    const signature = JSON.stringify([scope, latest.count, latest.data]);
    const reconcile = Date.now() - lastScan >= 300000 || scope !== lastScope;
    if (!reconcile && signature === lastSignature) return lastSnapshot;
    const columns = "id,pair_id,reviewer_id,label,reviewed_at,updated_at,review_duration_seconds";
    const load = after => readPages(count => {
      let q = base(columns, count ? { count: "exact" } : {});
      if (after) q = q.gte("updated_at", after);
      return q.order("id");
    });
    let full = reconcile || !since || latest.count < byId.size;
    let next = new Map();
    if (!full) {
      next = new Map(byId);
      for (const row of await load(since)) next.set(row.id, row);
      full = next.size !== latest.count;
    }
    if (full) {
      next = new Map((ids.length ? await load(null) : []).map(row => [row.id, row]));
      lastScan = Date.now();
    }
    // Use the server timestamp observed before reading pages, with overlap for
    // transactions that commit out of order. Periodically reconcile deletes and queue edits.
    const newest = latest.data[0]?.updated_at;
    since = newest ? new Date(Date.parse(newest) - 60000).toISOString() : null;
    byId = next;
    lastScope = scope;
    const rows = [...next.values()];
    const distribution = {};
    for (const row of rows) distribution[row.label] = (distribution[row.label] || 0) + 1;
    const reviewers = experts.map(expert => {
      const own = rows.filter(row => row.reviewer_id === expert.id);
      const timing = summarizeReviewDurations(own);
      const last = own.reduce((latestAt, row) => !latestAt || row.reviewed_at > latestAt ? row.reviewed_at : latestAt, null);
      return { ...expert, completed: own.length, days: buildDailyCounts(own), last,
        average: timing.averageSeconds, timed: timing.timedCount, excluded: timing.excludedCount };
    });
    lastSnapshot = { pairCount: pairs.count, completed: rows.length, reviewers, distribution,
      interim: buildInterimReviewStats({ reviews: rows, reviewerIds: ids, pairCount: pairs.count }) };
    lastSignature = rows.length === latest.count ? signature : null;
    return lastSnapshot;
  };
}
