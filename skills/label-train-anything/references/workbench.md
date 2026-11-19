# Label Train Anything workbench contract

## Core flow

Goal + authorized source → task and label schema → baseline and hard negatives → independent evaluation → typed result and evidence → review and feedback → bounded next experiment.

Supply a versioned source manifest, task type, label policy, evaluation split, resource cap and completion verifier. Validate schemas and permissions before execution. The shared harness routes requests and records attempts; each domain owns its tools, data, labels, thresholds and permissions. A worker result is a candidate, not a permission or an authoritative label.

## Reuse existing workers before training

- Use deterministic parsers, retrieval or simple rules when they satisfy the task. Compare a small fitted ranker only when labeled evidence supports it.
- For video, a compact multimodal decision model such as UniJev can be evaluated for a specified choice; use a specialized detector/tracker for boxes and counts where required. Model fit and runtime integration are not assumed.
- For markets, use numeric, point-in-time series and a fill/cost simulator. Isolate paper research completely from brokerage actions. A rendered chart is a view of the source, not the authoritative input.
- Do not rent hardware until inputs, acceptance test, output receipt, expected incremental value, budget and automatic cleanup can all be established offline.

## Checkable outcomes

| Example | First end-to-end receipt | What it does not prove |
|---|---|---|
| Video time brackets | Source ID and licensed fixture; actual model/checkpoint; options and timestamps; independent reference intervals; scored mismatches; latency and visible review surface | Taste learning, transfer to unrelated genres, or permission to publish clips |
| Paper market pattern research | Frozen data and policy; causal features; same-ledger, same-window baseline results; modeled fills and net returns; drawdown; rejected cases | Predictive edge without independent historical evaluation, live execution, or investment suitability |

Record hashes, command, dataset scope, elapsed time/cost, pass/fail/blocked status and the next owner. On retry change only an identified hypothesis or environment fault; preserve previous receipts. Cancellation stops new jobs and billable resources. A missing source or model stays blocked; it is not silently replaced with a favorable fixture.
