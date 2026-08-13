# Stack

## The short version

There is no stack. This repository is markdown files in a git repository, read on
GitHub or in a text editor.

That is not a gap to be filled later. The product is a set of documents a reader
copies into their own repository and edits; a build step would make it something
else.

## What is actually here

| Thing | Value | How to check |
|---|---|---|
| Languages | Markdown only | `git ls-files \| grep -v '\.md$'` → one file, `.tours/validate.mjs` |
| Package manifest | none | `ls package.json` → not found |
| Lockfile | none | `ls package-lock.json` → not found |
| Build step | none | nothing to build |
| Runtime dependencies | 0 | there is no manifest to declare any |
| Dev dependencies | 0 | the one script uses Node's standard library only |
| Test runner | none | see [TESTING.md](TESTING.md) |
| CI | none | `ls .github/workflows` → not found |

## The one executable file

`.tours/validate.mjs` — 71 lines of Node, no dependencies, no install.
It checks that every step in the guided tours still points at a line that exists.
It was added in the human-readiness wave because the tours are only useful if
their line references are true, and a claim that they are true is not evidence.

```bash
node .tours/validate.mjs
```

Node 18 or newer. Nothing else is required to use this repository.

## Fenced code blocks are illustrations, not source

Several documents contain ```` ```ts ```` blocks defining types (`Goal`,
`WorkerRun`, `Artifact`, `Belief`, `TraceEvent`, `World`, `AgentOsPolicy`,
`PermissionState`). These are TypeScript-shaped because TypeScript reads clearly,
not because the reader must use TypeScript. Nothing compiles them. The pack is
framework-neutral by design and states so in `README.md`.

The ```` ```mermaid ```` blocks in `README.md`, `loop.md`, `goals.md`,
`workers.md` and `artifact.md` are rendered by GitHub itself. No diagram tooling
is vendored.
