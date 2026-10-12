# Patch notes — Adoyo Advocates

## Fixed Next.js client-only Three.js import

`next/dynamic(..., { ssr: false })` must be declared from a Client Component in the App Router. The Three.js scene is now loaded by `components/SceneLoader.tsx` (`'use client'`) and rendered by `app/page.tsx` through that wrapper.

## Added light/dark mode

Use the Dark/Light control in the desktop navigation or the mobile menu. The selected theme is stored as `adoyo-theme` in localStorage. If no choice exists, the browser's preferred color scheme is used. The CSS palette and major surfaces update with the selected theme.

## Run and verify locally

```bash
npm install
npm run dev
npm run build
```

The package registry was unreachable/slow in the patch workspace, so run the production build locally after applying the patch. Avoid `npm audit fix --force` unless you review the breaking dependency changes first; run `npm audit` to inspect the five reported high-severity advisories.
