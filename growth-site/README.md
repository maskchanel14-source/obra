# Balcão

A standalone, zero-dependency static site in Brazilian Portuguese: **one starting guide + 99 scenario guides = exactly 100 HTML pages**. It lives inside this repository without changing the Superpowers plugin. The niche is practical WhatsApp customer-service workflows for small local businesses, not a claim that any keyword has verified volume or that a tool has been personally tested.

## Run it

```bash
cd growth-site
npm run keywords   # only after editing content.mjs, data/workflows.mjs or data/sectors/
npm run check      # builds dist/ and checks all 100 pages
python3 -m http.server 4173 --bind 0.0.0.0 --directory dist
```

The source of truth is `content.mjs` + `data/sectors/` + `data/workflows.mjs` + `data/checks.mjs`. `data/keywords.json` is a checked-in export of 100 distinct **keyword hypotheses**. The generator builds canonical metadata, Article/WebSite JSON-LD, `robots.txt`, `sitemap.xml`, internal links and asset files together. Only `dist/` is deployed; it is ignored by Git. Source references and the limits of the niche research are in [`RESEARCH.md`](RESEARCH.md).

## Vercel

Project: `balcao-guias` (team: small signal studio). Git source: `maskchanel14-source/obra`. Project root: `growth-site`; build: `npm run build`; output: `dist`; configured domain: `https://balcao-guias.vercel.app`. `growth-site/vercel.json` mirrors the static build settings. Canonicals default to that domain; `SITE_URL` can override it only with an HTTPS origin.

**Deployment truth:** a Git link alone does not prove auto-deploy is enabled. The project-creation response reported `gitProviderOptions.createDeployments: disabled`. Check the Vercel project settings before assuming future pushes deploy automatically. A verified deployment from the current branch can be created explicitly; `progress_log.json` separates generated, validated, pushed and published counts. The repository's session branch is fixed; do not push to `main` just to make production branch deployment happen.

## Affiliate links, without fake referrals

`data/affiliate-links.json` has two empty slots (`make`, `n8n`). With empty slots, buttons go to the vendors' **official pages** and the site says no active commission exists. Each recommendation button includes `data-affiliate="INSERT_YOUR_REF"` and a stable `data-affiliate-key`; these are placeholders, not live tracking codes. When an approved partner URL is available, replace the relevant empty value with its HTTPS URL, run `npm run check`, and deploy. The build then marks that link `rel="sponsored"` and updates the disclosure. Never paste credentials, customer data, or an unapproved referral claim into the repository.

The app can handle greetings, away messages, quick replies, labels and a catalog; some accounts also have native AI features. Connecting external agendas, inventory or CRMs may call for the official Business Platform and an integration. Business-initiated messages require proper permission and may need an approved template. Pricing and availability change: follow the official links instead of copying an old price into these guides. Payment screenshots are never treated as proof of a settled Pix transfer.

## Editorial and QA rules

- Keep every new scenario useful on its own: a specific customer question, tailored reply, first action and human handoff. Do not create swapped-keyword doorway pages.
- Never promise results, quote unverified prices, invent testimonials or imply a platform was tested hands-on.
- Check spelling and local phrasing in pt-BR, especially money, dates and service names.
- `npm test` verifies page count, keyword/source uniqueness, metadata, internal links, sitemap, affiliate placeholders, output escaping, and responsive/accessibility hooks. Review a sample page in a browser before publishing any changed copy.
