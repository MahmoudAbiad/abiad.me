# Abiad SEO Plan

Companion documents: `docs/seo/PRODUCT_TRUTH.md` (facts) and `docs/seo/WEBSITE_AUDIT.md` (current state).
Status: **planning only. No pages have been built.**

Ground rules for everything below:
- Every product claim must trace to `PRODUCT_TRUTH.md`. Nothing is invented: no features, formats, prices, limits, statistics, user numbers, accuracy/speed claims, testimonials or AI model names.
- **No keyword data was available** (volume, difficulty, CPC, rankings, competitor traffic). All prioritisation here is reasoned from search intent and product fit and should be checked against Google Search Console after launch.

---

## 1. Goal

Move abiad.me from **branded discovery only** ("ما هو بوت أبيض") to **non-branded discovery**: people who have never heard of Abiad and search for what it does, such as turning a PDF into multiple-choice questions, making a quiz on Telegram, transcribing a lecture recording, or running a group quiz.

Secondary goal: make it unambiguous, to search engines and AI answer engines, that:
- **أبيض / Abiad** is an Arabic **Telegram bot** (`@AbiadQuizMakerbot`) that turns study material into **4-option multiple-choice quizzes** with a hint and an explanation per question.
- **abiad.me** is the informational website for that bot. Quizzes are **solved inside Telegram, not on the site**.
- Accepted inputs: PDF, Word (docx), PowerPoint (pptx), txt, images/albums, pasted text, audio lectures, and ready-made MCQ exams. Outputs: Telegram quiz polls, Word/PDF export with an answer key, share links, group/channel quizzes, and (for audio) transcript/summary.
- Useful for students and teachers.

## 2. Target Audience / Search Intent

| Audience | Situation | Intent type |
|---|---|---|
| Students with PDF/Word/PowerPoint lecture files | "I have this material and want to test myself" | How-to / tool: *file type → questions* |
| Students with photographed pages or recorded lectures | "I only have photos / a recording" | How-to: *image → quiz*, *audio → text/summary* |
| Teachers and tutors | Prepare practice questions, print or distribute them | Tool + output: *quiz → Word/PDF with answers* |
| Class/group/channel admins on Telegram | Run a shared quiz with a class | Tool: *group/channel quiz* |
| Language and math students | Subject-specific needs (translation to Arabic; formulas) | Problem-specific |
| People searching the category | "A Telegram bot that makes quizzes" | Category / comparison |

Notes on language:
- Arabic only. Natural, standard Arabic that matches the existing site voice. Use the words people search with, not only "كويز": **اختبار، أسئلة اختيار من متعدد، MCQ، تفريغ، تلخيص، Word، PowerPoint، PDF**.
- Spelling variants exist for Telegram (تيليجرام / تلغرام / تليجرام). The site uses "تيليجرام"; use it as the primary form and include "تلغرام" once, naturally, in the intro of the hub and group-quiz pages. This is a reasoned hypothesis, not data. Check real queries in Search Console and adjust.
- "أبيض" is also the ordinary word for "white", so always pair it with "بوت … على تيليجرام" or "Abiad".

Brand queries ("ما هو بوت أبيض") are already served by the homepage and stay its job.

## 3. Recommended Site Architecture

- **Flat directory URLs at the root**, English slugs, Arabic content, trailing slash: `/pdf-to-mcq/`, `/group-quiz/`. No `.html`. No nested `/features/…` folder: with about 11 pages a hierarchy adds nothing and lengthens URLs.
- **Homepage = brand/entity page** (what Abiad is, the student/teacher split, the Telegram/bot/site relationship, points, developer).
- **One hub-style guide page**, `/create-quiz-on-telegram/`, owns the generic "how do I make a quiz on Telegram / Telegram quiz bot" intent and links to every feature page.
- **Feature pages** (one per genuinely distinct intent) own the specific input/output intents.
- **No** separate `/students` and `/teachers` pages (the owner merged them deliberately into one section; keep it), **no** blog, **no** keyword-synonym pages, **no** English pages in this phase.
- Existing legal URLs (`/privacy-policy.html`, `/terms-of-service.html`) stay unchanged.
- Build approach (see audit constraints): a small generator or shared template so header, footer, head metadata, breadcrumbs, JSON-LD, sitemap and `llms.txt` come from one page list.

**Page template (every feature page):**
1. H1 and a 2–3 sentence direct answer: what you send, what you get, that it happens in Telegram.
2. Primary Telegram CTA (`?start=website`).
3. "How it works" for this specific input (short `<ol>`).
4. A **limits/what-is-read table specific to this feature** (verified numbers only). This is the standalone-value element that separates the page from a doorway page.
5. "What it doesn't do" (verified limitations, stated plainly).
6. 2–4 FAQ items unique to this page (visible `<details>`, no copy-paste between pages).
7. 2–3 related-page cards.
8. Bottom CTA band (existing `.cta-band`).

## 4. Page Map

Eleven pages: 7 in Phase 1, 4 in Phase 2. Intent merges are noted in "Why Separate".

| URL | Primary Intent | Topic | Title | H1 | Why Separate | Product Evidence | Internal Links | Cannibalization Risk |
|---|---|---|---|---|---|---|---|---|
| `/create-quiz-on-telegram/` | Category + how-to: "بوت تلغرام لإنشاء اختبارات", "كيف أعمل اختبار على تيليجرام" | End-to-end guide + hub to all inputs/outputs | كيف تنشئ اختباراً على تيليجرام من ملفك أو صورك \| أبيض | كيف تنشئ اختباراً على تيليجرام من مادتك الدراسية | Generic/category intent that no single input page can serve; also the link hub | §1, §2 inputs table, §3 (count, difficulty, types, hint), §4, §5, §6, §7 | In: home (hero + nav), footer, all feature pages (breadcrumb-adjacent link). Out: every feature page, points section on home, Terms | **Medium** vs homepage (see note below) |
| `/pdf-to-mcq/` | "تحويل PDF إلى أسئلة اختيار من متعدد" (merges: pdf to questions / quiz / MCQ generator) | PDF → MCQ quiz | تحويل PDF إلى أسئلة اختيار من متعدد على تيليجرام \| أبيض | حوّل ملف PDF إلى أسئلة اختيار من متعدد | PDF is the dominant study file; has its own limits (20 MB/100 pp Telegram, 100 MB/150 pp web), cache reuse, count/difficulty options | §2 PDF row + limits, §3 count/difficulty/types/hint/grounding, §5 cache | In: home inputs tile, hub, word-ppt, image, exam-to-quiz. Out: hub, word-ppt, image, export | Low (synonym queries merged here) |
| `/word-powerpoint-to-quiz/` | "توليد أسئلة من Word أو PowerPoint" (merges docx / pptx / txt) | Office/text files → quiz | توليد أسئلة من ملف Word أو PowerPoint على تيليجرام \| أبيض | أنشئ اختباراً من ملف Word أو PowerPoint | Same intent for docx and pptx (same flow); distinct from PDF because of what is and isn't read and the `.doc`/`.ppt` caveat | §2 docx (paragraphs + tables), pptx (text frames), txt, legacy doc/ppt unreadable + refund | In: home inputs tile, hub, pdf, image. Out: hub, pdf, export | Low. Token "Word" also appears on the export page (input vs output; keep wording distinct) |
| `/lecture-transcription/` | "تفريغ محاضرة صوتية إلى نص" + "تلخيص محاضرة صوتية" (merged: one flow) | Audio lecture → transcript / academic summary / Word-PDF / quiz | تفريغ وتلخيص المحاضرات الصوتية إلى نص أو اختبار \| أبيض | فرّغ محاضرتك الصوتية إلى نص ثم لخّصها أو حوّلها إلى اختبار | Non-quiz entry point; people searching transcription never type "quiz". Verified distinct outputs. Very different limits (4 h, 20 MB/250 MB, per-minute cost) | §2 audio row + next steps (summarize, export, send text, quiz), §6 audio costing/confirmation/refund, audio deleted after processing | In: home inputs tile, hub, export. Out: hub, export, pdf | Low-Med: transcription and summary are one page for now; split only if Search Console shows distinct demand |
| `/group-quiz/` | "اختبار جماعي في مجموعة/قناة تلغرام" | Group/channel quiz modes | اختبار جماعي في مجموعة أو قناة تيليجرام \| أبيض | شغّل اختباراً جماعياً في مجموعتك أو قناتك على تيليجرام | Different user (admin/teacher) and different feature surface; richest unique spec (modes, timer, pacing, admin-only) | §5 group/channel quiz, `/groupquiz`, no points deducted; §7 anonymous mode has no scoring | In: home teacher section, hub, export, share-quiz (P2). Out: hub, export, share-quiz (P2) | Low |
| `/export-quiz-word-pdf/` | "تحميل اختبار Word أو PDF مع ورقة الإجابات" | Quiz export | تحميل اختبار تيليجرام بصيغة Word أو PDF مع جدول الإجابات \| أبيض | حمّل اختبارك ملف Word أو PDF مع جدول الإجابات الصحيحة | Output-side intent (printing/distributing); three named styles, answer-key table with explanations, math as images | §4 export styles, answer key, academic Name/Date line, audio export | In: home teacher section, hub, pdf, group-quiz, lecture. Out: hub, group-quiz, pdf | Low-Med with word-ppt on the word "Word" (input vs output) |
| `/image-to-quiz/` | "إنشاء اختبار من صورة / ألبوم صور" | Images → quiz | إنشاء اختبار من صورة أو ألبوم صور على تيليجرام \| أبيض | حوّل صور الدرس إلى اختبار | Distinct input path with its own limits (10 MB single, album ≤10, web ≤50 images × 15 MB) | §2 images row, >10 images "super" mode | In: home inputs tile, hub, pdf, exam-to-quiz (P2). Out: hub, pdf, exam-to-quiz (P2) | Low |
| `/math-quiz/` | "أسئلة رياضيات بمعادلات من ملف" | Math questions with formulas | أسئلة رياضيات بمعادلات ومصفوفات داخل تيليجرام \| أبيض | أسئلة رياضيات بمعادلات واضحة داخل تيليجرام | Specific pain point (plain-text polls can't show formulas); verified image rendering | §3 math: problems/rules/theory, formulas/tables/matrices as images + letters poll; web editor for math | In: pdf, image, hub. Out: pdf, hub, export (math in exports) | Low |
| `/english-french-quiz/` | "اختبار إنجليزي أو فرنسي مع ترجمة عربية" | Language quizzes | اختبار إنجليزي أو فرنسي مع ترجمة عربية على تيليجرام \| أبيض | أنشئ اختبار لغة إنجليزية أو فرنسية، بترجمة عربية أو بلغتها الأصلية | Distinct audience (language learners) and verified option (translated vs original) | §3 English/French grammar/reading/general test; translated-to-Arabic or original | In: pdf, hub. Out: pdf, hub | Low |
| `/exam-to-quiz/` | "تحويل اختبار جاهز (PDF/صورة) إلى كويز" / "استخراج أسئلة من اختبار" | Existing MCQ exam → interactive quiz | تحويل اختبار جاهز إلى كويز تفاعلي على تيليجرام \| أبيض | حوّل اختباراً جاهزاً إلى كويز تفاعلي | Different job: digitise an existing exam instead of generating new questions | §2 ready-made exam: auto-detected; extract with original answers, or AI solves | In: pdf, image, hub. Out: pdf, image, hub | Low-Med with pdf/image on input type; keep the page about *existing questions* |
| `/share-quiz/` *(conditional)* | "مشاركة اختبار برابط" | Share link, favorites, leaderboard | مشاركة اختبار تيليجرام برابط وحفظه في المفضلة \| أبيض | شارك اختبارك برابط واحفظ ما يهمك في المفضلة | Only if enough standalone content exists (see brief). Otherwise fold into hub + group-quiz | §5 share link (no points for recipients), favorites (up to 20 sections), opt-in leaderboard (top 5), referral | In: hub, group-quiz. Out: group-quiz, hub | Medium: thin-page risk; build only if the decision rule below is met |

**Cannibalization note, homepage vs hub.** Both could attract "Telegram quiz bot" queries. Separate their jobs:
- Homepage title/H1/copy lead with the **brand** ("أبيض - منشئ كويزات ذكي") and the student/teacher framing.
- The hub leads with the **task** ("كيف تنشئ اختباراً على تيليجرام"), is written product-neutral in its first paragraph, then introduces Abiad as the way to do it, and carries the verified step-by-step.
- Do not paste the homepage "كيف يعمل" steps into the hub; the hub's steps are more detailed (options, hint, results, export).
- Review Search Console after launch; if both rank for the same query, strengthen the one that should win rather than adding a third page.

### 4.1 Page briefs

For each page: meta description, secondary terms, must-include verified facts, and must-not-claim.

**`/create-quiz-on-telegram/`** (Phase 1)
- Meta: «دليل عملي لإنشاء اختبار اختيار من متعدد على تيليجرام باستخدام بوت أبيض: ما الذي ترسله، وكيف تختار عدد الأسئلة والصعوبة، وكيف تحلّ الاختبار وتشاركه.»
- Secondary terms: بوت كويزات تيليجرام، منشئ اختبارات تيليجرام، إنشاء اختبار على تلغرام، مولّد اختبارات ذكي، كيف أعمل كويز من ملف.
- Include: one-sentence definition (bot, Telegram, quizzes solved inside Telegram, abiad.me is the info site); inputs table linking to each feature page; options (1–120 questions, easy/medium/advanced/progressive, question type by subject, free-text preference ≤150 chars); during the quiz (poll, "طلب تلميح ذكي", explanation); after (score and best score, export, share, favorites, opt-in leaderboard); points in plain words (free welcome points, free daily points, invite bonus, extra via contact; per-page costs are admin-adjustable defaults, so describe them qualitatively or label as "الافتراضي"); limitations list (MCQ with 4 options only, AI can be wrong, not for live exams per the Terms); FAQ.
- Must not claim: "unlimited"/"free forever", privacy of uploaded material (quizzes are cached centrally and may be offered to others uploading the identical file), speed, accuracy, model names, user numbers.

**`/pdf-to-mcq/`** (Phase 1)
- Meta: «أرسل ملف PDF إلى بوت أبيض على تيليجرام، واختر عدد الأسئلة (من 1 إلى 120) ومستوى الصعوبة، فيصلك اختبار اختيار من متعدد بأربعة خيارات مع تلميح وشرح لكل سؤال.»
- Secondary terms: تحويل PDF إلى أسئلة، مولّد أسئلة من PDF، إنشاء اختبار من ملف PDF، PDF إلى كويز، أسئلة من محاضرة PDF.
- Include: limits table (Telegram 20 MB / 100 pages; web upload 100 MB / 150 pages); options (count, difficulty incl. progressive, type by subject, preference text); questions are built from the uploaded content; new quizzes from the same file avoid earlier questions; cached quiz offered at reduced cost when someone already generated one for an identical file; refund on failure; AI may err.
- Must not claim: scanned-PDF/OCR quality, accuracy, speed. If asked about scans, say nothing rather than guess.

**`/word-powerpoint-to-quiz/`** (Phase 1)
- Meta: «ارفع ملف Word (docx) أو PowerPoint (pptx) أو نصاً (txt) إلى بوت أبيض على تيليجرام لتحصل على أسئلة اختيار من متعدد من نص الملف. صيغتا doc وppt القديمتان غير مدعومتين.»
- Secondary terms: تحويل بوربوينت إلى أسئلة، docx إلى اختبار، pptx إلى كويز، توليد أسئلة من ملف وورد، أسئلة من ملف نصي.
- Include: what is read (docx: paragraphs and tables; pptx: text frames only; txt: plain text); images inside Word/PowerPoint are **not** read; legacy `.doc`/`.ppt` are not parsed (the request fails and points are refunded), with the practical advice to re-save as `.docx`/`.pptx`.
- Must not claim: that slide images, charts, or text inside pictures are read; any size limit for these types (not in PRODUCT_TRUTH).

**`/lecture-transcription/`** (Phase 1)
- Meta: «ارفع تسجيل محاضرة صوتية (حتى 4 ساعات) إلى بوت أبيض على تيليجرام لتفريغه إلى نص بالعربية بلهجاتها أو الإنجليزية، ثم لخّصه أو صدّره Word وPDF أو حوّله إلى اختبار.»
- Secondary terms: تفريغ صوت إلى نص، تلخيص تسجيل محاضرة، تحويل المحاضرة الصوتية إلى كويز، تفريغ رسالة صوتية.
- Include: inputs (voice/audio message ≤20 MB in Telegram; web upload page ≤250 MB); languages (Arabic dialects, English, mixed); next steps (academic summary «تلخيص وصياغة أكاديمية», export Word/PDF, send text, create quiz); per-minute point cost shown with duration, and a confirmation of cost and upload rights **before** any deduction; partial refund if truncated; audio deleted after processing.
- Must not claim: transcription accuracy, speed, speaker separation, timestamps, or any model/provider name.

**`/group-quiz/`** (Phase 1)
- Meta: «يشغّل مشرف المجموعة أو القناة اختباراً على تيليجرام بوضع تنافسي مع ترتيب نهائي أو بوضع مجهول، مع مؤقت لكل سؤال وتحكم بوتيرة الأسئلة. تشغيل الاختبار الجماعي لا يخصم نقاطاً.»
- Secondary terms: كويز جماعي تيليجرام، مسابقة في قروب تيليجرام، اختبار في قناة تيليجرام، أمر groupquiz، اختبار للطلاب في المجموعة.
- Include: only a group/channel **admin** can start (command `/groupquiz` or the share button); modes (competitive: points and final ranking; fully anonymous: no scoring); names shown or hidden; timer none/15/30/45/60 s; pacing every 30 s / 1 / 2 / 5 min or when the timer ends; manual "end session"; no points deducted; participants' names/results are visible to group members (Terms §9).
- Must not claim: results/ranking in anonymous mode; group features working in private-chat-only commands; participant limits (none verified).

**`/export-quiz-word-pdf/`** (Phase 1)
- Meta: «صدّر اختبارك من بوت أبيض إلى Word أو PDF بثلاثة أنماط، مع جدول الإجابات الصحيحة وشرحها، لتطبعه أو توزّعه كورقة تدريب أو مراجعة.»
- Secondary terms: تحميل اختبار PDF، طباعة أسئلة اختبار، ورقة أسئلة بجدول إجابات، تصدير أسئلة تيليجرام إلى وورد.
- Include: export from the result screen or from favorites; three styles (بسيط وأنيق / عصري وملوّن / أكاديمي كلاسيكي); «جدول الإجابات الصحيحة» with explanations; academic style adds Name/Date line; math questions embedded as images; transcript/summary export from audio (link to lecture page). Frame as study/practice material, consistent with the Terms (live-exam use is prohibited).
- Must not claim: custom branding/templates, page layout control, or any format beyond Word and PDF.

**`/image-to-quiz/`** (Phase 1)
- Meta: «أرسل صورة أو ألبوم صور (حتى 10 صور في تيليجرام) إلى بوت أبيض واحصل على أسئلة اختيار من متعدد من محتواها. صفحة الرفع على الويب تقبل حتى 50 صورة.»
- Secondary terms: تحويل صورة إلى أسئلة، اختبار من صورة، ألبوم صور إلى كويز، أسئلة من صور الكتاب.
- Include: single photo ≤10 MB; album up to 10; web upload up to 50 images (≤15 MB each); larger batches use a parallel "super" mode (higher cost). Examples should say "صور صفحات الكتاب أو الملخصات".
- Must not claim: handwriting, notebook or whiteboard recognition quality, OCR accuracy.

**`/math-quiz/`** (Phase 2)
- Meta: «في أسئلة الرياضيات يعرض بوت أبيض المعادلات والجداول والمصفوفات كصور واضحة مع خيارات على شكل أحرف. اختر مسائل أو قواعد أو نظرية من ملفك أو صورك.»
- Include: why plain Telegram polls can't show formulas and what the bot does instead (question rendered as an image, answers as letters in the poll); three math question types; the web editor for fixing math questions; AI errors are more likely on complex math (Terms §6).
- Must not claim: solving accuracy, LaTeX support, step-by-step solutions.

**`/english-french-quiz/`** (Phase 2)
- Meta: «أنشئ اختباراً للغة الإنجليزية أو الفرنسية: قواعد أو قراءة أو اختباراً عاماً، واختر أن تظهر الأسئلة مترجمة إلى العربية أو بلغتها الأصلية.»
- Include: three question types for English/French; the two content options; Latin-script options in an RTL context (`.ltr` isolate).
- Must not claim: other languages, proficiency levels (CEFR), pronunciation/speaking.

**`/exam-to-quiz/`** (Phase 2)
- Meta: «إذا كان لديك اختبار أسئلته اختيار من متعدد، يتعرف عليه بوت أبيض ويتيح لك استخراجه مع أجوبته الأصلية أو أن يحلّه الذكاء الاصطناعي، ثم تحلّه كاختبار تفاعلي.»
- Include: auto-detection from PDF/image/text; the user's choice between original answers and AI-solved answers; AI-solved answers can be wrong; framing = digitising past papers/practice tests.
- Must not claim: an "extract all questions" mode (listed as not implemented), correctness of AI-solved answers. **Do not target "solve my exam"-style queries**: the Terms prohibit live-exam use and cheating.

**`/share-quiz/`** (Phase 2, conditional)
- Build only if the page can stand alone with: how share links work (`?start=share_<id>`, usable by any user, opening a shared or favorite quiz deducts no points), favorites sections (up to 20, search/sort/export), opt-in leaderboard (top 5, private by default, shows real names), ratings/edit permissions. If that reads as thin, fold into the hub and group-quiz.
- Meta (draft): «شارك اختبارك من بوت أبيض برابط يفتحه أي مستخدم على تيليجرام دون خصم نقاط، واحفظ اختباراتك في أقسام المفضلة.»

## 5. Topic Clusters

Only clusters with at least two real pages are formed; the rest stay standalone.

| Cluster | Pages | Role |
|---|---|---|
| **Create from your material** | hub `/create-quiz-on-telegram/` + `/pdf-to-mcq/`, `/word-powerpoint-to-quiz/`, `/image-to-quiz/`, `/exam-to-quiz/` (P2) | The core "input → quiz" journey. Hub is the entry; PDF is the strongest leaf |
| **Subject-specific (Phase 2)** | `/math-quiz/`, `/english-french-quiz/` | Link from the PDF/image pages; each is a niche entry point for a distinct need |
| **Use and distribute** | `/group-quiz/`, `/export-quiz-word-pdf/`, `/share-quiz/` (P2, conditional) | What you do after the quiz exists |
| **Standalone** | `/lecture-transcription/` | Audio → text is a different job from quiz creation; links into the hub and export but needs no cluster |

Deliberately **not** made into clusters: "Arabic study tools" (generic, would produce weak pages) and "Telegram quiz tools" (that is the hub page itself).

## 6. Internal Linking Plan

**Principle:** few, descriptive, contextual links. No link lists longer than about six items.

**Homepage links out to**
- The hub, from the hero secondary link or the "كيف يعمل" section ("دليل إنشاء اختبار على تيليجرام").
- The expanded "ما الذي يمكنك إرساله؟" section: tile links to `/pdf-to-mcq/`, `/word-powerpoint-to-quiz/`, `/image-to-quiz/`, `/lecture-transcription/` (and `/math-quiz/` in Phase 2).
- The teacher-use area: `/group-quiz/` and `/export-quiz-word-pdf/`.
- Existing legal and support links unchanged.

**Between feature pages (related-page cards, 2–3 each; no all-to-all linking)**

| From | Related cards |
|---|---|
| pdf-to-mcq | word-powerpoint-to-quiz, image-to-quiz, export-quiz-word-pdf |
| word-powerpoint-to-quiz | pdf-to-mcq, image-to-quiz |
| image-to-quiz | pdf-to-mcq, (P2) exam-to-quiz |
| lecture-transcription | export-quiz-word-pdf, pdf-to-mcq |
| group-quiz | export-quiz-word-pdf, (P2) share-quiz |
| export-quiz-word-pdf | group-quiz, pdf-to-mcq |
| (P2) math-quiz | pdf-to-mcq, image-to-quiz |
| (P2) english-french-quiz | pdf-to-mcq, word-powerpoint-to-quiz |
| (P2) exam-to-quiz | pdf-to-mcq, image-to-quiz |

Every feature page also links to the hub in its intro or breadcrumb area, and the hub links to all feature pages in context (inputs table, outputs section).

**Breadcrumbs:** two levels, `الرئيسية › <page name>`, on every feature page and the hub. They match the real URL depth, so no fake hierarchy. Mirror them in `BreadcrumbList` JSON-LD (see §9).

**CTA placement:** (1) sticky header button (already exists); (2) primary button right after the direct-answer paragraph; (3) one inline CTA after the "how it works" steps if the page is long; (4) closing `.cta-band`. Always `https://t.me/AbiadQuizMakerbot?start=website`, same wording «ابدأ على تيليجرام».

**Header nav:** keep it short and add one item pointing to the guide, e.g. `كيف يعمل · الدليل · طالب أو معلّم · النقاط · عن المطوّر`. Anchor links must become `/#how` etc. so they work from feature pages.

**Footer:** keep utility links (Home, Terms, Privacy, Support) and add a compact "دليل الاستخدام" group of at most six links: hub, PDF, Word/PowerPoint, images, audio, group quiz. No full-site link dump.

**Link text:** descriptive Arabic anchors that match the target's topic ("تحويل PDF إلى أسئلة اختيار من متعدد"), varied naturally; avoid repeating an identical exact-match anchor everywhere.

## 7. Homepage Recommendations

Keep the visual identity, demo sheet and tone. Targeted content changes only:

1. **Define the product once, clearly, near the top.** One visible sentence: «أبيض - منشئ كويزات ذكي» is an Arabic Telegram bot (`@AbiadQuizMakerbot`) that turns files, images, text and lecture recordings into multiple-choice quizzes; the quiz is solved inside Telegram; abiad.me is the bot's website.
2. **Fix the main meta description** (grammar and punctuation) and widen it to the verified inputs. Draft: «"أبيض - منشئ كويزات ذكي" بوت على تيليجرام يحوّل ملفات PDF وWord وPowerPoint والصور والنصوص وتسجيلات المحاضرات إلى اختبارات اختيار من متعدد، للطلاب والمعلمين.» Consider adding "اختبارات اختيار من متعدد" to the `<title>` as well, keeping the brand first.
3. **Expand "ما الذي يمكنك إرساله؟"** to include Word/PowerPoint/txt and ready-made exams, with each tile linking to its feature page.
4. **Add a short "ماذا تحصل عليه" block:** 4 options + hint + explanation per question; Word/PDF export with answer key; share links; group/channel quiz. Each links to its page.
5. **Add a visible FAQ (5–6 items)**, each answer short and verified: Is it free? (free welcome and daily points with limits; do not say unlimited) · What file types? (including that `.doc`/`.ppt` are not supported) · How many questions? (1–120) · Can I solve quizzes on the website? (no, inside Telegram) · Are my uploads private? (do **not** say yes; link to the privacy policy, and note that quizzes may be reused for identical files) · Can the answers be wrong? (yes, AI-generated; check them).
6. **Resolve the claim conflicts in the audit:** reword the teacher "صفحة تعديل" claim (editing is via replying "." to a quiz poll; math has a web editor), qualify group-quiz results (competitive mode only), reword "صور الدفتر أو السبورة", and confirm the recharge channel.
7. **Stats section:** remove it, or (if the owner wants to keep it) connect a verified live source and show an "as of" date. Fix the 14,406 vs 14,431 mismatch at minimum. Not an SEO driver; it is a trust/accuracy risk.
8. **Make the teacher content visible without JavaScript** and give it a proper heading, while keeping the merged student/teacher section the owner chose.
9. **Name the entity relationships explicitly** in visible text: أبيض / Abiad (the product) · `@AbiadQuizMakerbot` (where it runs) · abiad.me (this site) · `@AbiadSupportBot` (support) · the updates channel · developer Mahmoud Abiad.
10. Change `index.html` links to `/`.

## 8. Technical SEO Plan

| Area | Recommendation |
|---|---|
| **sitemap.xml** | Add every new URL. Set `lastmod` per page from its real last content change (not one shared date). No `priority`/`changefreq`. Generate from the page list so it cannot drift. Keep the legal pages. Submit in Search Console. |
| **robots.txt** | Current file is fine (allow all, declares sitemap, explicit AI-crawler allowances). No changes needed unless the owner wants to restrict any crawler. Do not block `/assets/`. |
| **Canonical URLs** | Self-referencing absolute canonical on every page, trailing-slash form (`https://abiad.me/pdf-to-mcq/`). Homepage canonical stays `https://abiad.me/`. Internal links use the same canonical forms (`/`, `/slug/`). |
| **Page-specific metadata** | Unique `<title>` and `<meta name="description">` per page (drafts in §4). One H1 per page. `<html lang="ar" dir="rtl">`, `og:locale ar_AR`. |
| **Open Graph / Twitter** | Per-page `og:title`, `og:description`, `og:url`, `og:type=website`, `og:site_name`; reuse the existing 1200×630 `og-image.jpg` with its alt text. Add `twitter:title/description/image` (and `twitter:image:alt`) to every page including the legal ones. Per-page OG images are optional and later. |
| **Structured data** | See §9. |
| **Breadcrumbs** | Visible `<nav aria-label="مسار التنقل">` with an `<ol>`, plus matching `BreadcrumbList` JSON-LD. |
| **Semantic HTML** | `main` > `section` with `aria-labelledby`; `ol` for steps; `dl` or table for limits; real `<table>` with `<caption>` and `<th scope>` for specs (wrapped in the existing `.table-scroll`); native `<details>/<summary>` for FAQ (works without JS); keep skip-link and landmarks; keep `.ltr` isolates for Latin terms. |
| **Internal linking** | As in §6. Root-absolute paths. No `index.html` links. |
| **URLs and assets** | Directory URLs; root-absolute `/assets/…`; fix existing pages to match. |
| **llms.txt** | Add the new pages under "الروابط الرئيسية" with one plain-language sentence each. Keep claims identical to page content. Generate from the same page list. |
| **404** | Add `404.html` (`noindex`, link home and to the hub) if hosting supports a custom 404. |
| **Performance** | No new third-party scripts, no extra font weights, no images by default. Optionally resize `MahmoudAbiad.jpeg`. |
| **Analytics** | Extend the GoatCounter `where()` helper to include the page slug so bot-CTA clicks can be attributed per page (the `start` parameter cannot do this; `website` is the only whitelisted value). |
| **Measurement** | Confirm Search Console is verified for abiad.me. After Phase 1 ships, review queries and impressions per page, then use real query data to decide Phase 2 and any page splits/merges. |

## 9. Structured Data Plan

Principle: JSON-LD must mirror visible content exactly, and only describe things that are true.

| Where | Types | Notes |
|---|---|---|
| **Homepage** | `WebSite`, `Person`, `SoftwareApplication` (keep all three, linked by `@id`) | Edit `SoftwareApplication`: `url` → `https://abiad.me/`; add `installUrl` → `https://t.me/AbiadQuizMakerbot`; add `sameAs` for the bot and channel; add a `featureList` that matches the visible "what you get" block word for word; keep `applicationCategory: EducationalApplication`, `operatingSystem: Telegram`, `inLanguage: ar`. |
| **Feature pages and hub** | `BreadcrumbList` (required); optionally a minimal `WebPage` with `isPartOf` → `#website` and `about` → `#app` | Reference the existing entities by `@id`; do not duplicate the whole `SoftwareApplication` on every page. |
| **Pages with a visible FAQ** | `FAQPage` (optional, low priority) | Only if the exact questions and answers are visible. Google restricts FAQ rich results to a narrow set of sites, so no SERP benefit should be expected; it remains valid semantic markup. Do not add it just for crawlers. |
| **Legal pages** | None needed | |

**Do not use:** `Review`, `AggregateRating`, `Offer`/`offers` (pricing is points-based and admin-adjustable), `HowTo` (deprecated by Google), user counts, statistics, or fake `Course`/`Quiz` markup.
**`Organization`:** only if there is a real legal entity or brand entity the owner wants to declare. Today the publisher is a `Person` (Mahmoud Abiad) and the Terms refer to "إدارة منصة أبيض", so do not invent an organization, address or logo claims. Ask the owner.
No rich-result eligibility is expected from this markup; its purpose is entity clarity.

## 10. Implementation Priority

No numeric scores; ordering is by intent value, uniqueness of content, and how well the product facts support the page.

### Phase 0: prerequisites (not pages, do first)
- Resolve the High/Med items in `WEBSITE_AUDIT.md` that touch claims: stats block, payment/recharge wording, teacher "edit page" wording, image-claim wording.
- Decide the build approach (generator or templates), create the shared layout, move existing pages to root-absolute paths and `/` links.
- Add the small CSS block (breadcrumb, related cards, FAQ, spec table) without changing existing selectors.
- Update GoatCounter helper, nav, footer, sitemap and `llms.txt` generation.
- Owner decisions: stats, recharge channel, hosting confirmation, Search Console access.

### Phase 1: highest priority (7 pages)
Suggested build order:
1. `/pdf-to-mcq/` (strongest single intent; sets the page template)
2. `/create-quiz-on-telegram/` (hub; needs the template and links to the rest)
3. `/word-powerpoint-to-quiz/`
4. `/lecture-transcription/`
5. `/group-quiz/`
6. `/export-quiz-word-pdf/`
7. `/image-to-quiz/`

Then update the homepage (§7), add related-links and footer/nav links, regenerate sitemap and `llms.txt`.

### Phase 2: later expansion (4 pages)
- `/math-quiz/`, `/english-french-quiz/`, `/exam-to-quiz/`: build after Phase 1, once Search Console shows which Phase 1 pages get impressions and which queries appear.
- `/share-quiz/`: conditional; build only if it meets the standalone-content rule in §4.1, otherwise fold into the hub and group-quiz.
- Possible later splits: separate "تلخيص محاضرة صوتية" from `/lecture-transcription/` only if query data shows separate demand; no page for pricing/points unless real queries justify it (fixed numbers there would go stale).

### Content QA checklist for every page before it ships
- Each factual sentence maps to a `PRODUCT_TRUTH.md` line.
- Natural Arabic, RTL preserved, Latin terms isolated.
- Contains the page's unique limits table and a "what it doesn't do" section.
- No repeated paragraphs from other pages; FAQ items unique.
- No keyword stuffing, no AI filler, no exaggerated claims; no "unlimited", "free forever", "private", accuracy, speed, user numbers, or model names.
- Telegram CTA present; breadcrumb, canonical, unique title/description, JSON-LD validated.
- Framed for study and practice, consistent with the Terms.
