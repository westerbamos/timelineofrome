import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import TimelinePage from './pages/TimelinePage/TimelinePage';

const AnimatedTimelinePage = lazy(() => import('./pages/AnimatedTimeline/AnimatedTimelinePage'));

function RootRedirect() {
  const location = useLocation();

  return (
    <Navigate
      to={{
        pathname: '/animated',
        search: location.search,
        hash: location.hash,
      }}
      replace
    />
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<RootRedirect />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route
          path="animated"
          element={
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
              <AnimatedTimelinePage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
