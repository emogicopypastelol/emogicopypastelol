# Structured Data Audit & Fix Report

**Project:** CopyPaste Unicode (`apps/web`)  
**Date:** 2026-10-08  

## Issues Found

### 🔴 Critical — Will cause "Invalid structured data" errors

| # | File | Issue | Fix |
|---|------|-------|-----|
| 1 | [`layout.tsx`](file:///c:/Users/dl/Desktop/Main_Projects_V2/emogi/apps/web/app/layout.tsx) | `WebApplication` type is used but **missing required `aggregateRating` or `review`** property. Google's [SoftwareApplication schema](https://developers.google.com/search/docs/appearance/structured-data/software-app) requires at least a `name`, `offers` with price, AND a rating for rich result eligibility. Without it, Google flags the item as invalid. | **Removed** `WebApplication` entirely — this is a utility website, not a downloadable app. `WebSite` alone is the correct type. |
| 2 | [`layout.tsx`](file:///c:/Users/dl/Desktop/Main_Projects_V2/emogi/apps/web/app/layout.tsx) | `@graph` in layout creates a site-wide WebApplication claim on every page, which doesn't match the per-page content for category/detail pages. | Single `WebSite` type retained, `@graph` wrapper removed since only one entity. |

### 🟡 Warning — Flagged by validators, not standards-compliant

| # | File | Issue | Fix |
|---|------|-------|-----|
| 3 | All pages with BreadcrumbList | Last `ListItem` in BreadcrumbList includes `item` (URL) property. [Google's docs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) recommend omitting `item` from the last breadcrumb since it represents the current page. | Removed `item` from the final breadcrumb entry on all pages. |
| 4 | Multiple pages | Multiple separate `<script type="application/ld+json">` blocks each with their own `@context`. While valid, this is redundant and some audit tools flag it. | Consolidated into single `<script>` blocks using `@graph` where multiple schemas exist on the same page. |
| 5 | [`kaomoji/[slug]/page.tsx`](file:///c:/Users/dl/Desktop/Main_Projects_V2/emogi/apps/web/app/kaomoji/%5Bslug%5D/page.tsx) | `ItemList` entries use fragment URLs (`#kaomoji-{id}`) which aren't independent pages — validators may flag these as non-resolvable. | Changed to use the category page URL as the base, since kaomoji items don't have individual pages. |
| 6 | [`emoji/[slug]/page.tsx`](file:///c:/Users/dl/Desktop/Main_Projects_V2/emogi/apps/web/app/emoji/%5Bslug%5D/page.tsx) & [`symbols/[slug]/page.tsx`](file:///c:/Users/dl/Desktop/Main_Projects_V2/emogi/apps/web/app/symbols/%5Bslug%5D/page.tsx) | `DefinedTerm` is valid Schema.org but is **not a Google-supported rich result type** — it won't cause errors but provides no search benefit over standard metadata. | Kept `DefinedTerm` (it's valid schema.org and won't cause errors), but added `url` and `sameAs` properties for completeness. |

### ✅ Already Correct

- BreadcrumbList structure and `position` ordering
- ItemList with `ListItem` entries
- `@context` always points to `https://schema.org`
- All URLs use absolute paths (no relative URLs in structured data)

## Files Modified

1. [`layout.tsx`](file:///c:/Users/dl/Desktop/Main_Projects_V2/emogi/apps/web/app/layout.tsx) — Removed invalid `WebApplication`, kept `WebSite` only
2. [`page.tsx`](file:///c:/Users/dl/Desktop/Main_Projects_V2/emogi/apps/web/app/page.tsx) — Consolidated to single script block
3. [`emoji/page.tsx`](file:///c:/Users/dl/Desktop/Main_Projects_V2/emogi/apps/web/app/emoji/page.tsx) — Consolidated, fixed last breadcrumb
4. [`emoji/[slug]/page.tsx`](file:///c:/Users/dl/Desktop/Main_Projects_V2/emogi/apps/web/app/emoji/%5Bslug%5D/page.tsx) — Fixed last breadcrumb, added `url` to DefinedTerm
5. [`emoji/[slug]/CategoryView.tsx`](file:///c:/Users/dl/Desktop/Main_Projects_V2/emogi/apps/web/app/emoji/%5Bslug%5D/CategoryView.tsx) — Fixed last breadcrumb, consolidated
6. [`symbols/page.tsx`](file:///c:/Users/dl/Desktop/Main_Projects_V2/emogi/apps/web/app/symbols/page.tsx) — Fixed last breadcrumb, consolidated
7. [`symbols/[slug]/page.tsx`](file:///c:/Users/dl/Desktop/Main_Projects_V2/emogi/apps/web/app/symbols/%5Bslug%5D/page.tsx) — Fixed last breadcrumb, added `url` to DefinedTerm, consolidated
8. [`kaomoji/page.tsx`](file:///c:/Users/dl/Desktop/Main_Projects_V2/emogi/apps/web/app/kaomoji/page.tsx) — Fixed last breadcrumb, consolidated
9. [`kaomoji/[slug]/page.tsx`](file:///c:/Users/dl/Desktop/Main_Projects_V2/emogi/apps/web/app/kaomoji/%5Bslug%5D/page.tsx) — Fixed last breadcrumb, fixed fragment URLs, consolidated

## Active Domain Update

The active domain has been updated to **`https://emogilol.vercel.app`** across all metadata canonicals, OpenGraph properties, sitemaps, robots.txt, breadcrumbs, and JSON-LD schemas.

## Recheck Verification Results (2026-10-08)

| Check | Target | Result |
|---|---|---|
| **Old Domain Cleanup** | `copypaste-unicode.com` | **0 occurrences remaining** (100% eliminated from all files, links, and text) |
| **Active Domain Consistency** | `https://emogilol.vercel.app` | Verified across all 25+ templates (canonicals, sitemap, robots, schema, OG cards) |
| **DNS Resolution of Hostnames** | All external domains (`cldr.unicode.org`, `emogilol.vercel.app`, `github.com`, `unicode.org`, `schema.org`, `cdn.jsdelivr.net`) | **100% Resolved** (All pass DNS lookup) |
| **TypeScript Validation** | `npx tsc --noEmit` | **Pass (0 errors)** |
| **ESLint Validation** | `eslint --max-warnings 0` | **Pass (0 warnings, 0 errors)** |
| **Production Build** | `next build` | **Pass (0 errors, all 2,000+ SSG pages prerendered)** |

## Validation

> [!TIP]
> Validate all page types with [Google's Rich Results Test](https://search.google.com/test/rich-results):
> - Homepage: `https://emogilol.vercel.app`
> - Emoji index: `https://emogilol.vercel.app/emoji`  
> - Emoji category: `https://emogilol.vercel.app/emoji/smileys-emotion`
> - Emoji detail: `https://emogilol.vercel.app/emoji/grinning-face`
> - Symbols index/category/detail: `https://emogilol.vercel.app/symbols`
> - Kaomoji index/category: `https://emogilol.vercel.app/kaomoji`
