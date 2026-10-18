/* Obra Store — minimal Supabase client (PostgREST over fetch, zero deps).
   Reads config injected into each static page from build-time environment values.
   When Supabase is not configured, every method resolves to null and the
   store keeps working from its bundled static catalog. */
(function () {
  "use strict";

  var cfg = (window.__STORE_CONFIG__ && window.__STORE_CONFIG__.supabase) || null;
  var headers = { "Content-Type": "application/json" };
  if (cfg && cfg.anonKey) {
    headers.apikey = cfg.anonKey;
    headers.Authorization = "Bearer " + cfg.anonKey;
  }

  function ready() {
    return !!(cfg && cfg.url && cfg.anonKey);
  }

  async function req(method, path, body) {
    if (!ready()) return null;
    var requestHeaders = Object.assign({}, headers);
    if (method !== "GET") requestHeaders.Prefer = "return=minimal";
    var res = await fetch(cfg.url + "/rest/v1/" + path, {
      method: method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) {
      var err = new Error("Supabase " + res.status + " on " + path);
      err.status = res.status;
      throw err;
    }
    var responseText = await res.text();
    return responseText ? JSON.parse(responseText) : null;
  }

  window.ObraSupabase = {
    isConfigured: ready,
    config: cfg,

    /* Catalog */
    listProducts: function () { return req("GET", "products?select=*&order=category_slug.asc,name.asc"); },
    listCategories: function () { return req("GET", "categories?select=*&order=sort_order"); },

    /* Programmatic SEO keywords */
    listKeywords: function () { return req("GET", "seo_keywords?select=*"); },

    /* Customer access log (page-view analytics) */
    logAccess: function (entry) {
      if (!ready()) return Promise.resolve(null);
      return req("POST", "access_logs", {
        product_slug: entry.productSlug || null,
        page_path: entry.pagePath || null
      }).catch(function () { return null; });
    },

  };

})();
