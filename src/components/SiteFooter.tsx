import React from 'react';
import { BRAND_CONFIG, CATEGORIES, TOP_NAV_ITEMS } from '../data/articles';

interface SiteFooterProps {
  onNavigate: (href: string, e?: React.MouseEvent) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="sr-container">
        <div className="footer-top-grid">
          {/* 品牌識別與標語 */}
          <div>
            <a
              href="index.html"
              className="brand-identity"
              onClick={(e) => onNavigate('index.html', e)}
            >
              <img
                src="assets/icons/logo.svg"
                alt="星河數位文創標誌"
                className="brand-logo-img"
                width="44"
                height="44"
              />
              <div className="brand-text-wrap">
                <span className="brand-title">{BRAND_CONFIG.brandName}</span>
                <span className="brand-tagline-mini">{BRAND_CONFIG.miniTagline}</span>
              </div>
            </a>
            <p
              style={{
                fontSize: '14px',
                color: '#57768A',
                margin: '10px 0 0',
                maxWidth: '340px'
              }}
            >
              {BRAND_CONFIG.primarySlogan}，{BRAND_CONFIG.secondarySlogan}。
            </p>
          </div>

          {/* 網站主要連結與三大分類（分兩排呈現） */}
          <div>
            <nav className="footer-nav-links" aria-label="頁尾網站連結">
              <div className="footer-nav-row">
                {TOP_NAV_ITEMS.map((item) => (
                  <a
                    key={item.page}
                    href={item.page}
                    onClick={(e) => onNavigate(item.page, e)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="footer-nav-row">
                {CATEGORIES.map((cat) => (
                  <a
                    key={cat.id}
                    href={cat.page}
                    onClick={(e) => onNavigate(cat.page, e)}
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            </nav>
            <div style={{ marginTop: '10px', fontSize: '13.5px', color: '#57768A' }}>
              聯絡資訊：聯絡方式建置中
            </div>
          </div>

          {/* 返回首頁與返回頁首入口 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <a
              href="index.html"
              className="btn-back-home"
              onClick={(e) => onNavigate('index.html', e)}
            >
              <span>返回首頁</span>
            </a>
            <button
              type="button"
              className="btn-back-home"
              onClick={handleScrollTop}
              aria-label="返回頁面頂部"
            >
              <span>返回頁首 ↑</span>
            </button>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span>© 2026 {BRAND_CONFIG.brandName}｜知識型數位創作與 AI 應用教學網站（{BRAND_CONFIG.version}）</span>
          <span>探索工具・實作知識・創造更多可能</span>
        </div>
      </div>
    </footer>
  );
};
