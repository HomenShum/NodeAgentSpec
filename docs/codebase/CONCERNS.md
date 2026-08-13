# Concerns

Everything known to be wrong or unfinished, with the reason it was left. Ordered
by what would bite a new reader soonest.

## C1 — Adoption still has no success signal

`README.md` step 7 no longer tells the reader to run tests that do not exist —
that was defect D1, and the wording now says the tests are of *their* system. But
the underlying gap stands: a reader who copies the pack and edits it has no way
to check they did it correctly. Nothing tells them their `soul.md` is specific
enough or their skill contracts are complete.

**Why left:** the fix is either a linter for prose or a checklist for adoption,
and both are new product scope. This wave was structural. D1 is downgraded from
Major to Minor in the ledger, not closed, and the remaining half is stated there.

## C2 — Two types are named in the room shape and never defined

`README.md`'s `AgentOsRoom` has `state: ConversationState` and `tasks: Task[]`.
Neither type is defined anywhere in the pack. `Task` is load-bearing — `workers.md`
has `taskId`, `goals.md` says to split goals into tasks, `context.md` describes a
task graph — so a reader implementing the room has to invent its shape and will
invent it differently from the next reader.

`world.md`'s `World` similarly names `Human`, `Agent`, `Device`, `Tool`, `Risk`
and `Constraint` as element types. Those four have prose sections describing what
they are; `Risk` and `Constraint` have nothing at all.

**Why left:** defining them is writing new specification, which is feature work.
The rule for this wave was not to mix feature work with structural change.
`README.md` now at least says out loud that these two are left to the reader.

## C3 — Two taxonomies for one classification

`goals.md` `## Goal Operations` names Create / Replace / Constrain / Correct /
Complete / Block. `interrupts.md` `## Interrupt Types` names Additive /
Replacement / Constraint / Correction / Status Request. Four of those are the
same classification under two names, and both files list overlapping trigger
phrases — "also", "while you do that" appear in both.

`loop.md` `### 2. Interpret` then gives a third list of ten intent classes.

A reader building an intent classifier has to decide whether `Additive` and
`Create` are one enum member. They are.

**Why left:** unifying the vocabulary means renaming public sections across three
documents on a judgement call about which name is better. The two files describe
genuinely different axes — what happened to the goal, versus what the human did —
so the overlap is defensible. Documented rather than resolved, which the gate
permits.

## C4 — Two status lists include values that are not statuses

`README.md` `## The Contract` asks which workers are "queued, running, completed,
blocked, failed, canceled, or retried". `soul.md` rule 12 says "Failed, blocked,
canceled, stale, and retried work must remain visible". Neither `retried` nor
`stale` is a member of the `WorkerRun.status` union in `workers.md`; retry is
modelled as a *new attempt* linked by `retryOf`, and staleness is a property the
Commit Guard checks, not a state.

**Why left:** both readings are correct as prose and wrong as enums. Changing them
touches the README's pitch, which is the surface a verified reader journey (J1)
depends on. Low value, real risk.

## C5 — The promotion baseline predates this wave

`promotion/PRODUCT_GOAL.md` describes the repository as "27 markdown files and
zero lines of code" and scores it 0/12 PASS. That was true of commit `5f17b04`
and is explicitly scoped to it. After this wave the repository has 44 files, one
of which is a 71-line Node script.

**Why left:** `PROMOTION_LOG.md` is append-only by its own rule — "never rewrite
history, because the list of things that turned out to be wrong is more useful to
the next reader than the current values alone". This wave appended an entry rather
than editing the baseline. The scorecard rows have not been re-measured and
**should not be inherited**; a promotion wave must re-run them.

## C6 — Nothing enforces the single-source rule

The two properties this wave fixed — one definition per type, one catalogue per
concept — are checked by grep commands written down in
[TESTING.md](TESTING.md) and by nothing else. There is no CI. A future edit can
reintroduce a second `WorkerRun` and no one will be told.

**Why left:** adding a workflow to a repository with no build is a real judgement
call, and the two commands are short enough to run by hand. If a third
single-source defect appears, that is the trigger to automate.

## C7 — The tour validator checks position, not meaning

`.tours/validate.mjs` proves a tour step points at a line that exists. It cannot
prove the line still says what the step claims. A section reworded in place keeps
its line number and the tour silently becomes wrong.

**Why left:** checking meaning means pinning tour steps to heading text rather
than line numbers, which is a better design and more machinery than the current
three tours justify.
