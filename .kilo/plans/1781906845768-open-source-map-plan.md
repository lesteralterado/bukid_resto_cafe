# Open-Source Map Integration Plan

## Goal

Add a free open-source interactive map section below the existing hero in the current single-page React/Vite app. The map is decorative only, so it must not imply a real cafe address or business location.

## Context

- Current app: React 19 + TypeScript + Vite + Tailwind CSS.
- Current page structure: `src/App.tsx` renders `Hero` then `ContactForm`.
- Existing styling is minimal gray/white, rounded cards, subtle shadows, and the custom Helvetica font.
- No routing, backend, or existing map library is present.

## Decisions

1. **Map library:** Leaflet.
   - Leaflet is open source and lightweight for this use case.
   - Install `leaflet` and `@types/leaflet`.

2. **Map tiles:** OpenStreetMap.
   - Use the standard OSM tile layer with required attribution.
   - Treat OSM tiles as appropriate for low/moderate traffic; if traffic becomes high, replace with self-hosted or policy-compliant tile infrastructure.

3. **Placement:** Add a new map section directly below the hero and above the contact form.
   - Update `src/App.tsx` to render the map component between `Hero` and `ContactForm`.

4. **Map behavior:** Interactive decorative map.
   - Allow pan and zoom.
   - Do not add markers, pins, labels, or address text.
   - Use a neutral default center and zoom, such as `[20, 0]` at zoom `2`, so the map does not imply a real location.

5. **Visual style:** Match the existing design language.
   - Use a rounded white/gray card with subtle shadow and backdrop blur if needed.
   - Keep the map height responsive, for example `h-[320px]` on mobile and `h-[420px]` on desktop.
   - Use Tailwind utilities for layout and spacing.

## Implementation Tasks

1. Install dependencies:
   - `npm install leaflet`
   - `npm install -D @types/leaflet`

2. Create a map component, likely `src/components/DecorativeMap.tsx`.

3. Import Leaflet CSS in the map component or global CSS:
   - `import 'leaflet/dist/leaflet.css';`

4. Implement the Leaflet map:
   - Use a `useRef<HTMLDivElement | null>` container.
   - Initialize the map inside `useEffect`.
   - Set the neutral default view.
   - Add the OSM tile layer with attribution.
   - Clean up the map instance on component unmount.
   - Avoid markers or location-specific UI.

5. Add the component in `src/App.tsx`:
   - Current order: `Hero`, `ContactForm`.
   - New order: `Hero`, `DecorativeMap`, `ContactForm`.

6. Keep TypeScript and linting clean:
   - Type the map and tile layer imports.
   - Avoid direct DOM access outside the effect.
   - Ensure the map container has a defined height before initialization.

## Validation Criteria

- The map appears below the hero and above the contact form.
- The map uses Leaflet and OpenStreetMap tiles.
- The map is interactive with pan/zoom enabled.
- There are no markers, pins, address labels, or implied business location.
- The section matches the existing rounded-card visual style.
- The app remains responsive on mobile and desktop.
- `npm run build` passes.
- `npm run lint` passes.

## Out of Scope

- Real cafe address integration.
- Markers, routing, directions, geocoding, or place search.
- Backend submission or contact form changes.
- Switching to Google Maps or another paid provider.
- Self-hosted tile infrastructure.
