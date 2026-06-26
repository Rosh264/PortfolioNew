/* ==========================================================
   Preloader JS – Hexagon Intro Animation & Load Handling
   ========================================================== */
(() => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  // Prevent scroll during loading
  document.body.classList.add("preloader-active");

  // ---- Particle canvas ----
  const canvas = document.getElementById("preloader-particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let W, H;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resizeCanvas() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let running = true;

    function drawParticles() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(drawParticles);
    }
    drawParticles();

    // Stop particle loop after preloader ends
    setTimeout(() => { running = false; }, 5000);
  }

  // ---- Orbital dots animation ----
  const dotsContainer = document.querySelector(".orbital-dots");
  if (dotsContainer) {
    const dotCount = 6;
    const dots = [];
    for (let i = 0; i < dotCount; i++) {
      const d = document.createElement("div");
      d.className = "orbital-dot";
      dotsContainer.appendChild(d);
      dots.push({ el: d, angle: (Math.PI * 2 * i) / dotCount, speed: 0.012 + (i % 2) * 0.006 });
    }

    const rect = dotsContainer.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = cx - 6;
    const ry = cy - 6;
    let orbitRunning = true;

    function animateDots() {
      if (!orbitRunning) return;
      dots.forEach((d) => {
        d.angle += d.speed;
        const x = cx + Math.cos(d.angle) * rx - 3;
        const y = cy + Math.sin(d.angle) * ry - 3;
        d.el.style.transform = `translate(${x}px, ${y}px)`;
      });
      requestAnimationFrame(animateDots);
    }
    animateDots();
    setTimeout(() => { orbitRunning = false; }, 5000);
  }

  // ---- Typing animation ----
  const line1El = document.getElementById("pre-name-1");
  const line2El = document.getElementById("pre-name-2");

  const name1 = "ROSHAN";
  const name2 = "SHARMA";
  let i1 = 0, i2 = 0;

  function typeLine1() {
    if (i1 <= name1.length) {
      line1El.textContent = name1.slice(0, i1);
      i1++;
      setTimeout(typeLine1, 25);
    } else {
      line1El.classList.remove("typing");
      line1El.classList.add("done");
      line2El.classList.add("typing");
      setTimeout(typeLine2, 40);
    }
  }

  function typeLine2() {
    if (i2 <= name2.length) {
      line2El.textContent = name2.slice(0, i2);
      i2++;
      setTimeout(typeLine2, 25);
    } else {
      line2El.classList.remove("typing");
      line2El.classList.add("done");
    }
  }

  // Start typing immediately as the hexagon appears (50ms delay)
  setTimeout(() => {
    line1El.classList.add("typing");
    typeLine1();
  }, 50);

  // ---- Fade out & reveal ----
  function dismissPreloader() {
    preloader.classList.add("done");
    document.body.classList.remove("preloader-active");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 350);
  }

  // Dismiss after ~1s or when page loads, whichever is later
  const minTime = 1000;
  const start = Date.now();
  let loaded = false;

  function tryDismiss() {
    const elapsed = Date.now() - start;
    if (elapsed >= minTime && loaded) {
      dismissPreloader();
    } else if (elapsed < minTime && loaded) {
      setTimeout(dismissPreloader, minTime - elapsed);
    }
  }

  window.addEventListener("load", () => {
    loaded = true;
    tryDismiss();
  });

  // Fallback: dismiss after 1.8s no matter what
  setTimeout(() => {
    loaded = true;
    tryDismiss();
  }, 1800);
})();
