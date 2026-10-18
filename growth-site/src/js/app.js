/* Obra Store — app interactions: theme, i18n, search, cart, tabs, reveal, toast.
   Zero dependencies, progressive enhancement everywhere. */
(function () {
  "use strict";

  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  /* ---------- Theme ---------- */
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("obra_theme"); } catch (e) {}
    var theme = saved || (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
    var btn = $("#theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        theme = theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", theme);
        try { localStorage.setItem("obra_theme", theme); } catch (e) {}
      });
    }
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    var toggle = $("#nav-toggle"), menu = $("#mobile-menu");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", function () { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); });
    });
  }

  /* ---------- i18n ---------- */
  function initI18n() {
    if (!window.ObraI18n) return;
    var sel = $("#lang-select");
    if (sel) {
      sel.value = window.ObraI18n.lang;
      sel.addEventListener("change", function () { window.ObraI18n.setLang(sel.value); });
    }
    window.ObraI18n.apply();
  }

  /* ---------- Toast ---------- */
  function toast(msg) {
    var zone = $(".toast-zone");
    if (!zone) return;
    var el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    zone.appendChild(el);
    setTimeout(function () { el.style.opacity = "0"; setTimeout(function () { el.remove(); }, 300); }, 2400);
  }

  /* ---------- Cart (localStorage) ---------- */
  var CART_KEY = "obra_cart";
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch (e) { return []; }
  }
  function setCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
    var badge = $("#cart-count");
    if (badge) {
      var n = items.reduce(function (a, i) { return a + i.qty; }, 0);
      badge.textContent = n;
      badge.style.display = n ? "grid" : "none";
    }
  }
  function addToCart(id, name, price) {
    var cart = getCart();
    var found = cart.find(function (i) { return i.id === id; });
    if (found) found.qty += 1; else cart.push({ id: id, name: name, price: price, qty: 1 });
    setCart(cart);
    toast((window.ObraI18n ? window.ObraI18n.t("toast.added") : "Added to cart") + " — " + name);
  }
  function renderCart() {
    var zone = $("#cart-items"), totalEl = $("#cart-total");
    if (!zone) return;
    var cart = getCart();
    if (!cart.length) {
      zone.innerHTML = '<p class="empty-note">' + (window.ObraI18n ? window.ObraI18n.t("cart.empty") : "Your cart is empty.") + "</p>";
      if (totalEl) totalEl.textContent = "$0.00";
      return;
    }
    var total = 0;
    zone.innerHTML = cart.map(function (i) {
      total += i.price * i.qty;
      return '<div class="cart-item">' +
        '<div style="flex:1"><b>' + escapeHtml(i.name) + '</b><span class="ci-price">' + i.qty + ' × $' + i.price.toFixed(2) + "</span></div>" +
        '<button class="icon-btn" data-remove="' + i.id + '" aria-label="Remove">✕</button></div>';
    }).join("");
    if (totalEl) totalEl.textContent = "$" + total.toFixed(2);
    $$("[data-remove]", zone).forEach(function (b) {
      b.addEventListener("click", function () {
        setCart(getCart().filter(function (i) { return i.id !== b.getAttribute("data-remove"); }));
        renderCart();
      });
    });
  }
  function initCart() {
    setCart(getCart());
    var drawer = $("#cart-drawer"), backdrop = $("#drawer-backdrop");
    var openBtn = $("#cart-open");

    function openDrawer() {
      if (drawer) {
        drawer.classList.add("open");
        drawer.setAttribute("aria-hidden", "false");
        drawer.removeAttribute("inert");
      }
      if (backdrop) backdrop.classList.add("open");
      if (openBtn) openBtn.setAttribute("aria-expanded", "true");
      var closeBtn = $("#cart-close");
      if (closeBtn) closeBtn.focus();
    }

    function closeDrawer() {
      if (drawer) {
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", "true");
        drawer.setAttribute("inert", "");
      }
      if (backdrop) backdrop.classList.remove("open");
      if (openBtn) {
        openBtn.setAttribute("aria-expanded", "false");
        openBtn.focus();
      }
    }

    $$("[data-add-cart]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        addToCart(btn.getAttribute("data-add-cart"), btn.getAttribute("data-name") || "Item", parseFloat(btn.getAttribute("data-price") || "0"));
        if (drawer) { openDrawer(); renderCart(); }
      });
    });

    if (drawer && backdrop) {
      backdrop.addEventListener("click", closeDrawer);
      var closeBtn = $("#cart-close");
      if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
      if (openBtn) openBtn.addEventListener("click", function () { openDrawer(); renderCart(); });
      var clearBtn = $("#cart-clear");
      if (clearBtn) clearBtn.addEventListener("click", function () { setCart([]); renderCart(); });
      var checkoutBtn = $("#cart-checkout");
      if (checkoutBtn) checkoutBtn.addEventListener("click", function () {
        toast(window.ObraI18n ? window.ObraI18n.t("toast.bought") : "Preview only — checkout is not available.");
        closeDrawer();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && drawer.classList.contains("open")) closeDrawer();
      });
    }
    renderCart();
  }

  /* ---------- Search overlay ---------- */
  function initSearch() {
    var overlay = $("#search-overlay"), input = $("#search-input"), results = $("#search-results");
    if (!overlay || !input) return;
    var catalog = window.OBRA_CATALOG || [];
    function open() { overlay.classList.add("open"); setTimeout(function () { input.focus(); }, 30); render(""); }
    function close() { overlay.classList.remove("open"); input.value = ""; }
    $$("[data-search-open]").forEach(function (b) { b.addEventListener("click", open); });
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); open(); }
      if (e.key === "Escape") close();
    });
    input.addEventListener("input", function () { render(input.value); });
    document.addEventListener("obra:catalog-live", function (event) {
      catalog = event.detail || catalog;
      if (overlay.classList.contains("open")) render(input.value);
    });
    function render(q) {
      q = q.trim().toLowerCase();
      var hits = q
        ? catalog.filter(function (p) {
            return (p.name + " " + p.tagline + " " + (p.tags || []).join(" ") + " " + p.categoryName).toLowerCase().indexOf(q) > -1;
          }).slice(0, 8)
        : catalog.slice(0, 5);
      results.innerHTML = hits.length
        ? hits.map(function (p) {
            return '<a href="' + p.url + '"><span><span class="sr-cat">' + escapeHtml(p.categoryName) + "</span><br><b>" + escapeHtml(p.name) + "</b></span><span class=\"mono\">$" + p.price + "</span></a>";
          }).join("")
        : '<p class="empty-note">' + (window.ObraI18n ? window.ObraI18n.t("search.noResults") : "No matches.") + "</p>";
    }
  }

  /* ---------- Tabs ---------- */
  function initTabs() {
    var tabs = $$("[role=tablist]");
    tabs.forEach(function (list) {
      var buttons = $$('[role="tab"]', list);
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) { b.setAttribute("aria-selected", "false"); });
          btn.setAttribute("aria-selected", "true");
          var panelId = btn.getAttribute("aria-controls");
          $$(".tab-panel", list.parentElement).forEach(function (p) { p.hidden = p.id !== panelId; });
        });
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    var els = $$("[data-count]");
    els.forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var t0 = null, dur = 900;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { if (en.isIntersecting) { requestAnimationFrame(step); io.disconnect(); } });
        }, { threshold: 0.4 });
        io.observe(el);
      } else { el.textContent = target.toLocaleString() + suffix; }
    });
  }

  /* ---------- Newsletter ---------- */
  function initNewsletter() {
    var form = $("#newsletter-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = $("input[type=email]", form);
      if (input && input.value.indexOf("@") > -1) {
        form.innerHTML = "<p style='color:var(--success);font-weight:600'>" +
          (window.ObraI18n ? window.ObraI18n.t("newsletter.done") : "Subscribed.") + "</p>";
      }
    });
  }

  /* ---------- License selector ---------- */
  function initLicense() {
    var opts = $$(".license-opt");
    var priceEl = $("#pd-price");
    if (!opts.length || !priceEl) return;
    var base = parseFloat(priceEl.getAttribute("data-base") || "0");
    var pageMeta = document.querySelector('meta[name="obra-page"][data-product]');
    document.addEventListener("obra:catalog-live", function (event) {
      if (!pageMeta) return;
      var live = (event.detail || []).find(function (product) { return product.slug === pageMeta.getAttribute("data-product"); });
      if (live) base = Number(live.price) || base;
    });
    opts.forEach(function (opt) {
      opt.addEventListener("click", function () {
        opts.forEach(function (o) { o.classList.remove("active"); o.setAttribute("aria-pressed", "false"); });
        opt.classList.add("active");
        opt.setAttribute("aria-pressed", "true");
        var mult = parseFloat(opt.getAttribute("data-mult") || "1");
        var price = base * mult;
        priceEl.textContent = "$" + (price % 1 ? price.toFixed(2) : price);
        var btn = $("#buy-btn");
        if (btn) btn.setAttribute("data-price", String(price));
      });
    });
  }

  /* ---------- Optional analytics consent ---------- */
  function initConsent() {
    var banner = $("#consent-banner");
    if (!banner || !window.ObraSupabase || !window.ObraSupabase.isConfigured()) return;
    $$('[data-privacy-open]').forEach(function (button) {
      button.addEventListener("click", function () {
        banner.hidden = false;
        var acceptButton = $("#consent-accept");
        if (acceptButton) acceptButton.focus();
      });
    });
    var stored = null;
    try { stored = localStorage.getItem("obra_analytics_consent"); } catch (e) {}
    if (!stored) banner.hidden = false;
    var accept = $("#consent-accept"), decline = $("#consent-decline");
    if (accept) accept.addEventListener("click", function () {
      try { localStorage.setItem("obra_analytics_consent", "accepted"); } catch (e) {}
      banner.hidden = true;
      initAnalytics();
    });
    if (decline) decline.addEventListener("click", function () {
      try { localStorage.setItem("obra_analytics_consent", "declined"); } catch (e) {}
      banner.hidden = true;
    });
  }

  /* ---------- Supabase access logging (only after opt-in) ---------- */
  function initAnalytics() {
    if (!window.ObraSupabase || !window.ObraSupabase.isConfigured()) return;
    try { if (localStorage.getItem("obra_analytics_consent") !== "accepted") return; } catch (e) { return; }
    var meta = document.querySelector('meta[name="obra-page"]');
    window.ObraSupabase.logAccess({
      productSlug: meta ? meta.getAttribute("data-product") : null,
      pagePath: location.pathname
    }).catch(function () {});
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initMenu();
    initI18n();
    initCart();
    initSearch();
    initTabs();
    initReveal();
    initCounters();
    initNewsletter();
    initLicense();
    initConsent();
    initAnalytics();
  });
})();
