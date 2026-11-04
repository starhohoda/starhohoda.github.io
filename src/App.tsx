/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import { PAGE_SEO_MAP, PageId } from './data/articles';
import { parseRouteTarget } from './utils/siteLogic';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import {
  AboutPage,
  ArticlesOverviewPage,
  AuthorPage,
  BrandStoryPage,
  CategoryArticlesPage,
  HomePage
} from './components/PageViews';

declare global {
  interface Window {
    __STAR_RIVER_REACT_MOUNTED__?: boolean;
  }
}

export function renderPageContent(
  currentPage: PageId,
  onNavigate: (href: string, e?: React.MouseEvent) => void
) {
  switch (currentPage) {
    case 'index.html':
      return <HomePage onNavigate={onNavigate} />;
    case 'brand.html':
      return <BrandStoryPage onNavigate={onNavigate} />;
    case 'author.html':
      return <AuthorPage onNavigate={onNavigate} />;
    case 'articles.html':
      return <ArticlesOverviewPage onNavigate={onNavigate} />;
    case 'articles-ai.html':
      return <CategoryArticlesPage categoryId="ai" onNavigate={onNavigate} />;
    case 'articles-tools.html':
      return (
        <CategoryArticlesPage categoryId="tools" onNavigate={onNavigate} />
      );
    case 'articles-work.html':
      return <CategoryArticlesPage categoryId="work" onNavigate={onNavigate} />;
    case 'about.html':
      return <AboutPage onNavigate={onNavigate} />;
    default:
      return <HomePage onNavigate={onNavigate} />;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window === 'undefined') return 'index.html';
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    if (pageParam) {
      return parseRouteTarget(pageParam).page;
    }
    return parseRouteTarget(window.location.pathname + window.location.hash).page;
  });

  useEffect(() => {
    window.__STAR_RIVER_REACT_MOUNTED__ = true;
  }, []);

  // 同步更新頁面 Title 與 Meta Description
  useEffect(() => {
    const seo = PAGE_SEO_MAP[currentPage] || PAGE_SEO_MAP['index.html'];
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.description);
    }
  }, [currentPage]);

  // 監聽瀏覽器上一頁 / 下一頁
  useEffect(() => {
    const handlePopState = () => {
      const target = parseRouteTarget(
        window.location.pathname + window.location.hash
      );
      setCurrentPage(target.page);
      if (target.anchor) {
        setTimeout(() => {
          const el = document.getElementById(target.anchor!);
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 40);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback(
    (rawHref: string, e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
      }

      const target = parseRouteTarget(rawHref);
      setCurrentPage(target.page);

      const nextUrl = target.anchor
        ? `/${target.page}#${target.anchor}`
        : `/${target.page}`;

      try {
        window.history.pushState({ page: target.page }, '', nextUrl);
      } catch {
        // Ignore history pushState restriction in sandboxed environments if any
      }

      if (target.anchor) {
        setTimeout(() => {
          const el = document.getElementById(target.anchor!);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    },
    []
  );

  return (
    <div className="site-wrapper" data-current-page={currentPage}>
      <SiteHeader currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPageContent(currentPage, handleNavigate)}
      <SiteFooter onNavigate={handleNavigate} />
    </div>
  );
}
