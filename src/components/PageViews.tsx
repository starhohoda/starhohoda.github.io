import React, { useState } from 'react';
import {
  ARTICLES,
  BRAND_CONFIG,
  CATEGORIES,
  CategoryId,
  FAQS
} from '../data/articles';
import {
  filterArticlesByKeyword,
  getArticlesByCategory,
  getFeaturedArticles
} from '../utils/siteLogic';

interface PageViewProps {
  onNavigate: (href: string, e?: React.MouseEvent) => void;
}

/**
 * P01 首頁 (Section 05)
 */
export const HomePage: React.FC<PageViewProps> = ({ onNavigate }) => {
  const featuredArticles = getFeaturedArticles();

  return (
    <main id="main-content">
      {/* 5.3 首頁主視覺 Hero */}
      <section className="hero-home-section">
        <div className="sr-container hero-home-grid">
          <div className="hero-home-copy">
            <span className="hero-kicker">探索工具・實作知識・創造更多可能</span>
            <h1 className="hero-home-title">
              從 <span className="gold-highlight">AI</span> 學習
              <br />
              到數位創作
            </h1>
            <p className="hero-home-subtitle">{BRAND_CONFIG.secondarySlogan}</p>
            <div className="hero-actions">
              <a
                href="articles.html"
                className="btn-primary-gold"
                onClick={(e) => onNavigate('articles.html', e)}
              >
                <span>開始探索</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="articles.html"
                className="btn-secondary-link"
                onClick={(e) => onNavigate('articles.html', e)}
              >
                <span>閱讀教學文章</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="hero-illustration-box">
            <img
              src="assets/images/IMG_首頁.png"
              alt="首頁頁首主視覺：夜晚星河與星球下打開的發光書本，浮現 AI、圖像、文件、圖表與創作工具卡片"
              className="hero-main-img"
              width="1672"
              height="941"
            />
            <div className="hero-illustration-caption" aria-hidden="true">
              <span>✦ 讓學習成為創作的起點</span>
            </div>
          </div>
        </div>
        <svg
          className="hero-wave-bottom"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,18 C360,62 960,-12 1440,34 L1440,60 L0,60 Z"
            fill="#F7F5EF"
          />
        </svg>
      </section>

      {/* 5.4 網站介紹 & 5.5 三大分類入口 */}
      <section className="content-section">
        <div className="sr-container">
          <div className="section-header">
            <div className="section-title-row">
              <h2 className="section-title">
                <span className="star-accent-icon" aria-hidden="true">✦</span>
                <span>探索實用的數位知識</span>
              </h2>
              <span className="section-title-line" aria-hidden="true" />
              <a
                href="articles.html"
                className="section-more-link"
                onClick={(e) => onNavigate('articles.html', e)}
              >
                <span>查看更多</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="section-desc">
              從實際應用出發，分享 AI 操作、數位工具與效率工作方法，讓學習逐步轉化為可以使用的成果。
            </p>
          </div>

          <div className="category-grid-3">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={cat.page}
                className={`category-card-vertical ${cat.colorClass}`}
                onClick={(e) => onNavigate(cat.page, e)}
              >
                <div className="category-icon-box">
                  <img src={cat.icon} alt={cat.iconAlt} width="96" height="80" />
                </div>
                <h3 className="category-card-title">{cat.name}</h3>
                <p className="category-card-desc">{cat.shortDesc}</p>
                <span className="category-circle-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5.6 精選教學文章 */}
      <section className="content-section" style={{ paddingTop: '12px' }}>
        <div className="sr-container">
          <div className="section-header">
            <div className="section-title-row">
              <h2 className="section-title">
                <span className="star-accent-icon" aria-hidden="true">✦</span>
                <span>精選教學文章</span>
              </h2>
              <span className="section-title-line" aria-hidden="true" />
              <a
                href="articles.html"
                className="section-more-link"
                onClick={(e) => onNavigate('articles.html', e)}
              >
                <span>查看更多</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="section-desc">
              從基礎提示語、工具建站實作到日常試算表整理，挑選適合初學者立即上手的實作主題。
            </p>
          </div>

          <div className="featured-articles-list">
            {featuredArticles.map((article) => {
              const labelClass =
                article.categoryId === 'ai'
                  ? 'label-ai'
                  : article.categoryId === 'tools'
                  ? 'label-tools'
                  : 'label-work';

              return (
                <article key={article.id} className="article-preview-card">
                  <a
                    href={article.url}
                    onClick={(e) => onNavigate(article.url, e)}
                    aria-label={`閱讀 ${article.title}`}
                  >
                    <img
                      src={article.coverImage}
                      alt={article.imageAlt}
                      className="article-preview-cover"
                      width="600"
                      height="340"
                    />
                  </a>
                  <div className="article-preview-body">
                    <span className={`article-category-label ${labelClass}`}>
                      {article.category}
                    </span>
                    <h3 className="article-preview-title">
                      <a
                        href={article.url}
                        onClick={(e) => onNavigate(article.url, e)}
                      >
                        {article.title}
                      </a>
                    </h3>
                    <p className="article-preview-summary">{article.summary}</p>
                    <a
                      href={article.url}
                      className="article-read-link"
                      onClick={(e) => onNavigate(article.url, e)}
                    >
                      <span>閱讀教學單元（{article.id}）</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5.7 品牌理念 */}
      <section className="content-section">
        <div className="sr-container">
          <div className="night-philosophy-card">
            <div>
              <h2 className="night-philosophy-title">讓學習成為創造的起點</h2>
              <p className="night-philosophy-text">
                我們相信，數位工具的價值不只在於功能，而在於如何協助人們探索、實作與創造。
              </p>
            </div>
            <a
              href="brand.html"
              className="btn-primary-gold"
              onClick={(e) => onNavigate('brand.html', e)}
            >
              <span>認識品牌故事</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

/**
 * P02 品牌故事頁 (Section 06)
 */
export const BrandStoryPage: React.FC<PageViewProps> = ({ onNavigate }) => {
  return (
    <main id="main-content">
      {/* 6.2 頁面主視覺 */}
      <section className="page-hero-warm page-hero-brand">
        <div className="sr-container">
          <nav className="breadcrumb-nav" aria-label="麵包屑導覽">
            <a href="index.html" onClick={(e) => onNavigate('index.html', e)}>
              首頁
            </a>
            <span aria-hidden="true">›</span>
            <span aria-current="page">品牌故事</span>
          </nav>

          <div className="page-hero-grid">
            <div className="page-hero-copy">
              <h1 className="page-main-title">品牌故事</h1>
              <p className="page-subtitle">從好奇開始，讓學習成為創造的力量</p>
              <p className="page-lead-text">
                在數位工具快速發展的時代，我們希望以溫和、清楚且可實際操作的教學方式，陪伴學習者將好奇心轉化為日常可用的能力。
              </p>
            </div>
            <div className="page-hero-art">
              <img
                src="assets/images/IMG_品牌故事.png"
                alt="品牌故事頁首主視覺：創作者於書桌前手捧星光馬克杯仰望明月與浮現的數位知識卡片"
                className="page-hero-img"
                width="1536"
                height="1024"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6.3 品牌起點 */}
      <section className="content-section">
        <div className="sr-container">
          <div className="story-origin-grid">
            <div style={{ borderRadius: '18px', overflow: 'hidden' }}>
              <img
                src="assets/images/brand-lake.svg"
                alt="夜晚星空與山巒倒映在平靜湖面的品牌意象插畫"
                width="360"
                height="360"
              />
            </div>
            <div>
              <h2 className="section-title" style={{ marginBottom: '14px' }}>
                <span className="star-accent-icon" aria-hidden="true">✦</span>
                <span>從一次學習，開始更多可能</span>
              </h2>
              <p style={{ fontSize: '17px', margin: '0 0 14px', fontWeight: 600, color: '#1F3A4B' }}>
                我們相信，數位工具不只是技術，更是幫助人們探索、創作與解決問題的方法。
              </p>
              <p style={{ margin: 0, color: '#2B3540' }}>
                許多初學者在面對新興 AI 與數位工具時，常因為資訊分散或充斥未解釋的技術名詞而感到卻步。星河數位文創從實際操作與學習整理出發，將複雜的功能拆解為清楚的步驟說明，讓每一次嘗試都能累積成具體經驗。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6.4 核心理念 */}
      <section className="content-section" style={{ paddingTop: '8px' }}>
        <div className="sr-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="star-accent-icon" aria-hidden="true">✦</span>
              <span>我們重視的三件事</span>
            </h2>
          </div>

          <div className="category-grid-3">
            <div className="category-card-vertical cat-ai">
              <div className="category-icon-box">
                <img
                  src="assets/icons/cat-tools.svg"
                  alt="實際操作圖示"
                  width="88"
                  height="74"
                />
              </div>
              <h3 className="category-card-title">實際操作</h3>
              <p className="category-card-desc" style={{ marginBottom: 0 }}>
                透過具體步驟，理解工具的使用方法。
              </p>
            </div>

            <div className="category-card-vertical cat-tools">
              <div className="category-icon-box">
                <img
                  src="assets/icons/cat-ai.svg"
                  alt="持續學習圖示"
                  width="88"
                  height="74"
                />
              </div>
              <h3 className="category-card-title">持續學習</h3>
              <p className="category-card-desc" style={{ marginBottom: 0 }}>
                從每一次嘗試中累積知識與能力。
              </p>
            </div>

            <div className="category-card-vertical cat-work">
              <div className="category-icon-box">
                <img
                  src="assets/icons/cat-work.svg"
                  alt="創意實現圖示"
                  width="88"
                  height="74"
                />
              </div>
              <h3 className="category-card-title">創意實現</h3>
              <p className="category-card-desc" style={{ marginBottom: 0 }}>
                讓想法逐漸轉化為可以使用的成果。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5 未來願景 & 6.6 頁面入口 */}
      <section className="content-section">
        <div className="sr-container">
          <div className="night-philosophy-card">
            <div>
              <h2 className="night-philosophy-title">讓知識與創作持續延伸</h2>
              <p className="night-philosophy-text">
                星河數位文創希望逐步累積 AI 應用、數位工具、工作方法及內容創作相關知識；未來也期盼依實際學習與創作需求，探索文字寫作、知識管理等更多主題，陪伴讀者在數位實作中找到屬於自己的節奏。
              </p>
            </div>
            <a
              href="articles.html"
              className="btn-primary-gold"
              onClick={(e) => onNavigate('articles.html', e)}
            >
              <span>探索教學文章</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

/**
 * P03 作者介紹頁 (Section 07)
 */
export const AuthorPage: React.FC<PageViewProps> = ({ onNavigate }) => {
  return (
    <main id="main-content">
      {/* 7.2 作者主視覺 */}
      <section className="page-hero-warm page-hero-author">
        <div className="sr-container">
          <nav className="breadcrumb-nav" aria-label="麵包屑導覽">
            <a href="index.html" onClick={(e) => onNavigate('index.html', e)}>
              首頁
            </a>
            <span aria-hidden="true">›</span>
            <span aria-current="page">作者介紹</span>
          </nav>

          <div className="page-hero-grid">
            <div className="page-hero-copy">
              <h1 className="page-main-title">作者介紹</h1>
              <p className="page-subtitle">
                在學習、實作與創作之間，持續探索新的可能。
              </p>
              <div className="author-badge-box">
                <span className="author-pen-name">{BRAND_CONFIG.authorName}</span>
                <span className="author-role-label">
                  {BRAND_CONFIG.brandName}・網站內容作者
                </span>
              </div>
            </div>

            <div className="page-hero-art">
              <img
                src="assets/images/IMG_作者介紹.png"
                alt="作者介紹頁首主視覺：女性創作者於書桌前手握鋼筆記錄靈感，身旁環繞數位工具與知識卡片"
                className="page-hero-img page-hero-img-author"
                width="1122"
                height="1402"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7.3 作者介紹 */}
      <section className="content-section">
        <div className="sr-container">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid #E4E7E8'
            }}
          >
            <h2 className="section-title" style={{ marginBottom: '12px' }}>
              <span className="star-accent-icon" aria-hidden="true">✦</span>
              <span>你好，我是{BRAND_CONFIG.authorName}</span>
            </h2>
            <p style={{ fontSize: '17px', margin: 0, maxWidth: '760px' }}>
              喜歡文字創作，也持續探索 AI 工具、數位應用與知識整理，希望把學習過程轉化為容易理解的實作分享。
            </p>
          </div>
        </div>
      </section>

      {/* 7.4 關注領域 */}
      <section className="content-section" style={{ paddingTop: '8px' }}>
        <div className="sr-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="star-accent-icon" aria-hidden="true">✦</span>
              <span>我正在探索的領域</span>
            </h2>
          </div>

          <div className="category-grid-3">
            <div className="category-card-vertical cat-ai">
              <div className="category-icon-box">
                <img
                  src="assets/icons/cat-ai.svg"
                  alt="AI工具應用圖示"
                  width="88"
                  height="74"
                />
              </div>
              <h3 className="category-card-title">AI工具應用</h3>
              <p className="category-card-desc" style={{ marginBottom: 0 }}>
                探索對話式 AI 與生成工具在實際任務中的操作方法與提問技巧。
              </p>
            </div>

            <div className="category-card-vertical cat-tools">
              <div className="category-icon-box">
                <img
                  src="assets/icons/cat-tools.svg"
                  alt="數位知識整理圖示"
                  width="88"
                  height="74"
                />
              </div>
              <h3 className="category-card-title">數位知識整理</h3>
              <p className="category-card-desc" style={{ marginBottom: 0 }}>
                運用數位工具梳理資料結構、建立容易查找與回顧的筆記流程。
              </p>
            </div>

            <div className="category-card-vertical cat-work">
              <div className="category-icon-box">
                <img
                  src="assets/icons/cat-work.svg"
                  alt="內容創作與寫作圖示"
                  width="88"
                  height="74"
                />
              </div>
              <h3 className="category-card-title">內容創作與寫作</h3>
              <p className="category-card-desc" style={{ marginBottom: 0 }}>
                將實作觀察轉化為清楚易讀的圖文教學，持續探索文字與數位創作。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7.5 學習與實作三階段流程圖 */}
      <section className="content-section" style={{ paddingTop: '8px' }}>
        <div className="sr-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="star-accent-icon" aria-hidden="true">✦</span>
              <span>從學習到實踐</span>
            </h2>
            <p className="section-desc">
              透過「學習新工具 → 實際操作 → 整理分享」三個階段，將每一次嘗試整理為可重複運用的經驗。
            </p>
          </div>

          <div className="process-steps-grid">
            <div className="process-step-card">
              <span
                className="process-step-num"
                style={{ backgroundColor: '#E6EFF6' }}
              >
                01
              </span>
              <h3 style={{ margin: '0 0 8px', color: '#1F3A4B', fontSize: '20px' }}>
                學習新工具
              </h3>
              <p style={{ margin: 0, color: '#57768A', fontSize: '15px' }}>
                保持好奇心，認識不同數位工具與 AI 功能的基本概念與操作介面。
              </p>
            </div>

            <div className="process-step-card">
              <span
                className="process-step-num"
                style={{ backgroundColor: '#F9F1DF' }}
              >
                02
              </span>
              <h3 style={{ margin: '0 0 8px', color: '#1F3A4B', fontSize: '20px' }}>
                實際操作
              </h3>
              <p style={{ margin: 0, color: '#57768A', fontSize: '15px' }}>
                從真實需求出發動手測試，觀察工具的效果、限制與需要注意的細節。
              </p>
            </div>

            <div className="process-step-card">
              <span
                className="process-step-num"
                style={{ backgroundColor: '#E6F2EA' }}
              >
                03
              </span>
              <h3 style={{ margin: '0 0 8px', color: '#1F3A4B', fontSize: '20px' }}>
                整理分享
              </h3>
              <p style={{ margin: 0, color: '#57768A', fontSize: '15px' }}>
                將操作步驟與檢查重點整理成結構清楚的圖文單元，讓初學者也能輕鬆理解。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7.6 作者理念引言區塊 */}
      <section className="content-section">
        <div className="sr-container">
          <div
            style={{
              background: 'linear-gradient(135deg, #243E52 0%, #57768A 100%)',
              color: '#FFFFFF',
              borderRadius: '24px',
              padding: '36px 32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div>
              <blockquote
                style={{
                  margin: '0 0 10px',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(22px, 2.5vw, 28px)',
                  fontWeight: 700,
                  color: '#F6DF96'
                }}
              >
                「讓工具協助思考，讓學習累積能力。」
              </blockquote>
              <p style={{ margin: 0, color: '#E6EFF6', fontSize: '15.5px' }}>
                —— {BRAND_CONFIG.authorName}｜{BRAND_CONFIG.brandName}
              </p>
            </div>

            <a
              href="articles.html"
              className="btn-primary-gold"
              onClick={(e) => onNavigate('articles.html', e)}
            >
              <span>閱讀我的文章</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

/**
 * P04 文章選單內容頁 / 文章總覽頁 (Section 08)
 */
const QUICK_SEARCH_KEYWORDS = ['提示語', 'Excel', '網站實作', '查證', '簡報', 'NotebookLM'];

export const ArticlesOverviewPage: React.FC<PageViewProps> = ({
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const trimmedQuery = searchQuery.trim();
  const isSearching = trimmedQuery.length > 0;
  const matchedArticles = filterArticlesByKeyword(trimmedQuery, ARTICLES);
  const matchedIds = new Set(matchedArticles.map((a) => a.id));

  return (
    <main id="main-content">
      {/* 8.2 頁面主視覺 */}
      <section className="page-hero-warm page-hero-articles">
        <div className="sr-container">
          <nav className="breadcrumb-nav" aria-label="麵包屑導覽">
            <a href="index.html" onClick={(e) => onNavigate('index.html', e)}>
              首頁
            </a>
            <span aria-hidden="true">›</span>
            <span aria-current="page">文章選單</span>
          </nav>

          <div className="page-hero-grid">
            <div className="page-hero-copy">
              <h1 className="page-main-title">文章選單</h1>
              <p className="page-subtitle">探索知識，讓數位學習更有方向。</p>
              <p className="page-lead-text">
                從 AI 實際應用到數位工具與工作方法，找到適合自己的學習內容。
              </p>
            </div>

            <div className="page-hero-art">
              <img
                src="assets/images/IMG_文章選單.png"
                alt="文章選單頁首主視覺：書桌上打開的書本與筆記型電腦，星光軌跡浮現三大數位知識領域卡片"
                className="page-hero-img"
                width="1536"
                height="1024"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8.3 三大分類大型橫向卡片 */}
      <section className="content-section">
        <div className="sr-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="star-accent-icon" aria-hidden="true">✦</span>
              <span>探索三大知識主題</span>
            </h2>
            <p className="section-desc">依照你的學習需求，選擇適合的內容。</p>
          </div>

          <div className="category-stack-horizontal">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={cat.page}
                className={`category-banner-horizontal ${cat.colorClass}`}
                onClick={(e) => onNavigate(cat.page, e)}
              >
                <div style={{ width: '84px', height: '70px' }}>
                  <img src={cat.icon} alt={cat.iconAlt} width="84" height="70" />
                </div>
                <div>
                  <h3 className="category-card-title" style={{ marginBottom: '6px' }}>
                    {cat.name}
                  </h3>
                  <p className="category-card-desc" style={{ marginBottom: 0 }}>
                    {cat.menuDesc}
                  </p>
                </div>
                <span className="category-circle-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 8.4 精選文章與關鍵字即時搜尋過濾 */}
      <section className="content-section" style={{ paddingTop: '8px' }}>
        <div className="sr-container">
          <div className="section-header">
            <h2 className="section-title" id="articles-list-heading">
              <span className="star-accent-icon" aria-hidden="true">✦</span>
              <span>{isSearching ? '文章搜尋結果' : '精選教學文章'}</span>
            </h2>
            <p className="section-desc">
              可輸入關鍵字即時過濾全站九個教學單元的標題與內容重點，或直接點選下方文章卡片閱讀。
            </p>
          </div>

          {/* 關鍵字即時搜尋欄 */}
          <div className="article-search-card" role="search" aria-label="文章標題與內容關鍵字搜尋">
            <label htmlFor="article-search-input" className="article-search-label">
              搜尋教學文章（支援標題、內容重點與標籤即時過濾）
            </label>
            <div className="article-search-input-wrap">
              <svg
                className="article-search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                id="article-search-input"
                className="article-search-input"
                placeholder="輸入標題或內容關鍵字（例如：提示語、Excel、查證、簡報、NotebookLM）..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
              {isSearching && (
                <button
                  type="button"
                  id="article-search-clear"
                  className="article-search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="清除搜尋關鍵字"
                >
                  清除 ×
                </button>
              )}
            </div>

            <div className="article-search-footer">
              <div className="article-search-quick-tags">
                <span className="article-search-quick-label">熱門關鍵字：</span>
                {QUICK_SEARCH_KEYWORDS.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    className={`article-search-tag-btn ${
                      trimmedQuery.toLowerCase() === kw.toLowerCase() ? 'is-active' : ''
                    }`}
                    data-search-keyword={kw}
                    onClick={() =>
                      setSearchQuery((prev) =>
                        prev.trim().toLowerCase() === kw.toLowerCase() ? '' : kw
                      )
                    }
                  >
                    {kw}
                  </button>
                ))}
              </div>

              <div
                id="article-search-status"
                className="article-search-status"
                aria-live="polite"
              >
                {isSearching
                  ? `搜尋「${trimmedQuery}」：共找到 ${matchedArticles.length} 篇教學單元`
                  : '目前顯示 3 篇精選教學（輸入關鍵字可搜尋全部 9 個教學單元）'}
              </div>
            </div>
          </div>

          <div className="featured-articles-list" id="filterable-articles-grid">
            {ARTICLES.map((article) => {
              const labelClass =
                article.categoryId === 'ai'
                  ? 'label-ai'
                  : article.categoryId === 'tools'
                  ? 'label-tools'
                  : 'label-work';

              const isVisible = isSearching
                ? matchedIds.has(article.id)
                : article.featured;

              const searchableContent = [
                article.id,
                article.title,
                article.category,
                article.summary,
                article.intro,
                ...article.keyPoints,
                article.exampleTitle,
                article.exampleText,
                ...article.tags
              ].join(' ');

              return (
                <article
                  key={article.id}
                  className={`article-preview-card ${
                    isVisible ? '' : 'is-hidden-by-search'
                  }`}
                  data-article-id={article.id}
                  data-featured={article.featured ? 'true' : 'false'}
                  data-searchable={searchableContent}
                >
                  <a
                    href={article.url}
                    onClick={(e) => onNavigate(article.url, e)}
                    aria-label={`閱讀 ${article.title}`}
                  >
                    <img
                      src={article.coverImage}
                      alt={article.imageAlt}
                      className="article-preview-cover"
                      width="600"
                      height="340"
                    />
                  </a>
                  <div className="article-preview-body">
                    <span className={`article-category-label ${labelClass}`}>
                      {article.category}
                    </span>
                    <h3 className="article-preview-title">
                      <a
                        href={article.url}
                        onClick={(e) => onNavigate(article.url, e)}
                      >
                        {article.title}
                      </a>
                    </h3>
                    <p className="article-preview-summary">{article.summary}</p>
                    <a
                      href={article.url}
                      className="article-read-link"
                      onClick={(e) => onNavigate(article.url, e)}
                    >
                      <span>前往教學單元（{article.id}）</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {/* 無符合結果時的提示區塊 */}
          <div
            id="article-search-empty"
            className={`article-search-empty ${
              isSearching && matchedArticles.length === 0 ? '' : 'is-hidden-by-search'
            }`}
          >
            <p
              id="article-search-empty-text"
              style={{
                fontSize: '17px',
                fontWeight: 700,
                color: '#1F3A4B',
                margin: '0 0 8px'
              }}
            >
              找不到符合「{trimmedQuery}」的教學文章
            </p>
            <p style={{ fontSize: '14.5px', color: '#57768A', margin: '0 0 16px' }}>
              建議嘗試其他關鍵字（例如：提示語、Excel、查證、簡報、網站實作），或直接瀏覽三大知識分類。
            </p>
            <button
              type="button"
              id="article-search-reset-btn"
              className="btn-back-home"
              onClick={() => setSearchQuery('')}
            >
              清除搜尋條件
            </button>
          </div>
        </div>
      </section>

      {/* 8.5 閱讀引導 */}
      <section className="content-section">
        <div className="sr-container">
          <div
            style={{
              backgroundColor: '#E6EFF6',
              border: '1px solid #C5D9E8',
              borderRadius: '22px',
              padding: '32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px'
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '24px',
                  color: '#1F3A4B',
                  margin: '0 0 8px'
                }}
              >
                不知道從哪裡開始？
              </h2>
              <p style={{ margin: 0, color: '#2B3540', maxWidth: '580px' }}>
                可以先從 AI 實戰應用入門，再依照需求探索不同數位工具與工作方法。
              </p>
            </div>

            <a
              href="articles-ai.html"
              className="btn-primary-gold"
              onClick={(e) => onNavigate('articles-ai.html', e)}
            >
              <span>開始學習</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

/**
 * P05 / P06 / P07 三個文章分類頁 (Section 09)
 */
export const CategoryArticlesPage: React.FC<{
  categoryId: CategoryId;
  onNavigate: (href: string, e?: React.MouseEvent) => void;
}> = ({ categoryId, onNavigate }) => {
  const category = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
  const units = getArticlesByCategory(category.id);

  return (
    <main id="main-content">
      <section className="page-hero-warm">
        <div className="sr-container">
          <nav className="breadcrumb-nav" aria-label="麵包屑導覽">
            <a href="index.html" onClick={(e) => onNavigate('index.html', e)}>
              首頁
            </a>
            <span aria-hidden="true">›</span>
            <a
              href="articles.html"
              onClick={(e) => onNavigate('articles.html', e)}
            >
              文章選單
            </a>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{category.name}</span>
          </nav>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div>
              <h1 className="page-main-title">{category.name}</h1>
              <p className="page-subtitle" style={{ marginTop: '8px' }}>
                {category.pageIntro}
              </p>

              {/* 本頁教學單元快速跳轉錨點 */}
              <div className="unit-jump-bar" aria-label="本頁教學單元快速跳轉">
                {units.map((u) => (
                  <a
                    key={u.id}
                    href={`#${u.anchor}`}
                    className="unit-jump-pill"
                  >
                    <span>{u.id}｜{u.title}</span>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ width: '110px', height: '92px' }}>
              <img src={category.icon} alt={category.iconAlt} width="110" height="92" />
            </div>
          </div>
        </div>
      </section>

      {/* 分類切換橫條 */}
      <section style={{ paddingTop: '28px' }}>
        <div className="sr-container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              paddingBottom: '20px',
              borderBottom: '1px solid #E4E7E8'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <a
                href="articles.html"
                className="unit-jump-pill"
                onClick={(e) => onNavigate('articles.html', e)}
              >
                ← 返回文章總覽
              </a>
              {CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={cat.page}
                  className="unit-jump-pill"
                  style={
                    cat.id === category.id
                      ? {
                          backgroundColor: '#1F3A4B',
                          color: '#FFFFFF',
                          borderColor: '#1F3A4B'
                        }
                      : undefined
                  }
                  aria-current={cat.id === category.id ? 'page' : undefined}
                  onClick={(e) => onNavigate(cat.page, e)}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 三個教學單元詳情 */}
      <section className="content-section" style={{ paddingTop: '32px' }}>
        <div className="sr-container units-list-container">
          {units.map((unit) => (
            <article
              key={unit.id}
              id={unit.anchor}
              className="teaching-unit-card"
            >
              <div className="unit-meta-row">
                <span className="unit-code-badge">
                  單元編號 {unit.id}・{unit.category}
                </span>
                <span className="unit-status-note">
                  狀態：{unit.status}｜更新：{unit.updatedDate}
                </span>
              </div>

              <h2 className="unit-title">
                {unit.id}｜{unit.title}
              </h2>
              <p className="unit-intro">{unit.intro}</p>

              <div className="unit-content-grid">
                <div>
                  <div className="unit-keypoints-box">
                    <h3 className="unit-subhead">核心操作重點</h3>
                    <ol className="unit-points-list">
                      {unit.keyPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="unit-example-box">
                    <span className="unit-example-label">
                      ✦ {unit.exampleTitle}
                    </span>
                    <p className="unit-example-text">{unit.exampleText}</p>
                  </div>
                </div>

                <figure className="unit-figure">
                  <img
                    src={unit.coverImage}
                    alt={unit.imageAlt}
                    width="600"
                    height="340"
                  />
                  <figcaption className="unit-figcaption">
                    {unit.figureCaption}
                  </figcaption>
                </figure>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

/**
 * P08 關於本站頁 (Section 10)
 */
export const AboutPage: React.FC<PageViewProps> = ({ onNavigate }) => {
  return (
    <main id="main-content">
      {/* 10.2 主視覺 */}
      <section className="page-hero-warm page-hero-about">
        <div className="sr-container">
          <nav className="breadcrumb-nav" aria-label="麵包屑導覽">
            <a href="index.html" onClick={(e) => onNavigate('index.html', e)}>
              首頁
            </a>
            <span aria-hidden="true">›</span>
            <span aria-current="page">關於本站</span>
          </nav>

          <div className="page-hero-grid">
            <div className="page-hero-copy">
              <h1 className="page-main-title">關於本站</h1>
              <p className="page-subtitle">探索 AI 應用，累積數位實作能力。</p>
              <p className="page-lead-text">
                整理清晰的分類教學與使用提醒，協助初學者安心踏出數位學習的第一步。
              </p>
            </div>

            <div className="page-hero-art">
              <img
                src="assets/images/IMG_關於.png"
                alt="關於本站頁首主視覺：筆記型電腦、書本、植栽與星光知識卡片插畫"
                className="page-hero-img"
                width="1536"
                height="1024"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10.3 網站介紹 */}
      <section className="content-section">
        <div className="sr-container">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid #E4E7E8'
            }}
          >
            <h2 className="section-title" style={{ marginBottom: '12px' }}>
              <span className="star-accent-icon" aria-hidden="true">✦</span>
              <span>星河數位文創是什麼？</span>
            </h2>
            <p style={{ fontSize: '17px', margin: 0, maxWidth: '760px' }}>
              這裡分享 AI 應用、數位工具使用經驗與實際工作方法，透過圖文教學，讓數位知識更容易理解與運用。
            </p>
          </div>
        </div>
      </section>

      {/* 10.4 三大內容分類 */}
      <section className="content-section" style={{ paddingTop: '8px' }}>
        <div className="sr-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="star-accent-icon" aria-hidden="true">✦</span>
              <span>你可以在這裡找到</span>
            </h2>
          </div>

          <div className="category-stack-horizontal">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={cat.page}
                className={`category-banner-horizontal ${cat.colorClass}`}
                onClick={(e) => onNavigate(cat.page, e)}
              >
                <div style={{ width: '76px', height: '64px' }}>
                  <img src={cat.icon} alt={cat.iconAlt} width="76" height="64" />
                </div>
                <div>
                  <h3 className="category-card-title" style={{ marginBottom: '4px' }}>
                    {cat.name}
                  </h3>
                  <p className="category-card-desc" style={{ marginBottom: 0 }}>
                    {cat.aboutDesc}
                  </p>
                </div>
                <span className="category-circle-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 10.5 使用提醒 */}
      <section className="content-section" style={{ paddingTop: '8px' }}>
        <div className="sr-container">
          <div className="notice-box-blue">
            <h2 className="section-title" style={{ fontSize: '22px', marginBottom: '12px' }}>
              <span className="star-accent-icon" aria-hidden="true">✦</span>
              <span>閱讀與使用提醒</span>
            </h2>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>部分 AI 工具介面與功能可能隨版本更新。</li>
              <li>教學內容供學習參考，實際操作時仍需確認工具與資料的正確性。</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10.6 常見問題 FAQ */}
      <section className="content-section" style={{ paddingTop: '8px' }}>
        <div className="sr-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="star-accent-icon" aria-hidden="true">✦</span>
              <span>常見問題</span>
            </h2>
          </div>

          <div className="faq-list">
            {FAQS.map((faq, index) => (
              <details
                key={faq.id}
                className="faq-item"
                open={index === 0}
              >
                <summary className="faq-summary">
                  <span>{faq.question}</span>
                  <svg
                    className="faq-chevron"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <div className="faq-answer">
                  <p style={{ margin: 0 }}>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10.7 聯絡資訊 */}
      <section className="content-section" style={{ paddingTop: '8px' }}>
        <div className="sr-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="star-accent-icon" aria-hidden="true">✦</span>
              <span>與我們聯絡</span>
            </h2>
          </div>

          <div className="contact-placeholder-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#E6EFF6',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1F3A4B',
                  fontWeight: 700
                }}
                aria-hidden="true"
              >
                ✉
              </span>
              <div>
                <strong style={{ display: 'block', color: '#1F3A4B', fontSize: '17px' }}>
                  聯絡方式建置中
                </strong>
                <span style={{ fontSize: '14px', color: '#57768A' }}>
                  正式聯絡信箱與社群管道確認後將更新於此區塊。
                </span>
              </div>
            </div>

            <a
              href="index.html"
              className="btn-back-home"
              onClick={(e) => onNavigate('index.html', e)}
            >
              <span>返回首頁</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
