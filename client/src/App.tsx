import { useRoute, match } from './lib/router.ts';
import { Home } from './screens/Home.tsx';
import { ConnectBrain } from './screens/ConnectBrain.tsx';
import { ParentGate } from './screens/ParentGate.tsx';
import { ParentDashboard } from './screens/ParentDashboard.tsx';
import { ParentPrompts } from './screens/ParentPrompts.tsx';
import { KidDetail } from './screens/KidDetail.tsx';
import { ScheduleEditor } from './screens/ScheduleEditor.tsx';
import { CourseDetail } from './screens/CourseDetail.tsx';
import { LearnHome } from './screens/LearnHome.tsx';
import { Classroom } from './screens/Classroom.tsx';

export function App() {
  const path = useRoute();

  if (path === '/connect') return <ParentGate><ConnectBrain /></ParentGate>;
  if (path === '/parent') return <ParentGate><ParentDashboard /></ParentGate>;
  if (path === '/parent/prompts') return <ParentGate><ParentPrompts /></ParentGate>;

  let m;
  if ((m = match('/parent/kid/:id/schedule', path))) return <ParentGate><ScheduleEditor kidId={m.id!} /></ParentGate>;
  if ((m = match('/parent/kid/:id', path))) return <ParentGate><KidDetail kidId={m.id!} /></ParentGate>;
  if ((m = match('/parent/course/:id', path))) return <ParentGate><CourseDetail courseId={m.id!} /></ParentGate>;
  if ((m = match('/learn/:kidId', path))) return <LearnHome kidId={m.kidId!} />;
  if ((m = match('/class/:lessonId', path))) return <Classroom lessonId={m.lessonId!} />;

  return <Home />;
}
