import test from "node:test";
import assert from "node:assert/strict";
import { createAdminReader, loadOwnActivity } from "../viewer/modules/dashboard-data.js";

// Model PostgREST's page cap and a missing optional summary function.
function portalDb(reviews) {
  const calls = [];
  const experts = [{ id: "a", display_name: "A" }, { id: "b", display_name: "B" }];
  const tables = { profiles: experts, review_pairs: [{ id: 1, is_active: true }], reviews };
  return {
    calls,
    rpc: async () => ({ error: { code: "PGRST202" } }),
    from(table) {
      let rows = [...tables[table]], options = {}, range, columns;
      const orders = [];
      const query = {
        select(c, o = {}) { columns = c; options = o; return this; },
        eq(key, value) {
          if (key === "review_pairs.is_active") rows = rows.filter(row => row.active);
          else if (!["role", "is_test_account"].includes(key)) rows = rows.filter(row => row[key] === value);
          return this;
        },
        in(key, ids) { rows = rows.filter(row => ids.includes(row[key])); return this; },
        gte(key, since) { rows = rows.filter(row => row[key] >= since); return this; },
        order(key, { ascending = true } = {}) { orders.push([key, ascending]); return this; },
        limit(n) { range = [0, n - 1]; return this; },
        range(a, b) { range = [a, b]; return this; },
        then(resolve, reject) {
          for (const [key, asc] of orders.reverse()) {
            rows.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) * (asc ? 1 : -1));
          }
          const [a, b] = range || [0, 999];
          calls.push({ table, columns, selected: rows.length, range: [a, b] });
          return Promise.resolve({ count: options.count ? rows.length : null,
            data: options.head ? null : rows.slice(a, b + 1), error: null }).then(resolve, reject);
        },
      };
      return query;
    },
  };
}

function review(id, overrides = {}) {
  return { id, pair_id: Math.ceil(id / 2), reviewer_id: id % 2 ? "a" : "b", active: true,
    label: "potential_lasa", reviewed_at: "2026-11-01T16:00:00Z",
    updated_at: "2026-11-01T16:00:00Z", review_duration_seconds: 8, ...overrides };
}

test("admin totals cover all pages, detect edits, reconcile deletes and exclude nonexpert labels", async () => {
  const rows = Array.from({ length: 2010 }, (_, i) => review(i + 1));
  rows.push(review(2011, { reviewer_id: "test-user" }), review(2012, { active: false }));
  const db = portalDb(rows);
  const read = createAdminReader(db);
  const initial = await read();
  assert.equal(initial.completed, 2010);
  assert.equal(initial.interim.fullyReviewed, 1005);
  assert.equal(initial.interim.unanimousPairs, 1005);
  assert.equal(initial.reviewers[0].days["2026-11-02"], 1005);
  db.calls.length = 0;
  assert.equal(await read(), initial);
  assert.equal(db.calls.filter(q => q.columns.includes("review_duration_seconds")).length, 0);
  rows[0].label = "false_positive";
  rows[0].updated_at = "2026-11-26T00:00:00Z";
  const edited = await read();
  assert.equal(edited.completed, 2010);
  assert.equal(edited.interim.unresolvedMajority, 1);
  rows.push(review(2013, { updated_at: "2026-11-26T00:05:00Z" }));
  db.calls.length = 0;
  assert.equal((await read()).completed, 2011);
  assert.equal(db.calls.filter(q => q.columns.includes("review_duration_seconds")).length, 1);
  rows.shift();
  assert.equal((await read()).completed, 2010);
});

test("reviewer activity keeps historical labels and excludes long timings from the average", async () => {
  const db = portalDb([review(1), review(2), review(3, { active: false, review_duration_seconds: 3600 })]);
  const own = await loadOwnActivity(db, "a");
  assert.equal(own.completed, 1);
  assert.equal(own.days["2026-11-02"].count, 2);
  assert.equal(own.averageSeconds, 8);
  assert.equal(own.excludedCount, 1);
});

test("an authorization error never triggers a fallback data read", async () => {
  const error = { code: "42501", message: "Administrator access required" };
  await assert.rejects(createAdminReader({ rpc: async () => ({ error }) }), e => e === error);
});
