# Promotion log — NodeAgentSpec

Loop state lives here, in git, so any agent can resume cold. One entry per
iteration. Append; never rewrite history, because the list of things that turned
out to be wrong is more useful to the next reader than the current values alone.

Iteration cap: **10** (default). On reaching the cap without a gate pass, stop
and leave the remaining defect ledger below — a documented stop is a valid
outcome; a silent one is not.

## Entry shape

```
### Iteration N — YYYY-MM-DD
- Journey exercised: J<k> <name>
- Observed: <the defect, with its reproduction — inputs, width, state>
- Fixed: <the change, using existing components; file paths>
- Re-proved: <evidence path showing the defect gone in the rendered app>
- Tests: <command and result>
- Conditions newly PASS: <numbers, or "none">
```

---

## Baseline — 2026-08-13

**This repo is marked DEFERRED pending marketplace consolidation with
BetterPRHandoff. This baseline is provisional.** It is a truthful reading of
commit `5f17b04` as it stands today, but the repo's scope may change or merge
before any promotion loop runs against it, and these numbers should be re-measured
rather than inherited if that happens.

- **App started:** no — there is no app to start, and this is a property of the
  product rather than a blocker. The repo is 27 markdown files and 2,630 lines
  with zero code: no package manifest, no lockfile, no test runner, no build
  step, no server, no demo page. Commands attempted, all from a fresh
  `git clone --depth 50`:

  | Command | Exit | Result |
  |---|---|---|
  | `git clone --depth 50 …/NodeAgentSpec.git` | 0 | 27 files, HEAD `5f17b04` on `main` |
  | `npm ci` | 1 | `EUSAGE` — no `package-lock.json` |
  | `npm test` | 127 | `ENOENT` — no `package.json` |
  | `npm run build` | 127 | `ENOENT` — no `package.json` |
  | `pytest -q` | 5 | no tests collected |
  | `ls templates` | 0 | 4 template files present |

- **Surface actually driven:** the GitHub-rendered view of this repo, at
  1280×900 and 375×812, using the in-app browser. This is the only surface a
  stranger meets.

- **Journeys drivable: 2 of 5.** J1 (evaluate from the README) and J2 (follow the
  File Map into a document) were driven end-to-end and observed in the rendered
  page. J3, J4 and J5 are offline authoring workflows whose outcome lands in the
  reader's own repo; they have no completion state this repo can display, and J3
  additionally hits defect D1 at its final step.

- **Link integrity:** 0 broken relative links across all 27 files. All 20 File
  Map targets exist on disk; a live fetch of the 20 rendered hrefs returned 13×
  200 and 7× 429, where the 429s were caused by my own rapid-fire request loop
  and are not a repo defect.

- **Scorecard at baseline:** see [PRODUCT_GOAL.md](PRODUCT_GOAL.md) — published as
  1/12 PASS, 1 FAIL, 10 UNVERIFIED; corrected the same day to **0/12 PASS, 1 FAIL,
  11 UNVERIFIED** (see "Correction — 2026-08-13" below).

### Not a defect — recorded so the next reader does not re-raise it

On the first load of `README.md`, the "The Stack" mermaid diagram failed to
render: its `.render-container` carried `is-render-failed`, the
`viewscreen.githubusercontent.com/markdown/mermaid` iframe had height 0, and the
raw ` flowchart TB ` source was visible as a 268px-tall code block. This looked
like a real defect. It was checked against a control before being written up:
`github.com/mermaid-js/mermaid` loaded in the same browser pane rendered 9 of its
10 diagrams and failed 1 the same way. On reload, NodeAgentSpec's diagram
rendered correctly twice in a row (`is-render-ready`, iframe 450px at 375px wide
and 180px at 1280px wide, raw source hidden). **Conclusion: a transient GitHub
viewscreen failure that affects mermaid rendering generally, not this repo's
markdown.** Had the control not been run, this baseline would have shipped a
false defect.

## Correction — 2026-08-13

The baseline above was published claiming **1/12 PASS**. An adversarial re-run
against GitHub could confirm **0** of that 1. The scorecard now reads **0/12
PASS**. Nothing about the measurement was fabricated; the evidence backing it was
not admissible.

- **Downgraded: condition 4** (no horizontal overflow at supported widths),
  **PASS → UNVERIFIED**. Reason: *measured 0 overflow at 375×812 and 1280px,
  probe not retained.*
- **Why it does not qualify.** The GATE was amended today with "Where evidence
  lives, and what counts as an artifact": a row is PASS only when **both** halves
  hold — the output is committed at a path the row names, **and** the producer
  (script, test, or npm target) is committed and re-runnable by someone who just
  cloned the repo. Condition 4's evidence was neither. It was a set of DOM numbers
  read out of a live browser pane and typed into the table as prose. `git ls-files`
  returns 31 markdown files and nothing else: no screenshot, no receipt, no
  `promotion/evidence/` directory, no capture script. A reader cannot re-measure
  it, which is the whole point of an evidence path.
- **What was not done, deliberately.** No new probe was written to rescue the row.
  Writing a throwaway script after the fact, running it once, and pointing the row
  at its output would satisfy the letter of the rule while defeating it — the
  producer has to be something the repo keeps, not something conjured to make a
  cell green. This repo is documentation-only and owns no test runner; committing
  a browser-measurement harness into a markdown pack would be new product scope,
  which a scorecard-truth correction is not allowed to introduce. UNVERIFIED with
  the reason stated is the honest end state until a wave that legitimately adds
  tooling here.
- **Independently corroborated.** The judge could not re-measure condition 4
  either — the browser tab cap was reached, the same contention recorded as
  blocker #3 in this baseline. That is a second reason the row cannot stand on a
  live-pane reading: the surface is not reliably available to the next auditor.
- **Not changed.** Conditions 1–3 and 5–12 keep their existing statuses and
  reasons; all were already UNVERIFIED or FAIL and none rested on an unretained
  artifact claim. Condition 9 stays UNVERIFIED rather than becoming FAIL: the only
  failed requests observed were 7× HTTP 429 from my own rapid link-check loop,
  which is explained and is not a defect of this repo. The five journeys in
  PRODUCT_JOURNEYS.md are unchanged — they were confirmed at line-level precision,
  including the mermaid control run that stopped a transient GitHub viewscreen
  failure from being written up as a defect of this repo.
- **One fact corrected in the ledger below.** D1 described `readiness.md` as "a
  37-line human checklist". The file is 65 lines containing 37 checklist bullets
  across seven `Readiness` sections. An agent resuming cold would clone, count 65,
  and distrust the whole ledger over a number that was merely imprecise.

## Defect ledger

Open defects, most-impactful first. A defect is only listed once it has a
reproduction; a hunch is not a defect.

| # | Severity | Journey | Reproduction | Status |
|---|----------|---------|--------------|--------|
| D1 | Minor (was Major) | J3, J5 | The last step of the repo's own quickstart cannot be performed. `README.md:91` step 7 reads "Run the tests from `evals.md` and `readiness.md`". Neither file contains a runnable test: `evals.md` is 131 lines of category prose naming what to test ("off-by-one", "stale done") with no command, and `readiness.md` is a 65-line human checklist of 37 bullets across seven
`Readiness` sections, none of them a command. Repro: clone the repo, open `README.md`, follow "How To Use" steps 1–7; at step 7 there is nothing to execute — `npm test` exits 127 (no `package.json`), `pytest -q` exits 5 (no tests collected). A first-time adopter finishes the quickstart unable to tell whether they did it right, which is the exact outcome `CONTRIBUTING.md:26` requires changes to avoid ("The change has an observable verification path"). | PARTIALLY FIXED 2026-08-13 (human-readiness wave). The false instruction is gone: `README.md` step 7 now says the capability tests in `evals.md` and the checklist in `readiness.md` run against *the reader's* system, and that this pack ships no test runner. **Not closed** — a reader still has no signal that their adoption was done correctly. Downgraded Major -> Minor; remainder tracked as C1 in `docs/codebase/CONCERNS.md`. **Downgrade confirmed in the rendered page 2026-08-13 (audit wave):** the served README HTML contains "ships no test runner", so the impossible step-7 instruction is gone for a real reader, not just in the working tree — `promotion/evidence/rendered-defect-check.json`. |
| D2 | Minor | J1 | Stale product name survives the rename. `CONTRIBUTING.md:3` opens "Agent OS Markdown is intentionally plain markdown", while the repo, README title and description all say NodeAgentSpec (renamed in commit `5f17b04`, "Align public naming after repo rename"). Repro: open `https://github.com/HomenShum/NodeAgentSpec/blob/main/CONTRIBUTING.md` at any width; first body line names a different product. A stranger checking whether the project is maintained reads this as an abandoned rename. | FIXED 2026-08-13 (human-readiness wave). `CONTRIBUTING.md:3` now reads "NodeAgentSpec is intentionally plain markdown." **Confirmed in the rendered page 2026-08-13 (audit wave):** the served HTML for that file contains the new string and does not contain "Agent OS Markdown is intentionally" — `promotion/evidence/rendered-defect-check.json`. |

## Iterations

### Audit wave — 2026-08-13 (commit `b1c1749`)

The first wave with working audit tooling. Lighthouse 13.4.1 and @axe-core/cli
4.13.0 both install and run on the measuring machine, which is what the baseline
lacked, so conditions 7 and 8 could finally be attempted instead of deferred.

- **Journey exercised:** J1's surface, twice, headless — once under axe, once
  under Lighthouse — plus a direct re-read of the served HTML for J1 and J2's
  two documents. No width sweep; this wave added no viewport probe, so condition
  4 is untouched.

- **Observed.** Both audits returned good numbers for the page a stranger loads:
  Lighthouse accessibility 97, best-practices 100, SEO 100, axe 0 violations
  across 2,059 nodes. **Every one of those numbers is GitHub's.** All 16 failing
  Lighthouse audits and all 13 axe findings resolve to `github.com` or
  `github.githubassets.com`: `unused-javascript` is primer-react and react-core,
  all 9 `target-size` failures are GitHub's footer nav links and cookie-consent
  button, and the only axe findings touching text this repo wrote are the ten
  mermaid node labels from README.md — whose *text* is ours but whose *contrast*
  is set by GitHub's mermaid theme, which a fenced code block cannot reach.
  This pack ships 0 bytes of browser-executed code, so the count of findings it
  could fix is 0 of 29 by construction, not by luck.

  Written into a PASS row, "accessibility 97" would have credited this pack with
  GitHub's accessibility team. That is the specific trade this wave refused, and
  the attribution — not the score — is why the refusal is auditable.

  A second reading points the same way. Three Lighthouse runs minutes apart
  against an unchanged repo returned performance 32, 34 and 45, with TBT moving
  1,051 ms → 443 ms. A metric that swings 40% while the repo holds still is not
  describing the repo. The scorecard cites the committed run and says so; an
  earlier draft of it quoted the first run's numbers and was corrected before
  commit, because a number quoted from a run that predates the artifact it cites
  is the stale-measurement failure this log exists to catch.

- **Caught in my own instrument, before it shipped.** The first version of
  `audit.mjs` built its git pathspecs through a shell: `git ls-files '*.html'`.
  Under bash that returns the matches; under cmd.exe the quotes are not stripped,
  git matches a literal `'*.html'`, and the command returns nothing. It wrote
  `renderableSourceFileCount: 0` and `scriptsInRepo: []` into a committed receipt
  — and `.tours/validate.mjs` demonstrably exists, so the second zero was
  provably false and the first was worthless. **A zero that means "the command
  did not run" is indistinguishable from a zero that means "the repo has no UI",
  and the entire not-applicable verdict for conditions 7 and 8 rested on it.**
  Fixed by passing pathspecs to git as argv instead of through a shell, and by
  adding a positive control: `git ls-files *.md` must return non-zero in a
  markdown-only repo, and the script refuses to emit any evidence if it does not.
  The control now reads 41 and `scriptsInRepo` correctly finds the guard.

  The content review then caught a defect in this very wave's prose: three
  periods where an ellipsis belongs, in the condition 9 row of the scorecard I
  had just written. Fixed. A gate that never fails its author is not a gate.

- **Fixed:** nothing in the product. This wave changed no document a reader sees;
  its output is `promotion/evidence/` and the scorecard rows it can now support.

- **Re-proved:** `promotion/evidence/audit.mjs` regenerates all six artifacts
  from a clean directory in one run. The WIG content review was negative-tested
  by appending a skipped heading level, a dead relative link and a three-period
  ellipsis to `goals.md`: the probe reported all three (2 major, 1 minor), and
  reported 0 again after the file was restored (`git status --porcelain` clean).
  A check that cannot fail is not a check.

- **Tests:** `node .tours/validate.mjs` → `OK: 28 tour steps across 3 tours match
  their patterns; 39 START_HERE citations resolve.` (exit 0), receipt at
  `promotion/evidence/test-run.json`. Relative links 62, matching the count
  `docs/codebase/TESTING.md` already owns — an independent instrument arriving at
  the documented number.

- **Conditions newly PASS: 2 and 11.**
  - **2** (no critical or major defect open): the ledger's D2 is fixed and D1 is
    downgraded to Minor, and both are now confirmed in the HTML GitHub serves
    rather than in the working tree — `rendered-defect-check.json`, 2/2. The
    previous wave explicitly declined to award this to itself because a status
    change belongs to a promotion loop judging the rendered product. This is that
    loop, and that is the judgement.
  - **11** (tests and build green): the baseline's "nothing to run" was true when
    written and went stale when `.tours/validate.mjs` landed. It runs, it is
    committed, it is re-runnable from a fresh clone, and its output is now
    retained. There is no build step, which the receipt says rather than skips.

- **Conditions deliberately NOT moved.** 7 and 8 stay off PASS despite the audits
  having actually run, because a repo with zero renderable source files has no
  subject for either; 6 stays off PASS because its keyboard half was never
  exercised and its axe half grades GitHub's markup; 9 stays off PASS because one
  page load is not a journey; 10 stays off both PASS and FAIL because the number
  measured belongs to someone else's bundle. 4 is untouched — its honest
  "probe not retained" is still the state, and this wave did not rescue it,
  because writing a viewport probe purely to turn a cell green is the move the
  2026-08-13 correction already refused.

### Human-readiness wave — 2026-08-13

Not a promotion iteration. This is the second loop (HUMAN_READY), which asks
whether a stranger can maintain the repository rather than whether a stranger can
use the product. The twelve-condition scorecard in `PRODUCT_GOAL.md` was **not**
re-measured and its 0/12 still stands against commit `5f17b04`.

- **Journey exercised:** none in a browser. This wave changed no rendered
  behaviour that a journey covers; J1's three cited README regions (the mermaid
  block, "The Contract", the File Map) were deliberately left untouched, and
  soul.md keeps its four `h2` headings so J2's recorded evidence stays true.

- **Observed:** four single-source violations, each of which gives a reader two
  different answers to one question.
  1. `WorkerRun` defined twice — `harness.md` and `workers.md` — and the
     `harness.md` copy omitted `startedAt`/`completedAt`, which `workers.md`
     declares mandatory. Copying it produced a type the pack rejects. Confirmed
     independently by `npx jscpd --min-lines 3 --min-tokens 15` as a 5-line
     typescript clone.
  2. `delegation.md` listed nine trace events, two of them — `goal_decomposed`,
     `artifact_merged` — absent from `trace-schema.md`, the file that claims to be
     the standard vocabulary.
  3. Three acceptance bars for one thing: `README.md` "The Contract" (9
     questions), `soul.md` "Full V3 Standard" (10), `readiness.md` (37 bullets).
  4. Six failures carrying two to four names each across `failure-modes.md`,
     `world.md`, `loop.md`, `context.md`, `interrupts.md` — "Stale Commit" alone
     appeared under four different names.
  Plus a contradiction: `README.md` typed the room's `world` as holding only
  beliefs while `world.md` gave `World` eight fields, and both claimed `artifacts`.

- **Fixed:** duplicate `WorkerRun` deleted from `harness.md`; the two orphan
  events added to `trace-schema.md` and `delegation.md`'s list replaced by a
  link; `soul.md`'s V3 list folded into `readiness.md` (keeping the heading, and
  gaining its one unique question as "The effect of a human interrupt is
  visible."); 15 restated failure bullets removed from four files, each now
  linking to the one catalogue; `README.md` room shape now says `world: World`
  and `world.md` drops the duplicate `artifacts`. D2 fixed, D1 downgraded.

- **Re-proved:** three greps that return empty only when the property holds —
  no type defined twice, no trace-event list outside `trace-schema.md`, no
  surviving alias for the stale-commit failure. Commands and before/after values
  in `docs/SIMPLIFICATION_REPORT.md`.

- **Tests:** `node .tours/validate.mjs` → `OK: 28 steps across 3 tours resolve`
  (exit 0). Negative-tested: a tour with a past-end line, a missing file and a
  zero line exits 1 naming all three. Relative-link check: 0 broken of 46.
  `npx jscpd` clones 4 → 2, both remaining intentional. `npm test` / `npm ci` /
  `pytest` still fail as recorded at baseline; that is unchanged and by design.

- **Conditions newly PASS:** none, and none claimed. This wave did not re-run the
  promotion gate. Condition 2 (no critical or major usability defect open) is the
  one plausibly affected — D1 is downgraded and D2 fixed — but a status change is
  a promotion-loop judgement made against the rendered product, not a
  documentation wave's to award itself.

### Citation-guard wave — 2026-08-13

Not a promotion iteration. A cold reader was given only this repository, ran it,
and traced the nine stages of `docs/START_HERE.md`. Three of their findings were
documentation drift and one was the check that should have caught it.

- **Journey exercised:** none in a browser. J1's cited README regions were
  touched this time: one paragraph is inserted under the "File Map" heading, so
  the table moved down the file. No heading was added or removed and no table row
  changed, so J1's recorded evidence (20 `tbody tr` rows, eight `h2` sections)
  still holds. J1 and J3 now cite README *headings* instead of line ranges,
  because it was those line ranges that my own one-paragraph insert falsified.

- **Observed:** (1) `README.md` put "Nothing in this repo runs" thirty lines
  BELOW a twenty-row File Map of lowercase single-word filenames, so a skimming
  reader met what looks like a source tree before the sentence saying it is not
  one. (2) `docs/codebase/STACK.md` claimed `git ls-files | grep -v '\.md$'`
  returns "one file" — it returns four, three `.tours/*.tour` and
  `.tours/validate.mjs` — and that was the first checkable claim in the table
  whose whole purpose is "how to check this". (3) `docs/codebase/TESTING.md` and
  `docs/codebase/CONVENTIONS.md` both said 38 relative links resolve; the
  measured count is 62. (4) `.tours/validate.mjs` checked that a step's line
  number was in range and nothing else — anchor stability, never anchor
  correctness.

- **Fixed:** the sentence and the `START_HERE.md` link moved above the File Map
  in `README.md`; `STACK.md` states four files and re-measures the script at 167
  lines; `TESTING.md` carries the link count once, next to a one-line command
  that reproduces it, and `CONVENTIONS.md` stops keeping a second copy of the
  number — two copies of a number is how both went stale. `.tours/validate.mjs`
  now requires a `pattern` per tour step and asserts the CITED LINE matches it,
  and checks every `**File:**` / `**Symbol:**` citation in `docs/START_HERE.md`
  resolves to a real file and a real heading. C7 in `docs/codebase/CONCERNS.md`
  is marked CLOSED with the argument that deferred it and why it was wrong.

- **Re-proved:** the hardened guard immediately failed two steps of
  `01-primary-user-flow.tour` that the README insert had displaced onto a table
  row and a bullet — both lines still existed, so the old check passed them.
  Re-anchored to 88 and 115 and re-run clean.

- **Tests:** `node .tours/validate.mjs` → `OK: 28 tour steps across 3 tours
  match their patterns; 39 START_HERE citations resolve.` (exit 0). Negative-
  tested twice, each restored after: a tour step moved one line off its heading
  (`harness.md:92` → `93`, a line that exists) exits 1 naming the pattern it
  failed; a START_HERE symbol misspelt (`## Commit Guard` → `## Commit Gaurd`)
  exits 1 naming the files that lack it. Relative links: 0 broken of 62
  (`git ls-files '*.md' | xargs grep -o '](\([^)#]*\.md\)[^)]*)' | wc -l`).
  Single-source grep for duplicate types: empty. `npm test` / `npm ci` /
  `pytest` still fail as recorded at baseline, by design.

- **Conditions newly PASS:** none, and none claimed. The twelve-condition
  scorecard still stands at 0/12 against commit `5f17b04` and was not re-run.

### Documentation citation CI repair — 2026-10-08

This is a documentation-maintenance result, not a promotion iteration.

- **Journey exercised:** a developer or coding agent follows the README,
  reading guide and clickable tours before adapting the specification pack.
- **Observed:** at main `44dd483caf7f54562f7abfd2a53a63f435a93499`, the
  unchanged checker exits 1 with five broken citations: four README tour lines
  and the reading guide's missing `# NodeAgentSpec` heading.
- **Fixed:** the authored README heading is restored outside the unchanged
  generated branding; the four README tour anchors are 14, 55, 103 and 130.
  The README, reading guide and tour distinguish the absent agent runtime and
  capability-test runner from this pack's existing documentation checker.
- **Local before/new:** on Windows with Node 22.22.2,
  `node .tours/validate.mjs` exits 1 before the repair and 0 afterward:
  `OK: 28 tour steps across 3 tours match their patterns; 39 START_HERE citations resolve.`
  A final invocation after the wording corrections returns that same result.
  The checker, all 28 steps and their patterns are retained.
- **Automatic check:** `.github/workflows/citations.yml` runs only the existing
  checker on pull requests and main pushes, using pinned official actions,
  read-only repository permission and no dependency installation or cache.
- **At this local capture:** hosted PR/main CI is NOT_RUN. The result proves
  local documentation citations, not agent capability, adoption success,
  rendered presentation, responsiveness, SEO or product readiness.
- **Conditions newly PASS:** none. The existing promotion scorecard and
  unresolved adoption-verification gap are unchanged.
