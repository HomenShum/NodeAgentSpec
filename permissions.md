# Permissions

Permissions define what the system may do without asking, what requires approval, and what is forbidden.

They should be explicit room state, visible to the user, and checked before tools run.

## Permission Classes

### Read-Only Internal

Allowed by default:

- inspect room state
- read local artifacts
- summarize transcript
- run deterministic reducers
- run local validation

### Read-Only External

Usually allowed only when web or external research permission is enabled:

- web search
- public documentation lookup
- pricing lookup
- current market research

### Local Write

Requires clear task authority:

- write artifacts
- edit repo files in a workspace
- generate reports
- create local test files

### External Side Effect

Requires explicit approval:

- send email
- post message
- purchase
- deploy
- change permissions
- create public repo
- open pull request
- edit production data

### Forbidden

Never allowed:

- exfiltrate secrets
- bypass access controls
- forge user approval
- hide actions from traces
- commit stale canceled work

## Permission State

```ts
type PermissionState = {
  webResearch: boolean;
  externalActions: boolean;
  filesystemWrites: "none" | "workspace" | "approved";
  deployments: "none" | "approved";
  spendingLimitUsd?: number;
};
```

## Approval Record

External actions should write an approval record:

- who approved
- what was approved
- destination
- payload summary
- timestamp
- expiration

## Permission Failure

If permission is missing:

1. Do not run the tool.
2. Mark worker blocked.
3. Show the reason.
4. Offer retry after permission changes.

## Rule

Permission is not a prompt instruction. It is executable state.
