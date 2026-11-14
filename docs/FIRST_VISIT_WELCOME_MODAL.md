# Adoyo First-Visit Welcome Modal

## Direction
- Editorial split composition: brand panel on the left and welcome/navigation content on the right on desktop.
- The lead visual is the supplied square Adoyo brand mark at `/public/logo.png` (the uploaded project does not contain a file literally named `Brand Logo.png`; `logo.png` is the matching square AJ brand-mark asset).
- Existing Adoyo light/dark theme tokens are reused. No new brand palette is introduced.

## Content and destinations
1. Explore legal services → `#services`
2. Speak with the firm → `#contact`
3. Get to know Adoyo → `#firm`
4. Find our office → the existing Malindi Google Maps destination

Welcome headline: “Every matter deserves a thoughtful beginning.”
Introductory copy welcomes visitors and encourages them to explore options and take a considered next step.

## Behaviour
- Appears on first visit unless `adoyo-first-visit-welcome-dismissed` is already set in local storage.
- Dismisses through the close control, Escape, backdrop click, a pathway selection, or “Continue to website”.
- Dismissal persists across visits. If storage is unavailable, the dialog still closes for the current visit.
- Locks page scrolling while open, traps keyboard focus, restores focus on close, and exposes dialog semantics to assistive technology.
- Reduced-motion preferences disable entrance animation.

## Responsive behaviour
- Desktop: centered split panel, max width 900px and bounded viewport height.
- Mobile/tablet: stacked compact brand header with a vertically scrollable content region. The dialog is capped at 82svh (84svh on very narrow screens), with a smaller width and padding at 380px and below.
- The content area scrolls independently, keeping the close control accessible.
- Validate at 320, 360, 390, 768, 1024 and wide desktop widths, plus short mobile viewport heights.

## Scope boundaries
- No duplicate service finder, enquiry form, appointment booking, chat widget, data capture, cookies or consent prompt.
- Existing page content, contact details, legal copy, theme controls and business logic remain unchanged.


### Brand mark treatment
The lead logo sits in a rounded-square frame (24px desktop, 14px mobile, 12px on very narrow screens); the image itself is clipped to softly rounded corners rather than a circular badge.
