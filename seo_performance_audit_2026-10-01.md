# SEO & Web Performance Audit — 2026-10-01

## Executive summary

The current codebase has a strong technical SEO baseline: Next.js renders the main content on the server, detail and category pages have page-specific metadata and canonicals, the sitemap covers the generated page set, and low-value routes are marked `noindex`. The homepage also has working structured data and a keyword-relevant H1. Several recommendations in the older `seo_performance_analysis.md` no longer describe the current code.

The highest-confidence SEO issue found is homepage FAQ structured data whose answers are not visible on the page. The main performance concern is the size of large category pages, especially `/emoji/people-body`. Search loading is intentionally warmed in the background, but its combined-index fallback is ineffective when any modular request fails.

**Assessment:** technically sound foundation, with a small number of focused fixes. This is a source/build audit, not a live Core Web Vitals measurement. No source code was changed.

## Scope and evidence

Reviewed the Next.js app, shared components, metadata, sitemap and robots routes, search-index loader, generated public data, and existing audit. Ran the production build using the already-installed Next.js binary after the pinned pnpm wrapper could not verify its release signature from the configured registry. Compilation and TypeScript checks completed, and the build generated 2,126 prerendered routes.

Build output measurements (local, uncompressed unless stated):

- 2,116 generated HTML files occupied **135,226,298 bytes** total.
- Median HTML file: **60,763 bytes**; 95th percentile: **74,845 bytes**.
- Largest page, `/emoji/people-body`: **862,216 bytes raw**, **74,065 bytes with gzip level 6**.
- Homepage: **114,418 bytes raw**, **19,040 bytes gzip level 6**.
- One emoji detail page: **63,402 bytes raw**, **11,366 bytes gzip level 6**.

These gzip figures are local estimates from build output, not measurements of the deployed response. A CDN may use Brotli. No browser Lighthouse run, Search Console inspection, field Core Web Vitals, or production response/header check was available, so no LCP/INP/CLS score is claimed.

## Prioritized findings

### Resolved — Homepage FAQ JSON-LD described content users could not see

**Evidence at initial audit:** `apps/web/app/page.tsx` emitted a `FAQPage` with three questions and answers, but the homepage rendered no corresponding FAQ section. Google's structured-data guidance says markup must represent visible page content; Google also limits FAQ rich results to well-known authoritative government and health sites. For this site, the markup was unlikely to provide a rich-result benefit and did not match visible content. [Google structured-data content policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) · [Google FAQ rich-result changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes)

**Resolution:** removed the FAQ schema. Do not expect FAQ rich results from this site type.

### P2 — One category page is substantially larger than the rest

**Evidence:** `/emoji/people-body` is 862 KB of generated HTML because the category view renders a large collection of emoji buttons and related markup. It compresses well in a local gzip estimate (about 74 KB), but still requires the browser to parse a much larger document and create many DOM nodes. The rest of the HTML set is much smaller (95% at or below about 75 KB raw).

**Recommendation:** inspect this route on a low-end mobile device with Lighthouse or real-user monitoring. If LCP, main-thread work, or interaction latency is poor, render an initial slice and expose the remainder through crawlable pagination or another server-rendered expansion pattern. Preserve links and indexability for the full set; avoid replacing the collection with client-only content.

### Resolved — Modular search errors bypassed the advertised fallback

**Evidence at initial audit:** `loadEmojiIndex`, `loadSymbolsIndex`, and `loadKaomojiIndex` in `apps/web/lib/searchIndex.ts` caught fetch errors and resolved to `[]`. `loadSearchIndex` then used `Promise.all`, which therefore resolved with a partial or empty list and never entered its `.catch()` to fetch `/data/search-index.json`. A transient failure can leave the search incomplete for the rest of the session.

**Resolution:** `loadSearchIndex` now detects empty modular results and enters the existing combined-file fallback.

### P2 — Search prefetch trades bandwidth for faster first use

**Evidence:** the shared `SearchBox` schedules `loadSearchIndex()` during browser idle time (with a timeout fallback), and the loader fetches emoji, symbols, and kaomoji JSON. This avoids waiting for a download after the user starts searching, but users who leave without searching still download the data. The data build also emits a combined fallback file, so the deployment contains a redundant copy even though the normal successful path requests the modular files.

**Recommendation:** keep idle prefetch if first-search responsiveness is the priority. If mobile data or early-session bandwidth is a concern, defer until focus/typing or use a smaller initial index. Compare first-search latency and data transferred before changing this trade-off. Removing the combined fallback file requires fixing the fallback path first.

### Resolved — Public data cache could retain an old index after deployment

**Evidence at initial audit:** `apps/web/next.config.js` assigned `/data/:path*` a one-day `max-age` and seven-day `stale-while-revalidate`. The index URLs are stable names such as `/data/emoji-index.json`; a deployment that changes their contents can leave a browser or intermediary using stale data.

**Resolution:** stable data URLs now require revalidation; fingerprinted static assets retain immutable long caching.

## Confirmed strengths

- Homepage has a descriptive H1 plus `WebSite`, `WebApplication`, and `ItemList` JSON-LD; the old report's claim that homepage structured data was missing is stale.
- The emoji, symbols, and kaomoji index pages have category summaries, preview characters, and relevant bottom-of-page explanatory content. The old report's claimed symbols-page content gap is stale.
- Section-specific Open Graph image routes exist for `/emoji`, `/symbols`, and `/kaomoji`.
- Canonicals are present on representative homepage, category, detail, search, and legal routes. Search, privacy, and terms are intentionally `noindex`; legal pages are appropriately absent from the sitemap.
- Sitemap and robots routes are implemented, and the sitemap deduplicates URLs.
- The homepage server-renders its first 120 emoji and progressively loads the rest. The static grid includes explicit image dimensions and async decoding; ad slots reserve space; the tray reserves minimum height; CSS includes `content-visibility` with intrinsic sizing. The earlier audit's corresponding CLS and prefetch findings are stale or overstated.
- About page now explains the library, search behavior, sources, and privacy. The previous “under 200 words” assessment is stale.
- Production build compiled successfully, passed TypeScript, and generated 2,126 prerendered routes.

## Items requiring production access to verify

1. Run mobile and desktop Lighthouse on the deployed homepage, `/emoji/people-body`, a representative detail page, and `/search`.
2. Review 28-day field LCP, INP, and CLS in Search Console or CrUX; source inspection cannot establish real-user scores.
3. Confirm production status codes, redirects, canonical headers, `robots.txt`, sitemap contents, compression, cache headers, and CDN behavior.
4. Use Search Console URL inspection and structured-data validation for representative routes; this audit did not verify indexing, impressions, manual actions, or rankings.

## Recommended order

1. Correct or remove the invisible homepage FAQ markup.
2. Fix modular search failure handling so the fallback can actually run.
3. Measure `/emoji/people-body` on a constrained mobile profile before changing its rendering strategy.
4. Decide whether idle index prefetch is worth its bandwidth cost, using real first-search and transfer metrics.
5. Version the public data URLs or adjust their cache policy.

## Follow-up implementation — 2026-10-01

The first, second, and fifth items above were implemented after the audit:

- Removed homepage `FAQPage` JSON-LD because the answers were not visible and this site is not eligible for Google's FAQ rich-result treatment.
- Search now detects an empty modular index and proceeds to the combined JSON fallback rather than caching a partial result.
- Stable `/data/*` URLs now use `Cache-Control: public, max-age=0, must-revalidate` so updated index files are revalidated after deployment.
- Added server-rendered direct links to Emoji, Symbols, and Kaomoji in the desktop navigation, matching links in the mobile menu, and a Kaomoji entry in the site directory. These improve crawlable hierarchy and sitelink signals; Google still selects search-result sitelinks automatically.

The production build compiled, passed TypeScript, and generated all 2,126 prerendered routes. The restricted build environment emitted dynamic-font fetch warnings for a few symbols in Open Graph images; route generation still completed. The remaining performance work needs deployed mobile/field measurements before changing category rendering or the intentional idle search prefetch.



