# Curriculum review — Years 5 & 6 (non-core subjects)

**Scope:** `curriculum/year-{5,6}/{science,history,geography,languages,art-design,music,pe-health,computing,life-skills}/*-year-N.md`
and `curriculum/year-{5,6}/README.md`. English and maths are out of scope.
**Standard:** [`SCHOOL-CHARTER.md`](../../SCHOOL-CHARTER.md) and [`curriculum/PLANNING-BRIEF.md`](../../curriculum/PLANNING-BRIEF.md).
**Branch:** `review/y56` (from `c89e30b`). One commit per subject.
**Method:** every lesson read in full; facts, dates, code, grammar and book titles checked; Year 5 read
against Year 6 (the two planners had not seen each other) and against Year 4 (read-only) for repeats.
After every file the brief's parse check was run (units / lessons / all 8 fields present / continuous
numbering / durations 30–45 min). Lesson counts and numbering are unchanged in every file.

Starting state: all 18 files already parsed cleanly (0 incomplete lessons, continuous numbering, all
durations 30–45 min). The problems were content: repeats across years, a handful of factual errors,
recall-only checks, and a few doubtful resources.

---

## Science

### Year 4 → 5 → 6 duplicates resolved
The three planners wrote overlapping chemistry. Rusting was investigated **three times** (Y4 L20–21,
Y5 L53/55, Y6 L32); acids/alkalis, red-cabbage indicator and neutralisation appeared in **both** Y5
(L49–51) and Y6 (L28–30) at the same depth; particle model, dissolving + mass conservation and signs of
reaction were near-verbatim in both (same hook "walk through air but not a wall").

Resolution — Y5 keeps the NGSS Grade 5 chemistry (particles, properties, reactions, conservation of mass);
acids/alkalis/pH/neutralisation belong to Y6 only (KS3 content).

| File | Lesson | Was | Now |
|---|---|---|---|
| Y5 | 49 | Acids and alkalis around us (repeat of Y6 L28) | Mystery powders: identifying substances by their properties (NGSS 5-PS1-3) |
| Y5 | 50 | Red cabbage indicator (repeat of Y6 L29) | Signs of a chemical reaction (moved from L52, now with 'no new substance' comparisons and a stretch on why one sign isn't proof) |
| Y5 | 51 | Neutralisation (repeat of Y6 L30; hook repeated the bee-sting/bicarbonate folk remedy) | Making new materials: milk (casein) plastic |
| Y5 | 52–53 | Signs of reaction; rusting investigation (repeat of Y4 L20–21) | Two-lesson investigation: how temperature affects reaction speed (plan; test, means, line graph) |
| Y5 | 55 | Mastery + rust results | Mastery check with a new misconception check ("burning destroys mass") |
| Y5 | 33 | Transparent/translucent/opaque (repeat of Y4 L3) | Measuring light through materials with a sensor — goes beyond Y4's sorting by eye |
| Y5 | 42 | Conductors and insulators test (repeat of Y4 L4) | Conductors, insulators and **resistance** — length of graphite/nichrome path vs brightness |
| Y6 | 2, 4 | Sugar-dissolving fair test (same investigation as Y4 L9) | Pendulum investigation (length vs time for 10 swings — teaches why multiple swings reduce timing error) |
| Y6 | 14 | The particle model (verbatim repeat of Y5 L47) | Particle model revisited: forces between particles, expansion, the model's limits |
| Y6 | 20 | Dissolving + mass conservation (repeat of Y5 L48) | Retrieval, then saturation and solubility curves; new quantitative check on crystallising |
| Y6 | 26 | Signs of change circus (repeat of Y5) | Retrieval circus framed as physical vs chemical at the atom level; sets up the steel-wool oxygen experiment |
| Y6 | 32 | Rusting conditions investigation (third time) | Oxidation: steel wool in an inverted cylinder shows ~one-fifth of air is oxygen; rust word equation |
| Y6 | 37 | Insulating cups fair test (repeat of Y4 L5–6) | Conduction/convection demos + a radiation investigation (black vs shiny cans) |
| Y6 | 55 | Beak simulation (verbatim repeat of Y5 L24) | Cress density competition investigation + resource partitioning (lions/cheetahs, MacArthur's warblers) |
| Y6 | 60 | Solar System scale walk (repeat of Y4 L27) | Beyond the Solar System: light travel times, light-years, Milky Way, Andromeda |
| Y6 | 65 | Atmosphere pie chart, carbon cycle, greenhouse jars (repeat of Y5 L56–58) | Retrieval, then word equations as carbon-cycle arrows, Keeling curve analysis, ocean-acidification demo with cabbage indicator |
| Y6 | 61 | Seasons | Now explicitly retrieves Y4 then adds the quantitative "count the lit squares" angle investigation |

Overviews, unit titles, key vocabulary, time-budget rows, end-of-unit checks, mastery checks and
vertical-connection notes were updated to match (Y5 Unit 6 is now "Chemistry: particles, properties and
reactions"; Y6's "What we assume from Year 5" now lists particles, reactions and the carbon cycle and
says Y6 retrieves then deepens).

### Factual and safety fixes
- Y5 L51 hook implied bicarbonate neutralises a bee sting — a folk remedy without good evidence; removed with the lesson.
- Y6 L32 listed **salt** as a drying agent for the "air only" rust tube; salt is not a desiccant and *speeds* rusting. Lesson rewritten (the new version needs no drying agent).
- Y6 L54 stated as fact that Yellowstone's wolves "changed the course of rivers" (from a viral video). Now presented as a proposed trophic cascade whose size scientists still debate; Joy changed from the video to a "science courtroom" weighing the evidence.
- Y5 L16 (drugs, alcohol, tobacco, vaping): added an explicit **parent note** (share content beforehand; facts, no scare stories; "say no and tell a trusted adult").
- Y5 L42 stretch/joy: graphite-line LED activity reframed as a graphite dimmer (reliable with 2–3 cells).

### Checks upgraded from recall to understanding
Y5 L33 (why a sensor reading beats the label), L39 (predict whether a drawn circuit works and fix it),
L50 (which change made a new substance and why), L57 (use the carbon cycle to explain deforestation +
burning); Y6 L14 (correct the "particles get bigger" misconception), L20 (predict crystallisation from a
solubility graph), L32 (interpret the water rise).

### Checked and correct (no change)
Leeuwenhoek 1670s; Ibn al-Nafis (13th c.) and Harvey (1628); Landsteiner 1901; Anning's ichthyosaur
(1811–12, aged ~12); Mendel's 3:1; Ibn al-Haytham (Cairo, 1011–21); Volta c.1800; Foote 1856, Tyndall
1859, Arrhenius 1896; atmosphere 78/21/~1 (Ar ~0.93, CO₂ ~0.04 %); Hooke's *Micrographia* 1665; Moon
g ≈ 1.6 N/kg, Jupiter ≈ 25 N/kg; Bolt 9.58 s ≈ 10.4 m/s; kettle 0.2 kWh vs charger 0.04 kWh; see-saw
1.5 m; DDT banned in the US 1972, *Silent Spring* 1962; perihelion in early January; light-year
≈ 9.5 trillion km; Moon–Earth radio delay ≈ 1.3 s; ~75 % of leading food crops benefit from animal
pollination; bleach + acid → chlorine. All books verified as real titles/authors (Radeva's *On the
Origin of Species*, Tweet's *Grandmother Fish*, Anholt's *Stone Girl, Bone Girl*, Kamkwamba & Mealer,
Winter's *Wangari's Trees of Peace*, Shetterly YRE, Beaty, Macaulay's *The Way Things Work Now*,
Arnold's *Horrible Science*, Bryson's *A Really Short History of Nearly Everything*, Carson).

---

## History

### The big problem: Year 5 repeated Year 4 and Year 6, and left Year 6's assumptions unmet
- Year 5 Units 2–5 (22 lessons: Baghdad, the Maya, Benin, the Vikings) re-taught Year 4's four depth
  studies **with the same lesson titles** ("The Round City", "The House of Wisdom", "Cities in the
  rainforest", "Lindisfarne 793"…). Year 5 Unit 1 reused Year 4's mystery box and its
  playground/monk-vs-saga interpretation activity.
- Year 5 Unit 6 (Gandhi, Montgomery, apartheid, with the identical "queue to vote" joy) duplicated
  Year 6 Lessons 28, 30 and 31.
- Year 4 promised Year 5 would teach "Tudors and exploration, the Atlantic trade, the history of flight,
  the Second World War home front and local history", and Year 6 **assumes** Year 5 taught the
  transatlantic slave trade and the WWII home front — **neither was in Year 5**.

**Resolution: Year 5 history rewritten** (35 lessons, 7 units, same format) to cover 1450–1950 without
touching Year 4's or Year 6's topics:

| Unit | Lessons | Content |
|---|---|---|
| 1 Toolkit | 1–4 | Extend the timeline from Y4; centuries and calendars; provenance — reliable vs useful (Armada Portrait); **fiction as history: *Journey to Jo'burg* and apartheid** (keeps the English link in Term 1; how apartheid ended stays in Y6) |
| 2 The Ottoman Empire, 1453–1600 | 5–8 | 1453 through two eyewitnesses (Barbaro, Tursun Beg); Suleiman "Magnificent" vs "Lawgiver"; coffee, tulips and Busbecq; the Piri Reis map (1513) |
| 3 Renaissance and the printing revolution | 9–13 | Who invented printing? (*Diamond Sutra* 868, Bi Sheng, *Jikji* 1377, Gutenberg); why Florence; Copernicus/Galileo (+ Ulugh Beg); printing and the Reformation (neutral); "rebirth — for whom?" (Trithemius, Anguissola, Gentileschi) |
| 4 The transatlantic slave trade and resistance | 14–20 | Kongo (Afonso I's 1526 letter) and Queen Nzinga; the triangular trade with SlaveVoyages data (≈12.5 m embarked, ≈10.7 m arrived); the *Brookes* diagram as a source; plantations and cultural survival; Palmares/Zumbi and Nanny of the Maroons; reading the archive "against the grain"; legacies and remembrance (25 March, Cape Coast, Gorée debate). Abolition and Haiti left to Y6. Parent notes, no role-play. |
| 5 History of flight | 21–23 | Wright (1903) vs Santos-Dumont (1906) as an interpretations lesson; Coleman, Johnson, Earhart; significance of flight |
| 6 WWII home fronts | 24–30 | Overview; evacuation in Britain, Finland, Japan and Leningrad; rationing; women's work and the "We Can Do It!" myth; refugees and the Kindertransport (Holocaust itself left to Y6; parent note); propaganda and the "Keep Calm" myth; votes for women worldwide |
| 7 Local history | 31–35 | Maps; census records; the world in our town; our area in WWII; year review. Oral-history interviews removed (Y5 English and the Y6 history capstone both do them). |

Books replaced accordingly (all verified): kept *Journey to Jo'burg*; added Sís *Starry Messenger*, Krull
*Leonardo da Vinci*, McKissack *Nzinga: Warrior Queen of Matamba*, Weatherford *Freedom in Congo Square*,
Olusoga *Black and British: A Short, Essential History*, Freedman *The Wright Brothers*, Borden &
Kroeger *Fly High!*, Kerr *When Hitler Stole Pink Rabbit*, Magorian *Goodnight Mister Tom* (preview
note), Coerr *Sadako*, SlaveVoyages. Removed titles tied to the dropped topics (Wisniewski *Sundiata*,
Burns *Mansa Musa*, *1001 Inventions*, Giovanni *Rosa*, *Grandfather Gandhi*, abridged *Long Walk to
Freedom* — the last remains in Y6).

### Year 6 history changes
- L5 "Baghdad and the House of Wisdom" re-taught Y4 → now **"From Baghdad to Toledo"**: brief retrieval,
  then how knowledge reached Europe via Córdoba (Ibn Rushd), Toledo's translators (Gerard of Cremona),
  Norman Sicily (al-Idrisi, 1154) and Fibonacci (1202); new check challenges the "they just preserved
  Greek knowledge" misconception.
- L29 claimed Ghana was "the first sub-Saharan African colony to win independence" — Sudan became
  independent in January 1956; reworded to "one of the first".
- L26 (Holocaust): added an explicit parent note and a pointer to Anne Frank House education materials.
- Overview "What we assume" and the vertical-alignment note now describe what Years 4 and 5 actually teach.

### Checked and correct (no change)
Great Pyramid/Cleopatra/Moon-landing comparison; David vs Delaroche Napoleon; Caton-Thompson 1929 and
Zimbabwe 1980; Zheng He 1405–33; Tenochtitlan c. 1325; Akbar 1556–1605 and the jizya; Jefferson and
600+ enslaved people; Sadler 1832, Mines Commission 1842, Factory Act 1833; Haiti 1791–1804 and the 1825
indemnity; Equiano 1789, Douglass 1845, abolition 1833–34/1865/1888; Perry 1853, first railway 1872;
Hansa Mehta and Article 1; Nkrumah 6 March 1957; 1960 "Year of Africa" (17 states); Ruby Bridges 1960;
Browder v. Gayle; Sharpeville 1960, Soweto 1976; space-race dates. Y6 books all real (Gombrich,
Frankopan/Packer illustrated edition, Anne Frank, Ruby Bridges, van Wyk's abridged Mandela, *I Am
Malala* YRE, *Horrible Histories*). The Y6 handling of the Holocaust (through Anne Frank and rescuers,
no role-play, depth deferred to secondary) is age-appropriate and was kept.
