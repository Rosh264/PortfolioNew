// ===== Mobile menu =====
const menuIcon = document.querySelector(".menu-icon");
const navlist = document.querySelector(".navlist");
menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navlist.classList.toggle("active");
});
navlist.addEventListener("click", () => {
  navlist.classList.remove("active");
  menuIcon.classList.remove("active");
});

// ===== Active link on scroll =====
const links = document.querySelectorAll("header .navlist a");
const sections = document.querySelectorAll("section");
function setActive() {
  let current = sections[0].id;
  sections.forEach((s) => {
    if (window.scrollY + 120 >= s.offsetTop) current = s.id;
  });
  links.forEach((l) => {
    l.classList.toggle("active", l.getAttribute("href") === `#${current}`);
  });
}
setActive();
window.addEventListener("scroll", setActive);

// ===== Header shadow on scroll =====
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.style.boxShadow = window.scrollY > 20 ? "0 10px 30px -20px rgba(0,0,0,.6)" : "none";
});

// ===== Contact form =====
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const subject = data.get("subject") || "Portfolio inquiry";
    const message = data.get("message") || "";
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
    window.location.href = `mailto:Roshansharma9591@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    contactForm.reset();
  });
}

// ===== Project card spotlight =====
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// ===== Subtle parallax motion =====
const heroVisual = document.querySelector(".hero-visual");
const photoFrame = document.querySelector(".photo-frame");
const aboutPhoto = document.querySelector(".about-photo");

if (heroVisual && photoFrame) {
  heroVisual.addEventListener("mousemove", (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    photoFrame.style.transform = `translate(${x * 10}px, ${y * 10}px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    photoFrame.style.transform = "";
  });
}

if (aboutPhoto) {
  aboutPhoto.addEventListener("mousemove", (e) => {
    const rect = aboutPhoto.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    aboutPhoto.style.transform = `translate(${x * 6}px, ${y * 6}px) rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;
  });

  aboutPhoto.addEventListener("mouseleave", () => {
    aboutPhoto.style.transform = "";
  });
}

// ===== Reveal on scroll =====
const revealSelector = ".hc-cell, .project-card, .journey-card, .about-grid > *, .hero-content, .hero-visual, .contact-card";
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(revealSelector).forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity .8s ease, transform .8s ease";
  io.observe(el);
});

// Safety net: force-show everything after 2s if observer hasn't fired
setTimeout(() => {
  document.querySelectorAll(revealSelector).forEach((el) => {
    if (el.style.opacity === "0") {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
}, 2000);

// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Typing role animation (robotics-themed) =====
(() => {
  const el = document.getElementById("typed-role");
  if (!el) return;
  const roles = [
    "initializing ROS2 node...",
    "Robotics Engineer",
    "Autonomous Systems Developer",
    "SLAM & Navigation",
    "Computer Vision · OpenCV",
    "Embedded Firmware · C++",
    "AWS",
    "Cloud Computing",
    "DevOps",
    "IoT",

  ];
  let i = 0, j = 0, deleting = false;
  function tick() {
    const word = roles[i];
    el.textContent = word.slice(0, j);
    if (!deleting && j < word.length) { j++; setTimeout(tick, 55); }
    else if (deleting && j > 0) { j--; setTimeout(tick, 30); }
    else {
      deleting = !deleting;
      if (!deleting) i = (i + 1) % roles.length;
      setTimeout(tick, deleting ? 1400 : 400);
    }
  }
  tick();
})();

// ===== Interactive 3D-style robot character (ChainGPT-inspired) =====
(() => {
  const canvas = document.getElementById("robo-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
  }
  resize();
  window.addEventListener("load", resize);
  window.addEventListener("resize", resize);
  setTimeout(resize, 50);

  // Color palette — robot-inspired neon tones
  const C = {
    shell: "#b07bff",
    shellDark: "#6a3fb8",
    shellHi: "#e0c8ff",
    metal: "#140d2d",
    glow: "#ff5ce0",
    glowSoft: "rgba(255,92,224,0.30)",
    eye: "#69ffe1",
    eyeGlow: "rgba(105,255,225,0.48)",
  };

  const mouse = { x: W * 0.5, y: H * 0.5, active: false };
  window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; });
  window.addEventListener("mouseleave", () => { mouse.active = false; });

  let t = 0;

  // Soft ambient particles (slow, low count — no falling lines)
  const dust = Array.from({ length: 28 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 1.4 + 0.4,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    a: Math.random() * 0.4 + 0.1,
  }));

  function drawAmbient() {
    const cx = W * 0.22, cy = H * 0.62;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.48);
    g.addColorStop(0, "rgba(176,123,255,0.14)");
    g.addColorStop(0.45, "rgba(106,63,184,0.06)");
    g.addColorStop(1, "rgba(11,17,32,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // subtle cursor aura instead of a harsh line
    if (mouse.active) {
      const aura = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 28);
      aura.addColorStop(0, "rgba(105,255,225,0.18)");
      aura.addColorStop(0.45, "rgba(176,123,255,0.08)");
      aura.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 28, 0, Math.PI * 2);
      ctx.fill();
    }

    // gentle dust
    dust.forEach((p) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.fillStyle = `rgba(176,123,255,${p.a})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    });
  }

  // Robot anchored on different sections with smoother motion
  const robot = { x: 0, y: 0, alpha: 0, scale: 0.82, headYaw: 0, headPitch: 0 };
  const anchors = {
    home: { x: 0.80, y: 0.3, scale: 0.98, show: false },
    about: { x: 0.07, y: 0.40, scale: 0.60, show: true },
    skills: { x: 0.84, y: 0.50, scale: 0.78, show: true },
    projects: { x: 0.5, y: 0.32, scale: 0.98, show: true },
    experience: { x: 0.92, y: 0.50, scale: 0.82, show: true },
    contact: { x: 0.10, y: 0.34, scale: 0.76, show: true },
  };

  // { x: 0.82, y: 0.42, scale: 0.84, show: true },
  // home:     { x: 0.80, y: 0.5, scale: 0.82, show: false },

  function lerp(a, b, t) { return a + (b - a) * t; }

  function getActiveSection() {
    const sections = [...document.querySelectorAll('section')];
    if (!sections.length) return 'home';
    const current = sections.find((sec) => {
      const r = sec.getBoundingClientRect();
      return r.top <= window.innerHeight * 0.45 && r.bottom >= window.innerHeight * 0.45;
    });
    return current ? current.id || 'home' : 'home';
  }

  function drawRobot() {
    const key = getActiveSection();
    const pos = anchors[key] || anchors.about;

    robot.x = lerp(robot.x, pos.x * W, 0.06);
    robot.y = lerp(robot.y, pos.y * H, 0.06);
    robot.scale = lerp(robot.scale, pos.scale, 0.08);
    robot.alpha = lerp(robot.alpha, pos.show ? 1 : 0, 0.08);

    if (robot.alpha < 0.03) return;

    const bob = Math.sin(t * 0.025) * 4;
    const sway = Math.sin(t * 0.018) * 0.03;
    const armWave = key === 'about'
      ? Math.sin(t * 0.1) * 0.45
      : Math.sin(t * 0.06) * 0.18;
    const cx = robot.x;
    const cy = robot.y + bob;
    const dx = (mouse.x - cx) / Math.max(W, 1);
    const dy = (mouse.y - cy) / Math.max(H, 1);
    robot.headYaw = lerp(robot.headYaw, Math.max(-0.32, Math.min(0.32, dx * 1.1)), 0.08);
    robot.headPitch = lerp(robot.headPitch, Math.max(-0.24, Math.min(0.24, dy * 1.1)), 0.08);
    const bodyScale = robot.scale * (0.94 + Math.sin(t * 0.04) * 0.04);

    ctx.save();
    ctx.globalAlpha = robot.alpha;
    ctx.translate(cx, cy);
    ctx.scale(bodyScale, bodyScale);
    ctx.rotate(sway);

    // shadow
    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.beginPath(); ctx.ellipse(0, 120, 58, 9, 0, 0, Math.PI * 2); ctx.fill();

    // body
    drawCapsule(-44, 10, 88, 110, 22, C.shell, C.shellDark);

    // premium scan rings
    const scanPulse = 0.5 + 0.5 * Math.sin(t * 0.09);
    ctx.strokeStyle = `rgba(105,255,225,${0.08 + scanPulse * 0.1})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 58, 72 + scanPulse * 10, 36 + scanPulse * 6, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = `rgba(176,123,255,${0.06 + scanPulse * 0.08})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(0, 58, 96 + scanPulse * 12, 52 + scanPulse * 8, 0, 0, Math.PI * 2);
    ctx.stroke();

    // chest core and glow
    ctx.fillStyle = C.metal;
    roundRect(-26, 30, 52, 56, 10); ctx.fill();
    const pulse = 0.5 + 0.5 * Math.sin(t * 0.08);
    const cg = ctx.createRadialGradient(0, 58, 2, 0, 58, 22);
    cg.addColorStop(0, `rgba(255,92,224,${0.82 * pulse + 0.18})`);
    cg.addColorStop(1, "rgba(255,92,224,0)");
    ctx.fillStyle = cg;
    ctx.beginPath(); ctx.arc(0, 58, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.glow;
    ctx.beginPath(); ctx.arc(0, 58, 5, 0, Math.PI * 2); ctx.fill();

    // shoulder bolts
    [-44, 44].forEach((sx) => {
      ctx.fillStyle = C.shellDark;
      ctx.beginPath(); ctx.arc(sx, 18, 10, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.shellHi;
      ctx.beginPath(); ctx.arc(sx - 2, 16, 3, 0, Math.PI * 2); ctx.fill();
    });

    // arms (wave slightly in about section)
    const armColor = key === 'about' ? C.shellHi : C.shell;
    ctx.fillStyle = armColor;
    ctx.save();
    ctx.translate(-56, 26);
    ctx.rotate(0.48 + armWave);
    drawCapsule(0, 0, 16, 58, 8, C.shellDark, C.shell);
    ctx.beginPath(); ctx.arc(0, 58, 7, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(56, 26);
    ctx.rotate(-0.48 - armWave);
    drawCapsule(-16, 0, 16, 58, 8, C.shellDark, C.shell);
    ctx.beginPath(); ctx.arc(-16, 58, 7, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // neck gap
    ctx.fillStyle = C.shellDark;
    roundRect(-8, -8, 16, 18, 5); ctx.fill();

    // head
    ctx.save();
    ctx.translate(0, -24);
    ctx.rotate(robot.headYaw * 0.5);
    ctx.translate(0, robot.headPitch * 6);

    const headGrad = ctx.createLinearGradient(0, -60, 0, 10);
    headGrad.addColorStop(0, C.shellHi);
    headGrad.addColorStop(0.45, C.shell);
    headGrad.addColorStop(1, C.shellDark);
    ctx.fillStyle = headGrad;
    roundRect(-46, -60, 92, 78, 22); ctx.fill();

    const visGrad = ctx.createLinearGradient(0, -42, 0, -8);
    visGrad.addColorStop(0, "#120a26");
    visGrad.addColorStop(1, "#2a1750");
    ctx.fillStyle = visGrad;
    roundRect(-36, -42, 72, 36, 14); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    roundRect(-32, -40, 64, 6, 3); ctx.fill();

    const ex = robot.headYaw * 10;
    const ey = robot.headPitch * 6;
    const blink = ((t + 50) % 180) > 170 ? 0.18 : 1;
    [-16, 16].forEach((px) => {
      const pxEye = px + ex;
      const pyEye = -24 + ey;
      const eg = ctx.createRadialGradient(pxEye, pyEye, 0, pxEye, pyEye, 16);
      eg.addColorStop(0, C.eyeGlow);
      eg.addColorStop(1, "rgba(105,255,225,0)");
      ctx.fillStyle = eg;
      ctx.beginPath(); ctx.arc(pxEye, pyEye, 16, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.eye;
      ctx.beginPath(); ctx.arc(pxEye, pyEye, 5 * blink, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(pxEye - 1.5, pyEye - 1.5, 1.3 * blink, 0, Math.PI * 2); ctx.fill();
    });

    ctx.strokeStyle = C.shellDark;
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(0, -82); ctx.stroke();
    const antennaPulse = 0.5 + 0.5 * Math.sin(t * 0.18);
    ctx.fillStyle = `rgba(255,92,224,${0.5 + 0.5 * antennaPulse})`;
    ctx.beginPath(); ctx.arc(0, -86, 5, 0, Math.PI * 2); ctx.fill();
    const ag = ctx.createRadialGradient(0, -86, 0, 0, -86, 18);
    ag.addColorStop(0, `rgba(255,92,224,${0.35 * antennaPulse})`);
    ag.addColorStop(1, "rgba(255,92,224,0)");
    ctx.fillStyle = ag;
    ctx.beginPath(); ctx.arc(0, -86, 18, 0, Math.PI * 2); ctx.fill();

    [-48, 48].forEach((sx) => {
      ctx.fillStyle = C.shellDark;
      roundRect(sx - 6, -36, 12, 22, 4); ctx.fill();
      ctx.fillStyle = C.glow;
      ctx.beginPath(); ctx.arc(sx, -25, 2.2, 0, Math.PI * 2); ctx.fill();
    });

    const ringPulse = 0.5 + 0.5 * Math.sin(t * 0.11);
    ctx.strokeStyle = `rgba(105,255,225,${0.08 + ringPulse * 0.1})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(0, -18, 58 + ringPulse * 8, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = `rgba(255,92,224,${0.08 + ringPulse * 0.08})`;
    ctx.beginPath(); ctx.arc(0, 22, 6, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
    ctx.restore();
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawCapsule(x, y, w, h, r, fill, stroke) {
    const grad = ctx.createLinearGradient(x, y, x, y + h);
    grad.addColorStop(0, C.shellHi);
    grad.addColorStop(0.4, fill);
    grad.addColorStop(1, stroke);
    ctx.fillStyle = grad;
    roundRect(x, y, w, h, r); ctx.fill();
  }

  function frame() {
    t++;
    ctx.clearRect(0, 0, W, H);
    drawAmbient();
    drawRobot();
    requestAnimationFrame(frame);
  }
  frame();
})();

// ===== Education Details Toggle =====
(() => {
  const toggleBtn = document.getElementById("edu-toggle-btn");
  const eduGrid = document.getElementById("edu-grid");
  const arrow = document.getElementById("edu-arrow");
  
  if (toggleBtn && eduGrid) {
    toggleBtn.addEventListener("click", () => {
      const active = eduGrid.classList.toggle("active");
      if (active) {
        eduGrid.style.maxHeight = eduGrid.scrollHeight + "px";
        eduGrid.style.opacity = "1";
        eduGrid.style.marginTop = "18px";
        if (arrow) arrow.style.transform = "rotate(180deg)";
      } else {
        eduGrid.style.maxHeight = "0";
        eduGrid.style.opacity = "0";
        eduGrid.style.marginTop = "0";
        if (arrow) arrow.style.transform = "rotate(0deg)";
      }
    });
  }
})();
