#!/usr/bin/env node
// Checks that every citation in this repository points at what it claims.
//
//   .tours/*.tour   — the file exists, the line exists, and the cited line
//                     MATCHES the step's `pattern`.
//   docs/START_HERE.md — every file a stage cites exists, and every `## Symbol`
//                     it names is a real heading in one of those files.
//
// The line-range check alone is not a check. It proves the anchor is stable and
// never that it is correct: reword a section in place, or insert a paragraph
// above it, and a step pointing at the wrong heading still passes. The pattern
// is what makes a wrong anchor fail.
//
//   node .tours/validate.mjs
//
// Exits 0 when every citation resolves, 1 otherwise, naming each bad one.
// ponytail: substring match, not a parse — a pattern that occurs twice in a
// file is not flagged as ambiguous. Pin steps to unique heading text.

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const toursDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(toursDir, "..");
const problems = [];

const readLines = (rel) =>
  readFileSync(join(repoRoot, rel), "utf8")
    .split("\n")
    .map((l) => l.replace(/\r$/, ""));

// --- guided tours ---------------------------------------------------------

const tours = readdirSync(toursDir).filter((f) => f.endsWith(".tour")).sort();
if (tours.length === 0) {
  console.error("FAIL: no .tour files found in .tours/");
  process.exit(1);
}

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
      lines = readLines(step.file);
    } catch {
      problems.push(`${where}: file not found — ${step.file}`);
      return;
    }

    if (!Number.isInteger(step.line) || step.line < 1) {
      problems.push(`${where}: line must be a positive integer, got ${step.line}`);
      return;
    }
    if (step.line > lines.length) {
      problems.push(
        `${where}: ${step.file} has ${lines.length} lines, step points at ${step.line}`,
      );
      return;
    }

    if (typeof step.pattern !== "string" || step.pattern.trim() === "") {
      problems.push(
        `${where}: no pattern — a line number alone cannot show the step points at the right thing`,
      );
      return;
    }

    let re;
    try {
      re = new RegExp(step.pattern);
    } catch (err) {
      problems.push(`${where}: pattern is not a valid regexp — ${err.message}`);
      return;
    }

    const cited = lines[step.line - 1];
    if (!re.test(cited)) {
      problems.push(
        `${where}: ${step.file}:${step.line} is ${JSON.stringify(cited)}, ` +
          `which does not match /${step.pattern}/`,
      );
    }
  });
}

// --- START_HERE stage citations -------------------------------------------
// Each stage cites files and headings, not line numbers, so the check is:
// every cited file exists and every cited heading is a real heading in one.

const startHere = "docs/START_HERE.md";
const backticked = (s) => [...s.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
let citationCount = 0;

const shLines = readLines(startHere);
shLines.forEach((line, i) => {
  const fileLine = /^\*\*File:\*\*(.*)$/.exec(line);
  if (!fileLine) return;
  const where = `${startHere} line ${i + 1}`;

  const files = backticked(fileLine[1]).filter((f) => f.endsWith(".md"));
  if (files.length === 0) {
    problems.push(`${where}: **File:** cites no \`*.md\` file`);
    return;
  }

  const bodies = [];
  for (const f of files) {
    citationCount++;
    try {
      bodies.push(readLines(f));
    } catch {
      problems.push(`${where}: file not found — ${f}`);
    }
  }

  const symbolLine = shLines[i + 1] ?? "";
  if (!/^\*\*Symbol:\*\*/.test(symbolLine)) {
    problems.push(`${where}: no **Symbol:** line under the **File:** line`);
    return;
  }
  const symbols = backticked(symbolLine).filter((s) => s.startsWith("#"));
  if (symbols.length === 0) {
    problems.push(`${where}: **Symbol:** names no heading`);
    return;
  }
  for (const symbol of symbols) {
    citationCount++;
    if (!bodies.some((b) => b.some((l) => l.trim() === symbol))) {
      problems.push(
        `${where}: none of ${files.join(", ")} has the heading "${symbol}"`,
      );
    }
  }
});

if (problems.length > 0) {
  console.error(`FAIL: ${problems.length} broken citation(s)\n`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

console.log(
  `OK: ${stepCount} tour steps across ${tours.length} tours match their patterns; ` +
    `${citationCount} START_HERE citations resolve.`,
);
