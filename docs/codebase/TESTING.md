# Testing

## What you can run, in full

```bash
node .tours/validate.mjs
```

That is the entire automated surface of this repository. It checks that every
step of every guided tour in `.tours/` still points at a file that exists and a
line that exists in it. It exits non-zero and names the offending step when a
reference has drifted.

It is deliberately narrow. It proves the tours are honest. It proves nothing
about whether the documents are any good.

## The checks that are commands, not scripts

Two properties matter enough to verify but not enough to script. Both are one
line, so they live here rather than in a file that would need maintaining.

**Every relative link resolves** — the failure a reader meets first:

```bash
for f in $(git ls-files '*.md'); do d=$(dirname "$f"); \
  for l in $(grep -o '](\([^)#]*\.md\)[^)]*)' "$f" | sed 's/](\([^)#]*\.md\).*/\1/'); do \
    [ -f "$d/$l" ] || echo "BROKEN: $f -> $l"; done; done
```

Expected output: nothing. 38 links checked.

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
