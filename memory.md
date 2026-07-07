# Memory

Memory is durable state. It is not whatever text remains in the prompt.

An Agent OS separates short-term working memory from durable memory so that agents can continue across turns, devices, workers, and sessions.

## Memory Types

### Working Memory

Current operational state:

- active goal
- active constraints
- current floor
- running workers
- open approvals
- latest artifacts

Working memory is optimized for action.

### Episodic Memory

What happened:

- traces
- utterances
- tool calls
- worker attempts
- retries
- failures
- user corrections

Episodic memory is optimized for audit and debugging.

### Semantic Memory

What the system believes:

- facts
- preferences
- relationships
- domain knowledge
- decisions

Semantic memory requires source and confidence.

### Procedural Memory

How the system should act:

- skills
- playbooks
- eval cases
- failure mitigations
- style guides
- workflow rules

Procedural memory is optimized for repeatable behavior.

## Belief Schema

```ts
type Belief = {
  id: string;
  claim: string;
  source: string;
  confidence: number;
  scope?: string;
  createdAt: number;
  updatedAt: number;
  expiresAt?: number;
};
```

## Memory Writes

Before writing memory:

1. Identify the source.
2. Assign confidence.
3. Classify freshness.
4. Check whether it conflicts with existing memory.
5. Prefer appending an auditable correction over silent overwrite.

## Memory Consolidation

Memory should be consolidated after:

- repeated user correction
- failed live test
- repeated worker failure
- new artifact accepted by user
- production incident
- eval gap

## Forgetting

Some memory should expire:

- dynamic market facts
- pricing
- schedules
- API limits
- temporary preferences
- one-off constraints

Forgetting is part of correctness.

## Rule

If memory cannot name its source, it is not memory. It is model residue.
