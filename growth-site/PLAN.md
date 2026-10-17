# Balcão — build brief

**Purpose.** A Brazilian Portuguese field guide to organizing customer conversations on WhatsApp for small local businesses. The initial release is an editorial test, not a claim of search rankings, conversion rates, revenue, or tool hands-on testing.

**Audience.** Owners/operators who already answer customers on WhatsApp and need one concrete, safe next step. Copy should sound like a helpful person behind the counter: direct, specific, warm, and free of miracle claims.

**Scope.** Exactly 100 public HTML documents: one useful home guide and 99 scenario guides (11 business types × 9 distinct jobs). Each page has a unique search-intent hypothesis, a tailored example, a practical setup step, a human handoff, a measurement idea, an honest tool path, and a visible affiliate placeholder. The home page is one of the 100, not page 101.

**Architecture.** Standalone zero-dependency Node static generator in `growth-site/`, with generated output in ignored `growth-site/dist/`. Vercel project `balcao-guias` uses this directory as its root, runs `npm run build`, and serves `dist`. Do not change the Superpowers plugin, its package manifest, or its skills. One source of truth drives pages, sitemap, keyword inventory, and internal links. Canonicals use the assigned project domain `https://balcao-guias.vercel.app`.

**Design.** An editorial, product-quality interface: ink/ivory/lime palette, generous rhythm, compact labels, a real workflow illustration made from HTML/CSS, keyboard-friendly filters, system-font typography, responsive grids, reduced-motion support, semantic sections, and no client-side framework. No fake reviews, countdowns, fabricated savings, or unsupported prices.

**Safety and trust.** Distinguish WhatsApp Business app features from integrations using the official Business Platform. Initiated messages need permission and may require approved templates; check current Meta pricing before scaling. Pix is only a proposed payment flow, never an automatic proof of settlement. Always give a human route. Official vendor links are the working default; `data-affiliate="INSERT_YOUR_REF"` is the central, replaceable placeholder, not a claim of an active partnership.

**Quality gates.** Test the 100-page count; uniqueness and substance of source content; HTML metadata; canonical/sitemap agreement; internal links and section anchors; placeholder presence; output escaping; accessibility and responsive affordances; and a production build. Check a served sample locally. Then commit/push on the session branch and verify the actual Vercel deployment and public URLs. Keep `progress_log.json` factual: generated is not the same as published.

**Important limitation.** A platform cannot honestly run an infinite autonomous growth loop from this one task. This release is a 100-page initial test, with reproducible build/check commands and a log of deployment facts. Editorial quality and search performance still need real-world review and Search Console data.
