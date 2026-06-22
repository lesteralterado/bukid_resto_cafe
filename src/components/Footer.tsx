import { FooterSkeleton } from './ui/Skeleton';

type FooterProps = {
  loading?: boolean;
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-sm leading-relaxed text-[#5e6470] opacity-80 transition hover:opacity-100">
      {children}
    </a>
  );
}

export default function Footer({ loading }: FooterProps) {
  if (loading) {
    return <FooterSkeleton />;
  }

  return (
    <footer className="w-full bg-[#2d2d2d] px-6 py-10 text-white md:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Bukid Resto Cafe</p>
          <h2 className="mt-3 text-2xl font-normal leading-tight">Nature, food, and unforgettable views.</h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            A peaceful dining escape for family gatherings, romantic dinners, and relaxing weekend getaways.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-normal uppercase tracking-[0.25em] text-white/60">Explore</h3>
          <div className="mt-5 flex flex-col gap-3">
            <FooterLink href="#about">About</FooterLink>
            <FooterLink href="#why-visit">Why Visit</FooterLink>
            <FooterLink href="#featured-dishes">Featured Dishes</FooterLink>
            <FooterLink href="#gallery">Gallery</FooterLink>
            <FooterLink href="#reviews">Customer Reviews</FooterLink>
            <FooterLink href="#events">Events & Reservations</FooterLink>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-normal uppercase tracking-[0.25em] text-white/60">Contact</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm leading-relaxed text-white/70">
            <a href="mailto:hello@bukidcafe.example" className="transition hover:text-white">
              hello@bukidcafe.example
            </a>
            <span>Daily, 10:00 AM to 10:00 PM</span>
            <span>Bukid Resto Cafe, Cebu</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Bukid Resto Cafe. All rights reserved.</p>
        <p>Designed for peaceful dining and scenic moments.</p>
      </div>
    </footer>
  );
}
