import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const DIST_INDEX_PATH = resolve('dist/index.html');

const routeConfigs = [
  {
    name: 'timeline',
    outputPath: resolve('dist/timeline/index.html'),
    metadata: {
      title: 'Timeline of Rome: major events from 753 BC to 476 AD',
      description:
        'Study a clear timeline of Rome with major events from 753 BC to 476 AD, spanning the Roman Kingdom, Roman Republic, and Roman Empire.',
      canonical: 'https://timelineofrome.com/timeline/',
      robots: 'index, follow',
    },
  },
  {
    name: 'animated',
    outputPath: resolve('dist/animated/index.html'),
    metadata: {
      title: 'Timeline of Rome (753 BC to 476 AD) | Kingdom, Republic, Empire',
      description:
        'Explore a student-friendly timeline of Rome from 753 BC to 476 AD, covering major events across the Roman Kingdom, Roman Republic, and Roman Empire.',
      canonical: 'https://timelineofrome.com/',
      robots: 'noindex, follow',
    },
  },
];

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`Could not find ${label} in dist/index.html`);
  }

  return html.replace(pattern, replacement);
}

function renderRouteHtml(rootHtml, metadata) {
  let routeHtml = rootHtml;
  routeHtml = replaceRequired(
    routeHtml,
    /<title>[\s\S]*?<\/title>/,
    `<title>${metadata.title}</title>`,
    '<title>'
  );
  routeHtml = replaceRequired(
    routeHtml,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${metadata.description}" />`,
    'meta[name="description"]'
  );
  routeHtml = replaceRequired(
    routeHtml,
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
    `<meta name="robots" content="${metadata.robots}" />`,
    'meta[name="robots"]'
  );
  routeHtml = replaceRequired(
    routeHtml,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${metadata.canonical}" />`,
    'link[rel="canonical"]'
  );
  routeHtml = replaceRequired(
    routeHtml,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${metadata.canonical}" />`,
    'meta[property="og:url"]'
  );
  routeHtml = replaceRequired(
    routeHtml,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${metadata.title}" />`,
    'meta[property="og:title"]'
  );
  routeHtml = replaceRequired(
    routeHtml,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${metadata.description}" />`,
    'meta[property="og:description"]'
  );
  routeHtml = replaceRequired(
    routeHtml,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${metadata.title}" />`,
    'meta[name="twitter:title"]'
  );
  routeHtml = replaceRequired(
    routeHtml,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${metadata.description}" />`,
    'meta[name="twitter:description"]'
  );

  return routeHtml;
}

async function generateRouteHtml() {
  const rootHtml = await readFile(DIST_INDEX_PATH, 'utf8');

  for (const routeConfig of routeConfigs) {
    const routeHtml = renderRouteHtml(rootHtml, routeConfig.metadata);
    await mkdir(dirname(routeConfig.outputPath), { recursive: true });
    await writeFile(routeConfig.outputPath, routeHtml, 'utf8');
  }
}

generateRouteHtml().catch((error) => {
  console.error('[generate-route-html] Failed to generate route-specific HTML');
  console.error(error);
  process.exitCode = 1;
});
