# Adoyo Law — Block C corrections

Based on `adoyo_current_amended.zip`.

## Changes
- Removed the visible numeric labels from homepage practice-area rows and the three-step client journey. Service anchor IDs now use descriptive slugs rather than numeric labels.
- Replaced the service-page “Use the enquiry form” homepage link with an in-page responsive modal.
- Added `components/ServiceEnquiryModal.tsx`. It reuses the existing `EnquiryForm` component and existing `/api/enquiry` submission endpoint; it does not create a second form workflow.
- Added an optional `initialService` prop to `EnquiryForm`, so each service page opens the modal with its own practice area preselected.
- Modal supports close button, backdrop click, Escape key, body-scroll locking, a constrained scrollable height, and a stacked mobile form layout.

## Files
- `app/page.tsx`
- `app/services/[slug]/page.tsx`
- `app/globals.css`
- `components/EnquiryForm.tsx`
- `components/ServiceEnquiryModal.tsx` (new)

## Apply
Copy these files into the matching paths in the project, preserving the rest of the repository.

## Validation
- Source inspection confirms visible service and journey number labels were removed.
- Existing form validation, `/api/enquiry` endpoint, Resend delivery workflow, and primary recipient are retained.
- Full ESLint, TypeScript and Next.js production build were not run in this environment. Run `npm ci`, `npm run lint`, and `npm run build` before deployment.
