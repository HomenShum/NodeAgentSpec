# Harness

The harness is the runtime around the model. It owns authority, state transitions, scheduling, and verification gates.

The model may reason. The harness decides what is allowed to happen.

## Harness Responsibilities

- maintain schema
- validate typed intents
- commit reducer transitions
- schedule workers
- enforce permissions
- enforce budgets
- guard stale completions
- write traces
- write artifacts
- expose internal state
- retry and cancel work
- verify completion

## Harness Components

### Reducer

The reducer transforms state.

Inputs:

- current room state
- typed intent
- worker result
- tool result
- system event

Output:

- next room state
- trace events
- scheduled work

Reducers should be deterministic.

### Scheduler

The scheduler decides what runs next.

It should consider:

- goal priority
- dependencies
- active floor
- worker availability
- permissions
- budget
- stale run tokens

### Worker Runner

The worker runner executes a skill.

It should:

- load scoped context
- check policy before tools
- mark running
- execute work
- write artifact
- mark terminal status
- avoid committing if canceled or stale

### Policy Gate

The policy gate checks:

- tool permission
- external side-effect permission
- worker budget
- token budget
- time budget
- risk class

### Trace Writer

The trace writer records every important transition.

Trace events are not optional. They are the system's receipt layer.

## Minimal Runtime State

```ts
type AgentOsPolicy = {
  budgetMaxWorkers: number;
  budgetWorkersUsed: number;
  permissionWebResearch: boolean;
  permissionExternalActions: boolean;
};

type WorkerRun = {
  id: string;
  goalId: string;
  taskId: string;
  kind: string;
  status: "queued" | "running" | "completed" | "failed" | "blocked" | "canceled";
  attempt: number;
  retryOf?: string;
  error?: string;
  createdAt: number;
  updatedAt: number;
};
```

## Commit Guard

Before a worker writes an artifact or marks completion:

1. Re-read the worker.
2. Confirm status is still `running`.
3. Confirm run token or attempt still matches.
4. Confirm goal and task are not canceled.
5. Confirm policy still allows the write.
6. Commit artifact and terminal status atomically where possible.

## Stale Write Rule

A canceled or superseded worker must not later commit.

This rule prevents:

- stop/start double commits
- stale model `done` stopping a fresh goal
- canceled research appearing as current output
- retried workers racing old attempts

## Harness Checklist

- Can a user cancel a running worker?
- Can a user retry a failed or blocked worker?
- Can the UI show why a worker is blocked?
- Can the system prevent stale completion?
- Can a worker fail without destroying the human steer?
- Can production logs prove the path ran?

## Rule

The harness owns truth. The model owns proposals.
