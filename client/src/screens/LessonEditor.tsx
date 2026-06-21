import { useState } from 'react';
import type { Lesson, LessonBeat, WrongAnswer } from '@shared/types';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { ErrorNote, Loading, Toast, TopBar, useAsync, useToast } from '../lib/ui.tsx';

const emptyBeat = (): LessonBeat => ({
  kind: 'explain', goal: '', note: '', successCriteria: ''
});

export function LessonEditor({ lessonId }: { lessonId: string }) {
  const { data, loading, error, reload } = useAsync(async () => {
    const { lesson } = await api.lesson(lessonId);
    const detail = await api.classDetail(lesson.classId);
    return { lesson, materials: detail.materials.filter((material) => material.lessonId === lesson.id) };
  }, [lessonId]);
  return (
    <div className="app">
      <TopBar />
      <div className="container wide">
        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}
        {data && <Editor key={data.lesson.id} initial={data.lesson} materials={data.materials} />}
      </div>
    </div>
  );
}

function Editor({ initial, materials }: { initial: Lesson; materials: Awaited<ReturnType<typeof api.classDetail>>['materials'] }) {
  const [lesson, setLesson] = useState(initial);
  const [instruction, setInstruction] = useState('');
  const [materialTitle, setMaterialTitle] = useState('');
  const [materialText, setMaterialText] = useState('');
  const [busy, setBusy] = useState(false);
  const { msg, show } = useToast();

  function updateBeat(index: number, patch: Partial<LessonBeat>) {
    setLesson((current) => ({ ...current, plan: current.plan.map((beat, i) => i === index ? { ...beat, ...patch } : beat) }));
  }

  function updateWrong(index: number, wrongIndex: number, patch: Partial<WrongAnswer>) {
    const beat = lesson.plan[index]!;
    const wrongAnswers = (beat.check?.wrongAnswers ?? []).map((wrong, i) => i === wrongIndex ? { ...wrong, ...patch } : wrong);
    updateBeat(index, { check: { question: beat.check?.question ?? '', expectedAnswer: beat.check?.expectedAnswer ?? '', wrongAnswers } });
  }

  async function save() {
    setBusy(true);
    try {
      const { lesson: saved } = await api.saveLesson(initial.id, {
        title: lesson.title,
        objectives: lesson.objectives,
        analysis: lesson.analysis,
        plan: lesson.plan,
        difficulty: lesson.difficulty,
        kind: lesson.kind
      });
      if (saved.id !== initial.id) navigate(`/parent/lesson/${saved.id}`);
      else setLesson(saved);
      show('Draft saved');
    } catch (cause: any) { show(cause.message || 'Could not save'); }
    finally { setBusy(false); }
  }

  async function revise() {
    if (!instruction.trim()) return show('Tell the AI what to change');
    setBusy(true);
    try {
      const { lesson: revised } = await api.reviseLesson(initial.id, instruction.trim());
      navigate(`/parent/lesson/${revised.id}`);
    } catch (cause: any) { show(cause.message || 'Could not revise'); }
    finally { setBusy(false); }
  }

  const analysis = lesson.analysis ?? { keyConcepts: [], misconceptions: [], hooks: [], priorKnowledge: [] };
  const setAnalysis = (key: keyof typeof analysis, value: string) =>
    setLesson((current) => ({ ...current, analysis: { ...analysis, [key]: value.split('\n').map((line) => line.trim()).filter(Boolean) } }));

  return (
    <>
      <button className="btn ghost small" onClick={() => navigate(`/parent/class/${lesson.classId}`)}>← Class</button>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div><h1 style={{ marginBottom: 4 }}>{lesson.title}</h1><span className={`pill ${lesson.status === 'approved' ? 'good' : 'neutral'}`}>Revision {lesson.revision} · {lesson.status}</span></div>
        <span className="row" style={{ gap: 6 }}>
          <button className="btn" disabled={busy} onClick={save}>Save draft</button>
          {lesson.status === 'draft' && <button className="btn soft" disabled={busy} onClick={async () => {
            try { await api.approveLesson(initial.id); show('Lesson approved'); setLesson((current) => ({ ...current, status: 'approved' })); }
            catch (cause: any) { show(cause.message); }
          }}>Approve</button>}
          {lesson.status === 'approved' && <button className="btn ghost" onClick={() => api.archiveLesson(initial.id).then(() => navigate(`/parent/class/${lesson.classId}`))}>Archive</button>}
        </span>
      </div>

      {lesson.status === 'approved' && <div className="banner" style={{ margin: '14px 0' }}>Editing an approved lesson creates a new draft revision; the approved version stays available until the new draft is approved.</div>}

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Lesson details</h3>
        <label className="field">Title<input value={lesson.title} onChange={(event) => setLesson({ ...lesson, title: event.target.value })} /></label>
        <div className="row">
          <label className="field grow">Difficulty<select value={lesson.difficulty} onChange={(event) => setLesson({ ...lesson, difficulty: event.target.value as Lesson['difficulty'] })}><option>gentle</option><option>standard</option><option>challenge</option></select></label>
          <label className="field grow">Kind<select value={lesson.kind} onChange={(event) => setLesson({ ...lesson, kind: event.target.value as Lesson['kind'] })}><option>lesson</option><option>diagnostic</option><option>review</option></select></label>
        </div>
        <label className="field">Objectives <span className="hint">one per line</span><textarea value={lesson.objectives.join('\n')} onChange={(event) => setLesson({ ...lesson, objectives: event.target.value.split('\n').map((line) => line.trim()).filter(Boolean) })} /></label>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <h3>Teaching analysis</h3>
        <div className="grid cols-2">
          {(['keyConcepts', 'misconceptions', 'hooks', 'priorKnowledge'] as const).map((key) => (
            <label key={key} className="field">{key.replace(/([A-Z])/g, ' $1')} <span className="hint">one per line</span><textarea value={analysis[key].join('\n')} onChange={(event) => setAnalysis(key, event.target.value)} /></label>
          ))}
        </div>
      </div>

      <h2 style={{ marginTop: 24 }}>Lesson beats</h2>
      {lesson.plan.map((beat, index) => (
        <div key={index} className="card" style={{ marginBottom: 12 }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <strong>Beat {index + 1}</strong>
            <span className="row" style={{ gap: 4 }}>
              <button className="btn ghost small" disabled={index === 0} onClick={() => setLesson((current) => { const plan = [...current.plan]; [plan[index - 1], plan[index]] = [plan[index]!, plan[index - 1]!]; return { ...current, plan }; })}>↑</button>
              <button className="btn ghost small" disabled={index === lesson.plan.length - 1} onClick={() => setLesson((current) => { const plan = [...current.plan]; [plan[index], plan[index + 1]] = [plan[index + 1]!, plan[index]!]; return { ...current, plan }; })}>↓</button>
              <button className="btn danger small" onClick={() => setLesson((current) => ({ ...current, plan: current.plan.filter((_, i) => i !== index) }))}>Remove</button>
            </span>
          </div>
          <label className="field">Kind<select value={beat.kind} onChange={(event) => updateBeat(index, { kind: event.target.value as LessonBeat['kind'] })}>{['hook', 'explain', 'example', 'check', 'practice', 'recap'].map((kind) => <option key={kind}>{kind}</option>)}</select></label>
          <label className="field">Goal<input value={beat.goal} onChange={(event) => updateBeat(index, { goal: event.target.value })} /></label>
          <label className="field">Teaching note<textarea value={beat.note} onChange={(event) => updateBeat(index, { note: event.target.value })} /></label>
          <label className="field">Success criteria<input value={beat.successCriteria} onChange={(event) => updateBeat(index, { successCriteria: event.target.value })} /></label>
          <div className="grid cols-2">
            <label className="field">Visual type<input value={beat.visual?.kind ?? ''} onChange={(event) => updateBeat(index, { visual: { kind: event.target.value, brief: beat.visual?.brief ?? '' } })} placeholder="whiteboard, video, steps…" /></label>
            <label className="field">Visual brief<input value={beat.visual?.brief ?? ''} onChange={(event) => updateBeat(index, { visual: { kind: beat.visual?.kind ?? 'custom', brief: event.target.value } })} /></label>
          </div>
          {(beat.kind === 'check' || beat.kind === 'practice' || beat.check) && (
            <div className="inset">
              <h4>Understanding check</h4>
              <label className="field">Question<input value={beat.check?.question ?? ''} onChange={(event) => updateBeat(index, { check: { question: event.target.value, expectedAnswer: beat.check?.expectedAnswer ?? '', wrongAnswers: beat.check?.wrongAnswers ?? [] } })} /></label>
              <label className="field">Expected answer<input value={beat.check?.expectedAnswer ?? ''} onChange={(event) => updateBeat(index, { check: { question: beat.check?.question ?? '', expectedAnswer: event.target.value, wrongAnswers: beat.check?.wrongAnswers ?? [] } })} /></label>
              {(beat.check?.wrongAnswers ?? []).map((wrong, wrongIndex) => (
                <div key={wrongIndex} className="grid cols-3">
                  <label className="field">Likely wrong answer<input value={wrong.answer} onChange={(event) => updateWrong(index, wrongIndex, { answer: event.target.value })} /></label>
                  <label className="field">Why<input value={wrong.why} onChange={(event) => updateWrong(index, wrongIndex, { why: event.target.value })} /></label>
                  <label className="field">Remedy<input value={wrong.remedy} onChange={(event) => updateWrong(index, wrongIndex, { remedy: event.target.value })} /></label>
                </div>
              ))}
              <button className="btn ghost small" onClick={() => updateBeat(index, { check: { question: beat.check?.question ?? '', expectedAnswer: beat.check?.expectedAnswer ?? '', wrongAnswers: [...(beat.check?.wrongAnswers ?? []), { answer: '', why: '', remedy: '' }] } })}>+ Add misconception</button>
            </div>
          )}
        </div>
      ))}
      <button className="btn ghost" onClick={() => setLesson((current) => ({ ...current, plan: [...current.plan, emptyBeat()] }))}>+ Add beat</button>

      <div className="grid cols-2" style={{ marginTop: 24 }}>
        <div className="card">
          <h3>Ask AI to edit</h3>
          <textarea value={instruction} onChange={(event) => setInstruction(event.target.value)} placeholder="Make the visual explanation simpler and add a hands-on practice activity…" />
          <button className="btn" disabled={busy || !instruction.trim()} onClick={revise}>Create AI revision</button>
        </div>
        <div className="card">
          <h3>Lesson knowledge</h3>
          {materials.map((material) => <div key={material.id} className="kv"><span>{material.title}</span><button className="btn danger small" onClick={() => api.deleteMaterial(material.id).then(() => location.reload())}>Remove</button></div>)}
          <label className="field">Title<input value={materialTitle} onChange={(event) => setMaterialTitle(event.target.value)} /></label>
          <label className="field">Material<textarea value={materialText} onChange={(event) => setMaterialText(event.target.value)} /></label>
          <button className="btn ghost" disabled={!materialText.trim()} onClick={() => api.addMaterial(lesson.classId, { title: materialTitle || undefined, rawText: materialText, lessonId: lesson.id }).then(() => location.reload())}>Attach material</button>
        </div>
      </div>

      <div style={{ marginTop: 20 }}><button className="btn danger small" onClick={() => { if (confirm('Remove this lesson revision?')) api.deleteLesson(initial.id).then(() => navigate(`/parent/class/${lesson.classId}`)); }}>Remove lesson</button></div>
      <Toast msg={msg} />
    </>
  );
}
