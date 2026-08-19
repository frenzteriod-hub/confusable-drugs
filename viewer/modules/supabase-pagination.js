export async function collectSupabasePages(fetchPage, { pageSize = 1_000, maxPages = 100 } = {}) {
  if (typeof fetchPage !== "function") throw new TypeError("fetchPage must be a function.");
  if (!Number.isInteger(pageSize) || pageSize < 1) throw new RangeError("pageSize must be a positive integer.");
  if (!Number.isInteger(maxPages) || maxPages < 1) throw new RangeError("maxPages must be a positive integer.");

  const rows = [];
  let lastResult = { data: [], error: null };
  for (let page = 0; page < maxPages; page += 1) {
    const from = page * pageSize;
    const to = from + pageSize - 1;
    const result = await fetchPage(from, to);
    if (!result || result.error) {
      return result || { data: null, error: new Error("The paginated query returned no result.") };
    }
    lastResult = result;
    const pageRows = Array.isArray(result.data) ? result.data : [];
    rows.push(...pageRows);
    if (pageRows.length < pageSize) return { ...lastResult, data: rows, error: null };
  }
  return {
    ...lastResult,
    data: null,
    error: new Error(`The query exceeded the safety limit of ${(pageSize * maxPages).toLocaleString("en-PH")} rows.`),
  };
}
