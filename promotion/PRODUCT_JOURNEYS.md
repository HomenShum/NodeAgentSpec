# Canonical journeys — NodeAgentSpec

Three to five real workflows. Not feature tours: a journey is one person, one
goal, and the artifact they hold when it worked. These are the promotion loop's
work queue, exercised in order of importance.

**A journey with no browser evidence is unfinished**, regardless of test status.

## Journey shape

Each journey states, in this order:

- **Persona and situation** — who arrived, and why today.
- **Goal** — what they want to be true when they leave.
- **Steps** — what they actually do, in the UI, in order.
- **Done when** — the observable artifact or state that proves completion.
- **Evidence** — path to the capture that shows it working. Empty until proven.

This repo ships no application, so "the UI" for every journey below is the
GitHub-rendered view of this repo's own files. Each journey names the exact file
and section it drives.

---

## J1 — "Is this pack worth ten minutes of my time?"

- **Persona and situation:** An engineer whose tool-calling assistant keeps
  dropping work has been sent this link by a colleague. They have one browser tab
  and about two minutes of patience before they close it.
- **Goal:** Decide whether this pack describes their problem, without cloning
  anything.
- **Steps:**
  1. Open `https://github.com/HomenShum/NodeAgentSpec`.
  2. Read the one-line description and the "What This Gives You" list in `README.md`.
  3. Look at the "The Stack" diagram — the ` ```mermaid ` block at `README.md:25-38`
     — which must appear as a drawn flowchart, not as raw `flowchart TB` source.
  4. Read "The Contract" list at `README.md:40-54` (the nine questions an agent
     system must be able to answer) and check whether their own system can answer them.
  5. Scan the "File Map" table at `README.md:58-81` to see the scope on offer.
- **Done when:** They can state what the pack is and name several of the 20
  documents, and the Stack diagram rendered as a picture rather than as code text.
- **Evidence:** Observed 2026-08-13 in the rendered page. Mermaid container
  resolved to `is-render-ready` with a 450px-tall viewscreen iframe and the raw
  ` ```mermaid ` source hidden (`rawMermaidVisible: false`); File Map table
  rendered 20 `tbody tr` rows; page headings read back as the eight `h2`
  sections. One earlier load left the same container `is-render-failed` — see
  the transient note in PROMOTION_LOG.md.

## J2 — "Just show me the one document that answers my question"

- **Persona and situation:** The same engineer, now specifically wondering what a
  cancelled background job is supposed to do when its result arrives late.
- **Goal:** Get from the README to the document that answers that, and read it.
- **Steps:**
  1. From the File Map table in `README.md`, click the row for the relevant
     document — `workers.md` for retry/cancel contracts, `interrupts.md` for
     mid-flight steering, `trace-schema.md` for the event vocabulary.
  2. Read the rendered document.
  3. Return to `README.md` and follow a second link.
- **Done when:** The linked document renders with its own headings and no link in
  the File Map dead-ends.
- **Evidence:** Observed 2026-08-13. Navigated `README.md` → `soul.md`; page
  rendered with `h1` "Soul", `h2` sections Constitution / Human Analogy /
  Non-Negotiables / Full V3 Standard, 2,639 characters of body text. All 20 File
  Map hrefs resolve: 13/20 returned HTTP 200 on a live fetch and the remaining 7
  returned 429 from my own rapid-fire loop, not from missing files — every one of
  the 20 targets exists in the clone (filesystem check, 0 broken relative links
  across all 27 files).

## J3 — "Adopt the pack into my own repo"

- **Persona and situation:** The engineer has decided to use it and now has to get
  it into their own codebase and make it say something true about their product.
- **Goal:** Have these documents in their repo, edited to their actual boundary,
  rather than a generic copy that nobody will trust.
- **Steps:** The seven steps in "How To Use" at `README.md:83-91` — copy the files
  in, edit `soul.md` to their product boundary, define real capabilities in
  `skills.md`, implement the state objects from `harness.md` / `goals.md` /
  `workers.md`, add the events from `trace-schema.md`, build the UI from
  `visibility.md`, then run the tests from `evals.md` and `readiness.md`.
- **Done when:** Their repo holds an edited `soul.md` and `skills.md` that name
  their own product, and step 7 has been performed.
- **Evidence:** _not drivable._ Step 1 works (clone succeeded, 27 files, 2,630
  lines). Steps 2–6 are authoring work with no completion signal the repo can
  show. **Step 7 cannot be performed at all** — this is defect D1 in
  PROMOTION_LOG.md.

## J4 — "Write down my first worker and my first test"

- **Persona and situation:** Mid-adoption, the engineer needs to describe one
  background job and one test of it in a form a reviewer will accept.
- **Goal:** Hold one filled-in worker description and one filled-in test record.
- **Steps:**
  1. Copy `templates/worker-template.md` and fill it for one real job.
  2. Copy `templates/eval-template.md` and fill Setup / Steps / Expected State.
  3. Run the thing, then fill Observed State, Result, and Evidence.
- **Done when:** They hold a completed eval record whose Observed State was
  written after an actual run, with test output and a screenshot attached.
- **Evidence:** _not drivable._ Both templates exist and are well-formed
  (`templates/eval-template.md`, 54 lines, sections Name / Capability / Setup /
  Steps / Expected State / Observed State / Result / Evidence / Follow-Up). The
  journey's outcome lives in the reader's repo, not this one, so this repo cannot
  show it succeeding.

## J5 — "Check my system before I tell anyone it's real"

- **Persona and situation:** Launch is Thursday. The engineer wants to know what
  they are still lying to themselves about.
- **Goal:** Walk a checklist that names what was and was not verified.
- **Steps:** Work through the seven sections of `readiness.md` — State, Control,
  Permission, Budget, Verification, UI, and Honesty Readiness — against their
  running system, then apply the three canonical capability tests in `evals.md`
  ("Count To N", "Interrupt Retarget", "Parallel Goal").
- **Done when:** Every line in `readiness.md` is answered yes or explicitly
  deferred, and the three capability tests have been run against the production
  path rather than a mock.
- **Evidence:** _not drivable._ Both files are prose checklists (`readiness.md`
  37 checklist lines across seven sections; `evals.md` names the three tests as
  goals and failure-catches). Neither is executable — see D1.

---

## Journeys every agent surface owes

**Recovery, steering, and receipt do not apply to this product, and that is a
decision rather than an omission.** NodeAgentSpec runs nothing on a user's
behalf: it is 27 static markdown files with no runtime, no model call, and no
tool. There is no run to recover, steer, or issue a receipt for.

What the pack does is *specify* those three behaviours for the reader's own
system — recovery in `failure-modes.md`, steering in `interrupts.md`, receipts in
`trace-schema.md` and `artifact.md`. Judging this repo on whether it performs
them would be judging the blueprint for not being the building. If a future wave
adds a demo agent or an interactive example, these three journeys become
mandatory for that surface and this note must be replaced.
