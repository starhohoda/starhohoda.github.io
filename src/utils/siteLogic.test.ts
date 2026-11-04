import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterArticlesByKeyword,
  getArticlesByCategory,
  getCategoryByPage,
  getFeaturedArticles,
  isTopNavActive,
  parseRouteTarget,
  validateSiteSpecification
} from './siteLogic';
import { ARTICLES, BRAND_CONFIG, CATEGORIES, FAQS, PAGE_SEO_MAP } from '../data/articles';

test('real-time keyword search filters by title, content keyPoints, exampleText, and tags', () => {
  // 空字串回傳全部 9 個單元
  assert.equal(filterArticlesByKeyword('').length, 9);
  assert.equal(filterArticlesByKeyword('   ').length, 9);

  // 搜尋標題關鍵字「Excel」
  const excelResults = filterArticlesByKeyword('Excel');
  assert.equal(excelResults.length, 1);
  assert.equal(excelResults[0].id, 'C01');

  // 搜尋內文關鍵字「樞紐分析表」（僅出現在 C01 的 keyPoints 內文中）
  const pivotResults = filterArticlesByKeyword('樞紐分析表');
  assert.equal(pivotResults.length, 1);
  assert.equal(pivotResults[0].id, 'C01');

  // 搜尋內文關鍵字「NotebookLM」
  const notebookResults = filterArticlesByKeyword('NotebookLM');
  assert.equal(notebookResults.length, 1);
  assert.equal(notebookResults[0].id, 'B03');

  // 搜尋不存在的關鍵字
  assert.equal(filterArticlesByKeyword('不存在的關鍵字XYZ').length, 0);
});

test('V0.3 specification integrity check passes completely', () => {
  const result = validateSiteSpecification();
  assert.equal(result.valid, true, `Validation errors: ${result.errors.join('; ')}`);
  assert.equal(BRAND_CONFIG.brandName, '星河數位文創');
  assert.equal(BRAND_CONFIG.authorName, '銀河霜月');
});

test('8 formal pages and SEO metadata are defined', () => {
  const pages = Object.keys(PAGE_SEO_MAP);
  assert.equal(pages.length, 8);
  assert.ok(PAGE_SEO_MAP['index.html'].title.includes('星河數位文創'));
  assert.equal(PAGE_SEO_MAP['brand.html'].h1, '品牌故事');
  assert.equal(PAGE_SEO_MAP['author.html'].h1, '作者介紹');
  assert.equal(PAGE_SEO_MAP['articles.html'].h1, '文章選單');
  assert.equal(PAGE_SEO_MAP['articles-ai.html'].h1, 'AI實戰應用');
  assert.equal(PAGE_SEO_MAP['articles-tools.html'].h1, '數位工具實測');
  assert.equal(PAGE_SEO_MAP['articles-work.html'].h1, '效率工作教學');
  assert.equal(PAGE_SEO_MAP['about.html'].h1, '關於本站');
});

test('route parser resolves relative HTML filenames and unit anchors accurately', () => {
  assert.deepEqual(parseRouteTarget('/'), { page: 'index.html', anchor: null });
  assert.deepEqual(parseRouteTarget('brand.html'), { page: 'brand.html', anchor: null });
  assert.deepEqual(parseRouteTarget('/articles-ai.html#A01'), {
    page: 'articles-ai.html',
    anchor: 'A01'
  });
  assert.deepEqual(parseRouteTarget('articles-tools.html#B02'), {
    page: 'articles-tools.html',
    anchor: 'B02'
  });
  assert.deepEqual(parseRouteTarget('articles-work.html#C03'), {
    page: 'articles-work.html',
    anchor: 'C03'
  });
});

test('top navigation active state highlights articles menu for overview and all 3 subcategories', () => {
  assert.equal(isTopNavActive('articles.html', 'articles.html'), true);
  assert.equal(isTopNavActive('articles.html', 'articles-ai.html'), true);
  assert.equal(isTopNavActive('articles.html', 'articles-tools.html'), true);
  assert.equal(isTopNavActive('articles.html', 'articles-work.html'), true);
  assert.equal(isTopNavActive('articles.html', 'brand.html'), false);
  assert.equal(isTopNavActive('brand.html', 'brand.html'), true);
});

test('all 9 teaching units have required fields, no Lorem ipsum, and valid anchors', () => {
  assert.equal(ARTICLES.length, 9);
  for (const unit of ARTICLES) {
    assert.ok(unit.id.length === 3);
    assert.ok(unit.title.length > 0);
    assert.ok(unit.keyPoints.length >= 3 && unit.keyPoints.length <= 5);
    assert.ok(!unit.intro.toLowerCase().includes('lorem ipsum'));
    assert.ok(unit.url.endsWith(`#${unit.anchor}`));
  }

  assert.equal(getArticlesByCategory('ai').length, 3);
  assert.equal(getArticlesByCategory('tools').length, 3);
  assert.equal(getArticlesByCategory('work').length, 3);
  assert.equal(getFeaturedArticles().length, 3);
  assert.equal(getCategoryByPage('articles-tools.html')?.name, '數位工具實測');
  assert.equal(FAQS.length, 3);
});
