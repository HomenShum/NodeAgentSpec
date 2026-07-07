# World Model

An Agent OS needs a world model because agents do not operate inside text alone. They operate across people, devices, tools, time, permissions, memory, and external reality.

## Core Entities

### Human

A human can:

- set goals
- add constraints
- correct state
- approve side effects
- interrupt work
- inspect internal state
- decide when output is useful

The human is not just another message source. The human is the authority boundary.

### Agent

An agent can:

- speak in the foreground
- interpret user steering
- coordinate work
- call tools through the harness
- produce artifacts
- update beliefs through approved writes

An agent should not silently mutate durable state without trace evidence.

### Room

A room is the shared operating state.

It contains:

- participants
- active goal
- goal graph
- task graph
- worker runs
- artifacts
- beliefs
- policy
- traces
- transcript

The room is the computational place where humans and agents are actually together.

### Device

A device is an interface into the room.

Examples:

- laptop browser
- phone browser
- voice client
- CLI client
- background worker

Devices should not own authority. They read and write through room state.

### Tool

A tool is an external capability that may read or change the world.

Tools have:

- input contract
- output contract
- permission class
- cost class
- failure class
- audit requirements

### Artifact

An artifact is durable output that outlives the transcript.

Examples:

- memo
- plan
- report
- code patch
- chart
- dataset
- decision log
- eval result

### Belief

A belief is a claim the system may use later.

Beliefs require:

- claim
- source
- confidence
- timestamp
- scope
- invalidation condition where possible

## World State

```ts
type World = {
  humans: Human[];
  agents: Agent[];
  devices: Device[];
  tools: Tool[];
  beliefs: Belief[];
  artifacts: Artifact[];
  risks: Risk[];
  constraints: Constraint[];
};
```

## Time

Agents must model time explicitly.

Relevant time fields:

- createdAt
- updatedAt
- startedAt
- completedAt
- expiresAt
- lastVerifiedAt

Facts that change over time should not be treated as permanent memory.

## Environment

The environment includes:

- runtime capabilities
- network access
- file access
- credentials
- model availability
- browser state
- deployment state
- user locale
- current date

The harness should expose environment facts as state, not as hidden assumptions.

## Missing World Model Symptoms

- user asks a new goal and the old goal is overwritten accidentally
- agents claim current facts without research
- workers keep running after cancellation
- phone and laptop disagree about state
- the UI shows transcript but not internal state
- a failed tool call erases the user steer
- the model says "done" but no artifact exists

## Rule

If it matters to whether the agent should act, it belongs in the world model or the policy model.
