/* =========================================================
   ANIMATIONS.JS — GSAP orchestration
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  if(!window.gsap) return;

  // ---------- Hero entrance sequence ----------
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  if(document.querySelector(".hero-badge")){
    heroTl
      .from(".hero-badge", { y: -20, opacity: 0, duration: .7 })
      .from(".hero-title .line", { y: 60, opacity: 0, duration: .9, stagger: .12 }, "-=0.3")
      .from(".hero-sub", { y: 24, opacity: 0, duration: .8 }, "-=0.5")
      .from(".hero-cta", { y: 24, opacity: 0, duration: .7, stagger: .1 }, "-=0.5")
      .from(".hero-scroll", { opacity: 0, duration: .6 }, "-=0.3");
  }

  // ---------- Parallax mountain peaks in hero ----------
  if(window.matchMedia("(min-width:768px)").matches){
    gsap.to(".peaks-back", { yPercent: 12, ease: "none", scrollTrigger: {
      trigger: ".hero", start: "top top", end: "bottom top", scrub: true
    }});
    gsap.to(".peaks-front", { yPercent: 22, ease: "none", scrollTrigger: {
      trigger: ".hero", start: "top top", end: "bottom top", scrub: true
    }});
  }

  if(window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);

    // ---------- Section eyebrow + heading reveal ----------
    document.querySelectorAll(".gsap-fade").forEach(el => {
      gsap.from(el, {
        y: 34, opacity: 0, duration: .9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" }
      });
    });

    // ---------- Timeline dots pop-in ----------
    gsap.utils.toArray(".timeline-dot").forEach((dot, i) => {
      gsap.from(dot, {
        scale: 0, opacity: 0, duration: .6, ease: "back.out(2)",
        scrollTrigger: { trigger: dot, start: "top 88%" }
      });
    });

    // ---------- Mission / service cards stagger ----------
    gsap.utils.toArray(".stagger-grid").forEach(grid => {
      gsap.from(grid.children, {
        y: 40, opacity: 0, duration: .7, stagger: .08, ease: "power2.out",
        scrollTrigger: { trigger: grid, start: "top 85%" }
      });
    });
  }
});
