# Collaboration

Agent OS rooms coordinate humans, agents, devices, and workers through shared state.

Collaboration fails when each participant reacts only to local transcript. It works when all participants read and write the same room state.

## Participants

### Humans

Humans provide authority, goals, corrections, and approval.

### Foreground Agents

Foreground agents speak, ask questions, and explain state.

### Background Workers

Background workers perform bounded tasks and produce artifacts.

### Devices

Devices are windows into the room. A phone and laptop should see the same state.

## Room Coordination

The room owns:

- floor control
- active goal
- turn state
- count state where relevant
- worker state
- policy state
- traces

Agents may speak only within the room's constraints.

## Joining

When a participant joins:

- create a visible join event
- assign identity or slot
- sync current room state
- show the participant list

## Leaving

When a participant leaves:

- create a visible leave event where useful
- preserve room state
- do not delete artifacts or goals
- reassign floor if needed

## Multi-Device Rule

No device should own hidden state that changes behavior.

Phone and laptop should agree on:

- active version
- goal
- running state
- policy
- workers
- artifacts
- traces

## Multi-Agent Rule

Each added agent should have:

- identity
- role or lane
- turn order participation
- policy boundary
- visible status

## Rule

Physical co-presence is not computational co-presence. The room is the shared computation.
