# Context

Context engineering is deciding what the agent sees now, what it can retrieve, and what must be stored durably.

More context is not always better. The right context is scoped, current, source-backed, and relevant to the worker.

## Context Layers

### Immediate Context

What the agent needs for the next step:

- active goal
- typed intent
- current task
- relevant constraints
- relevant policy
- last few state transitions

### Working Context

What the room is currently managing:

- goal graph
- task graph
- active workers
- pending approvals
- current artifacts
- open risks

### Durable Context

What should survive the session:

- artifacts
- beliefs
- decisions
- user preferences
- eval results
- failure modes

### External Context

What must be fetched because it changes:

- news
- prices
- laws
- product docs
- API docs
- schedules
- model availability
- deployment state

## Worker Context Packs

Each worker should receive a context pack, not the entire transcript.

Example:

```md
# Worker Context

Goal: ...
Task: ...
Constraints:
- ...

Policy:
- web research: allowed
- external actions: blocked
- budget remaining: 12 workers

Relevant artifacts:
- ...

Relevant beliefs:
- ...
```

## What Not To Include By Default

- full transcript
- unrelated goals
- stale artifacts
- private data not needed for the task
- tool credentials
- hidden system state the worker cannot use
- speculative beliefs without source labels

## Context Freshness

Each claim should be classified:

- stable: unlikely to change
- dynamic: may change and should be checked
- current: verified recently
- stale: should not be used without refresh
- user-provided: true within the room unless corrected

## Context Failure Modes

Failures caused by what the worker was given, rather than by what it did:

- Context flooding: too much transcript causes the model to miss the actual task.
- Hidden policy: model attempts a tool the room would not permit.
- Fake memory: model remembers a fact that was never committed.

The full failure catalogue is in [failure-modes.md](failure-modes.md).

## Rule

Context should be sufficient to do the work and narrow enough to make mistakes observable.
