# Start here

## What this repository is, for someone who has never seen it

Someone has built an assistant that can use tools. It demos well. In real use it
keeps losing things: a person asks it to do three jobs and two quietly vanish,
someone presses cancel and the work carries on anyway, and it announces that it
booked the room when nobody can tell whether it did.

The person who opens this repository is the engineer who has to fix that. Their
actual problem is that they cannot yet write down what "working" would mean —
which things the system must remember, which it must show on screen, which it
must refuse to do without asking.

**This repository is the paperwork for that, not a program.** It is twenty-seven
markdown documents you copy into your own repository and edit until they describe
your product. Nothing here executes. There is no package to install, no server to
start, no test to run. In the vocabulary the rest of this document uses, it is a
*markdown specification pack*.

So a walkthrough of this repository cannot be a walkthrough of running code.

## What "runtime order" means when nothing runs

The usual version of this document follows one button press down through the
code. This repository has no button and no code. But it is not shapeless either:
the twenty documents describe **one system, and that system has an execution
order**. A request arrives, it is classified, work is scheduled, tools are
called, something durable is written, the screen updates, something fails, and a
test proves it.

The documents are ordered below by **where their subject sits in that execution**,
which is the order you need them in when you build. The README's File Map lists
the same documents by topic; it is an index, and an index is the wrong shape for
a first read.

Two adaptations of the standard format, so nothing below is misread:

- **Symbol** is a section heading inside the document, not a function.
- **Called by** / **Calls next** are the reading order, not a call stack.
- **Failure behavior** is what goes wrong *in the system you build* if you skip
  or misread this step — that being the only failure this repository can cause.

Nine stages follow. Stage 7 (streaming and rendering) exists here only as a
specification of what to render, and the reason is given in that step.

---

## Step 1 — The reader lands on the repository

**File:** `README.md`
**Symbol:** `# NodeAgentSpec`, `## The Contract`
**Called by:** a link from a colleague, or a search result
**Calls next:** `README.md` → `## How To Use`

**Why this exists**
This is the only page most readers will ever see, so it has to answer one
question in about ninety seconds: *does this describe my problem?* It does that
with a list of nine questions an agent system should be able to answer at any
moment. A reader whose system cannot answer them has found their own diagnosis.

**Core code**

```md
- What is the active goal?
- What parallel goals exist?
- Which workers are queued, running, completed, blocked, failed, canceled, or retried?
```

**Input** — a stranger with no context and little patience.
**Output** — a decision to keep reading or close the tab, plus the File Map, which
lists all twenty documents.
**Failure behavior** — if the nine questions do not match the reader's pain, the
pack is the wrong tool for them and they should stop here. That is a success of
the README, not a failure.
**Next** — the reader who stayed goes to Step 2.

---

## Step 2 — The reader adopts the pack

**File:** `README.md`
**Symbol:** `## How To Use`
**Called by:** Step 1
**Calls next:** `soul.md`

**Why this exists**
This is the primary user action of the whole repository, and it is a copy
operation. There is no other action. Everything after this step happens in the
reader's repository, not this one.

**Core code**

```md
1. Copy the files into your repo.
2. Edit `soul.md` to match your product boundary.
3. Define your real skills in `skills.md`.
```

The blank forms for steps 3 onward live in [`templates/`](../templates): one for
a capability (`skill-template.md`), one for a background job
(`worker-template.md`), one for a test (`eval-template.md`), one for a shared
workspace (`room-template.md`).

**Input** — an empty or existing repository belonging to the reader.
**Output** — twenty-seven documents in their repository, initially generic.
**Failure behavior** — copying without editing. A generic `soul.md` that still
describes no particular product is the common failure here; nobody on the team
trusts a constitution that was never written for them.
**Next** — the first document to edit is the constitution, Step 3.

---

## Step 3 — What the system is allowed to be, and the shapes it keeps

**File:** `soul.md`, then `world.md`, `goals.md`, `workers.md`
**Symbol:** `## Constitution`, `## Non-Negotiables`
**Called by:** Step 2
**Calls next:** `harness.md`

**Why this exists**
Before any code, the system needs a written boundary: which behaviors are
required and which are forbidden regardless of what a model proposes. This is the
validation layer of the specification. `soul.md` states the rules; `world.md`,
`goals.md` and `workers.md` give the data shapes those rules operate on — the
people and tools the system knows about, the durable units of intention, and the
scheduled attempts to do work.

**Core code**

```md
1. Room state is the source of truth.
2. Transcript is interface, not memory.
...
14. A model's statement that work is done is not proof that work is done.
```

Each domain type is defined in exactly one file: `Goal` in
[`goals.md`](../goals.md), `WorkerRun` in [`workers.md`](../workers.md), `World`
in [`world.md`](../world.md), `Artifact` in [`artifact.md`](../artifact.md),
`Belief` in [`memory.md`](../memory.md), `TraceEvent` in
[`trace-schema.md`](../trace-schema.md), `AgentOsPolicy` in
[`harness.md`](../harness.md).

**Input** — the reader's product boundary, in their head.
**Output** — an edited constitution and a set of named types their code will use.
**Failure behavior** — two documents defining the same type differently. That was
a real defect in this repository: `WorkerRun` was defined in both `harness.md`
and `workers.md`, and the shorter copy was missing the `startedAt` field that
`workers.md` declares mandatory for a running worker. Anyone who copied the
`harness.md` version built something the rest of the pack rejects.
**Next** — the types now need something to run them: Step 4.

---

## Step 4 — Orchestration: the harness decides, the model proposes

**File:** `harness.md`, with `loop.md`, `context.md`, `delegation.md`
**Symbol:** `## Harness Responsibilities`, `## Commit Guard`
**Called by:** Step 3
**Calls next:** `skills.md`

**Why this exists**
This is the boundary the whole pack is built around. The model can write and
reason, but it must not be the thing that decides whether an action is permitted,
whether budget exists, or whether work is finished. The harness owns that. Every
other document is downstream of this split.

`loop.md` names the cycle the harness runs (observe, interpret, plan, act,
verify, remember). `context.md` governs what a single worker is handed — a scoped
pack, never the whole transcript. `delegation.md` says when to split work into
parallel workers and when not to.

**Core code**

```md
The harness owns truth. The model owns proposals.
```

**Input** — a typed intent derived from something a human said.
**Output** — committed state transitions, scheduled workers, trace events.
**Failure behavior** — a cancelled worker that finishes late and commits anyway,
overwriting current work with a stale answer. `harness.md`'s `## Commit Guard`
is the six-check sequence that prevents it: re-read the worker, confirm it is
still running, confirm the attempt still matches, confirm nothing was cancelled,
confirm policy still allows the write, then commit atomically.
**Next** — the harness needs capabilities to schedule: Step 5.

---

## Step 5 — Capabilities are registered, and gated before they run

**File:** `skills.md`, then `permissions.md`, `budget.md`
**Symbol:** `## Skill Contract`, `## Permission Classes`
**Called by:** Step 4
**Calls next:** `artifact.md`

**Why this exists**
A capability is only schedulable if the harness knows what it needs, what it may
touch, what it produces, and how to tell it worked. `skills.md` is that contract.
`permissions.md` and `budget.md` are the two gates every capability passes
through before it executes — what it is allowed to do, and whether there is
enough left to do it with.

The critical property is that permission is *state*, checked by the harness, not
an instruction in a prompt that a model may talk itself out of.

**Core code**

```md
If a capability cannot be described with an input, permission, output, and
verifier, it is not ready to be scheduled as a skill.
```

**Input** — a skill definition and the room's current policy.
**Output** — either a running worker, or a worker marked `blocked` with a reason.
**Failure behavior** — a tool with an external side effect running without
explicit approval. `permissions.md` classes it under `External Side Effect` and
requires an approval record naming who approved what, when, and to where.
**Next** — a capability that succeeded has to leave something behind: Step 6.

---

## Step 6 — Durable writes: artifacts, beliefs, and the receipt trail

**File:** `artifact.md`, `memory.md`, `trace-schema.md`
**Symbol:** `## Artifact Requirements`, `## Memory Writes`, `## Standard Events`
**Called by:** Step 5
**Calls next:** `visibility.md`

**Why this exists**
This is where work becomes permanent, and the pack's central claim lives here: a
transcript is not evidence. If a worker did something that mattered it must leave
an artifact, and if the system learned something it must record where it learned
it. `trace-schema.md` is the fixed event vocabulary that makes the whole run
auditable afterwards — the receipt layer.

**Core code**

```ts
// fragment of Belief, defined in full in memory.md
claim: string;
source: string;
confidence: number;
expiresAt?: number;
```

**Input** — a verified worker result.
**Output** — an artifact, updated beliefs, and trace events.
**Failure behavior** — memory that cannot name where it came from. `memory.md`
puts it bluntly: if memory cannot name its source, it is not memory, it is model
residue. The second failure is an event vocabulary that forks — this repository
had `delegation.md` emitting two events that `trace-schema.md`, the file that
claims to be the standard vocabulary, did not list.
**Next** — durable state is useless if the user cannot see it: Step 7.

---

## Step 7 — What must reach the screen

**File:** `visibility.md`, with `collaboration.md`
**Symbol:** `## Required Surfaces`, `## State Drawer`
**Called by:** Step 6
**Calls next:** `failure-modes.md`

**Why this exists**
**This repository ships no interface, so there is no rendering code to walk.**
What it ships is the specification of what the reader's interface must expose —
five surfaces (goals, workers, policy, artifacts, traces) and a state drawer that
shows the raw state behind them. That drawer is described here as a product
feature rather than a developer tool, because a user who cannot inspect the
system cannot correct it.

`collaboration.md` extends the same rule across people and devices: a phone and a
laptop looking at the same room must not disagree about what is happening.

**Core code**

```md
If users cannot inspect the system, they cannot steer it.
```

**Input** — room state.
**Output** — a specification for five surfaces the reader then builds.
**Failure behavior** — an interface that grows without bound. Long agent runs
produce long histories, and `## Bounded UI` requires bounded panels and retention
windows rather than a page that never stops growing.
**Next** — everything above assumed success: Step 8.

---

## Step 8 — Failure, interruption, and recovery

**File:** `failure-modes.md`, with `interrupts.md`
**Symbol:** the nine named failures; `## Interrupt Types`
**Called by:** Step 7
**Calls next:** `evals.md`

**Why this exists**
`failure-modes.md` is the single catalogue of how these systems break, each entry
paired with the mechanism that prevents it. It is the one file to read before
debugging anything. `interrupts.md` covers the specific case of a human changing
their mind mid-run, which the pack treats as normal operation rather than an
exception — an interruption is the control plane, not noise.

Four other documents (`world.md`, `loop.md`, `context.md`, `interrupts.md`) list
failures particular to their own subject. They no longer restate the catalogue;
each links here instead.

**Core code**

```md
## Stale Commit
Symptom: old worker commits after user retargeted, canceled, or retried
Fix: revalidate worker status before commit; use run tokens or attempt ids
```

**Input** — a system misbehaving, or a human interrupting.
**Output** — a named failure with a known fix, or a classified interrupt.
**Failure behavior** — the failure this file exists to prevent is treating one bug
as four. Before this wave, "stale commit" appeared under four different names in
four documents, and a reader could reasonably conclude they were separate
problems.
**Next** — a fix nobody proved is a claim: Step 9.

---

## Step 9 — The tests that prove the flow

**File:** `evals.md`, `readiness.md`, `templates/eval-template.md`
**Symbol:** `## Canonical Capability Tests`, the seven readiness sections
**Called by:** Step 8
**Calls next:** end of the walkthrough

**Why this exists**
`evals.md` names three capability tests that catch most of what goes wrong —
*Count To N* (off-by-one, stale done, overlapping turns), *Interrupt Retarget*
(lost steer, goal replacement), *Parallel Goal* (transcript-only work, hidden
worker failure). `readiness.md` is the checklist to walk before telling anyone
the system is real, ending with a section called Honesty Readiness.

**These tests run against the reader's system, not against this repository.**
This pack contains no test runner, and adding one would make it a program rather
than paperwork. The repository's own automated check is narrow and covers only
itself:

```bash
node .tours/validate.mjs   # every tour step and every citation below points
                           # at a line that says what it claims
```

**Input** — the reader's running system.
**Output** — a filled-in eval record whose Observed State was written after an
actual run, and an answered readiness checklist.
**Failure behavior** — filling in Observed State from what the system was
supposed to do rather than what it did. `readiness.md`'s last section exists
because that is the most common way these checklists get faked.
**Next** — nothing. If Step 9 passes against a production path rather than a
mock, the adoption is done.

---

## Where you would add one more capability

Adding a new skill touches five files, in this order: define the contract in
`skills.md`, name the permission class in `permissions.md`, name its cost in
`budget.md`, add any new event to `trace-schema.md`, and add a test to `evals.md`.
Copy [`templates/skill-template.md`](../templates/skill-template.md) — its
headings are exactly the fields the contract requires.

## Related

- [SIMPLIFICATION_REPORT.md](SIMPLIFICATION_REPORT.md) — what this wave removed, measured.
- [codebase/](codebase) — stack, structure, architecture, conventions, integrations, testing, concerns.
- [`.tours/`](../.tours) — the same walk as clickable CodeTour steps.
