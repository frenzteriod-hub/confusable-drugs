import test from "node:test";
import assert from "node:assert/strict";

import {
  pronunciationPaths,
  scoreNames,
} from "../viewer/cebuano-core.js";

test("initial i receives an ay reading path", () => {
  assert.ok(pronunciationPaths("Ibuprofen").some(path => path.startsWith("ay")));
});

test("localized Bioflu reading scores above an unrelated medicine", () => {
  const intended = scoreNames("bayoplu", "Bioflu");
  const unrelated = scoreNames("bayoplu", "Metformin");
  assert.ok(intended.overall > 0.83);
  assert.ok(intended.overall > unrelated.overall);
});

test("written misreading of Ibuprofen remains a strong match", () => {
  assert.ok(scoreNames("aybyupropin", "Ibuprofen").overall > 0.80);
});

test("a missing internal chunk is tolerated but not treated as exact", () => {
  const score = scoreNames("amoxcillin", "Amoxicillin");
  assert.ok(score.overall > 0.85);
  assert.ok(score.overall < 1);
});
