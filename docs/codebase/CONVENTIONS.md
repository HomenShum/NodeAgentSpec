# Conventions

Observed from the files themselves, not invented here. `CONTRIBUTING.md` states
the intent; this records what the pack actually does.

## Document shape

Every one of the twenty documents follows the same skeleton:

```md
# Title

One or two sentences saying what this owns and why it is separate.

## Section
...

## Rule

One sentence a reader could quote from memory.
```

The closing `## Rule` is the strongest convention in the pack — all twenty have
one, and they are written to be memorable rather than complete:

- `memory.md` — "If memory cannot name its source, it is not memory. It is model residue."
- `harness.md` — "The harness owns truth. The model owns proposals."
- `visibility.md` — "If users cannot inspect the system, they cannot steer it."
- `interrupts.md` — "Human interruption is not exceptional. It is the control plane."

A duplicate detector flags these footers as cloned because they share a shape.
That is the convention working, not a defect; see
[SIMPLIFICATION_REPORT.md](../SIMPLIFICATION_REPORT.md).

## Prose style

- Short declarative sentences. Contracts and checklists over paragraphs.
- Bulleted lists of concrete items, rarely more than about eight.
- Second person for the reader's actions, third person for the system's.
- No vendor names, no framework names, no code samples tied to one runtime. The
  pack states it is framework-neutral and holds to it.
- Failures are named as symptom plus fix, never as warnings alone.

## Types

Illustrative ```` ```ts ```` blocks. Conventions in them:

- `id: string` on every entity.
- `createdAt: number` / `updatedAt: number` — epoch milliseconds, not `Date`.
- Optional fields marked `?` and genuinely optional (`retryOf?`, `expiresAt?`).
- Status as a string-literal union, never an enum or booleans:
  `"queued" | "running" | "completed" | "failed" | "blocked" | "canceled"`.
- American spelling of `canceled` in code, one `l`. Prose uses both spellings;
  the type is the one that matters.

## Naming

- Files: lowercase, single word, named for the concept owned. `promotion/` and
  `docs/` use `SCREAMING_CASE.md` because they are process records, not pack content.
- Trace events: `snake_case`, `noun_verb-past-tense` — `worker_scheduled`,
  `goal_replaced`, `artifact_merged`. All defined in `trace-schema.md` only.
- Types: `PascalCase`. Fields: `camelCase`.

## Single-source rule

A concept is defined in exactly one file; every other mention links to it. This
is the convention most easily broken by well-meaning additions, and breaking it
was the main finding of the human-readiness wave. Before adding a definition,
check it is not already owned elsewhere:

```bash
grep -rn "^type YourType" --include=*.md .
```

## Cross-links

Relative markdown links rather than absolute URLs, so they work on GitHub, in
an editor, and in a reader's own repository after copying. All of them resolve;
count them and check them with the two commands in [TESTING.md](TESTING.md).
The count is written down in one place only, because two copies of a number is
how the old one went stale in both.
