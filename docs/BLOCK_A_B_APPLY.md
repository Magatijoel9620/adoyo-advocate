# Applying Block A + B

In the existing local repository:

```bash
git switch feature/adoyo-law-conversion-uplift
# Review and back up any uncommitted work before copying the supplied patch files.
```

Copy the changed/new files from this package into the repository, then run:

```bash
npm ci
npm run lint
npx tsc --noEmit
npm run build
```

Manually verify all four `/services/...` routes, the homepage service-finder routes, selected-service form prefill, WhatsApp message text, telephone and email links, and form success/error handling. Test both themes at 360, 390, 768, 1024 and 1440 CSS pixels.

The existing enquiry API continues to send to `info@adoyolaw.com`. The visible alternate address `adoyoadvocate@gmail.com` now links to itself; confirm that both mailboxes are active before release.

Google Search Console is not connected yet. After the domain property is created and DNS ownership is verified, submit `https://adoyolaw.com/sitemap.xml` and inspect each new service URL. This implementation does not claim indexing or ranking improvements.
