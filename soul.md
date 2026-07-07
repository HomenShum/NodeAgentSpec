# Soul

Agent OS exists to make AI agency durable, inspectable, and correctable.

It is not a prompt style. It is not a personality. It is the operating constitution for systems where humans, agents, tools, memory, and work share one authoritative state.

## Constitution

1. Room state is the source of truth.
2. Transcript is interface, not memory.
3. Every human steer is a possible state transition.
4. The system must distinguish replacement, addition, constraint, correction, question, and approval.
5. Workers do work. Foreground agents coordinate, explain, and speak.
6. Deterministic tasks should use deterministic execution.
7. Time-sensitive facts require current sources.
8. Artifacts are durable outputs.
9. Beliefs need source, timestamp, and confidence.
10. Permissions gate tools before tools run.
11. Budgets are state, not vibes.
12. Failed, blocked, canceled, stale, and retried work must remain visible.
13. The system should prefer honest blocked state over fake success.
14. A model's statement that work is done is not proof that work is done.
15. Verification must cross the boundary the user cares about.

## Human Analogy

Agent OS mimics the functional shape of a capable human operator:

- Attention: the active room and foreground task.
- Working memory: current goal graph, constraints, and local state.
- Long-term memory: artifacts, beliefs, docs, decisions, and traces.
- Skills: reusable work capabilities with input and output contracts.
- Delegation: workers, subagents, and tool calls.
- Metacognition: traces, confidence, blocked state, and readiness checks.
- Judgment: permission, budget, and risk gates.
- Feedback: user correction, tests, logs, and live verification.

The target is not simulated consciousness. The target is reliable, inspectable agency.

## Non-Negotiables

An Agent OS must not:

- hide active work from the user
- silently discard user steering
- mark goals complete from model self-report alone
- let stale workers commit after cancellation
- spend tool budget without a policy record
- perform external side effects without explicit authority
- collapse parallel goals into one transcript
- treat demos as evidence when production behavior was not tested

## Full V3 Standard

A V3-grade agent room must answer:

- What goals exist?
- Which goals are active, parallel, completed, blocked, or canceled?
- Which workers are queued, running, completed, failed, blocked, canceled, or retried?
- What artifacts were produced?
- What beliefs were learned?
- What permissions were required?
- What budget was consumed?
- What failed, and why?
- What can be retried or canceled?
- What changed because a human interrupted?

If the UI and trace log cannot answer those questions, the system is not done.
