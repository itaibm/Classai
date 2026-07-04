# Standards Crosswalk — UK NC ↔ US CCSS / NGSS ↔ IB PYP

This folder makes the Classai knowledge base **curriculum-agnostic**. The subject content (`../subjects/`) is written against the **UK National Curriculum** for ages 5–11, but the underlying concept *progressions* — count → place value → operations → fractions; phonics → fluency → comprehension; pushes-and-pulls → forces → energy — are the same everywhere. These crosswalk tables let the tutor teach the same progression and **label it with whichever standard the family follows**, so a US parent sees "CCSS.MATH.CONTENT.3.NF.A.1", a UK parent sees "Year 3 fractions", and an IB family sees "PYP Maths, Number, Phase 3".

## What this is (and is not)

- **It is** a mapping of *concepts to standard codes and grade/year placements* across four frameworks, so any Classai topic can be anchored to a parent's home standard.
- **It is not** a claim that the frameworks are identical. They differ in **sequence, emphasis, and timing** (e.g. UK introduces formal column methods and times-tables earlier than US CCSS; US CCSS delays some fraction work; IB PYP is inquiry-driven and refuses to fix content to ages). Where they diverge, the tables say so.
- Codes here have been **verified against the official sources** (corestandards.org / thecorestandards.org, nextgenscience.org, ibo.org). Anything not directly confirmed is marked **"approx."** — never invented.

## The four frameworks compared

| Framework | Region | Structure | Ages 5–11 covered by |
|-----------|--------|-----------|----------------------|
| **UK National Curriculum (NC)** | England | Statutory programmes of study by **Year group** (Y1–Y6), grouped into **Key Stages**: KS1 = Y1–Y2, KS2 = Y3–Y6. Reception (age 4–5) is EYFS, pre-NC. | **Years 1–6** |
| **US Common Core (CCSS)** | Most US states | Content standards by **Grade** (K, 1–8) with **domains/strands**. Maths: `CCSS.MATH.CONTENT.<grade>.<domain>.<cluster>.<n>`. ELA: `CCSS.ELA-LITERACY.<strand>.<grade>.<n>`. (Maths & ELA only — no CCSS for science.) | **Kindergarten + Grades 1–5** |
| **US NGSS** (science) | Many US states | Grade-specific **Performance Expectations** K–5, coded `<grade>-<discipline><topic>-<n>` (e.g. `3-LS1-1`). | **Kindergarten + Grades 1–5** |
| **IB PYP** | International | Transdisciplinary, **inquiry-based**; learning organised into **developmental phases** (not fixed grades) and 6 themes. No discrete content-standard codes. | **PYP, ages 3–12** (the 5–11 part) |

## The UK Year ↔ US Grade age offset (read this carefully)

**The single biggest trap in any UK↔US crosswalk is the ~1-year label offset.** US grade *numbers* run roughly one ahead of UK Year *numbers* for the same content age, because the two systems start formal schooling at different points and label years differently.

| Child's age (Sept start) | UK National Curriculum | US Grade | Key Stage / band |
|--------------------------|------------------------|----------|------------------|
| 4–5 | Reception (EYFS) | (Pre-K / start of Kindergarten) | EYFS |
| **5–6** | **Year 1** | **Kindergarten** (overlaps Grade 1) | KS1 |
| **6–7** | **Year 2** | **Grade 1** | KS1 |
| **7–8** | **Year 3** | **Grade 2** | KS2 |
| **8–9** | **Year 4** | **Grade 3** | KS2 |
| **9–10** | **Year 5** | **Grade 4** | KS2 |
| **10–11** | **Year 6** | **Grade 5** | KS2 |
| 11–12 | Year 7 (secondary) | Grade 6 | KS3 |

**Rule of thumb: US Grade number ≈ UK Year number − 1** (Year 3 ≈ Grade 2; Year 6 ≈ Grade 5).

**But there are two important wrinkles:**

1. **It is an age-label offset, not a content offset.** US CCSS is, in places, *less* accelerated than UK NC — it pushes some content (formal multiplication, some fractions) into later grades than the bare age-offset would suggest. So in the maths tables you will often see a UK Year matched to a CCSS code that is **one or even two grades "higher"** than the naive `Year − 1` would give. Example: UK **Year 4** (age 8–9) covers all times tables to 12×12, but the CCSS fluency-and-multi-digit-multiplication work that matches it sits in **Grade 4** (4.NBT.B.5), not Grade 3. **Trust the per-concept code in the tables over the rule of thumb.**

2. **The cutoff month differs** (England: Sept 1; many US states: a summer/fall cutoff that varies by state), so the alignment is approximate at the edges. Treat the offset as "±1 year", not exact.

## How IB PYP phases map (approx.)

IB **deliberately does not bind phases to fixed ages** — a learner can be in different phases for different strands. As a rough planning guide only (*approx., not official*):

| PYP phase | Approx. age | Approx. UK Year | Approx. US Grade |
|-----------|-------------|------------------|-------------------|
| Phase 1 | 3–5 | EYFS / pre-Y1 | Pre-K / K |
| Phase 2 | 5–7 | Y1–Y2 | K–Grade 1 |
| Phase 3 | 7–9 | Y3–Y4 | Grades 2–3 |
| Phase 4 | 9–11 | Y5–Y6 | Grades 4–5 |
| Phase 5 (**Language only**) | 11–12 | Y6–Y7 | Grade 5–6 |

- **IB Language scope & sequence has 5 phases; IB Mathematics has 4 phases.** (Verified — they are not the same count.)
- IB PYP science is **not a standalone subject**; it is integrated into the programme of inquiry, most strongly under the theme **"How the world works"** (and "Sharing the planet" for living systems/environment).

## How to use these maps to teach to any standard

1. **Find the Classai topic** in `../subjects/<subject>/year-N.md`. Its UK Year is its native anchor.
2. **Open the matching progression file** here and find the concept row.
3. **Read across** to the parent's framework column to get the equivalent code/phase:
   - US family on CCSS/NGSS → quote the verified code (e.g. `3.NF.A.1`, `3-LS1-1`).
   - IB family → quote the PYP strand + phase (e.g. "Number, Phase 3").
4. **Respect the offset.** When a US parent says "my child is in Grade 3", that is UK **Year 4** content (age 8–9) — pull the Year 4 topic, not Year 3.
5. **When frameworks disagree on timing, follow the child, not the label.** The progressions are ordered by *concept readiness*; teach the next concept the learner is ready for and tag it with whatever code the family recognises.

## Files in this folder

- `README.md` — this overview.
- `maths-progressions.md` — number & place value, operations, fractions/decimals/%, measurement, geometry, statistics, ratio/early algebra.
- `english-literacy-progressions.md` — reading (phonics→fluency→comprehension), writing, grammar/spelling, speaking & listening.
- `science-progressions.md` — biology/chemistry/physics/earth & space + working scientifically.
- `humanities-and-other-progressions.md` — history, geography, the arts, computing, world languages, PSHE/life-skills (a lighter cross-reference; these are far less standardised internationally).

## Sources verified

All codes confirmed against official sources in June 2026:
- **CCSS Maths & ELA:** thecorestandards.org / corestandards.org (official Common Core State Standards Initiative).
- **NGSS:** nextgenscience.org (Performance Expectations, DCI arrangements, Appendix F practices).
- **IB PYP:** ibo.org (programme framework, themes) + IB PYP Language and Mathematics scope-and-sequence documents.
- **UK NC:** the statutory programmes of study underlying `../subjects/` (gov.uk / DfE).

Where a leaf code could not be read directly off the official page, it is the canonical, well-established code for that domain/grade and is flagged in the relevant file.
