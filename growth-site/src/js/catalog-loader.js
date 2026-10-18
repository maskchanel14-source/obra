/* Optional live catalog hydration from Supabase.
   Static pages remain available as an offline fallback. When configured,
   public catalog fields refresh card/detail copy from the database. */
(function () {
  "use strict";
  if (!window.ObraSupabase || !window.ObraSupabase.isConfigured()) return;

  function normalize(row, categories) {
    var category = row.category_slug || row.category || "";
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      tagline: row.tagline || "",
      description: row.description || "",
      category: category,
      categoryName: (categories.get(category) || {}).name || row.categoryName || "Digital products",
      url: "/products/" + encodeURIComponent(row.slug),
      price: Number(row.price) || 0,
      tags: Array.isArray(row.tags) ? row.tags : [],
      accent: row.accent || "#7928ca",
      mock: row.mock || "copy"
    };
  }

  function formatPrice(value) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  }

  Promise.all([window.ObraSupabase.listProducts(), window.ObraSupabase.listCategories()]).then(function (results) {
    var rows = results[0], categoryRows = results[1] || [];
    if (!rows || !rows.length) return;
    var categories = new Map(categoryRows.map(function (category) { return [category.slug, category]; }));
    var catalog = rows.map(function (row) { return normalize(row, categories); });
    window.OBRA_LIVE_CATALOG = catalog;
    var bySlug = new Map(catalog.map(function (product) { return [product.slug, product]; }));

    document.querySelectorAll("[data-product-card]").forEach(function (card) {
      var product = bySlug.get(card.getAttribute("data-product-card"));
      if (!product) return;
      var name = card.querySelector('[data-live-field="name"]');
      var tagline = card.querySelector('[data-live-field="tagline"]');
      var price = card.querySelector('[data-live-field="price"]');
      if (name) { name.textContent = product.name; name.href = product.url; }
      if (tagline) tagline.textContent = product.tagline;
      if (price) price.textContent = formatPrice(product.price);
    });

    var pageMeta = document.querySelector('meta[name="obra-page"][data-product]');
    var current = pageMeta && bySlug.get(pageMeta.getAttribute("data-product"));
    if (current) {
      document.querySelectorAll('[data-live-field="name"]').forEach(function (el) { el.textContent = current.name; });
      document.querySelectorAll('[data-live-field="tagline"]').forEach(function (el) { el.textContent = current.tagline; });
      document.querySelectorAll('[data-live-field="description"]').forEach(function (el) { el.textContent = current.description; });
      document.querySelectorAll('[data-live-field="price"]').forEach(function (el) {
        el.textContent = formatPrice(current.price);
        if (el.id === "pd-price") el.setAttribute("data-base", String(current.price));
      });
      var buyButton = document.querySelector("[data-add-cart]");
      if (buyButton) {
        buyButton.setAttribute("data-name", current.name);
        buyButton.setAttribute("data-price", String(current.price));
      }
    }
    document.dispatchEvent(new CustomEvent("obra:catalog-live", { detail: catalog }));
  }).catch(function () { /* offline fallback: bundled catalog */ });
})();
