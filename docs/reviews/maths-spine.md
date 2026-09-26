# Maths spine review — Years 1–6 (2026-09)

Independent review of `curriculum/year-{1..6}/maths/maths-year-{N}.md` against
[`SCHOOL-CHARTER.md`](../../SCHOOL-CHARTER.md) and [`curriculum/PLANNING-BRIEF.md`](../../curriculum/PLANNING-BRIEF.md).
Six planners wrote the six files in parallel. This review checks that the spine holds together
from year to year, that the worked answers are right, and that the teaching follows CPA.
It also records every change made on branch `review/maths`.

Years map to ages and to UK and US grades like this: Y1 = 6–7 (UK Y2 / US G1) … Y6 = 11–12 (UK Y7 / US G6).

After the review, every file still parses to **170 lessons, 0 incomplete**. Lesson numbering is
unchanged in every year. The Year 1 slots that have hand-built JSON lessons (1, 4, 9, 11, 12, 27,
29, 34, 49, 55, 63, 71, 74, 85, 96, 100, 109, 110, 124, 125, 135, 138, 148, 151, 154, 164, 165, 170)
keep their titles and objectives. `node curriculum/validate-lessons.mjs curriculum --quiet` reports
0 errors, and `npm test` passes.

---

## 1. Strand map (after the review)

"R" means the year revisits the idea in a short retrieval lesson and then extends it. It is not
taught a second time from scratch.

| Strand | Y1 (6–7) | Y2 (7–8) | Y3 (8–9) | Y4 (9–10) | Y5 (10–11) | Y6 (11–12) |
|---|---|---|---|---|---|---|
| **Place value & number** | to 100; odd/even; count in 2, 3, 5, 10 | to 1000; count in 4, 8, 50, 100; round to 10/100 (intro) | to 10,000; round to 10/100/1000; **negatives intro**; Roman to 100 | to 1,000,000; round to 100,000; negatives in context, intervals across zero; Roman to M | to 10,000,000; any rounding; R negatives incl. decimals, rises/falls; world number systems | millions → thousandths; powers & roots; primes/HCF/LCM by prime factors; d.p. and s.f.; bounds |
| **+ / −** | 2-digit with regrouping; bonds within 20 and to 100 | mental 3-digit; **column** 3-digit incl. across zeros; bar models begin | column 4-digit; inverse; near multiples | columns to 6 digits; balancing equations | R mental/column to 7 digits; multi-step bar models | integers (below) |
| **× / ÷ and tables** | 2, 5, 10 tables; sharing vs grouping | **3, 4, 8** tables; 2d × 1d (grid → expanded); 2d ÷ 1d, remainders | **6, 7, 9, 11, 12 → all tables to 12 × 12 secure (L168)**; short multiplication 3d × 1d; short division | factors, primes, squares, cubes; ×/÷ 10/100/1000; **long multiplication** to 4d × 2d; short division 4d ÷ 1d; ÷ 2-digit by chunking | R long multiplication; **× by 3-digit**; **long division** 4d ÷ 2d; remainders as fractions and decimals; HCF/LCM; **order of operations** | order of operations with powers and negatives; decimal ÷ decimal |
| **Fractions** | ½, ⅓, ¼, ¾ of shapes and quantities; ²⁄₄ = ½ | unit and non-unit; tenths; equivalence (wall); compare; + / − same denominator within 1 | equivalence (×); simplify; improper ↔ mixed; + / − same denominator incl. mixed numbers; of amounts; whole from part; hundredths | R equivalence → **tenths/hundredths**; HCF simplifying; fractions > 1 in measures; **benchmarks**; related denominators; + / − mixed numbers; fraction × whole | R equivalence/mixed; **estimating with benchmarks**; **LCM common denominators**; any denominators; fraction × fraction; ÷ by whole; whole ÷ unit fraction; fractions as division | R + − ×; **whole ÷ fraction, fraction ÷ fraction**; fractional change |
| **Decimals** | — | (tenths as fractions) | tenths, hundredths; ÷ 10, 100; compare, round to whole | thousandths; compare/order/round; + − different places; ×/÷ 10/100/1000 | R place value and ×/÷ powers of 10; **estimating decimal calculations; mental decimal strategies**; decimal × whole, decimal × decimal, decimal ÷ whole; converting | × and ÷ by 0.1 and 0.01; decimal ÷ decimal; recurring decimals |
| **Percentages** | — | — | — | per cent; FDP; 50/25/10/1%; building percentages; discounts | R per cent/FDP incl. ⅛, ⅓; **% > 100% and < 1%**; any % of decimal amounts; **comparing % of different wholes**; increase; one amount as a %; reverse % | multipliers; % change; reverse %; simple interest |
| **Ratio & proportion** | — | "times as many" | scaling, correspondence | scaling, rates | **ratio** (for every, fractions, simplest form, tables, sharing, one part/difference known), scale factor, maps, unitary method, unit price, similar shapes, proportional or not | R ratio + **three-part**; R problem types; **ratio change**; unit rates with conversions; **inverse proportion**; direct proportion y = kx; non-whole scale factors; maps both ways; speed; currency |
| **Algebra** | missing numbers | missing numbers; work backwards | missing numbers; inverse | balancing equations | sequences, position-to-term (3n + 1), function machines, expressions, substitution, formulae, 1- and 2-step equations, two unknowns, proof with algebra | expressions with brackets; like terms; expand/factorise; formulae incl. negative values; nth term; R equations → **equations with fractions**, brackets, unknowns on both sides; inequalities; linear and real-life graphs; rearranging |
| **Measurement** | cm, m; g, kg; ml, l; °C; money; time to 5 min | mm/cm/m/km; perimeter; g/kg, ml/l; money (100 subunits); time to the minute, 24-hour, Roman I–XII | km; perimeter extended (mixed units, backwards, 2 missing sides); **area** (counting, rows × columns); money decimals; 24-hour | area formula and compound; **volume** of cuboids; capacity; metric and imperial conversion; time zones | area/perimeter backwards; **triangles, parallelograms**; **cm³ vs m³**; volume and capacity backwards; box design | trapezia; **circles** (C and A); prisms; surface area; units of volume both ways; accuracy and bounds |
| **Geometry** | 2-D/3-D shapes; vertical symmetry; turns; position | turns, right/acute/obtuse; parallel/perpendicular; polygons; 3-D; symmetry | **8-point compass turns; ordering angles**; triangles, quadrilaterals; regular polygons; symmetry; coordinates (Q1); translation | **degrees**; protractor; reflex; angles on a line, at a point, vertically opposite; nets; reflection and translation (Q1) | R angle facts with reasons; **angle problems with algebra**; triangle and polygon sums; constructions; circles and π; Euler; tessellation; **coordinates following a rule**; 4 quadrants; reflections in axes | R angle facts; **three-figure bearings**; parallel lines; polygons; constructions; loci; rotation; plans and elevations |
| **Statistics** | tally, pictograms, block diagrams | scaled pictograms, bar charts, two-way tables | bar charts, time and line graphs | line graphs, two-way tables, timetables, misleading graphs | two-line graphs, **pie charts**, **mean** | data cycle; sampling and bias; grouped data; histograms; stem-and-leaf; mean/median/mode; IQR, box plots, MAD |
| **Probability** | — | — | — | — | — | scale, theoretical, sample spaces, experimental, expected, fair games, Venn diagrams |

Checks the task asked about (all present after the review): **tables to 12 × 12 secure by the end
of Year 3** (Y3 L168) · **long division** (Y5 L19–20) · **operations with negative numbers** (Y6 Unit 2,
previewed in Y5 L170) · **order of operations** (Y5 L34–35, Y6 L9, L20) · **fraction ÷ fraction** (Y6 L29,
built on Y5 L59–60) · **area of triangles and parallelograms** (Y5 L127–129, trapezia Y6 L118) · **angle
facts** (Y4 L146–147 → Y5 L139–142 → Y6 L96–100).

Gaps found and filled: **three-figure bearings** were missing from the whole spine (now Y6 L97).
**Inverse proportion** only appeared as a "trap" (now Y6 L83). **Ratio-change problems** (Singapore
Sec 1) and **equations with fractions** (KS3) were missing (now Y6 L81 and L62). Other lessons that
were not in the spine before: **estimating with fraction benchmarks** (Y5 L42, CCSS 5.NF.2),
**estimating decimal calculations** (Y5 L65), **× by a 3-digit number** (Y5 L16), and **percentages
above 100% and below 1%** (Y5 L78).

---

## 2. Changes by year

### Year 1 (commit "Maths review Y1")
Errors fixed:
- **L35** stretch said "4☐ − ☐5 = 21 … with more than one answer". It has only one answer (46 − 25). It now reads 4☐ − 2☐ = 21, which has many answers.
- **L81** check: lining the ruler's *end* (not 0) up with the pencil makes the reading too **short**. The file said "too long".
- **Teacher guidance**: "starting at 1 makes it one short" was wrong, because it makes the reading 1 cm too **long**. This is now stated correctly for both errors.
- No renumbering, and no changes to the authored-lesson slots.

### Year 2 (commit "Maths review Y2")
All arithmetic and answers checked: columns, exchanges, money change, durations, fractions, and shape counts. No errors were found. L91 now names a manipulative (cubes to build table totals).

### Year 3 (commit "Maths review Y3")
Errors fixed:
- **L22** and the misconception list: taking the smaller digit from the larger in 5,432 − 1,718 gives **4,326**. The file said 4,286.
- **L23**: "4,999 − 2,467 + 1" gives 2,533. The fix is to subtract 1 from both numbers: 4,999 − 2,467 = **2,532**.
- **L65**: the robot's answer of "8,612" for 243 × 4 matched no real error pattern. It is now **862** (the robot forgot to add the exchanged digits), and the correct answer is 972.
- **L102** stretch: ⅚ of 45 is not a whole number. It now asks for ⅗ (27).
- **L106**: "use digits 1–9 once each to make three equivalent fractions" is impossible, because three fractions use only six digits. It now says six different digits (e.g. 1/2 = 3/6 = 4/8).
- **L112** stretch had only one answer. The counter limit went from 10 to 25, which gives three answers.
- **L140** check said the *minute* hand has moved at 4 o'clock. It is the **hour** hand.
- **L145**: "a rectangle is not regular" is false for a square. It now reads "only if it is a square".
- **L153** stretch: two of the three parallelogram vertices fell outside the first quadrant. The new points (2, 2), (5, 2), (3, 4) keep all three answers on the grid.
- **L5** hook: removed the unverifiable claim that "only 21 of the 60 facts are really new".

Overlaps with Year 2 fixed:
- **L53–55** perimeter (Y2 L99–102 had already taught it): now mixed units, working backwards from a perimeter (with a "which is wrong" check), and two or more missing sides.
- **L139–140** angles (Y2 L138–140 had already taught turns and acute/obtuse): now turns between the 8 compass points and ordering angles up to two right angles.

### Year 4 (commit "Maths review Y4")
All worked answers checked. No arithmetic errors were found.

Overlaps with Year 3 Unit 7 fixed. Year 3 had already taught equivalence, simplifying, improper ↔ mixed and same-numerator comparison:
- **L42** now extends equivalence to tenths and hundredths, including why ⅓ has no exact hundredths form.
- **L45** now covers fractions greater than 1 read from scales and measures.
- **L47** compared fractions with the same numerator, which Y3 L96 had already taught. It now teaches **benchmark comparison** to ½ and 1.
- **L43/L44** objectives were sharpened (testing whether fractions are equivalent; using the HCF), and the overview now says what Year 3 already taught.
- **L6** rounding now covers numbers up to 1,000,000, where it had repeated Y3 4-digit rounding. **L141** now names degrees.
- Manipulatives were added to three assessment lessons (L108, L120, L140).

### Year 5 (commit "Maths review Y5")
Errors fixed:
- **L16**: "she forgot the placeholder zero" could not produce 14,508. The lesson is now × a 3-digit number, and its check is 3,021 × 148 = 447,108.
- **L94**: Kofi's shares of 13⅓ and 26⅔ did not match the stated error. He now divides by each part of the ratio (13⅓ and 8, which don't add to 40).
- **L4** stretch was word for word the same as Y4 L7's stretch. It has been replaced.

Overlaps with Year 4 fixed. The repeated content is now short retrieval, and the freed slots teach new content:
- **L15–16**: long multiplication is now one retrieval lesson, followed by **multiplying by a 3-digit number**.
- **L39–43**: equivalence/simplifying and improper/mixed numbers are now two retrieval lessons. The new lessons are **estimating with fraction benchmarks** (L42) and **LCM common denominators** (L43). L41 now works with unrelated denominators.
- **L63–66**: decimal place value/rounding and ×/÷ 10/100/1000/+ − (all taught in Y4) are now two retrieval lessons. The new lessons are **estimating decimal calculations** (L65) and **mental decimal strategies** (L66).
- **L77–82**: per cent/FDP and 50/25/10/1% (taught in Y4) are now retrieval. The new lessons are **percentages above 100% and below 1%** (L78) and **comparing percentages of different wholes** (L82). L80 now includes recurring decimals and values greater than 1.
- **L125** was the same-area/different-perimeter lesson for the third time (after Y3 and Y4). It is now **area and perimeter worked backwards**. **L126** now requires missing lengths to be found first.
- **L132/L134** volume by counting cubes and V = lwh repeated Y4, even using the same fish tank. They are now **cm³ vs m³** (1 m³ = 1,000,000 cm³) and **finding the depth of water and missing dimensions**, with a displacement stretch.
- **L139–140**: angle facts, which Y4 L146–147 had taught, are now one retrieval lesson with reasons. The new lesson is **angle problems with algebra** (L140).
- **L151**: first-quadrant plotting (taught in Y3) is replaced by **coordinates that follow a rule** (y = x + 2), which bridges to Y6 graphs.
- L5 now includes negative decimals, and L6 is retitled "rises, falls and intervals".

### Year 6 (commit "Maths review Y6")
All worked answers checked. No arithmetic errors were found.

Overlaps with Year 5 fixed and gaps filled:
- **L41** is now expressions with brackets and order (Y5 L106 had taught simple expressions). **L44** is now formulae from tables with decreasing and negative values (Y5 L109 was the same lesson).
- **L61**: one- and two-step equations (Y5 L110–111) are now retrieval with negative, decimal and fractional solutions. **L62** is new: **equations with fractions**.
- Ratio (Unit 7) repeated most of Y5 Unit 8:
  - **L77** is now retrieval plus **three-part ratios**.
  - **L80** merges the three Y5 problem types into one retrieval lesson.
  - **L81** is new: **ratio-change problems**.
  - **L82** covers unit rates with conversions and best buys.
  - **L83** is new: **inverse proportion**.
  - **L85** covers non-whole scale factors.
  - **L87** covers map scales worked both ways.
  - **L91** now retrieves inverse proportion.
- **L96** merges the angle-fact retrieval (lines, points, triangles, quadrilaterals). **L97** is new: **three-figure bearings**, which were absent from the spine before.
- **L124** now converts capacity units both ways with decimals (Y5 L132 now covers 1 m³ = 1,000,000 cm³).
- **L12** and **L125** stretches repeated Y3/Y5 stretches word for word ("number under 100 with most factors"; "least-card 24 cm³ box"). They have been replaced (smallest number with 12 factors via prime factorisation; 36 cm³ box).
- The vocabulary lists, overview and teacher guidance were updated to match.

---

## 3. Still open (not changed in this pass)

- **Year 1 L96** is titled "Pounds, pence and making amounts" because an authored JSON lesson uses that slot. The overview and the key activity tell teachers to use their own currency. A future JSON revision could make the title currency-neutral.
- **Year 3 fractions** are ambitious for ages 8–9: improper fractions, mixed-number addition and subtraction, and simplifying are UK Y5 content. Year 4 now retrieves them rather than re-teaching them. If Year 3 children struggle, it may be better to move Y3 L93 (simplifying) and L99 (mixed-number + −) into Year 4.
- **Probability** starts only in Year 6, which matches UK KS3 and CCSS G7. An informal "likely/unlikely" lesson in Year 4 or 5 could be added if wanted.
- **Validator warnings** (thin practice levels, few wrong answers, "maths-no-materials") belong to the Year 1 authored JSON lessons, which this review did not touch.
- Some retrieval and assessment lessons list "assessment paper, manipulatives" without naming the manipulative. This is acceptable for low-stakes checks, but a future pass could name one per strand.
