import { useRoute, match } from './lib/router.ts';
import { Home } from './screens/Home.tsx';
import { ConnectBrain } from './screens/ConnectBrain.tsx';
import { ParentGate } from './screens/ParentGate.tsx';
import { ParentDashboard } from './screens/ParentDashboard.tsx';
import { ParentPrompts } from './screens/ParentPrompts.tsx';
import { KidDetail } from './screens/KidDetail.tsx';
import { ScheduleEditor } from './screens/ScheduleEditor.tsx';
import { ClassLibrary } from './screens/ClassLibrary.tsx';
import { ClassDetail } from './screens/ClassDetail.tsx';
import { LessonEditor } from './screens/LessonEditor.tsx';
import { LearnHome } from './screens/LearnHome.tsx';
import { Classroom } from './screens/Classroom.tsx';
import { ElementGallery } from './screens/ElementGallery.tsx';

export function App() {
  const path = useRoute();

  // Dev-only: not linked from any user-facing nav.
  if (path === '/dev/elements') return <ElementGallery />;

  if (path === '/connect') return <ParentGate><ConnectBrain /></ParentGate>;
  if (path === '/parent') return <ParentGate><ParentDashboard /></ParentGate>;
  if (path === '/parent/prompts') return <ParentGate><ParentPrompts /></ParentGate>;
  if (path === '/parent/classes') return <ParentGate><ClassLibrary /></ParentGate>;

  let m;
  if ((m = match('/parent/kid/:id/schedule', path))) return <ParentGate><ScheduleEditor kidId={m.id!} /></ParentGate>;
  if ((m = match('/parent/kid/:id', path))) return <ParentGate><KidDetail kidId={m.id!} /></ParentGate>;
  if ((m = match('/parent/class/:id', path))) return <ParentGate><ClassDetail classId={m.id!} /></ParentGate>;
  if ((m = match('/parent/lesson/:id', path))) return <ParentGate><LessonEditor lessonId={m.id!} /></ParentGate>;
  if ((m = match('/learn/:kidId', path))) return <LearnHome kidId={m.kidId!} />;
  if ((m = match('/learn/:kidId/lesson/:lessonId', path))) return <Classroom lessonId={m.lessonId!} kidId={m.kidId!} />;
  if ((m = match('/learn/:kidId/c/:catalogId', path))) return <Classroom catalogId={m.catalogId!} kidId={m.kidId!} />;

  return <Home />;
}
