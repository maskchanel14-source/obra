# Obra Market — storefront preview

A zero-dependency, static-first storefront prototype for digital product concepts. It is built from JSON data and renders **exactly 100 indexable HTML pages**:

| Page type | Count |
|---|---:|
| Home | 1 |
| Collections | 10 |
| Product preview listings | 75 |
| Editorial guides | 8 |
| Utility / policy pages | 6 |
| **Total** | **100** |

All product listings, specs, FAQ answers, and sample prices are illustrative. There are no downloadable product files, customer accounts, payment processing, or live checkout in this preview. Do not present the catalog as live inventory without verifying and replacing its contents.

## Local development

Requires Node.js 18 or newer; no package install is required.

```sh
npm run build      # generates the static site in dist/
npm run validate   # checks the 100-page target, metadata, internal links, and assets
npm run dev        # serves dist/ at http://localhost:4173
```

Pages are written as `.html` files, with Vercel `cleanUrls` enabled for extensionless routes. `page-manifest.json` lists the routes and `progress_log.json` records generation status.

## Catalog content

- `data/categories.json`: collection names and descriptions.
- `data/products-*.json`: 75 sample product concepts.
- `data/guides.json`: eight long-form buyer and workflow guides.
- `scripts/generate-store.mjs`: static page renderer, sitemap and manifest generator.
- `scripts/validate-store.mjs`: route, SEO, accessibility-landmark, asset, and internal-link checks.

The catalog themes were selected from the repository scan: agent skills, AI workflows, developer tools, design, and creator operations. This is a repository-informed hypothesis, **not** independent market validation or a profitability claim.

## Design assets

The site reuses **Space Grotesk** and **JetBrains Mono** font files already present in the public `maskchanel14-source/small-signal-site` repository. Their SIL Open Font License texts are included under `src/assets/licenses/` and copied into the static output. The theme system adds a dark-first Vercel/Linear-inspired interface and a warm paper-and-ink light theme based on that existing site.

## Optional Supabase

The static catalog works without a database. To configure a project:

1. Apply `supabase/migrations/001_catalog_schema.sql` in the Supabase SQL editor.
2. Copy `.env.example` to `.env` and set `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and the server-side `SUPABASE_SERVICE_KEY`.
3. Run `npm run sync:supabase` to upsert categories, catalog concepts, SEO keywords, and a sync record.
4. Add only `SUPABASE_URL` and `SUPABASE_ANON_KEY` to Vercel build/runtime environment variables. **Never expose the service key in browser code.**

When public Supabase values are configured at build time, the catalog can hydrate from PostgREST. Optional page-path analytics are disabled until a visitor opts in; the access log stores a page path and optional product slug only. Check provider-level logs, retention, RLS, consent requirements, and local privacy law before enabling it. Order tables are not open to anonymous inserts, and there is no client-side payment or order flow.

No Supabase project is connected by default in this repository.

## Vercel

The existing Vercel project was configured with `growth-site` as its root directory, `npm run build` as the build command, and `dist` as its output directory. The project can build this folder once the branch is deployed. Set `SITE_URL` to the real production origin before a public launch so canonical URLs and the sitemap use the correct domain.

Before taking real orders, add verified product files and fulfillment, payment-provider webhooks, refund/support policies, accurate business details, and a complete legal review. The current preview deliberately does not simulate a successful purchase.
