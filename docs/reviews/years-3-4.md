# Curriculum review — Years 3 and 4 (non-core subjects)

**Scope.** `curriculum/year-{3,4}/{science,history,geography,languages,art-design,music,pe-health,computing,life-skills}/*-year-{3,4}.md` and `curriculum/year-{3,4}/README.md`, reviewed against `SCHOOL-CHARTER.md` and `curriculum/PLANNING-BRIEF.md`. Branch `review/y34` (from `c89e30b`). Maths and English were out of scope and were not edited.

**What was checked.** (1) Facts: science, history, geography, music, Spanish, dates, names, expected answers, misconceptions; UK-only framing; multi-continent history and geography with more than one perspective. (2) Age fit: durations 25–40 min, safety notes for practicals and PE, sensitive content. (3) Checks for understanding that test explaining, applying or comparing (not recall only); support genuinely easier, stretch genuinely harder. (4) Books and resources: real and certain, not reused from earlier years. (5) Coherence Y3 → Y4 inside each subject, and the boundaries with Year 2 (as revised on branch `review/y12`) and Year 5 (read only).

**Rules used.** File format kept exactly (brief §3): unit and lesson counts unchanged, lesson numbers continuous, all eight fields present. Every edited file was re-parsed with `parseScopeFile` (`server/src/services/curriculum-scope.ts`) after each change. Where content repeated across years, **the lower year keeps it and the upper year changes**; the upper year opens with a brief retrieval of the earlier lesson and then teaches something genuinely new.

## Headline findings

- **Vertical repetition was the biggest problem.** Large parts of Year 3 re-taught Year 2 lesson-for-lesson (often with identical checks), and Year 4 re-taught Year 3 or Year 2 (Year 4 geography repeated four of its six units; Year 4 computing taught "how the internet works" for the third time; Year 4 dance and health repeated Year 3 almost entirely). All such repeats in the 18 owned files were replaced with retrieval + new content.
- **Factual errors fixed** (examples): Tokyo said to be in night when it is morning in London; "two pulleys halve the force"; oil-over-unboiled-water rust test; knowledge "survived in Córdoba" after 1258; a C major ukulele scale on impossible strings; Hokusai described as using reduction prints; Ai Weiwei's *Sunflower Seeds* makers under-counted; "Victorian statue of Boudica"; a Greek "amphitheatre"; Colorado River "flows through seven states"; unverified "cocoa farmers have never tasted chocolate".
- **Books:** removed or replaced every book that was reused from Years 1–2, unrelated to its unit, or not certain (see each subject). All added books are real, published titles.
- **Safety and sensitivity:** added or tightened notes for rust set-ups, button batteries, needles, water safety (rip currents, ice, lifejackets), allergies (children never singled out), weighing (children never weighed), flamenco footwork floors, breaking (no head-supported moves), grapes as a choking risk, and safeguarding for PANTS online.

## Coordinator request: Year 2 → Year 3 repeats (from the Years 1–2 reviewer)

The Years 1–2 reviewer found Year 3 re-teaching Year 2 at the same depth in four places. All four are fixed so that Year 3 briefly retrieves the revised Year 2 content (`review/y12`) and then goes further:

| Area | Year 2 (review/y12) | Year 3 now |
|---|---|---|
| Geography: compass directions and grid references | eight compass points, four-figure grid references, symbols, aerial photos, scale | L1 sixteen-point compass and magnetic compass; L2 atlas contents/index and map types; L3 digital map layers and measuring tool; L4 large- vs small-scale maps and winding routes (each opens with a one-minute Year 2 retrieval). Setting the map moved to PE (Y3 L66, with map scale and pace counting) to avoid a geography/PE duplicate. |
| Music: recorder notes and pentatonic | B, A, G, high C and D, low E and D; C pentatonic question-and-answer with graphic scores | one retrieval lesson on all seven notes, then F sharp and key signatures, low C, slurs, ledger lines and middle C; major vs minor pentatonic; staff notation is the composing goal (graphic scores as support only) |
| Computing Unit 1: loops | unplugged loops, repeat, forever, pen polygons, Grace Hopper | nested loops, loops that change values, nested-loop patterns (12 × 30° = 360°), parallel scripts and broadcast ordering, trace-table debugging |
| Spanish Units 2–5 | calendar, weather and reversed seasons, family words with *mi/mis* and *tengo*, pets with plurals and agreement | one retrieval lesson per unit, then *tu/su*, the full present of *ser*, question words, plural adjectives, first regular *-ar* verbs, comparatives, prices, years, temperatures and weather intensity |

The same rule was then applied to every other Year 3 subject (science, history, art, PE & health, life skills), because the revised Year 2 files showed the same pattern there.

## Changes by subject

### Science Y3
- L4 fire check: "doesn't reproduce, feel, or have cells" -> precise (not made of cells, no sensitivity; spreading != offspring).
- L8 Canis familiaris (now usually Canis lupus familiaris) -> Panthera leo / Homo sapiens.
- L22 stretch "panda (a carnivore by family)" -> member of bear family (order Carnivora), wording corrected.
- L23 hook "eggshell is a similar mineral to enamel" -> both calcium-based minerals attacked by acid (eggshell = calcium carbonate, enamel = hydroxyapatite).
- L25 "digestive system is 9 m" -> "stretched out ~8–9 m", small intestine ~6 m stretched; note living tract is shorter/coiled.
- L27 recall check -> Beaumont's jar (in-vitro gastric juice) reasoning check.
- L34 recall check "Why is 0 °C important" -> apply check (freezer −18 °C vs kitchen 21 °C).
- L44 check asked about cloud cover that was never recorded -> cloud cover added to daily readings.
- L36 + L42 both tested temperature vs evaporation (within-year repeat) -> L36 now surface area + moving air; L42 keeps the temperature fair test. New L36 check (towel spread vs heap).
- L38 sorted irreversible changes (cake, egg) and asked the same chocolate/cake question Year 4 Unit 2 teaches -> now reverses the change-of-state cycle only; new apply check (puddle frozen then evaporated).
- L60 stretch/joy (pressure-switch burglar alarm) duplicated Year 5 L44 project -> clothes-peg switch (conductor/insulator reasoning) + card lighthouse.
- L62 "more cells, brighter bulbs" (UK Y6 content, taught again as Year 5 L40) -> "Inside a torch: a real circuit" (UK NC Y4: name parts of a series circuit), with button-battery safety note. Kit list updated.
- L68 example question "temperature and sugar dissolving" pre-empted Year 4 L9 -> replaced with Year 3-content questions.

### Science Y4
- L1 hook "saucepan handle never made of metal alone" (false: many are steel) -> "Why do so many saucepans have plastic or wooden handles?"; added retrieval starter for magnetism/conductivity.
- L4 Electrical conductors and insulators = repeat of Y3 L61 (same tester circuit, same copper/plastic check) and again Y5 L42 -> replaced by "Strength: which thread holds the most? (investigation)" with a fair-test reasoning check.
- L5 now explicitly builds on Y3 L35 ice-cube test (temperature/cooling curve is the new step).
- L7 Magnetic materials = near copy of Y2 L61 (same "not all metals" check, same magnet-fishing joy) -> "Absorbency (investigation)"; end-of-unit check updated; vocabulary adds strength/absorbent/waterproof.
- L11 "Dragons' Den" (UK TV) -> inventors' pitch panel.
- L18 reversible changes repeated Y3's chocolate melt/re-set check and joy -> dissolving/mixing as reversible with stations; slush-in-a-bag joy.
- L20 rust set-up: "oil-covered water" without boiling still contains dissolved air, so the "needs air and water" conclusion would not follow -> boiled-and-cooled water under oil (adult), drying agent for dry air.
- L28 day & night = Y2 L51 (same check "why does the Sun seem to move") -> which way Earth spins + Shanghai/Kashgar sunrise check (~3 h, same clock time). Stretch "night in Tokyo when morning in London" was wrong (8am London = 4–5pm Tokyo) -> "midday in Lagos".
- L29 shadow-stick investigation = Y2 L52 (identical check) -> "The Sun is a star (investigation)": brightness vs distance (NGSS 5-ESS1-1), Sirius ~25x Sun's output, nearest star ~270,000x further; star lore from several cultures.
- L44 friction on surfaces with shoe + newton meter = Y2 L57–60 -> new variable: weight vs friction force, line graph, prediction check.
- L46 pulleys: "two pulleys halve the force" imprecise (a single fixed pulley gives no advantage) -> fixed vs movable pulley, effort about half with two supporting strings, friction caveat.
- L56 check "birds hatch as small versions of the adult" (untrue for altricial chicks) -> no metamorphosis / parental care.
- L57, L58 retrieve Y2 flower/pollination/dispersal and add new depth (ovules; wing-length fair test with means); L58 check was identical to Y2 L12 -> investigation-based check.
- L59 check nuance (seeds usually from two parents; cutting is part of one parent).
- L67 example "which ball bounces highest" repeated Y3 Unit 1 -> Year 4 questions.
- Mastery check 6: "night in Japan when it is morning in Europe" (false) -> "midday in Europe".
- Teacher guidance vertical links rewritten to state what is retrieval vs new.

### History Y3
- Overview + vertical links said Year 4 = "Anglo-Saxons, Vikings and the Maya" -> corrected to what Year 4 actually teaches (Vikings, Abbasid Baghdad, Benin, Maya).
- L1 check "Why is 500 BC earlier than 200 BC" = Year 2 L2 check -> apply check (Rome 753 BC vs Kushite rule c. 744 BC, 9 years).
- L2 primary/secondary sort = Year 2 L3 -> "Sources: who made it, and why?" (purpose/bias of coins, inscriptions vs everyday objects).
- L3 tray-dig archaeology = Year 2 L4 (and Year 4 L3) -> "The first historians: can we trust them?" (Herodotus, c. 484–425 BC; claim-checking against archaeology). Herodotus was in the unit vocabulary but never taught.
- L9 "amphitheatre acoustics" (amphitheatres are Roman) -> Greek theatre, e.g. Epidaurus.
- L15 "Victorian statue of Boudica" -> Thornycroft statue, made in Victorian times, put up 1902.
- L25–26 Shang oracle bones + Shang bronze = Year 2 L29 -> L25 "The Shang revisited: how the oracle bones were found" (1899, Anyang excavations from 1928, confirming the later king lists); L26 new "The Zhou and the Mandate of Heaven" (fills the Shang->Qin gap). Ban Zhao added as stretch in L30.

### History Y4
- Overview "assumes/relies on" rewritten (Year 5 was said to do Tudors/Atlantic trade/WWII — it does not).
- L2 primary/secondary sort (third time: Y2 L3, Y3 L2) -> "Checking a claim: when sources agree and disagree" (corroboration; Annals entry for 837, sixty ships on the Boyne).
- L3 tray dig (third time: Y2 L4, Y3 L3) -> "Dating the past" (tree rings, coins as 'no earlier than', radiocarbon); check on coin dating logic.
- L7 Alcuin described as "a scholar at Charlemagne's court" -> Northumbrian scholar who worked at the court.
- L17 knowledge "survived in Córdoba" after 1258 (Córdoba had been Castilian since 1236) and Samarkand (sacked 1220) -> Cairo, Damascus, and the Maragha observatory (1259).
- L31 vague expected answer "Accurate comparison" -> concrete model answer.
- Books: removed *Journey to Jo'burg* (apartheid-era novel, no link to medieval units) and *Tristan Strong* (no link to Benin); added *Rain Player* (David Wisniewski, Maya) and Digital Benin.

### Geography Y3
- Unit 1 (L1–4) repeated Year 2 Unit 2 lesson-for-lesson (eight points, four-figure refs, symbols/aerial photos, scale — even the same checks) -> retrieval starters + new skills: L1 orienteering and setting the map; L2 atlas contents/index and choosing map types; L3 digital map layers, zoom, measuring tool; L4 large- vs small-scale maps and measuring a winding route. Vocabulary, end-of-unit check and mastery check 1 updated.
- L6 "Build on the science water cycle" and L10 "use the class weather-station data (from Science)" — both in Term 1, but Science teaches those in Term 2 (L40–44) -> recall from Year 2 rivers / a week of class weather observations; overview horizontal link corrected.
- L7 "carry a full 10-litre bucket … (a smaller amount for safety)" was self-contradictory -> 3–5 litres, then calculate trips for 20 litres.
- L11 torch-and-globe demo repeated Year 2 L3 -> retrieval + a temperature transect along ~30° E (Murmansk to Kampala) with an altitude 'surprise' (Kampala ~1,200 m).
- L30 hook "Most cocoa farmers have never tasted a chocolate bar" (unverified viral claim) -> "Many cocoa farmers rarely, if ever, eat the chocolate made from their beans. Why?"
- Overview/vertical links corrected to Year 4's actual (new) units.

### Geography Y4 — re-planned (35 lessons, 6 units, numbering and format kept)
Old Year 4 repeated earlier years almost unit-for-unit: Unit 1 lat/long/hemispheres/time zones = Year 2 Unit 1 (and time zones also in Year 4 science L30); Unit 2 restless Earth = Year 2 Unit 4 (and again Year 5 Unit 2, Year 6 Unit 2); Unit 3 rivers = Year 2 Unit 3 (and again Year 5 Unit 3); Unit 4 Amazon lessons 21–24 = Year 3 Unit 4 (same Manaus climate graph, layers, Yanomami, fishbone deforestation, even *The Great Kapok Tree*); Unit 5 settlement site and land use = Year 2 L33–34. Coasts, North America and Antarctica were taught in no year.
New plan:
- Unit 1 Coasts (L1–7): coasts of the world by lat/long; waves and tides; headland → stack; longshore drift and spits; ports, fishing, tourism; hard vs soft defences and sea-level rise; virtual-fieldwork assessment.
- Unit 2 Region study: the Colorado River and the desert Southwest (L8–14): North America; drainage basins/watersheds; Grand Canyon rock layers; desert cities, Lake Mead, heat islands; sharing the river (farms, cities, Mexico, Navajo Nation, 2014 pulse flow); comparison with home; fair-guide assessment.
- Unit 3 Antarctica (L15–20): extreme continent (−89.2 °C Vostok 1983, a desert); Amundsen/Scott route with scale; Southern Ocean krill food web; Antarctic Treaty 1959 and 1991 mining ban; land-ice vs sea-ice sea-level model and ice cores; station-design assessment.
- Unit 4 Mountains (L21–27): fold mountains (kept, deepened from Y2); altitude and temperature (La Paz vs Santa Cruz); Andes farming zones and terraces (kept); Himalaya/Nepal tourism; glaciers as water towers (Chacaltaya); comparison; assessment.
- Unit 5 Natural resources and energy (L28–32): resources (kept); electricity mixes and geography (Norway hydro, Iceland/Kenya geothermal); minerals in devices (Chile copper, DRC cobalt, Australia lithium); reading a real topographic map (four-figure refs, symbols, scale); town energy plan.
- Unit 6 Fieldwork (L33–35): microclimates of the school grounds (instruments, gridded sites, mapped results) instead of a third traffic/litter survey (Year 3 and Year 5 both do those).
- Books: removed *The Explorer*, *The Great Kapok Tree* (Year 3 already), *Volcano Wakes Up!* (unit removed); added *Grand Canyon* (Jason Chin), *Shackleton's Journey* (William Grill), *Everest* (Alexandra Stewart & Joe Todd-Stanton), *Hello Lighthouse* (Sophie Blackall).

### Languages (Spanish) Y3 — third pass of Year 1–2 topics removed (coordinator/Y1–2 reviewer boundary note)
Year 2 (as revised on review/y12) already teaches the calendar, weather and reversed seasons, family words with mi/mis and tengo, pets with plurals and colour agreement, Latin American animals, Día de los Muertos, Inti Raymi, Carnaval and *La oruga muy hambrienta*. Year 3 re-taught all of these at the same depth. Kept the unit themes (so Year 3 still "revisits family, animals, the calendar and weather", as Year 2 now promises) but each unit now opens with ONE retrieval lesson and then teaches new structures:
- Unit 2: L7 one-lesson family retrieval; L8 tu/tus and su/sus (new); L9 full present of ser (new); L10 question words with accents (new); L14 family tree (Year 2 L32 activity) -> written portrait of one person (Frida Kahlo hook).
- Unit 3: L16 one-lesson pets/agreement retrieval with 'mistake detectives'; L17 plurals (now taught in Year 2 L35 with the same check) -> plural adjectives and muchos/pocos/unos; L18 habitats with vive en; L19 first regular -ar verbs (yo -o / él -a); L20 comparisons más … que; L23 fact file; L24 animal expo.
- Unit 4 (renamed "Números, precios y el calendario"): L27 one-lesson calendar retrieval (days, months, date); L28 prices (¿cuánto cuesta?); L29 years (dos mil veintiséis, nací en); L30 shop role-play with a budget; L31 temperatures and bajo cero. Removed the re-taught days, months, date, birthdays and reversed-seasons lessons.
- Unit 5: L34 weather retrieval + intensity (hace mucho frío, not *muy frío*); L35 comparing cities' weather with más … que.
- Unit 8: L58 Día de Muertos (Year 1, Year 2 and a whole Year 4 unit) -> Oaxaca's Guelaguetza; L60 Inti Raymi + Carnaval (Year 2 L57–58) -> New Year (las doce uvas, el Año Viejo in Ecuador), with a choking-risk note for grapes; L59 check upgraded from city/month recall.
- L64 *La oruga muy hambrienta* (Year 2 Unit 6, and Year 4 again) -> *El monstruo de colores* by Anna Llenas (Spanish original; feelings + colours).
- L4 and L5 checks repeated Year 1–2 checks (pero/perro; un lápiz/una regla) -> distinción/seseo reasoning; plural lápices azules.
- Overview, key vocabulary, end-of-unit checks and a new mastery check (ser, -ar verbs, question words) updated; assumptions from Years 1–2 now accurate (numbers to 50, not 0–31).
- Books: *La oruga* entry -> *El monstruo de colores*; "British Council Schools Online" (name no longer certain) -> generic partnership programme.

### Languages (Spanish) Y4
- Overview "assumes from Year 3" listed Year 1–2 content (numbers to 31, pets, calendar) -> actual Year 3 content; states Year 4 retrieves rather than re-teaches.
- L2 Numbers 31–100 (Year 3 L25 again) -> 100–1,000 (cien/ciento, irregular quinientos/setecientos/novecientos, years such as 1492).
- L4 check pero/perro (asked in Years 1, 2 and 3) -> Rosa / perro / caro rule.
- L8 recall check -> error-correction check (article after gustar).
- L9 me gusta vs me gustan (Year 3 L52) -> ¿te gusta? / le gusta(n) / nos gusta (reporting others).
- L20 Día de los Muertos meaning (Years 1–2) -> roots (Indigenous + All Saints'/All Souls') and regional customs (Pátzcuaro, Mixquic), UNESCO 2008.
- L29, L61 recall checks -> reasoning checks.
- L36 plurals (Year 2 L35, Year 3) -> body instructions with command forms (levanta, dobla, mueve).
- L50 hay/no hay (Year 3 homes unit) -> hay vs está; L51 del check (identical to Year 3 L44) -> new prepositions entre / enfrente de, del vs de la.
- L59–60 *La oruga muy hambrienta* (third reading after Years 2 and 3) -> *El grúfalo* (Spanish edition of *The Gruffalo*), with a monster-story writing task using the body unit; L62 *De colores* (Year 3 L61) -> Gloria Fuertes poems; L64 and end-of-unit check updated.

### Follow-up after the revised Year 2 (review/y12)
- Science Y3 L17 Wangari Maathai: taught in Year 1 and retrieved in revised Year 2 -> Yacouba Sawadogo, zaï pits and the Great Green Wall (Sahel), with a run-off model; Wangari retrieved in one sentence; overview and book note updated.
- Science Y4 L28: revised Year 2 L51 now teaches that Earth spins towards the east -> Y4 L28 now quantifies the spin (15° per hour) and predicts sunrise delays; L30 time zones now about why zones follow 15° steps and why clock time and Sun time differ (China's single zone, half-hour zones) instead of a Year 2-level time-difference question.

### Music Y3 — Year 2 repeats removed (coordinator/Y1–2 reviewer note) and facts
Revised Year 2 already teaches recorder B, A, G, high C, high D, low E and low D, crotchets/quavers/minims/rests, ostinato (with *Boléro*), rounds, gamelan interlocking, and pentatonic question-and-answer composing with graphic scores. Year 3 re-taught all of these.
- L1 floor-stave line/space basics -> whole stave incl. ledger lines and middle C.
- L2 revise B, A, G -> one retrieval lesson on all seven Year 2 notes; L3 high C and D (Year 2 L20–21) -> F sharp, the sharp sign and key signatures; L5 low E and D (Year 2 L22) -> low C (written as middle C) and slurring.
- L4 rhythm: now retrieves Year 2 values; new = semibreve and minim/semibreve rests; check changed.
- L6 'Frère Jacques' needs high E, outside the taught range -> any folk tune within C–D'.
- L9 Ravel *Boléro* ostinato (Year 2 L4–5, same hook) -> ground bass: Pachelbel's Canon (8-note bass uses the new F sharp).
- L10 drone check deepened; drones from Scotland, India and the Yolŋu yidaki (listen only, respecting that it is traditionally played by men).
- L11 Holst 'Mars' 5/4 ostinato was taught again in Year 4 L18 -> Steve Reich's *Clapping Music* (1972, phasing).
- L12 gamelan interlocking (Year 2 L18; again in Year 4 L24 and Year 5 L21) -> Aka (BaAka) polyphonic singing, Central Africa.
- L30 pentatonic C D E G A with F/B removed (Year 2 Unit 5) -> major vs minor pentatonic moods (home note C vs A).
- L32 composing: graphic scores (Year 2) now support only; staff notation is the goal.
- L29 / listening list: 'What a Wonderful World' does not show jazz improvisation -> 'West End Blues' (1928).
- Vocabulary, end-of-unit check, mastery checks 1, 4, 6 and vertical links updated.

### Music Y4
- Unit 4 world music (samba, djembe, gamelan, raga) repeated Year 3 L20–22 and Year 2 L18 lesson-for-lesson (and Year 5 Unit 4 repeats it again) -> "Music of the world II": steel pan (Trinidad and Tobago), flamenco palmas and the 12-beat compás (accents 3, 6, 8, 10, 12), Chinese erhu/pipa/guzheng with Abing's "Erquan Yingyue" and "Mo Li Hua", Arabic oud/maqam/maqsum (Munir Bashir), Mongolian khöömei and morin khuur; L26–27, composition unit, mastery checks, listening list and cultural notes updated.
- L3 "Shalom Chaverim" (Year 2 L15) -> "Zum Gali Gali" (minor) with "Dona Nobis Pacem" (major).
- L13 C major scale "on the A and E strings" is impossible (C and D are on the C string) -> across the C, E and A strings.
- L15 semibreve–quaver now retrieved from Year 3; semiquaver is the new value.
- Overview assumptions and vertical links corrected (Year 5 is keyboard and film soundtrack, not "genres … electronic").

### Computing Y3 — Year 2 repeats removed (coordinator/Y1–2 reviewer note)
Revised Year 2 already teaches loops unplugged, repeat (same walking-cat check), forever (same aquarium), pen polygons (360 ÷ sides), Grace Hopper debugging, networks/internet/undersea cables, packets (identical "Why are packets numbered?" check), Tim Berners-Lee and internet vs web, passwords (three random words), reliability checks, kindness online, adverts and screen balance.
- Unit 1: L1 spot-the-repeat -> nested loops unplugged; L3 repeat block -> loops that change values (size 100% -> 200%); L4 pen polygons -> nested-loop flowers/snowflakes (12 × 30° = 360°); L5 forever -> parallel scripts + broadcast ordering; L6 Grace Hopper intro -> debugging loops with trace tables (Hopper retrieved). L2 Ada Lovelace kept (deliberately not in Year 2). End-of-unit and mastery checks updated.
- Unit 3: L14 network parts -> signals by copper, fibre and Wi-Fi (torch code); L15 packets -> check numbers and resending damaged packets; L16 network of networks -> servers, data centres and 'the cloud' (energy/cooling); L17 internet vs web -> reading a URL (domain, path, https, look-alike addresses); L18 check and unit check updated.
- Unit 5: L28 searching (Year 2 L31, and Year 4 L28) -> "Who writes the web? Wikis, reviews and comments".
- Unit 6: L30 personal info + passwords (Year 2 L30) -> privacy settings and app permissions; L33 screen-time tricks (Year 2 L33) -> screens and sleep.
- L20 stretch "celery for breaking bones" -> breaking branch / horses' hooves (age-appropriate).
- Overview, assumptions, vocabulary, misconceptions and vertical links updated.

### Computing Y4
- Unit 1 "How the internet works" (what is a network, network of networks, packets, WWW, journey of a web page) was the third teaching of the same content (Year 2 Unit 3, Year 3 Unit 3; Year 5 Unit 1 teaches it a fourth time) -> "Inside the computer": input–process–output, processor/memory/storage (adult-opened old PC, power supply sealed), binary with CS Unplugged cards, pixels as numbers, smart-device design. Fills the UK NC "understand computer systems" gap that no year covered.
- L29 reused the tree-octopus hoax from Year 3 L25 -> misinformation and why false stories spread ("10% of our brains" myth).
- L32 three-random-words check repeated Years 2–3 -> phishing, scams and two-step verification.
- L33 unkindness/balance check repeated Years 2–3 -> online pressure: viral dares, limited-time in-game offers.
- Overview, assumptions, end-of-unit checks, mastery checks 4, 6, 7, misconceptions and vertical links updated.

### Art & Design Y3 — repeats of Years 1–2 removed
Revised Year 2 teaches the sketchbook, blind contour, Leonardo and Dürer's *Young Hare*, a 5-step tonal scale and shaded sphere, the 12-part colour wheel with tertiaries, tints/shades/tones, warm and cool (Klee), Kandinsky and music, O'Keeffe, Hokusai, weaving beyond over-under, Andean weaving and batik-style resist; Year 1 taught Kente and Anni Albers card-loom weaving. Year 3 re-taught most of these (L1–L7, L13, L16, L21–24, L28 — even the same Dürer, O'Keeffe, Kandinsky and Hokusai lessons).
- Unit 1: L1 -> sketchbooks as research (collecting, colour notes); L2 -> line weight across pencil, charcoal and ink (blind-contour joy replaced); L3 Dürer -> Margaret Mee botanical study (links to the Amazon in Geography).
- Unit 2: L4 colour wheel -> Seurat and optical mixing; L5 tints and shades -> harmonious schemes (Alma Thomas, Sonia Delaunay); L6 warm/cool -> Franz Marc's colour symbolism; L7 Kandinsky/music -> colours across cultures; L8 complementary and L9 digital kept. Vocabulary and unit check updated.
- L13 O'Keeffe -> Tarsila do Amaral (smooth colour, bold shapes; South America).
- L16 pencil tonal scale -> charcoal and chalk on toned paper; L17 now retrieves the Year 2 sphere and adds cube/cylinder; L18 Henry Moore hook corrected (his shelter drawings used wax crayon and layered lines, not only "criss-cross lines").
- Unit 5 weaving (Kente, paper weaving, card loom, Albers, El Anatsui — Years 1–2 and again Year 4/5) -> "Stitch, appliqué and story quilts": Hmong story cloths, Fon appliqué of Abomey (Benin), running/back/cross stitch, kantha, Gee's Bend and Faith Ringgold, class story quilt (needle-count safety).
- L28 Hokusai (Year 2 L17, and Years 4 and 5) -> Chinese *shan shui* landscape (Fan Kuan, depth with mist and layers). L30 Namatjira now named as a Western Arrernte artist.
- Books: removed *The Noisy Paint Box* and *Through Georgia's Eyes* (Kandinsky and O'Keeffe are Year 2); added Faith Ringgold's *Tar Beach*; the Prestel *13 Artists* entry no longer claims specific contents.
- Mastery checks 1, 2, 4, 5, misconceptions, safety and vertical links updated.

### Art & Design Y4
- Printmaking: L7 "Hokusai and Dürer" -> Dürer's *Rhinoceros* (1515) with Hokusai retrieved; L8 Adinkra stamping (Year 1) -> monoprinting (Degas monotypes); L9 press-print incising (Year 2 L18) -> collagraph plates; L12 hook wrongly said Hokusai used reduction ("cut away between colours") — he used one block per colour -> Picasso's reduction linocuts.
- Clay: L15 pinch pots and L16 coil building (Years 1–2) -> joins retrieval + sgraffito through slip; L18 Hepworth (Year 1) kept as carving (new technique); L20 Ai Weiwei figures corrected (about 100 million seeds by about 1,600 craftspeople, not "hundreds").
- Textiles: weaving, Albers & El Anatsui, batik (Years 1–3) -> natural plant dyes (red cabbage as indicator), Yoruba adire eleko paste resist, shibori kept, William Morris half-drop repeat, embellishing with Year 3 stitches, class banner. Unit title, vocabulary, check, mastery check 4, misconceptions and cultural notes updated.
- Books: removed the Hokusai book, *The Noisy Paint Box* (Kandinsky not taught) and *Kente Colors* (kente not taught); added the V&A William Morris collection.

### PE & health — Year 3

Problem: both health units (L22–27, L48–53), orienteering L66 and water safety L69–70 re-taught Year 2 (review/y12) lessons at the same depth (fuel/energy, water, sleep, glitter handwashing, teeth, PANTS, calm breathing, emergency call; setting the map; water safety code, float to live, throw don't go). Kpanlogo L30 repeated Y2 L36's drum-signal check. Fixed with retrieve-then-extend:
- Unit 4 renamed "Health 1: food, safety and active living". L22 keeps the balanced plate with Y2 retrieval; L23 → allergies & asthma and helping a friend (adults/the child use auto-injectors; sensitivity note); L24 → posture and backpacks (≈10%, max ~15% of body weight; sample weights only — children never weighed); L25 → road and cycling safety (stopping distance ~25 m at 50 km/h, helmet fit, being seen; country-neutral "look both ways"); L26 → activity log with an average check (40,75,30,90,65 → 60) and WHO bone/muscle-strengthening 3 days/week; L27 and end-of-unit check updated.
- L30 kpanlogo: added history (Ga, Accra, early 1960s after 1957 independence) and a check about how traditions change; two-rhythm feet/hands.
- Unit 8 renamed "Health 2: staying clean, safe, well and ready to help". L48 → food hygiene (clean–separate–cook–chill; bacterial doubling model) — also removed the UK slogan "catch it, bin it, kill it"; L49 → growing bodies, body image and edited photos; L50 → PANTS applied online ('stop, block, tell', not your fault, helpline); L51 → the stress response (adrenaline) + long-out-breath breathing; L52 → burns (20 min cool running water, no ice/butter), nosebleeds (lean forward, pinch soft part 10 min), recovery position; L53 and end-of-unit check updated.
- L66 → map scale and pace counting (check: 8 double-steps per 10 m → 40 for 50 m). L69 → rip currents (how they form, spotting them, escape), local flag systems, cold water shock; L70 → improvised reach/throw aids and staying low.
- Books: RNLI/RLSS line made international ("your national lifesaving body"). Mastery checks 8–10, misconceptions (burns, nosebleeds, calm-looking water) and vertical connections updated.

### PE & health — Year 4

Problem: Y4 repeated Y3 (and Y2) almost wholesale: dance L25 samba (Y2), L26 Bollywood (Y2 L35), L27 capoeira (Y3 L31), L28 Chinese dragon/ribbon (Y3 L32); health L41 balanced plate, L42 glitter handwashing + teeth, L43 sleep, L45 feelings, L46 body safety/helping hand, L47 emergency call — all Y2/Y3 again; L53 water safety code/flags/rip/throw-don't-go (Y3 L69–70); L63 orientating a map (Y2 L67, Y3 L66); L1/L6 pulse and designing a warm-up (Y2 L6, Y3 L1). Fixed:
- L1 → resting/working/recovery heart rate with a graph; check on why fitter hearts recover faster. L6 → training principles (progression, specificity, rest, use it or lose it) and a three-week challenge.
- Dance: L25 flamenco (12-beat compás, accents 3-6-8-10-12, links to Y4 music L22; UNESCO 2010; floor safety); L26 Bharatanatyam mudras (pataka, alapadma, shikhara) with a compare-with-Bollywood check; L27 breaking (Bronx 1970s, DJ Kool Herc, Paris 2024; no head-supported moves); L28 Irish dance (Riverdance 1994, 6/8 jig; compare with flamenco).
- Health: L41 food labels (4 g ≈ 1 tsp; 10 g/100 ml × 330 ml = 33 g ≈ 8 tsp; WHO free sugars); L42 immune system, vaccines (Jenner 1796, smallpox eradicated 1980), antibiotics vs viruses, medicine safety; L43 UV index, heat exhaustion, layering; L44 puberty kept; L45 resilience (Wilma Rudolph, 3 golds Rome 1960, uses the book already listed) + box breathing; L46 consent, peer pressure, refusal skills; L47 primary survey (DR-S-AB), recovery position, defibrillators, choking.
- L53 → lifejackets vs buoyancy aids, tides, ice. L63 → handrails, catching features, attack points.
- End-of-unit checks, vocab, mastery checks 4, 5, 7, 8, 9, misconceptions (antibiotics, cloudy-day sunburn), vertical and cross-curricular links updated. Books unchanged (Hungry Planet, Ghost, The Boy Who Harnessed the Wind, Wilma Unlimited — all real).

### Geography Year 3 — follow-up (L1)

Setting the map/orienteering course in Y3 geography L1 duplicated Y2 PE L67 and Y3 PE L66 (PE owns orienteering). L1 → sixteen-point compass (NNE etc., naming rule, magnetic compass) with a check on why pilots/sailors need the extra precision; vocabulary, overview, end-of-unit check, mastery check 1 and vertical-connections line updated.

### Life skills — Year 3

Problem: most Y3 lessons re-taught the reviewed Y2 (review/y12) and Y1 lessons at the same depth, and reused their books. Fixed with retrieve-then-extend and new, real books:
- Books removed (used in Y1/Y2 or elsewhere): *The Colour Monster* (Y3 Spanish), *Each Kindness* (Y2), *Beautiful Oops!* (very young), *The Most Magnificent Thing* (Y1), *The Day You Begin* (Y1), *A Chair for My Mother* (Y1), *One Plastic Bag* (Y2), *The Boy Who Harnessed the Wind* picture book (Y4 English text), *Last Stop on Market Street* (Y2). Added: *The Boy with Big, Big Feelings* (Britney Winn Lee), *Ordinary Mary's Extraordinary Deed* (Emily Pearson), *Rosie Revere, Engineer* (Andrea Beaty), *Mae Among the Stars* (Roda Ahmed), *The Name Jar* (Yangsook Choi), *Joseph Had a Little Overcoat* (Simms Taback), *Ada's Violin* (Susan Hood), *Maybe Something Beautiful* (Campoy & Howell); *Alexander, Who Used to Be Rich Last Sunday* was listed but unused — now used in L23.
- Lessons: L1 precise look-alike feelings (disappointed vs jealous check); L2 'what if…' chains and worry time (body clues left to Y2/PE); L4 toolkit repeat → problem-solving steps; L6 good-friend repeat → joining-in skills; L7 adds I-statements to Y2 fair-fix; L9 bystander effect (new check); L11 deliberate practice; L12 slips / stretch / 'aha' mistakes; L13 learning pit with Mae Jemison (1992); L14 goal + obstacle 'if…, then…' plan; L16 names and belonging (*The Name Jar*); L19 opportunity cost; L23 saving with temptation and a two-step calculation (8 weeks → 7 with birthday money); L24 month money plan; L25 life cycle of a T-shirt (~2,700 L water, WWF); L26 waste hierarchy and repair; L27 energy audit with Y2 retrieval; L28 Recycled Orchestra of Cateura; L30 barriers to rights (~250 million children and young people out of school, UNESCO); L31 public services and taxes; L33 book swap.
- End-of-unit checks, vocabulary, mastery checks, assumptions and vertical connections rewritten to match.

### Life skills — Year 4

Problem: Y4 repeated Y3 (identity map, brain-grows, I-statements, peer pressure, SMART goals, waste/energy audits, stereotypes, rights) and Y1/Y2 books (*One Hen*, *The Invisible Boy*, Austin's Butterfly, *The Most Magnificent Thing*, *Your Fantastic Elastic Brain*). Fixed:
- L1 values and dilemmas; L4 comfort/stretch/panic zones; L7 friendships changing; L10 peer mediation; L11 group pressure and online dares (pause-and-think); L15 habits (cue–routine–reward); L16 gallery critique (Austin's Butterfly removed); L18 budgets with an emergency fund; L21 *Lemonade in Winter* (Emily Jenkins) replaces *One Hen*; L25 audit reframed as project baseline; L26 energy audit repeat → transport survey and clean air; L30 how the UNCRC is enforced (treaty, UN Committee, US signed not ratified, Article 12); L31 *Just Ask!* (Sonia Sotomayor) replaces *The Invisible Boy*, adds disability and design for everyone; L32 stereotype → prejudice → discrimination chain and equity (draw-a-scientist hook dropped — Y5 uses it).
- Mastery checks, misconceptions (equity), vertical links and book list updated (removed books listed as "not repeated").

### PE & health Year 4 — cross-subject de-duplication

After revising life skills, PE Y4 L45 (resilience) and L46 (consent, peer pressure) overlapped life skills Y4 L5, L9 and L11. PE L45 → mental wellbeing (everyone has mental health, everyday habits, signs, who can help); PE L46 → staying safe when out and about (lost at a market, safe adults, phone number, code word). Vocabulary, end-of-unit check, mastery check 8 and overview updated.

## READMEs

- `year-3/README.md` and `year-4/README.md`: subject rows, the year paragraph, cross-curricular threads and the "from/to" year connections rewritten to match the reviewed files (e.g. Year 4 geography is no longer "tectonics, rivers, Amazon"; Year 4 music world unit is no longer "samba, djembe, gamelan, raga"; Year 3 "To Year 4" no longer lists Anglo-Saxons). The Year 3 README now says plainly that the `scripts/` folders do not match the reviewed scopes.

## Verification

- All 18 owned scope files parse with `parseScopeFile`: correct unit and lesson counts (science 70/70, history 35/35, geography 35/35, Spanish 70/70, art 35/35, music 35/35, PE & health 70/70, computing 35/35, life skills 35/35 for each year), lessons numbered continuously, every lesson has all eight fields, every duration is 25–40 minutes.
- Arithmetic in new checks was worked through (e.g. 300 ÷ 5 = 60 active minutes; 33 g of sugar ≈ 8 teaspoons; (30 − 6) ÷ 3 = 8 weeks; 12 × 30° = 360°; 15° of spin per hour).

## Left for other reviewers or later work (not in this branch's scope)

- **Year 5 repeats Year 3/4 content** that stays in the lower years here: history (Vikings, Baghdad, Benin, Maya taught again almost wholesale); science (classification and Linnaeus, circuit symbols and brightness, conductors, dissolving, rusting); geography (tectonics, rivers, trade, water — note Year 4 geography no longer teaches tectonics or rivers, so Year 5 should **keep** its versions of those two); music (rounds, "Siyahamba", ukulele, a world-music unit overlapping Years 2–4); computing (networks and the internet a fourth time); art (perspective, Islamic geometry, printmaking, El Anatsui); life skills (identity map, values, draw-a-scientist, waste audit, UNCRC). Year 6 also re-teaches medieval history and tectonics.
- **English:** *Journey to Jo'burg* appears in both Year 4 and Year 5 English; *The Wild Robot* appears in Year 3 English's list and is a Year 4 class text.
- **Tutor scripts** (`curriculum/year-*/**/scripts/`) are stale and no longer match the scope files (e.g. `year-3/science/scripts`); they need regenerating from the reviewed scopes.
- **Year 1:** revised Year 2 life skills says "Year 1 met *One Plastic Bag*", but the Year 1 book list on `review/y12` does not include it — for the Years 1–2 reviewer.
- UK National Curriculum codes remain in objectives as reference codes (they are standards tags, not UK-only content); UK-specific slogans, TV formats and organisations were generalised where they were the content.
