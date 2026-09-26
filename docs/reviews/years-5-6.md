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

---

## Geography

### Repeats found
| Topic | Y4 | Y5 (before) | Y6 (before) |
|---|---|---|---|
| Tectonics, volcanoes, earthquakes (egg model, Wegener, boundaries, Ring of Fire, spaghetti towers) | Unit 2 (8 lessons) | Unit 2 (7 lessons) | Unit 2 (6 lessons) |
| River journey; erosion/deposition | L15–16 | L14–15 | — |
| Latitude/longitude; six-figure grid refs | L2–4, L29 | L2, L3 | L1 |
| Projections (same Greenland-×14 hook and orange peel) | — | L1 | L2 |
| Contour clay-mountain slicing | — | L4 | L5 |
| Population distribution, push/pull, megacities incl. Mumbai/Dharavi, sustainable city | — | Unit 5 (5 lessons) | Unit 4 |
| Fair trade; physical vs economic water scarcity (same check question) | — | L22; L17 | L27; L28 |
| Water-filter build | — | L18 | Y6 science L23 |
| Keeling curve + "why does it zigzag" stretch | — | — | geography L14 and science L65 |

### Resolution
**Year 5 geography restructured** (35 lessons, 6 units, numbering unchanged for the kept units 4 and 6):
- Unit 1: L2 lat/long → **compass bearings** (with a reverse-bearing check); L3 six-figure grid refs → **thematic maps** (choropleth/dot/flow); L4 stretch no longer pre-empts Y6 cross-sections.
- Unit 2 tectonics → **Regional study: Kenya and East Africa** (7 lessons: 54 countries not one story; Rift Valley and Mount Kenya; wet/dry seasons and the wildebeest migration; tea, flowers and pastoralism; Nairobi and M-Pesa; tourism, conservancies and Lucy King's beehive fences; fair comparison with the home region). This delivers the "regional comparison" Year 4 promised and puts Africa into the spine as a region study (Y4 South America, Y6 China–India).
- Unit 3 → **Water: a precious resource**: the Y4 river-journey/erosion lessons replaced by "Where is the world's water?" and a dedicated Nile-basin dam summit (GERD); the filter build replaced by a solutions fair (boreholes, sand dams, rainwater harvesting) and a household water audit.
- Unit 5 cities/population → **The polar regions** (Arctic vs Antarctica; land ice vs sea ice investigation; Inuit and Sámi lives without a single story; Antarctic Treaty 1959, Madrid Protocol 1991, ozone hole 1985/Montreal Protocol 1987; sea-ice data and the Arctic Council). Antarctica was previously only "in map work".
- Overview, time budget, mastery checks, misconceptions and vertical notes rewritten to match.

**Year 6 geography:** L1 → precise location (degrees and minutes, 1° ≈ 111 km, GPS); L2 → maps and power (south-up, Pacific-centred, Equal Earth, the Peters debate, projection for purpose); L3 objective now builds on Y4; L5 drops the clay model and focuses on cross-sections and landforms; L10 replaces the Y4 spaghetti-tower build with a cost/impact evaluation of risk-reduction strategies for rich and poorer countries; L14 moves off the Keeling curve (now science L65) to geographical evidence — ice cores, glacier satellite images, tide gauges, Kyoto's 1,000-year cherry-blossom record; L27 focuses on aid and remittances with fair trade only retrieved; L28 → city/national water security through Cape Town's 2018 "Day Zero"; L33 fieldwork steered to a different question from Y5's environmental-quality survey. "What we assume from Year 5" corrected.

### Books
Y5: removed Branley's *Volcanoes* (tectonics unit gone; also pitched at ages 4–8). Added Napoli & Nelson
*Mama Miti* (Kenya), Grill *Shackleton's Journey* (polar), NSIDC data. Kept *Atlas of Adventures*,
Mizielińscy *Maps*, *A Long Walk to Water*, *One Well*, Kamkwamba, *If the World Were a Village*. Y6 list
verified (atlases, *Factfulness*, Gapminder/Dollar Street, Our World in Data, *Maps*, Smith, Kamkwamba,
NASA, The True Size Of, UN/UNHCR) — no change.

### Checked and correct
Africa ≈ 14 × Greenland; Tōhoku M9.0–9.1 and ~18,000 deaths; Gorkha M7.8 and ~9,000; Quito ~2,850 m;
Tuvalu's high point ~4.6 m; 8 billion (Nov 2022), 1 billion ~1804; urban share <⅓ in 1950; Dharavi ~1
million in ~2 km² (estimates vary — "perhaps" kept); India overtook China 2023 (UN); Shenzhen SEZ 1980;
Three Gorges largest power station by capacity, >1 million relocated; Samoa skipped 30 Dec 2011;
Curitiba BRT 1970s; Nairobi 1° 17′ S 36° 49′ E; Cape Town 50 L/person/day in 2018.

---

## Languages (Spanish)

### Accuracy
All Spanish in both files was checked (conjugations, agreement, *del/al*, *cien/ciento*, *doscientas
personas*, stress rules, *hablo/habló*, *jugué*, *hizo*, *fui/fue*, omission of *un/una* before
professions, *quisiera*, regional *zumo/jugo*, *vosotros/ustedes*). No grammatical errors were found in
the model language. Cultural facts verified: Inti Raymi (24 June, Cusco), Día de Muertos (1–2 Nov), La
Tomatina (Buñol, late August), Las Fallas (March), "La Bamba" a 1958 hit, Gabriela Mistral's 1945 Nobel,
Martí's *Versos sencillos* → "Guantanamera", Nahuatl loanwords (*tomate, chocolate, aguacate*). Y5's
"about 20 countries" and Y6's "21" harmonised ("20, or 21 counting Puerto Rico").

### The coherence problem
Year 6's overview assumed Year 5 had taught "the present tense … in the singular" and listed as *new*
in Year 6: full present paradigms, reflexive verbs, *hay* and prepositions, comparatives. In fact Year 5
teaches all of these (Units 2–5), and Year 4 already taught time, food/café, town and directions. So
Year 6 Units 2–4 re-taught Year 4/5 at the same depth (e.g. Y6 L7 time was the **third** time-telling
lesson; Y6 L8 "Reflexive verbs: my morning" = Y5 L35; Y6 L23–25 places/prepositions/directions = Y4 L49–52).

### Changes (Year 6) — themes kept, new grammar added
| Lesson | Was | Now |
|---|---|---|
| 7 | Telling the time | **Stem-changing ("boot") verbs** e→ie, o→ue, e→i, u→ue |
| 8 | Reflexive verbs, first person | Weekdays vs weekends with **antes de / después de + infinitive** (pronoun attached: *después de ducharme*) |
| 9 | Reflexives all persons | + combined with stem changes (*nos despertamos / se despiertan*) |
| 10 | Frequency words | + **soler + infinitive** |
| 15 | Subjects and *gustar* | **Verbs like gustar**: *me interesa, me parece(n), me aburre* |
| 16 | Timetable | + 24-hour clock (moved from L7) |
| 17 | Comparatives | + **superlatives** |
| 23 | Places with *hay* | Town then and now: *antes había… ahora hay…* |
| 24 | *Estar* + prepositions | **Ser, estar or hay?** — the three-way contrast, with an error-correction check |
| 25 | Informal directions | **Formal usted commands** (*siga, gire, tome, cruce*) |
| 52 | *si* + present + *voy a* (done in Y5 L61) | Retrieval + other persons, two conditions, negotiating |
Overview ("What we assume / What Year 6 adds"), Unit 2 and 4 key vocabulary and the vertical-alignment
note corrected.

### Changes (Year 5)
- L56 "La Bamba" repeated Year 4 L61 → **"De colores"** (links to the Unit 5 reflexive *se visten*; farmworkers' anthem context). Y6 L59 now notes Y4/Y5 songs so "Cielito lindo" stays new.
- Songs list and cross-curricular note updated.

### Books & resources
All real and correctly attributed: Llenas *El monstruo de colores*; Sendak *Donde viven los monstruos*;
Collins/Oxford dictionaries; WordReference; *Coco*; Blaine Ray *Pobre Ana*; Carol Gaab *Brandon Brown
quiere un perro*; *Extr@ en español*; Señor Wooly; BBC Bitesize KS3 Spanish. No removals needed.

---

## Art & design

### Repeats found (Year 4 is the baseline)
- **Relief printmaking three times at the same depth:** Y4 Unit 2 (polystyrene, edition 1/3, two-colour
  reduction), Y5 Unit 3 (polystyrene, edition 1/3, two-colour reduction), Y6 L16–19 (Dürer & Hokusai
  intro — identical to Y4 L7 — then block cutting and a two-colour reduction).
- **Islamic geometric construction:** Y4 Unit 5 and Y5 Unit 2 (same compass six-fold construction).
- **Hepworth soap/plaster carving with a void:** Y4 L18 and Y6 L21 (identical activity); Y5 L27 "pierced forms".
- **El Anatsui collaborative recycled "cloth":** Y4 L23, Y5 L28, Y6 L24 — three times.
- **One-point corridor:** Y4 Unit 1, Y5 L4, Y6 L7. **Tone on a lit egg/ball:** Y5 L2–3 and Y6 L2.
- **Typography/poster hierarchy:** Y5 L33 and Y6 L27–28.
- Y6's "What we assume from Year 5" described a different Year 5 (Warhol, Höch, Mutu, digital drawing).

### Resolution
**Year 5** (35 lessons, 6 units):
- Unit 2 Islamic pattern → **Illustration and visual storytelling** (Shaun Tan's *The Arrival* — a Y5 English text — Quentin Blake, Yuyi Morales; character model sheets, panels and viewpoints, a wordless sequence, a "read-back" crit).
- Unit 3 relief printmaking → **Collage: painting with scissors** (Matisse's cut-outs; Chinese *jianzhi*; Romare Bearden's *The Block*; Hannah Höch's photomontage with a preview-images note; final mixed collage).
- L1 Dürer → **Maria Sibylla Merian** (science link); L4 one-point perspective → **atmospheric perspective** (Fan Kuan and Friedrich).
- Sculpture: hook now Giacometti, **Ruth Asawa** and the **Ife heads**; L27 pierced forms → **clay heads in the round**; L28 El Anatsui → **Romuald Hazoumè's jerrycan masks**.
- L33 typography poster → **pictograms** (Otl Aicher, Munich 1972). Overview, mastery checks, misconceptions, safety and vertical notes rewritten.

**Year 6:** overview assumptions rewritten to match Years 4–5; L2 → **reductive charcoal** (Seurat); L7 → **viewpoint, foreshortening and three-point perspective**; printmaking now goes *beyond* Y4 — L16 **prints with a purpose** (Posada, Corita Kent, Warhol), L17 monoprint/collagraph (kept), L18 **stencil and screen printing**, L19 **linocut with gouges** (Catlett and the Taller de Gráfica Popular; Picasso reduction as stretch); L21 → **site-specific sculpture** (Moore, Noguchi) instead of repeating the soap carving; L24 → **Louise Nevelson assemblage**. End-of-unit check, mastery check 4, artists list and vertical note updated.

### Facts checked
*Young Hare* 1502; *Great Wave* c. 1831; *Rhinoceros* 1515; *School of Athens* 1509–11; *Relativity* 1953;
Sagrada Família begun 1882; *Composition VII* 1913; Sher-Gil 1913–41, *Three Girls* 1935; Tarsila
1886–1973, *Abaporu* 1928; Kahlo ~55 self-portraits; Wiley's Obama portrait flowers; *Ice Watch*
(Copenhagen 2014, Paris 2015, London 2018); Matisse *Jazz* 1947 and *The Snail* 1953; Bearden *The Block*
1971; Höch 1919–20; Merian's *Metamorphosis* 1705; jianzhi on UNESCO's list (2009); Munich 1972
pictograms. Corrected in passing: Warhol's 1962 soup cans were painted — the new text refers to his
1960s screen-printed Marilyns and soup cans.

### Books
Y5: removed Broug *Islamic Geometric Patterns* (unit gone); added Sidman *The Girl Who Drew Butterflies*,
Tan *The Arrival*, Winter *Henri's Scissors*, Greenberg *Romare Bearden: Collage of Memories*. Kept
Beckett, Wenzel *13 Artists*, Brown & Parra *Frida Kahlo and Her Animalitos*, Kogan Ray *Hokusai*.
Y6 list (Gombrich, Edwards, Dickins *Usborne Introduction to Art*, DK Eyewitness) verified; museum and
artist lists updated.

---

## Music

### Repeats found
- Year 5 Unit 1 re-taught Year 4 Unit 1 **song for song**: "Kookaburra" round, "Dona nobis pacem", "Siyahamba" call and response, partner songs.
- Year 5 Unit 2 re-taught Year 4 Units 2 and 5: ukulele C, Am, F, G and **"La Bamba"** (Y4 L29 had the same song).
- Rhythm notation (note values, time signatures, dotted notes, syncopation) appeared in Y4 Unit 3, Y5 Unit 3 and Y6 Lessons 1–2; treble-stave reading in Y5 L16 and Y6 L4; keyboard geography in Y5 L24 and Y6 L6.
- The same four world traditions (samba, djembe, gamelan, raga) in **all three years**.
- Film music — Grieg's "Mountain King", Holst's "Mars", the *Jaws* leitmotif and a silent-film soundtrack — in both Y5 Unit 6 and Y6 Unit 5; Holst's "Mars" 5/4 also Y4 L18.
- Y6's "What we assume from Year 5" described a music-history/genres year that Year 5 did not teach.

### Resolution
**Year 5 rewritten** (35 lessons, 6 units; the keyboard-basics unit kept intact):
| Unit | Now |
|---|---|
| 1 Choral singing | "The Water Is Wide" (breath/phrasing), harmony in thirds, **isicathamiya and "Shosholoza"** (Ladysmith Black Mambazo), a **descant from a two-part score**, three-part **"Tue Tue"** (Ghana), concert |
| 2 Ukulele II | G and Em, **the key of G** with "Jambo Bwana" (Kenya — geography link), **TAB**, **fingerpicking**, **reggae off-beat strum** ("Three Little Birds") |
| 3 Reading music | **6/8 compound time**, ties and syncopation, treble stave, **reading melodic shape**, dictation |
| 4 World music II | **Japanese taiko**, kora and griots (kept), **Andean siku hocket**, **Cuban son clave**, **Arabic maqam and oud** (maqam Hijaz on D), comparison with Year 4 |
| 5 Keyboard basics | unchanged |
| 6 Stories in song | **Mozart's *Magic Flute***, **Peking opera**, **musical theatre** (*The Lion King*), **setting Ariel's songs from *The Tempest*** (Robert Johnson's c. 1611 setting), storm-scene composition and performance (English link) |

**Year 6:** L1 → **irregular metre 5/4 and 7/8** ("Take Five", *lesnoto*); L2 → **triplets and swing** (Ellington; prepares the blues); L4 → **bass clef and grand staff**; L6 retitled to scales and keys, retrieving Y5 keyboard geography; L19 adds **3-against-2 cross-rhythm and the timeline bell pattern**; L20 adds **colotomic structure and kotekan**; L21 Rio samba (done in Y4) → **samba-reggae (Olodum, Salvador) and Afro-Brazilian identity**; L24 Holst "Mars" (done in Y4) → **Britten's *Young Person's Guide to the Orchestra***. Overview, Unit 1/4 vocabulary, end-of-unit checks, mastery check 1, listening list and vertical note updated. Y6 L23 (Grieg), L25–26 (leitmotif, silent-film soundtrack) now stand alone because Y5 no longer teaches them.

### Facts checked
Teentaal 16 beats (sam 1, khali 9); 12-bar blues V first in bar 9; C blues scale C–E♭–F–F♯–G–B♭; Pachelbel
ground bass D–A–B–F♯–G–D–G–A; *Clapping Music* 1972 (12-quaver pattern); *The Planets* 1914–16;
"Homeless" (*Graceland*, 1986); *Jaws* 1975; Ode to Joy notes in C position; ukulele chord shapes
(C, Am, F, G); "Take Five" (Paul Desmond, 1959, 5/4 as 3+2); Britten 1946 on Purcell's *Abdelazer*;
*The Magic Flute* 1791; Peking opera on UNESCO's list (2010); "Three Little Birds" 1977 (A, D, E).

### Books & resources
Y5: kept Levine *The Story of the Orchestra*, Chrome Music Lab, BandLab/GarageBand; Britten moved to Y6
where it is taught; a retelling I could not verify for *The Magic Flute* was **not** added (replaced by
a subtitled opera-house recording). Y6 (Goodall *The Story of Music*, Levitin, Taylor *Music Theory in
Practice Grade 1*, BBC Ten Pieces) verified.

---

## PE & health

PE is deliberately spiral (games, athletics and swimming recur every year), so lessons that revisit a
sport with added technique or tactics were kept. Changes target lessons that repeated Y4 or the other
year **at the same depth**, and the health/safety content.

### Health and safety content (checked)
Puberty lessons (Y5 L27–28, Y6 L21–22): accurate (onset roughly 8–14, wide normal range; periods and
wet dreams taught to everyone), with parent notification, anonymous question box and ground rules —
kept. Substances (Y6 L24) factual and non-judgemental; Y5 science L16 now also carries a parent note.
First aid: hands-only CPR 100–120/min, abdominal thrusts only for over-ones and never practised on
people, burns cooled ~20 minutes, recovery position — correct. Water safety (Float to Live 60–90 s,
rip-current advice, flags with "check local systems", "call, reach, throw, don't go") matches RNLI
guidance. Inversions, spins, freezes and gumboot slaps all carry specific safety notes.

### Repeats fixed
| File | Lesson | Was | Now |
|---|---|---|---|
| Y5 | 2 | Warming up and cooling down (Y4 L1/L6; Y6 L3) | **Reaction time and agility** (ruler-drop, agility run, retest) |
| Y5 | 3 | Heart rate and exercise (same investigation as Y5 **science** L12 and Y4 L1) | **Moderate vs vigorous: the talk test** and the 60-minute guideline |
| Y5 | 19–20, 22 | Points-and-patches balances, partner counter-balances, shaped jumps (Y4 L17, L21, L19 titles verbatim) | **Inverted balances**, **the cartwheel** (rotation), **turning jumps**; group-of-three sequences |
| Y5 | 35, 37 | Bollywood, capoeira (Y4 L26–27; also Y6 L31–32) | **Flamenco** (Spanish link), **hip hop and breaking** |
| Y5 | 66–67 | Maps and orientating (Y4 L63 verbatim), compass intro | **Make a map to scale**; orienteering **with bearings** (Y5 geography link) |
| Y6 | 2 | Heart rate | + **recovery graph and training zones** (70% of 208 ≈ 146 bpm check) |
| Y6 | 26 | DRSABC + recovery position (Y5 L68–69) | DRSABC retrieval + **asthma and anaphylaxis first aid** (trainer devices only; parent note) |
| Y6 | 31–32 | Bollywood, capoeira (third time) | **Kathak and Akram Khan fusion**; **South African gumboot dance** (history link) |
| Y6 | 35 | Partner counterbalance (Y4 L21) | + **group balances of 3–4** |
| Y6 | 57–58 | Orientating a map; walking a 90° bearing (Y4/Y5) | **Real orienteering maps** (colours, control descriptions); **route choice, contours and pace counting** |
| Y6 | 60 | Float to Live / rips / throw-don't-go (verbatim Y5 L51–53) | **Rivers, lakes, tides and ice** — risk-assess a local spot |

Y6 overview wrongly assumed Y5 taught striking/fielding; corrected (it is new in Y6) and the whole
"What we assume" paragraph rewritten. Vertical notes, vocabulary, end-of-unit and mastery checks updated.

### Left as deliberate spiral (noted, not changed)
Relay changeovers, sprint starts and throws recur Y4→Y6 with rising technical demand; invasion and net
games recur with tactics deepening; swimming recurs as a practical skill.

### Books
Real and appropriate: Taylor *Celebrate Your Body*, Natterson *Guy Stuff*, Schaefer *The Care and
Keeping of You*, *Hair Love*; Humphreys *The Boy Who Biked the World*; RNLI, Youth Sport Trust, WHO 2020
guidelines, Red Cross/St John, British Orienteering, IPC. No changes.

---

## Computing

### Code correctness
Every Python example and expected answer was run: `range(2, 10, 3)` → 2, 5, 8; `"3" * 4` → `3333`;
the trace 5 → 8 → 16; `17 // 5`, `17 % 5` → 3, 2; the one-line 7-times-table loop; string indexing,
`len`, slicing `[::-1]`; `animals[2]` → `"owl"`; the rectangle function; nested-loop count 3 × 4 = 12;
binary 10110 → 22, `chr(65)` → `A`. Turtle angles (triangle 120°, pentagon 72°, 360 ÷ n) and the
guessing-game bound (2⁷ = 128 ≥ 100 → 7 guesses) are correct. Spreadsheet `IF(C4>100,…)` with C4 = 100 →
"Low" is correct. No errors found in the code.

### Repeats found
- **Networks/packets three times:** Y4 Unit 1 (network, packets, web), Y5 Unit 1 (network, packets, IP/DNS, Caesar), Y6 Unit 5 (network, packets/IP, DNS/HTTPS, Caesar).
- **Python re-taught from zero in Y6:** Y6 L1 "From blocks to text", L9 `if/else` with the same `=` vs `==` check as Y5 L28, L12 `for`/`range`, L13 turtle polygons with the same exterior-angle check as Y5 L25–26. Y6's overview assumed only "a first look at text-based code".
- Y5 L32 "Is it true?" repeated Y4 L29 "Is it true?".

### Changes
**Year 5:** Unit 1 networks → **Inside the computer: binary and data** (components, memory vs storage;
binary cards to 31 and a byte = 255; ASCII and Unicode; pixels, RGB, resolution and run-length
compression; encode-and-decode check) — a topic neither Y4 nor Y6 teaches and which Y6 names as a
secondary prerequisite. L32 → **adverts, influencers and sponsored content** (retrieves Y4 fact-checking).
L33 AI now retrieves Y4 and stays unplugged (Y6 trains a real model). Overview, mastery checks,
misconceptions and vertical notes updated; added Liukas's *Hello Ruby: Journey Inside the Computer*.

**Year 6:** overview rewritten to state exactly what Y4–Y5 taught; L1 → **Python restart diagnostic**
(PRIMM on Y5-style code, planted errors); L9 → **Boolean values and all six comparison operators**
(new check on storing a Boolean); L12 retrieves Y5 `for`; L13 turtle → **nested loops: grids and
patterns** (new trace/count check); L28 packets → retrieval plus **IPv4 as four bytes (binary link),
`ping`/`traceroute` hops and TCP resending**; vocabulary, vertical note and L35 reflection updated.

### Books
Verified: Liukas *Hello Ruby*; DK *Coding Projects in Python* and *Coding Games in Scratch*/*in Python*;
Stanley *Ada Lovelace, Poet of Science*; Wallmark *Grace Hopper: Queen of Computer Code*; Briggs
*Python for Kids*; Raspberry Pi Foundation, NCCE, CS Unplugged, Thonny, Teachable Machine,
submarinecablemap.com, BBC Bitesize, *Hello World*. No removals.


## Life skills

### Repeats found (the worst of any subject)
- **Year 5 was largely a copy of Year 4**, lesson by lesson. Repeated lessons: identity map, strengths and values, the comparison trap and self-talk, growth mindset and the brain, SMART goals (same "read more" check), conflict steps, peer pressure and assertiveness, earning and pay, budget, saving and interest, borrowing, two enterprise lessons, the SDGs, a waste audit, planning and reviewing a project, UNCRC rights, stereotypes, changemakers, and planning and running service. Y5 L7's check ("You always ruin the game!" → I-statement) was word for word Y4 L10's, and Y6 L12 used it a third time.
- **Year 5 also repeated other Year 5 subjects:** advertising and in-app purchases (now Computing L32); fair trade (Geography L22); body image, mental health, five ways to wellbeing and sleep (PE & Health Unit 4).
- **Year 6 repeated Year 5 (and Year 4):**
  - an identity map and values card sort (the third year running);
  - growth mindset, and a metacognition check identical to Y4 L13 ("Why is testing yourself better than re-reading?"), taught again in Y6 L29;
  - gratitude letters and "three good things" (Y4 L3/L6);
  - the assertive "I" statement check;
  - the UNCRC rights-with-responsibilities pairing (Y4 L30, Y5 L30);
  - a class election as its Joy (Y5 L33);
  - in-app purchases, loot boxes and influencers (Y5 Computing L32).
- **Y6's "What we assume from Year 5" described a different Year 5**: online reputation, first aid, spotting scams and so on, none of which the Y5 file taught.

### Changes: Year 5 (rewritten, 6 units, 35 lessons)
Year 4 is retrieved briefly and applied to harder situations; nothing is taught again at the same depth.

**Unit 1 — Who I am becoming: identity, values and influence**
- L1 Many groups, one me (code-switching vs losing yourself).
- L2 Values under pressure: dilemmas, with a three-question test.
- L3 Who influences me? (recommendation algorithms).
- L4 Feelings with more than one name (mixed emotions; envy vs jealousy).
- L5 Belonging: welcoming newcomers (kept, with a stronger check).

**Unit 2 — Friendship, safety and speaking up**
- L6 When friendships change.
- L7 Group chats and online friendships (minimum age of 13; parent note).
- L8 Dares, risk and pressure (risk-weighing questions and exit lines; no dangerous challenges named).
- L9 Bullying, bystanders and upstanders (the check now requires applying the three criteria).
- L10 Disagreeing well (steelmanning).
- L11 Staying safe and getting help (independence, safe vs unsafe secrets, grooming warning signs taught age-appropriately; parent note and safeguarding).

**Unit 3 — Resilience, change and helping each other**
- L12 Nerves and performance (the stress curve).
- L13 Solving problems step by step (circle of control).
- L14 Coping with change and loss (stronger parent/sensitivity note).
- L15 Asking for help and helping a friend, including when a promise must be broken to keep someone safe.
- L16 Leadership and being a role model (sealed letters now opened in Y6 L1).

**Unit 4 — Money in the real world**
- L17 Banks, accounts and ways to pay (statement check: 40 − 12.50 + 15 = 42.50).
- L18 Scams and phishing.
- L19 Value for money (unit prices: 0.48 vs 0.44 per 100 g).
- L20 Taxes and public services (council budget simulation).
- L21 Careers, skills and job stereotypes.
- L22 Planning a real class event on a budget (10% contingency: 138 > 135).
- L23 "Money month" simulation.
- There is no enterprise lesson in Y5; Y4 and Y6 each do one, at increasing depth.

**Unit 5 — Sustainability: changing habits**
- L24 Food waste, with a baseline measurement.
- L25 Climate fairness (hopeful framing).
- L26 Why habits are hard: nudges (easy, normal, visible, timely).
- L27–29 A **pupil-led group behaviour-change campaign** with a baseline, a target and a re-measure. The check asks for a percentage decrease (12 → 9 kg = 25%) plus alternative explanations. This builds on Y4's teacher-led class project.

**Unit 6 — Fairness, justice and having a voice**
- L30 Rules, laws and restorative justice.
- L31 From stereotype to prejudice to discrimination (the check labels each step; safeguarding note on prejudice incidents).
- L32 Inclusion and the social model of disability (the check applies the model).
- L33 Democracy in action (links to Y5 History L30, votes for women).
- L34 Writing to a real decision-maker.
- L35 Reflection.

Overview, assumptions, mastery checks, misconceptions and vertical notes were rewritten. An explicit note now says which topics PE & Health, Computing and Geography own.

### Changes: Year 6
- **Overview:** the "assumes" paragraph was rewritten to match what Years 4–5 actually teach; "adds" was updated; duration range corrected to 35–45 min.
- **L1** → *My values and my purpose*. It opens the Y5 sealed letters, and the issue list it starts seeds the capstone in L27. The new check asks for a time the pupil acted with their values and a time they acted against them.
- **L3** → *Growth mindset done right* (false growth mindset, the learning pit, changing strategy). The new check is applied to a scenario rather than recalled.
- **L4:** retrieves SMART; the dubious "most resolutions fail by February" statistic was softened.
- **L6:** the hand model is flagged as a simplification and retrieves Y5.
- **L9** gratitude → *Self-compassion, perfectionism and realistic optimism*.
- **L12** → *Assertiveness in hard situations* (the DESC script, with adults and older pupils).
- **L15:** bullying deepened with banter vs bullying, prejudice-based bullying and the bystander effect / diffusion of responsibility, plus a new check.
- **L18:** muddled answer fixed ("Cash: 12 × 30 = 360" → "Cash is cheaper: on credit you pay 360, 60 more").
- **L19** in-app/advertising → *Work, pay and tax: reading a payslip* (2,000 − 360 = 1,640).
- **L22** UNCRC recap → *Human rights in tension* (UDHR/UNCRC, rights clashes, who upholds rights; "rights court").
- **L23:** retrieves the Y5 election; its Joy is now a mock council meeting; the Soweto link now points to History Unit 5.
- **L24:** the water figure is labelled as an estimate.
- **L29:** now clearly builds on L3 and Y4.
- Vocabulary, end-of-unit checks, mastery check 4 and the vertical note were updated; Oettingen's *Rethinking Positive Thinking* was added.

**Facts checked:**
- Penny doubling: 2²⁹ = 536,870,912 cents on day 30.
- Compound interest: 110 / 121 / 133.10.
- Break-even: 20 ÷ 1.20 → 17.
- UNCRC 1989: Arts 12, 19, 28 and 31; the most widely ratified treaty.
- WOOP comes from Oettingen; the hand model from Siegel; *The Story of Stuff* is by Leonard (2007).

**Capstone vs README:** checked and consistent. L27 is the launch, L31–35 run the project, L33 is the action and L35 is the exhibition. Every cross-subject unit the capstone cites exists, including:
- English Units 4, 5 and 9;
- Maths Units 12 and 13;
- Geography Units 5 and 7;
- Computing Units 4 and 7;
- Art Units 6 and 7;
- Science Unit 9;
- History Unit 6 (oral history).

### Books
- **Y5 removed:** *The Colour Monster* (real, but written for ages 3–6, so too young here).
- **Y5 added (all certain):** Draper's *Out of My Mind*, which supports L32.
- **Y5 kept:** *Wonder*, *The Boy at the Back of the Class*, *I Am Malala* (YRE), *If the World Were a Village*, *Mindset*, UNICEF, and the World's Largest Lesson.
- **Y6 kept:** Covey; Siegel & Bryson; Mackesy; *I Am Malala*; *The Boy Who Harnessed the Wind* (YRE); *Factfulness*; CASEL; VIA; the SDGs; *The Story of Stuff*.
- **Y6 added:** Oettingen.
