/* ==========================================================
   HAIRYMAN LURES CO. — SHARED SCRIPT (load on every page)
   ========================================================== */

/* ---------- 1. EDIT THIS: your links and contact info ----------
   Every button/link marked data-link="ebay" (etc.) gets its
   address from here. Leave a social blank and its link hides. */
const SITE = {
  ebay: "",       // e.g. "https://www.ebay.com/str/yourstorename"
  email: "",      // e.g. "you@example.com"
  facebook: "",
  instagram: "",
  youtube: "",
  tiktok: ""
};

(function () {
  "use strict";

  /* ---------- Links ---------- */
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var key = el.dataset.link;
    var value = SITE[key];
    if (!value) {
      if (key === "ebay" || key === "email") {
        console.warn("Hairyman Lures: set SITE." + key + " in js/main.js");
        return;
      }
      var item = el.closest("li") || el;
      item.hidden = true;
      return;
    }
    el.href = key === "email" ? "mailto:" + value : value;
  });

  /* ---------- Trail nav: footprint walks to the active/hovered page ---------- */
  var trail = document.querySelector(".trail");
  if (trail) {
    var links = trail.querySelectorAll("a");
    var current = trail.querySelector('[aria-current="page"]') || links[0];

    var place = function (link) {
      if (!link) return;
      var a = link.getBoundingClientRect();
      var b = trail.getBoundingClientRect();
      trail.style.setProperty("--x", a.left - b.left + a.width / 2 + "px");
    };

    links.forEach(function (link) {
      link.addEventListener("mouseenter", function () { place(link); });
      link.addEventListener("focus", function () { place(link); });
      link.addEventListener("mouseleave", function () { place(current); });
      link.addEventListener("blur", function () { place(current); });
    });
    window.addEventListener("resize", function () { place(current); });
    // Wait for fonts so link widths are final
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () { place(current); });
    place(current);
  }

  /* ---------- Header line appears after scrolling ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll reveal ---------- */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Photo slots: if an image file is missing, show the placeholder ---------- */
  document.querySelectorAll(".photo img").forEach(function (img) {
    var drop = function () { img.remove(); };
    img.addEventListener("error", drop);
    if (img.complete && img.naturalWidth === 0) drop();
  });

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
