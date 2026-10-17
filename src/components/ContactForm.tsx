import { useCallback, useEffect } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useReservationForm, type FormErrors } from '../hooks/useReservationForm';
import { submitLead } from '../services/submitLead';
import { track } from '../utils/analytics';
import { business, telUrl } from '../data/business';
import ContactFallback from './ContactFallback';

type FormData = {
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
  company: string; // honeypot
};

const initialFormState: FormData = {
  name: '',
  phone: '',
  email: '',
  topic: 'General question',
  message: '',
  company: '',
};

const TOPICS = ['General question', 'Event or venue inquiry', 'Catering', 'Partnership', 'Feedback'];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()0-9\s-]{7,20}$/;

const validate = (values: FormData): FormErrors<FormData> => {
  const nextErrors: FormErrors<FormData> = {};
  if (!values.name.trim()) nextErrors.name = 'Name is required.';
  if (!values.phone.trim() && !values.email.trim()) nextErrors.phone = 'Add a mobile number or email so we can reply.';
  if (values.phone.trim() && !phonePattern.test(values.phone.trim())) nextErrors.phone = 'Enter a valid mobile number.';
  if (values.email.trim() && !emailPattern.test(values.email.trim())) nextErrors.email = 'Enter a valid email address.';
  if (!values.message.trim()) nextErrors.message = 'Message is required.';
  else if (values.message.trim().length < 10) nextErrors.message = 'Message must be at least 10 characters.';
  return nextErrors;
};

const inputClass =
  'mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-base sm:text-sm text-[#2d2d2d] outline-none transition focus:border-[rgba(30,50,90,0.45)] focus:ring-4 focus:ring-[rgba(30,50,90,0.08)]';
const labelClass = 'block text-sm font-normal text-[#2d2d2d]';
const errorClass = 'mt-2 text-xs text-[#9f3d36]';

export default function ContactForm() {
  const send = useCallback(async (values: FormData) => {
    if (values.company) return;
    const { company: _honeypot, ...lead } = values;
    void _honeypot;
    await submitLead('contact', lead);
    track('contact_submit', { topic: values.topic });
  }, []);

  const { values, errors, status, updateField, handleSubmit } = useReservationForm(initialFormState, validate, send);

  useEffect(() => {
    if (status === 'error') track('form_error', { form: 'contact' });
  }, [status]);

  const field = (name: keyof FormData) => ({
    id: name,
    name,
    value: values[name],
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });
  const fieldError = (name: keyof FormData) =>
    errors[name] && <p id={`${name}-error`} className={errorClass}>{errors[name]}</p>;

  return (
    <section id="contact" className="w-full px-6 pb-12 md:px-10 lg:pb-16" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="rounded-[2rem] bg-white/70 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur sm:p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#6b717d]">Contact</p>
          <h2 id="contact-title" className="mt-3 text-3xl font-normal leading-tight text-[#2d2d2d] sm:text-4xl">
            Questions? We&apos;re happy to help
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4f5560]">
            Ask us about events, catering, partnerships, or anything else. We usually reply the same day.
          </p>
          <dl className="mt-8 space-y-4 text-sm leading-relaxed text-[#4f5560]">
            {business.phone && telUrl && (
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-[#6b717d]">Phone / Viber</dt>
                <dd className="mt-1">
                  <a href={telUrl} onClick={() => track('call_click', { source: 'contact' })} className="hover:text-[#2d2d2d]">
                    {business.phone}
                  </a>
                </dd>
              </div>
            )}
            {business.email && (
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-[#6b717d]">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${business.email}`} className="hover:text-[#2d2d2d]">{business.email}</a>
                </dd>
              </div>
            )}
            <div>
              <dt className="text-xs uppercase tracking-[0.25em] text-[#6b717d]">Hours</dt>
              <dd className="mt-1">{business.hoursLabel}</dd>
            </div>
          </dl>
          <ContactFallback source="contact" />
        </div>

        {status === 'success' ? (
          <div className="rounded-[2rem] bg-white/85 p-8 text-center shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur" role="status">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden="true" />
            <h3 className="mt-4 text-2xl font-normal text-[#2d2d2d]">Message sent</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4f5560]">Thank you! We&apos;ll get back to you soon.</p>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="relative rounded-[2rem] bg-white/85 p-5 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur sm:p-8">
            {status === 'error' && (
              <div role="alert" className="mb-6 rounded-2xl bg-[#fdf1f0] px-4 py-3 text-sm leading-relaxed text-[#9f3d36] ring-1 ring-[#f3d2cf]">
                Sorry, your message didn&apos;t go through. Please try again.
                <ContactFallback source="contact_error" compact />
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>Name</label>
                <input {...field('name')} type="text" autoComplete="name" onChange={(e) => updateField('name', e.target.value)} className={inputClass} />
                {fieldError('name')}
              </div>

              <div>
                <label htmlFor="topic" className={labelClass}>Topic</label>
                <select {...field('topic')} onChange={(e) => updateField('topic', e.target.value)} className={inputClass}>
                  {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>Mobile number</label>
                <input {...field('phone')} type="tel" inputMode="tel" autoComplete="tel" onChange={(e) => updateField('phone', e.target.value)} className={inputClass} />
                {fieldError('phone')}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input {...field('email')} type="email" autoComplete="email" onChange={(e) => updateField('email', e.target.value)} className={inputClass} />
                {fieldError('email')}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className={labelClass}>Message</label>
              <textarea {...field('message')} rows={5} onChange={(e) => updateField('message', e.target.value)} className={`${inputClass} resize-none leading-relaxed`} />
              {fieldError('message')}
            </div>

            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input {...field('company')} type="text" tabIndex={-1} autoComplete="off" onChange={(e) => updateField('company', e.target.value)} />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[rgba(30,50,90,0.9)] px-6 py-3 text-sm font-normal text-white transition hover:bg-[rgba(30,50,90,1)] focus:outline-none focus:ring-4 focus:ring-[rgba(30,50,90,0.14)] disabled:opacity-70"
            >
              {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
