import { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Loader2, X } from 'lucide-react';
import { useReservationForm, type FormErrors } from '../hooks/useReservationForm';
import { submitLead } from '../services/submitLead';
import { track } from '../utils/analytics';
import { business, formatTime, getOpenStatus } from '../data/business';
import ContactFallback from './ContactFallback';

type ReservationData = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guestCount: string;
  occasion: string;
  heardFrom: string;
  message: string;
  company: string; // honeypot: real people never see or fill this
};

const initialReservation: ReservationData = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  guestCount: '',
  occasion: '',
  heardFrom: '',
  message: '',
  company: '',
};

const OCCASIONS = [
  'Casual dining',
  'Birthdays',
  'Family reunions',
  'Corporate outings',
  'Wedding receptions',
  'Pre-wedding photoshoots',
  'Other',
];

const HEARD_FROM = ['Facebook', 'Instagram', 'TikTok', 'Google / Maps', 'Friend or family', 'Passed by', 'Other'];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()0-9\s-]{7,20}$/;

const todayInManila = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Manila' }).format(new Date());

const validateReservation = (values: ReservationData): FormErrors<ReservationData> => {
  const next: FormErrors<ReservationData> = {};
  if (!values.name.trim()) next.name = 'Name is required.';
  if (!values.phone.trim()) next.phone = 'Mobile number is required so we can confirm.';
  else if (!phonePattern.test(values.phone.trim())) next.phone = 'Enter a valid mobile number.';
  if (values.email.trim() && !emailPattern.test(values.email.trim())) next.email = 'Enter a valid email address.';
  if (!values.date) next.date = 'Date is required.';
  else if (values.date < todayInManila()) next.date = 'Choose today or a future date.';
  if (!values.time) next.time = 'Time is required.';
  if (values.date && !next.date) {
    const hours = business.hours[new Date(`${values.date}T00:00:00`).getDay()];
    if (!hours) next.date = 'We are closed on this day.';
    else if (values.time && (values.time < hours.open || values.time >= hours.close))
      next.time = `Choose a time between ${formatTime(hours.open)} and ${formatTime(hours.close)}.`;
  }
  if (!values.guestCount.trim()) next.guestCount = 'Number of guests is required.';
  else if (Number(values.guestCount) < 1 || Number(values.guestCount) > business.maxGuests)
    next.guestCount = `Enter a number between 1 and ${business.maxGuests}.`;
  return next;
};

const inputClass =
  'mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-base sm:text-sm text-[#2d2d2d] outline-none transition focus:border-[rgba(30,50,90,0.45)] focus:ring-4 focus:ring-[rgba(30,50,90,0.08)]';
const labelClass = 'block text-sm font-normal text-[#2d2d2d]';
const errorClass = 'mt-2 text-xs text-[#9f3d36]';

type ReservationPanelProps = {
  open: boolean;
  occasion?: string;
  onClose: () => void;
};

export default function ReservationPanel({ open, occasion, onClose }: ReservationPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  const send = useCallback(async (values: ReservationData) => {
    if (values.company) return; // bot: silently "succeed"
    const { company: _honeypot, ...lead } = values;
    void _honeypot;
    await submitLead('reservation', lead);
    track('generate_lead', { form: 'reservation', occasion: values.occasion || 'none', guests: Number(values.guestCount) });
  }, []);

  const { values, errors, status, updateField, handleSubmit, reset } = useReservationForm(
    initialReservation,
    validateReservation,
    send,
  );

  // Preset the occasion when opened from an event card.
  useEffect(() => {
    if (open && occasion) updateField('occasion', occasion);
  }, [open, occasion, updateField]);

  useEffect(() => {
    if (status === 'error') track('form_error', { form: 'reservation' });
  }, [status]);

  const close = useCallback(() => {
    if (status === 'success') reset();
    onClose();
  }, [status, reset, onClose]);
  const closeRef = useRef(close);
  useEffect(() => {
    closeRef.current = close;
  }, [close]);

  // Escape to close, Tab stays inside the panel, page behind does not scroll.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    setTimeout(() => panelRef.current?.querySelector<HTMLElement>('form input, button')?.focus(), 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current();
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const dayIndex = values.date ? new Date(`${values.date}T00:00:00`).getDay() : new Date().getDay();
  const today = business.hours[dayIndex];
  const field = (name: keyof ReservationData) => ({
    id: `r-${name}`,
    name,
    value: values[name],
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `r-${name}-error` : undefined,
  });
  const fieldError = (name: keyof ReservationData) =>
    errors[name] && <p id={`r-${name}-error`} className={errorClass}>{errors[name]}</p>;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="absolute right-0 top-0 h-full w-full md:w-[460px] bg-white/95 backdrop-blur shadow-2xl ring-1 ring-black/5 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#6b717d]">Reservation</p>
                <h2 id="reservation-title" className="mt-1 text-xl font-normal text-[#2d2d2d]">Reserve your table</h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close reservation form"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-[#2d2d2d] transition hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/10"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {status === 'success' ? (
              <div className="flex-1 overflow-y-auto px-6 py-10 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" aria-hidden="true" />
                <h3 className="mt-4 text-2xl font-normal text-[#2d2d2d]">Request received!</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4f5560]">
                  Salamat! We&apos;ll text you to confirm your reservation within our opening hours ({business.hoursLabel}).
                </p>
                <ContactFallback source="reservation_success" lead="Want a faster reply?" />
                <button type="button" onClick={close} className="mt-8 text-sm text-[#4f5560] underline underline-offset-4">
                  Back to the website
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6">
                <p className="mb-5 rounded-2xl bg-[#eef7f1] px-4 py-3 text-xs leading-relaxed text-[#2f6b42] ring-1 ring-[#cfe8d6]">
                  {getOpenStatus().label}. No payment needed. We confirm every request by text.
                </p>

                {status === 'error' && (
                  <div role="alert" className="mb-6 rounded-2xl bg-[#fdf1f0] px-4 py-3 text-sm leading-relaxed text-[#9f3d36] ring-1 ring-[#f3d2cf]">
                    Sorry, we couldn&apos;t send your request. Please try again, or reach us directly:
                    <ContactFallback source="reservation_error" compact />
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label htmlFor="r-name" className={labelClass}>Name</label>
                    <input {...field('name')} type="text" autoComplete="name" onChange={(e) => updateField('name', e.target.value)} className={inputClass} />
                    {fieldError('name')}
                  </div>

                  <div>
                    <label htmlFor="r-phone" className={labelClass}>Mobile number</label>
                    <input {...field('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="09XX XXX XXXX" onChange={(e) => updateField('phone', e.target.value)} className={inputClass} />
                    {fieldError('phone')}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="r-date" className={labelClass}>Date</label>
                      <input {...field('date')} type="date" min={todayInManila()} onChange={(e) => updateField('date', e.target.value)} className={inputClass} />
                      {fieldError('date')}
                    </div>
                    <div>
                      <label htmlFor="r-time" className={labelClass}>Time</label>
                      <input
                        {...field('time')}
                        type="time"
                        min={today?.open}
                        max={today?.close}
                        step={900}
                        onChange={(e) => updateField('time', e.target.value)}
                        className={inputClass}
                      />
                      {fieldError('time')}
                    </div>
                  </div>
                  <p className="-mt-3 text-xs text-[#6b717d]">
                    {today
                      ? `Open ${formatTime(today.open)} to ${formatTime(today.close)} on this day`
                      : 'We are closed on this day. Please pick another date.'}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="r-guestCount" className={labelClass}>Guests</label>
                      <input {...field('guestCount')} type="number" inputMode="numeric" min={1} max={business.maxGuests} onChange={(e) => updateField('guestCount', e.target.value)} className={inputClass} />
                      {fieldError('guestCount')}
                    </div>
                    <div>
                      <label htmlFor="r-occasion" className={labelClass}>Occasion</label>
                      <select {...field('occasion')} onChange={(e) => updateField('occasion', e.target.value)} className={inputClass}>
                        <option value="">Select…</option>
                        {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="r-email" className={labelClass}>
                      Email <span className="text-[#6b717d]">(optional)</span>
                    </label>
                    <input {...field('email')} type="email" autoComplete="email" onChange={(e) => updateField('email', e.target.value)} className={inputClass} />
                    {fieldError('email')}
                  </div>

                  <div>
                    <label htmlFor="r-message" className={labelClass}>
                      Special requests <span className="text-[#6b717d]">(optional)</span>
                    </label>
                    <textarea {...field('message')} rows={3} placeholder="Birthday cake, high chair, view table…" onChange={(e) => updateField('message', e.target.value)} className={`${inputClass} resize-none leading-relaxed`} />
                  </div>

                  <div>
                    <label htmlFor="r-heardFrom" className={labelClass}>
                      How did you hear about us? <span className="text-[#6b717d]">(optional)</span>
                    </label>
                    <select {...field('heardFrom')} onChange={(e) => updateField('heardFrom', e.target.value)} className={inputClass}>
                      <option value="">Select…</option>
                      {HEARD_FROM.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="r-company">Company</label>
                    <input {...field('company')} type="text" tabIndex={-1} autoComplete="off" onChange={(e) => updateField('company', e.target.value)} />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[rgba(30,50,90,0.9)] px-6 py-3 text-sm font-normal text-white transition hover:bg-[rgba(30,50,90,1)] focus:outline-none focus:ring-4 focus:ring-[rgba(30,50,90,0.14)] disabled:opacity-70"
                >
                  {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  {status === 'submitting' ? 'Sending…' : 'Request Reservation'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
