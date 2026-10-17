// Single source of truth for business details shown across the site.
// Anything left as `null` is hidden from the UI, so never fill a field with a guess.
// Keep the JSON-LD block in index.html in sync when these change.

export type DayHours = { open: string; close: string } | null;

export const business = {
  name: 'Bukid Resto Cafe',
  tagline: 'Nature, food, and unforgettable views',

  // TODO: real phone / Viber number in international format, e.g. '+639171234567'.
  phone: null as string | null,
  // TODO: Messenger link, e.g. 'https://m.me/bukidrestocafe'.
  messengerUrl: null as string | null,
  // TODO: Facebook page URL.
  facebookUrl: null as string | null,
  // TODO: real inbox for inquiries.
  email: null as string | null,

  // TODO: full street address (Google lists plus code 4F7M+W93). Locality/region are used for SEO and the footer.
  streetAddress: null as string | null,
  locality: 'Barili, Cebu',
  region: 'Cebu',
  country: 'PH',
  geo: { lat: 10.1192833, lng: 123.4971137 },
  // Google Maps listing (CID taken from the existing map embed). The listing has its own Directions button.
  mapsUrl: 'https://maps.google.com/?cid=5619858595555731848',

  // Google rating, hidden while null. As of Oct 2026 the listing shows 4.7 from only 3 reviews:
  // switch this on once there are ~20+, e.g. { rating: 4.7, count: 24 }.
  googleRating: null as { rating: number; count: number } | null,
  // TODO: link to the Google reviews page.
  googleReviewsUrl: null as string | null,

  priceRange: '₱₱',
  maxGuests: 50,

  // 24h "HH:MM" in Asia/Manila time. Index 0 = Sunday.
  hours: [
    { open: '10:00', close: '22:00' },
    { open: '10:00', close: '22:00' },
    { open: '10:00', close: '22:00' },
    { open: '10:00', close: '22:00' },
    { open: '10:00', close: '22:00' },
    { open: '10:00', close: '22:00' },
    { open: '10:00', close: '22:00' },
  ] as DayHours[],
  hoursLabel: 'Daily, 10:00 AM – 10:00 PM',
};

function manilaNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, '0')} ${suffix}` : `${hour} ${suffix}`;
}

export function getOpenStatus() {
  const { day, minutes } = manilaNow();
  const today = business.hours[day];
  if (!today) return { isOpen: false, label: 'Closed today' };
  const open = toMinutes(today.open);
  const close = toMinutes(today.close);
  if (minutes < open) return { isOpen: false, label: `Opens ${formatTime(today.open)} today` };
  if (minutes >= close) return { isOpen: false, label: `Closed · Opens ${formatTime(today.open)}` };
  return { isOpen: true, label: `Open now · until ${formatTime(today.close)}` };
}

export const telUrl = business.phone ? `tel:${business.phone.replace(/[^+\d]/g, '')}` : null;
