import assert from "node:assert/strict";
import test from "node:test";

import {
  buildReviewData,
  csvEscape,
  normalizeName,
  normalizeText,
} from "../scripts/ph_fda_scraper.mjs";

test("normalization is conservative and does not correct medicine names", () => {
  assert.equal(normalizeText("Amoxicillin \n (As Trihydrate)"), "Amoxicillin (As Trihydrate)");
  assert.equal(normalizeName("  Amoxicillin (As Trihydrate) "), "amoxicillin (as trihydrate)");
  assert.equal(normalizeName("Unbranded"), "");
  assert.equal(normalizeName("ketorolac promethazine"), "ketorolac promethazine");
});

test("CSV escaping preserves commas, quotes, and source newlines", () => {
  assert.equal(csvEscape("plain"), "plain");
  assert.equal(csvEscape('A, "B"'), '"A, ""B"""');
  assert.equal(csvEscape("line 1\nline 2"), '"line 1\nline 2"');
});

test("review data distinguishes duplicate products and brand conflicts", () => {
  const products = [
    {
      registration_number: "DR-1",
      generic_name: "Drug A",
      brand_name: "Shared",
      dosage_strength: "10 mg",
      dosage_form: "Tablet",
    },
    {
      registration_number: "DR-2",
      generic_name: "Drug A",
      brand_name: "Shared",
      dosage_strength: "10 mg",
      dosage_form: "Tablet",
    },
    {
      registration_number: "DR-3",
      generic_name: "Drug B",
      brand_name: "Shared",
      dosage_strength: "20 mg",
      dosage_form: "Capsule",
    },
  ];
  const review = buildReviewData(products);
  assert.equal(review.possibleDuplicates.length, 1);
  assert.equal(review.brandGenericConflicts.length, 1);
  assert.match(review.possibleDuplicates[0].registration_numbers, /DR-1/);
  assert.match(review.brandGenericConflicts[0].generic_names_normalized, /drug b/);
});

test("missing generic name is sent to review", () => {
  const review = buildReviewData([
    { registration_number: "DR-4", generic_name: "", brand_name: "Brand" },
  ]);
  assert.equal(review.incomplete.length, 1);
  assert.equal(review.incomplete[0].reason, "missing_generic_name");
});
