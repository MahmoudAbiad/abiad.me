# Abiad Product Truth

Source: bot repo, branch `master`, read-only analysis of actual code (README/docs not treated as authoritative).
Bot: `t.me/AbiadQuizMakerbot` · Support: `t.me/AbiadSupportBot` · Channel: `t.me/abiadquizmaker`
Website CTA should link with `?start=website` (the only whitelisted start source, `handlers/start.py`).

## 1. Product Definition
An Arabic-language Telegram bot that turns study material (files, images, text, audio lectures) into AI-generated multiple-choice quizzes. Every question has 4 options, a hint and an explanation. Quizzes are played inside Telegram as quiz polls. Usage is paid in "points" (free daily points + purchasable).

## 2. Verified Inputs
| Input | How received | Limits / notes | Evidence |
|---|---|---|---|
| PDF | Telegram document; or web upload page | Telegram: 20 MB, 100 pages. Web page: 100 MB, 150 pages | `handlers/files.py`, `constants.py` |
| Word `.docx` | Telegram document / web page | Text only (paragraphs + tables); images inside not read | `utils.py::extract_text_from_file` |
| PowerPoint `.pptx` | same | Text frames only | `utils.py` |
| `.txt` | same | Plain text | `utils.py` |
| Legacy `.doc` / `.ppt` | accepted by upload picker | NOT parsed: request fails ("unreadable"), points refunded | `utils.py`, `services/quiz_service.py`, `handlers/files.py` |
| Images | single photo (10 MB), album up to 10; web page up to 50 images (15 MB each) | >10 images use "super" parallel mode | `handlers/files.py`, `constants.py` |
| Direct text | message | 30 to 8,000 characters | `handlers/files.py` |
| Audio lecture | voice/audio message (20 MB) or web page (250 MB) | Max 4 hours; Arabic dialects, English, mixed; priced per minute | `handlers/audio.py`, `constants.py`, `services/audio_service.py` |
| Ready-made exam (MCQ document) | auto-detected from PDF/image/text | User picks: extract with original answers, or AI solves | `constants.py`, `handlers/files.py`, `services/subject_classifier.py` |

Audio next steps: summarize ("تلخيص وصياغة أكاديمية"), export Word/PDF, send text, or create quiz (`handlers/audio.py`). Audio files are deleted after processing (local + temp storage).

## 3. Verified Quiz / Question Features
- **Count:** 1 to 120 questions (`constants.py`, `validators.py`).
- **Question type by subject:** math (problems / rules / theory), English & French (grammar / reading / general test), other subjects (2 to 4 AI-suggested types); also "متنوع" (diverse) or free-text "تفضيل خاص" (max 150 chars) (`constants.py`, `handlers/quiz_options.py`).
- **Difficulty:** easy, medium, advanced, progressive (easy→hard). Difficulty does not change price (`helpers/points_calculator.py`).
- **English/French content:** user chooses translated-to-Arabic or original language only.
- **Math:** questions rendered as images (formulas, tables, matrices) + letters poll (`services/image_quiz_renderer.py`, `services/quiz_engine.py`).
- **Hint:** "💡 طلب تلميح ذكي" button during the quiz (`handlers/quiz_runner.py`).
- **Variety:** option order shuffled; new quizzes from the same file avoid earlier questions (`services/quiz_service.py`).
- **Source grounding:** prompts restrict questions to the uploaded content (`constants.py`).
- **Subject auto-classification** plus optional community vote to confirm it (feature-flagged).

## 4. Verified Outputs / Export
- In-chat Telegram quiz polls with explanation; result screen with score/percentage and best score.
- **Word (.docx) and PDF** export from result screen or favorites, 3 styles: بسيط وأنيق / عصري وملوّن / أكاديمي كلاسيكي.
- Exports include "جدول الإجابات الصحيحة" (answer key with explanations); academic style adds Name/Date line; math questions embedded as images (`handlers/export.py`, `services/export_service.py`).
- Audio transcript/summary export to Word or PDF.
- Share link `t.me/<bot>?start=share_<id>`.

## 5. Verified User Features
- **Sharing:** link works for any user; opening a shared or favorite quiz deducts no points (`handlers/start.py`, `handlers/sharing.py`, `handlers/favorites.py`).
- **Group / channel quiz:** `/groupquiz` or share button; only group/channel admin can start. Modes: competitive (points + final ranking) or fully anonymous (no scoring). Names shown/hidden. Timer none/15/30/45/60 s. Pacing every 30 s / 1 / 2 / 5 min or when timer ends. Manual "end session". No points deducted (`handlers/group_quiz.py`, `keyboards.py`).
- **Favorites:** "المفضلة المنظمة", up to 20 sections, search, sort, open, export, remove.
- **Leaderboard:** top 5 per quiz; opt-in, private by default; shows real first/last names.
- **Ratings/feedback:** 👍/👎 and free-text note to admins.
- **Editing:** reply "." to a quiz poll to edit question/answers (owner or admin only); math has a web editor. Owner/admin can delete a quiz.
- **Quiz cache (central, cross-user):** keyed by SHA-256 of file bytes. Anyone uploading an identical file is offered existing quizzes at 10% of the price, with type/difficulty filters, sorted by rating. Per-file cap: max(2, min(5, pages//15)) quizzes per type+difficulty combination. Text input is not cached (`helpers/supabase_helper/quiz_cache.py`, `handlers/files.py`).
- **Referral:** invite link; referrer rewarded after invitee's first successful generation (`helpers/supabase_helper/users.py`).

## 6. Limits / Points / Access Rules
- Defaults (admin-adjustable in DB): welcome 100 points, daily free renewal 50, referral bonus 50 (`helpers/settings_helper.py`).
- Documents: 1 pt/page up to 15 pages, 1.5 after. Questions: 1 pt each up to 30, 1.5 after. Images: 1 pt each. "Super" (>35 PDF pages or >10 images): (items + questions) × 1.5. Cached quiz: 10% of full price (`helpers/points_calculator.py`).
- Audio: 1 pt/min first 10 min, 1.5 after; user must confirm duration/cost and rights before any deduction; partial refund if truncated.
- Points deducted before generation and refunded automatically on failure.
- Recharge is manual via contact `@abiadd` (UI text: "prices start from 0.5$"). No payment gateway in code.
- Most commands work in private chat only.

## 7. Important Limitations
- Multiple-choice with 4 options only (no true/false, short answer, essay).
- No legacy `.doc`/`.ppt`; images inside Word/PowerPoint not read.
- Telegram poll limits: long questions fall back to text; options cut at 100 chars; explanations at 200.
- Anonymous group mode has no scoring.
- Quizzes are taken inside Telegram, not on the website.
- Free use is capped by daily points: do not claim "unlimited" or "free forever".
- Generated quizzes are stored centrally and reusable by others with the same file: do not claim uploaded material/quizzes are private.

## 8. Unverified Claims
- Automatic removal of poorly rated quizzes (UI message says so): vote logic is a DB function not in repo; only sort-by-score and manual deletion are visible.
- Daily renewal reset-vs-add: DB function not in repo (a code comment says free points are zeroed daily).
- "Extract all questions" option: listed as to-do in `CURRENT_STATE.md`, not implemented.
- Groq fallback for text generation (README): not fully read.
- `/help` and interactive tutorial: `handlers/tutorial.py` exists but is not registered; docs say it was deleted. Treat as unavailable.
- Scanned-PDF / OCR quality, accuracy claims, user counts, speed: no code basis; do not state.
- AI model names are admin-configurable at runtime; do not cite specific models.

## 9. Product Terminology
كويز، اختبار، توليد، نقاط (مجانية / مدفوعة)، لوحة الشرف، المفضلة المنظمة، أقسام، طلب تلميح ذكي، تحميل الكويز (Word/PDF)، جدول الإجابات الصحيحة، متنوع، تفضيل خاص، سهل / متوسط / متقدم / متدرج، كويز جاهز بخصم 90%، كويز جماعي، تنافسي، مجهول بالكامل، تفريغ محاضرة، تلخيص وصياغة أكاديمية، استخراج الاختبار وأجوبته كما هي، شارك واربح. Welcome copy: "بوت الكويزات الذكي".

## 10. SEO-Relevant Search Intents (verified features only)
- تحويل PDF إلى أسئلة اختيار من متعدد
- بوت تلغرام لإنشاء اختبارات
- توليد أسئلة من ملف PowerPoint أو Word (docx)
- إنشاء اختبار من صورة / ألبوم صور
- تفريغ محاضرة صوتية إلى نص
- تلخيص محاضرة صوتية
- تحميل اختبار Word أو PDF مع ورقة الإجابات
- اختبار جماعي في مجموعة أو قناة تلغرام
- أسئلة رياضيات بمعادلات من ملف
- اختبار إنجليزي أو فرنسي مع ترجمة عربية
- استخراج أسئلة من اختبار جاهز
- مشاركة اختبار برابط

## 11. Code Evidence Index
| Claim | Files |
|---|---|
| Entry, deep links, start source | `main.py`, `handlers/start.py` |
| Input types, limits | `handlers/files.py`, `handlers/audio.py`, `constants.py`, `utils.py`, `webapp/upload_hub.html` |
| Legacy doc/ppt unreadable + refund | `utils.py`, `services/quiz_service.py`, `handlers/files.py` |
| Subject/type/difficulty/exam extraction | `constants.py`, `keyboards.py`, `handlers/quiz_options.py`, `services/subject_classifier.py` |
| Polls, hint, math images | `services/quiz_engine.py`, `services/image_quiz_renderer.py`, `helpers/gemini_helper.py` |
| Export styles, answer key | `handlers/export.py`, `services/export_service.py` |
| Share, favorites, leaderboard, ratings | `handlers/sharing.py`, `handlers/favorites.py`, `handlers/leaderboard.py`, `helpers/supabase_helper/leaderboard.py`, `helpers/supabase_helper/feedback.py` |
| Group/channel quiz | `handlers/group_quiz.py`, `services/group_quiz_store.py`, `services/group_permissions.py`, `keyboards.py` |
| Cache by file hash | `helpers/supabase_helper/quiz_cache.py`, `handlers/files.py` |
| Points, renewal, referral | `helpers/points_calculator.py`, `helpers/settings_helper.py`, `helpers/supabase_helper/users.py` |
| Quiz edit/delete permissions | `services/quiz_permissions.py`, `handlers/quiz_runner.py` |
| Tutorial unreachable | `main.py`, `handlers/__init__.py`, `handlers/tutorial.py` |
