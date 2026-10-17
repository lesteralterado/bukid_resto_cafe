import { business, telUrl } from '../data/business';
import { track } from '../utils/analytics';

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-sm leading-relaxed text-white/70 transition hover:text-white">
      {children}
    </a>
  );
}

export default function Footer() {
  const address = [business.streetAddress, business.locality].filter(Boolean).join(', ');

  return (
    <footer className="w-full bg-[#2d2d2d] px-6 pt-10 pb-28 text-white md:px-10 md:pb-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{business.name}</p>
          <h2 className="mt-3 text-2xl font-normal leading-tight">Nature, food, and unforgettable views.</h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            A peaceful dining escape for family gatherings, romantic dinners, and relaxing weekend getaways.
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-normal uppercase tracking-[0.25em] text-white/60">Explore</h3>
          <div className="mt-5 flex flex-col gap-3">
            <FooterLink href="#featured-dishes">Menu</FooterLink>
            <FooterLink href="#gallery">Gallery</FooterLink>
            <FooterLink href="#reviews">Customer Reviews</FooterLink>
            <FooterLink href="#events">Events & Reservations</FooterLink>
            <FooterLink href="#about">About</FooterLink>
            <FooterLink href="#visit">Visit Us</FooterLink>
          </div>
        </nav>

        <div>
          <h3 className="text-sm font-normal uppercase tracking-[0.25em] text-white/60">Contact</h3>
          <address className="mt-5 flex flex-col gap-3 text-sm not-italic leading-relaxed text-white/70">
            {business.phone && telUrl && (
              <a href={telUrl} onClick={() => track('call_click', { source: 'footer' })} className="transition hover:text-white">
                {business.phone}
              </a>
            )}
            {business.email && (
              <a href={`mailto:${business.email}`} className="transition hover:text-white">
                {business.email}
              </a>
            )}
            <span>{business.hoursLabel}</span>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('directions_click', { source: 'footer' })}
              className="transition hover:text-white"
            >
              {business.name}, {address}
            </a>
            {business.facebookUrl && (
              <a href={business.facebookUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                Facebook
              </a>
            )}
          </address>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        <p>Designed for peaceful dining and scenic moments.</p>
      </div>
    </footer>
  );
}
