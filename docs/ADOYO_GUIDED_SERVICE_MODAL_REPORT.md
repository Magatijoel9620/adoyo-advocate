# Adoyo Law — Guided Legal-Service Welcome Modal

## Implementation summary

Replaced the previous editorial welcome/navigation menu with a guided legal-service selector. The first-visit modal now asks “What brings you here today?” and presents selectable service tiles. Selecting a tile gives visible selected-state feedback and reveals a contextual route into the matching existing service area or general enquiry pathway.

## Service options and destinations

| Modal option | Source-backed website service | Destination |
|---|---|---|
| Criminal law & defence | Criminal law & defence | `#service-01` |
| Conveyancing & property | Conveyancing & property | `#service-02` |
| Employment & labour | Employment & labour | `#service-03` |
| Road traffic claims | Road traffic claims | `#service-04` |
| Another legal enquiry | Existing general enquiry option in the ServiceFinder | `#contact` |

The first four destinations are stable IDs added to the corresponding existing service rows. No new page routes or legal service claims were introduced.

## Preserved behaviour and integrations

- Retained `/logo.png` and the rounded-square logo frame.
- Retained the existing Adoyo colour tokens and typography.
- Retained the first-visit localStorage key `adoyo-first-visit-welcome-dismissed` and close/continue persistence behaviour.
- Retained Escape, backdrop and close-button dismissal, body scroll lock, keyboard focus cycling and focus restoration.
- Existing website sections, service content, enquiry form, API route, WhatsApp links, analytics and tracking code were not changed.
- No chatbot, AI assistant, legal diagnosis, legal opinion or outcome assurance was introduced.

## Responsive treatment

- Desktop: centered dialog with a two-column service tile grid.
- Tablet: centered dialog with a two-column grid and a scrollable content region.
- Mobile portrait: one-column full-width touch cards inside a bounded, scrollable dialog.
- Narrow screens: compact card layout and reduced padding.
- Short landscape screens: compact two-column tile layout with a viewport-height cap.
- Reduced-motion preferences disable modal and card transitions.

## Files changed

- `components/FirstVisitWelcome.tsx` — guided selection state, service cards, contextual result and modal interactions.
- `app/globals.css` — modal, card, selected-state, dark-theme and responsive styles.
- `components/Reveal.tsx` — optional `id` forwarding to the rendered motion element.
- `app/page.tsx` — stable `service-01` through `service-04` anchors on the existing service rows.

## Verification status

Source-level route mapping and preservation checks were completed against the supplied project archive. A dependency install was attempted, but `npm ci` did not complete within the available execution window. Consequently, a production build, automated browser tests and live viewport/accessibility tests are **not confirmed**. Run `npm ci` and `npm run build`, then manually verify 320px, 360px, 390px, tablet, desktop, portrait and landscape layouts before merging.
