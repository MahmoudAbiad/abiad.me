/* أبيض - سلوك الموقع: قائمة الجوال، ورقة الاختبار التوضيحية، فهرس الصفحات القانونية */
(function () {
  'use strict';

  /* ---------- قائمة الجوال ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (menuBtn && nav) {
    var setMenu = function (open) {
      nav.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  /* ---------- ورقة الاختبار التوضيحية ---------- */
  var demo = document.getElementById('demo');
  if (demo) {
    var QUESTIONS = [
      {
        subject: 'الأحياء',
        text: 'ما العضية المسؤولة عن إنتاج الطاقة في الخلية؟',
        options: ['النواة', 'الميتوكوندريا', 'الريبوسوم', 'جهاز غولجي'],
        answer: 1,
        why: 'تنتج الميتوكوندريا معظم طاقة الخلية (ATP) عبر التنفس الخلوي.'
      },
      {
        subject: 'الكيمياء',
        text: 'ما الرمز الكيميائي لعنصر الصوديوم؟',
        options: ['Na', 'K', 'Ca', 'Cl'],
        answer: 0,
        ltr: true,
        why: 'رمز الصوديوم Na مأخوذ من اسمه اللاتيني Natrium.'
      },
      {
        subject: 'الفيزياء',
        text: 'ما وحدة قياس القوة في النظام الدولي للوحدات؟',
        options: ['الجول', 'النيوتن', 'الواط', 'الباسكال'],
        answer: 1,
        why: 'النيوتن هو القوة التي تكسب كتلة 1 كغ تسارعاً مقداره 1 م/ث².'
      }
    ];
    var LETTERS = ['أ', 'ب', 'ج', 'د'];
    var SVG_NS = 'http://www.w3.org/2000/svg';

    var elSubject = document.getElementById('q-subject');
    var elCount = document.getElementById('q-count');
    var elText = document.getElementById('q-text');
    var elOpts = document.getElementById('q-opts');
    var elFeedback = document.getElementById('q-feedback');
    var elNext = document.getElementById('q-next');
    var current = 0;

    var icon = function (kind) {
      var svg = document.createElementNS(SVG_NS, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '3');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      svg.setAttribute('aria-hidden', 'true');
      var path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', kind === 'ok' ? 'M5 12.5l4.5 4.5L19 7.5' : 'M6 6l12 12M18 6L6 18');
      svg.appendChild(path);
      return svg;
    };

    var setMark = function (btn, kind) {
      var mark = btn.querySelector('.opt__mark');
      mark.textContent = '';
      mark.appendChild(icon(kind));
    };

    var render = function () {
      var q = QUESTIONS[current];
      elSubject.textContent = q.subject;
      elCount.textContent = 'سؤال ' + (current + 1) + ' من ' + QUESTIONS.length;
      elText.textContent = q.text;
      elFeedback.textContent = '';
      elFeedback.className = 'sheet__feedback';
      elOpts.textContent = '';
      q.options.forEach(function (label, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'opt' + (q.ltr ? ' opt--ltr' : '');
        b.setAttribute('data-i', String(i));
        var mark = document.createElement('span');
        mark.className = 'opt__mark';
        mark.setAttribute('aria-hidden', 'true');
        mark.textContent = LETTERS[i];
        var text = document.createElement('span');
        text.className = 'opt__text';
        text.textContent = label;
        if (q.ltr) text.setAttribute('dir', 'ltr');
        b.appendChild(mark);
        b.appendChild(text);
        elOpts.appendChild(b);
      });
    };

    var answer = function (btn) {
      var q = QUESTIONS[current];
      var picked = Number(btn.getAttribute('data-i'));
      var buttons = elOpts.querySelectorAll('.opt');
      var right = picked === q.answer;
      buttons.forEach(function (b) { b.disabled = true; });
      var rightBtn = buttons[q.answer];
      rightBtn.classList.add('is-right');
      setMark(rightBtn, 'ok');
      if (!right) {
        btn.classList.add('is-wrong');
        setMark(btn, 'x');
      }
      elFeedback.textContent = '';
      var head = document.createElement('strong');
      head.textContent = right ? 'إجابة صحيحة' : 'إجابة خاطئة، الصحيح: ' + q.options[q.answer];
      elFeedback.appendChild(head);
      elFeedback.appendChild(document.createTextNode(q.why));
      elFeedback.className = 'sheet__feedback ' + (right ? 'is-right' : 'is-wrong');
    };

    elOpts.addEventListener('click', function (e) {
      var btn = e.target.closest('.opt');
      if (btn && !btn.disabled && elOpts.contains(btn)) answer(btn);
    });
    elNext.addEventListener('click', function () {
      current = (current + 1) % QUESTIONS.length;
      render();
    });
    render();
  }

  /* ---------- فهرس صفحات الشروط والخصوصية ---------- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.doc__toc a[href^="#"]'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var sections = Object.keys(byId)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
    var activate = function (id) {
      tocLinks.forEach(function (a) { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
      if (byId[id]) { byId[id].classList.add('is-active'); byId[id].setAttribute('aria-current', 'true'); }
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) activate(en.target.id); });
    }, { rootMargin: '-90px 0px -65% 0px', threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
    if (sections.length) activate(sections[0].id);
  }

  /* ---------- تبويبات "طالب أو معلّم" ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (root) {
    var list = root.querySelector('[role="tablist"]');
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    if (!list || !tabs.length) return;
    var panelOf = function (t) { return document.getElementById(t.getAttribute('aria-controls')); };
    var panels = tabs.map(panelOf).filter(Boolean);
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var canAnimate = !!(document.body.animate) && !reduce;
    var rtl = getComputedStyle(root).direction === 'rtl';

    root.classList.add('tabs--js');

    /* المؤشر المنزلق خلف التبويب المحدد */
    var thumb = document.createElement('span');
    thumb.className = 'tabs__thumb';
    thumb.setAttribute('aria-hidden', 'true');
    list.insertBefore(thumb, list.firstChild);

    var current = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];

    var placeThumb = function () {
      thumb.style.width = current.offsetWidth + 'px';
      thumb.style.height = current.offsetHeight + 'px';
      thumb.style.transform = 'translate(' + current.offsetLeft + 'px,' + current.offsetTop + 'px)';
    };
    placeThumb();
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { thumb.classList.add('is-ready'); });
    });
    window.addEventListener('resize', function () {
      thumb.style.transition = 'none';
      placeThumb();
      requestAnimationFrame(function () { thumb.style.transition = ''; });
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        thumb.style.transition = 'none';
        placeThumb();
        requestAnimationFrame(function () { thumb.style.transition = ''; });
      });
    }

    /* لفّ اللوحات داخل حاوية لتحريك الارتفاع بسلاسة */
    var stage = document.createElement('div');
    stage.className = 'tabs__stage';
    panels[0].parentNode.insertBefore(stage, panels[0]);
    panels.forEach(function (p) { stage.appendChild(p); });

    var running = [];
    var settle = function () {
      running.forEach(function (a) { try { a.cancel(); } catch (e) {} });
      running = [];
      stage.style.height = '';
      stage.style.overflow = '';
      tabs.forEach(function (t) {
        var p = panelOf(t);
        if (p) { p.hidden = t !== current; p.style.opacity = ''; p.style.transform = ''; }
      });
    };

    var setSelected = function (tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
      });
    };

    var select = function (tab, focus) {
      if (tab === current) { if (focus) tab.focus(); return; }
      var oldTab = current;
      var dir = tabs.indexOf(tab) > tabs.indexOf(oldTab) ? 1 : -1;
      var dx = (rtl ? -1 : 1) * dir * 18;   /* اتجاه الحركة يتبع اتجاه التبويبات على الشاشة */
      settle();
      current = tab;
      setSelected(tab);
      placeThumb();
      if (focus) tab.focus();

      var oldPanel = panelOf(oldTab), newPanel = panelOf(tab);
      if (!canAnimate || !oldPanel || !newPanel) { settle(); return; }

      var h0 = stage.offsetHeight;
      stage.style.height = h0 + 'px';
      stage.style.overflow = 'hidden';
      var out = oldPanel.animate(
        [{ opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: 'translateX(' + (-dx) + 'px)' }],
        { duration: 130, easing: 'ease-in', fill: 'forwards' }
      );
      running = [out];
      out.onfinish = function () {
        oldPanel.hidden = true;
        out.cancel();
        newPanel.hidden = false;
        var h1 = newPanel.offsetHeight;
        var grow = stage.animate([{ height: h0 + 'px' }, { height: h1 + 'px' }],
          { duration: 300, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' });
        var fadeIn = newPanel.animate(
          [{ opacity: 0, transform: 'translateX(' + dx + 'px)' }, { opacity: 1, transform: 'translateX(0)' }],
          { duration: 300, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }
        );
        stage.style.height = h1 + 'px';
        running = [grow, fadeIn];
        grow.onfinish = function () { settle(); };
      };
    };

    tabs.forEach(function (t) {
      t.addEventListener('click', function () { select(t, false); });
      t.addEventListener('keydown', function (e) {
        var i = tabs.indexOf(t);
        var next = rtl ? 'ArrowLeft' : 'ArrowRight';
        var prev = rtl ? 'ArrowRight' : 'ArrowLeft';
        var target = null;
        if (e.key === next) target = tabs[(i + 1) % tabs.length];
        else if (e.key === prev) target = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') target = tabs[0];
        else if (e.key === 'End') target = tabs[tabs.length - 1];
        if (target) { e.preventDefault(); select(target, true); }
      });
    });
  });

  /* ---------- إحصائيات البوت ---------- */
  var statsRoot = document.querySelector('[data-stats]');
  if (statsRoot) {
    var fmt = function (n) { return Number(n).toLocaleString('en-US'); };
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var statEls = {};
    statsRoot.querySelectorAll('[data-stat]').forEach(function (el) { statEls[el.getAttribute('data-stat')] = el; });

    var animateTo = function (el, target, animate) {
      el.setAttribute('data-value', String(target));
      if (!animate || reduce) { el.textContent = fmt(target); return; }
      var start = null, dur = 1300;
      var step = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(target);
      };
      requestAnimationFrame(step);
    };

    var played = false;
    var playIntro = function () {
      if (played) return;
      played = true;
      Object.keys(statEls).forEach(function (k) {
        animateTo(statEls[k], Number(statEls[k].getAttribute('data-value')), true);
      });
    };
    if ('IntersectionObserver' in window && !reduce) {
      var so = new IntersectionObserver(function (entries) {
        if (entries.some(function (en) { return en.isIntersecting; })) { so.disconnect(); playIntro(); }
      }, { threshold: 0.4 });
      so.observe(statsRoot);
    }

    /* جلب الأرقام الحية إن حُدِّد رابط في data-stats-url، وإلا تبقى الأرقام المكتوبة في الصفحة */
    var url = statsRoot.getAttribute('data-stats-url');
    var valid = function (v) { return typeof v === 'number' && isFinite(v) && v >= 0 && v < 1e9 && Math.floor(v) === v; };
    if (url && window.fetch) {
      var ctrl = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 6000);
      fetch(url, { headers: { Accept: 'application/json' }, signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { if (!r.ok) throw new Error('bad status'); return r.json(); })
        .then(function (d) {
          clearTimeout(timer);
          if (!d || !valid(d.students) || !valid(d.questions)) return;
          played = true;
          animateTo(statEls.students, d.students, true);
          animateTo(statEls.questions, d.questions, true);
          var note = statsRoot.querySelector('[data-stats-note]');
          if (note) note.textContent = 'تُحدَّث هذه الأرقام تلقائياً من البوت.';
        })
        .catch(function () { clearTimeout(timer); });
    }
  }
})();


/* GoatCounter: تتبع النقرات على الأزرار المهمة (إحصاءات مجهولة، بدون كوكيز) */
(function () {
  var track = function (name, title) {
    try {
      if (window.goatcounter && typeof window.goatcounter.count === 'function') {
        window.goatcounter.count({ path: name, title: title || name, event: true });
      }
    } catch (e) {}
  };
  var where = function (el) {
    if (el.closest('header')) return 'header';
    if (el.closest('footer')) return 'footer';
    var sec = el.closest('section[id]');
    return sec ? sec.id : 'page';
  };
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var el = t.closest('a, button');
    if (!el) return;
    var href = el.getAttribute('href') || '';
    var loc = where(el);

    if (el.classList.contains('menu-btn')) return track('menu-toggle', 'فتح/إغلاق قائمة الموبايل');
    if (el.classList.contains('tabs__tab')) return track(el.id === 'tab-teacher' ? 'tab-teacher' : 'tab-student', 'تبويب: ' + (el.id === 'tab-teacher' ? 'معلم' : 'طالب'));
    if (el.id === 'q-next') return track('demo-quiz-next', 'الكويز التجريبي: التالي');
    if (el.classList.contains('opt')) return track('demo-quiz-answer', 'الكويز التجريبي: اختيار إجابة');

    if (/t\.me\/AbiadQuizMakerbot/i.test(href)) return track('open-bot-' + loc, 'فتح البوت (' + loc + ')');
    if (/t\.me\/AbiadSupportBot/i.test(href)) return track('open-support-' + loc, 'الدعم الفني (' + loc + ')');
    if (/t\.me\/abiadquizmaker(?!bot)/i.test(href)) return track('open-channel-' + loc, 'قناة التحديثات (' + loc + ')');
    if (/t\.me\/Abiadd/i.test(href)) return track('open-telegram-personal-' + loc, 'تيليجرام شخصي (' + loc + ')');
    if (/github\.com\/MahmoudAbiad/i.test(href)) return track('open-github-' + loc, 'GitHub (' + loc + ')');
    if (/^mailto:/i.test(href)) return track('click-email-' + loc, 'البريد الإلكتروني (' + loc + ')');
    if (/terms-of-service\.html/i.test(href)) return track('open-terms-' + loc, 'شروط الاستخدام (' + loc + ')');
    if (/privacy-policy\.html/i.test(href)) return track('open-privacy-' + loc, 'سياسة الخصوصية (' + loc + ')');
    if (/^#(how|audience|points|about)$/.test(href)) return track('nav-' + href.slice(1) + '-' + loc, 'تنقل إلى قسم ' + href.slice(1) + ' (' + loc + ')');
  }, true);
})();
