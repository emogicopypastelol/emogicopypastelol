# SEO & Web Performance Deep Audit

**Project:** CopyPaste Unicode (apps/web)  
**Audit date:** 2026-10-01  
**Audit type:** Source and generated-build audit; not a live ranking or field-performance report.

## Executive result

| Measure | Score | Meaning |
|---|---:|---|
| SEO readiness | **79 / 100** | Strong technical foundation; content quality and sitelink outcomes still depend on search engines and real search data. |
| Performance readiness | **67 / 100** | Static delivery is a strength; JavaScript startup and one unusually large category page are the main cost centers. |
| Combined code-readiness score | **73 / 100** | Equal-weight composite: **(79 + 67) ÷ 2**. |

These are **heuristic audit scores**, not Google's scores, a Lighthouse result, ranking probability, or a claim that Core Web Vitals pass. The score weights are published below so the result is reproducible. Core Web Vitals have no pass/fail values in this report because no production field data or Lighthouse run was available.

## How the score was calculated

Each area is graded against its listed maximum using repository and build evidence. SEO and performance receive equal weight:

**Combined = 0.50 × SEO + 0.50 × Performance**

### SEO: 79 / 100

| Area | Earned | Audit basis |
|---|---:|---|
| Crawlability and indexation | **18 / 20** | robots.ts allows pages, blocks APIs and raw search data, and advertises a sitemap. The generated sitemap contains **2,111 unique URLs** in **371,961 bytes**, well below Google's single-sitemap limits. Search/legal utility pages are noindex and are excluded. |
| Titles, descriptions, canonicals, social metadata | **17 / 20** | Global metadata and route-level titles, descriptions, canonicals, Open Graph and Twitter metadata are present. Category and character routes are statically generated. Production URL/redirect behavior was not checked. |
| Internal links and standard-sitelink readiness | **16 / 20** | Main sections have server-rendered anchor links with href destinations; category cards, footer and /info add useful crawl paths. Some popular pages are linked in the footer/directory rather than given top-level prominence. Search-result sitelinks remain algorithmic. |
| Structured data and image previews | **11 / 15** | WebSite, WebApplication, ItemList and BreadcrumbList markup are present. Their presence does not guarantee a rich result. SearchAction in the WebSite graph is for the retired sitelinks search box, not ordinary sitelinks. |
| Content usefulness and page differentiation | **10 / 15** | Category indexes provide descriptions and character previews; detail routes expose individual character data. At 2,111 indexable URLs, many pages share a generated template, so search performance depends on whether the individual pages meet distinct user intent and earn impressions. This is a quality risk to validate, not a confirmed duplicate-content finding. |
| Semantics, mobile and trust signals | **7 / 10** | The source includes labeled navigation/search/buttons, image alt text, responsive layout classes, an About/data-sources page, icons and a web manifest. No automated accessibility audit or real-device review was available. |
| **Total** | **79 / 100** | |

### Performance: 67 / 100

| Area | Earned | Audit basis |
|---|---:|---|
| Server rendering and static generation | **18 / 20** | Main content is server-rendered; the inspected build contains **2,126 prerendered routes**. Initial homepage emoji are server-rendered and the remaining list is progressive. |
| HTML weight and DOM work | **12 / 20** | Across **2,116 generated HTML files**, raw HTML totals **136,322,472 bytes**; median is **61,278 bytes**, p95 **75,364 bytes**. /emoji/people-body is **862,735 bytes raw** (about **11.45×** p95). Its local gzip estimate is 74,118 bytes, but the browser still parses the larger document and its DOM; the rendered file contains 388 button elements and 229 image tags. |
| Client JavaScript and hydration | **9 / 20** | Generated pages reference 10 unique JS assets. The homepage references about **627,248 raw bytes / 194,630 bytes gzip-estimated**; a detail or large category page references about **637,427 / 197,222 bytes**. This is an asset-reference estimate, not measured network transfer; compression, cache hits and route transitions affect actual bytes. |
| Images, fonts and layout stability | **11 / 15** | Twemoji images specify dimensions and use lazy loading/async decoding; the font uses swap; ad/tray slots reserve space; CSS uses content-visibility. The image host is external (cdn.jsdelivr.net), and field CLS/LCP have not been measured. |
| Search and data loading | **9 / 15** | Search indexes are split into three files totaling **328,187 raw bytes**, about **56,009 bytes gzip-estimated**. The SearchBox warms the full index during idle time, improving first-search latency while spending bandwidth for users who never search. A similarly sized combined fallback is also deployed. |
| Delivery, caching and build behavior | **8 / 10** | Compression is enabled; fingerprinted assets receive immutable long caching; stable /data/* URLs revalidate. The sitemap has an environment-controlled content date but falls back to a fixed **2026-09-22** value. The inspected build completed and emitted all routes, though the restricted build environment logged some dynamic Open Graph font-fetch warnings. |
| **Total** | **67 / 100** | |

HTML gzip estimates use local gzip level 6 on generated output. JavaScript gzip estimates sum per-file gzip level 6 results. Neither is a deployed Brotli/gzip response measurement.

## Detailed findings

### SEO and search-result sitelinks

**What is already in place**

- Homepage and section pages have clear H1s; the homepage H1 covers Emoji, Symbols and Unicode.
- Category and detail pages provide route-specific metadata and canonicals.
- The homepage and section pages render crawlable internal links, not only JavaScript click handlers.
- The sitemap has 2,111 unique page URLs and remains far below the single-file size/URL limits.
- /search, /privacy, and /terms are deliberately noindex; raw JSON indexes and /api/ are excluded from crawling.
- The generated build already includes direct top-level links to Emoji, Symbols and Kaomoji, plus footer/directory links to popular symbol categories.
- The older homepage FAQ markup was removed because it did not match visible page content. Search-index fallback handling and stable-data cache revalidation were also improved in the current worktree.

**Sitelinks-specific result**

Google describes standard sitelinks as automated: its systems analyze site structure and show them only when useful for a query. This project has the right basic signals—concise section names, direct links, supporting directory links and a logical category hierarchy—but no code can force Google to display a chosen sitelink. Keep the main section links prominent and link important destinations from relevant pages with concise anchor text. [Google's sitelinks guidance](https://developers.google.com/search/docs/appearance/sitelinks?hl=en) · [Google link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)

The SearchAction markup is unrelated to standard result sitelinks. Google retired the **sitelinks search box** on November 21, 2024; that change did not affect normal sitelinks or rankings. Removing the old property is optional cleanup, not a ranking fix. [Google's retirement notice](https://developers.google.com/search/blog/2024/10/sitelinks-search-box?hl=en)

**Remaining SEO risks**

1. **Generated-page quality at scale — medium priority.** A large indexable set is useful only if each route satisfies a distinct query. Review Search Console impressions, clicks, indexing and canonical selection by route family; improve or consolidate pages that get no distinct demand. This audit did not establish that Google considers these pages thin or duplicate.
2. **Sitemap change dates — medium priority.** If content changes and deployment does not set CONTENT_UPDATED_AT, entries retain the fixed fallback date. Automate this value from the content/build pipeline, or track meaningful per-page updates.
3. **Old SearchAction — low priority.** It does not implement ordinary sitelinks and is associated with a discontinued search-box appearance. It may be removed for clarity, but Google says the retired markup does not need removal.
4. **Open Graph build dependency — verify deployment.** The inspected build logged a few dynamic font-fetch warnings in this restricted environment while still generating routes. Confirm production image generation can retrieve what it needs.

### Performance and Web Vitals

**Largest measurable outlier:** /emoji/people-body is 862,735 bytes raw versus a 75,364-byte p95 page. Its compressed estimate is more modest, but its unusually large HTML/DOM (388 buttons and 229 images in the generated document) can increase parsing, style/layout and memory work, especially on low-end phones. Measure it before changing the page shape. If it causes slow LCP/TBT or interaction delay, render a smaller initial slice and provide crawlable links/pagination for the remaining content.

**JavaScript baseline:** 10 unique JS resources are referenced on representative pages. The homepage baseline is approximately 194,630 bytes after independent-file gzip estimation. Prioritize reducing globally loaded client behavior and keeping interaction-only components out of the initial route bundle; verify changes with a production build and browser waterfall.

**Search bandwidth trade-off:** idle prefetch makes search feel ready before the first query, but it fetches about 56 KB compressed-estimated from the modular indexes even when a visitor does not search. Compare first-search latency and transfer on mobile before deciding whether to defer fetch until focus or typing. Do not remove the fallback while it is still used by the loader.

**Current Core Web Vitals status: unknown.** The current good thresholds are assessed at the 75th percentile, segmented by mobile and desktop: **LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1**. The source contains several layout-stability safeguards, but these do not prove the thresholds are met. [web.dev Web Vitals](https://web.dev/articles/vitals?authuser=23)

## Priority plan

| Priority | Work | Why |
|---|---|---|
| 1 | Capture mobile and desktop PageSpeed/Lighthouse for /, /emoji/people-body, one detail page, /symbols/hearts, and /search. | Separates actual LCP/TBT/CLS regressions from source-level risks. |
| 2 | Check Search Console Core Web Vitals and indexing/canonical reports by route family. | Provides real-user performance and shows whether the 2,111-page catalog earns/keeps indexation. |
| 3 | If lab/field data agrees, reduce initial HTML/DOM on /emoji/people-body while retaining crawlable access to the full catalog. | It is the clear HTML-size outlier. |
| 4 | Measure the global JS waterfall and consider deferring interaction-only client behavior. | Current route references approach 195 KB gzip-estimated before search JSON. |
| 5 | Compare search-prefetch bandwidth against time-to-first-result on mobile; choose the trade-off from data. | Current idle preload is helpful but nonessential for visitors who never search. |
| 6 | Make sitemap content timestamps automatic and verify Open Graph image generation in the actual deploy environment. | Prevents stale update hints and catches deployment-only image issues. |

## Production verification needed for a final user-experience score

This source/build audit did not access Search Console, production response headers, a browser waterfall, Lighthouse, PageSpeed Insights, CrUX, or real-user monitoring. To claim Core Web Vitals pass, verify all three metrics at p75 on mobile and desktop. Google identifies field data and lab data as complementary, not interchangeable. Check status/redirect/canonical behavior, sitemap and robots responses, compression/cache headers, and representative rendered metadata in production.