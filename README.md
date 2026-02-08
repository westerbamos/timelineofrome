# Timeline of Rome

A React + TypeScript single-page timeline that presents 1,229 years of Roman history in a visual, scroll-driven experience.

## Tech stack

- React 18
- TypeScript
- Vite
- Framer Motion

## Local development

Requirements:

- Node.js 20+
- npm

Install and run:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Analytics (GA4 + GTM)

This app uses Google Tag Manager only (no direct `gtag.js` snippet) and keeps Cloudflare Web Analytics enabled.
The official GTM `<head>` + `<noscript>` snippets live in `index.html`.

- GTM container ID: `GTM-567JLFPT`
- GA4 measurement ID: `G-DDY0T69X7H`

Data layer events emitted by the app:

- `spa_page_view` with `page_location`, `page_path`, `page_title`
- `view_mode_switch` with `from_view`, `to_view`
- `timeline_era_navigate` with `era_id`
- `timeline_event_expand` with `event_id`, `event_title`, `event_era`, `event_year`, `event_significance`
- `animated_experience_start` with `start_event_id`, `start_event_title`

### GTM configuration

1. Create `GA4 - Config` tag:
   - Type: `Google Analytics: GA4 Configuration`
   - Measurement ID: `G-DDY0T69X7H`
   - Send a page view event when this configuration loads: `OFF`
   - Trigger: `All Pages`
2. Create custom event triggers for:
   - `spa_page_view`
   - `view_mode_switch`
   - `timeline_era_navigate`
   - `timeline_event_expand`
   - `animated_experience_start`
3. Create data layer variables:
   - `page_location`, `page_path`, `page_title`
   - `from_view`, `to_view`
   - `era_id`
   - `event_id`, `event_title`, `event_era`, `event_year`, `event_significance`
   - `start_event_id`, `start_event_title`
4. Create GA4 event tags:
   - `GA4 - page_view (SPA)` -> event name `page_view`, trigger `spa_page_view`
   - `GA4 - view_mode_switch` -> event name `view_mode_switch`, trigger `view_mode_switch`
   - `GA4 - timeline_era_navigate` -> event name `timeline_era_navigate`, trigger `timeline_era_navigate`
   - `GA4 - timeline_event_expand` -> event name `timeline_event_expand`, trigger `timeline_event_expand`
   - `GA4 - animated_experience_start` -> event name `animated_experience_start`, trigger `animated_experience_start`
5. Publish GTM as version `analytics-standard-initial`.

### GA4 configuration

1. Confirm all 5 events are arriving in Realtime / Events.
2. Mark `timeline_event_expand` as a key event.
3. Create event-scoped custom dimensions for:
   - `from_view`, `to_view`, `era_id`
   - `event_id`, `event_title`, `event_era`, `event_year`, `event_significance`
   - `start_event_id`, `start_event_title`
4. Keep Enhanced Measurement enabled.

## Routes

- `/` is the animated timeline view (default experience).
- `/animated` is a compatibility alias for the animated view.
- `/timeline` is the detailed scroll-based timeline view.

## Deploy

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds and deploys the app to GitHub Pages on pushes to `main`.

Vite is configured with:

```ts
base: '/'
```

so it serves correctly from the custom domain root.

## Social / LinkedIn

- LinkedIn project thumbnail (landscape): `public/linkedin/linkedin-project-1200x627.png`
- LinkedIn project thumbnail (square): `public/linkedin/linkedin-project-1080x1080.png`
- Open Graph SVG source: `public/og-timeline-of-rome.svg`

## Reddit Promotion Kit

- Campaign docs: `docs/reddit/README.md`
- Subreddit matrix: `docs/reddit/subreddit-targeting.md`
- Post drafts: `docs/reddit/posts/`
- Tracking + logs: `docs/reddit/tracking/`
- Response playbooks: `docs/reddit/responses/`

Helper scripts:

- `npm run reddit:utm` regenerates `docs/reddit/tracking/utm-links.csv`
- `npm run reddit:utm:verify` validates UTM contract values for all generated links
- `npm run reddit:first-post-link` prints the exact tracked URL for the first `ancienthistory` post
- `npm run reddit:launch:prepare` runs UTM generation + verification + first-post link output
- `npm run reddit:capture` captures fixed-viewport (`1200x627`) static and source clip assets from `/timeline`
- `npm run reddit:gif` creates `docs/reddit/assets/reddit-scroll-12s.gif` from the webm source clip
- `npm run reddit:verify` validates media widths and required files
- `npm run reddit:assets` runs capture -> gif -> verify in sequence
