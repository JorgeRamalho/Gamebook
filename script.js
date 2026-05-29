(() => {
  'use strict';

  // ===== CONFIG (personalize aqui) =====
  const CONFIG = {
    playerName: 'JORGE',
    legendName: 'LEGEND',
    storageScore: 'gameBookScore',
    storageHighScore: 'gameBookHighScore',
  };

  // ===== BOOT SCREEN =====
  const bootScreen = document.getElementById('boot-screen');
  const bootText = document.getElementById('boot-text');
  const bootBar = document.getElementById('boot-bar');

  const bootMessages = [
    'CARREGANDO MEMÓRIAS DE JORGE...',
    'TESTANDO CONTROLE... OK',
    'INSERINDO CARTUCHO...',
    'SOPRANDO PINOS DO NES...',
    'GAMEBOOK PRONTO!',
  ];

  let bootIndex = 0;
  let bootProgress = 0;

  function runBootSequence() {
    const interval = setInterval(() => {
      bootProgress += 4;
      bootBar.style.width = bootProgress + '%';

      if (bootProgress >= 20 * (bootIndex + 1) && bootIndex < bootMessages.length) {
        bootText.textContent = bootMessages[bootIndex];
        bootIndex++;
      }

      if (bootProgress >= 100) {
        clearInterval(interval);
        bootText.textContent = 'PRESSIONE QUALQUER TECLA';
      }
    }, 80);
  }

  function dismissBoot() {
    if (bootProgress < 100) return;
    bootScreen.classList.add('hidden');
    document.removeEventListener('keydown', dismissBoot);
    bootScreen.removeEventListener('click', dismissBoot);
  }

  runBootSequence();
  document.addEventListener('keydown', dismissBoot);
  bootScreen.addEventListener('click', dismissBoot);

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
    document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' });
    addScore(500);
    showToast('GAME START! BEM-VINDO, ' + CONFIG.playerName + '!');
  });

  // ===== CONTINUE =====
  document.getElementById('btn-continue').addEventListener('click', () => {
    lives = 3;
    updateHUD();
    addScore(1000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('CONTINUE! VIDAS RESTAURADAS');
  });

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
            link.style.color = link.getAttribute('href') === '#' + entry.target.id
              ? 'var(--neon-yellow)'
              : '';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
})();
