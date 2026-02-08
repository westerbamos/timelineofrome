import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const DIST_INDEX_PATH = resolve('dist/index.html');
const TIMELINE_INDEX_PATH = resolve('dist/timeline/index.html');

const timelineMetadata = {
  title: 'Timeline of Rome: major events from 753 BC to 476 AD',
  description:
    'Study a clear timeline of Rome with major events from 753 BC to 476 AD, spanning the Roman Kingdom, Roman Republic, and Roman Empire.',
  canonical: 'https://timelineofrome.com/timeline',
};

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`Could not find ${label} in dist/index.html`);
  }

  return html.replace(pattern, replacement);
}

async function generateTimelineHtml() {
  const rootHtml = await readFile(DIST_INDEX_PATH, 'utf8');

  let timelineHtml = rootHtml;
  timelineHtml = replaceRequired(
    timelineHtml,
    /<title>[\s\S]*?<\/title>/,
    `<title>${timelineMetadata.title}</title>`,
    '<title>'
  );
  timelineHtml = replaceRequired(
    timelineHtml,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${timelineMetadata.description}" />`,
    'meta[name="description"]'
  );
  timelineHtml = replaceRequired(
    timelineHtml,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${timelineMetadata.canonical}" />`,
    'link[rel="canonical"]'
  );
  timelineHtml = replaceRequired(
    timelineHtml,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${timelineMetadata.canonical}" />`,
    'meta[property="og:url"]'
  );
  timelineHtml = replaceRequired(
    timelineHtml,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${timelineMetadata.title}" />`,
    'meta[property="og:title"]'
  );
  timelineHtml = replaceRequired(
    timelineHtml,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${timelineMetadata.description}" />`,
    'meta[property="og:description"]'
  );
  timelineHtml = replaceRequired(
    timelineHtml,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${timelineMetadata.title}" />`,
    'meta[name="twitter:title"]'
  );
  timelineHtml = replaceRequired(
    timelineHtml,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${timelineMetadata.description}" />`,
    'meta[name="twitter:description"]'
  );

  await mkdir(dirname(TIMELINE_INDEX_PATH), { recursive: true });
  await writeFile(TIMELINE_INDEX_PATH, timelineHtml, 'utf8');
}

generateTimelineHtml().catch((error) => {
  console.error('[generate-route-html] Failed to generate dist/timeline/index.html');
  console.error(error);
  process.exitCode = 1;
});
