# Curriculum review — Years 1 and 2 (non-core subjects)

**Scope.** `curriculum/year-{1,2}/{science,history,geography,languages,art-design,music,pe-health,computing,life-skills}/*-year-N.md` and `curriculum/year-{1,2}/README.md` (English and maths were out of scope). Year 3 files were read (not edited) to check the Year 2 → 3 boundary.
**Branch:** `review/y12` (from `c89e30b`). **Date:** 2026-09-26. **Reviewer:** Claude (independent curriculum review).
**Standard:** `SCHOOL-CHARTER.md` and `curriculum/PLANNING-BRIEF.md` (binding spec).

## Method

For each subject, both years were read line by line and checked for:
1. **Facts.** Every scientific, historical, geographic, musical and linguistic claim, plus the expected answers and misconception notes.
2. **Age fit and safety.** Lengths of 20–30 min, concrete activities, and safety notes for practicals.
3. **Checks.** Each check must test understanding rather than recall.
4. **Books and resources.** Each one must exist exactly as named.
5. **Coherence.** Year 1 → Year 2 progression, horizontal links, and the Year 2 → Year 3 boundary.

After every edit the brief's §3 parse check was re-run with a stricter version. It confirms that all eight fields are present, that lessons are numbered continuously, and that every duration falls between 20 and 30 minutes. All 18 files pass: the lesson counts are unchanged (70/35 per subject) and the numbering is continuous. `validate-lessons.mjs` passes on the hand-built Year 1 science and art lessons. Their outline slots (Science L1, Art L1–L2) were left untouched.

## Headline findings

- **The biggest problem was coherence, not facts.** In every subject, Year 2's "What Year 2 assumes from Year 1" understated Year 1. Year 2 then re-taught Year 1 content at the same depth, often with the same book, the same hook and even the same check. The worst cases were:
  - **Art:** Kahlo self-portraits, tints and shades, warm/cool, Adinkra, pinch pots, Hepworth, and paper weaving + Kente + Albers card loom all repeated.
  - **Life skills:** six anchor books reused (*Silly Billy*, *The Invisible Boy*, *Your Fantastic Elastic Brain*, *The Girl Who Never Made Mistakes*, *The Most Magnificent Thing*, *A Chair for My Mother*).
  - **PE & Health:** the health unit repeated Year 1's almost lesson for lesson.
  - **Music:** the same rounds, Carnival movements and the glockenspiel pentatonic.
  - **Science:** the plant-needs test, seed dispersal, Wangari Maathai, and day and night.
  - **Spanish:** Year 2 claimed that Year 1 had taught numbers to 31 and classroom objects, which it had not.

  Every repeat was rewritten so that Year 2 briefly retrieves the Year 1 learning and then adds something new. New lessons use real, verified books, artists and pieces.
- **Factual errors fixed.** Examples:
  - Music: the pitch pattern of blown bottles is the opposite of tapped ones.
  - Science: astronauts are weightless, not "without gravity".
  - History: Ibn Battuta was away about 24 years, not "almost 30".
  - History: 500 BCE → 500 CE is 999 years.
  - Music: *Sakura* is not the C–D–E–G–A pentatonic.
  - PE: forward-roll cue "roll on the back of the head".
  - Spanish: present tense was used to describe past weather.
  - Computing: the "first bug" claim.
  - Computing: pioneers listed in the overview never appeared in any lesson.
  - Several subjects: wrong claims about what Year 3 teaches.
- **Recall checks were replaced** with explain, apply or diagnose checks, in roughly 70 lessons.
- **The known past errors are covered.**
  - Year 1 Science teacher guidance now names "a seed is dead" (a seed is alive and dormant) and "plants eat sunlight".
  - The producer wording is fixed: seaweed is an alga, and producers use light, air and water.
  - UK-only framing is widened. Examples: the equator caveat for daylight, tropical seasons, Nok iron-working, international significance cards, Janaki Ammal and Yuan Longping, and Andean weaving.
- **Books.** No invented titles were found. Every listed title and author was checked.
  - Reused Year 1 books were replaced in Year 2, or marked as retrieval where appropriate.
  - A duplicate *Ruby's Worry* was removed from the Year 2 PE books.

## Change log by subject
### Year 1 Science
- L2: added note that plants "breathe" by taking in/giving out air through leaf pores (no lungs) — avoids the lungs misconception MRS GREN can create.
- L8: "every food chain starts with a plant" → "green plant (or seaweed)"; seaweed is an alga, not a plant, and the Lesson 7 ocean chain starts with it. Producers "make their own food using light, air and water" (not "using sunlight" alone, which slides into "plants eat sunlight").
- L20 hook: "Before rubber tyres" was false (solid rubber tyres pre-date Dunlop) → "Before air-filled tyres".
- L22 check assumed a result ("Why did card work less well") → apply check using a property word (absorbent).
- L26 check was recall ("What happens inside the chrysalis?") → explain how caterpillar and butterfly are the same animal.
- L29 Materials: added movement safety note (space, non-slip floor, asthma/heart conditions).
- L35 check was a definition recall → apply check (unseen barking dog: source + path).
- L40 FACT FIX: hook said "blow across the bottles" while the activity taps them — the pitch pattern is opposite (tapping: fullest = lowest; blowing: fullest = highest). Standardised on tapping, added teacher note; check upgraded from recall ("which bar is higher?") to predict-and-explain with unseen bars; glass-bottle safety note.
- L45: typo (". a paper-plate").
- L47: daylight-by-season framed as universal → added note that it varies little near the equator; check now hemisphere-aware and interprets the chart.
- Teacher guidance: added misconceptions "a seed is dead" (a seed is alive and dormant) and "plants eat sunlight".
- Hand-built slot L1 (lessons/lesson-01) untouched; its JSON already treats a seed as alive and resting.

### Year 2 Science
- COHERENCE (Y1→Y2 repeats at the same depth, fixed):
  - L6/L9/L14 plant-needs investigation repeated Year 1 L56–58 (water/light/warmth yes-no test). Rewritten to test *levels* (amount of water, soil vs sand vs cotton wool, room to grow) — the UK Y3 "nutrients from soil, room to grow" requirements; checks now use numbers from the table.
  - L12 seed dispersal repeated Year 1 L59 almost exactly (dandelion, burrs on socks, paper seed). Now "Fruits and seed dispersal": fruit forms from the ovary, dissect fruits, link fruit features to dispersal; new apply check (berries + tough seed coat).
  - L13 hook repeated Year 1 L53 (split bean) — now a retrieval, with a new hook/joy.
  - L15 Wangari Maathai + *Wangari's Trees of Peace* + planting a tree repeated Year 1 L60. Replaced with Yuan Longping (hybrid rice) alongside Janaki Ammal, linked to pollination; rice-seed note (shop rice will not germinate).
  - L51 day and night repeated Year 1 L43 at the same depth — now sunrise-in-the-east and time zones.
  - L52 check duplicated Year 1 L44 check ("why shortest at midday") — now explains length *and* direction from the class data.
- L4 check was definitional recall → classify two sentences as result/conclusion and justify.
- L7: foil-leaf result softened ("may look paler") — honest about what a week of darkness shows.
- L28 FACT FIX: "without gravity" → astronauts are weightless in orbit (gravity still acts); reworded.
- L35: plaster of Paris safety note (heats as it sets; never set hands in it; dust).
- L37 check was recall ("two main ingredients") → interpret the jar layers and say where each came from.
- Books: Wangari title kept but marked as Year 1 retrieval; *Mae Among the Stars* annotation corrected (it is about Mae Jemison). Mastery check 9 example swapped to Janaki Ammal. Vertical-alignment note rewritten to list what Year 1 actually covered.
- Year 1 overview updated to reflect the new Year 2 plant emphasis.
- All books verified real: *Stone Girl, Bone Girl* (Anholt), *The Street Beneath My Feet* (Guillain & Zommer), *A Seed Is Sleepy*, *The Tiny Seed*, *Ada Twist, Scientist*, *Mae Among the Stars* (Roda Ahmed).
- Y2→Y3 boundary checked: Year 3 assumes plant parts, nutrition/skeletons, rocks, light, forces/magnets — all present.

### Year 1 History
- L14 FACT FIX: Ibn Battuta "didn't come home for almost 30 years" → he returned to Morocco in 1349, about 24 years after leaving (then travelled again to al-Andalus and Mali until 1354).
- L15: Zheng He's ship sizes are disputed by historians — hook reworded and turned into a "how do we know?" prompt.
- L20: teacher note added — in the 1850s germ theory was not yet accepted (Nightingale believed in "bad air"); the expected answer uses today's understanding, so the distinction is now explicit.
- L25 + Teacher guidance: Unit 4's core people are all from Europe/Caribbean/USA; added international significance-test cards (Sequoyah, Gandhi → link to Rosa Parks, Wangari Maathai).
- Great Fire unit kept (UK NC) — already paired with Chicago 1871 and carries a swap-for-your-own-country note, so it is not the only history.
- Verified: 2 Sept 1666/Pudding Lane/4 days, Pepys's cheese, Chicago 1871 (205 years later), Apollo 11 crew, Scutari 1854, Seacole's British Hotel and autobiography, Braille (blinded aged 3, system as a teenager), Parks 1955; York "-gate" (Old Norse *gata*), Templo Mayor beside the cathedral.
- Books verified real: *Window* (Baker), *Peepo!* (Ahlberg), *Vlad and the Great Fire of London* (Kate Cunningham), *Traveling Man* (Rumford), *Moonshot* (Floca), *Man on the Moon* (Bartram), *Florence Nightingale* (Demi), *Six Dots* (Jen Bryant), *Rosa Parks* (Little People, Big Dreams, Lisbeth Kaiser).

### Year 2 History
- L2 FACT FIX: 500 BCE → 500 CE is 999 years, not "about 1,000" (the reason — no year 0 — was given but the answer contradicted it).
- L12: hook used "a copper coin and a tin can" — most coins and "tin" cans are not copper or tin; replaced with copper wire + photo of tin, keeping the aside as a lesson in checking.
- L13: added the Nok culture (Nigeria) as an early iron-working culture — Unit 2 was otherwise UK-centred for the Iron Age.
- L26 check was recall ("What do we still use from Sumer?") → explain the clock's 60s.
- L33 check was a definition ("what does overlap mean?") → prove an overlap from the timeline and reason whether overlapping peoples met.
- L34: "rock art of Lake Victoria region" made specific (Mfangano Island, Kenya).
- Vertical alignment: Year 3 also teaches Kush and Ancient China (Shang → Han); noted that the Y2 Shang lesson is the preview.
- Verified: Blombos (>70,000 yrs), Lascaux (~17,000), Göbekli Tepe (~11,500), Çatalhöyük (~9,000), Skara Brae (1850 storm, ~5,000), bluestones >200 km from Wales, Amesbury Archer Alpine isotopes, Merer papyri/sledge-and-water evidence, Rosetta 1799/Champollion 1822, Carter 1922, Cleopatra closer to us than to the Great Pyramid, Shang ~1600–1046 BCE, undeciphered Indus script.
- Books verified: *Stone Age Boy* (Kitamura), *The Egyptian Cinderella* (Climo), DK Eyewitness *Ancient Egypt* (George Hart), *You Wouldn't Want to Be a Pyramid Builder!* (Morley).

### Year 1 Geography
- Checks upgraded from recall to explain/apply: L3 (why a key — now "fix a map with no key"), L14 (which continent/coldest → why Antarctica is a continent but the Arctic is not), L15 (which ocean → route reasoning), L16 (define country vs continent → "Kenya is bigger than Africa" error), L17 (is Nairobi a country → nest city/country/continent), L29 (season recall → explain opposite seasons with tilt).
- L24: expected answer assumed every school has four seasons — added the tropical alternative.
- Verified: NESW mnemonic order, Kenya on the Equator with snow/glaciers on Mount Kenya, two rainy seasons, 54 African countries, rainforest layers, Handa (Luo, SW Kenya).
- Books verified real: *Me on the Map*, *Rosie's Walk*, *Maps* (Mizielińscy), *Atlas of Adventures*, *Here We Are*, *Handa's Surprise*, *Lila and the Secret of Rain* (Conway/Daly), *Mirror* and *Window* (Baker), *Katie Morag Delivers the Mail*, *Somewhere in the World Right Now* (Schuett), *The Great Kapok Tree*, *One Plastic Bag* (Paul), *Oi! Get Off Our Train*.

### Year 2 Geography
- COHERENCE: L13–15 land-use survey repeated Year 1 L9–13 (land-use map + tallies) at the same depth. Rewritten as a land-use **transect**: enquiry question + prediction, fixed stopping points by four-figure grid reference, environmental-quality score, conclusion with a limitation. Sits between Year 1's descriptive survey and Year 3's full fieldwork cycle (traffic/noise/litter). Mastery check 4 updated.
- L5: said "recap Science Unit 5", but Science Unit 5 is taught *later* (terms 2–3) — now retrieves Year 1 science; Science L51 now retrieves Geography's time-zone clocks instead of re-teaching time zones (avoids teaching it twice in one year).
- Checks upgraded: L4 (0° lines recall → why two coordinates are needed), L8 (repeated Year 1's four-point check → eight-point quarter-turn from NE), L10 (repeated Year 1's "why letter first" → diagnose a reversed four-figure reference), L26 (magma vs lava definition → correct a news reporter).
- Verified: Africa ≈14× Greenland, Kiribati in all four hemispheres, Quito ≈0°, 78° W, Everest 8,849 m, plate speed ≈ fingernail growth, Amazon has the greatest flow, Nile flows north.
- Books verified: *If the World Were a Village* (David J. Smith), *Volcano Wakes Up!* (Lisa Westberg Peters), *A River* (Marc Martin), *Maps*, *Atlas of Adventures*, *The Street Beneath My Feet*.
- BOUNDARY NOTE (Year 3, read-only): Year 3 Geography Unit 1 re-teaches eight-point compass, four-figure grid references, symbols/aerial photos and scale — all taught here in Year 2. Year 3 should treat these as retrieval and move to six-figure references/OS-style contours.

### Year 1 Languages (Spanish)
- LANGUAGE FIX L62: "El lunes, hace sol…" was used to say what the weather *was* (a past diary) — present tense is wrong for past days. Re-framed as a week's *forecast* (present is natural for a forecast in Spanish), with a note that past forms (*hizo, llovió*) come later; check now applies the forecast (best picnic day, answered in Spanish).
- L6: "girls *often* say contenta" → a girl says *contenta*, a boy *contento* — it's agreement, not a tendency.
- L13 hook: *once* is spelled like English "once" but said ON-seh — it does not "sound like" it. Check upgraded from "What number is doce?" to a compare-and-subtract task.
- L53 check was culture recall ("Which country is paella from?") → comprehension of a Spanish sentence plus the country.
- L59: added the default stress rule (no accent + ends in a vowel → second-to-last syllable), since *jirafa* is named in the objective but has no accent mark.
- L70: stray "¡" in the expected answer.
- Overview: "spoken in more than 20 countries" → "an official language of about 20 countries" (20 sovereign states); vertical-alignment note now matches what Year 2 actually teaches (numbers to 50, agreement, etc.).
- Verified: vowel rhyme, silent h, j, ñ, ll (/ʝ/, /ʃ/ in Rioplatense), pero/perro, *Erre con erre*, z/ce/ci seseo vs distinción, qu/gue rules, days lower-case, Reyes (shoes out on 5 Jan night), Día de los Muertos 1–2 Nov, La Tomatina (Buñol, August), zumo/jugo, Barranquilla and Cádiz carnivals, *Pin Pon*, *Cinco lobitos*.
- Books verified: *¡Pío Peep!* (Ada & Campoy), *Oso pardo, oso pardo, ¿qué ves ahí?*, *La oruga muy hambrienta*, *Green Is a Chile Pepper* / *Round Is a Tortilla* (Thong), *Gracias / Thanks* and *Book Fiesta!* (Pat Mora), *¡Olinguito, de la A a la Z!* (Delacre).

### Year 2 Languages (Spanish)
- FACT/COHERENCE FIX (overview + vertical alignment): claimed Year 1 taught "numbers 0–31, classroom objects, el/la" — Year 1 actually taught 0–20, no classroom objects, and only *noticed* gender. L4 ("0–31 revisited") and L6 ("classroom objects revisited") were therefore re-teaching things never taught. L4 now teaches 21–31 as new (with accents on *veintidós/veintitrés/veintiséis*); L6 teaches eight classroom objects and formal el/la as new.
- Also claimed "Year 3 adds food and shopping, hobbies, the body, time, -ar verbs" — Year 3's actual units are family, animals, numbers/calendar, weather, home, clothes, festivals. Corrected.
- Repeats of Year 1 at the same depth, fixed:
  - L3 check duplicated Year 1 L28 (pero/perro) → new rule: word-initial r is trilled (*rojo*, *perro*) vs tapped *pero*.
  - L9 check duplicated Year 1 L58 (hoy/mañana) → adds *ayer fue*.
  - L18, L26: now explicitly retrieve Year 1 phrases/words and add new ones (*hace buen/mal tiempo, hay tormenta; primo/prima, bebé, hijo único*).
  - L27 check duplicated Year 1 L26 ("Tengo dos hermanas") → *no tengo un hermano* → *no tengo hermanos*.
  - L35 check duplicated Year 1 L33 ("What does a Spanish dog say?") → new plural rules (*perros/ratones/peces*, z→c).
  - L36 was Year 1 L34 again → retrieval, then report survey results with *hay* + plural.
  - L40 re-taught *Los pollitos dicen* (already sung twice in Year 1) → *Un elefante se balanceaba* (traditional counting song; plurals).
  - L55 check duplicated Year 1 L30 ("sad or happy?") → name ofrenda items in Spanish and say why.
  - L57 carnival masks repeated Year 1 L66 (same Cádiz hook) → Oruro, with adjective agreement as the explicit new step.
- L37 hook punctuation (¡Un perro azul!).
- Verified: Carle food sequence (Mon apple … Fri oranges), *capullo* vs *crisálida* note, Posadas nine nights, Inti Raymi June (southern winter), two surnames, *me encantan los churros*.
- Books verified: *¿Eres tú mi mamá?* (Eastman), *De Colores* and *Diez deditos* (José-Luis Orozco), *¡Pío Peep!*, Rockalingua, Forvo.
- BOUNDARY NOTE (Year 3, read-only): Year 3 Spanish Units 2–5 are family, animals, numbers/calendar and weather — the same topics as Year 1 *and* Year 2. Year 3 should be checked to ensure it adds new structures (verbs, descriptions, opinions with reasons) rather than a third pass at the same depth.

### Year 1 Art & Design
- Hand-built slots L1–L2 untouched (titles/objectives match lessons/*.json).
- L30 check asked about a *slab*, which the lesson never teaches → now a choose-and-justify check (pinch vs coils for a tall bowl).
- Checks upgraded from definition recall to apply/explain: L8 (tint vs shade → identify unseen mixes), L19 (what is a motif → find motif and rule in a new fabric), L27 (warp vs weft → why warp must go on first), L32 (list four clay-joining steps → diagnose why ears fell off).
- Vertical-alignment note now lists what Year 1 actually teaches so Year 2 can see it.
- Verified: *The Starry Night* 1889, Kngwarreye (Utopia, NT), Bearden *The Block* 1971, Matisse *The Snail* 1953, Adinkra (Asante, calabash stamps), *Strawberry Thief* 1883, Warhol soup cans 1962, Kente (Asante and Ewe narrow-strip), *Tar Beach* began as a quilt, Odundo (Kenyan-born British), Maria Martinez (San Ildefonso Pueblo).
- Books verified: *The Dot*, *Beautiful Oops!*, *Katie and the Starry Night*, *Katie and the Waterlily Pond* (Mayhew), *Mix It Up!*, *Viva Frida*, *The Noisy Paint Box*, *Window*/*Mirror*, *Henri's Scissors*, *Tar Beach*.

### Year 2 Art & Design
- COHERENCE (largest problem in scope): Year 2 claimed Year 1 had only done "simple printing with found objects; simple clay shapes", and then re-taught Year 1 content at the same depth, often with the same artists:
  - L7 Frida Kahlo self-portrait with a meaningful object = Year 1 L12 → Rembrandt self-portraits with directional light and tone (builds on L5–6 tone).
  - L9 tints and shades = Year 1 L7–8 → adds *tones* (grey) and complementary shading.
  - L10 warm/cool mood = Year 1 L10 → warm advances / cool recedes (near and far), still with Klee.
  - L16 Adinkra stamps = Year 1 L20 → Indian hand-block printing (Rajasthan) with two-colour registration.
  - L18 mirror-image check = Year 1 L21 → apply check (plan reversed lettering; check with a mirror).
  - L22 pinch pots, L25 Hepworth pierced form = Year 1 L31/L33 → hollow form from two joined pinch pots (with the air-hole safety reason) and Nok terracotta heads (Nigeria; horizontal link to History L13).
  - L27 paper weaving, L28 Kente, L29 card loom with Albers = Year 1 L25–27 exactly → twill pattern planning, Andean (Quechua) backstrap weaving with natural dyes (Spanish link), self-warped texture weaving (Sheila Hicks).
- Still life: Year 1 promised it and Year 3 assumes it, but Year 2 had none — added to L6 (sphere + first lit still life). Mastery check 2 already expected it.
- "What Year 2 assumes" and vertical alignment rewritten to reflect Year 1 accurately; overview artist list, key vocabulary, cultural-respect note, clay mastery check and books updated (*The Dot* flagged as a Year 1 reread).
- Safety: hand-washing after clay (L21), adults cut any hard blocks; existing hot-wax/kiln adult-only note kept.
- Books verified: *Ish*, *Frida Kahlo and Her Animalitos* (Brown & Parra), *The Noisy Paint Box*, *Georgia's Bones* (Jen Bryant), *Yayoi Kusama: From Here to Infinity!* (Sarah Suzuki), *Hokusai: The Man Who Painted a Mountain* (Kogan Ray).

### Year 1 Music
- Checks upgraded from recall to understanding: L2 ("how many sounds does ti-ti make?" → claps vs beats), L5 ("what is an ostinato?" → is this an ostinato and why), L14 ("what is a crescendo?" → perform one and say what stays the same), L24 ("name one from each family" → classify an unseen instrument from a clue).
- Vertical-alignment note lists what Year 1 actually teaches so Year 2 retrieves rather than repeats.
- Verified: *Peter and the Wolf* instrument assignments, Carnival movements, Obwisana and Che Che Koolay (Ghana), Kookaburra (Australia), djembe bass/tone/slap, steel pan (Trinidad and Tobago, oil drums, 20th century), tanpura drone, Hot Cross Buns E–D–C with "one a penny" in ti-ti, pentatonic C D E G A, piano's name from *pianoforte*.
- Books verified: *The Story Orchestra* (*Four Seasons in One Day*, *The Nutcracker*), *Zin! Zin! Zin! A Violin*, *Listen* (Shannon Stocker, Evelyn Glennie), *The Remarkable Farkle McBride*, *Drum Dream Girl*.

### Year 2 Music
- COHERENCE: "What Year 2 assumes" listed only stick notation, simple songs and untuned percussion — Year 1 actually taught so–mi–la, rounds, dynamics/tempo terms, instrument families, glockenspiel, drones, pentatonic improvisation and graphic scores. Year 2 then repeated several at the same depth. Fixed:
  - L2 pulse vs rhythm (= Year 1 L1, same check) → metre: strong beats in 2s, 3s and 4s (Sousa march vs Strauss waltz), preparing bars/time signatures in L4.
  - L15 *Kookaburra*/*Frère Jacques* rounds (= Year 1 L11 exactly) → new rounds *Shalom Chaverim* (Israel) and *Row, Row, Row Your Boat*, with a check on entry points.
  - L24 recorder "round" of *Frère Jacques*/*Kookaburra* — not playable with this year's notes (needs high E and G) → melody + G drone and a B–A–G echo canon.
  - L26 reused Year 1's *Elephant*/*Aquarium* → *Lion*, *Kangaroos*, *Fossils*, *Swan*, with a new timbre check.
  - L27–28 glockenspiel C–D–E–G–A pentatonic, question-and-answer ending on C (= Year 1 L29) → G pentatonic on the **recorder** (G A B D E, notes already learned), answers end on G and are written on the stave.
  - L29 graphic-score soundscape (= Year 1 L31) → Cathy Berberian's *Stripsody* as a real graphic score, ABA structure and layered texture.
- FACT FIX L17: said *Sakura* "uses a five-note scale — preparing Unit 5", implying the C–D–E–G–A pentatonic; *Sakura* uses a Japanese five-note scale with semitone steps. Clarified.
- L20 check explanation corrected (C is higher than B because the first-finger hole is open, so the vibrating air column is shorter).
- FACT FIX (vertical alignment): claimed Year 3 introduces the ukulele (chords C, F, G, Am) and three-part rounds — Year 3 is recorder + texture, structure, world music and music history; ukulele/keyboard come from Year 4. Corrected.
- Verified: recorder fingerings and stave positions for B, A, G, C', D', low E and D; *Ode to Joy* in G; *Merrily*; soft recorder notes go flat; gamelan gong marks the cycle; *The Swan* is cello.
- Books verified: *Recorder from the Beginning* (John Pitts), *Ada's Violin* (Susan Hood), *Zin! Zin! Zin!*, *The Story Orchestra: The Nutcracker*; Chrome Music Lab, Sing Up, BBC Ten Pieces.
- BOUNDARY NOTE (Year 3, read-only): Year 3 Music re-teaches high C/D and low E/D on the recorder and removes F and B for C pentatonic again (L30) — both taught in Year 2 (and pentatonic in Year 1). Year 3 should retrieve these.

### Year 1 PE & Health
- Every lesson already carried a safety note in Materials; body-safety lesson (L47) uses NSPCC PANTS, informs families and the safeguarding lead — age-appropriate, kept.
- Checks upgraded: L25 (list when to wash hands → apply to stroking a dog before a snack), L29 (define unison → diagnose a dancer out of step), L66 (recite two water-safety rules → apply to a ball floating into a lake).
- Vertical alignment now lists Year 1's health content so Year 2 can deepen rather than repeat.
- Verified: 9–12 h sleep for ages 6–12, WHO 60 min/day, Slip-Slop-Slap (Australia), emergency numbers 999/112/911/000, beach flags, float-to-live, Kho-kho (India), Pilolo (Ghana), Adowa (Akan), Bharatanatyam hand gestures, no forward rolls without a qualified adult, apparatus no higher than knee height.
- Books verified: *Giraffes Can't Dance*, *The Busy Body Book* (Rockwell), *The Colour Monster* (Llenas), *Ruby's Worry* (Percival), *Your Body Belongs to You* (Spelman), *Wilma Unlimited* (Krull), *Salt in His Shoes* (Jordan).

### Year 2 PE & Health
- COHERENCE: "What Year 2 assumes" said Year 1 only did basic running/throwing and "knowing exercise and sleep matter"; the Year 2 health unit then repeated Year 1's health unit almost lesson for lesson (same "car needs fuel" hook, same sleep hours and screens check, same "Active every day" title). Rewritten to go deeper:
  - L19 slow- vs fast-release energy (porridge vs sugary cereal).
  - L20 sugar in drinks from real labels, as sugar-cube towers (20 g ≈ 5 cubes).
  - L21 one-week sleep diary; draw conclusions from data.
  - L22 moderate vs vigorous activity using the talk test.
  - L58 PANTS retrieval + consent in everyday situations (saying no to a hug; keep telling until someone listens) — the old check duplicated Year 1 L47's surprise-vs-secret check word for word.
  - L60 UV-gel "missed spots" test and catch-it-bin-it-kill-it (the old glitter-germs hook duplicated Year 1 Science L31).
  - L6 now teaches pulse-taking and recovery time (fitter hearts recover faster); Science L26 retrieves the pulse skill instead of re-teaching it.
  - L3, L25, L67 checks duplicated Year 1 checks (bent-knee landing, points vs patches, turning the map) → technique-improvement, make-it-harder, and map + compass checks.
  - L68 repeated Year 1 L60's three-mat crossing → magic-carpet flip, blindfold guide, rope shapes with plan–try–review, plus safety note.
- SAFETY FIX L27: forward roll cue "roll on back of the head/shoulders" → "roll across the back of the shoulders — never onto the top of the head".
- L6: added stop-if-dizzy / inhaler safety note; L60: UV torch safety.
- L34: "Most music is grouped in 8s" → "much dance and pop music"; L37: noted Brazil speaks Portuguese (the hook implied a Spanish link).
- Books: removed duplicate *Ruby's Worry* (Year 1 text); verified *Wilma Unlimited*, *Firebird* (Misty Copeland/Christopher Myers), *The Huge Bag of Worries* (Ironside), *My Body! What I Say Goes!* (Jayneen Sanders).

### Year 1 Computing
- L7 FACT FIX: "The first 'computer bug' was a real moth (1947)" — the word "bug" for faults is older; the 1947 logbook records the "first actual case of bug being found". Hook reworded accurately.
- Checks upgraded: L3 (define decompose → decompose a task and explain why), L12 (what does the green flag do → diagnose why the cat doesn't move), L25 (define attribute → guess the sorting rule and justify).
- Verified: ScratchJr triggers (green flag, tap, bump, message), looks blocks, "go to page", PEGI 12, ScratchJr by MIT Media Lab / Tufts DevTech, CS Unplugged (University of Canterbury, NZ).
- Books verified: *Hello Ruby* (Liukas), *How to Code a Sandcastle* (Josh Funk), *Robot Rumpus!* (Sean Taylor), *Rosie Revere, Engineer*, *Chicken Clicking* (Willis & Ross), *Digiduck's Big Decision* (Childnet).

### Year 2 Computing
- FACT FIX (overview): claimed "every unit meets a computing pioneer — Ada Lovelace, … Radia Perlman, Katherine Johnson and Jerry Lawson" but only Grace Hopper and Tim Berners-Lee appeared in any lesson. Pioneers now placed in lessons: Scratch/Mitchel Resnick (L6), Radia Perlman (L14), Lillian Schwartz (L22), Katherine Johnson (L27), Jerry Lawson (L34). Ada Lovelace deliberately *not* added — Year 3 L2 teaches her; the Wallmark book stays in the library.
- FACT FIX (vertical alignment): said Year 3 introduces selection and variables; Year 3's units are loops in Scratch, branching databases, networks, audio/video, research and online safety — selection/variables are Year 4. Corrected in both places.
- COHERENCE — same-depth repeats of Year 1 fixed:
  - L1 jam-sandwich robot with the identical check (= Year 1 L2) → quick retrieval, then *efficiency*: compare two working algorithms.
  - L3 "Plan a birthday party" hook (= Year 1 L3) → decompose a fruit-catching game and choose a build order (prepares Scratch).
  - L6 green-flag check (= Year 1 L12) → map ScratchJr to Scratch.
  - L18 loops unplugged check → loop around a pattern, with a step outside the loop.
  - L28 yes/no branching sort (= Year 1 L26) → fields and records in a class data table (sort/filter), bridging to Year 3's software branching databases; unit and mastery checks updated.
  - L32 kindness check (= Year 1 L31) → banter vs hurting, evidence, telling.
- "What Year 2 assumes" rewritten to reflect Year 1 accurately.
- Verified: Berners-Lee 1989 at CERN; undersea cables carry most intercontinental traffic; packets; Hopper's English-like languages; 360° ÷ sides for regular polygons; Tree Octopus spoof; Childnet SMART.
- Books verified: *Grace Hopper: Queen of Computer Code* and *Ada Byron Lovelace and the Thinking Machine* (Laurie Wallmark), *Hello Ruby*, *How to Code a Sandcastle*.
- BOUNDARY NOTE (Year 3, read-only): Year 3 Computing Unit 1 (spot the repeat, repeat block, pen shapes, forever loops, Grace Hopper) re-teaches Year 2 Unit 4 and L4 at similar depth. Year 3 should retrieve these and move to repeat-until, nested loops and larger projects.

### Year 1 Life Skills
- Checks upgraded: L18 ("How do most grown-ups get money?" → correct the "cash machines give free money" misconception), L33 (define volunteer → classify a nurse vs a grandparent helper).
- Vertical-alignment note now lists what Year 2 does and which Year 1 books it must not reuse.
- Books verified real (18): *In My Heart* (Witek), *Ravi's Roar* (Percival), *Silly Billy* (Browne), *Enemy Pie* (Munson), *The Invisible Boy* (Ludwig), *How Full Is Your Bucket? For Kids* (Rath & Reckmeyer), *The Rabbit Listened* (Doerrfeld), *Your Fantastic Elastic Brain* (Deak), *The Girl Who Never Made Mistakes* (Pett & Rubinstein), *The Most Magnificent Thing* and *After the Fall* (Spires; Santat), *A Chair for My Mother* (Williams), *Beatrice's Goat* (McBrier), *Here We Are* (Jeffers), *The Tin Forest* (Ward), *Tidy* (Gravett), *Whoever You Are* (Fox), *The Day You Begin* (Woodson).

### Year 2 Life Skills
- COHERENCE (second-largest problem in scope): Year 2 re-used six Year 1 anchor books for the same lessons — *Silly Billy* (worry dolls made again), *The Invisible Boy*, *Your Fantastic Elastic Brain* (identical title "My elastic brain"), *The Girl Who Never Made Mistakes*, *The Most Magnificent Thing*, *A Chair for My Mother* — plus *The Colour Monster* (Year 1 PE) and *One Plastic Bag* (Year 1 Geography); L18 had the identical title and hook as Year 1 L18; L2, L4, L7, L24, L27, L30 repeated Year 1 activities/checks. Rewritten to go deeper, with new real books:
  - L1 *Grumpy Monkey* (Suzanne Lang); L2 same body clue, different feelings; L4 feeling size (thermometer) matched to strategy; L5 *Jabari Jumps* (Gaia Cornwall) for thoughts → feelings; L6 *Hey, Little Ant* (Hoose); L7 friendship dilemmas (being told to exclude someone); L8 *Strictly No Elephants* (Lisa Mantchev).
  - L13 how the brain learns — neurons, spaced practice and sleep; L14 *The Magical Yet* (Angela DiTerlizzi) with "yet + strategy"; L15 *The Thing Lou Couldn't Do* (Ashley Spires).
  - L18 how we pay (cards spend real money from an account) and currencies; L20 *One Hen* (Katie Smith Milway, Ghana) for spend–save–give.
  - L24 where rubbish goes (landfill vs recycling); L26 *The Last Straw: Kids vs. Plastics* (Susan Hood) with Isatou Ceesay as retrieval; L27 where electricity comes from — renewable vs fossil (Year 1 already did tap-off and lights-off).
  - L30 rights *with responsibilities* (Year 1 did rights vs wants with the same check).
- "What Year 2 assumes", links (PE also uses a glitter jar in the same year) and vertical alignment rewritten.
- Books kept and verified: *Beegu* (Deacon), *Each Kindness* (Woodson), *Those Shoes* (Boelts), *The Promise* (Nicola Davies), *Last Stop on Market Street* (de la Peña), *We Are All Born Free* (Amnesty International); "Austin's Butterfly" (Ron Berger, EL Education).

### READMEs
- **Year 1 README:** reviewed. The subject list, totals (760), timetable and threads are accurate, so no change was needed.
- **Year 2 README:**
  - The "What's new" column now matches the reviewed files for science, Spanish, art, music, computing and life skills.
  - Added cross-curricular threads: Nok, Peru/Andes, and the PE ↔ Science pulse link.
  - Corrected the "From Year 1" and "To Year 3" vertical notes. The old notes claimed Year 3 teaches Spanish food, hobbies and -ar verbs, ukulele, and Scratch selection and variables. None of that is in the Year 3 files.
  - Fixed the author's name "Nathan Byron" → **Bryon**.

## Left for others (out of scope or read-only)

- **Year 3 boundary (read-only):** Year 3 re-teaches at the same depth some Year 2 content that Year 2 already covers. Each case should become retrieval:
  - Geography: eight-point compass, four-figure grid references, symbols and aerial photos, and scale.
  - Music: high C/D and low E/D on the recorder; removing F and B for the pentatonic.
  - Computing Unit 1: repeat, pen shapes, forever loops and Grace Hopper.
  - Spanish Units 2–5: family, animals, calendar and weather — a third pass after Years 1 and 2.
- **English Year 2 (out of scope):** `english-year-2.md` spells the author "Nathan Byron" at lines 29, 1527 and 1536. The correct spelling is **Nathan Bryon**.
- **Year 1 tutor `scripts/` folders** are known to be stale (see the Year 1 README). They were not regenerated.
- **Not independently verified:** exact cultural details that a teacher should check against local sources when teaching:
  - the dates of individual festivals in a given year;
  - which specific Andean village or co-operative to feature;
  - local emergency numbers beyond those listed.
