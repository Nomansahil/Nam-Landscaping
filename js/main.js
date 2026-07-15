/* NAM Landscaping, main.js
   Progressive enhancement only: the site works fully without JavaScript.
   1. Mobile nav + services dropdown   2. Header scroll shadow
   3. Scroll-reveal animations         4. Quote form → WhatsApp handoff
*/
(function () {
  "use strict";

  /* 1. Navigation ---------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  function setNav(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open); // lock page scroll so the menu scrolls, not the page
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () { setNav(!nav.classList.contains("is-open")); });
    // Close the menu (and unlock scroll) on Escape or when a link is tapped
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setNav(false); toggle.focus(); }
    });
  }

  document.querySelectorAll(".nav-sub-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
    });
  });
  // Close the desktop dropdown on outside click or Escape
  document.addEventListener("click", function (e) {
    document.querySelectorAll('.nav-sub-toggle[aria-expanded="true"]').forEach(function (btn) {
      if (!btn.parentElement.contains(e.target)) btn.setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll('.nav-sub-toggle[aria-expanded="true"]').forEach(function (btn) {
        btn.setAttribute("aria-expanded", "false");
      });
    }
  });

  /* 2. Header shadow on scroll --------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* 3. Scroll reveal ---------------------------------------------------------
     IntersectionObserver for the staggered effect, plus a rect-based fallback
     (load/scroll/timer) so content can never remain hidden if IO misbehaves. */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  function revealInView() {
    revealEls = revealEls.filter(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight - 40) {
        el.classList.add("is-visible");
        return false;
      }
      return true;
    });
    if (!revealEls.length) window.removeEventListener("scroll", revealInView);
  }
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    }
    window.addEventListener("scroll", revealInView, { passive: true });
    setTimeout(revealInView, 400);
  }

  /* 4. Quote form → WhatsApp handoff ----------------------------------------
     No backend required: on submit, the enquiry is composed into a WhatsApp
     message so the lead lands instantly on the business number (data-whatsapp). */
  document.querySelectorAll("form[data-quote-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var get = function (name) {
        var field = form.elements[name];
        return field && field.value ? field.value.trim() : "";
      };
      var lines = [
        "New enquiry: NAM Landscaping website",
        "Name: " + get("name"),
        "Phone: " + get("phone"),
        get("area") ? "Area: " + get("area") : "",
        get("service") ? "Service: " + get("service") : "",
        get("message") ? "Details: " + get("message") : ""
      ].filter(Boolean);

      var number = form.getAttribute("data-whatsapp") || "971558170150";
      var url = "https://wa.me/" + number + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");

      var status = form.querySelector(".form-status");
      if (status) {
        status.textContent = "Opening WhatsApp with your enquiry. Press send and we'll reply shortly.";
      }
      form.reset();
    });
  });

  /* 5. YouTube facade: swap thumbnail for live iframe on play-click.
     No YouTube JS loads until the user interacts — zero iframe overhead at page load. */
  document.querySelectorAll(".yt-facade").forEach(function (facade) {
    // Thumbnail fallback: if the vertical Shorts thumb (oardefault) isn't available,
    // drop to the always-present hqdefault so a card never shows a blank frame.
    var thumb = facade.querySelector(".yt-thumb");
    if (thumb) {
      thumb.addEventListener("error", function onErr() {
        thumb.removeEventListener("error", onErr);
        thumb.src = "https://i.ytimg.com/vi/" + facade.dataset.videoId + "/hqdefault.jpg";
      });
    }
    facade.querySelector(".yt-play").addEventListener("click", function () {
      var id = facade.dataset.videoId;
      var title = facade.dataset.title || "NAM Landscaping project video";
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0";
      iframe.title = title;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.setAttribute("loading", "lazy");
      facade.parentNode.replaceChild(iframe, facade);
    });
  });

  /* 7. Animated stat counters: the trust-bar numbers count up when scrolled into
     view. Prefix/suffix/commas preserved (e.g. "~80%", "1,000+", "10+ yrs"). */
  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var statEls = Array.prototype.slice.call(document.querySelectorAll(".trust-item strong"));
  function animateStat(el) {
    var m = el.textContent.match(/^(\D*)([\d,.]+)(.*)$/);
    if (!m) return;
    var prefix = m[1], numStr = m[2], suffix = m[3];
    var hasComma = numStr.indexOf(",") > -1;
    var target = parseFloat(numStr.replace(/,/g, ""));
    if (isNaN(target)) return;
    var fmt = function (n) { n = Math.round(n); return hasComma ? n.toLocaleString("en-US") : String(n); };
    var dur = 1100, startTs = null;
    el.setAttribute("aria-label", el.textContent); // screen readers get the final value, not the ticking
    function frame(ts) {
      if (startTs === null) startTs = ts;
      var p = Math.min((ts - startTs) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if (statEls.length && !prefersReduced && "IntersectionObserver" in window && "requestAnimationFrame" in window) {
    var statIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateStat(entry.target); statIO.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    statEls.forEach(function (el) { statIO.observe(el); });
  }

  /* 8. Back-to-top: reveal after scrolling, smooth-scroll to top on click. */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    toTop.hidden = false; // JS present: manage visibility via class so it can fade both ways
    var toTopOnScroll = function () {
      toTop.classList.toggle("is-shown", window.scrollY > 700);
    };
    window.addEventListener("scroll", toTopOnScroll, { passive: true });
    toTopOnScroll();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
      var skip = document.querySelector(".skip-link") || document.body;
      skip.focus && skip.focus();
    });
  }

  /* 6. Video carousel: prev/next arrows scroll the single-row track, and the
     arrows disable themselves at each end. Touch/trackpad swipe works natively. */
  document.querySelectorAll(".vid-carousel").forEach(function (car) {
    var track = car.querySelector(".vid-track");
    var prev = car.querySelector(".vid-nav--prev");
    var next = car.querySelector(".vid-nav--next");
    if (!track) return;
    function step() {
      var card = track.querySelector(".vid-card");
      var one = card ? card.getBoundingClientRect().width + 16 : 220;
      return Math.max(one, track.clientWidth * 0.8); // ~one viewport of cards
    }
    function update() {
      var max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
    }
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

})();
