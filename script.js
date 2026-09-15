
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Ticket "printer" reveal on scroll ---------- */
  var tickets = document.querySelectorAll(".ticket");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    tickets.forEach(function (t) { t.classList.add("is-visible"); });
  } else {
    var ticketObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );
    tickets.forEach(function (t) { ticketObserver.observe(t); });
  }

  /* ---------- Hero stat counters ---------- */
  var counters = document.querySelectorAll("[data-count]");

  function formatValue(target, format) {
    if (format === "plus") return target + "+";
    return String(target);
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var format = el.getAttribute("data-format") || "plain";

    if (format === "year" || prefersReducedMotion) {
      el.textContent = formatValue(target, format);
      return;
    }

    var duration = 900;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);
      el.textContent = formatValue(current, format);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = formatValue(target, format);
      }
    }
    window.requestAnimationFrame(step);
  }

  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
    } else {
      var counterObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach(function (c) { counterObserver.observe(c); });
    }
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();