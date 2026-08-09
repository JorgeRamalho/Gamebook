/**
 * Garante que a SITE_URL canônica está alinhada entre
 * index.html, robots.txt, sitemap.xml e js/script.js.
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const SITE_URL = 'https://jorgeramalho.github.io/Projeto-gamebook/';

const checks = [
  {
    file: 'index.html',
    mustInclude: [
      `href="${SITE_URL}"`,
      `content="${SITE_URL}"`,
      `${SITE_URL}assets/social/og-image.png`,
    ],
  },
  {
    file: 'robots.txt',
    mustInclude: [`Sitemap: ${SITE_URL}sitemap.xml`],
  },
  {
    file: 'sitemap.xml',
    mustInclude: [`<loc>${SITE_URL}</loc>`],
  },
  {
    file: 'js/script.js',
    mustInclude: [`siteUrl: '${SITE_URL}'`],
  },
];

let failed = false;

for (const check of checks) {
  const path = resolve(root, check.file);
  const text = readFileSync(path, 'utf8');
  for (const needle of check.mustInclude) {
    if (!text.includes(needle)) {
      console.error(`[check:site-url] FALHOU em ${check.file}: esperado trecho`);
      console.error(`  ${needle}`);
      failed = true;
    }
  }
}

if (failed) {
  console.error(`\nAtualize a URL canônica para: ${SITE_URL}`);
  console.error('Veja docs/06-seo.md');
  process.exit(1);
}

console.log(`[check:site-url] OK — ${SITE_URL}`);
