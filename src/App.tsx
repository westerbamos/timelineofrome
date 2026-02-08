import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import TimelinePage from './pages/TimelinePage/TimelinePage';

const AnimatedTimelinePage = lazy(() => import('./pages/AnimatedTimeline/AnimatedTimelinePage'));

function App() {
  const animatedRouteElement = (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <AnimatedTimelinePage />
    </Suspense>
  );

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={animatedRouteElement} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="animated" element={animatedRouteElement} />
      </Route>
    </Routes>
  );
}

export default App;
