#!/usr/bin/env node
// Validates classai-lesson/1 JSON files.
//
// Usage: node curriculum/validate-lessons.mjs [root-or-dir-or-file ...] [--quiet]
//   - a directory is searched recursively for every `lessons/*.json`
//     (`node curriculum/validate-lessons.mjs curriculum` checks the whole library);
//     .json files sitting directly in a directory you name are checked too;
//   - with no arguments, the curriculum folder this script lives in is checked;
//   - --quiet hides the individual warnings (the summary still counts them).
//
// ERRORS are structural problems (the lesson would not play as authored) and
// fail the run. WARNINGS are pedagogy smells worth a human look; they never fail it.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// One list shared with the app: a test asserts it equals BlockSchema's options.
const { blockTypes: validBlockTypes } = JSON.parse(fs.readFileSync(path.join(HERE, 'block-types.json'), 'utf8'));
const beatKinds = ['hook', 'explain', 'example', 'check', 'practice', 'recap'];
const deliveries = ['human', 'video', 'ai'];
const interactiveTypes = ['multipleChoice', 'multiSelect', 'trueFalse', 'fillBlank', 'matchPairs', 'ordering', 'categorize', 'numberEntry', 'shortText', 'speak'];

const args = process.argv.slice(2);
const quiet = args.includes('--quiet');
const targets = args.filter((a) => !a.startsWith('--'));
if (!targets.length) targets.push(HERE);

// ---- collect files -----------------------------------------------------------
const SKIP_DIRS = new Set(['node_modules', '.git']);
const jsonFiles = new Set();
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (!SKIP_DIRS.has(ent.name)) walk(p);
    } else if (ent.name.endsWith('.json') && path.basename(dir) === 'lessons') {
      jsonFiles.add(p);
    }
  }
}
for (const t of targets) {
  let st;
  try {
    st = fs.statSync(t);
  } catch {
    console.error(`No such file or directory: ${t}`);
    process.exit(2);
  }
  if (st.isDirectory()) {
    for (const f of fs.readdirSync(t)) if (f.endsWith('.json') && fs.statSync(path.join(t, f)).isFile() && f !== 'block-types.json') jsonFiles.add(path.join(t, f));
    walk(t);
  } else if (t.endsWith('.json')) jsonFiles.add(t);
}

// ---- checks ------------------------------------------------------------------
const errs = [];
const warns = [];
const warnCounts = {};
const warn = (category, msg) => {
  warns.push(`${msg}`);
  warnCounts[category] = (warnCounts[category] || 0) + 1;
};

const checkWb = (bl, where, f) => {
  if (bl.type !== 'whiteboard') return;
  for (const el of bl.elements || []) {
    const xs = [el.x, el.x1, el.x2, (el.x ?? 0) + (el.w ?? 0)].filter((v) => v !== undefined);
    const ys = [el.y, el.y1, el.y2, (el.y ?? 0) + (el.h ?? 0)].filter((v) => v !== undefined);
    if (el.points) el.points.forEach((p) => { xs.push(p.x); ys.push(p.y); });
    if (Math.max(...xs) > 100 || Math.max(...ys) > 62 || Math.min(...xs) < 0 || Math.min(...ys) < 0)
      errs.push(`${f} ${where}: whiteboard element outside 100x62: ${JSON.stringify(el).slice(0, 70)}`);
  }
};
const checkBlock = (bl, where, f) => {
  if (!bl || typeof bl !== 'object') { errs.push(`${f} ${where}: block is not an object`); return; }
  if (!validBlockTypes.includes(bl.type)) { errs.push(`${f} ${where}: invalid block type ${bl.type}`); return; }
  checkWb(bl, where, f);
  if (bl.type === 'multipleChoice' && (!Array.isArray(bl.options) || bl.correct < 0 || bl.correct >= bl.options.length)) errs.push(`${f} ${where}: MC correct out of range`);
  if (bl.type === 'fillBlank' && !String(bl.text || '').includes('___')) errs.push(`${f} ${where}: fillBlank missing ___`);
  if (bl.type === 'ordering' && (!bl.items || bl.items.length < 2)) errs.push(`${f} ${where}: ordering needs 2+ items`);
  if (bl.type === 'categorize') for (const it of bl.items || []) if (!(bl.buckets || []).includes(it.bucket)) errs.push(`${f} ${where}: categorize item bucket '${it.bucket}' not in buckets`);
  if (bl.type === 'matchPairs' && (!bl.pairs || bl.pairs.length < 2)) errs.push(`${f} ${where}: matchPairs needs 2+ pairs`);
};

/** Loose text match: case/punctuation-insensitive; equal, one contains the
 *  other, or at least half of the shorter answer's content words appear in the
 *  other (expected answers are often a paraphrase of the option). */
const norm = (s) => String(s ?? '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const STOP = new Set(['the', 'and', 'a', 'an', 'of', 'to', 'is', 'it', 'in', 'on', 'so', 'for', 'you', 'your', 'are', 'was', 'be', 'that', 'this', 'with', 'not', 'no', 'there', 'can', 'its']);
const words = (s) => new Set(norm(s).split(' ').filter((w) => w && !STOP.has(w) && (w.length > 2 || /\d/.test(w))));
const looselyMatches = (a, b) => {
  const x = norm(a), y = norm(b);
  if (!x || !y) return false;
  if (x === y || x.includes(y) || y.includes(x)) return true;
  const lead = (s) => s.split(' ')[0];
  if (/\d|\p{No}/u.test(lead(x)) && lead(x) === lead(y)) return true; // "4 (links to 4×5)" vs "4 each"
  const wa = words(a), wb = words(b);
  const [small, big] = wa.size <= wb.size ? [wa, wb] : [wb, wa];
  if (!small.size) return false;
  let shared = 0;
  for (const w of small) if ([...big].some((v) => v === w || (w.length > 4 && v.length > 4 && (v.startsWith(w.slice(0, 5)) || w.startsWith(v.slice(0, 5)))))) shared++;
  return shared / small.size >= 0.5;
};
/** Pedagogy: an MC answer key and the written expected answer must agree. */
const checkMcAgreement = (block, expected, where, f) => {
  if (block?.type !== 'multipleChoice' || !expected) return;
  const keyed = block.options?.[block.correct];
  if (keyed !== undefined && !looselyMatches(expected, keyed))
    warn('mc-key-mismatch', `${f} ${where}: multipleChoice expectedAnswer "${String(expected).slice(0, 60)}" does not match options[correct] "${String(keyed).slice(0, 60)}"`);
};

const isMaths = (L, f) => /^maths?$/i.test(L.subject || '') || /[\\/]maths[\\/]/.test(f);

let files = 0;
for (const f of [...jsonFiles].sort()) {
  files++;
  let L;
  try { L = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { errs.push(`${f}: JSON PARSE ERROR ${e.message}`); continue; }
  const e = (m) => errs.push(`${f}: ${m}`);
  if (L.format !== 'classai-lesson/1') e('bad format field');
  for (const k of ['id','year','subject','unit','lessonNumber','title','durationMin','objectives','plan','practiceBank','adaptivity','vocabulary','emphasize','analysis','delivery','differentiation','assessmentEvidence']) if (!(k in L)) e(`missing ${k}`);
  if (!['fully_ai','human_intro_then_ai','video_then_ai','human_lesson'].includes(L.delivery?.mode)) e('bad delivery.mode');
  // beats
  (L.plan || []).forEach((b, i) => {
    if (!beatKinds.includes(b.kind)) e(`beat ${i} bad kind`);
    if (!deliveries.includes(b.delivery)) e(`beat ${i} bad delivery`);
    if (!b.goal || !b.successCriteria) e(`beat ${i} missing goal/successCriteria`);
    if (!b.script?.say) e(`beat ${i} missing script.say`);
    if (b.delivery === 'human' && !b.humanHandoff) e(`beat ${i} human beat missing humanHandoff`);
    (b.blocks || []).forEach((bl, j) => checkBlock(bl, `beat${i}.block${j}`, f));
    if (b.check) {
      if (!b.check.expectedAnswer) e(`beat ${i} check missing expectedAnswer`);
      if (!b.check.wrongAnswers?.length) e(`beat ${i} check no wrongAnswers`);
      else if (b.check.wrongAnswers.length < 2) warn('few-wrong-answers', `${f} beat ${i}: check has only 1 anticipated wrong answer (spec asks for ≥2)`);
      const mcs = (b.blocks || []).filter((bl) => bl?.type === 'multipleChoice');
      if (mcs.length === 1) checkMcAgreement(mcs[0], b.check.expectedAnswer, `beat ${i} check`, f);
    } else if (b.kind === 'check' && (b.blocks || []).some((bl) => interactiveTypes.includes(bl?.type))) {
      warn('check-without-playbook', `${f} beat ${i}: check beat asks a question but has no check {expectedAnswer, wrongAnswers}`);
    }
  });
  let prev = 0;
  for (const b of L.plan || []) {
    const tb = b.timeboxMin;
    if (!Array.isArray(tb) || tb.length !== 2) { e(`beat ${b.kind} timeboxMin must be [startMin, endMin]`); prev = undefined; continue; }
    if (tb[0] !== prev) e(`timebox gap at ${b.kind} (${tb[0]} vs ${prev})`);
    if (tb[1] <= tb[0]) e(`timebox at ${b.kind} ends before it starts [${tb}] — timeboxMin is [start, end] minutes, not a duration range`);
    prev = tb[1];
  }
  if (prev !== L.durationMin) e(`timeboxes end ${prev} != duration ${L.durationMin}`);
  // practice bank
  if ((L.practiceBank || []).length < 9) e(`practiceBank only ${(L.practiceBank||[]).length} items (need >=9)`);
  const levels = { 1: 0, 2: 0, 3: 0 };
  for (const p of L.practiceBank || []) {
    levels[p.level] = (levels[p.level] || 0) + 1;
    checkBlock(p.block, p.id, f);
    if (!p.skill) e(`${p.id} missing skill`);
    if (!p.expectedAnswer) e(`${p.id} missing expectedAnswer`);
    if (!p.wrongAnswers?.length) e(`${p.id} no wrongAnswers`);
    else if (p.wrongAnswers.length < 2 && interactiveTypes.includes(p.block?.type) && !['shortText', 'speak'].includes(p.block?.type))
      warn('few-wrong-answers', `${f} ${p.id}: only 1 anticipated wrong answer (spec asks for ≥2)`);
    for (const w of p.wrongAnswers || []) if (!w.why || !w.remedy) e(`${p.id} wrongAnswer missing why/remedy`);
    if (!p.hints?.length) e(`${p.id} no hints`);
    if (!p.reteach?.say) e(`${p.id} no reteach.say`);
    if (p.reteach?.block) checkBlock(p.reteach.block, `${p.id}.reteach`, f);
    checkMcAgreement(p.block, p.expectedAnswer, p.id, f);
  }
  if (!(levels[1] >= 2 && levels[2] >= 2 && levels[3] >= 2)) e(`level coverage weak ${JSON.stringify(levels)}`);
  for (const lvl of [1, 2, 3]) if (levels[lvl] >= 2 && levels[lvl] < 3) warn('thin-practice-level', `${f}: practice level ${lvl} has only ${levels[lvl]} items (aim for ≥3 per level)`);
  // pedagogy: maths is concrete first (CPA) — a maths lesson should name physical materials
  if (isMaths(L, f) && !(L.materials?.human || []).some((m) => String(m).trim()))
    warn('maths-no-materials', `${f}: maths lesson lists no physical materials (materials.human) — CPA starts concrete`);
  // video honesty
  if (L.video) {
    if (L.video.url) {
      if (!/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/.test(L.video.url) && !/^https:\/\/(www\.)?(bbc\.co\.uk|thenational\.academy)\//.test(L.video.url)) e('video url malformed');
      if (!L.video.verifiedAt) e('video has url but no verifiedAt — verify or use searchTerm instead');
    } else if (!L.video.searchTerm || !L.video.channel) e('video without url must have channel + searchTerm');
    if (!L.video.watchTask) e('video missing watchTask');
  }
  // md pair
  if (!fs.existsSync(f.replace(/\.json$/, '.md'))) e('missing .md pair');
}

// ---- report ------------------------------------------------------------------
if (warns.length && !quiet) console.log(`WARNINGS (${warns.length}):\n` + warns.map((w) => `  warn: ${w}`).join('\n') + '\n');
if (errs.length) console.log(`ERRORS (${errs.length}):\n` + errs.join('\n') + '\n');
const breakdown = Object.entries(warnCounts).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k}: ${n}`).join(', ');
console.log(`${files} lesson files checked — ${errs.length} error${errs.length === 1 ? '' : 's'}, ${warns.length} warning${warns.length === 1 ? '' : 's'}${breakdown ? ` (${breakdown})` : ''}.`);
console.log(errs.length ? 'FAILED' : 'ALL CHECKS PASSED');
process.exit(errs.length ? 1 : 0);
