// Sends reservation and contact submissions to the Google Apps Script web app
// (see apps-script/Code.gs). `text/plain` avoids a CORS preflight, which Apps Script cannot answer.

const ENDPOINT = import.meta.env.VITE_SHEETS_ENDPOINT as string | undefined;

export type LeadType = 'reservation' | 'contact';

// Captured once on page load so campaign attribution survives in-page navigation.
const attribution = (() => {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    referrer: document.referrer,
    landing_page: window.location.href,
  };
})();

export async function submitLead(type: LeadType, data: Record<string, unknown>) {
  if (!ENDPOINT) {
    if (import.meta.env.DEV) {
      console.warn('[submitLead] VITE_SHEETS_ENDPOINT is not set; pretending to succeed in dev.', type, data);
      return;
    }
    throw new Error('Lead endpoint is not configured.');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ type, ...data, ...attribution, submitted_at: new Date().toISOString() }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Lead endpoint responded ${response.status}`);
    const result = (await response.json().catch(() => ({ ok: true }))) as { ok?: boolean; error?: string };
    if (result.ok === false) throw new Error(result.error ?? 'Lead endpoint rejected the submission.');
  } finally {
    clearTimeout(timeout);
  }
}
