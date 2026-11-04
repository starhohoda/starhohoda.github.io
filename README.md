# 星河數位文創｜品牌網站 V0.3 專案說明文件 (README)

## 一、品牌與網站定位
- **正式品牌名稱**：星河數位文創
- **網站作者筆名**：銀河霜月
- **主要標語**：「從 AI 學習到數位創作」
- **次要標語**：「讓每一次操作都成為新的可能」
- **頁首／頁尾簡短說明**：「探索工具・實作知識・創造更多可能」
- **網站定位**：AI 實戰應用、數位工具實測及效率工作教學的臺灣繁體中文知識型品牌網站。

---

## 二、網站八個正式頁面清單

| 頁面編號 | 頁面名稱 | 檔案名稱（相對路徑） | 主要內容說明 |
| :--- | :--- | :--- | :--- |
| **P01** | **首頁** | `index.html` | 夜晚銀河星光主視覺、網站介紹、三大分類入口、三篇精選教學文章、品牌理念與頁尾 |
| **P02** | **品牌故事** | `brand.html` | 品牌主視覺、「從一次學習，開始更多可能」、三大核心理念（實際操作、持續學習、創意實現）、未來願景 |
| **P03** | **作者介紹** | `author.html` | 作者「銀河霜月」介紹、三大探索領域（AI工具應用、數位知識整理、內容創作與寫作）、三階段實踐流程、作者理念引言 |
| **P04** | **文章總覽** | `articles.html` | 文章選單主視覺、三大知識主題橫向分類卡、精選教學文章預覽、新手閱讀引導 |
| **P05** | **AI實戰應用** | `articles-ai.html` | 包含 `A01｜ChatGPT 提示語入門`、`A02｜AI 回答查證與修正`、`A03｜AI 圖片生成入門` 三個圖文教學單元 |
| **P06** | **數位工具實測** | `articles-tools.html` | 包含 `B01｜Google AI Studio 網站實作`、`B02｜ChatGPT 與 Gemini 工具比較方法`、`B03｜NotebookLM 資料整理應用` 三個圖文單元（明確標註功能概覽／操作規劃／待實測） |
| **P07** | **效率工作教學** | `articles-work.html` | 包含 `C01｜AI 協助整理 Excel`、`C02｜AI 協助整理行政文件`、`C03｜AI 輔助簡報內容規劃` 三個圖文教學單元 |
| **P08** | **關於本站** | `about.html` | 網站介紹、三大內容分類、閱讀與使用提醒、3 題可展開收合之常見問題 FAQ、聯絡資訊（聯絡方式建置中） |

---

## 三、專案檔案結構

本專案同時支援 **Google AI Studio 即時預覽環境** 與 **獨立純靜態 HTML/CSS/JavaScript 部署環境**：

```text
/
├── index.html                  # P01 首頁（內含完整靜態 HTML 結構，並相容 AI Studio 預覽）
├── brand.html                  # P02 品牌故事（純靜態 HTML5）
├── author.html                 # P03 作者介紹（純靜態 HTML5）
├── articles.html               # P04 文章總覽（純靜態 HTML5）
├── articles-ai.html            # P05 AI實戰應用（純靜態 HTML5，含 #A01, #A02, #A03 錨點）
├── articles-tools.html         # P06 數位工具實測（純靜態 HTML5，含 #B01, #B02, #B03 錨點）
├── articles-work.html          # P07 效率工作教學（純靜態 HTML5，含 #C01, #C02, #C03 錨點）
├── about.html                  # P08 關於本站（純靜態 HTML5，含可展開收合 FAQ）
├── css/
│   └── style.css               # 全站統一品牌色彩變數、排版與響應式樣式表
├── js/
│   ├── articles-data.js        # 集中式文章與分類資料結構（相容 file:// 直接讀取）
│   └── main.js                 # 原生 JavaScript 導覽選單、子選單展開、Esc 關閉與焦點管理
├── assets/
│   ├── icons/
│   │   ├── logo.svg            # 原創新月、星光與環繞金色星軌 SVG Logo
│   │   ├── cat-ai.svg          # AI實戰應用分類圖示（AI 機器人與對話框）
│   │   ├── cat-tools.svg       # 數位工具實測分類圖示（筆電、工具與放大鏡）
│   │   └── cat-work.svg        # 效率工作教學分類圖示（文件、流程箭頭與圖表）
│   └── images/
│       ├── hero-home.svg       # 首頁夜晚銀河與發光書本主視覺插畫
│       ├── hero-brand.svg      # 品牌故事窗外夜空與書桌學習插畫
│       ├── brand-lake.svg      # 品牌起點星空山巒湖面插畫
│       ├── hero-author.svg     # 作者介紹「銀河霜月」原創女性創作者插畫
│       ├── hero-articles.svg   # 文章選單主視覺插畫
│       ├── hero-about.svg      # 關於本站主視覺插畫
│       ├── unit-a01.svg ~ unit-a03.svg # AI實戰應用 A01~A03 教學流程圖
│       ├── unit-b01.svg ~ unit-b03.svg # 數位工具實測 B01~B03 教學流程圖
│       └── unit-c01.svg ~ unit-c03.svg # 效率工作教學 C01~C03 教學流程圖
├── static-html/                # 100% 純靜態獨立匯出資料夾（含全部 8 個純 HTML、css、js、assets）
└── README.md                   # 本說明文件
```

---

## 四、如何預覽網站

1. **在 Google AI Studio 預覽視窗瀏覽**：
   - 直接於右側預覽畫面點擊導覽列、分類卡片、精選文章或手機版漢堡選單，即可在八個頁面與九個教學單元間切換。
2. **在本機電腦直接開啟純靜態 HTML (`file://`)**：
   - 下載專案後，可直接開啟根目錄或 `static-html/` 資料夾內的 `index.html`、`brand.html`、`articles.html` 等檔案。
   - 所有圖片、樣式與 JavaScript 皆採用相對路徑，不依賴後端伺服器或 `fetch()`，不會被瀏覽器 `file://` 安全限制阻擋。
3. **使用本機靜態伺服器預覽**：
   - 亦可於終端機執行 `npx serve static-html` 或 `python3 -m http.server 8080` 進行預覽。

---

## 五、如何新增或修改教學文章

1. **集中管理資料**：
   - 靜態資料集中記錄於 `js/articles-data.js`（以及預覽同步使用的 `src/data/articles.ts`）。
   - 每篇文章包含完整欄位：`id`（文章編號）、`title`（標題）、`category`（分類）、`summary`（摘要）、`intro`（前言）、`keyPoints`（操作重點陣列）、`exampleTitle`、`exampleText`（範例或注意事項）、`coverImage`（封面圖路徑）、`tags`（標籤）、`status`（發布狀態）、`verifiedDate`（操作驗證日期）、`updatedDate`（更新日期）、`url` 與 `anchor`（內部網址與錨點）。
2. **直接在 HTML 分類頁新增單元**：
   - 若直接編輯純靜態檔案（如 `articles-ai.html`、`articles-tools.html`、`articles-work.html`），只需複製一個 `<article id="A04" class="teaching-unit-card">...</article>` 區塊，修改其 `id`、標題、重點清單與圖片路徑，並在頁首 `.unit-jump-bar` 加入對應的 `#A04` 錨點連結即可。
   - 若在開發環境修改了 `src/data/articles.ts`，可執行 `npx tsx scripts/generateStaticSite.tsx` 自動同步重新產生所有 8 個靜態 HTML 頁面。

---

## 六、如何更換圖片與部署至靜態網站託管服務

1. **更換圖片**：
   - 將新的 `.svg`、`.png` 或 `.jpg` 圖片放入 `assets/images/`（及 `static-html/assets/images/`），並將對應 `<img>` 的 `src` 與 `alt` 替代文字更新為新圖片即可。
2. **部署至靜態網站託管服務（GitHub Pages / Cloudflare Pages / Netlify / Vercel）**：
   - **純靜態直接部署（推薦）**：直接將 `static-html/` 資料夾（或專案根目錄的 8 個 `.html`、`css/`、`js/`、`assets/`）上傳至任何靜態空間，無須設定編譯指令即可直接上線運作。
   - **使用 Vite 編譯部署**：若在支援 Node.js 的託管平台，亦可執行 `npm run build`，系統會將所有頁面與靜態資源輸出至 `dist/` 資料夾。
