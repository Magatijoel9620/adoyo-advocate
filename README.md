# Adoyo J & Company Advocates — Website

Responsive Next.js website for the legal practice based in Malindi, Kenya.

## Requirements and local run
- Node.js 22 or later
- npm

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Production launch checklist

1. **Set the real domain:** update `NEXT_PUBLIC_SITE_URL` in the hosting provider to the exact registered `.com` domain (include `https://`, no trailing slash). The code currently uses `https://adoyolaw.com` as a configurable default; confirm that this is the domain actually registered before launch. The same value drives canonical metadata, structured data, robots and sitemap URLs.
2. Connect the domain in the hosting provider and configure DNS and HTTPS. Use one canonical host (`www` or apex) and redirect the other to it.
3. Verify the live phone number, WhatsApp number, email, postal address and Google Maps pin with the firm.
4. Confirm the practice areas and all public legal copy with the advocate. Do not add qualifications, court admissions, professional memberships or guaranteed outcomes unless verified.
5. The enquiry form prepares a WhatsApp message for the visitor to review and send; it does not send or store submissions on the website. The email fallback opens the visitor's email app.
6. After the domain is live, submit `/sitemap.xml` in Google Search Console and verify the site. Confirm the Open Graph preview image on the deployed domain.
7. Run the production checks below and test contact links, mobile navigation, theme toggle, reduced-motion behavior, map, and enquiry form on a phone and desktop.

## Production verification

```bash
npm ci
npm run lint
npm run build
npm start
```

## Contact and map

The map embed uses the supplied Google Maps embed URL and the external directions link uses the supplied short Google Maps URL. Confirm the pin visually matches Sea Breeze Plaza, Ground Floor, Door No. 5, opposite Ruby Plaza, off Vasco Da Gama Road, Malindi.

## Accessibility and motion

The site uses Lenis smooth scrolling, Motion section reveals and a client-loaded React Three Fiber hero. Reduced-motion preferences are respected in CSS. Photography is served as responsive WebP assets, with descriptive alt text.
