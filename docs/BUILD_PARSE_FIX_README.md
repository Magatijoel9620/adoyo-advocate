# Adoyo Block C build parse correction

This is a narrowly scoped correction for the two TSX parser errors reported by Next.js 16.4.0.

## Apply

From the repository root, extract this ZIP and overwrite the matching paths:
- `app/services/[slug]/page.tsx`
- `components/EnquiryForm.tsx`

The previous patch accidentally wrote the two-character sequence `\\n` into the TypeScript source where actual line breaks were required. These files now contain normal line breaks. No application behavior, form submission endpoint, or API contract is changed by this correction.

## Verify

Run:

```bash
npm run build
```

If the build reports another error, share the complete output. This correction only addresses the two parser errors shown in the supplied log; a full build has not been run in the user's local repository.
