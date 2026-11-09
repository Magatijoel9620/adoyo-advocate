# SEO implementation patch — 5 November 2026

## Changes made
- Corrected Open Graph and Twitter preview image paths to the supplied `public/og-image.png` asset (the previous metadata referenced a non-existent `.jpg`).
- Corrected the Open Graph image dimensions to the actual supplied PNG dimensions: 1733 × 907.
- Strengthened the existing `LegalService` JSON-LD with a stable `@id` and explicit Malindi/Kenya service areas. Added the known Kilifi County region to the supplied business address.
- Kept the existing canonical metadata, robots directives, `robots.txt` generation, and site URL configuration.
- Made the one-page sitemap deterministic by removing the build-time `lastModified: new Date()` value, which otherwise changed on every build despite no content change.

## Intentionally not changed
- No legal page copy, practice-area wording, attorney biography, layout, styling, animations, contact details, or website functionality.
- No additional practice-area URLs were invented. The supplied project contains a single `app/page.tsx` route.
- No `Attorney` person schema or professional credentials were added because the supplied source does not establish the individual advocate's verified identity/credentials for structured data.

## Required before production
1. **Canonical domain confirmed by the firm:** `https://adoyolaw.com`. Set `NEXT_PUBLIC_SITE_URL=https://adoyolaw.com` in the production environment (no trailing slash) to keep metadata, structured data, robots and sitemap URLs aligned.
2. Verify the address, phone, email, WhatsApp number, map pin, and service-area claims with the firm.
3. Run `npm ci`, `npm run lint`, and `npm run build` in an environment with package registry access. Dependency installation could not complete in this patching environment, so lint/build are not claimed as passed.
4. Deploy, inspect the canonical URL and generated `/robots.txt` and `/sitemap.xml`, verify the site in Google Search Console, and submit the sitemap.
5. Validate the homepage structured data with Google's Rich Results Test and Schema.org Validator. LegalService markup does not guarantee a rich result or a ranking improvement.
6. Check social previews on the deployed canonical domain.

## Domain confirmation
The firm confirmed on 5 November 2026 that `https://adoyolaw.com` is the official production domain. The source defaults already use this HTTPS origin.

## Validation status
Source inspection and targeted patching completed. `npm ci` timed out in this environment before dependencies were installed; consequently lint and production build remain unverified.
