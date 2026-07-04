#!/usr/bin/env node
// Validates classai-lesson/1 JSON files. Usage: node validate-lessons.mjs <dir-or-file> [...]
import fs from 'node:fs';
import path from 'node:path';

const validBlockTypes = ['richText','steps','keyTerm','numberLine','table','emojiViz','image','video','slideshow','flashcards','whiteboard','custom','multipleChoice','multiSelect','trueFalse','fillBlank','matchPairs','ordering','categorize','numberEntry','shortText','speak'];
const beatKinds = ['hook','explain','example','check','practice','recap'];
const deliveries = ['human','video','ai'];

let errs = [], files = 0;
const targets = process.argv.slice(2);
const jsonFiles = [];
for (const t of targets) {
  const st = fs.statSync(t);
  if (st.isDirectory()) for (const f of fs.readdirSync(t)) { if (f.endsWith('.json')) jsonFiles.push(path.join(t, f)); }
  else if (t.endsWith('.json')) jsonFiles.push(t);
}

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
  if (!validBlockTypes.includes(bl.type)) { errs.push(`${f} ${where}: invalid block type ${bl.type}`); return; }
  checkWb(bl, where, f);
  if (bl.type === 'multipleChoice' && (bl.correct < 0 || bl.correct >= bl.options.length)) errs.push(`${f} ${where}: MC correct out of range`);
  if (bl.type === 'fillBlank' && !bl.text.includes('___')) errs.push(`${f} ${where}: fillBlank missing ___`);
  if (bl.type === 'ordering' && (!bl.items || bl.items.length < 2)) errs.push(`${f} ${where}: ordering needs 2+ items`);
  if (bl.type === 'categorize') for (const it of bl.items || []) if (!bl.buckets.includes(it.bucket)) errs.push(`${f} ${where}: categorize item bucket '${it.bucket}' not in buckets`);
  if (bl.type === 'matchPairs' && (!bl.pairs || bl.pairs.length < 2)) errs.push(`${f} ${where}: matchPairs needs 2+ pairs`);
};

for (const f of jsonFiles) {
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
    if (b.check) { if (!b.check.expectedAnswer) e(`beat ${i} check missing expectedAnswer`); if (!b.check.wrongAnswers?.length) e(`beat ${i} check no wrongAnswers`); }
  });
  let prev = 0;
  for (const b of L.plan || []) { if (b.timeboxMin?.[0] !== prev) e(`timebox gap at ${b.kind} (${b.timeboxMin?.[0]} vs ${prev})`); prev = b.timeboxMin?.[1]; }
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
    for (const w of p.wrongAnswers || []) if (!w.why || !w.remedy) e(`${p.id} wrongAnswer missing why/remedy`);
    if (!p.hints?.length) e(`${p.id} no hints`);
    if (!p.reteach?.say) e(`${p.id} no reteach.say`);
    if (p.reteach?.block) checkBlock(p.reteach.block, `${p.id}.reteach`, f);
  }
  if (!(levels[1] >= 2 && levels[2] >= 2 && levels[3] >= 2)) e(`level coverage weak ${JSON.stringify(levels)}`);
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
console.log(`${files} lesson files checked.`);
console.log(errs.length ? `ERRORS (${errs.length}):\n` + errs.join('\n') : 'ALL CHECKS PASSED');
process.exit(errs.length ? 1 : 0);
