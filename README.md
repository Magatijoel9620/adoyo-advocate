# Adoyo J & Company Advocates — Interactive Website

A redesigned, responsive website for Adoyo J & Company Advocates, based in Malindi, Kenya. The design uses the supplied logo and portrait asset and keeps the office address/profile details easy to update once confirmed.

## Requirements
- Node.js 22 or later
- npm

## Local development
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Production verification
```bash
npm run build
npm start
```

## Contact flow
The enquiry form validates locally and prepares a WhatsApp message for `254701403467`. The visitor reviews and sends it; the website does not claim that the enquiry has been delivered and does not store form submissions. If the browser blocks WhatsApp, it falls back to a prefilled email to `adoyoadvocate@gmail.com`.

## Before launch
1. Confirm the phone number and email address.
2. Replace the temporary Malindi location note with the exact office address.
3. Replace the supplied portrait/graphic placeholder with final firm photography when available.
4. Add the advocate's approved biography, qualifications and professional memberships.
5. Confirm all listed practice areas and wording with the advocate.

## Motion and accessibility
The site uses Lenis for smooth scrolling, Motion for progressive section reveals, and React Three Fiber / Three.js for the interactive hero illustration. Motion is reduced for visitors who request reduced motion; the 3D canvas is dynamically loaded client-side and includes a static fallback.
