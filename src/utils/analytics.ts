// Google Analytics 4, loaded after the page is idle so it never delays first paint.
// Does nothing until VITE_GA_ID is set.

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

export function initAnalytics() {
  if (!GA_ID || typeof window === 'undefined') return;
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // gtag.js expects the `arguments` object itself.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag('js', new Date());
  w.gtag('config', GA_ID);

  const load = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  };
  if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 4000 });
  else setTimeout(load, 2000);
}

export type AnalyticsEvent =
  | 'reserve_open'
  | 'generate_lead'
  | 'contact_submit'
  | 'call_click'
  | 'messenger_click'
  | 'directions_click'
  | 'menu_view'
  | 'form_error';

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  const w = window as GtagWindow;
  w.gtag?.('event', event, params);
  if (import.meta.env.DEV) console.debug('[analytics]', event, params);
}
