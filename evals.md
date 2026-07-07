# Evals

Evals prove whether the Agent OS works across real boundaries.

They should test state, behavior, UI, tools, and recovery.

## Eval Categories

### Parser and Intent Evals

Test:

- replacement versus addition
- constraints
- corrections
- negation
- count ranges
- status requests
- approvals

### Reducer Evals

Test:

- floor control
- count progress
- done state
- stale commit rejection
- same-goal no-op
- turn cap semantics

### Worker Evals

Test:

- worker scheduling
- permission block
- budget block
- cancel
- retry
- stale completion guard
- artifact write

### UI Evals

Test:

- state drawer visible
- worker controls visible
- policy visible
- bounded scroll
- join notifications
- mobile layout

### Live Evals

Test the production system, not only local mocks.

Examples:

- create room on laptop
- join on phone
- steer from either device
- add parallel goal
- disable web and confirm blocked worker
- enable web and retry
- inspect state drawer
- confirm logs are clean

## Canonical Capability Tests

### Count To N

Goal:

- count from 1 to N
- one number per turn
- rotate agents
- stop exactly at N

Failure catches:

- off-by-one
- stale done
- overlapping turns
- missing shared state

### Interrupt Retarget

Goal:

- start planning
- interrupt with new count goal
- confirm old plan does not keep speaking as primary

Failure catches:

- lost steer
- stale model done
- goal replacement bug

### Parallel Goal

Goal:

- ask for trip plan
- also ask for research
- also ask for build plan

Failure catches:

- transcript-only work
- no goal graph
- hidden worker failure

## Eval Record

Each eval should store:

- name
- setup
- steps
- expected state
- observed state
- result
- logs
- linked traces

## Rule

No live claim without a live eval.
