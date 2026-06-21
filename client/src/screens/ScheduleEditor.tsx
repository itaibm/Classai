import { useEffect, useState } from 'react';
import type { ClassDefinition, ScheduleEntry, Weekday, WeeklySchedule } from '@shared/types';
import { WEEKDAYS } from '@shared/types';
import { api, type ClassCard } from '../lib/api.ts';
import { navigate } from '../lib/router.ts';
import { TopBar, Loading, ErrorNote, useAsync, useToast, Toast } from '../lib/ui.tsx';
import { subjectStyle } from '../lib/subject.ts';

const DAY_LABEL: Record<Weekday, string> = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
};

const uid = () => (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 10));

type DayMap = Record<Weekday, ScheduleEntry[]>;
const emptyDays = (): DayMap => ({ mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] });

export function ScheduleEditor({ kidId }: { kidId: string }) {
  const { data, loading, error, reload } = useAsync(async () => {
    const [{ kid }, { classes }, { schedule }] = await Promise.all([
      api.kid(kidId), api.kidClasses(kidId), api.schedule(kidId),
    ]);
    return { kid, classes, schedule };
  }, [kidId]);
  const { msg, show } = useToast();

  const [days, setDays] = useState<DayMap>(emptyDays());
  const [adding, setAdding] = useState<Weekday | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (data?.schedule) setDays({ ...emptyDays(), ...data.schedule.days });
  }, [data?.schedule]);

  const classById = (id: string): ClassDefinition | undefined => data?.classes.find((card) => card.classDefinition.id === id)?.classDefinition;

  function mutate(day: Weekday, fn: (list: ScheduleEntry[]) => ScheduleEntry[]) {
    setDays((d) => ({ ...d, [day]: fn(d[day]).map((e, i) => ({ ...e, order: i })) }));
    setDirty(true);
  }
  const addClass = (day: Weekday, classId: string) =>
    mutate(day, (list) => [...list, { id: uid(), classId, order: list.length }]);
  const removeEntry = (day: Weekday, id: string) => mutate(day, (l) => l.filter((e) => e.id !== id));
  const setTime = (day: Weekday, id: string, time: string) =>
    mutate(day, (l) => l.map((e) => (e.id === id ? { ...e, time: time || undefined } : e)));
  function move(day: Weekday, id: string, dir: -1 | 1) {
    mutate(day, (l) => {
      const i = l.findIndex((e) => e.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= l.length) return l;
      const copy = [...l]; const [it] = copy.splice(i, 1); copy.splice(j, 0, it!); return copy;
    });
  }

  async function save() {
    if (!data) return;
    setSaving(true);
    try {
      const schedule: WeeklySchedule = { kidId, days, updatedAt: new Date().toISOString() };
      const { schedule: saved } = await api.saveSchedule(kidId, schedule);
      setDays({ ...emptyDays(), ...saved.days });
      setDirty(false);
      show('Schedule saved');
    } catch (e: any) {
      show(e.message || 'Could not save');
    } finally {
      setSaving(false);
    }
  }

  const hue = data?.kid.avatar.hue ?? 232;

  return (
    <div className="app" style={{ ['--accent-h' as any]: hue }}>
      <TopBar accentHue={hue} />
      <div className="container wide">
        {loading && <Loading />}
        {error && <ErrorNote error={error} onRetry={reload} />}
        {data && (
          <>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <button className="btn ghost small" onClick={() => navigate(`/parent/kid/${kidId}`)}>← {data.kid.name}</button>
                <h1 style={{ margin: '10px 0 2px' }}>Weekly schedule</h1>
                <span className="muted">Build a simple week — add classes to the days you want. {data.kid.name} sees “Today’s plan” first.</span>
              </div>
              <button className="btn lg" onClick={save} disabled={saving || !dirty}>{saving ? 'Saving…' : dirty ? 'Save schedule' : 'Saved'}</button>
            </div>

            {data.classes.length === 0 && (
              <div className="card" style={{ marginTop: 18 }}>
                <p className="muted">No classes yet. Add a class on {data.kid.name}’s page first, then schedule it here.</p>
              </div>
            )}

            <div className="week-grid">
              {WEEKDAYS.map((day) => (
                <div key={day} className="week-day">
                  <div className="week-day-name">{DAY_LABEL[day]}</div>
                  <div className="week-entries">
                    {days[day].length === 0 && <div className="week-empty muted small">No classes</div>}
                    {days[day].map((e, i) => {
                      const classDefinition = classById(e.classId);
                      return (
                        <div key={e.id} className="sched-entry" style={subjectStyle(classDefinition?.subjectKey)}>
                          <div className="sched-entry-top">
                            <span className="sched-dot" />
                            <span className="sched-title">{classDefinition?.title ?? 'class'}</span>
                            <button className="sched-x" title="Remove" onClick={() => removeEntry(day, e.id)}>✕</button>
                          </div>
                          <div className="sched-entry-controls">
                            <input type="time" value={e.time ?? ''} onChange={(ev) => setTime(day, e.id, ev.target.value)} />
                            <span className="grow" />
                            <button className="ord-btn" disabled={i === 0} onClick={() => move(day, e.id, -1)}>↑</button>
                            <button className="ord-btn" disabled={i === days[day].length - 1} onClick={() => move(day, e.id, 1)}>↓</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {data.classes.length > 0 && (
                    adding === day ? (
                      <select
                        className="add-pick"
                        autoFocus
                        defaultValue=""
                        onChange={(ev) => { if (ev.target.value) addClass(day, ev.target.value); setAdding(null); }}
                        onBlur={() => setAdding(null)}
                      >
                        <option value="" disabled>Pick a class…</option>
                        {data.classes.map((card: ClassCard) => (
                          <option key={card.classDefinition.id} value={card.classDefinition.id}>{card.classDefinition.yearName} · {card.classDefinition.title}</option>
                        ))}
                      </select>
                    ) : (
                      <button className="add-class-btn" onClick={() => setAdding(day)}>＋ Add class</button>
                    )
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Toast msg={msg} />
    </div>
  );
}
