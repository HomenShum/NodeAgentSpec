# Product goal — NodeAgentSpec

## Who opens this, and what they are trying to finish

Someone has built an assistant that can call tools, and it demos well. In real
use it keeps losing things. A person asks it to do three jobs at once and two of
them quietly disappear. Someone hits cancel and the work carries on anyway. It
announces that it booked the room, and nobody — not the user, not the engineer
reading the logs afterwards — can tell whether it actually did. The person
opening this repo is the engineer who has to fix that, and their problem is that
they cannot yet write down what "working" would even mean: which things the
system is supposed to remember, which it must show on screen, and which it must
refuse to do without asking. They arrive wanting that definition in writing so
they can tell a system that works from one that merely looked like it did. What
they walk away holding is a set of plain documents copied into their own repo
and edited to fit their product — a statement of how the agent is allowed to
behave, a named shape for the state it must keep, a fixed vocabulary for the
events it must log, and a checklist to run before anyone says it is ready — plus
blank forms for writing down their own capabilities, background jobs, and tests.
Nothing here runs. It is a stack of paper you fill in, not a program you install
(a markdown specification pack, not a library).

## The gate

This repo is judged by the twelve-condition PROMOTION gate, which lives in one
place and is not restated here:

**https://github.com/HomenShum/NodeKit/blob/main/templates/promotion/GATE.md**

Gate variant: `reduced` <!-- reduced = library/CLI judged on its demo
surface and quickstart; see the GATE's reduced-gate section -->

Scoring vocabulary is PASS / FAIL / **UNVERIFIED**, and UNVERIFIED is never PASS.

**What the reduced gate is pointed at here.** This repo ships 27 markdown files
and zero lines of code — no package manifest, no test runner, no build, no
server, no demo application. Its entire user-facing surface is the README and
the 20 documents it links, as GitHub renders them. Conditions that ask about
application layout, runtime states, or performance have no surface of this
repo's own to land on; that is recorded as the reason on each row rather than
waved through.

## Canonical journeys

The work queue lives in [PRODUCT_JOURNEYS.md](PRODUCT_JOURNEYS.md). A journey
without browser evidence is unfinished, however green the tests are.

## Loop state

Every iteration is recorded in [PROMOTION_LOG.md](PROMOTION_LOG.md) — journey
exercised, defect fixed, evidence path, conditions newly passing. Loop state
lives in git, never in an agent's memory, so any agent can resume the loop cold.

## Current scorecard

Baseline measured 2026-08-13 against commit `5f17b04` on `main`.

| # | Condition | Status | Evidence / reason |
|---|-----------|--------|-------------------|
| 1 | Journeys succeed end-to-end in a real browser | UNVERIFIED | J1 and J2 observed working in the rendered page (README at 1280px and 375px; File Map 20 rows; `soul.md` navigated, `h1` = "Soul", 2,639 chars rendered). J3–J5 are offline authoring workflows with no observable completion state, so "all journeys" was never observed. |
| 2 | No critical or major usability defect open | FAIL | D1 open: README "How To Use" step 7 says "Run the tests from `evals.md` and `readiness.md`", and neither file contains a runnable test. Repro in PROMOTION_LOG.md. |
| 3 | Mobile and desktop both intentional | UNVERIFIED | Repo authors no layout of its own — every pixel is GitHub.com's chrome. Content reflowed cleanly at both widths, but clean is not evidence of intent, and auditing GitHub's design would not be auditing this product. |
| 4 | No horizontal overflow at supported widths | UNVERIFIED | Measured 0 overflow at 375×812 and 1280px, probe not retained. The numbers were real — 375×812: `documentElement.scrollWidth` 375 == `clientWidth` 375, zero elements past the viewport, File Map table 309px, code blocks no scroll; 1280px: `scrollWidth` 1265 == `clientWidth` 1265, table 567px, code blocks 823px/234px — but they exist only as prose here. No output is committed under `promotion/evidence/` and no producer that re-runs the measurement is committed, so nobody cloning this repo can re-measure it. Prose numbers are not an artifact; the row does not qualify as PASS. This repo is documentation-only and owns no test runner to host such a probe, so retaining one is a product decision, not a scorecard fix. |
| 5 | Loading/empty/success/error/agent-running designed | UNVERIFIED | Product is static documents; it has no runtime and therefore no such states to design. Nothing was observed either way. |
| 6 | Keyboard and basic accessibility pass | UNVERIFIED | No accessibility audit was run this wave. |
| 7 | Web Interface Guidelines: no major unresolved | UNVERIFIED | Review not run this wave. |
| 8 | Web-quality audit: no major unresolved | UNVERIFIED | No Lighthouse or Core Web Vitals run. Any score collected would measure GitHub.com's page, not this repo. |
| 9 | No unexplained console errors or failed requests | UNVERIFIED | The console recorder attached after page load and captured nothing across the journey loads, so there is no coverage to judge. Two anomalies seen and both explained: 7× HTTP 429 caused by my own rapid link-check loop, and one transient mermaid render failure that the control repo also exhibited (see log). |
| 10 | Performance does not obstruct interaction | UNVERIFIED | Not measured. |
| 11 | Tests and build green | UNVERIFIED | Nothing to run, so nothing was observed green. `npm ci` exit 1 (no lockfile), `npm test` exit 127 (no package.json), `npm run build` exit 127 (no package.json), `pytest -q` exit 5 (no tests collected). |
| 12 | Verified in the rendered app, not inferred from code | UNVERIFIED | This wave is a baseline and made no product improvements, so there is nothing whose verification could be checked. |

**Status: NOT PROMOTED** — 0/12 PASS, 1 FAIL, 11 UNVERIFIED.

Condition 4 was published as PASS on 2026-08-13 and corrected to UNVERIFIED the
same day; the original claim and the reason it did not qualify are recorded under
"Correction — 2026-08-13" in [PROMOTION_LOG.md](PROMOTION_LOG.md).
