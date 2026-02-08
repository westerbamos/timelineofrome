import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App';
import { initializeAnalytics, trackSpaPageView } from './lib/analytics';
import './index.css';

function AnalyticsPageViewTracker() {
  const location = useLocation();

  React.useEffect(() => {
    initializeAnalytics();
  }, []);

  React.useEffect(() => {
    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    trackSpaPageView(pagePath);
  }, [location.hash, location.pathname, location.search]);

  return null;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AnalyticsPageViewTracker />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
