# Testing

## What you can run, in full

```bash
node .tours/validate.mjs
```

That is the entire automated surface of this repository. It checks two sets of
citations and exits non-zero naming each bad one:

- **Guided tours.** Every step in `.tours/` carries a `pattern` — the heading or
  type declaration it is about. The check is that the cited line *matches that
  pattern*, not merely that the line exists. A line-range check alone proves the
  anchor is stable and never that it is correct: insert a paragraph above a
  section, and a step now pointing at the wrong heading still passes. That was
  concern C7, and it was real — hardening this check immediately caught two
  README steps that had drifted onto a table row and a bullet.
- **`../START_HERE.md` stages.** Each stage cites files and `## Symbol`
  headings rather than line numbers. The check is that every cited file exists
  and every cited heading is a real heading in one of them.

It is deliberately narrow. It proves the citations are honest. It proves nothing
about whether the documents are any good.

## The checks that are commands, not scripts

Three properties matter enough to verify but not enough to script. Each is one
line, so they live here rather than in a file that would need maintaining.

**Every relative link resolves** — the failure a reader meets first:

```bash
for f in $(git ls-files '*.md'); do d=$(dirname "$f"); \
  for l in $(grep -o '](\([^)#]*\.md\)[^)]*)' "$f" | sed 's/](\([^)#]*\.md\).*/\1/'); do \
    [ -f "$d/$l" ] || echo "BROKEN: $f -> $l"; done; done
```

Expected output: nothing.

The count of links that loop checked is its own one-liner, so the number below is
reproducible rather than remembered — a hand-kept count is how this file came to
claim 38 links long after there were more:

```bash
git ls-files '*.md' | xargs grep -o '](\([^)#]*\.md\)[^)]*)' | wc -l
```

Expected output: 62.

**No type is defined twice** — the single-source rule from
[CONVENTIONS.md](CONVENTIONS.md):

```bash
grep -rh "^type [A-Z]" --include=*.md . | sed 's/type \([A-Za-z]*\).*/\1/' | sort | uniq -d
```

Expected output: nothing. A name printed here means two documents define the same
type and a reader cannot tell which to copy — the exact defect this wave removed
from `WorkerRun`.

## What does not exist, and will not

```
npm test        -> 127, no package.json
npm ci          -> 1, no package-lock.json
npm run build   -> 127, no package.json
pytest -q       -> 5, no tests collected
```

These are recorded because a newcomer will try them. They are not missing
infrastructure. There is no code to unit-test; a test suite here would test
prose.

## The tests the pack is actually about

`evals.md` and `readiness.md` read like test documents and are the most commonly
misread files in the repository. **They test the reader's agent system. They do
not test this repository, and nothing in this repository can run them.**

- `evals.md` names three capability tests — *Count To N*, *Interrupt Retarget*,
  *Parallel Goal* — each with the failure it catches.
- `readiness.md` is 38 checklist lines across seven sections, ending with Honesty
  Readiness.
- `templates/eval-template.md` is the form for recording one run, with separate
  Expected State and Observed State sections. Filling Observed State from what the
  system was supposed to do, rather than from what it did, is the failure that
  section split exists to prevent.

`README.md` step 7 previously read "Run the tests from `evals.md` and
`readiness.md`", which a first-time reader reasonably took as a command to run
here. That was logged as defect D1 and the wording now says whose system is under
test.

## Manual check before publishing a change

The six ```` ```mermaid ```` blocks (`README.md`, `loop.md`, `goals.md`,
`workers.md`, `artifact.md`, `docs/codebase/ARCHITECTURE.md`) render server-side
by GitHub and cannot be verified locally. Open the file on GitHub after pushing. If a diagram shows as raw source,
reload before reporting it — see the transient-renderer note in
[INTEGRATIONS.md](INTEGRATIONS.md).
