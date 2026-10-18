/* Obra Market — localized UI chrome (English / Indonesian / Brazilian Portuguese).
   Product and editorial copy stays English in this global-catalog preview. */
(function () {
  "use strict";

  var DICT = {
    en: {
      "nav.products": "Products", "nav.categories": "Categories", "nav.guides": "Guides",
      "nav.about": "About", "nav.contact": "Contact", "nav.faq": "FAQ",
      "search.placeholder": "Search 75 preview listings…",
      "search.noResults": "No matches. Try “prompt”, “Notion”, “boilerplate”…",
      "cta.buy": "Preview listing", "cta.cart": "Add to demo cart", "cta.checkout": "Checkout disabled",
      "cart.title": "Your demo cart", "cart.empty": "Your demo cart is empty — explore the preview catalog.",
      "cart.total": "Sample total", "cart.clear": "Clear",
      "product.includes": "What's included", "product.faq": "FAQ", "product.details": "Details",
      "product.license": "Sample license tier", "license.personal": "Personal", "license.extended": "Extended",
      "license.personalDesc": "1 seat · personal projects", "license.extendedDesc": "Unlimited seats · client work",
      "hero.eyebrow": "A preview catalog for makers",
      "footer.products": "Collections", "footer.resources": "Resources", "footer.company": "Company",
      "footer.legal": "Legal", "footer.rights": "All rights reserved.",
      "toast.added": "Added to demo cart", "toast.bought": "Preview only — checkout is not available.",
      "toast.copied": "Link copied to clipboard",
      "lang.label": "Language", "theme.label": "Toggle theme",
      "related.title": "Related concepts"
    },
    id: {
      "nav.products": "Produk", "nav.categories": "Kategori", "nav.guides": "Panduan",
      "nav.about": "Tentang", "nav.contact": "Kontak", "nav.faq": "FAQ",
      "search.placeholder": "Cari 75 listing pratinjau…",
      "search.noResults": "Tidak ada hasil. Coba “prompt”, “Notion”, “boilerplate”…",
      "cta.buy": "Lihat pratinjau", "cta.cart": "Masukkan keranjang demo", "cta.checkout": "Checkout belum tersedia",
      "cart.title": "Keranjang demo", "cart.empty": "Keranjang demo masih kosong — jelajahi katalog pratinjau.",
      "cart.total": "Total contoh", "cart.clear": "Bersihkan",
      "product.includes": "Isi konsep", "product.faq": "FAQ", "product.details": "Detail",
      "product.license": "Contoh lisensi", "license.personal": "Pribadi", "license.extended": "Diperluas",
      "license.personalDesc": "1 pengguna · proyek pribadi", "license.extendedDesc": "Tanpa batas · proyek klien",
      "hero.eyebrow": "Katalog pratinjau untuk para kreator",
      "footer.products": "Koleksi", "footer.resources": "Sumber daya", "footer.company": "Perusahaan",
      "footer.legal": "Legal", "footer.rights": "Hak cipta dilindungi.",
      "toast.added": "Ditambahkan ke keranjang demo", "toast.bought": "Pratinjau saja — checkout belum tersedia.",
      "toast.copied": "Tautan disalin",
      "lang.label": "Bahasa", "theme.label": "Ganti tema",
      "related.title": "Konsep terkait"
    },
    "pt-BR": {
      "nav.products": "Produtos", "nav.categories": "Categorias", "nav.guides": "Guias",
      "nav.about": "Sobre", "nav.contact": "Contato", "nav.faq": "FAQ",
      "search.placeholder": "Busque 75 listagens de prévia…",
      "search.noResults": "Nada por aqui. Tente “prompt”, “Notion”, “boilerplate”…",
      "cta.buy": "Ver prévia", "cta.cart": "Adicionar ao carrinho de demonstração", "cta.checkout": "Checkout indisponível",
      "cart.title": "Carrinho de demonstração", "cart.empty": "Seu carrinho de demonstração está vazio — explore o catálogo de prévia.",
      "cart.total": "Total ilustrativo", "cart.clear": "Limpar",
      "product.includes": "O que está previsto", "product.faq": "FAQ", "product.details": "Detalhes",
      "product.license": "Licença de exemplo", "license.personal": "Pessoal", "license.extended": "Estendida",
      "license.personalDesc": "1 pessoa · projetos pessoais", "license.extendedDesc": "Pessoas ilimitadas · trabalhos para clientes",
      "hero.eyebrow": "Um catálogo de prévia para quem cria",
      "footer.products": "Coleções", "footer.resources": "Recursos", "footer.company": "Empresa",
      "footer.legal": "Legal", "footer.rights": "Todos os direitos reservados.",
      "toast.added": "Adicionado ao carrinho de demonstração", "toast.bought": "Apenas prévia — checkout indisponível.",
      "toast.copied": "Link copiado",
      "lang.label": "Idioma", "theme.label": "Alternar tema",
      "related.title": "Conceitos relacionados"
    }
  };

  var current = "en";
  try { current = localStorage.getItem("obra_lang") || "en"; } catch (e) {}

  function t(key) {
    var dictionary = DICT[current] || DICT.en;
    return dictionary[key] || DICT.en[key] || key;
  }

  function apply() {
    document.documentElement.lang = current === "pt-BR" ? "pt-BR" : current;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (el.tagName === "INPUT" && el.hasAttribute("placeholder")) el.placeholder = t(key);
      else el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    document.dispatchEvent(new CustomEvent("obra:i18n", { detail: { lang: current } }));
  }

  function setLang(lang) {
    if (!DICT[lang]) lang = "en";
    current = lang;
    try { localStorage.setItem("obra_lang", lang); } catch (e) {}
    apply();
  }

  window.ObraI18n = { t: t, apply: apply, setLang: setLang, get lang() { return current; }, langs: Object.keys(DICT) };
})();
