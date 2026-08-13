# Structure

## Layout

```
README.md                  entry point; the pitch, the File Map, the room shape
CONTRIBUTING.md            what a good change to this pack looks like
LICENSE.md                 MIT

soul.md                    the constitution: 15 rules, and what the system must not do
world.md                   who and what the system knows about; the World type
goals.md                   durable intention; the Goal type and its operations
workers.md                 scheduled work; the WorkerRun type and its lifecycle
harness.md                 the runtime that owns authority; AgentOsPolicy, Commit Guard
loop.md                    observe -> interpret -> plan -> act -> verify -> remember
context.md                 what a worker is handed, and what it must not be handed
memory.md                  working / episodic / semantic / procedural; the Belief type
skills.md                  the capability contract, and four capability categories
delegation.md              when to split work into parallel workers, and when not to
permissions.md             five permission classes; PermissionState
budget.md                  worker, token, money, time and risk budgets
visibility.md              the five surfaces a user must be able to see
interrupts.md              a human changing their mind mid-run
collaboration.md           several humans, agents and devices in one room
artifact.md                durable output; the Artifact type and its lifecycle
trace-schema.md            the event vocabulary; the TraceEvent type
failure-modes.md           the single catalogue of how these systems break
evals.md                   three canonical capability tests
readiness.md               the checklist before claiming the system is real

templates/                 blank forms the reader fills in
  skill-template.md          one capability
  worker-template.md         one background job
  eval-template.md           one test record
  room-template.md           one shared workspace

promotion/                 process records for this repository, not part of the pack
  PRODUCT_GOAL.md            who this is for; the promotion scorecard
  PRODUCT_JOURNEYS.md        five canonical reader journeys
  PROMOTION_LOG.md           append-only loop state and the defect ledger
  SKILLS.md                  the four external authorities the loop borrows

docs/                      this packet, added in the human-readiness wave
  START_HERE.md              the twenty documents in execution order
  SIMPLIFICATION_REPORT.md   what the wave removed, with evidence commands
  codebase/                  these seven files

.tours/                    CodeTour walkthroughs plus their validator
```

## The one distinction that matters

**The pack** is the twenty-three files a reader copies: `README.md`, the twenty
documents, and `templates/`. **Everything else is about the pack** — `promotion/`
records how it was judged, `docs/` explains it, `.tours/` walks it. A reader
adopting the pack copies the first group and leaves the second.

## Two orderings, on purpose

The File Map in `README.md` lists the twenty documents by topic, for looking one
up. [`docs/START_HERE.md`](../START_HERE.md) walks the same twenty in the order
the system they describe executes, for reading them the first time. Neither is
redundant; they answer different questions.

## Naming

Files are lowercase single words named after the concept they own
(`permissions.md`, not `agent-permission-model.md`). Every document ends with a
`## Rule` section holding its one-sentence summary. Both conventions are
load-bearing and described in [CONVENTIONS.md](CONVENTIONS.md).
