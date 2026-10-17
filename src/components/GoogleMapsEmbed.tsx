import { Clock, MapPin, Navigation } from 'lucide-react';
import { business, getOpenStatus } from '../data/business';
import { track } from '../utils/analytics';
import ContactFallback from './ContactFallback';

const iframeSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31422.0249528439!2d123.49711367792557!3d10.119283268624542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a961004d79d54b%3A0x4dfdbf9e0c066988!2sBukid%20Resto%20Cafe!5e0!3m2!1sen!2sph!4v1781972254769!5m2!1sen!2sph';

export default function GoogleMapsEmbed() {
  const status = getOpenStatus();
  const address = [business.streetAddress, business.locality].filter(Boolean).join(', ');

  return (
    <section id="visit" className="w-full px-6 py-16 md:px-10" aria-labelledby="visit-title">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
        <div className="flex flex-col justify-center rounded-[2rem] bg-white/70 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#6b717d]">Visit Us</p>
          <h2 id="visit-title" className="mt-3 text-3xl font-normal leading-tight text-[#2d2d2d] sm:text-4xl">
            Find your way to the view
          </h2>
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-[#4f5560]">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
              <span>{business.name}, {address}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
              <span>
                <span className={status.isOpen ? 'text-emerald-700' : 'text-amber-700'}>{status.label}</span>
                <span className="block">{business.hoursLabel}</span>
              </span>
            </li>
          </ul>
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('directions_click', { source: 'visit_section' })}
            className="mt-8 inline-flex items-center justify-center gap-2 self-start rounded-full bg-[rgba(30,50,90,0.9)] px-6 py-3 text-sm font-normal text-white transition hover:bg-[rgba(30,50,90,1)] focus:outline-none focus:ring-4 focus:ring-[rgba(30,50,90,0.14)]"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Get directions
          </a>
          <ContactFallback source="visit_section" compact />
        </div>

        <div className="rounded-[2rem] bg-white/70 p-3 shadow-sm ring-1 ring-black/5 backdrop-blur sm:p-4">
          <iframe
            src={iframeSrc}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bukid Resto Cafe on Google Maps"
            className="h-[320px] w-full overflow-hidden rounded-[1.5rem] bg-[#e8ecef] md:h-[420px] lg:h-full lg:min-h-[420px]"
          />
        </div>
      </div>
    </section>
  );
}
