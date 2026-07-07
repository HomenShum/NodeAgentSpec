# Skills

Skills are durable capabilities the harness can schedule. They are not roleplay labels.

A skill has a contract. It declares what it needs, what tools it may use, what it produces, how it verifies completion, and how retry or cancel should behave.

## Skill Contract

Each skill should define:

- purpose
- input schema
- context requirements
- allowed tools
- policy gates
- budget cost
- output artifact type
- completion verifier
- retry behavior
- cancel behavior
- failure modes

## Skill Categories

### Deterministic Skills

Use deterministic code when the task has exact rules.

Examples:

- counting
- formatting
- schema conversion
- sorting
- arithmetic
- state diffing
- validation

These should not burn a model call per step.

### Reasoning Skills

Use a model when the task requires synthesis, judgment, or language.

Examples:

- planning
- summarization
- critique
- prioritization
- strategy
- explanation

### Research Skills

Use current external context when facts may have changed.

Examples:

- market research
- current product comparison
- legal or regulatory lookup
- technical docs lookup
- pricing or availability checks

Research skills must preserve sources.

### Side-Effect Skills

Use tools that change external state only behind explicit permission.

Examples:

- sending email
- opening pull requests
- deploying
- editing production data
- purchasing
- changing permissions

Side-effect skills require visible preflight and postflight records.

## Example Skills

### deterministic_count

Purpose: execute exact count tasks without model drift.

Inputs:

- start number
- target number
- active count state
- ordered participants

Output:

- count execution artifact
- reducer-owned spoken turns

Verifier:

- each committed number equals the next expected number
- turn order matches policy
- completion happens exactly at target

### web_research

Purpose: gather current external context for a goal.

Inputs:

- room goal
- worker goal
- task title
- search constraints

Tools:

- hosted web search
- browser or HTTP fetch where allowed
- model synthesis

Output:

- markdown research artifact
- source list
- belief candidates with confidence

Policy:

- blocked when web research permission is disabled
- consumes worker and tool budget

### execution_plan

Purpose: convert a goal into a concrete plan.

Inputs:

- room goal
- constraints
- current artifacts
- relevant beliefs

Output:

- markdown plan artifact
- task breakdown
- blocked assumptions

Verifier:

- plan addresses the active goal
- plan preserves explicit constraints
- plan names next actions

### reviewer

Purpose: inspect artifacts for missing constraints, stale claims, unsupported conclusions, and unsafe promises.

Output:

- review artifact
- pass or fail status
- required fixes

### memory_consolidator

Purpose: turn repeated failures, user corrections, and trace evidence into durable memory and regression tests.

Output:

- updated belief entries
- playbook changes
- eval cases

## Rule

If a capability cannot be described with an input, permission, output, and verifier, it is not ready to be scheduled as a skill.
