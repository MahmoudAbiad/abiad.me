/* Interactive 3-question demo for localized landing pages (tr, fr, de, fa) */
(function () {
  var demo = document.getElementById('demo-i18n');
  if (!demo) return;

  var lang = (document.documentElement.lang || 'en').toLowerCase().slice(0, 2);
  var DATA = {
    tr: {
      letters: ['A', 'B', 'C', 'D'],
      counter: function (i, n) { return 'Soru ' + i + ' / ' + n; },
      right: 'Doğru Cevap',
      wrong: function (ans) { return 'Yanlış. Doğru cevap: ' + ans; },
      questions: [
        {
          subject: 'Biyoloji',
          text: 'Hücrede enerji üretiminden sorumlu organel hangisidir?',
          options: ['Çekirdek', 'Mitokondri', 'Ribozom', 'Golgi aygıtı'],
          answer: 1,
          why: 'Mitokondri, hücresel solunum yoluyla hücrenin ihtiyaç duyduğu ATP enerjisinin büyük kısmını üretir.'
        },
        {
          subject: 'Kimya',
          text: 'Sodyum elementinin kimyasal sembolü nedir?',
          options: ['Na', 'K', 'Ca', 'Cl'],
          answer: 0,
          why: 'Na sembolü sodyumun Latince adı olan Natrium kelimesinden gelir.'
        },
        {
          subject: 'Fizik',
          text: 'Uluslararası Birim Sisteminde (SI) kuvvet birimi nedir?',
          options: ['Joule', 'Newton', 'Watt', 'Pascal'],
          answer: 1,
          why: 'Newton, 1 kg kütleye 1 m/s² ivme kazandıran kuvvettir.'
        }
      ]
    },
    fr: {
      letters: ['A', 'B', 'C', 'D'],
      counter: function (i, n) { return 'Question ' + i + ' sur ' + n; },
      right: 'Bonne réponse',
      wrong: function (ans) { return 'Incorrect. Bonne réponse : ' + ans; },
      questions: [
        {
          subject: 'Biologie',
          text: 'Quel organite est responsable de la production d’énergie dans la cellule ?',
          options: ['Noyau', 'Mitochondrie', 'Ribosome', 'Appareil de Golgi'],
          answer: 1,
          why: 'Les mitochondries produisent l’essentiel de l’énergie chimique (ATP) grâce à la respiration cellulaire.'
        },
        {
          subject: 'Chimie',
          text: 'Quel est le symbole chimique du sodium ?',
          options: ['Na', 'K', 'Ca', 'Cl'],
          answer: 0,
          why: 'Le symbole Na vient du nom latin du sodium, Natrium.'
        },
        {
          subject: 'Physique',
          text: 'Quelle est l’unité SI de la force ?',
          options: ['Joule', 'Newton', 'Watt', 'Pascal'],
          answer: 1,
          why: 'Le newton est la force nécessaire pour donner à une masse de 1 kg une accélération de 1 m/s².'
        }
      ]
    },
    de: {
      letters: ['A', 'B', 'C', 'D'],
      counter: function (i, n) { return 'Frage ' + i + ' von ' + n; },
      right: 'Richtige Antwort',
      wrong: function (ans) { return 'Falsch. Richtig: ' + ans; },
      questions: [
        {
          subject: 'Biologie',
          text: 'Welches Organell ist für die Energieproduktion in der Zelle zuständig?',
          options: ['Zellkern', 'Mitochondrium', 'Ribosom', 'Golgi-Apparat'],
          answer: 1,
          why: 'Mitochondrien erzeugen über die Zellatmung den Großteil der chemischen Energie (ATP) der Zelle.'
        },
        {
          subject: 'Chemie',
          text: 'Welches chemische Symbol steht für Natrium?',
          options: ['Na', 'K', 'Ca', 'Cl'],
          answer: 0,
          why: 'Das Symbol Na leitet sich vom lateinischen Namen Natrium ab.'
        },
        {
          subject: 'Physik',
          text: 'Was ist die SI-Einheit der Kraft?',
          options: ['Joule', 'Newton', 'Watt', 'Pascal'],
          answer: 1,
          why: 'Ein Newton ist die Kraft, die eine Masse von 1 kg mit 1 m/s² beschleunigt.'
        }
      ]
    },
    fa: {
      letters: ['الف', 'ب', 'ج', 'د'],
      counter: function (i, n) { return 'سؤال ' + i + ' از ' + n; },
      right: 'پاسخ صحیح',
      wrong: function (ans) { return 'پاسخ نادرست. گزینه صحیح: ' + ans; },
      questions: [
        {
          subject: 'زیست‌شناسی',
          text: 'کدام اندامک مسئول تولید انرژی در سلول است؟',
          options: ['هسته', 'میتوکندری', 'ریبوزوم', 'دستگاه گلژی'],
          answer: 1,
          why: 'میتوکندری بخش اصلی انرژی شیمیایی سلول (ATP) را از طریق تنفس سلولی تولید می‌کند.'
        },
        {
          subject: 'شیمی',
          text: 'نماد شیمیایی عنصر سدیم چیست؟',
          options: ['Na', 'K', 'Ca', 'Cl'],
          answer: 0,
          why: 'نماد Na از نام لاتین سدیم یعنی Natrium گرفته شده است.'
        },
        {
          subject: 'فیزیک',
          text: 'واحد اندازه‌گیری نیرو در سیستم SI چیست؟',
          options: ['ژول', 'نیوتن', 'وات', 'پاسکال'],
          answer: 1,
          why: 'نیوتن نیرویی است که به جرم ۱ کیلوگرم شتاب ۱ متر بر مجذور ثانیه می‌دهد.'
        }
      ]
    }
  };

  var cfg = DATA[lang];
  if (!cfg) return;

  var elSubject = document.getElementById('q-subject');
  var elCount = document.getElementById('q-count');
  var elText = document.getElementById('q-text');
  var elOpts = document.getElementById('q-opts');
  var elFeedback = document.getElementById('q-feedback');
  var elNext = document.getElementById('q-next');
  var current = 0;
  var locked = false;

  var render = function () {
    var q = cfg.questions[current];
    locked = false;
    elSubject.textContent = q.subject;
    elCount.textContent = cfg.counter(current + 1, cfg.questions.length);
    elText.textContent = q.text;
    elFeedback.textContent = '';
    elFeedback.className = 'sheet__feedback';
    elOpts.innerHTML = '';

    q.options.forEach(function (label, idx) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt';
      b.setAttribute('data-i', String(idx));
      var mark = document.createElement('span');
      mark.className = 'opt__mark';
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = cfg.letters[idx];
      var text = document.createElement('span');
      text.className = 'opt__text';
      text.textContent = label;
      b.appendChild(mark);
      b.appendChild(text);
      elOpts.appendChild(b);
    });
  };

  elOpts.addEventListener('click', function (e) {
    if (locked) return;
    var btn = e.target.closest('button.opt');
    if (!btn) return;
    var picked = parseInt(btn.getAttribute('data-i'), 10);
    var q = cfg.questions[current];
    locked = true;
    var right = picked === q.answer;
    var buttons = elOpts.querySelectorAll('button.opt');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
      if (i === q.answer) buttons[i].classList.add('is-right');
      else if (i === picked && !right) buttons[i].classList.add('is-wrong');
    }
    elFeedback.textContent = '';
    var head = document.createElement('strong');
    head.textContent = right ? cfg.right : cfg.wrong(q.options[q.answer]);
    elFeedback.appendChild(head);
    elFeedback.appendChild(document.createTextNode(' — ' + q.why));
    elFeedback.className = 'sheet__feedback ' + (right ? 'is-right' : 'is-wrong');
  });

  elNext.addEventListener('click', function () {
    current = (current + 1) % cfg.questions.length;
    render();
  });

  render();
})();
