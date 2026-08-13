# Simplification report

Human-readiness wave, 2026-08-13, against commit `6f2fac9` on `main`.

## Read this row first

This repository is 31 markdown files and, before this wave, zero lines of code.
**Most code-reduction tooling has nothing to measure here, and that is recorded
per row rather than left blank.** The duplication that actually mattered was
conceptual — one idea written down in several places, in different words, drifting
apart — which a token-based clone detector cannot see. So the table below carries
two kinds of row: the standard tools, mostly reporting "not applicable" with the
reason, and three greps that return output only when a single-source rule is
broken.

## Measurements

| Measure | Before | After | Change | Evidence command |
|---|---:|---:|---:|---|
| Pack files (what a reader copies) | 27 | 27 | 0 | `git ls-files \| grep -vE '^(promotion\|docs)/\|^\.tours/' \| wc -l` |
| Pack source lines | 2630 | 2631 | +1 | same list piped to `xargs wc -l \| tail -1` |
| Repository files | 31 | 44 | +13 | `git ls-files \| wc -l` |
| Repository lines | 3021 | 4377 | +1356 | `git ls-files \| xargs wc -l \| tail -1` |
| Direct dependencies | 0 | 0 | 0 | no manifest exists; `.tours/validate.mjs` imports only `node:fs`, `node:path`, `node:url` |
| **Types defined more than once** | **1** (`WorkerRun`) | **0** | **−1** | `grep -rh "^type [A-Z]" --include=*.md . \| sed 's/type \([A-Za-z]*\).*/\1/' \| sort \| uniq -d` |
| **Trace-event lists outside `trace-schema.md`** | **1** (`delegation.md`) | **0** | **−1** | ``grep -rln '^- `[a-z]*_[a-z_]*`$' --include=*.md . \| grep -v trace-schema`` |
| **Surviving aliases for the stale-commit failure** | **4** | **0** | **−4** | `grep -rn 'stale workers that still commit\|old worker commits after retarget\|workers keep running after cancellation\|Stale authority' --include=*.md .` |
| Acceptance checklists for one bar | 3 | 2 | −1 | `README.md` "The Contract", `soul.md` "Full V3 Standard", `readiness.md`; the middle one now links out |
| Duplicate blocks (jscpd) | 4 | 2 | −2 | `npx jscpd . --format markdown,typescript --min-lines 3 --min-tokens 15 --ignore "**/docs/**"` |
| Duplicate percentage (jscpd) | 0.49% | 0.31% | −0.18pp | same command |
| Duplicate blocks at jscpd defaults | 0 | 0 | 0 | `npx jscpd . --format markdown` — finds nothing at either end; see "What the tools could not see" |
| Circular dependencies | 0 | 0 | 0 | `npx dependency-cruiser --validate --no-config .` — 0 modules before, 4 modules / 3 dependencies after |
| Unused files (knip) | n/a | n/a | — | not applicable — `npx knip` exits with "Unable to find package.json"; there is no manifest and no module graph |
| Unused exports (knip) | n/a | n/a | — | not applicable — same reason |
| Broken relative links | 0 of 38 | 0 of 61 | +23 links | loop in [codebase/TESTING.md](codebase/TESTING.md#the-checks-that-are-commands-not-scripts) |
| Repository test command | none | `node .tours/validate.mjs` | +1 | `node .tours/validate.mjs` → `OK: 28 steps across 3 tours resolve` |
| Browser workflow passes | n/a | n/a | — | not applicable — no application; the promotion loop drives the GitHub-rendered page and did not re-run this wave |
| Production bundle size | n/a | n/a | — | not applicable — no build, no bundler, no analyzer |
| Additions / deletions | — | — | +114 / −60 | `git diff HEAD --shortstat -- '*.md' ':!docs' ':!.tours'` (existing files only; the new packet is additive) |

### The row that matters most

**Pack source lines went 2630 → 2631.** The reduction removed four duplicated
concepts and added the cross-references that replace them, so the line count is
flat. This is the gate's point restated as a measurement: the target is concepts
removed, not lines. A reader of the pack now meets one definition of `WorkerRun`
instead of two, one trace vocabulary instead of two, one failure catalogue instead
of five, and one acceptance checklist instead of three — for one extra line.

## What was deleted

| Deleted | From | Why it was wrong, not just repeated |
|---|---|---|
| Second `type WorkerRun` (12 lines) | `harness.md` | The copy omitted `startedAt` and `completedAt`. `workers.md` declares `startedAt` **required** for a running worker and `completedAt` required for a completed one. Anyone implementing from `harness.md` built a type the rest of the pack rejects. |
| 9-item trace-event list | `delegation.md` | Two of the nine — `goal_decomposed`, `artifact_merged` — did not exist in `trace-schema.md`, the file that declares itself the standard vocabulary. Following `delegation.md` emitted off-vocabulary events. |
| 10-question "Full V3 Standard" list | `soul.md` | The third statement of one acceptance bar, and it had drifted: `README.md` asks "What policy gates were applied?" where this asked "What permissions were required?". `readiness.md` covers both in more detail. |
| 15 restated failure bullets | `world.md` (4), `loop.md` (3), `interrupts.md` (4), `context.md` (2), plus 2 folded into pointer sentences | Six failures were carrying two to four names each. "Stale Commit" appeared as *stale workers that still commit*, *old worker commits after retarget*, *workers keep running after cancellation*, and *Stale authority*. A reader could reasonably conclude these were four separate bugs. |
| `artifacts: Artifact[]` from `World` | `world.md` | `README.md`'s room already owned `artifacts`, so the two definitions disagreed about where artifacts are stored. Every other document treats artifacts as room-level. |
| Inline `world: { beliefs: Belief[] }` | `README.md` | Contradicted `world.md`'s eight-field `World`. Now `world: World`, with each field's owning document named underneath. |

## Custom implementations replaced by an existing capability

Two, and both are replacements of hand-written text by something already present:

- **Five failure lists → one catalogue plus links.** `failure-modes.md` already
  existed and already held the canonical entries with their fixes. Four documents
  were re-describing its contents in their own words; they now keep only what is
  unique to their subject and link to the catalogue. Nothing new was written to
  make this possible.
- **`delegation.md`'s event list → `trace-schema.md`.** The vocabulary file already
  existed. The two genuinely-missing events were added to it — the only place events
  are now defined — and `delegation.md` names which ones it emits and links across.

For the one script added, the reuse ladder stopped at the standard library:
`.tours/validate.mjs` uses `node:fs`, `node:path` and `node:url` and nothing else.
No test framework, no JSON-schema validator, no CodeTour dependency. It stays at
zero installed dependencies, which is the property that lets a reader run it on a
fresh clone with no setup.

## Was adding a script the right call?

`promotion/PROMOTION_LOG.md` records a deliberate refusal to add tooling here:
condition 4 of the promotion scorecard was downgraded to UNVERIFIED rather than
rescued by "writing a throwaway script after the fact", on the grounds that
"committing a browser-measurement harness into a markdown pack would be new
product scope". That reasoning applies to this wave too and was checked against it.

`.tours/validate.mjs` is judged different on three points, and the reader should
weigh them rather than take the conclusion:

1. It is required by the wave's own gate — tours whose line references are not
   validated are worse than no tours.
2. It is a producer the repository keeps and re-runs, not a one-shot conjured to
   make a cell green. That was the exact distinction the earlier correction drew.
3. It validates *this repository's* documentation, not the reader's system, so it
   does not change what the pack is when copied. A reader who copies the 27 pack
   files does not take it with them.

The earlier correction anticipated this: "UNVERIFIED with the reason stated is the
honest end state until a wave that legitimately adds tooling here." The cost is
real and is recorded as C5 in [codebase/CONCERNS.md](codebase/CONCERNS.md) — the
repository is no longer "zero lines of code", so that phrase in
`promotion/PRODUCT_GOAL.md` is now true only of commit `5f17b04`, which is what it
says it describes.

## What the tools could not see

Run at its default thresholds, `npx jscpd . --format markdown` reports **zero
clones both before and after**, including on the duplicate `WorkerRun` that this
wave deleted as its headline finding. Lowering to `--min-lines 3 --min-tokens 15`
surfaces it as a 5-line typescript clone.

This is worth stating plainly because it is the trap of measuring a prose
repository with code tooling: the four duplications fixed here were *paraphrases*,
and a token-based detector sees paraphrase as original text. A clean jscpd report
on a documentation repository is close to meaningless. The three grep rows above
exist because they detect the thing that was actually wrong.

## Findings left unresolved

Full detail, with the reason for each, is in
[codebase/CONCERNS.md](codebase/CONCERNS.md). In brief:

| # | Finding | Why left |
|---|---|---|
| C1 | Adoption has no success signal; D1 downgraded to Minor, not closed | fix is a prose linter or an adoption checklist — both new product scope |
| C2 | `ConversationState` and `Task` named in the room shape, never defined | defining them is writing new specification, i.e. feature work |
| C3 | `goals.md` and `interrupts.md` name one classification twice | unifying means renaming public sections on a judgement call; the two axes are defensibly different |
| C4 | `retried` and `stale` listed as worker statuses in prose; neither is in the enum | changing it touches README regions a verified journey (J1) depends on |
| C5 | Promotion scorecard predates this wave and must be re-measured, not inherited | `PROMOTION_LOG.md` is append-only by its own rule |
| C6 | Nothing enforces the single-source rule automatically | two greps run by hand; automate on the third recurrence |
| C7 | The tour validator checks position, not meaning | pinning steps to heading text is a better design than three tours justify |

## Two jscpd clones remain, both intentional

- **The `## Rule` footer.** All twenty documents end with a `## Rule` heading and
  one memorable sentence. jscpd matches the shape. This is the pack's strongest
  convention, documented in [codebase/CONVENTIONS.md](codebase/CONVENTIONS.md).
- **`templates/eval-template.md` Expected State / Observed State.** The same five
  fields appear twice on purpose: you write what you expected, run the thing, then
  write what you observed. Collapsing the repetition would destroy the point of the
  template, which is to make the two answers separately visible.

Neither was reworded to satisfy the detector. Rewording text so a tool stops
reporting it, without changing what the text means, is gaming the measurement.

## Reproducing this report

Every row's command runs on a fresh clone with Node 18+ and network access for
`npx`. Before-values come from `git show 6f2fac9:<file>`; after-values from the
working tree.
