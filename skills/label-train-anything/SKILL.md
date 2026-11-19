---
name: label-train-anything
description: Build a shape-first, evidence-gated research workflow for learning or ranking events from time series, images, text, audio, or video. Use when an agent must turn a goal into measurable states, produce an immediate baseline, and iteratively test improvements without grading its own guesses.
---

# Label, Train, and Evaluate Anything

Build one small, reviewable workflow before choosing a model. Read [domain examples](references/domains.md) for video and paper-market measurements, and [the workbench contract](references/workbench.md) for adapter inputs, permissions and end-to-end verification.

1. **Write the receipt first.** Decide the unit, outcome, evidence that can disprove it, incumbent, budget, and stop rule. Inventory the repo for existing tools, schemas, accepted results, and UI; reuse before adding dependencies. Record what is verified, synthetic, or unavailable.
2. **Draw the shape.** For a temporal event use before → event → after. For a static item use context → region/span → measured property/outcome; do not fabricate time. Define variables, units, sampling grid, coverage, timestamps, lineage and hard negatives. Mark each as observation, proxy, preference, candidate label, or outcome. Unknown is not zero. Record both event time and when evidence became available.
3. **Make the dependencies explicit.** Ingest/split → independent extractors in parallel where resources permit → join on immutable source ID, alignment and sampling version → candidate → score/decision → delayed outcome/evaluation. On one accelerator schedule conflicting jobs sequentially. Never join incompatible grids without an explicit resampling policy; keep after-event values in the label branch when a decision precedes them.
4. **Prove a cheap path first.** One representative item plus one hard negative, a transparent baseline, and a deterministic test. Return a traceable output even if a model lane is unavailable. Add retrieval for examples, a CPU ranker only when it improves the target on a paired evaluation, and GPU training only for a demonstrated bottleneck. Charts are display surfaces; measured values come from the source data.
5. **Run the research loop.** The coding agent drafts bounded hypotheses from error slices, tries the cheapest falsifier, records every trial, and continues on independent failures. Use development folds for iteration; use an untouched evaluation set for promotion, refreshed only by a registered policy. Keep machine-proposed labels separate and check against independent adjudication. Promote only if preregistered metric and constraint gates pass together; otherwise keep incumbent. Stop at the budget, plateau, weak/changing evidence or an authorization boundary; do not run continuously without a reason.
6. **Report and resume.** Save data/split and configuration fingerprints, observation cutoff, metrics with uncertainty, counterexamples, exact cost, result state, next action/owner and verification command. Mark an unavailable test `BLOCKED` or `NOT_RUN`, not failed. Keep chat, task receipts and adapters reusable while isolating domain data, evaluators and tool permissions.

Minimum output: `goal → shape and measurements → dependency graph → cheap baseline receipt → one falsifiable next experiment → stop/promotion rules`. Prefer a work sample over broad capability claims.
