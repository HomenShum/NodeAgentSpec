# Integrations

## There are none

No API is called, no service is authenticated against, no key is read, no network
request is made. The repository has no manifest to declare a dependency in and no
code that could make a call. If you are looking for where credentials are
configured, the answer is nowhere, and that is permanent rather than pending.

## What the repository nonetheless depends on

Three things it does not control, none of which are integrations in the usual
sense:

| Dependency | Used for | What breaks if it changes |
|---|---|---|
| GitHub markdown rendering | how every reader sees the product | layout and link behaviour |
| GitHub's mermaid renderer | the five ```` ```mermaid ```` diagrams | diagrams appear as raw source |
| Node 18+ standard library | `.tours/validate.mjs` | the tour check stops running |

The mermaid dependency has already caused a scare worth knowing about. During the
promotion baseline the diagram in `README.md` rendered as raw `flowchart TB`
source instead of a picture, and it looked like a defect in this repository. It
was checked against a control — `github.com/mermaid-js/mermaid` failed the same
way on one of its own diagrams in the same session — and on reload it rendered
correctly twice. It is a transient failure in GitHub's renderer, affecting
mermaid generally. `promotion/PROMOTION_LOG.md` records it under "Not a defect"
specifically so the next reader does not re-raise it.

## Integrations the pack tells the reader to build

The documents specify integration points for the reader's own system. None of
them exist here:

- **Tools** — `world.md` `## Tool` requires every external capability to declare
  an input contract, output contract, permission class, cost class, failure class
  and audit requirement.
- **Permission gates** — `permissions.md` puts email, deploys, purchases, pull
  requests and production data edits behind an explicit approval record.
- **Research sources** — `skills.md` `### web_research` requires sources to be
  preserved on the artifact.
- **Traces** — `trace-schema.md` `### Tool` defines `tool_call_started`,
  `tool_call_completed`, `tool_call_failed`.

## Borrowed expertise

`promotion/SKILLS.md` pins four external authorities used when judging this
repository — Anthropic `frontend-design`, the Vercel Web Interface Guidelines,
Addy Osmani's `web-quality-skills`, and Playwright / Chrome DevTools. They are
referenced, never vendored, on the stated grounds that a vendored copy is a fork
that stops receiving fixes. They apply to the promotion process, not to the pack.
