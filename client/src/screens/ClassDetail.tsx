import { useState } from 'react';
import type { AISuggestion, LessonKind } from '@shared/types';
import { api } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { ErrorNote, Loading, Toast, TopBar, useAsync, useToast } from '../lib/ui.tsx';
import { subjectColor, subjectStyle } from '../lib/subject.ts';

type Tab = 'overview' | 'knowledge' | 'lessons' | 'suggestions' | 'learners';

export function ClassDetail({ classId }: { classId: string }) {
  const { data, loading, error, reload } = useAsync(() => api.classDetail(classId), [classId]);
  const { msg, show } = useToast();
  const [tab, setTab] = useState<Tab>('overview');
  const [materialTitle, setMaterialTitle] = useState('');
  const [materialText, setMaterialText] = useState('');
  const [busy, setBusy] = useState(false);

  async function work(action: () => Promise<unknown>, success: string) {
    setBusy(true);
    try { await action(); show(success); reload(); }
    catch (cause: any) { show(cause.message || 'Could not complete that'); }
    finally { setBusy(false); }
  }

  async function createLesson(topicId: string, kind: LessonKind = 'lesson') {
    setBusy(true);
    try {
      const { lesson } = await api.generateLesson(classId, topicId, kind);
      navigate(`/parent/lesson/${lesson.id}`);
    } catch (cause: any) {
      show(cause.message || 'Could not create lesson draft');
    } finally { setBusy(false); }
  }

  async function addMaterial() {
    if (!materialText.trim()) return show('Paste or describe the material');
    await work(
      () => api.addMaterial(classId, { title: materialTitle.trim() || undefined, rawText: materialText.trim() }),
      'Knowledge added'
    );
    setMaterialTitle('');
    setMaterialText('');
  }

  return (
    <div className="app subject-themed" style={subjectStyle(data?.classDefinition.subjectKey)}>
      <TopBar />
      <div className="container wide">
        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}
        {data && (
          <>
            <button className="btn ghost small" onClick={() => navigate('/parent/classes')}>← Class library</button>
            <h1 className="row" style={{ gap: 10, alignItems: 'center', marginBottom: 4 }}>
              <span className="today-dot" style={{ background: subjectColor(data.classDefinition.subjectKey).accent }} />
              {data.classDefinition.title}
            </h1>
            <p className="muted">{data.classDefinition.yearName} · {data.classDefinition.subject}</p>

            <div className="row" style={{ gap: 6, flexWrap: 'wrap', margin: '18px 0' }}>
              {(['overview', 'knowledge', 'lessons', 'suggestions', 'learners'] as Tab[]).map((item) => (
                <button key={item} className={`btn small ${tab === item ? '' : 'ghost'}`} onClick={() => setTab(item)}>
                  {item === 'suggestions' ? `AI suggestions (${data.suggestions.filter((suggestion) => suggestion.status === 'draft').length})` : item[0]!.toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>

            {tab === 'overview' && (
              <div className="grid cols-2">
                <div className="card">
                  <h3>Class structure</h3>
                  <p>{data.classDefinition.description || 'No description yet.'}</p>
                  <div className="kv"><span>Topics</span><strong>{data.topics.length}</strong></div>
                  <div className="kv"><span>Lesson revisions</span><strong>{data.lessons.length}</strong></div>
                  <div className="kv"><span>Enrolled learners</span><strong>{data.enrolledKids.length}</strong></div>
                </div>
                <div className="card">
                  <h3>Build the syllabus</h3>
                  <p className="muted small">Classai uses class-wide knowledge to create ordered topics. Repository curriculum is not imported in this phase.</p>
                  <button className="btn" disabled={busy} onClick={() => work(() => api.regenerateSyllabus(classId), 'Syllabus rebuilt')}>
                    {busy ? 'Working…' : data.topics.length ? 'Regenerate syllabus' : 'Generate syllabus'}
                  </button>
                  <div style={{ marginTop: 20 }}>
                    <button className="btn danger small" onClick={() => {
                      if (confirm(`Delete ${data.classDefinition.title} and its shared lessons?`)) {
                        api.deleteClass(classId).then(() => navigate('/parent/classes')).catch((cause) => show(cause.message));
                      }
                    }}>Delete class</button>
                  </div>
                </div>
              </div>
            )}

            {tab === 'knowledge' && (
              <>
                <div className="card">
                  <h3>Class knowledge</h3>
                  {data.materials.filter((material) => !material.lessonId).length === 0 && <p className="muted">No class-wide materials yet.</p>}
                  {data.materials.filter((material) => !material.lessonId).map((material) => (
                    <details key={material.id} style={{ marginBottom: 10 }}>
                      <summary><strong>{material.title}</strong> <span className="pill neutral">{material.source}</span></summary>
                      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{material.rawText}</pre>
                      <button className="btn danger small" onClick={() => work(() => api.deleteMaterial(material.id), 'Material removed')}>Remove</button>
                    </details>
                  ))}
                </div>
                <div className="card" style={{ marginTop: 14 }}>
                  <h3>Add knowledge</h3>
                  <label className="field">Title<input value={materialTitle} onChange={(event) => setMaterialTitle(event.target.value)} placeholder="Textbook chapter or parent notes" /></label>
                  <label className="field">Material<textarea value={materialText} onChange={(event) => setMaterialText(event.target.value)} placeholder="Paste curriculum, concepts, examples, boundaries, or practice material…" /></label>
                  <button className="btn" disabled={busy || !materialText.trim()} onClick={addMaterial}>Add to class</button>
                </div>
              </>
            )}

            {tab === 'lessons' && (
              <div className="card">
                <h3>Topics and lesson blueprints</h3>
                {data.topics.length === 0 && <p className="muted">Generate a syllabus first.</p>}
                <ul className="list-reset">
                  {data.topics.map((topic, index) => {
                    const lessons = data.lessons.filter((lesson) => lesson.topicId === topic.id);
                    return (
                      <li key={topic.id} className="kv" style={{ alignItems: 'flex-start' }}>
                        <div className="grow">
                          <strong>{index + 1}. {topic.title}</strong>
                          <div className="muted small">{topic.summary}</div>
                          {lessons.map((lesson) => (
                            <button key={lesson.id} className="btn ghost small" style={{ margin: '8px 6px 0 0' }} onClick={() => navigate(`/parent/lesson/${lesson.id}`)}>
                              Revision {lesson.revision} · {lesson.status}
                            </button>
                          ))}
                        </div>
                        <button className="btn soft small" disabled={busy} onClick={() => createLesson(topic.id)}>+ Draft lesson</button>
                      </li>
                    );
                  })}
                </ul>

                <h3 style={{ marginTop: 20 }}>Curriculum lessons in this class</h3>
                {data.curriculumAttachments.length === 0 && (
                  <p className="muted small">None yet. Browse and assign lessons from the <button className="btn ghost small" onClick={() => navigate('/parent/classes')}>Curriculum</button>.</p>
                )}
                <ul className="list-reset">
                  {data.curriculumAttachments.map((attachment) => (
                    <li key={attachment.id} className="row" style={{ justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
                      <span>📘 {attachment.title} <span className="muted small"><code>{attachment.curriculumId}</code></span></span>
                      <button
                        className="btn ghost small"
                        onClick={async () => { await api.detachCurriculum(attachment.id); show('Removed from class'); reload(); }}
                      >Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === 'suggestions' && (
              <div className="card">
                <h3>Activities suggested by live teaching</h3>
                {data.suggestions.filter((suggestion) => suggestion.status === 'draft').length === 0 && <p className="muted">Successful live activities will appear here for review.</p>}
                {data.suggestions.filter((suggestion) => suggestion.status === 'draft').map((suggestion) => (
                  <SuggestionReview key={suggestion.id} suggestion={suggestion} onDone={reload} onToast={show} />
                ))}
                <h4 style={{ marginTop: 20 }}>Approved activity library</h4>
                {data.suggestions.filter((suggestion) => suggestion.status === 'approved').length === 0 && <p className="muted small">No reusable activities approved yet.</p>}
                {data.suggestions.filter((suggestion) => suggestion.status === 'approved').map((suggestion) => (
                  <div key={suggestion.id} className="kv"><span><strong>{suggestion.title}</strong><div className="muted small">{suggestion.objective} · {suggestion.block.type}</div></span><span className="pill good">Reusable</span></div>
                ))}
              </div>
            )}

            {tab === 'learners' && (
              <div className="card">
                <h3>Enroll learners</h3>
                {data.allKids.length === 0 && <p className="muted">Add a learner from the parent area first.</p>}
                {data.allKids.map((kid) => {
                  const enrolled = data.enrolledKids.some((item) => item.id === kid.id);
                  return (
                    <div key={kid.id} className="kv">
                      <span><strong>{kid.name}</strong><div className="muted small">{kid.gradeLevel || `age ${kid.age}`}</div></span>
                      <button className={`btn small ${enrolled ? 'ghost' : ''}`} disabled={busy} onClick={() => work(
                        () => enrolled ? api.unenroll(classId, kid.id) : api.enroll(classId, kid.id),
                        enrolled ? `${kid.name} removed` : `${kid.name} enrolled`
                      )}>{enrolled ? 'Remove' : 'Enroll'}</button>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
      <Toast msg={msg} />
    </div>
  );
}

function SuggestionReview({ suggestion, onDone, onToast }: {
  suggestion: AISuggestion;
  onDone: () => void;
  onToast: (message: string) => void;
}) {
  const [title, setTitle] = useState(suggestion.title);
  const [objective, setObjective] = useState(suggestion.objective);
  const [busy, setBusy] = useState(false);

  async function act(action: 'save' | 'approve' | 'discard') {
    setBusy(true);
    try {
      await api.updateSuggestion(suggestion.id, { title, objective });
      if (action === 'approve') await api.approveSuggestion(suggestion.id, suggestion.lessonId);
      if (action === 'discard') await api.discardSuggestion(suggestion.id);
      onToast(action === 'save' ? 'Suggestion saved' : action === 'approve' ? 'Activity approved for reuse' : 'Suggestion discarded');
      onDone();
    } catch (cause: any) {
      onToast(cause.message || 'Could not update suggestion');
    } finally { setBusy(false); }
  }

  return (
    <div className="inset" style={{ marginBottom: 10 }}>
      <label className="field">Activity title<input value={title} onChange={(event) => setTitle(event.target.value)} /></label>
      <label className="field">Learning objective<input value={objective} onChange={(event) => setObjective(event.target.value)} /></label>
      <div className="muted small" style={{ marginBottom: 8 }}>Activity type: {suggestion.block.type}</div>
      <span className="row" style={{ gap: 6 }}>
        <button className="btn ghost small" disabled={busy} onClick={() => act('save')}>Save</button>
        <button className="btn small" disabled={busy} onClick={() => act('approve')}>Approve for reuse</button>
        <button className="btn danger small" disabled={busy} onClick={() => act('discard')}>Discard</button>
      </span>
    </div>
  );
}
