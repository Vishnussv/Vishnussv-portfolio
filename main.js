/* Loader */
const loader = document.getElementById("loader");
const loaderPct = document.getElementById("loaderPct");
let pct = 0;
const pctTimer = setInterval(() => {
  pct = Math.min(pct + Math.floor(Math.random() * 12) + 4, 100);
  loaderPct.textContent = pct + "%";
  if (pct >= 100) clearInterval(pctTimer);
}, 120);

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
    document.body.classList.add("loaded");
  }, 2100);
});

/* Cursor glow */
const glow = document.getElementById("cursorGlow");
let mx = 0;
let my = 0;
let gx = 0;
let gy = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});

function animateGlow() {
  gx += (mx - gx) * 0.12;
  gy += (my - gy) *  0.12;
  glow.style.left = gx + "px";
  glow.style.top = gy + "px";
  requestAnimationFrame(animateGlow);
}
animateGlow();

/* Particle network */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
}

function initParticles() {
  const count = Math.min(80, Math.floor(window.innerWidth / 18));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.8 + 0.5,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(107, 143, 255, 0.55)";
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 130) {
        ctx.strokeStyle = `rgba(59, 107, 255, ${1 - dist / 130})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawParticles);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
drawParticles();

/* Header scroll */
const header = document.getElementById("header");
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 40);
  backTop.classList.toggle("show", y > 500);
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* Mobile nav */
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  mobileNav.classList.toggle("open");
});

mobileNav.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    mobileNav.classList.remove("open");
  });
});

/* Nav active */
const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".nav a")];

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach((s) => spy.observe(s));

/* Typewriter */
const typeEl = document.getElementById("typewriter");
const phrases = [
  " Building secure DevOps tools.",
  " Exploring ethical hacking.",
  " Creating AI assistants.",
  " Tracking habits with my own app.",
  " Leading teams at LMV System Company.",
  " Freelance web developer for hire.",
  " Building AI chatbots with PHP.",
  " Designing with code & creativity.",
];
let pi = 0;
let ci = 0;
let deleting = false;

function typeLoop() {
  const phrase = phrases[pi];
  if (!deleting) {
    ci++;
    typeEl.textContent = phrase.slice(0, ci);
    if (ci === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 45);
  } else {
    ci--;
    typeEl.textContent = phrase.slice(0, ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 28);
  }
}
setTimeout(typeLoop, 2400);

/* Mask word rotation */
const maskWord = document.getElementById("maskWord");
const maskWords = ["DEVELOPER", "HACKER", "CREATOR", "BUILDER", "STUDENT"];
let maskIndex = 0;

const maskObs = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) maskWord.classList.add("show");
  },
  { threshold: 0.4 }
);
maskObs.observe(maskWord);

setInterval(() => {
  maskWord.style.opacity = 0;
  maskWord.style.transform = "scale(0.95)";
  setTimeout(() => {
    maskIndex = (maskIndex + 1) % maskWords.length;
    maskWord.textContent = maskWords[maskIndex];
    maskWord.style.opacity = 1;
    maskWord.style.transform = "scale(1)";
  }, 280);
}, 3200);

/* Reveal on scroll */
const reveals = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 70);
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
reveals.forEach((el) => revealObs.observe(el));

/* Skill bars */
const skillItems = document.querySelectorAll(".skill-item");
const skillObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const level = entry.target.dataset.level;
        entry.target.querySelector(".fill").style.width = level + "%";
        skillObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
skillItems.forEach((item) => skillObs.observe(item));

/* Counters */
function animateCount(el, target) {
  const duration = 1600;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

const statNums = document.querySelectorAll(".stat-num");
const statObs = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      statNums.forEach((el) => animateCount(el, parseInt(el.dataset.count, 10)));
      statObs.disconnect();
    }
  },
  { threshold: 0.5 }
);
if (statNums[0]) statObs.observe(statNums[0].closest(".stats"));

/* Tech orbit floating badges */
const techLabels = ["HTML", "CSS", "JS", "AJAX", "React", "Flask", "Cloud", "Python", "MySQL", "Networking", "ChatGPT", "Git"];
const techOrbit = document.getElementById("techOrbit");
if (techOrbit) {
  techLabels.forEach((label, i) => {
    const orb = document.createElement("span");
    orb.className = "orb";
    orb.textContent = label;
    orb.style.left = (8 + i * 11) + "%";
    orb.style.top = (20 + (i % 3) * 28) + "%";
    orb.style.animationDelay = -(i * 0.7) + "s";
    techOrbit.appendChild(orb);
  });
}

/* ── 3D scene & parallax ── */
const scene3dInner = document.getElementById("scene3dInner");
const heroContent3d = document.getElementById("heroContent3d");
let tiltX = 0;
let tiltY = 0;
let smoothX = 0;
let smoothY = 0;

document.addEventListener("mousemove", (e) => {
  const nx = (e.clientX / window.innerWidth - 0.5) * 2;
  const ny = (e.clientY / window.innerHeight - 0.5) * 2;
  tiltX = nx;
  tiltY = ny;
});

function animate3D() {
  smoothX += (tiltX - smoothX) * 0.08;
  smoothY += (tiltY - smoothY) * 0.08;

  if (scene3dInner) {
    scene3dInner.style.transform = `rotateY(${smoothX * 28}deg) rotateX(${-smoothY * 22}deg)`;
  }
  if (heroContent3d) {
    heroContent3d.style.transform = `rotateY(${smoothX * 2}deg) rotateX(${-smoothY * 1.5}deg)`;
  }
  requestAnimationFrame(animate3D);
}
animate3D();

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (scene3dInner) {
    scene3dInner.style.translate = `0 ${scrollY * 0.15}px`;
  }
});

function bindTilt3D(el, intensity = 10, lift = 12) {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(${lift}px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
}

document.querySelectorAll(".tilt-3d").forEach((el) => bindTilt3D(el, 8, 10));

/* Project card tilt (enhanced 3D) */
document.querySelectorAll("[data-tilt]").forEach((card) => {
  bindTilt3D(card, 14, 18);
});

/* Contact form */
const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  const subject = encodeURIComponent("Portfolio contact from " + name);
  const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);
  window.location.href = `mailto:vishnussv25@gmail.com?subject=${subject}&body=${body}`;
  showToast("Opening your email client...");
  form.reset();
});

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}

/* Magnetic buttons */
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});
