# Trace Schema

Traces are the receipt layer for agent systems.

They show what the system believed, decided, scheduled, blocked, retried, and committed.

## Trace Event

```ts
type TraceEvent = {
  id: string;
  roomId: string;
  kind: string;
  summary: string;
  payload?: unknown;
  createdAt: number;
};
```

## Standard Events

### Input

- `utterance_received`
- `human_steer_received`
- `device_joined`
- `device_left`

### Intent

- `intent_classified`
- `intent_ambiguous`
- `intent_rejected`

### Reducer

- `state_reduced`
- `goal_created`
- `goal_replaced`
- `goal_constrained`
- `goal_completed`
- `goal_blocked`
- `goal_canceled`

### Scheduling

- `scheduler_selected`
- `worker_scheduled`
- `worker_blocked`
- `worker_started`
- `worker_completed`
- `worker_failed`
- `worker_canceled`
- `worker_retried`

### Policy

- `permission_checked`
- `permission_denied`
- `budget_reserved`
- `budget_exhausted`

### Tool

- `tool_call_started`
- `tool_call_completed`
- `tool_call_failed`

### Artifact

- `artifact_created`
- `artifact_updated`
- `artifact_reviewed`

### Verification

- `verification_started`
- `verification_passed`
- `verification_failed`

## Payload Guidance

Payloads should include:

- relevant ids
- before and after state when compact
- policy decision
- error reason
- worker attempt
- source references

Payloads should not include:

- secrets
- full private credentials
- unnecessary personal data
- unbounded transcript dumps

## Trace UI

Trace rows should be:

- chronological
- filterable by kind
- expandable
- copyable
- linked to workers, goals, and artifacts

## Rule

If an action changes state, it deserves a trace.
