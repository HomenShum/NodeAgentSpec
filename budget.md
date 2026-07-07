# Budget

Budgets make agency bounded.

An Agent OS should track budget as state and enforce it before scheduling work.

## Budget Types

### Worker Budget

Limits how many workers can run.

Fields:

- budgetMaxWorkers
- budgetWorkersUsed
- budgetRemainingWorkers

### Token Budget

Limits model spend.

Fields:

- maxInputTokens
- maxOutputTokens
- tokensUsed
- tokensRemaining

### Money Budget

Limits external cost.

Fields:

- maxUsd
- usedUsd
- estimatedUsd

### Time Budget

Limits wall-clock or task duration.

Fields:

- maxSeconds
- startedAt
- elapsedSeconds
- deadline

### Risk Budget

Limits action class.

Examples:

- read-only only
- no external writes
- no production changes
- no purchases

## Budget Enforcement

Before scheduling:

1. Estimate cost.
2. Check remaining budget.
3. Reserve budget where possible.
4. Mark blocked if insufficient.
5. Trace the decision.

## Exhaustion Behavior

When budget is exhausted:

- stop scheduling new work
- let already-approved safe work finish if policy allows
- mark blocked workers
- summarize what completed
- show what budget is needed to continue

## Budget UI

The user should see:

- used / max workers
- permission toggles
- blocked reasons
- retry controls
- high-cost pending actions

## Rule

No hidden spend. No silent cap. No fake completion when the budget runs out.
