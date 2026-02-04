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

## Deploy

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds and deploys the app to GitHub Pages on pushes to `main`.

Vite is configured with:

```ts
base: '/'
```

so it serves correctly from the custom domain root.
