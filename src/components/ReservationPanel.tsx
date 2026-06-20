import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useReservationForm, type FormErrors } from '../hooks/useReservationForm';

type ReservationData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guestCount: string;
  message: string;
};

const initialReservation: ReservationData = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guestCount: '',
  message: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()0-9\s-]{7,20}$/;

const validateReservation = (values: ReservationData): FormErrors<ReservationData> => {
  const next: FormErrors<ReservationData> = {};
  if (!values.name.trim()) next.name = 'Name is required.';
  if (!values.email.trim()) next.email = 'Email is required.';
  else if (!emailPattern.test(values.email.trim())) next.email = 'Enter a valid email address.';
  if (values.phone.trim() && !phonePattern.test(values.phone.trim())) next.phone = 'Enter a valid phone number.';
  if (!values.date) next.date = 'Date is required.';
  if (!values.time) next.time = 'Time is required.';
  if (!values.guestCount.trim()) next.guestCount = 'Number of guests is required.';
  else if (Number(values.guestCount) < 1 || Number(values.guestCount) > 50) next.guestCount = 'Enter a number between 1 and 50.';
  if (!values.message.trim()) next.message = 'Please add a short note or request.';
  return next;
};

type ReservationPanelProps = {
  open: boolean;
  onClose: () => void;
};

export default function ReservationPanel({ open, onClose }: ReservationPanelProps) {
  const { values, errors, submitted, updateField, handleSubmit } = useReservationForm(initialReservation, validateReservation);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="absolute right-0 top-0 h-full w-full md:w-[460px] bg-white/95 backdrop-blur shadow-2xl ring-1 ring-black/5 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#8b919d]">Reservation</p>
                <h2 className="mt-1 text-xl font-normal text-[#2d2d2d]">Reserve your table</h2>
              </div>
              <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-[#2d2d2d] transition hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/10">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form noValidate onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6">
              {submitted && (
                <div className="mb-6 rounded-2xl bg-[#eef7f1] px-4 py-3 text-sm leading-relaxed text-[#2f6b42] ring-1 ring-[#cfe8d6]">
                  Thank you. Your reservation request has been received.
                </div>
              )}

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label htmlFor="r-name" className="block text-sm font-normal text-[#2d2d2d]">Name</label>
                  <input id="r-name" name="name" type="text" autoComplete="name" value={values.name} onChange={(e) => updateField('name', e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'r-name-error' : undefined} className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-[#2d2d2d] outline-none transition focus:border-[rgba(30,50,90,0.45)] focus:ring-4 focus:ring-[rgba(30,50,90,0.08)]" />
                  {errors.name && <p id="r-name-error" className="mt-2 text-xs text-[#9f3d36]">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="r-email" className="block text-sm font-normal text-[#2d2d2d]">Email</label>
                  <input id="r-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(e) => updateField('email', e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'r-email-error' : undefined} className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-[#2d2d2d] outline-none transition focus:border-[rgba(30,50,90,0.45)] focus:ring-4 focus:ring-[rgba(30,50,90,0.08)]" />
                  {errors.email && <p id="r-email-error" className="mt-2 text-xs text-[#9f3d36]">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="r-phone" className="block text-sm font-normal text-[#2d2d2d]">Phone</label>
                  <input id="r-phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(e) => updateField('phone', e.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'r-phone-error' : undefined} className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-[#2d2d2d] outline-none transition focus:border-[rgba(30,50,90,0.45)] focus:ring-4 focus:ring-[rgba(30,50,90,0.08)]" />
                  {errors.phone && <p id="r-phone-error" className="mt-2 text-xs text-[#9f3d36]">{errors.phone}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="r-date" className="block text-sm font-normal text-[#2d2d2d]">Date</label>
                    <input id="r-date" name="date" type="date" value={values.date} onChange={(e) => updateField('date', e.target.value)} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'r-date-error' : undefined} className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-[#2d2d2d] outline-none transition focus:border-[rgba(30,50,90,0.45)] focus:ring-4 focus:ring-[rgba(30,50,90,0.08)]" />
                    {errors.date && <p id="r-date-error" className="mt-2 text-xs text-[#9f3d36]">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="r-time" className="block text-sm font-normal text-[#2d2d2d]">Time</label>
                    <input id="r-time" name="time" type="time" value={values.time} onChange={(e) => updateField('time', e.target.value)} aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? 'r-time-error' : undefined} className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-[#2d2d2d] outline-none transition focus:border-[rgba(30,50,90,0.45)] focus:ring-4 focus:ring-[rgba(30,50,90,0.08)]" />
                    {errors.time && <p id="r-time-error" className="mt-2 text-xs text-[#9f3d36]">{errors.time}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="r-guests" className="block text-sm font-normal text-[#2d2d2d]">Number of Guests</label>
                  <input id="r-guests" name="guestCount" type="number" min={1} max={50} value={values.guestCount} onChange={(e) => updateField('guestCount', e.target.value)} aria-invalid={Boolean(errors.guestCount)} aria-describedby={errors.guestCount ? 'r-guests-error' : undefined} className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-[#2d2d2d] outline-none transition focus:border-[rgba(30,50,90,0.45)] focus:ring-4 focus:ring-[rgba(30,50,90,0.08)]" />
                  {errors.guestCount && <p id="r-guests-error" className="mt-2 text-xs text-[#9f3d36]">{errors.guestCount}</p>}
                </div>

                <div>
                  <label htmlFor="r-message" className="block text-sm font-normal text-[#2d2d2d]">Special Requests</label>
                  <textarea id="r-message" name="message" rows={4} value={values.message} onChange={(e) => updateField('message', e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'r-message-error' : undefined} className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm leading-relaxed text-[#2d2d2d] outline-none transition focus:border-[rgba(30,50,90,0.45)] focus:ring-4 focus:ring-[rgba(30,50,90,0.08)]" />
                  {errors.message && <p id="r-message-error" className="mt-2 text-xs text-[#9f3d36]">{errors.message}</p>}
                </div>
              </div>

              <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[rgba(30,50,90,0.9)] px-6 py-3 text-sm font-normal text-white transition hover:bg-[rgba(30,50,90,1)] focus:outline-none focus:ring-4 focus:ring-[rgba(30,50,90,0.14)]">
                Confirm Reservation
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
