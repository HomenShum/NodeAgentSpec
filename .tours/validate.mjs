#!/usr/bin/env node
// Checks that every CodeTour step points at a file that exists and a line that
// exists in it. A tour with a broken reference is worse than no tour, because a
// reader trusts it.
//
//   node .tours/validate.mjs
//
// Exits 0 when every step resolves, 1 otherwise, naming each bad step.
// ponytail: checks position, not meaning — a section reworded in place keeps its
// line number and stays "valid". Pin steps to heading text if that starts biting.

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const toursDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(toursDir, "..");

const tours = readdirSync(toursDir).filter((f) => f.endsWith(".tour")).sort();
if (tours.length === 0) {
  console.error("FAIL: no .tour files found in .tours/");
  process.exit(1);
}

const problems = [];
let stepCount = 0;

for (const tourFile of tours) {
  let tour;
  try {
    tour = JSON.parse(readFileSync(join(toursDir, tourFile), "utf8"));
  } catch (err) {
    problems.push(`${tourFile}: not valid JSON — ${err.message}`);
    continue;
  }

  const steps = Array.isArray(tour.steps) ? tour.steps : [];
  if (steps.length === 0) problems.push(`${tourFile}: has no steps`);

  steps.forEach((step, i) => {
    stepCount++;
    const where = `${tourFile} step ${i + 1} ("${step.title ?? "untitled"}")`;

    if (!step.file) {
      problems.push(`${where}: no file`);
      return;
    }

    let lines;
    try {
      lines = readFileSync(join(repoRoot, step.file), "utf8").split("\n").length;
    } catch {
      problems.push(`${where}: file not found — ${step.file}`);
      return;
    }

    if (!Number.isInteger(step.line) || step.line < 1) {
      problems.push(`${where}: line must be a positive integer, got ${step.line}`);
    } else if (step.line > lines) {
      problems.push(`${where}: ${step.file} has ${lines} lines, step points at ${step.line}`);
    }
  });
}

if (problems.length > 0) {
  console.error(`FAIL: ${problems.length} broken reference(s) across ${tours.length} tour(s)\n`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

console.log(`OK: ${stepCount} steps across ${tours.length} tours resolve.`);
