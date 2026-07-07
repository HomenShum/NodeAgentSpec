# Delegation

Delegation is how an Agent OS turns one human request into multiple bounded workstreams.

Delegation should be explicit, inspectable, and reversible.

## When To Delegate

Delegate when work can proceed independently:

- research plus planning
- implementation plus documentation
- multiple market segments
- comparison across tools
- test creation plus code change
- artifact review plus next draft

Do not delegate when:

- order matters tightly
- context is too ambiguous
- a permission decision is pending
- the worker would need hidden authority
- a deterministic function would be simpler

## Delegation Plan

A delegation plan should name:

- goal
- task
- worker kind
- input context
- output artifact
- verifier
- dependencies
- budget
- permission class

## Parallelism

Parallelism is useful when:

- each worker has independent inputs
- outputs can be merged
- failures are isolated
- budget is acceptable
- user can inspect the work

Parallelism is harmful when it creates:

- duplicate tool calls
- inconsistent facts
- hidden spending
- stale overwrites
- unreviewed side effects

## Merge

When workers complete, merge by artifact and belief, not by transcript.

Merge process:

1. Read worker artifacts.
2. Identify conflicts.
3. Preserve sources.
4. Produce synthesis.
5. Mark open questions.
6. Update beliefs only after verification.

## Delegation Trace Events

Recommended trace events:

- `goal_decomposed`
- `worker_scheduled`
- `worker_started`
- `worker_completed`
- `worker_failed`
- `worker_blocked`
- `worker_canceled`
- `worker_retried`
- `artifact_merged`

## Rule

Delegate to reduce real complexity, not to make the system look busy.
