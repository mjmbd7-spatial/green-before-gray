# Green Before Grey — resident edition

A bilingual static website for neighborhood greening near Zero Point, Khulna. English is the default; the Bengali switch remembers the visitor’s choice.

## Publish on GitHub Pages

1. Extract the package. Upload its contents, including index.html, resident.html, assets and data, into the publishing root of your repository.
2. In Settings → Pages, choose Deploy from a branch, then the branch and folder containing index.html.
3. Open the published HTTPS address. No npm build, Docker, Firebase or server is required.

Do not upload just index.html from this folder; it uses the accompanying assets. Green_Before_Grey.html, provided separately, is a self-contained edition with the resident flow in the same page and no embedded frames. It can be opened directly or renamed index.html for a one-file publication.

## Resident workflow

The separate resident.html page accepts a location pin and up to four photos: frontage, surroundings, side wall and rooftop. The frontage and permission checkbox are required. It previews the details, generates a real PNG card containing “AI connection will be done soon”, and exports the original photos plus request.json and the card in a ZIP. It operates locally in the browser; it does not send photos to the host, maintain a shared queue or call an AI API.

The AI section describes the proposed future service. A reviewed concept is not a construction permission or a cadastral verification.

## Maps and data

- Esri Satellite, Streets, Light and Dark; OpenStreetMap; local imagery.
- Online failure falls back to the supplied local Sentinel-2 image. Boundary-only mode removes all research overlays.
- Google Satellite/Hybrid support uses the official Maps JavaScript API. Set googleMapsApiKey in site-config.js to enable these options; it requires the API, billing, and a browser key restricted to the published website. These options stay hidden until configured. No unlicensed Google tile URL is shipped.
- 423 clipped 50 m optical cells. Population keeps its original 250 m reporting cells.
- Cell IDs are fixed UTM grid references, not plot numbers.
- Satellite comparison: 2019 RGB, 2026 RGB, and 2026 NDVI. The third pane is a different display layer, not an additional historical date.
- Native Sentinel-2 imagery is 10 m. No artificial resolution claim is made.
- Waterbody case stories and the automatic decline ranking are omitted from this edition, ready for later field evidence.

## Edit and extend

- index.html: public page; resident.html: location/photo flow.
- styles.css: responsive layout, motion and reduced-motion support.
- i18n.js: complete English/Bengali strings. Keep both languages in sync.
- app.js and map-controller.js: selection, map layers and image swipes.
- resident.js: validation, photo previews, concept card and ZIP export.
- shared.js: language, methods drawer, downloads and publication metadata.
- site-config.js: public URL and default basemap. No secret API key belongs here.
- assets/field: existing photos and approved illustrative proposals.

When a public HTTPS URL is known, set the canonical and Open Graph URLs in the HTML head as well as site-config.js. Search ranking cannot be guaranteed by metadata.

## Credits

Existing-condition photographs: project field photographs. Proposal renderings, Memory lane and opening neighborhood illustration: AI-assisted concepts, distinct from documentary photography. Methods & sources explains the data and illustration provenance. Leaflet and Bengali font licenses are included with their assets.

Memory lane: independent illustration based on the resident’s recollection, not a reproduction of Google Street View.

## Verification

Desktop/mobile layouts, both languages, local-tile fallback, boundary-only mode, grid selection, image swipes, GeoJSON downloads, photo validation, image/ZIP export, and the one-file edition are checked in a real Chromium browser. External basemap availability still depends on connectivity and provider access.
