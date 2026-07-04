# P1 — Contract & Elements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 28 semantic, dual-mode lesson elements (types + tolerant schemas + React renderers + a dev gallery) alongside the existing block system, changing no runtime behaviour yet.

**Architecture:** Add a new `LessonElement` contract (`shared/elements.ts`) and its tolerant zod parser (`server/src/ai/element-schemas.ts`), independent of the legacy `LessonBlock`. Each element is a React component under `client/src/blocks/elements/<name>.tsx` taking `{ params, mode, onResult }`; a registry + `ElementView` dispatcher render them. Pure layout maths lives in a tested `geometry.ts`. A hash-routed dev gallery (`/#/dev/elements`) renders every element in both modes for visual verification. The legacy director, `LessonBlock`, `BlockView`, and all existing lessons are left untouched — this phase is purely additive and ships behind the gallery route.

**Tech Stack:** TypeScript (strict, `noUncheckedIndexedAccess`), React 18 + Vite, zod, inline SVG for element art, `node --import tsx --test` for logic tests. Design executed with the **frontend-design** skill using the tokens proven in the element gallery.

## Global Constraints

- **Node 22+**; TypeScript is not emitted (`noEmit`) — use `.ts`/`.tsx` extensions in imports; client imports shared types via the `@shared` alias, server via relative paths (`../../../shared/types.ts`).
- **`strict` + `noUncheckedIndexedAccess` are on** — every indexed access is `T | undefined`; handle it.
- **The only whole-repo check is `npm run typecheck`** — run it after every task. Logic tests run via `node --import tsx --test <file>`.
- **Additive only.** Do NOT modify or delete `LessonBlock`, `BlockView.tsx`, `CustomBlock.tsx`, `Whiteboard.tsx`, the director, or any `classai-lesson/1` file in this phase.
- **28 element type ids (exact, lowercase):** `text image video scene audio array numberLine baseTen fraction barModel numberBond shape grid dataChart measure wordBuild textMark sentence diagram map timeline sort music draw steps choice enter speak`.
- **Manipulable elements report `ElementResult { text: string; correct?: boolean }`** — identical shape to the existing `BlockResult`, so a future director consumes them unchanged.
- **Design tokens** (from the approved gallery): ground `#f6f8fc`/`#0d1120`, accent `#4f46e5`/`#818cf8`, semantic ink colours `blue #3b82f6 · orange #f97316 · green #1fb672 · purple #8b5cf6 · red #ef4444 · pink #ec4899 · amber #f5b301`; display face `"SF Pro Rounded", ui-rounded, system-ui`; light+dark via `prefers-color-scheme` **and** `:root[data-theme=…]`; honour `prefers-reduced-motion`.

---

### Task 1: Element contract (`shared/elements.ts`)

**Files:**
- Create: `shared/elements.ts`
- Test: `shared/elements.test.ts`

**Interfaces:**
- Produces: `ElementType` (union of the 28 ids), `LessonElement` (discriminated union on `type`), `ElementMode = 'demonstrate' | 'manipulate'`, `ElementResult { text: string; correct?: boolean }`, `ELEMENT_JOB: Record<ElementType, ElementJob>`, `MANIPULABLE: ElementType[]`, `elementIsManipulable(type?: ElementType): boolean`.

- [ ] **Step 1: Write the failing test**

```ts
// shared/elements.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ELEMENT_JOB, elementIsManipulable, type ElementType } from './elements.ts';

test('every element id has a job', () => {
  const ids: ElementType[] = ['text','image','video','scene','audio','array','numberLine','baseTen','fraction','barModel','numberBond','shape','grid','dataChart','measure','wordBuild','textMark','sentence','diagram','map','timeline','sort','music','draw','steps','choice','enter','speak'];
  assert.equal(Object.keys(ELEMENT_JOB).length, 28);
  for (const id of ids) assert.ok(ELEMENT_JOB[id], `missing job for ${id}`);
});

test('pure display elements are not manipulable, checks are', () => {
  assert.equal(elementIsManipulable('text'), false);
  assert.equal(elementIsManipulable('choice'), true);
  assert.equal(elementIsManipulable('array'), true); // dual-mode
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --import tsx --test shared/elements.test.ts`
Expected: FAIL — `Cannot find module './elements.ts'`.

- [ ] **Step 3: Write minimal implementation**

```ts
// shared/elements.ts
// The 28 semantic lesson elements. Each element states INTENT; the renderer
// draws it. Most Model/Show elements are dual-mode: DEMONSTRATE (tutor shows)
// or MANIPULATE (child does -> becomes the check).

export type ElementJob = 'tell' | 'show' | 'model' | 'sequence' | 'do';
export type ElementMode = 'demonstrate' | 'manipulate';

/** Reported by a manipulable element when the child finishes it. */
export interface ElementResult { text: string; correct?: boolean }

// ---- per-element params (kept small; renderer fills sensible defaults) ----
export interface TextEl { type: 'text'; value: string; emphasis?: 'plain' | 'callout' | 'term'; term?: string; definition?: string }
export interface ImageEl { type: 'image'; src: string; alt: string; caption?: string; annotate?: string[] }
export interface VideoEl { type: 'video'; url?: string; searchTerm?: string; watchTask: string; afterCheck?: { question: string; expectedAnswer: string } }
export interface SceneEl { type: 'scene'; items: { emoji: string; label?: string; count?: number }[]; layout?: 'row' | 'grid' | 'scatter'; caption?: string }
export interface AudioEl { type: 'audio'; src?: string; label: string; listenTask?: string }

export interface ArrayEl { type: 'array'; rows: number; cols: number; show?: string; animate?: 'none' | 'rotate' }
export interface NumberLineEl { type: 'numberLine'; min: number; max: number; step?: number; marks?: number[]; jumps?: number[]; target?: number }
export interface BaseTenEl { type: 'baseTen'; value: number; mode?: 'tenFrame' | 'blocks' | 'placeValue'; target?: number }
export interface FractionEl { type: 'fraction'; whole: ('bar' | 'circle')[]; num: number; den: number }
export interface BarModelEl { type: 'barModel'; whole: number | '?'; parts: (number | '?')[]; label?: string }
export interface NumberBondEl { type: 'numberBond'; whole: number | '?'; parts: (number | '?')[] }
export interface ShapeEl { type: 'shape'; mode: '2d' | '3d' | 'angle' | 'symmetry' | 'net'; spec: string }
export interface GridEl { type: 'grid'; rows: number; cols: number; mode?: 'coord' | 'beebot' | 'pixel'; cells?: { x: number; y: number; fill?: string; label?: string }[]; target?: { x: number; y: number } }
export interface DataChartEl { type: 'dataChart'; kind: 'table' | 'pictogram' | 'bar' | 'line' | 'pie'; data: { label: string; value: number }[]; unit?: string }
export interface MeasureEl { type: 'measure'; mode: 'clock' | 'money' | 'ruler' | 'scale' | 'jug' | 'thermo'; value: number; unit?: string; target?: number }
export interface WordBuildEl { type: 'wordBuild'; word: string; split: 'phoneme' | 'syllable' | 'morpheme'; parts?: string[] }
export interface TextMarkEl { type: 'textMark'; passage: string; mode?: 'highlight' | 'cloze' | 'sort'; marks?: string[] }
export interface SentenceEl { type: 'sentence'; words: string[]; label?: 'pos' | 'punct' | 'order' }
export interface DiagramEl { type: 'diagram'; mode: 'label' | 'cycle' | 'flow' | 'web' | 'mindmap'; nodes: { id: string; label: string; x?: number; y?: number }[]; edges?: { from: string; to: string; label?: string }[] }
export interface MapEl { type: 'map'; scope: 'world' | 'region' | 'local' | 'historical'; pins?: { x: number; y: number; label: string }[]; regions?: string[]; routes?: { from: string; to: string }[] }
export interface TimelineEl { type: 'timeline'; events: { when: string; label: string }[]; scale?: string }
export interface SortEl { type: 'sort'; mode: 'bucket' | 'venn' | 'rank'; groups: string[]; items: { text: string; group: string }[] }
export interface MusicEl { type: 'music'; mode: 'staff' | 'rhythm' | 'keyboard'; spec: string }
export interface DrawEl { type: 'draw'; prompt?: string; guides?: string }
export interface StepsEl { type: 'steps'; slides: { title?: string; body: string }[]; reveal?: 'one-by-one' | 'all' }
export interface ChoiceEl { type: 'choice'; prompt: string; options: string[]; correct: number[]; explain?: string }
export interface EnterEl { type: 'enter'; prompt: string; answer: string; kind?: 'number' | 'text'; tolerance?: number; unit?: string }
export interface SpeakEl { type: 'speak'; prompt: string; target?: string }

export type LessonElement =
  | TextEl | ImageEl | VideoEl | SceneEl | AudioEl
  | ArrayEl | NumberLineEl | BaseTenEl | FractionEl | BarModelEl | NumberBondEl
  | ShapeEl | GridEl | DataChartEl | MeasureEl
  | WordBuildEl | TextMarkEl | SentenceEl
  | DiagramEl | MapEl | TimelineEl | SortEl
  | MusicEl | DrawEl | StepsEl
  | ChoiceEl | EnterEl | SpeakEl;

export type ElementType = LessonElement['type'];

export const ELEMENT_JOB: Record<ElementType, ElementJob> = {
  text: 'tell',
  image: 'show', video: 'show', scene: 'show', audio: 'show',
  array: 'model', numberLine: 'model', baseTen: 'model', fraction: 'model', barModel: 'model', numberBond: 'model',
  shape: 'model', grid: 'model', dataChart: 'model', measure: 'model',
  wordBuild: 'model', textMark: 'model', sentence: 'model',
  diagram: 'model', map: 'model', timeline: 'model', sort: 'model',
  music: 'model', draw: 'model',
  steps: 'sequence',
  choice: 'do', enter: 'do', speak: 'do'
};

/** Elements that can run in MANIPULATE mode (child acts -> reports a result). */
export const MANIPULABLE: ElementType[] = [
  'scene','video',
  'array','numberLine','baseTen','fraction','barModel','numberBond','shape','grid','dataChart','measure',
  'wordBuild','textMark','sentence','diagram','map','timeline','sort','music','draw',
  'steps','choice','enter','speak'
];

export function elementIsManipulable(type?: ElementType): boolean {
  return !!type && MANIPULABLE.includes(type);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --import tsx --test shared/elements.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Typecheck & commit**

Run: `npm run typecheck` → Expected: no errors.
```bash
git add shared/elements.ts shared/elements.test.ts
git commit -m "feat(elements): add LessonElement contract for the 28 semantic elements"
```

---

### Task 2: Tolerant element schemas (`server/src/ai/element-schemas.ts`)

Mirrors the defensive JSON handling already used in `server/src/ai/schemas.ts`: validate with zod, apply safe fallbacks so a malformed AI reply never crashes.

**Files:**
- Create: `server/src/ai/element-schemas.ts`
- Test: `server/src/ai/element-schemas.test.ts`

**Interfaces:**
- Consumes: `LessonElement`, `ElementType` from `../../../shared/elements.ts`.
- Produces: `ElementSchema` (zod discriminated union), `parseElement(raw: unknown): LessonElement | null` (returns `null` on unrecoverable input), `parseElements(raw: unknown): LessonElement[]`.

- [ ] **Step 1: Write the failing test**

```ts
// server/src/ai/element-schemas.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseElement, parseElements } from './element-schemas.ts';

test('parses a valid array element', () => {
  const el = parseElement({ type: 'array', rows: 3, cols: 5, animate: 'rotate' });
  assert.equal(el?.type, 'array');
  assert.equal((el as any).rows, 3);
});

test('coerces stringy numbers and fills defaults', () => {
  const el = parseElement({ type: 'array', rows: '3', cols: '5' });
  assert.equal((el as any).cols, 5);
  assert.equal((el as any).animate, 'none');
});

test('returns null for an unknown type', () => {
  assert.equal(parseElement({ type: 'nope' }), null);
});

test('parseElements drops the bad ones, keeps the good', () => {
  const els = parseElements([{ type: 'text', value: 'hi' }, { type: 'nope' }, { type: 'choice', prompt: 'p', options: ['a','b'], correct: [0] }]);
  assert.equal(els.length, 2);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --import tsx --test server/src/ai/element-schemas.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write minimal implementation**

Write `server/src/ai/element-schemas.ts`: a zod schema per element (using `z.coerce.number()` for numeric params, `.default(...)` for optionals like `animate: z.enum(['none','rotate']).default('none')`), combined via `z.discriminatedUnion('type', [...])`. `parseElement` runs `ElementSchema.safeParse` and returns `.data` or `null`. `parseElements` maps `parseElement` over an array and filters `null`. Follow the extract-then-validate style of `schemas.ts`. Every one of the 28 types gets a schema entry; numeric fields coerce; enum/optional fields default.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --import tsx --test server/src/ai/element-schemas.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Typecheck & commit**

Run: `npm run typecheck`
```bash
git add server/src/ai/element-schemas.ts server/src/ai/element-schemas.test.ts
git commit -m "feat(elements): tolerant zod schemas + parseElement for the 28 elements"
```

---

### Task 3: Pure layout geometry (`client/src/blocks/elements/geometry.ts`)

Pure functions the renderers share, so the fiddly maths is tested once and the components stay declarative.

**Files:**
- Create: `client/src/blocks/elements/geometry.ts`
- Test: `client/src/blocks/elements/geometry.test.ts`

**Interfaces:**
- Produces:
  - `arrayDots(rows: number, cols: number, gap?: number, r?: number): { cx: number; cy: number }[]`
  - `tenFrameCells(cell?: number, gap?: number): { x: number; y: number }[]` (10 cells, 2×5)
  - `numberLineTicks(min: number, max: number, width?: number): { n: number; x: number; big: boolean }[]`
  - `pieSlices(n: number, r?: number): string[]` (SVG path `d` per equal slice)

- [ ] **Step 1: Write the failing test**

```ts
// client/src/blocks/elements/geometry.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { arrayDots, tenFrameCells, numberLineTicks, pieSlices } from './geometry.ts';

test('arrayDots returns rows*cols points', () => {
  assert.equal(arrayDots(3, 5).length, 15);
});
test('tenFrameCells is always 10', () => {
  assert.equal(tenFrameCells().length, 10);
});
test('numberLineTicks marks every integer and flags evens big', () => {
  const t = numberLineTicks(0, 10);
  assert.equal(t.length, 11);
  assert.equal(t.find(x => x.n === 4)?.big, true);
});
test('pieSlices returns one path per slice', () => {
  assert.equal(pieSlices(4).length, 4);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --import tsx --test client/src/blocks/elements/geometry.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write minimal implementation**

Implement the four pure functions. `arrayDots` centres a `rows×cols` grid at gap spacing (port the loop from the gallery `drawArray`). `tenFrameCells` lays out a 2×5 grid. `numberLineTicks` spaces integers across `width` (default 228), `big = n % 2 === 0`. `pieSlices` returns `M0 0 L…A…Z` path strings for `n` equal slices of radius `r` (default 34). No React here — pure TS.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --import tsx --test client/src/blocks/elements/geometry.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Typecheck & commit**

Run: `npm run typecheck`
```bash
git add client/src/blocks/elements/geometry.ts client/src/blocks/elements/geometry.test.ts
git commit -m "feat(elements): tested SVG layout geometry helpers"
```

---

### Task 4: Renderer infrastructure — tokens, registry, ElementView, gallery route

Sets up the shared shell so every subsequent renderer task just adds a component + a registry entry + a gallery sample.

**Files:**
- Create: `client/src/blocks/elements/tokens.css` (the gallery token system: `:root` + `@media (prefers-color-scheme: dark)` + `:root[data-theme=…]`, semantic colour vars, display font var).
- Create: `client/src/blocks/elements/types.ts` — `export interface ElementProps<E = LessonElement> { el: E; mode: ElementMode; onResult?: (r: ElementResult) => void }`.
- Create: `client/src/blocks/elements/registry.tsx` — `ELEMENT_REGISTRY: Partial<Record<ElementType, React.FC<ElementProps>>>` (empty at first) + `export function hasRenderer(t: ElementType): boolean`.
- Create: `client/src/blocks/elements/ElementView.tsx` — looks up the registry, renders the component (or a labelled "no renderer yet" placeholder), wraps in an `.el-card` shell, passes `mode`/`onResult`.
- Create: `client/src/screens/ElementGallery.tsx` — imports `GALLERY_SAMPLES` (see below) and renders each in demonstrate + manipulate; a theme toggle stamping `data-theme`.
- Create: `client/src/blocks/elements/samples.ts` — `export const GALLERY_SAMPLES: LessonElement[]` (one realistic instance per implemented element; starts with the Task 1 array sample).
- Modify: the client router (find it: `grep -rn "createHashRouter\|useHashLocation\|window.location.hash" client/src` — likely `client/src/App.tsx` or `client/src/main.tsx`) to add a dev route `#/dev/elements` → `ElementGallery`.

**Interfaces:**
- Consumes: `LessonElement`, `ElementType`, `ElementMode`, `ElementResult`, `elementIsManipulable` from `@shared/elements.ts`.
- Produces: `ElementProps`, `ELEMENT_REGISTRY`, `<ElementView el mode onResult />`, `GALLERY_SAMPLES`.

- [ ] **Step 1: Locate the router**

Run: `grep -rn "hash\|Router\|route" client/src/main.tsx client/src/App.tsx 2>/dev/null | head`
Expected: shows how routes/screens are chosen (the app uses hash routes like `/#/parent/prompts`). Note the mechanism for Step 5.

- [ ] **Step 2: Create tokens, props, registry, ElementView, samples**

Create `tokens.css` (copy the token block from the approved gallery), `types.ts` (`ElementProps`), `registry.tsx` (empty map + `hasRenderer`), `samples.ts` (`GALLERY_SAMPLES = [{ type:'array', rows:3, cols:5, animate:'rotate' }]`), and `ElementView.tsx`:

```tsx
// client/src/blocks/elements/ElementView.tsx
import type { LessonElement } from '@shared/elements.ts';
import type { ElementMode, ElementResult } from '@shared/elements.ts';
import { ELEMENT_REGISTRY } from './registry.tsx';
import './tokens.css';

export function ElementView({ el, mode, onResult }: { el: LessonElement; mode: ElementMode; onResult?: (r: ElementResult) => void }) {
  const C = ELEMENT_REGISTRY[el.type];
  return (
    <div className="el-card" data-el={el.type}>
      {C ? <C el={el} mode={mode} onResult={onResult} /> : <div className="el-todo">no renderer yet: {el.type}</div>}
    </div>
  );
}
```

- [ ] **Step 3: Create the gallery screen**

`ElementGallery.tsx` maps `GALLERY_SAMPLES` to two `<ElementView>`s each (`demonstrate`, and `manipulate` when `elementIsManipulable(el.type)`), inside a responsive grid, with a button that toggles `document.documentElement.dataset.theme`.

- [ ] **Step 4: Wire the dev route**

Add `#/dev/elements` → `<ElementGallery/>` using the mechanism found in Step 1. Keep it out of any user-facing nav.

- [ ] **Step 5: Verify in the browser + commit**

Run: `npm run typecheck` → no errors.
Run the app (`npm run dev`) and open `http://localhost:5173/#/dev/elements`; expected: the array sample renders (via the Task-6 renderer once present; until then the "no renderer yet: array" placeholder shows). Toggle theme — tokens flip.
```bash
git add client/src/blocks/elements client/src/screens/ElementGallery.tsx <router file>
git commit -m "feat(elements): renderer infra — tokens, registry, ElementView, dev gallery route"
```

---

### Tasks 5–11: the 28 renderers

Each renderer task follows the **same recipe** (stated once here; each task lists its elements + per-element spec):

**Recipe per element**
1. Create `client/src/blocks/elements/<name>.tsx` exporting `const <Name>: React.FC<ElementProps<...>>`. Read `el` params; branch on `mode`. `demonstrate` draws the static/animated SVG (use `geometry.ts` helpers); `manipulate` adds the interaction and calls `onResult({ text, correct })` when the child completes it. Use only token CSS vars for colour; honour `prefers-reduced-motion`.
2. Register it in `registry.tsx`.
3. Add one realistic instance to `GALLERY_SAMPLES` in `samples.ts`.
4. `npm run typecheck` → clean.
5. Open `/#/dev/elements`, confirm both modes render and manipulate mode fires a result (watch via a temporary console.log or an on-page result readout in the gallery).
6. Commit `feat(elements): <names> renderers`.

**Use the frontend-design skill** when authoring the visual treatment; match the gallery's proven look. For elements already prototyped in the approved gallery (`array, fraction, numberLine, baseTen, barModel, numberBond, wordBuild, steps`), port that SVG as the demonstrate mode and add the manipulate mode.

**Exemplar (full code) — `array.tsx`:**

```tsx
// client/src/blocks/elements/array.tsx
import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { ArrayEl } from '@shared/elements.ts';
import { arrayDots } from './geometry.ts';

export const ArrayElement: React.FC<ElementProps<ArrayEl>> = ({ el, mode, onResult }) => {
  const [rot, setRot] = useState(false);
  const [built, setBuilt] = useState(0); // manipulate: groups the child has placed
  const rows = rot ? el.cols : el.rows, cols = rot ? el.rows : el.cols;
  const dots = arrayDots(rows, cols);
  const label = `${rows} × ${cols} = ${rows * cols}`;
  if (mode === 'manipulate') {
    const done = built === el.rows;
    return (
      <div className="el-array">
        <p className="el-prompt">Build {el.rows} groups of {el.cols}.</p>
        <div className="el-groups">
          {Array.from({ length: built }).map((_, g) => (
            <span key={g} className="el-group">{'●'.repeat(el.cols)}</span>
          ))}
        </div>
        <button className="el-btn" disabled={done}
          onClick={() => { const n = built + 1; setBuilt(n); if (n === el.rows) onResult?.({ text: `built ${el.rows}×${el.cols}`, correct: true }); }}>
          + add a group of {el.cols}
        </button>
      </div>
    );
  }
  return (
    <div className="el-array">
      <svg viewBox="0 0 260 150" width="240" role="img" aria-label={`array ${label}`}>
        {dots.map((d, i) => <circle key={i} cx={d.cx} cy={d.cy} r="9" fill={rot ? 'var(--el-orange)' : 'var(--el-blue)'} />)}
        <text x="130" y="140" textAnchor="middle" className="el-txt" fontSize="16">{label}</text>
      </svg>
      {el.animate === 'rotate' && <button className="el-btn" onClick={() => setRot(r => !r)}>↻ turn it</button>}
    </div>
  );
};
```

Register: `array: ArrayElement`. Sample: `{ type:'array', rows:3, cols:5, animate:'rotate' }`.

---

### Task 5: Tell & Show renderers

**Elements:** `text` (tell) · `image` · `video` · `scene` · `audio` (show).
**Per-element spec:**
- `text` — demonstrate: render `value`; `emphasis:'callout'` → boxed accent card, `'term'` → term + definition. No manipulate.
- `image` — demonstrate: `<img>` + caption; `annotate[]` → clickable hotspots that reveal labels. manipulate: child taps the region named in a prompt → `onResult`.
- `video` — demonstrate: shows `watchTask` then an embed/placeholder for `url`/`searchTerm`; manipulate: after "I watched it", ask `afterCheck.question`, compare to `expectedAnswer` (case-insensitive contains) → `onResult`.
- `scene` — demonstrate: lay out `items` (emoji ×`count`) per `layout`; manipulate: child taps to count → compare to total → `onResult`.
- `audio` — demonstrate: play button for `src` + `label`; manipulate: `listenTask` then a `choice`-style identify → `onResult`.

Follow the recipe (register, sample, typecheck, gallery-verify, commit).

---

### Task 6: Model · number renderers

**Elements:** `array` (use the exemplar above) · `numberLine` · `baseTen` · `fraction` · `barModel` · `numberBond`.
**Per-element spec:**
- `numberLine` — demonstrate: `numberLineTicks` + `jumps[]` as arcs + `target` marker (port gallery); manipulate: child taps a tick → compare to `target` → `onResult`.
- `baseTen` — demonstrate: `tenFrameCells` filled to `value` (or blocks/placeValue per `mode`); manipulate: child taps cells to reach `target` → `onResult`.
- `fraction` — demonstrate: shade `num/den` on each `whole` (bar via rects, circle via `pieSlices`); manipulate: child taps parts to shade `num` → `onResult`.
- `barModel` — demonstrate: whole bar split into `parts` with `'?'` unknown; manipulate: child enters the unknown → compare → `onResult`.
- `numberBond` — demonstrate: whole + parts circles, `'?'` dashed; manipulate: child enters the missing part → `onResult`.

Recipe per element. Commit `feat(elements): number model renderers`.

---

### Task 7: Model · shape, grid, data & measure renderers

**Elements:** `shape` · `grid` · `dataChart` · `measure`.
**Per-element spec:**
- `shape` — demonstrate per `mode`: `2d`/`3d` draw from `spec` (e.g. `"triangle"`, `"cube"`), `angle` draw the angle, `symmetry` show mirror line, `net` show unfolded; manipulate: child counts sides / sets angle / reflects → `onResult`.
- `grid` — demonstrate: `rows×cols` grid, plot `cells`; `beebot` shows a route, `coord` shows axes, `pixel` colours cells; manipulate: child taps `target` cell / draws route → `onResult`.
- `dataChart` — demonstrate: render `kind` from `data` (table/pictogram/bar/line/pie via `pieSlices`); manipulate: child reads off a value or drags a bar to height → `onResult`.
- `measure` — demonstrate per `mode`: clock hands / coins / ruler / scale / jug / thermometer at `value`; manipulate: child sets it to `target` → `onResult`.

Recipe per element. Commit `feat(elements): shape/grid/data/measure renderers`.

---

### Task 8: Model · language renderers

**Elements:** `wordBuild` · `textMark` · `sentence`.
**Per-element spec:**
- `wordBuild` — demonstrate: coloured chips for `parts` (or split `word` by `split`); manipulate: child taps chips in order to build the word → `onResult` (port gallery colours).
- `textMark` — demonstrate: render `passage`, highlight `marks`; `cloze` blanks them; manipulate: child taps words to highlight / fills cloze → `onResult`.
- `sentence` — demonstrate: `words[]` as tiles labelled by `label` (pos/punct); manipulate: child orders tiles / labels each → `onResult`.

Recipe per element. Commit `feat(elements): language model renderers`.

---

### Task 9: Model · world renderers

**Elements:** `diagram` · `map` · `timeline` · `sort`.
**Per-element spec:**
- `diagram` — demonstrate per `mode`: `label` (nodes at x/y with connectors), `cycle` (nodes round a ring with arrows), `flow` (top-down boxes + arrows), `web` (central node + spokes), `mindmap`; manipulate: child drags labels to nodes / orders the cycle → `onResult`.
- `map` — demonstrate: a stylised SVG map for `scope`, plot `pins`, shade `regions`, draw `routes`; manipulate: child places a pin at the named place / traces a route → `onResult`. (Use a simple abstract landmass SVG, not real cartography.)
- `timeline` — demonstrate: horizontal line, `events` as dated markers; manipulate: child drags events into order / places one on the line → `onResult`.
- `sort` — demonstrate: `groups` as buckets/venn/rank with `items` placed; manipulate: child drags each item to its `group`, compares to key → `onResult`.

Recipe per element. Commit `feat(elements): world model renderers`.

---

### Task 10: Model · make & Sequence renderers

**Elements:** `music` · `draw` · `steps`.
**Per-element spec:**
- `music` — demonstrate per `mode`: `staff` (5 lines + notes from `spec`), `rhythm` (beat boxes), `keyboard` (octave, highlight `spec` keys); manipulate: child taps the beat / plays keys → `onResult`.
- `draw` — demonstrate: tutor sketch from `guides` (labelled shapes); manipulate: a pointer/touch `<canvas>` the child draws on, `prompt` shown, "done" → `onResult({ text:'drew', correct:true })` (creative — always accept).
- `steps` — demonstrate: reveal `slides` one-by-one with Next (port gallery); manipulate: hide the last slide and ask the child to predict it via `enter`/`choice` → `onResult`.

Recipe per element. Commit `feat(elements): make + sequence renderers`.

---

### Task 11: Do (pure check) renderers

**Elements:** `choice` · `enter` · `speak`.
**Per-element spec:**
- `choice` — manipulate only: render `prompt` + `options`; single or multi per `correct.length`; on submit compare set to `correct` → `onResult({ text, correct })`. Demonstrate: show options greyed (no interaction).
- `enter` — manipulate: `prompt` + input (`kind:'number'` numeric, else text); compare to `answer` (number within `tolerance`, or case-insensitive trim) → `onResult`.
- `speak` — manipulate: `prompt` + a mic button reusing the existing Whisper capture (find it: `grep -rn "whisper\|transcrib\|getUserMedia" client/src`); on transcript, contains-match `target` → `onResult`. If wiring the real mic is heavy, render the prompt + a text fallback and leave a `// TODO reuse Whisper` — but prefer reuse.

Recipe per element. Commit `feat(elements): do/check renderers`.

---

### Task 12: Gallery completeness, visual smoke & phase close

**Files:**
- Modify: `client/src/screens/ElementGallery.tsx` (add an on-page result readout so manipulate results are visible without the console; group samples by `ELEMENT_JOB`).
- Modify: `client/src/blocks/elements/samples.ts` (ensure all 28 have a realistic sample).

- [ ] **Step 1: Assert every element has a renderer**

Add a temporary check in the gallery: for each `ElementType`, assert `hasRenderer(t)`; render a red banner listing any missing. Open `/#/dev/elements` — expected: no missing.

- [ ] **Step 2: Typecheck the whole repo**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Run all logic tests**

Run: `npm test`
Expected: existing suites still pass; new `elements`, `element-schemas`, `geometry` tests pass.

- [ ] **Step 4: Visual smoke with Playwright/Chrome**

Drive `http://localhost:5173/#/dev/elements` (use the claude-in-chrome tools or Playwright): screenshot light + dark; click each interactive element once; confirm the on-page result readout updates and no console errors. Fix any element that throws.

- [ ] **Step 5: Commit the phase**

```bash
git add client/src/screens/ElementGallery.tsx client/src/blocks/elements/samples.ts
git commit -m "feat(elements): complete 28-element gallery + visual smoke; P1 done"
```

---

## Self-Review

**Spec coverage (spec §5):** the 28 element ids (§5.1) → Task 1 contract + Tasks 5–11 renderers; job organization (`ELEMENT_JOB`) → Task 1; semantic/parametric params → Task 1 param interfaces; dual-mode (§pillar 3) → `mode` branch in every renderer (Tasks 5–11) + `MANIPULABLE`; renderer contract `{params, mode, onResult}` (§5.4) → Task 4 `ElementProps`; tolerant parse (like `schemas.ts`) → Task 2; design system from the gallery → Task 4 tokens + frontend-design in Tasks 5–11; subject coverage (§5.2) → the specific renderers in Tasks 7–10 (`map`,`timeline`,`sort`,`music`,`draw`,`wordBuild`). **Not in P1 (correctly deferred):** `classai-lesson/2` structural types, generation, director, policy — these are P2–P4; P1 is additive and ships behind `#/dev/elements` only.

**Placeholder scan:** the only deliberate `// TODO` is the `speak` Whisper-reuse fallback in Task 11, with the preferred path (reuse existing capture) named and a grep to find it — acceptable. No "add error handling"/"write tests for the above" placeholders; logic tasks carry real test code; renderer tasks carry per-element behavioural specs + a full exemplar.

**Type consistency:** `ElementProps`, `ElementResult`, `ElementMode`, `LessonElement`, `ElementType`, `ELEMENT_JOB`, `MANIPULABLE`, `elementIsManipulable`, `ELEMENT_REGISTRY`, `hasRenderer`, `parseElement`/`parseElements`, and the geometry helper signatures are used consistently across Tasks 1–12. Renderer components are named `<Name>Element` and registered under their exact element id.
