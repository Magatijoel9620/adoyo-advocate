# Copilot Change Summary

**Date:** 2026-11-17

## Changes

- Kept the practice-area list unnumbered and removed the obsolete number column from its desktop and mobile grid layouts. Removed the unused number styling.
- Restored the outline enquiry button's transparent fill and made its border and hover colors use the light/dark theme variables.
- Moved the service enquiry modal to a document-level portal so it layers above the fixed navigation.
- Made the modal responsive to viewport and safe-area sizes. Kept its heading and close button visible while the form scrolls inside the modal.
- Hid the modal's scrollbar across browsers while preserving scrolling.

## Files Updated

- `app/globals.css`
- `components/ServiceEnquiryModal.tsx`

## Validation

- `npm run build` completed successfully, with a Next.js security advisory warning.
- `npx tsc --noEmit` passed.
- ESLint could not run because the project has no `eslint.config` file.
