# Bukid Resto Cafe website

One-page site for Bukid Resto Cafe (Barili, Cebu), built with React 19, Vite, Tailwind 4 and motion.
Its job is to turn visitors into guests: every section leads to **Reserve**, **Call**, **Message** or **Get directions**.

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build (also writes robots.txt and sitemap.xml)
npm run preview   # serve the production build on http://localhost:4173
```

## Configuration

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Live URL, no trailing slash. Used for canonical, social-share tags, robots.txt and sitemap.xml. |
| `VITE_GA_ID` | Google Analytics 4 Measurement ID (`G-…`). Tracking is off when empty. |
| `VITE_SHEETS_ENDPOINT` | Google Apps Script web-app URL that receives form submissions. |

Business details (phone, Messenger, Facebook, address, hours, Google rating) live in **`src/data/business.ts`**.
Anything left `null` is hidden on the site. When you change them, update the JSON-LD block in `index.html` too.
Dishes and prices live in **`src/data/menu.ts`**. Lines marked `// STOCK` use free Unsplash photos, so replace them with real photos when you have them.

## Reservations go to Google Sheets

1. Create a Google Sheet → **Extensions → Apps Script** → paste `apps-script/Code.gs`.
2. **Project Settings → Script properties**: add `NOTIFY_EMAIL` (the staff inbox for alerts).
3. **Deploy → New deployment → Web app**, Execute as **Me**, access **Anyone**. Copy the URL into `VITE_SHEETS_ENDPOINT`.
4. Rebuild. Each submission adds a row to the *Reservations* or *Messages* tab (with UTM source) and sends an email.

In `npm run dev` without an endpoint, submissions are logged to the console and treated as successful.
In a production build they show an error with Call/Message fallbacks, so leads are never silently lost.

## Analytics events (GA4)

`reserve_open` (with `source`), `generate_lead` (mark it as a **key event**), `contact_submit`, `call_click`,
`messenger_click`, `directions_click`, `menu_view`, `form_error`.

## Performance notes

- The hero shows a Cloudinary poster frame first. The video (about 0.4 MB on phones, 0.9 MB on desktop, versus 21 MB for the original) loads after the page has loaded, and is skipped on data-saver, 2G and reduced-motion devices.
- Images go through `src/utils/cloudinary.ts` (`f_auto,q_auto`, responsive `srcset`, blur-up placeholder).
- Fonts use the Apple system stack, so nothing is downloaded.
