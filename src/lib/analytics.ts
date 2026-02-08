import type { EraType, SignificanceType } from '../types';

const GTM_CONTAINER_ID = 'GTM-567JLFPT' as const;
const GTM_SCRIPT_ID = 'gtm-script';
const GTM_SCRIPT_SRC = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;

export type ViewMode = 'animated' | 'timeline';

interface AnalyticsEventPayloadMap {
  spa_page_view: {
    page_location: string;
    page_path: string;
    page_title: string;
  };
  view_mode_switch: {
    from_view: ViewMode;
    to_view: ViewMode;
  };
  timeline_era_navigate: {
    era_id: EraType;
  };
  timeline_event_expand: {
    event_id: string;
    event_title: string;
    event_era: EraType;
    event_year: number;
    event_significance: SignificanceType;
  };
  animated_experience_start: {
    start_event_id: string;
    start_event_title: string;
  };
}

export type AnalyticsEventName = keyof AnalyticsEventPayloadMap;

let lastTrackedPagePath: string | null = null;

function getDataLayer() {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function initializeAnalytics() {
  if (document.getElementById(GTM_SCRIPT_ID)) {
    return;
  }

  getDataLayer().push({
    event: 'gtm.js',
    'gtm.start': Date.now(),
  });

  const script = document.createElement('script');
  script.id = GTM_SCRIPT_ID;
  script.async = true;
  script.src = GTM_SCRIPT_SRC;
  document.head.appendChild(script);
}

export function trackAnalyticsEvent<K extends AnalyticsEventName>(
  eventName: K,
  payload: AnalyticsEventPayloadMap[K]
) {
  getDataLayer().push({
    event: eventName,
    ...payload,
  });
}

export function trackSpaPageView(pagePath: string) {
  if (lastTrackedPagePath === pagePath) {
    return;
  }

  lastTrackedPagePath = pagePath;
  trackAnalyticsEvent('spa_page_view', {
    page_location: window.location.href,
    page_path: pagePath,
    page_title: document.title,
  });
}
