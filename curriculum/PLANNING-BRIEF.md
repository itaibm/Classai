# Curriculum Planning Brief — the full-year plan standard

> The standard every year's **scope & sequence** must meet. Read
> [`../SCHOOL-CHARTER.md`](../SCHOOL-CHARTER.md) first; this brief turns the charter into a
> concrete, checkable spec. The review that motivated it: [`../docs/REVIEW-2026-09.md`](../docs/REVIEW-2026-09.md) §4.

## 1. Years and ages (re-anchored 2026-09)

| Folder | Label | Ages | UK equiv. | US equiv. |
|---|---|---|---|---|
| `year-0` | **Foundation** (optional catch-up) | 5–6 | Year 1 | K/Grade 1 |
| `year-1` | Year 1 | 6–7 | Year 2 | Grade 1 |
| `year-2` | Year 2 | 7–8 | Year 3 | Grade 2 |
| `year-3` | Year 3 | 8–9 | Year 4 | Grade 3 |
| `year-4` | Year 4 | 9–10 | Year 5 | Grade 4 |
| `year-5` | Year 5 | 10–11 | Year 6 | Grade 5 |
| `year-6` | Year 6 | 11–12 | Year 7 | Grade 6 |

`knowledge-base/subjects/*/year-N.md` keep **UK** year numbers (they are a standards
reference): our Year N draws on the knowledge base's UK Year N+1.

## 2. Subjects — one folder each, every year 1–6

| Folder | Subject | Lessons / year | Per week (36 wks) |
|---|---|---|---|
| `maths` | Mathematics | **170** | 5 |
| `english` | English — reading, phonics (Y1–2), writing, handwriting, speaking, vocabulary, grammar | **170** | 5 |
| `science` | Science | **70** | 2 |
| `history` | History | **35** | 1 |
| `geography` | Geography | **35** | 1 |
| `languages` | World language (Spanish by default — swappable, see §5) | **70** | 2 |
| `art-design` | Art & Design | **35** | 1 |
| `music` | Music | **35** | 1 |
| `pe-health` | Physical Education & Health | **70** | 2 |
| `computing` | Computing / Digital literacy | **35** | 1 |
| `life-skills` | SEL & character, money sense, sustainability, global citizenship | **35** | 1 |

Counts are targets (±5%). They include retrieval, fluency, consolidation, assessment and
project lessons — a real year, not a list of topics. `history-geography/` is retired (it
duplicated `history/` + `geography/`).

## 3. File format — exact, because the app parses it

One file per subject: `curriculum/year-N/<folder>/<folder>-year-N.md`. The parser is
`server/src/services/curriculum-scope.ts`. Headings and bold field names must match
exactly (em dash `—` after Unit/Lesson numbers):

```markdown
# Year N <Subject> (ages A–B) — Scope & Sequence

## Year overview
<prose: the big picture, how units sequence, what builds on the year before, what the next year relies on>

## Time budget
<table: units × weeks × lessons, totalling the target>

---

## Unit 1 — <Title>

**Essential question:** <question>

**Key vocabulary:** <comma-separated>

### Lesson 1 — <Title>
- **Duration:** <minutes> min
- **Objective:** "By the end, I can <observable thing>." (<standard code, e.g. UK NC Y2 Nf / CCSS 1.NBT.2>)
- **Hook:** <one line that creates curiosity>
- **Key activity:** <the doing — concrete → pictorial → abstract where it applies; I do → we do → you do>
- **Check for understanding:** <a question that needs understanding, not recall> → <expected answer>
- **Differentiation:** support: <…> / stretch: <…>
- **Materials:** <physical manipulatives, texts, props — specific>
- **Joy:** <the element a child would be excited to do>

**End-of-unit check:** <a short mastery task>

## Books & resources
<named books/resources with author and a one-line WHY it's the best choice>

## End-of-year mastery checks
<the 5–10 things a child must be able to do, with how you'd see it>

## Teacher guidance
<common misconceptions, what to watch for, how the year connects vertically>
```

Rules:
- Lessons are numbered **continuously** through the file (1…170), not per unit.
- Every lesson has **all eight fields**. Durations: 20–30 min for Years 1–2, 25–40 for 3–4, 30–45 for 5–6.
- Extra `##` sections (Books, mastery checks, guidance) must come **after the last unit**
  and must not start with `Unit`.
- Check the file parses — from the repo root:
  `node --import tsx -e "import {parseScopeFile} from './server/src/services/curriculum-scope.ts'; import fs from 'node:fs'; const p=parseScopeFile(fs.readFileSync(process.argv[1],'utf8')); const ls=p.units.flatMap(u=>u.lessons); console.log(p.units.length,'units',ls.length,'lessons', ls.filter(l=>!l.objective||!l.check||!l.keyActivity).length,'incomplete')" curriculum/year-N/maths/maths-year-N.md`

## 4. The quality bar (every file)

1. **Mastery over coverage.** Big ideas get several lessons (introduce → practise → apply →
   retrieve), never one. Each unit ends with a mastery check; each term has retrieval lessons.
2. **Vertical alignment.** Read the year below and above before writing. State in the overview
   what this year assumes and what the next year relies on. No gaps, no repeats.
3. **Checks test understanding.** "Explain why…", "Which is wrong and why?", "Show me with…" —
   not bare recall ("Who flew first?" → "1903" is not acceptable).
4. **Differentiation is real.** Support is genuinely easier (more concrete); stretch genuinely
   harder (not the same difficulty — "12 + 23 + 14" is not a stretch for regrouping).
5. **Concrete materials are named.** Maths: every lesson names manipulatives (base-10, Cuisenaire,
   counters, fraction strips, clocks, coins, rulers, scales…). Science: real investigations.
6. **International and inclusive.** Examples, people, places and books from many cultures and
   continents. No UK-only framing (no "SATs", "pounds only", "Great Fire of London as the only
   history"); where a topic is local, make it "your own town/country" with a worked example.
7. **Facts are exactly right.** Rule edge cases stated (e.g. y→i only after a consonant;
   5:40 is a correct time). When unsure, choose a formulation that is unambiguously true.
8. **Joy is concrete** — a game, a make, a mystery, a performance — not "fun activity".

## 5. Subject spines

- **Maths** — mastery sequencing in the Singapore / Maths-No-Problem tradition: CPA every
  lesson; bar models from Year 2; fluency lessons (number facts, times tables by end of Year 3);
  reasoning and problem-solving each unit. Year 6 (ages 11–12) = UK Y7 / US Grade 6: ratio &
  proportion, negative numbers, algebraic expressions & equations, area/volume, statistics.
- **English** — Years 1–2: **systematic synthetic phonics** consolidation (Phase 5 alternatives
  → Phase 6 spelling) taught explicitly with **decodable texts**, daily reading fluency, handwriting
  (joined from Year 2). All years: a **named class-text spine** (2–3 whole books per term, with
  author + why), poetry every term, reading volume, writing genres taught through the texts
  (not grammar-test drills — grammar is taught in service of writing), speaking & listening,
  vocabulary. Year 6: novels, persuasive/argument writing, analysis, research.
- **Science** — biology, chemistry, physics, earth & space every year; working scientifically
  (question → predict → fair test → measure → conclude) in every unit; real investigations.
- **History** — chronology and interpretation; world history from several continents; sources
  and evidence; "how do we know?" every unit.
- **Geography** — maps & fieldwork every year; physical + human; every continent across the
  spine; sustainability; local area study adaptable to any country.
- **Languages** — Spanish from Year 1 (songs, phonics of Spanish, speaking first) to simple
  paragraphs by Year 6. Note in the overview that another language (e.g. Hebrew or French —
  see `knowledge-base/subjects/hebrew`, `french`) can replace it with the same structure.
- **Art & Design** — named artists from many cultures each unit; techniques build (drawing,
  colour, print, clay, textiles, digital); **assessment by looking at and discussing the work**,
  not quizzes.
- **Music** — listening (named pieces, world music), singing, rhythm & notation, an
  **instrument pathway** (percussion → recorder/ukulele → keyboard basics), composing.
- **PE & Health** — fundamental movement → games & sport skills, dance, gymnastics, swimming
  safety, outdoor activity; health (sleep, food, hygiene, body safety, mental health). Mostly
  parent/human-delivered and active — say so in Key activity; safety notes in Materials.
- **Computing** — unplugged algorithms → ScratchJr/Scratch → text-based (Python) by Year 5–6;
  data, networks, digital literacy and online safety every year.
- **Life skills** — SEL (emotions, friendship, resilience, growth mindset), money sense,
  sustainability, service, global citizenship.

## 6. Books & resources

Every subject file ends with a `## Books & resources` list: real, well-known titles and
authors only (never invent a book), balanced classic/modern, diverse authors and settings,
each with a one-line *why*. English lists the term-by-term class texts in the overview too.
If unsure a book exists exactly as named, leave it out.

## 7. Existing authored lessons

`curriculum/year-1/{maths,english,science,art-design}/lessons/*.json` are hand-built,
app-runnable lessons. Their catalog id is `y1-<subject>-u<unit>-l<NN>` and the catalog matches
them to outline slots by **lesson number**. When a new scope renumbers them, the Year 1 planner
must rename those files and update their `id`, `lessonNumber` and `unit` fields to the new slot,
keep the content, and record every change in `curriculum/year-1/ID-MAP.json`
(`{ "old-id": "new-id" }`) so learners' progress can be migrated.
