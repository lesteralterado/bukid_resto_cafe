import { type FormEvent, useState } from 'react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormState: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()0-9\s-]{7,20}$/;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (values: FormData): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (values.phone.trim() && !phonePattern.test(values.phone.trim())) {
      nextErrors.phone = 'Enter a valid phone number.';
    }

    if (!values.subject.trim()) {
      nextErrors.subject = 'Subject is required.';
    }

    if (!values.message.trim()) {
      nextErrors.message = 'Message is required.';
    } else if (values.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters.';
    }

    return nextErrors;
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
    setSubmitted(false);

    if (errors[field]) {
      const nextFormData = {
        ...formData,
        [field]: value,
      };
      const validationErrors = validate(nextFormData);
      setErrors((current) => {
        const next = { ...current };

        if (validationErrors[field]) {
          next[field] = validationErrors[field];
        } else {
          delete next[field];
        }

        return next;
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitted(true);
    setFormData(initialFormState);
  };

  return (
    <section id="contact" className="w-full px-6 pb-12 md:px-10 lg:pb-16" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="rounded-[2rem] bg-white/70 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur sm:p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b919d]">Contact</p>
          <h2 id="contact-title" className="mt-3 text-3xl font-normal leading-tight text-[#2d2d2d] sm:text-4xl">
            Tell us how we can help
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5e6470] opacity-80">
            Send us a note about reservations, events, catering, partnerships, or anything else you would like to discuss.
          </p>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-[#5e6470]">
            <div>
              <span className="block text-xs uppercase tracking-[0.25em] text-[#8b919d]">Email</span>
              <span className="block mt-1">hello@bukidcafe.example</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-[0.25em] text-[#8b919d]">Hours</span>
              <span className="block mt-1">Daily, 8:00 AM to 9:00 PM</span>
            </div>
          </div>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="rounded-[2rem] bg-white/85 p-5 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur sm:p-8"
        >
          {submitted && (
            <div className="mb-6 rounded-2xl bg-[#eef7f1] px-4 py-3 text-sm leading-relaxed text-[#2f6b42] ring-1 ring-[#cfe8d6]">
              Thank you. Your message has been received.
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-normal text-[#2d2d2d]">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={(event) => updateField('name', event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-[#2d2d2d] outline-none transition focus:border-[rgba(30,50,90,0.45)] focus:ring-4 focus:ring-[rgba(30,50,90,0.08)]"
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-xs text-[#9f3d36]">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-normal text-[#2d2d2d]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(event) => updateField('email', event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-[#2d2d2d] outline-none transition focus:border-[rgba(30,50,90,0.45)] focus:ring-4 focus:ring-[rgba(30,50,90,0.08)]"
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-xs text-[#9f3d36]">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-normal text-[#2d2d2d]">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-[#2d2d2d] outline-none transition focus:border-[rgba(30,50,90,0.45)] focus:ring-4 focus:ring-[rgba(30,50,90,0.08)]"
              />
              {errors.phone && (
                <p id="phone-error" className="mt-2 text-xs text-[#9f3d36]">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-normal text-[#2d2d2d]">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={(event) => updateField('subject', event.target.value)}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-[#2d2d2d] outline-none transition focus:border-[rgba(30,50,90,0.45)] focus:ring-4 focus:ring-[rgba(30,50,90,0.08)]"
              />
              {errors.subject && (
                <p id="subject-error" className="mt-2 text-xs text-[#9f3d36]">
                  {errors.subject}
                </p>
              )}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="block text-sm font-normal text-[#2d2d2d]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={(event) => updateField('message', event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm leading-relaxed text-[#2d2d2d] outline-none transition focus:border-[rgba(30,50,90,0.45)] focus:ring-4 focus:ring-[rgba(30,50,90,0.08)]"
            />
            {errors.message && (
              <p id="message-error" className="mt-2 text-xs text-[#9f3d36]">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[rgba(30,50,90,0.9)] px-6 py-3 text-sm font-normal text-white transition hover:bg-[rgba(30,50,90,1)] focus:outline-none focus:ring-4 focus:ring-[rgba(30,50,90,0.14)]"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
