import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PAGE_SEO_MAP, PageId } from '../src/data/articles';
import { SiteHeader } from '../src/components/SiteHeader';
import { SiteFooter } from '../src/components/SiteFooter';
import { renderPageContent } from '../src/App';

const PAGES: PageId[] = [
  'index.html',
  'brand.html',
  'author.html',
  'articles.html',
  'articles-ai.html',
  'articles-tools.html',
  'articles-work.html',
  'about.html'
];

const noopNavigate = () => {};

function buildFullHtmlDocument(page: PageId, includeViteEntry: boolean): string {
  const seo = PAGE_SEO_MAP[page];
  const bodyMarkup = renderToStaticMarkup(
    <div className="site-wrapper" data-current-page={page}>
      <SiteHeader currentPage={page} onNavigate={noopNavigate} />
      {renderPageContent(page, noopNavigate)}
      <SiteFooter onNavigate={noopNavigate} />
    </div>
  );

  const viteScript = includeViteEntry
    ? `\n    <script type="module" src="/src/main.tsx"></script>`
    : '';

  return `<!doctype html>
<html lang="zh-Hant-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${seo.title}</title>
    <meta name="description" content="${seo.description}" />
    <meta property="og:title" content="${seo.title}" />
    <meta property="og:description" content="${seo.description}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/svg+xml" href="assets/icons/logo.svg" />
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <div id="root">${bodyMarkup}</div>
    <script src="js/articles-data.js"></script>
    <script src="js/main.js"></script>${viteScript}
  </body>
</html>
`;
}

function main() {
  const rootDir = process.cwd();

  for (const page of PAGES) {
    if (page === 'index.html') {
      // 根目錄 index.html 同時保留完整靜態 HTML 內容與 Vite 入口，兼顧 AI Studio 預覽與 GitHub Pages 靜態檢視
      const hybridRootHtml = buildFullHtmlDocument(page, true);
      fs.writeFileSync(path.join(rootDir, page), hybridRootHtml, 'utf8');
    } else {
      const pureStaticHtml = buildFullHtmlDocument(page, false);
      fs.writeFileSync(path.join(rootDir, page), pureStaticHtml, 'utf8');
    }
  }

  // 建立 .nojekyll 確保 GitHub Pages 直接從根目錄發布時不會忽略任何資源
  fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf8');

  console.log('Successfully generated all 8 static HTML pages in root directory.');
}

main();
