/**
 * 星河數位文創 V0.3｜共用互動腳本 (js/main.js)
 * 負責純靜態 HTML 頁面的：
 * 1. 手機版漢堡導覽選單開啟、關閉、遮罩點擊、Esc 關閉與焦點還原
 * 2. 手機版「文章選單」文字連結與右側箭頭展開子分類的獨立控制
 * 3. 電腦版「文章選單」下拉選單點擊與鍵盤控制
 * 4. 頁面捲動鎖定與返回頁首功能
 */
(function () {
  function initStaticNavigation() {
    // 若 React SPA 已接管當前頁面的互動，避免重複綁定事件
    if (window.__STAR_RIVER_REACT_MOUNTED__) {
      return;
    }

    var mobileTrigger = document.getElementById('mobile-menu-trigger');
    var mobileOverlay = document.getElementById('mobile-nav-overlay');
    var mobileCloseBtn = document.getElementById('mobile-close-btn');
    var mobileSubmenuToggle = document.getElementById('mobile-submenu-toggle');
    var mobileSubmenuWrap = document.getElementById('mobile-submenu-wrap');

    var desktopDropdownToggle = document.getElementById('desktop-dropdown-toggle');
    var desktopDropdownMenu = document.getElementById('desktop-dropdown-menu');

    function openMobileMenu() {
      if (!mobileOverlay || !mobileTrigger) return;
      mobileOverlay.classList.add('is-open');
      mobileOverlay.setAttribute('aria-hidden', 'false');
      mobileTrigger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      if (mobileCloseBtn) {
        mobileCloseBtn.focus();
      }
    }

    function closeMobileMenu(restoreFocus) {
      if (!mobileOverlay || !mobileTrigger) return;
      var wasOpen = mobileOverlay.classList.contains('is-open');
      mobileOverlay.classList.remove('is-open');
      mobileOverlay.setAttribute('aria-hidden', 'true');
      mobileTrigger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      if (wasOpen && restoreFocus) {
        mobileTrigger.focus();
      }
    }

    function toggleMobileSubmenu(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (!mobileSubmenuToggle || !mobileSubmenuWrap) return;
      var isExpanded = mobileSubmenuToggle.getAttribute('aria-expanded') === 'true';
      var nextState = !isExpanded;
      mobileSubmenuToggle.setAttribute('aria-expanded', String(nextState));
      if (nextState) {
        mobileSubmenuWrap.classList.add('is-open');
      } else {
        mobileSubmenuWrap.classList.remove('is-open');
      }
    }

    function closeDesktopDropdown(restoreFocus) {
      if (!desktopDropdownToggle || !desktopDropdownMenu) return;
      var wasOpen = desktopDropdownMenu.classList.contains('is-open');
      desktopDropdownMenu.classList.remove('is-open');
      desktopDropdownToggle.setAttribute('aria-expanded', 'false');
      if (wasOpen && restoreFocus) {
        desktopDropdownToggle.focus();
      }
    }

    function toggleDesktopDropdown(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (!desktopDropdownToggle || !desktopDropdownMenu) return;
      var isExpanded = desktopDropdownToggle.getAttribute('aria-expanded') === 'true';
      var nextState = !isExpanded;
      desktopDropdownToggle.setAttribute('aria-expanded', String(nextState));
      if (nextState) {
        desktopDropdownMenu.classList.add('is-open');
      } else {
        desktopDropdownMenu.classList.remove('is-open');
      }
    }

    if (mobileTrigger) {
      mobileTrigger.addEventListener('click', function () {
        var isOpen = mobileOverlay && mobileOverlay.classList.contains('is-open');
        if (isOpen) {
          closeMobileMenu(true);
        } else {
          openMobileMenu();
        }
      });
    }

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', function () {
        closeMobileMenu(true);
      });
    }

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', function (e) {
        if (e.target === mobileOverlay) {
          closeMobileMenu(true);
        }
      });

      var overlayLinks = mobileOverlay.querySelectorAll('a[href]');
      for (var i = 0; i < overlayLinks.length; i++) {
        overlayLinks[i].addEventListener('click', function () {
          closeMobileMenu(false);
        });
      }
    }

    if (mobileSubmenuToggle) {
      mobileSubmenuToggle.addEventListener('click', toggleMobileSubmenu);
    }

    if (desktopDropdownToggle) {
      desktopDropdownToggle.addEventListener('click', toggleDesktopDropdown);
    }

    document.addEventListener('click', function (e) {
      if (desktopDropdownMenu && desktopDropdownToggle) {
        var target = e.target;
        if (!desktopDropdownMenu.contains(target) && !desktopDropdownToggle.contains(target)) {
          closeDesktopDropdown(false);
        }
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (mobileOverlay && mobileOverlay.classList.contains('is-open')) {
          e.preventDefault();
          closeMobileMenu(true);
        }
        if (desktopDropdownMenu && desktopDropdownMenu.classList.contains('is-open')) {
          e.preventDefault();
          closeDesktopDropdown(true);
        }
      }
    });

    // 5. 文章選單頁：標題與內容關鍵字即時過濾功能 (純靜態 HTML 頁面專用)
    var searchInput = document.getElementById('article-search-input');
    var articlesGrid = document.getElementById('filterable-articles-grid');
    var searchStatus = document.getElementById('article-search-status');
    var searchEmpty = document.getElementById('article-search-empty');
    var searchEmptyText = document.getElementById('article-search-empty-text');
    var searchResetBtn = document.getElementById('article-search-reset-btn');
    var listHeading = document.getElementById('articles-list-heading');
    var quickTagBtns = document.querySelectorAll('[data-search-keyword]');

    if (searchInput && articlesGrid) {
      var cards = articlesGrid.querySelectorAll('.article-preview-card');

      function applySearchFilter(rawQuery) {
        var trimmed = (rawQuery || '').trim();
        var lower = trimmed.toLowerCase();
        var terms = lower ? lower.split(/\s+/).filter(Boolean) : [];
        var isSearching = terms.length > 0;
        var matchCount = 0;

        for (var i = 0; i < cards.length; i++) {
          var card = cards[i];
          var isFeatured = card.getAttribute('data-featured') === 'true';
          var searchable = (card.getAttribute('data-searchable') || '').toLowerCase();

          var visible = false;
          if (!isSearching) {
            visible = isFeatured;
          } else {
            visible = true;
            for (var t = 0; t < terms.length; t++) {
              if (searchable.indexOf(terms[t]) === -1) {
                visible = false;
                break;
              }
            }
          }

          if (visible) {
            card.classList.remove('is-hidden-by-search');
            if (isSearching) matchCount++;
          } else {
            card.classList.add('is-hidden-by-search');
          }
        }

        if (listHeading) {
          var spans = listHeading.querySelectorAll('span');
          if (spans.length > 1) {
            spans[1].textContent = isSearching ? '文章搜尋結果' : '精選教學文章';
          }
        }

        if (searchStatus) {
          searchStatus.textContent = isSearching
            ? '搜尋「' + trimmed + '」：共找到 ' + matchCount + ' 篇教學單元'
            : '目前顯示 3 篇精選教學（輸入關鍵字可搜尋全部 9 個教學單元）';
        }

        if (searchEmpty) {
          if (isSearching && matchCount === 0) {
            searchEmpty.classList.remove('is-hidden-by-search');
            if (searchEmptyText) {
              searchEmptyText.textContent = '找不到符合「' + trimmed + '」的教學文章';
            }
          } else {
            searchEmpty.classList.add('is-hidden-by-search');
          }
        }

        for (var k = 0; k < quickTagBtns.length; k++) {
          var btn = quickTagBtns[k];
          var kw = (btn.getAttribute('data-search-keyword') || '').toLowerCase();
          if (isSearching && kw === lower) {
            btn.classList.add('is-active');
          } else {
            btn.classList.remove('is-active');
          }
        }
      }

      searchInput.addEventListener('input', function (e) {
        applySearchFilter(e.target.value);
      });

      for (var j = 0; j < quickTagBtns.length; j++) {
        quickTagBtns[j].addEventListener('click', function () {
          var kw = this.getAttribute('data-search-keyword') || '';
          if (searchInput.value.trim().toLowerCase() === kw.toLowerCase()) {
            searchInput.value = '';
          } else {
            searchInput.value = kw;
          }
          applySearchFilter(searchInput.value);
          searchInput.focus();
        });
      }

      if (searchResetBtn) {
        searchResetBtn.addEventListener('click', function () {
          searchInput.value = '';
          applySearchFilter('');
          searchInput.focus();
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStaticNavigation);
  } else {
    initStaticNavigation();
  }
})();
