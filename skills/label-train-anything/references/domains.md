# Domain contracts and examples

## NodeVideo: describe, retrieve, rank, review

Before: baseline camera and body motion, object proximity, speech/activity rate.
During: change in pose velocity/acceleration, tracked region displacement and duration, action/caption, audio transient, visibility.
After: release or follow-through, motion decay, applause/cheer or breathing if audible, transition out. Strong global motion without region-relative motion can be camera shake, not a spasm. Sweat, breathing, strain and a medical condition are not interchangeable. Abstain when visibility, tracking, stabilization or audio quality is insufficient. A caption is an observation proposal, not a like or medical diagnosis.

Start on a coarse scan, route candidate peaks and missed/negative samples to denser extraction, then compare held-out improvement at the same compute budget. Track clip time, frame range, units, missingness and region evidence. Offline editors may use after-event context; live alerts may only use evidence available by emission time. Benchmark public temporal relevance and saliency separately from private taste. Use creator/group-held-out evaluation when IDs are available; independently hold out feedback examples for preference evaluation. Favor real preference labels and version human reference sets. Compare precision/recall at k, temporal IoU or timestamp error, and review acceptance where available. Render only a user-approved edit list.

## NodeQuant: observe, simulate, verify (paper only)

Before: causal rolling volatility, compression, volume surprise, geometry, regime known as of the bar close.
During: breakout/reclaim measured in prices and native timestamps, signal close and first eligible modeled fill.
After: forward net return, maximum favorable/adverse excursion, follow-through. No after-event values in the decision input. OHLC bars do not reveal the intrabar order of competing stop/target touches; use appropriate finer data, conservative ambiguous handling, or abstain. Do not infer order-flow imbalance or true spreads from OHLCV alone.

Keep human preference, trade bracket, realized/simulated outcome separate. Replay candidates and simple benchmarks using the same costs, capital and execution policy. Use purged chronological walk-forward evaluation with embargo as appropriate, frozen final holdout and data lineage. Report net expectancy, drawdown, turnover, risk-adjusted return, regime/symbol robustness and uncertainty; check exposure caps and capacity independently. Backtest P&L is an objective calculation conditional on a simulator, not proof of predictive edge. Log every trial; apply appropriate multiple-trial checks (e.g. Deflated Sharpe Ratio, and PBO as an overfit diagnostic) without using those to tune the final holdout. A chart/image may aid explanations but is not the source of numerical truth.

## Transfer and limitations

- The reusable part is the state/measurement/receipt loop. A candle readout and footage may share the event contract without sharing feature semantics, time bases, reward, or authority.
- Self-play in a game has known rules and terminal rewards; replay research in a market has changing incentives and only one observed history. Prefer bounded champion/challenger research, delayed observed outcomes, and an independent replay/eval gate. In video, proxy agreement and generated captions are not proof of taste.
- No-training retrieval, CPU ranker fitting and GPU fine-tuning are distinct. Default to the least costly one that passes the gate.
- Starting evidence for these projects: NodeVideo has a verified caption/retrieval slice, not a verified learned preference loop; NodeQuant has an existing chat fixture surface and tested synthetic primitives, not a proven net edge or live brokerage workflow.

Sources: [QVHighlights annotations](https://proceedings.neurips.cc/paper_files/paper/2021/hash/62e0973455fd26eb03e91d5741a4a3bb-Abstract.html), [Deflated Sharpe Ratio](https://doi.org/10.2139/ssrn.2460551), [Probability of Backtest Overfitting](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2326253).
