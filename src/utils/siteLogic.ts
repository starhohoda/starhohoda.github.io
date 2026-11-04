import {
  ARTICLES,
  ArticleUnit,
  CATEGORIES,
  CategoryId,
  CategoryMeta,
  PAGE_SEO_MAP,
  PageId,
  TOP_NAV_ITEMS
} from '../data/articles';

const VALID_PAGES: Set<PageId> = new Set([
  'index.html',
  'brand.html',
  'author.html',
  'articles.html',
  'articles-ai.html',
  'articles-tools.html',
  'articles-work.html',
  'about.html'
]);

/**
 * 解析網址或路徑字串為對應的正式頁面 ID 與錨點
 */
export function parseRouteTarget(rawHrefOrPath: string): {
  page: PageId;
  anchor: string | null;
} {
  if (!rawHrefOrPath || rawHrefOrPath === '/' || rawHrefOrPath === '#') {
    return { page: 'index.html', anchor: null };
  }

  const cleaned = rawHrefOrPath.trim();
  const [pathPart, hashPart] = cleaned.split('#');
  const anchor = hashPart ? hashPart.trim() : null;

  const lastSegment = pathPart.split('/').filter(Boolean).pop() || 'index.html';

  if (VALID_PAGES.has(lastSegment as PageId)) {
    return { page: lastSegment as PageId, anchor };
  }

  return { page: 'index.html', anchor };
}

/**
 * 取得精選文章（首頁與文章總覽頁顯示的三篇指定文章）
 */
export function getFeaturedArticles(): ArticleUnit[] {
  return ARTICLES.filter((article) => article.featured);
}

/**
 * 依照分類 ID 取得該分類下的所有教學單元
 */
export function getArticlesByCategory(categoryId: CategoryId): ArticleUnit[] {
  return ARTICLES.filter((article) => article.categoryId === categoryId);
}

/**
 * 依照關鍵字即時過濾文章（比對標題、摘要、前言、操作重點、範例文字、分類、標籤與單元編號）
 */
export function filterArticlesByKeyword(
  keyword: string,
  sourceArticles: ArticleUnit[] = ARTICLES
): ArticleUnit[] {
  const normalized = keyword.trim().toLowerCase();
  if (!normalized) {
    return sourceArticles;
  }

  const terms = normalized.split(/\s+/).filter(Boolean);

  return sourceArticles.filter((article) => {
    const searchableText = [
      article.id,
      article.title,
      article.category,
      article.summary,
      article.intro,
      ...article.keyPoints,
      article.exampleTitle,
      article.exampleText,
      ...article.tags
    ]
      .join(' ')
      .toLowerCase();

    return terms.every((term) => searchableText.includes(term));
  });
}

/**
 * 依照頁面 ID 判斷頂層導覽項目是否為啟用狀態
 */
export function isTopNavActive(navPage: PageId, currentPage: PageId): boolean {
  if (navPage === 'articles.html') {
    return (
      currentPage === 'articles.html' ||
      currentPage === 'articles-ai.html' ||
      currentPage === 'articles-tools.html' ||
      currentPage === 'articles-work.html'
    );
  }
  return navPage === currentPage;
}

/**
 * 依照分類頁面 ID 取得對應的分類 메타 資料
 */
export function getCategoryByPage(page: PageId): CategoryMeta | undefined {
  return CATEGORIES.find((cat) => cat.page === page);
}

/**
 * 驗證網站資料是否完全符合 V0.3 規格書要求
 */
export function validateSiteSpecification(): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // 1. 檢查 8 個正式頁面
  const pageKeys = Object.keys(PAGE_SEO_MAP);
  if (pageKeys.length !== 8) {
    errors.push(`Expected 8 formal pages, got ${pageKeys.length}`);
  }

  // 2. 檢查頂層導覽順序與名稱
  const expectedTopNav = ['首頁', '品牌故事', '作者介紹', '文章選單', '關於'];
  const actualTopNav = TOP_NAV_ITEMS.map((item) => item.label);
  if (JSON.stringify(expectedTopNav) !== JSON.stringify(actualTopNav)) {
    errors.push(`Top nav mismatch: ${actualTopNav.join(', ')}`);
  }

  // 3. 檢查三個下層分類名稱（嚴禁出現舊版名稱）
  const expectedCategories = ['AI實戰應用', '數位工具實測', '效率工作教學'];
  const actualCategories = CATEGORIES.map((c) => c.name);
  if (JSON.stringify(expectedCategories) !== JSON.stringify(actualCategories)) {
    errors.push(`Category names mismatch: ${actualCategories.join(', ')}`);
  }

  // 4. 檢查九個教學單元與精選文章
  if (ARTICLES.length !== 9) {
    errors.push(`Expected 9 teaching units, got ${ARTICLES.length}`);
  }

  for (const cat of CATEGORIES) {
    const units = getArticlesByCategory(cat.id);
    if (units.length < 3) {
      errors.push(`Category ${cat.name} has fewer than 3 units`);
    }
  }

  const featured = getFeaturedArticles();
  const expectedFeaturedTitles = [
    'ChatGPT 提示語入門',
    'Google AI Studio 網站實作',
    'AI 協助整理 Excel'
  ];
  const actualFeaturedTitles = featured.map((a) => a.title);
  if (JSON.stringify(expectedFeaturedTitles) !== JSON.stringify(actualFeaturedTitles)) {
    errors.push(`Featured articles mismatch: ${actualFeaturedTitles.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
