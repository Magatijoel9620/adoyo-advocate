# Adoyo Law — Block D: Organic SEO and Search Console

Based on `adoyo_current_amended.zip`, with the Block C service-page modal retained in the patched service route.

## Code changes
- Added `BreadcrumbList` JSON-LD alongside the existing `Service` structured data on each generated service landing page.
- Made service-page Open Graph image metadata explicit and consistent with the firm's existing social preview image.
- Retained service-specific title, description, canonical URL and the existing generated service routes.
- Reviewed the existing `app/sitemap.ts` and `app/robots.ts`: the sitemap already lists the homepage and all four practice-area routes; robots already allows crawling and references `/sitemap.xml`. No unnecessary changes were made to those files.

## Search Console connection — pending account-side verification
Search Console is not connected yet. Create a **Domain property** for `adoyolaw.com` (without `https://` or `www`) in Google Search Console. Google requires DNS verification for a Domain property. Copy the exact TXT record Google generates and add it at the DNS provider; do not invent or reuse a token. Keep the record after verification.

After verification:
1. Open the property in Search Console.
2. Submit `https://adoyolaw.com/sitemap.xml` in the Sitemaps report.
3. Inspect `https://adoyolaw.com/` and each of the four `/services/...` URLs.
4. Review crawl/indexing status and resolve any reported technical errors.
5. Record an initial Performance report baseline, then monitor impressions, clicks, queries and page-level performance.

Submitting a sitemap or requesting indexing does not guarantee that Google will index a URL or rank it.

## Files in this patch
- `app/services/[slug]/page.tsx`
- `BLOCK_D_SEO_AND_SEARCH_CONSOLE.md`

## Validation
- Source review confirms four practice-area URLs are generated from `legalServices`.
- Source review confirms sitemap coverage and robots sitemap reference.
- Structured data is generated from the actual service record and canonical production domain.
- Full ESLint, TypeScript, production build, live crawl and Search Console account verification have not been run/completed here.

Run `npm ci`, `npm run lint`, and `npm run build` before deployment. Search Console setup requires access to the firm's Google account and DNS provider.
