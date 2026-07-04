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
