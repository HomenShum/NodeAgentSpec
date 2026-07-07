# Readiness

Readiness is the checklist before claiming an agent system is real.

## State Readiness

- Goals are durable.
- Tasks are durable.
- Workers are durable.
- Artifacts are durable.
- Beliefs are durable.
- Policy is durable.
- Traces are durable.

## Control Readiness

- Users can add goals.
- Users can replace goals.
- Users can add constraints.
- Users can cancel workers.
- Users can retry failed or blocked workers.
- Users can inspect internal state.

## Permission Readiness

- Web research can be disabled.
- External actions can be disabled.
- Missing permission blocks before tool use.
- Blocked reason is visible.
- Retry works after permission changes.

## Budget Readiness

- Worker budget is visible.
- Budget exhaustion blocks new work.
- Budget use increments only for scheduled work.
- Hidden caps are not silent.

## Verification Readiness

- Type checks pass.
- Unit tests pass.
- Build passes.
- Browser flow passes.
- Production logs are checked.
- Real deployment is tested.

## UI Readiness

- Mobile layout works.
- Controls are readable.
- State drawer is discoverable.
- Transcript is bounded.
- Long runs do not grow the whole page.

## Honesty Readiness

- No mock path is used for the shipped claim.
- No hardcoded success path is presented as model capability.
- Failures remain visible.
- The final answer names what was and was not verified.

## Rule

The system is ready only when the production path works and the failure path is visible.
