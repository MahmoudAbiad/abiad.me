# Website Audit

Scope: every public file in the repo (`index.html`, `privacy-policy.html`, `terms-of-service.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `CNAME`, `assets/*`). The site is 3 HTML pages, so nothing was sampled.
Source of truth for product facts: `docs/seo/PRODUCT_TRUTH.md`. No live-site, Search Console or analytics data was available; findings come from the code only.

Severity tags: **[High]** fix before or with the first SEO pages · **[Med]** fix in Phase 1 · **[Low]** opportunistic.

---

## Current Architecture

- **Static site, no build step.** Hand-written HTML + one CSS file (`assets/style.css`, ~20 KB, unminified) + one JS file (`assets/script.js`, ~17 KB, vanilla). No framework, no bundler, no package.json.
- **Hosting (inferred, not confirmed):** a `CNAME` file containing `abiad.me` plus an `origin` remote at `github.com/MahmoudAbiad/abiad.me` strongly suggest GitHub Pages with a custom domain. Confirm in the repo's Pages settings before relying on it (it affects clean-URL behavior, 404 handling and headers).
- **Files:** `index.html` (single-page site with anchors `#how #audience #points #about`), `privacy-policy.html`, `terms-of-service.html`, `llms.txt`, `robots.txt`, `sitemap.xml`.
- **URL structure:** flat, with `.html` extensions on the legal pages. No subdirectories yet.
- **Header, footer, JSON-LD and `<head>` metadata are copy-pasted per file.** There are no includes or templates.
- **Asset paths are relative** (`assets/style.css?v=6`, `index.html`). They work today only because every page sits at the root. Pages in subfolders would break unless paths become root-absolute (`/assets/...`).
- **Cache busting is manual** via `?v=N` query strings (CSS v6, JS v7, images v2–v4).
- **Third-party requests:** Google Fonts (Aref Ruqaa + IBM Plex Sans Arabic, 6 weights total), GoatCounter (`gc.zgo.at`, async). Nothing else.
- **Design system (reusable):** CSS variables (`--pen`, `--ink`, `--mist`, `--hl`…), `.wrap`, `.section`, `.section--mist`, `.section__title/__lede`, `.btn--pen/--line/--quiet/--sm`, `.btn-row`, `.steps/.step`, `.uses` (definition-list rows), `.inputs` (icon-less list cards), `.split`, `.callout/.notice`, `.cta-band`, `.table-scroll`, `.doc/.clause` (long-form legal typography), `.sheet/.opts` (the demo quiz card), `.skip-link`, `.ltr` (bidi isolate). Responsive breakpoints at 599/800/900/960 px, `prefers-reduced-motion` handled.
- **Missing components SEO pages will need:** breadcrumb, "related pages" card row, FAQ block (native `<details>` is enough), limits/spec table styling, a page hero without the demo sheet.
- **Maintainability verdict:** fine for 3 pages, error-prone for 10+. See Constraints for the recommended approach.

## What Is Already Good

- Clean, valid-looking semantic skeleton: `lang="ar" dir="rtl"`, skip link, `header/nav/main/footer`, `aria-label`s, single `<h1>`, logical H2/H3 order on the homepage.
- RTL handled properly: logical CSS properties (`inset-inline`, `margin-inline`), `.ltr` isolates for Latin text (`@Abiadd`, email), `<bdi dir="ltr">` on numbers, `opt--ltr` for Latin quiz options, tab arrow-key logic is RTL-aware.
- Mobile/responsive: viewport meta, mobile menu, `max-width: 599px` sheet fallback, 48 px tap targets on buttons.
- Accessibility: real `<button>`s, `aria-expanded`, tablist semantics, `aria-live` feedback, focus-visible styles, decorative images use `alt=""`, content images have Arabic alt text.
- Canonical tags are present, absolute, and correct on all 3 pages. Open Graph is complete on the homepage (including 1200×630 image, `og:image:alt`, dimensions). OG image exists and is correctly sized.
- `robots.txt` allows everything and declares the sitemap. `sitemap.xml` is valid and lists all 3 pages.
- `llms.txt` exists, is accurate, and states the product in one sentence.
- JSON-LD on the homepage is factual and contains no fake ratings, offers or counts.
- Bot links all carry `?start=website`, the only whitelisted start source.
- Click tracking via GoatCounter is cookieless and already distinguishes header/section/footer placement.
- Performance basics: tiny page weight, below-the-fold images lazy-loaded with explicit `width/height`, `preconnect` for fonts, JS at end of body.
- **No broken internal links, anchors or asset references** (checked programmatically across all 3 pages). **No orphan pages** (all 3 are linked from the homepage footer/body).

## Technical SEO Problems

1. **[High] The homepage is the only indexable content page.** No page exists for any non-branded intent. Everything else in this audit is secondary to that.
2. **[Med] Homepage `<meta name="description">` is malformed.** It starts with "هو بوت…" (a sentence fragment), and the list is punctuated `PDF ,الصور ,النصوص` (Latin commas, misplaced spaces, a missing `و`). The OG and Twitter descriptions are written correctly; only the main meta description is broken. It also omits Word/PowerPoint.
3. **[Med] Internal links point to `index.html`** (brand link, footer, legal pages) while the canonical is `/`. Both `/` and `/index.html` resolve, which creates a duplicate URL that only the canonical tag papers over. Link to `/` instead.
4. **[Med] Relative asset and page paths** (`assets/…`, `terms-of-service.html`) will break on any page not at the root. New pages must use root-absolute paths, and existing pages should be moved to them for consistency.
5. **[Med] Sitemap is minimal:** all three `lastmod` values are the same date (`2026-09-29`), so they carry no signal. `lastmod` should reflect each file's real last content change. (No `priority`/`changefreq` needed.)
6. **[Low] Twitter/X metadata is thin on the legal pages** (`twitter:card` only; no `twitter:title/description/image`) and lacks `twitter:image:alt` everywhere. Platforms fall back to OG, so impact is small.
7. **[Med] Structured data gaps (homepage):**
   - `SoftwareApplication.url` points to `t.me/…`, an external domain, which separates the entity from abiad.me. Better: `url` = `https://abiad.me/`, `installUrl` = the bot link, `sameAs` = bot + channel.
   - No `featureList`, so the verified capabilities are not machine-readable.
   - `publisher` is a `Person`. That is honest if there is no legal entity; do not invent an `Organization` (see SEO_PLAN §9).
   - No `BreadcrumbList` (not needed until more pages exist).
8. **[Low] No custom `404.html`.** GitHub Pages serves a generic 404 (confirm hosting first). Add a simple one with `noindex` and links home.
9. **[Low] Favicon is 64×64 PNG with no `/favicon.ico`.** Google recommends icon sizes that are multiples of 48 px. Low impact.
10. **[Low] Performance risks from the current implementation:**
    - Google Fonts stylesheet is render-blocking, with two families and six weights loaded. Consider self-hosting or trimming weights; not urgent at this page size.
    - `MahmoudAbiad.jpeg` is 799×800 / ~99 KB but displayed at 260 px. Lazy-loaded, but could be resized (~20–30 KB saving).
    - The stats count-up animation and the demo quiz run on load. Cheap, but both are above/near the fold on the homepage.
11. **[Low] Manual `?v=` cache busters** are easy to forget when a shared CSS/JS file changes across many pages. A generator (below) can compute them.

## Content Problems

1. **[High] The homepage never uses the words people search with.** Occurrence counts in visible homepage text: "اختيار من متعدد" 0, "MCQ" 0, "PowerPoint" 0, "docx" 0, "تفريغ" 0, "تلخيص" 0, "ترجمة" 0, "تلميح" 0, "ورقة/جدول الإجابات" 0, "Word" 1, "اختبار" 2. The page speaks almost entirely in the single word "كويز" (15×). That works for people who already know the term and misses the verified intents in PRODUCT_TRUTH §10.
2. **[High] Verified inputs and outputs are under-described.** The homepage lists PDF, images, text, audio, math, but not Word, PowerPoint or `.txt`, not the 4-options/hint/explanation format, not the answer-key export, not the question count range, difficulty levels, English/French translation choice, or ready-made-exam extraction. Search engines (and AI answer engines) cannot learn what the product does from content that is not there.
3. **[Med] The product is never defined in one plain sentence near the top that also states the Telegram/abiad.me/bot relationship.** The hero says "بوت على تيليجرام" (good) but never says that quizzes are solved inside Telegram, not on this website, nor that abiad.me is the informational site.
4. **[Med] Brand ambiguity.** "أبيض" is also the ordinary Arabic word for "white". Titles carry the full name (good), but body copy often uses bare "أبيض". Every key page should pair it with "بوت … على تيليجرام" or "Abiad".
5. **[Med] Hidden teacher content.** Teacher use-cases live in a `hidden` tab panel. Without JavaScript the tab buttons do nothing and the teacher panel is never visible. Search engines that render JS will see it, but hidden-tab content may be weighted less (not verified). The teacher content also has no heading of its own, so the page has no "for teachers" H2/H3 to rank for.
6. **[Med] No FAQ content anywhere.** The questions people actually ask (free? which file types? is `.doc` supported? are my files private? how many questions?) are unanswered on any page.
7. **[Low] Register inconsistency.** Terms of service are in formal MSA; the privacy policy is largely in Levantine dialect (e.g. "بيستخدم", "منشئها", "هالسياسة"). Not an SEO blocker, but it reads as unpolished and legal pages are what users land on when they check trust.
8. **[Low] Thin/duplicate content:** nothing is duplicated across pages except boilerplate (header, footer). The legal pages are long-form and appropriate. There are no doorway pages. No existing SEO landing pages or FAQs exist.

## Internal Linking Problems

- Homepage nav is anchors only (`#how #audience #points #about`). It links to no secondary page, so internal links carry no topical signal.
- Legal pages' nav is `الرئيسية / شروط / خصوصية`; the homepage nav is different. The two nav sets are inconsistent, and neither can accommodate feature pages without redesign decisions.
- Footer links: Home, Terms, Privacy, Support. No product/feature links.
- Link text is generic ("الرئيسية", "الدعم الفني"). Fine for utility links, but new feature pages will need descriptive anchors.
- Links to `index.html` (not `/`) create the duplicate-URL issue above.
- External link hygiene: `target="_blank"` links use `rel="noopener"` or `noopener noreferrer` (fine). Email address case differs between pages (`Mahmoud.abiad…` vs `mahmoud.abiad…`); harmless but should be unified.
- GoatCounter's `where()` helper labels clicks by `section[id]` or `page`. On feature pages that would collapse everything to `page`; it needs a page-slug prefix to be useful (see Constraints).

## Product-Truth Conflicts

Checked all visible copy, JSON-LD, `llms.txt` and the legal pages against `PRODUCT_TRUTH.md`.

| # | Where | What the site says | PRODUCT_TRUTH says | Severity |
|---|---|---|---|---|
| 1 | Homepage `#stats` | "575 طالب وطالبة سجّلوا في البوت" and "14,406 سؤال ولّده البوت", plus a note that numbers update automatically | User counts/statistics must not be stated (no code basis). Also internally inconsistent: visible text 14,406 vs `data-value="14431"` (the animation ends on a different number than the no-JS text), `data-stats-url=""` is empty so nothing actually auto-updates, and "طالب وطالبة" ignores that teachers use the bot | **High** |
| 2 | ToS §2 and §4 | "وسائل الدفع المعتمدة في البوت"; paid packages to "معالجة ملفات أكبر حجماً" | No payment gateway in code; recharge is manual via `@abiadd`. File-size limits are not tied to paid tiers anywhere in the verified facts | **Med** (also contradicts the privacy policy, which correctly says there is no in-bot payment gateway) |
| 3 | Homepage `#points`, `llms.txt`, legal pages | Extra balance via the **support bot** `@AbiadSupportBot` | Recharge is manual via contact `@abiadd` | **Med** (owner must confirm which channel is current; the support bot may legitimately forward) |
| 4 | Homepage teacher tab | "صفحة تعديل تتيح لك مراجعة نص السؤال وإجاباته" | Editing is done by replying "." to a quiz poll (owner/admin only); only math has a web editor | **Med** |
| 5 | Homepage teacher tab | Group quiz: "تظهر النتائج للمشاركين في المجموعة" | True for competitive mode only; anonymous mode has no scoring. Only a group/channel admin can start it | **Low-Med** |
| 6 | Homepage inputs + teacher tab | "صور الدفتر أو السبورة أو الصفحات المصوّرة", "صور السبورة", "مع استخراج النص تلقائياً" | OCR/scanned/handwriting quality has no code basis: do not state | **Low-Med** (reword to "صور صفحات الكتاب أو الملخصات"; do not promise board/notebook accuracy) |
| 7 | Homepage audio mentions | Recordings are uploaded "عبر صفحة ويب"; privacy policy says only via the web upload page | Audio is also accepted as a Telegram voice/audio message (20 MB); the web page is for larger files (250 MB). Incomplete rather than wrong | **Low** |
| 8 | Privacy §5 | Uploaded **files** (not only recordings) are "deleted immediately after" processing | Only audio deletion is verified. Also, generated quizzes are cached centrally by file hash and offered to anyone uploading an identical file; the policy mentions "كاش" but never explains the cross-user reuse | **Med** (verify with the owner; do not make "private" claims on SEO pages) |
| 9 | Privacy §4, ToS §10 | Names Google Gemini and Groq as processors | Model names are admin-configurable; Groq fallback is unverified. These are legal disclosures, not marketing copy, but SEO pages must not repeat them | **Low** (verify before the next legal update) |
| 10 | Homepage meta/JSON-LD/hero | "اختباراً قصيراً", "كويزات تفاعلية" | Consistent with product (1–120 questions, polls). No conflict | — |

Not conflicts but worth knowing: the demo quiz card is an invented example question and is correctly labeled "مثال توضيحي". No speed, accuracy, pricing figure, testimonial or AI model name appears on the public homepage, which is good.

## Opportunities

- **Entire non-branded surface is open.** Every verified intent in PRODUCT_TRUTH §10 currently has zero pages.
- **Existing design system covers ~85% of what new pages need** (hero text, `.steps`, `.uses`, `.inputs`, `.callout`, `.cta-band`, `.table-scroll`). Only breadcrumbs, related-links, FAQ and a spec table need new CSS.
- **Verified differentiators that competitors' generic pages likely cannot honestly claim** (competitor content was not checked; this is a hypothesis): group/channel quiz with admin control and anonymous mode, Word/PDF export with an answer-key table in 3 styles, math formulas rendered as images, audio lecture → transcript/summary/quiz, ready-made exam extraction, Arabic-first with English/French translation choice.
- **Honest limitations are a trust asset.** Stating "no `.doc`/`.ppt`, text only, 4-option MCQ only, quizzes are solved in Telegram" on the relevant pages will satisfy searchers' second question and avoid support load.
- **Homepage can become the brand/entity page** while feature pages own the generic intents.
- `llms.txt` and the explicit AI-crawler allowances in `robots.txt` are already in place; they just need new URLs.
- GoatCounter is already wired for bot-click attribution by placement; extending it per page will show which pages convert to Telegram opens.

## Constraints for Implementation

1. **URL form:** use directory URLs (`/pdf-to-mcq/` → `pdf-to-mcq/index.html`). Works on GitHub Pages and most static hosts without config, gives clean trailing-slash canonicals, and avoids `.html` in new URLs. Leave the existing legal `.html` URLs as they are (do not break indexed URLs); optionally add redirects later only if hosting supports it.
2. **Paths:** all new pages must use root-absolute `/assets/…` and `/…/` links. Update the 3 existing pages in the same pass.
3. **Do not hand-copy the header/footer/JSON-LD into 10 more files.** Recommended: a small dependency-free generator (e.g. `scripts/build.py`) that takes a per-page data file or front-matter and a shared layout, and writes the static HTML into the repo. Output stays committed, so GitHub Pages deploys with no workflow change. Alternative if the owner prefers zero tooling: Jekyll layouts/includes (GitHub Pages builds Jekyll natively, but that changes how every file is processed, so test first). Whichever is chosen, `sitemap.xml`, `llms.txt`, per-page `<head>` metadata and JSON-LD should be generated from the same page list so they cannot drift.
4. **CSS/JS:** keep a single `style.css`; append a small, clearly marked block for breadcrumb/related/FAQ/spec-table. Do not modify existing selectors. Keep `script.js` backward compatible: every feature block already no-ops when its elements are absent. Add a page-slug prefix in the GoatCounter `where()` helper and add the new nav hrefs to its tracking regex.
5. **Navigation change needed:** the sticky header currently has 4 anchor links. Any new nav item must stay short (mobile menu is a stacked list). Prefer 1–2 new items rather than a dropdown (no JS menu logic exists).
6. **Bot CTA:** always `https://t.me/AbiadQuizMakerbot?start=website`. This is the only whitelisted start source, so per-page attribution must come from GoatCounter events, not from the `start` parameter.
7. **Fonts/perf:** do not add more font weights or new third-party scripts. New pages should add no images by default (text + existing design elements); if images are used, give explicit dimensions and alt text.
8. **Content integrity:** every claim on new pages must trace to a line in `PRODUCT_TRUTH.md`. Do not copy limits/prices that are admin-adjustable (points defaults, per-page costs) onto pages as fixed numbers without a visible "as of" or "defaults" qualifier; fixed technical limits (file sizes, page counts, 1–120 questions, 4 options) are safer.
9. **Language:** all pages Arabic (`lang="ar" dir="rtl"`). Keep `.ltr` isolates for Latin tokens like PDF/Word/PowerPoint in running text where bidi punctuation breaks.
10. **Open owner decisions before implementation:** (a) what to do with the homepage stats (remove, or connect a verified live source); (b) confirm the credit/recharge channel (`@abiadd` vs support bot); (c) confirm hosting (GitHub Pages?); (d) whether Search Console is already verified for abiad.me.
