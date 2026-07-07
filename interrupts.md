# Interrupts

Interrupts are first-class control inputs. They are not noise in the transcript.

A useful agent system must accept mid-flight changes without losing work, corrupting state, or pretending the old goal is still current.

## Interrupt Types

### Additive

The user adds work.

Examples:

- "also research pricing"
- "while you do that, draft the email"
- "start counting too"

Behavior:

- create a new goal or task
- preserve active work unless conflict exists
- schedule parallel workers if allowed

### Replacement

The user changes the target.

Examples:

- "instead do X"
- "stop that"
- "new goal"

Behavior:

- cancel or supersede conflicting work
- create replacement goal
- guard stale completions

### Constraint

The user narrows the work.

Examples:

- "keep it under $50"
- "do not use web"
- "make it concise"

Behavior:

- update constraints
- re-check running and queued work
- block or cancel work that violates policy

### Correction

The user says state is wrong.

Examples:

- "no, I meant 100"
- "that person is not the CEO"
- "you counted wrong"

Behavior:

- patch state
- trace correction
- rerun verifier where needed

### Status Request

The user asks what is happening.

Examples:

- "hello?"
- "what are you doing?"
- "why did it stop?"

Behavior:

- summarize state
- do not treat as a new goal unless it contains a goal

## Interrupt Handling

1. Persist the raw input.
2. Classify typed intent.
3. Compare against current goals.
4. Apply reducer transition.
5. Cancel, block, or schedule workers.
6. Emit trace.
7. Update visible state.

## Common Bugs

- approval hijacked as new goal
- trailing number hijacks target
- negated clause wins
- old worker commits after retarget
- status request becomes task
- failed turn destroys steer

## Rule

Human interruption is not exceptional. It is the control plane.
