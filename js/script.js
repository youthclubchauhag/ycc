/* =========================================================
   SCRIPT.JS — Shared site behaviour (all pages)
========================================================= */

// ---------- Preloader ----------
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if(loader){
    setTimeout(() => loader.classList.add("hide"), 350);
  }
});

// ---------- AOS init ----------
document.addEventListener("DOMContentLoaded", () => {
  if(window.AOS){
    AOS.init({ duration: 800, once: true, offset: 80, easing: "ease-out-cubic" });
  }
});

// ---------- Navbar scroll state + active link ----------
const nav = document.getElementById("site-nav");
window.addEventListener("scroll", () => {
  if(!nav) return;
  nav.classList.toggle("scrolled", window.scrollY > 40);
  const btt = document.getElementById("backToTop");
  if(btt) btt.classList.toggle("show", window.scrollY > 600);
});

(function markActiveNav(){
  const current = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-link, .mobile-link").forEach(link => {
    const href = link.getAttribute("href");
    if(href === current || (current === "" && href === "index.html")){
      link.classList.add("active");
    }
  });
})();

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if(menuBtn && mobileMenu){
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("flex");
    mobileMenu.classList.toggle("hidden");
    menuBtn.innerHTML = mobileMenu.classList.contains("hidden")
      ? `<i class="fa-solid fa-bars"></i>` : `<i class="fa-solid fa-xmark"></i>`;
  });
  document.querySelectorAll(".mobile-link").forEach(l => l.addEventListener("click", () => {
    mobileMenu.classList.add("hidden"); mobileMenu.classList.remove("flex");
    menuBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  }));
}

// ---------- Back to top ----------
const backToTop = document.getElementById("backToTop");
if(backToTop){
  backToTop.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
}

// ---------- Ripple effect on buttons ----------
document.querySelectorAll(".btn").forEach(btn => {
  btn.style.position = btn.style.position || "relative";
  btn.addEventListener("click", function(e){
    const rect = this.getBoundingClientRect();
    const circle = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    circle.className = "ripple";
    circle.style.width = circle.style.height = size + "px";
    circle.style.left = (e.clientX - rect.left - size/2) + "px";
    circle.style.top = (e.clientY - rect.top - size/2) + "px";
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 650);
  });
});

// ---------- Animated ring counters (achievements) ----------
function animateCounter(el, target, duration = 1800){
  let start = 0;
  const startTime = performance.now();
  function tick(now){
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString();
    if(progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(tick);
}

function animateRing(circle, percent){
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;
  requestAnimationFrame(() => {
    circle.style.transition = "stroke-dashoffset 1.8s cubic-bezier(.2,.8,.2,1)";
    circle.style.strokeDashoffset = `${circumference * (1 - percent/100)}`;
  });
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const wrap = entry.target;
      const num = wrap.querySelector(".stat-num");
      const fill = wrap.querySelector(".fill");
      const target = parseInt(wrap.dataset.count, 10) || 0;
      const percent = parseInt(wrap.dataset.percent, 10) || 100;
      if(num) animateCounter(num, target);
      if(fill) animateRing(fill, percent);
      statObserver.unobserve(wrap);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll(".stat-ring[data-count]").forEach(el => statObserver.observe(el));

// ---------- Fallback scroll-reveal for [data-reveal] (if AOS absent) ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add("revealed"); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll("[data-reveal]").forEach(el => revealObserver.observe(el));

// ---------- Toast close ----------
document.addEventListener("click", (e) => {
  if(e.target.closest("#toast-close")){
    document.getElementById("toast")?.classList.remove("show");
  }
});

// ---------- Current year in footer ----------
document.querySelectorAll(".current-year").forEach(el => el.textContent = new Date().getFullYear());
