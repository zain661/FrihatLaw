(() => {
  "use strict";

  /* ===================== Config ===================== */
  const FRAME_COUNT = 144;
  const FRAME_PATH = i => `assets/frames/frame_${String(i).padStart(4, "0")}.jpg`;
  const NATIVE_W = 1280;
  const NATIVE_H = 720;

  const frames = [];
  let framesLoaded = 0;
  let currentFrameIndex = -1;

  const loader = document.getElementById("loader");
  const loaderProgress = document.getElementById("loaderProgress");
  const canvas = document.getElementById("frameCanvas");
  const ctx = canvas.getContext("2d");
  const stage = document.getElementById("scrollStage");
  const stageProgressBar = document.getElementById("stageProgressBar");
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");

  /* ===================== Preload frames ===================== */
  function preloadFrames() {
    return new Promise(resolve => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = FRAME_PATH(i);
        img.onload = img.onerror = () => {
          framesLoaded++;
          const pct = Math.round((framesLoaded / FRAME_COUNT) * 100);
          if (loaderProgress) loaderProgress.style.width = pct + "%";
          if (framesLoaded === FRAME_COUNT) resolve();
        };
        frames[i - 1] = img;
      }
    });
  }

  /* ===================== Canvas sizing ===================== */
  function sizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayW = canvas.clientWidth;
    const displayH = displayW * (NATIVE_H / NATIVE_W);
    canvas.style.height = displayH + "px";
    canvas.width = Math.round(displayW * dpr);
    canvas.height = Math.round(displayH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawFrame(Math.max(currentFrameIndex, 0), true);
  }

  function drawFrame(index, force) {
    index = Math.max(0, Math.min(FRAME_COUNT - 1, index));
    if (index === currentFrameIndex && !force) return;
    currentFrameIndex = index;
    const img = frames[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
  }

  /* ===================== Scroll-driven playback ===================== */
  const annotations = Array.from(document.querySelectorAll(".annotation")).map(el => {
    const [start, end] = el.dataset.range.split(",").map(Number);
    return { el, start, end };
  });

  let ticking = false;

  function getStageProgress() {
    const rect = stage.getBoundingClientRect();
    const total = stage.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    if (total <= 0) return 0;
    return Math.max(0, Math.min(1, scrolled / total));
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const progress = getStageProgress();
      const frameIndex = Math.round(progress * (FRAME_COUNT - 1));
      drawFrame(frameIndex);
      if (stageProgressBar) stageProgressBar.style.width = (progress * 100) + "%";

      annotations.forEach(a => {
        const active = progress >= a.start && progress <= a.end;
        a.el.classList.toggle("active", active);
      });

      navbar.classList.toggle("scrolled", window.scrollY > 40);
      ticking = false;
    });
  }

  /* ===================== Navbar mobile ===================== */
  navToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
  });
  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => mobileNav.classList.remove("open"));
  });

  /* ===================== Confetti ===================== */
  const confettiCanvas = document.getElementById("confettiCanvas");
  const confettiCtx = confettiCanvas.getContext("2d");
  const confettiColors = ["#E7B84D", "#F3D68C", "#1D5240", "#ffffff"];
  let confettiParticles = [];
  let confettiRAF = null;

  function sizeConfettiCanvas() {
    const parent = confettiCanvas.parentElement;
    confettiCanvas.width = parent.clientWidth;
    confettiCanvas.height = parent.clientHeight;
  }

  function burstConfetti() {
    sizeConfettiCanvas();
    const cx = confettiCanvas.width / 2;
    const particleCount = 140;
    confettiParticles = Array.from({ length: particleCount }, () => ({
      x: cx + (Math.random() - 0.5) * 200,
      y: confettiCanvas.height * 0.35,
      vx: (Math.random() - 0.5) * 9,
      vy: -Math.random() * 9 - 4,
      size: Math.random() * 7 + 4,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      life: 1
    }));
    if (confettiRAF) cancelAnimationFrame(confettiRAF);
    animateConfetti();
  }

  function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let alive = false;
    confettiParticles.forEach(p => {
      p.vy += 0.22;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.life -= 0.008;
      if (p.life > 0 && p.y < confettiCanvas.height + 40) {
        alive = true;
        confettiCtx.save();
        confettiCtx.globalAlpha = Math.max(p.life, 0);
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate((p.rotation * Math.PI) / 180);
        confettiCtx.fillStyle = p.color;
        confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        confettiCtx.restore();
      }
    });
    if (alive) {
      confettiRAF = requestAnimationFrame(animateConfetti);
    } else {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  document.getElementById("ctaConfettiBtn").addEventListener("click", burstConfetti);
  document.getElementById("discoverBtn").addEventListener("click", () => {
    setTimeout(burstConfetti, 500);
  });

  /* ===================== Init ===================== */
  window.addEventListener("resize", () => {
    sizeCanvas();
  });
  window.addEventListener("scroll", onScroll, { passive: true });

  preloadFrames().then(() => {
    sizeCanvas();
    onScroll();
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 300);
  });

  // Safety fallback: reveal even if some frames fail to load
  setTimeout(() => {
    if (loader && !loader.classList.contains("hidden")) {
      sizeCanvas();
      loader.classList.add("hidden");
    }
  }, 8000);
})();
