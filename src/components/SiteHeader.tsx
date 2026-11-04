import React, { useEffect, useRef, useState } from 'react';
import {
  BRAND_CONFIG,
  CATEGORIES,
  PageId,
  TOP_NAV_ITEMS
} from '../data/articles';
import { isTopNavActive } from '../utils/siteLogic';

interface SiteHeaderProps {
  currentPage: PageId;
  onNavigate: (href: string, e?: React.MouseEvent) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  currentPage,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(true);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileCloseBtnRef = useRef<HTMLButtonElement>(null);
  const desktopDropdownWrapRef = useRef<HTMLDivElement>(null);
  const desktopDropdownToggleRef = useRef<HTMLButtonElement>(null);

  // 進入新頁面時確保浮層導覽與下拉選單恢復關閉狀態
  useEffect(() => {
    setMobileMenuOpen(false);
    setDesktopDropdownOpen(false);
    document.body.classList.remove('menu-open');
  }, [currentPage]);

  // 手機選單開啟時禁止背景捲動，並將焦點移至關閉按鈕
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open');
      setTimeout(() => {
        mobileCloseBtnRef.current?.focus();
      }, 20);
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [mobileMenuOpen]);

  // 支援按下 Esc 關閉手機浮層選單與電腦版下拉選單，並還原焦點
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) {
          e.preventDefault();
          setMobileMenuOpen(false);
          mobileTriggerRef.current?.focus();
        }
        if (desktopDropdownOpen) {
          e.preventDefault();
          setDesktopDropdownOpen(false);
          desktopDropdownToggleRef.current?.focus();
        }
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        desktopDropdownOpen &&
        desktopDropdownWrapRef.current &&
        !desktopDropdownWrapRef.current.contains(e.target as Node)
      ) {
        setDesktopDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen, desktopDropdownOpen]);

  const handleCloseMobileMenu = (restoreFocus = true) => {
    setMobileMenuOpen(false);
    if (restoreFocus) {
      setTimeout(() => {
        mobileTriggerRef.current?.focus();
      }, 10);
    }
  };

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    setDesktopDropdownOpen(false);
    onNavigate(href, e);
  };

  const renderMobileNavIcon = (page: PageId) => {
    switch (page) {
      case 'index.html':
        return (
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'brand.html':
        return (
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2V4zm20 0h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8V4z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'author.html':
        return (
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
          </svg>
        );
      case 'articles.html':
        return (
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <line x1="8" y1="8" x2="16" y2="8" strokeLinecap="round" />
            <line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round" />
            <line x1="8" y1="16" x2="13" y2="16" strokeLinecap="round" />
          </svg>
        );
      case 'about.html':
        return (
          <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="11" x2="12" y2="16" strokeLinecap="round" />
            <circle cx="12" cy="8" r="0.8" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        跳至主要內容
      </a>

      <header className="site-header">
        <div className="sr-container header-inner">
          {/* 左側：原創新月星軌 Logo 與品牌名稱 */}
          <a
            href="index.html"
            className="brand-identity"
            onClick={(e) => handleNavClick('index.html', e)}
            aria-label={`${BRAND_CONFIG.brandName} 首頁`}
          >
            <img
              src="assets/icons/logo.svg"
              alt="星河數位文創 新月與金色星軌標誌"
              className="brand-logo-img"
              width="46"
              height="46"
            />
            <div className="brand-text-wrap">
              <span className="brand-title">{BRAND_CONFIG.brandName}</span>
              <span className="brand-tagline-mini">{BRAND_CONFIG.miniTagline}</span>
            </div>
          </a>

          {/* 右側：電腦版水平導覽選單 */}
          <nav className="desktop-nav" aria-label="主導覽選單">
            {TOP_NAV_ITEMS.map((item) => {
              const active = isTopNavActive(item.page, currentPage);

              if (item.hasSubmenu) {
                return (
                  <div
                    key={item.page}
                    className="nav-item-group"
                    ref={desktopDropdownWrapRef}
                  >
                    <a
                      href={item.page}
                      className={`nav-link ${active ? 'is-active' : ''}`}
                      aria-current={currentPage === item.page ? 'page' : undefined}
                      onClick={(e) => handleNavClick(item.page, e)}
                    >
                      {item.label}
                    </a>
                    <button
                      type="button"
                      id="desktop-dropdown-toggle"
                      ref={desktopDropdownToggleRef}
                      className="desktop-dropdown-toggle"
                      aria-label="展開或收合文章選單子分類"
                      aria-expanded={desktopDropdownOpen}
                      aria-controls="desktop-dropdown-menu"
                      onClick={() => setDesktopDropdownOpen((prev) => !prev)}
                    >
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div
                      id="desktop-dropdown-menu"
                      className={`desktop-dropdown-menu ${desktopDropdownOpen ? 'is-open' : ''}`}
                      role="region"
                      aria-label="文章選單第二層分類"
                    >
                      {CATEGORIES.map((cat) => (
                        <a
                          key={cat.id}
                          href={cat.page}
                          className={`dropdown-sublink ${currentPage === cat.page ? 'is-active' : ''}`}
                          aria-current={currentPage === cat.page ? 'page' : undefined}
                          onClick={(e) => handleNavClick(cat.page, e)}
                        >
                          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <span
                              className="dropdown-sublink-dot"
                              style={{
                                backgroundColor:
                                  cat.id === 'ai'
                                    ? '#8FB8D8'
                                    : cat.id === 'tools'
                                    ? '#E9C86A'
                                    : '#8CC0A1'
                              }}
                              aria-hidden="true"
                            />
                            {cat.name}
                          </span>
                          <span aria-hidden="true">›</span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={item.page}
                  href={item.page}
                  className={`nav-link ${active ? 'is-active' : ''}`}
                  aria-current={currentPage === item.page ? 'page' : undefined}
                  onClick={(e) => handleNavClick(item.page, e)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* 右側：手機版三條線漢堡選單按鈕 */}
          <button
            type="button"
            id="mobile-menu-trigger"
            ref={mobileTriggerRef}
            className="mobile-menu-trigger"
            aria-label={mobileMenuOpen ? '關閉網站導覽選單' : '開啟網站導覽選單'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-overlay"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <line x1="3.5" y1="6.5" x2="20.5" y2="6.5" strokeLinecap="round" />
              <line x1="3.5" y1="12" x2="20.5" y2="12" strokeLinecap="round" />
              <line x1="3.5" y1="17.5" x2="20.5" y2="17.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* 手機版浮層導覽選單（預設關閉，不遮擋任何內容） */}
      <div
        id="mobile-nav-overlay"
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleCloseMobileMenu(true);
          }
        }}
      >
        <nav
          className="mobile-nav-panel"
          aria-label="手機版網站導覽選單"
        >
          <div className="mobile-panel-header">
            <a
              href="index.html"
              className="brand-identity"
              onClick={(e) => handleNavClick('index.html', e)}
            >
              <img
                src="assets/icons/logo.svg"
                alt="星河數位文創標誌"
                className="brand-logo-img"
                width="48"
                height="48"
              />
              <div className="brand-text-wrap">
                <span className="brand-title">{BRAND_CONFIG.brandName}</span>
                <span className="brand-tagline-mini">{BRAND_CONFIG.miniTagline}</span>
              </div>
            </a>

            <button
              type="button"
              id="mobile-close-btn"
              ref={mobileCloseBtnRef}
              className="mobile-close-btn"
              aria-label="關閉選單"
              onClick={() => handleCloseMobileMenu(true)}
            >
              ×
            </button>
          </div>

          <ul className="mobile-nav-list">
            {TOP_NAV_ITEMS.map((item) => {
              const active = isTopNavActive(item.page, currentPage);

              if (item.hasSubmenu) {
                return (
                  <li key={item.page} className="mobile-nav-item">
                    <div className="mobile-nav-row">
                      {/* 文字本身可前往文章總覽頁 */}
                      <a
                        href={item.page}
                        className={`mobile-nav-link ${active ? 'is-active' : ''}`}
                        onClick={(e) => handleNavClick(item.page, e)}
                      >
                        {renderMobileNavIcon(item.page)}
                        <span>{item.label}</span>
                      </a>

                      {/* 右側箭頭按鈕專門控制第二層分類展開與收合 */}
                      <button
                        type="button"
                        id="mobile-submenu-toggle"
                        className="mobile-submenu-toggle"
                        aria-label={mobileSubmenuOpen ? '收合文章子分類' : '展開文章子分類'}
                        aria-expanded={mobileSubmenuOpen}
                        aria-controls="mobile-submenu-wrap"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setMobileSubmenuOpen((prev) => !prev);
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                          <path
                            d="M5 7.5L10 12.5L15 7.5"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>

                    <div
                      id="mobile-submenu-wrap"
                      className={`mobile-submenu-wrap ${mobileSubmenuOpen ? 'is-open' : ''}`}
                    >
                      <div className="mobile-submenu-card">
                        {CATEGORIES.map((cat) => (
                          <a
                            key={cat.id}
                            href={cat.page}
                            className="mobile-sublink"
                            onClick={(e) => handleNavClick(cat.page, e)}
                          >
                            <span className="mobile-sublink-left">
                              <img
                                src={cat.icon}
                                alt=""
                                aria-hidden="true"
                                className="mobile-sublink-thumb"
                              />
                              <span>{cat.name}</span>
                            </span>
                            <span aria-hidden="true" style={{ color: '#57768A' }}>›</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.page} className="mobile-nav-item">
                  <div className="mobile-nav-row">
                    <a
                      href={item.page}
                      className={`mobile-nav-link ${active ? 'is-active' : ''}`}
                      onClick={(e) => handleNavClick(item.page, e)}
                    >
                      {renderMobileNavIcon(item.page)}
                      <span>{item.label}</span>
                    </a>
                    <span aria-hidden="true" style={{ color: '#57768A', paddingRight: '8px' }}>
                      ›
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mobile-panel-footer">
            <span className="mobile-contact-status">
              <span aria-hidden="true">✦</span>
              <span>聯絡方式建置中｜探索工具・實作知識</span>
            </span>
          </div>
        </nav>
      </div>
    </>
  );
};
