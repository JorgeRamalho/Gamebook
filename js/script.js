(() => {
  'use strict';

  // ===== CONFIG (personalize aqui) =====
  const CONFIG = {
    playerName: 'JORGE',
    legendName: 'LEGEND',
    storageScore: 'gameBookScore',
    storageHighScore: 'gameBookHighScore',
    // URL canônica de publicação (manter alinhada a index.html, robots.txt e sitemap.xml)
    siteUrl: 'https://jorgeramalho.github.io/Projeto-gamebook/',
    // DDI + DDD + número (somente dígitos). Ex: 5511999999999
    // Deixe vazio ou o placeholder para ocultar o botão WhatsApp.
    whatsappNumber: '',
    whatsappMessage: 'Olá! Vim pelo GameBook.',
    whatsappPlaceholder: '5500000000000',
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function smoothScrollTo(options) {
    if (prefersReducedMotion) {
      const top = typeof options.top === 'number' ? options.top : undefined;
      if (top != null) {
        window.scrollTo(0, top);
        onScrollChrome();
        return;
      }
      if (options.el) {
        options.el.scrollIntoView();
        onScrollChrome();
      }
      return;
    }
    if (options.el) {
      options.el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.scrollTo({ top: options.top || 0, behavior: 'smooth' });
  }

  // ===== BOOT SCREEN =====
  const bootScreen = document.getElementById('boot-screen');
  const bootText = document.getElementById('boot-text');
  const bootBar = document.getElementById('boot-bar');
  const bootBarTrack = document.getElementById('boot-bar-track');
  const bootSkip = document.getElementById('boot-skip');

  const bootMessages = [
    'CARREGANDO MEMÓRIAS DE JORGE...',
    'TESTANDO CONTROLE... OK',
    'INSERINDO CARTUCHO...',
    'SOPRANDO PINOS DO NES...',
    'GAMEBOOK PRONTO!',
  ];

  let bootIndex = 0;
  let bootProgress = 0;
  let bootDone = false;

  function setBootProgress(value) {
    bootProgress = Math.min(100, value);
    bootBar.style.width = bootProgress + '%';
    if (bootBarTrack) {
      bootBarTrack.setAttribute('aria-valuenow', String(Math.round(bootProgress)));
    }
  }

  function finishBootReady() {
    if (bootDone) return;
    bootDone = true;
    setBootProgress(100);
    bootText.textContent = 'PRESSIONE QUALQUER TECLA, ESC OU PULAR INTRO';
    if (bootSkip) {
      bootSkip.focus({ preventScroll: true });
    }
  }

  function runBootSequence() {
    const interval = setInterval(() => {
      setBootProgress(bootProgress + 4);

      if (bootProgress >= 20 * (bootIndex + 1) && bootIndex < bootMessages.length) {
        bootText.textContent = bootMessages[bootIndex];
        bootIndex++;
      }

      if (bootProgress >= 100) {
        clearInterval(interval);
        finishBootReady();
      }
    }, prefersReducedMotion ? 20 : 80);
  }

  function dismissBoot() {
    if (bootProgress < 100 && !bootDone) {
      // Escape / Pular intro podem forçar o fim
      setBootProgress(100);
      bootDone = true;
    }
    bootScreen.classList.add('hidden');
    bootScreen.setAttribute('aria-hidden', 'true');
    bootScreen.removeAttribute('aria-modal');
    document.removeEventListener('keydown', onBootKey);
    bootScreen.removeEventListener('click', onBootClick);
    if (bootSkip) bootSkip.removeEventListener('click', onBootSkip);
    const mainStart = document.getElementById('inicio');
    if (mainStart) {
      mainStart.focus({ preventScroll: true });
    }
  }

  function onBootKey(e) {
    if (e.key === 'Tab') {
      // Mantém o foco no diálogo de boot (skip é o único controle)
      e.preventDefault();
      if (bootSkip) bootSkip.focus({ preventScroll: true });
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      dismissBoot();
      return;
    }
    if (bootProgress < 100 && !bootDone) return;
    dismissBoot();
  }

  function onBootClick(e) {
    if (bootSkip && (e.target === bootSkip || bootSkip.contains(e.target))) return;
    if (bootProgress < 100 && !bootDone) return;
    dismissBoot();
  }

  function onBootSkip(e) {
    e.preventDefault();
    e.stopPropagation();
    dismissBoot();
  }

  runBootSequence();
  document.addEventListener('keydown', onBootKey);
  bootScreen.addEventListener('click', onBootClick);
  if (bootSkip) {
    bootSkip.addEventListener('click', onBootSkip);
    // Foco inicial no controle de pular (acessível desde o início)
    window.setTimeout(() => {
      if (!bootScreen.classList.contains('hidden')) {
        bootSkip.focus({ preventScroll: true });
      }
    }, 50);
  }

  // ===== SCORE SYSTEM =====
  const scoreEl = document.getElementById('score');
  const highScoreEl = document.getElementById('high-score');
  const livesEl = document.getElementById('lives');
  const playerNameEl = document.getElementById('player-name');

  playerNameEl.textContent = CONFIG.playerName;

  let score = parseInt(localStorage.getItem(CONFIG.storageScore) || '0', 10);
  let highScore = parseInt(localStorage.getItem(CONFIG.storageHighScore) || '999999', 10);
  let lives = 3;

  function padScore(n) {
    return String(n).padStart(6, '0');
  }

  function updateHUD() {
    scoreEl.textContent = padScore(score);
    highScoreEl.textContent = padScore(highScore);
    livesEl.textContent = '♥'.repeat(Math.min(lives, 3)) + '♡'.repeat(Math.max(0, 3 - lives));
    if (lives > 3) {
      livesEl.textContent += ' ×' + lives;
    }
  }

  function addScore(points) {
    score += points;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem(CONFIG.storageHighScore, highScore);
      showToast('NOVO HIGH SCORE! +' + points);
    }
    localStorage.setItem(CONFIG.storageScore, score);
    updateHUD();
  }

  updateHUD();

  // ===== TOAST =====
  const toast = document.getElementById('toast');
  let toastTimeout;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // ===== HEADER COMPACT ON SCROLL =====
  const siteHeader = document.getElementById('site-header');

  function updateHeaderCompact() {
    if (!siteHeader) return;
    siteHeader.classList.toggle('is-compact', window.scrollY > 48);
  }

  function onScrollChrome() {
    updateBtnTop();
    updateHeaderCompact();
  }

  // ===== COIN SLOT =====
  const coinSlot = document.getElementById('coin-slot');
  let coinCount = 0;

  coinSlot.addEventListener('click', () => {
    coinCount++;
    addScore(100);
    playCoinSound();
    showToast('MOEDA INSERIDA! ×' + coinCount);
    coinSlot.textContent = '🪙 ' + coinCount + ' CRÉDITOS';
  });

  // ===== PRESS START =====
  document.getElementById('btn-start').addEventListener('click', () => {
    const sobre = document.getElementById('sobre');
    smoothScrollTo({ el: sobre });
    addScore(500);
    showToast('GAME START! BEM-VINDO, ' + CONFIG.playerName + '!');
  });

  // ===== CONTINUE =====
  document.getElementById('btn-continue').addEventListener('click', () => {
    lives = 3;
    updateHUD();
    addScore(1000);
    smoothScrollTo({ top: 0 });
    showToast('CONTINUE! VIDAS RESTAURADAS');
  });

  // ===== BACK TO TOP =====
  const btnTop = document.getElementById('btn-top');

  function updateBtnTop() {
    btnTop.classList.toggle('visible', window.scrollY > 400);
  }

  btnTop.addEventListener('click', () => {
    smoothScrollTo({ top: 0 });
  });

  window.addEventListener('scroll', onScrollChrome, { passive: true });
  onScrollChrome();

  // ===== WHATSAPP =====
  const btnWhatsapp = document.getElementById('btn-whatsapp');

  function isWhatsappConfigured(number) {
    if (!number || typeof number !== 'string') return false;
    const digits = number.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) return false;
    if (digits === CONFIG.whatsappPlaceholder) return false;
    if (/^0+$/.test(digits)) return false;
    if (/^55?0{8,}$/.test(digits)) return false;
    return true;
  }

  if (btnWhatsapp) {
    if (isWhatsappConfigured(CONFIG.whatsappNumber)) {
      const digits = CONFIG.whatsappNumber.replace(/\D/g, '');
      const message = encodeURIComponent(CONFIG.whatsappMessage || '');
      btnWhatsapp.href = 'https://wa.me/' + digits + (message ? '?text=' + message : '');
      btnWhatsapp.hidden = false;
      btnWhatsapp.removeAttribute('hidden');
      btnWhatsapp.classList.remove('is-hidden');
    } else {
      btnWhatsapp.hidden = true;
      btnWhatsapp.setAttribute('hidden', '');
      btnWhatsapp.classList.add('is-hidden');
      btnWhatsapp.removeAttribute('href');
    }
  }

  // ===== CARTRIDGE CLICKS =====
  const gameMessages = {
    mario: 'IT\'S-A ME, MARIO! +200 PTS',
    zelda: 'HEY! LISTEN! +200 PTS',
    sonic: 'GOTTA GO FAST! +200 PTS',
    sf2: 'HADOUKEN! +200 PTS',
    megaman: 'MEGA BUSTER CARREGADO! +200 PTS',
    crash: 'WOAH! +200 PTS',
  };

  document.querySelectorAll('.game-cartridge').forEach(cart => {
    cart.addEventListener('click', () => {
      const game = cart.dataset.game;
      addScore(200);
      showToast(gameMessages[game] || 'JOGO CARREGADO!');
      playBlipSound();
    });
  });

  // ===== ERA CARDS HOVER SCORE =====
  document.querySelectorAll('.era-card').forEach(card => {
    card.addEventListener('mouseenter', () => addScore(50));
  });

  // ===== KONAMI CODE =====
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA',
  ];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (!bootScreen.classList.contains('hidden')) return;
    if (e.code === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        document.body.classList.add('konami-unlocked');
        addScore(30000);
        lives = 99;
        updateHUD();
        playerNameEl.textContent = CONFIG.legendName;
        showToast('30 VIDAS! CÓDIGO KONAMI ATIVADO!');
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // ===== SIMPLE 8-BIT SOUNDS (Web Audio API) =====
  let audioCtx;

  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playCoinSound() {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1174, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch (_) { /* audio not available */ }
  }

  function playBlipSound() {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.value = 440;
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (_) { /* audio not available */ }
  }

  // ===== PASSIVE SCORE (idle points like old games) =====
  setInterval(() => {
    if (!bootScreen.classList.contains('hidden')) return;
    addScore(10);
  }, 5000);

  // ===== NAV ACTIVE GLOW =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const active = link.getAttribute('href') === '#' + entry.target.id;
            link.style.color = active ? 'var(--neon-yellow)' : '';
            if (active) {
              link.setAttribute('aria-current', 'true');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    },
    { threshold: 0.35, rootMargin: '-10% 0px -40% 0px' }
  );

  sections.forEach(s => observer.observe(s));
})();
