# AI Readiness Changelog

## Technical discoverability

- Added `public/robots.txt`
- Added `public/sitemap.xml`
- Added `public/llms.txt` and `public/llms-full.txt`
- Added `public/site.webmanifest`
- Fixed Vite base path to build from `/`

## Metadata and structured data

- Upgraded `index.html` metadata, canonical, Open Graph, Twitter, theme, and app metadata
- Added dynamic metadata and JSON-LD through [`src/hooks/useSiteMetadata.ts`](D:/Maykna/Final/AlOsaimi_Blot/src/hooks/useSiteMetadata.ts)
- Added shared content data in [`src/siteData.ts`](D:/Maykna/Final/AlOsaimi_Blot/src/siteData.ts)
- Added standalone metadata and schema to the static `/docs/` and `/services/` reference pages

## Semantic and content updates

- Reworked [`src/App.tsx`](D:/Maykna/Final/AlOsaimi_Blot/src/App.tsx) to add:
  - a real homepage `h1`
  - visible summary content for answer engines
  - FAQ content
  - resource footer links
  - improved contact semantics
- Improved navigation semantics and labels in [`src/components/TopNav.tsx`](D:/Maykna/Final/AlOsaimi_Blot/src/components/TopNav.tsx)
- Improved service discoverability and machine-readable linking in [`src/components/Services.tsx`](D:/Maykna/Final/AlOsaimi_Blot/src/components/Services.tsx)

## Machine-readable documentation

- Added documentation hub at `public/docs/index.html`
- Added service landing page at `public/services/index.html`
- Added markdown exports:
  - `public/company-profile.md`
  - `public/services-overview.md`
  - `public/projects-overview.md`
  - `public/agent-policy.md`
  - `public/automation-policy.md`
  - `public/service-briefs/*.md`

## Accessibility and UX

- Added skip link and focus-visible styling
- Improved icon labels and navigation labeling
- Added dialog semantics and clearer control labels to the project gallery modal
- Converted the contact form to a host-compatible Netlify form pattern with a real thank-you page
- Improved cursor behavior and reduced-motion handling in [`src/index.css`](D:/Maykna/Final/AlOsaimi_Blot/src/index.css)

## Performance

- Switched hero video preload from `auto` to `metadata`
- Added async image decoding in key places
- Compressed 21 oversized images via `scripts/compress-images.mjs`, saving about 0.35 MB
