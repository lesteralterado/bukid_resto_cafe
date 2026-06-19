# Bukid Resto Cafe — Front-end Behaviour Plan (draft)

## Goal
Finish a no-backend, front-end-only Tolkien/Vite site for Bukid Resto Cafe, keeping it Philippines-based, low-cost, nature-forward (rattan/capiz/burlap/terracotta/earth tones), and affordable.

## Already known / non-negotiable
- Project context: React 19 + TS + Vite + Tailwind; current page is Hero → ContactForm.
- Existing plan `.kilo/plans/1781906845768-open-source-map-plan.md` defines the hero's fictitious map purpose and free-tile rules.
- From Caleb+Odin story context: Caleb is the wooded-nature/craft side; Odin is coffee-focused and praises quiet, natural service.
- Low-spend rules: no real marketing imagery or scripts; no real contact details or payment setup; event/pricing lists must stay test/fictitious.
- Decorative-map sanity rule: no pins/addresses/real locations.

## Out of scope
- Backend, payments, real reservations, real contact info, Google Maps/paid map tiles, email sending, authentication.

## Critical decision needed
Should the app keep a single-page Hero + (decorative map) + contact form layout, or expand to a simple multi-section page setup (Hero, map, menu list, hours, fictitious reservation form)?

The right data shape for pages/sections depends on that answer.
