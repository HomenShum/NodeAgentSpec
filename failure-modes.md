# Failure Modes

Agent systems fail in repeatable ways. Name the failures so the harness can prevent them.

## Transcript-Only Failure

Symptom:

- agents react to words but do not share state

Fix:

- server-authoritative room state
- reducer-owned progress

## Lost Steer

Symptom:

- user interruption appears in transcript but does not change state

Fix:

- persist raw input
- classify typed intent
- commit state transition before scheduling next work

## Fake Done

Symptom:

- model says work is done but artifact or verifier is missing

Fix:

- require completion evidence
- ignore model `done` unless reducer agrees

## Stale Commit

Symptom:

- old worker commits after user retargeted, canceled, or retried

Fix:

- revalidate worker status before commit
- use run tokens or attempt ids

## Approval Hijack

Symptom:

- "that sounds good" becomes the new goal

Fix:

- classify approval separately from goal creation

## Negation Bug

Symptom:

- "do not count to ten, count to twenty" chooses ten

Fix:

- parse negated spans
- prefer explicit corrective clause

## Hidden Cap

Symptom:

- room silently stops because a turn or worker cap was reached

Fix:

- expose caps as policy
- mark blocked state

## Tool Permission Leak

Symptom:

- agent performs external action without clear approval

Fix:

- executable permission gate
- approval record
- side-effect trace

## Infinite Scroll UI

Symptom:

- long agent runs make the entire page grow without bound

Fix:

- bounded panels
- virtualized transcript
- explicit artifact summaries

## Rule

Every serious failure should become a trace event, an eval, and a playbook update.
