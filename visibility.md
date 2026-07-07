# Visibility

Visibility is the difference between an agent demo and an agent system.

Users need to see enough internal state to trust, correct, and operate the system.

## Required Surfaces

### Goal Surface

Show:

- active goal
- parallel goals
- completed goals
- blocked goals
- canceled goals

### Worker Surface

Show:

- queued count
- running count
- completed count
- failed count
- blocked count
- canceled count
- retry controls
- cancel controls

### Policy Surface

Show:

- worker budget used / max
- web research permission
- external action permission
- high-risk pending approvals

### Artifact Surface

Show:

- title
- type
- source worker
- created time
- content
- source links where available

### Trace Surface

Show:

- classify
- reduce
- guard
- schedule
- worker events
- tool events
- artifact events
- failures

## State Drawer

A state drawer should expose the raw or structured state:

- policy
- goals
- tasks
- workers
- artifacts
- beliefs
- traces

This is not only for developers. It is the product's truth window.

## Bounded UI

Agent systems produce long histories. The UI must not grow without limit.

Use:

- bounded transcript panels
- virtualized lists when needed
- trace retention windows
- artifact summaries
- expandable details

## Good Visibility

Good visibility lets the user answer:

- what is happening now?
- what is waiting?
- what failed?
- why did it fail?
- what did it produce?
- what can I change?
- did my interrupt land?

## Rule

If users cannot inspect the system, they cannot steer it.
