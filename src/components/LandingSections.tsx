import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Star, X } from 'lucide-react';
import {
  BriefcaseIcon,
  CameraIcon,
  ChampagneIcon,
  ChefHatIcon,
  ClockIcon,
  ClockCounterClockwiseIcon,
  ConfettiIcon,
  HeartIcon,
  MapPinIcon,
  MountainsIcon,
  StarIcon as StarFill,
  UsersThreeIcon,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import AppIcon from './ui/AppIcon';
import SmartImage from './ui/SmartImage';
import { dishes } from '../data/menu';
import { business, getOpenStatus } from '../data/business';
import { sizedImage } from '../utils/cloudinary';
import { track } from '../utils/analytics';
import type { ReserveHandler } from '../App';

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

type InfoCardProps = {
  icon: Icon;
  title: string;
  children: ReactNode;
};

type SellingPoint = {
  icon: Icon;
  title: string;
  description: string;
};

type GalleryItem = {
  src: string;
  label: string;
  title: string;
  span: string;
  aspect: string;
};

type Review = {
  quote: string;
  author: string;
  role?: string;
};

type EventType = {
  title: string;
  description: string;
  icon: Icon;
};

const sectionShell = 'w-full px-6 py-16 md:px-10 lg:py-24';
const sectionContainer = 'mx-auto max-w-6xl';
const sectionHeaderCenter = 'mx-auto max-w-3xl text-center';
const sectionHeaderLeft = 'max-w-3xl';
const eyebrowText = 'text-xs font-normal uppercase tracking-[0.3em] text-[#6b717d]';
const headingText = 'mt-3 text-3xl font-normal leading-tight text-[#2d2d2d] sm:text-4xl';
const bodyText = 'mt-4 text-base leading-relaxed text-[#4f5560]';
const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[rgba(30,50,90,0.9)] px-6 py-3 text-sm font-normal text-white transition hover:bg-[rgba(30,50,90,1)] focus:outline-none focus:ring-4 focus:ring-[rgba(30,50,90,0.14)]';

const sellingPoints: SellingPoint[] = [
  {
    icon: ChefHatIcon,
    title: 'Fresh & Delicious Food',
    description: 'Prepared with quality ingredients and made for sharing with the people you love.',
  },
  {
    icon: MountainsIcon,
    title: 'Scenic Mountain View',
    description: 'Perfect for relaxation, quiet conversations, and photography with a natural backdrop.',
  },
  {
    icon: UsersThreeIcon,
    title: 'Family-Friendly Atmosphere',
    description: 'A welcoming space for families, couples, friends, and group gatherings.',
  },
  {
    icon: CameraIcon,
    title: 'Instagram-Worthy Spots',
    description: 'Beautiful corners, open views, and warm lighting for memorable photos.',
  },
];

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;
const cloudinary = 'https://res.cloudinary.com/dhxi75eld/image/upload';

// Real Bukid Resto Cafe photos, plus two STOCK placeholders (sunset, coffee) until real ones are added.
const galleryItems: GalleryItem[] = [
  {
    src: '/images/cafe-exterior.jpg',
    label: 'Cafe Exterior',
    title: 'Bukid Resto Cafe at golden hour, with a rainbow over the garden',
    span: 'sm:col-span-2 lg:row-span-2',
    aspect: '4:3',
  },
  {
    src: `${cloudinary}/v1781986703/727277141_122116941993043826_164577610010474343_n_cfcqlm.jpg`,
    label: 'Guests Dining',
    title: 'Shared meals with family and friends in the garden',
    span: '',
    aspect: '4:3',
  },
  {
    src: `${cloudinary}/v1781986703/726576194_1695073944976241_8577567113806243605_n_acjbwv.jpg`,
    label: 'View Deck',
    title: 'Open-air seating with green hills and sea views',
    span: '',
    aspect: '4:3',
  },
  {
    src: `${cloudinary}/v1781986287/filipino-chicken-inasal-579_uctfaw.webp`,
    label: 'Grill Favorites',
    title: 'Grilled favorites served with rice',
    span: '',
    aspect: '4:3',
  },
  {
    src: `${cloudinary}/v1781986287/2021-06-21_atk-2597_ehz71m.webp`,
    label: 'Sweet Treats',
    title: 'Cool, colorful desserts for warm afternoons',
    span: '',
    aspect: '4:3',
  },
  {
    src: unsplash('1500382017468-9049fed747ef'), // STOCK
    label: 'Sunset Moments',
    title: 'Golden-hour views for a memorable visit',
    span: 'lg:col-span-2',
    aspect: '2:1',
  },
  {
    src: unsplash('1495474472287-4d71bcdd2085'), // STOCK
    label: 'Coffee Break',
    title: 'Warm drinks with a peaceful view',
    span: 'lg:col-span-2',
    aspect: '2:1',
  },
];

// TODO: replace with real Google reviews (with the reviewer's permission) and keep them verbatim.
const reviews: Review[] = [
  {
    quote: 'Amazing food and beautiful scenery. Perfect place for family gatherings.',
    author: 'Maria S.',
    role: 'Regular Guest',
  },
  {
    quote: 'Accomodating kaayu ang mga staff ari, super bet! then the view? It\'s giving!! :)',
    author: 'Happy Guest',
    role: 'Local Visitor',
  },
  {
    quote: 'The staff made our visit feel extra special. The food, the view, and the cozy vibe are all worth coming back for.',
    author: 'Guest',
    role: 'Weekend Visitor',
  },
  {
    quote: 'A relaxing place to enjoy good meals with nature around you. Perfect for catching up with friends and family.',
    author: 'Guest',
    role: 'Family Guest',
  },
  {
    quote: 'One of the best hidden gems in Cebu! The mountain view during sunset is unforgettable.',
    author: 'John D.',
    role: 'Food Blogger',
  },
  {
    quote: 'The view, the food, and the service all felt relaxing and welcoming.',
    author: 'Anna L.',
    role: 'Local Visitor',
  },
  {
    quote: 'Best grilled pork belly I have ever tasted. Will definitely come back!',
    author: 'Pedro C.',
    role: 'First-time Visitor',
  },
  {
    quote: 'Our family reunion was perfect here. The kids loved the open spaces.',
    author: 'Elena M.',
    role: 'From Mandaue',
  },
  {
    quote: 'Coffee with a view - what more can you ask for? Simply perfect.',
    author: 'Carlos R.',
    role: 'Coffee Enthusiast',
  },
];

const eventTypes: EventType[] = [
  {
    title: 'Birthdays',
    description: 'Celebrate another year in a relaxed setting with good food and views.',
    icon: ConfettiIcon,
  },
  {
    title: 'Family reunions',
    description: 'Give everyone room to enjoy long meals, conversations, and photos.',
    icon: UsersThreeIcon,
  },
  {
    title: 'Corporate outings',
    description: 'Host team lunches, appreciation events, or casual company gatherings.',
    icon: BriefcaseIcon,
  },
  {
    title: 'Wedding receptions',
    description: 'Plan an intimate celebration surrounded by nature.',
    icon: ChampagneIcon,
  },
  {
    title: 'Pre-wedding photoshoots',
    description: 'Capture romantic moments with scenic mountain and sunset backdrops.',
    icon: CameraIcon,
  },
];

function SectionHeading({ id, eyebrow, title, description, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? sectionHeaderCenter : sectionHeaderLeft}>
      <p className={eyebrowText}>{eyebrow}</p>
      <h2 id={id} className={headingText}>{title}</h2>
      {description && <p className={bodyText}>{description}</p>}
    </div>
  );
}

function SectionCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[2rem] bg-white/80 p-6 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

function InfoCard({ icon, title, children }: InfoCardProps) {
  return (
    <SectionCard className="flex gap-5">
      <AppIcon icon={icon} size="md" />
      <div>
        <h3 className="text-xl font-normal text-[#2d2d2d]">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#4f5560]">{children}</p>
      </div>
    </SectionCard>
  );
}

type LandingSectionsProps = {
  onReserve: ReserveHandler;
};

export default function LandingSections({ onReserve }: LandingSectionsProps) {
  return (
    <>
      <TrustStrip />
      <FeaturedDishesSection onReserve={onReserve} />
      <WhyVisitSection />
      <GallerySection />
      <ReviewsSection />
      <EventsReservationsSection onReserve={onReserve} />
      <AboutSection />
    </>
  );
}

function TrustStrip() {
  const status = getOpenStatus();
  const rating = business.googleRating;
  const items: { icon: Icon; title: string; detail: string }[] = [
    ...(rating
      ? [{ icon: StarFill, title: `${rating.rating.toFixed(1)} on Google`, detail: `${rating.count} reviews` }]
      : []),
    { icon: ClockIcon, title: status.label, detail: business.hoursLabel },
    { icon: MountainsIcon, title: 'Mountain & sunset views', detail: 'Bring your camera' },
    { icon: UsersThreeIcon, title: `Groups up to ${business.maxGuests}`, detail: 'Birthdays, reunions, outings' },
  ];

  return (
    <section aria-label="Quick facts" className="w-full px-6 pt-6 md:px-10">
      <ul className={`${sectionContainer} grid grid-cols-1 gap-3 sm:grid-cols-3 ${rating ? 'lg:grid-cols-4' : ''}`}>
        {items.map((item) => (
          <li key={item.title} className="flex items-center gap-3 rounded-2xl bg-white/80 p-3 ring-1 ring-black/5">
            <AppIcon icon={item.icon} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm text-[#2d2d2d]">{item.title}</p>
              <p className="truncate text-xs text-[#6b717d]">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className={sectionShell} aria-labelledby="about-title">
      <div className={sectionContainer}>
        <SectionHeading
          id="about-title"
          eyebrow="About Bukid Resto Cafe"
          title="Made for slowing down"
          description="Bukid Resto Cafe began with a simple idea: create a place where people can slow down, share good meals, and enjoy the beauty of the surrounding landscape."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <InfoCard icon={ClockCounterClockwiseIcon} title="Cafe history">
            Inspired by the natural beauty of the area, the cafe grew into a welcoming destination for locals, travelers, and guests celebrating meaningful occasions.
          </InfoCard>
          <InfoCard icon={HeartIcon} title="Mission">
            To serve fresh food, warm hospitality, and peaceful views that help every guest feel relaxed, welcomed, and cared for.
          </InfoCard>
          <InfoCard icon={MapPinIcon} title="What makes it unique">
            A blend of scenic mountain views, home-style dishes, cozy dining spaces, and photo-ready corners in one relaxing escape.
          </InfoCard>
        </div>
      </div>
    </section>
  );
}

function WhyVisitSection() {
  return (
    <section id="why-visit" className="w-full bg-[#eaf0e8] px-6 py-16 md:px-10 lg:py-24" aria-labelledby="why-visit-title">
      <div className={sectionContainer}>
        <SectionHeading
          id="why-visit-title"
          eyebrow="Why Visit"
          title="Reasons to spend the day at Bukid Resto Cafe"
          description="Every corner is made for relaxation, good food, and memories with the people who matter most."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sellingPoints.map((point) => (
            <SectionCard key={point.title} className="flex flex-col">
              <AppIcon icon={point.icon} className="mb-5" />
              <h3 className="text-xl font-normal text-[#2d2d2d]">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4f5560]">{point.description}</p>
            </SectionCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedDishesSection({ onReserve }: { onReserve: ReserveHandler }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track('menu_view');
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="featured-dishes" className={sectionShell} aria-labelledby="featured-dishes-title">
      <div className={sectionContainer}>
        <SectionHeading
          id="featured-dishes-title"
          eyebrow="Featured Dishes"
          title="Best-selling food made for sharing"
          description="From grilled favorites to coffee and desserts, each dish is prepared to complement the cafe's relaxed mountain setting."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dishes.map((dish) => (
            <article
              key={dish.title}
              className="group overflow-hidden rounded-[2rem] bg-white/80 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur"
            >
              <div className="relative">
                <SmartImage
                  src={dish.image}
                  alt={`${dish.title} at Bukid Resto Cafe`}
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
                  <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-normal text-[#2d2d2d] backdrop-blur">
                    {dish.label}
                  </span>
                  {dish.bestSeller && (
                    <span className="rounded-full bg-[#f5a300] px-3 py-1 text-xs font-medium text-white shadow-sm">
                      Best seller
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-normal text-[#2d2d2d]">{dish.title}</h3>
                  {dish.price != null && (
                    <span className="shrink-0 text-base text-emerald-700">₱{dish.price.toLocaleString('en-PH')}</span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#4f5560]">{dish.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-[#4f5560]">Hungry already? Save a table with the best view.</p>
          <button type="button" onClick={() => onReserve('dishes_cta')} className={primaryButton}>
            Reserve a Table
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const [active, setActive] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <section id="gallery" className="w-full bg-[#eaf0e8] px-6 py-16 md:px-10 lg:py-24" aria-labelledby="gallery-title">
      <div className={sectionContainer}>
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title="A glimpse of the Bukid Resto Cafe experience"
          description="Explore the spaces, views, meals, and moments that make every visit feel special."
        />

        <div className="mt-10 grid grid-flow-dense auto-rows-[200px] gap-4 sm:grid-cols-2 lg:auto-rows-[190px] lg:grid-cols-4">
          {galleryItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(item)}
              className={`group relative overflow-hidden rounded-[1.75rem] shadow-lg shadow-black/5 ring-1 ring-black/5 focus:outline-none focus:ring-4 focus:ring-emerald-600/30 ${item.span}`}
              aria-label={`View photo: ${item.title}`}
            >
              <SmartImage
                src={item.src}
                alt={item.title}
                aspect={item.aspect}
                className="h-full w-full"
                sizes={item.span ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-3 py-1 text-xs font-normal text-[#2d2d2d] backdrop-blur">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.figure
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="relative max-h-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={sizedImage(active.src, { width: 1600, aspect: active.aspect === '2:1' ? '2:1' : '3:2' })}
                alt={active.title}
                className="max-h-[80vh] w-auto rounded-2xl object-contain"
              />
              <figcaption className="mt-3 text-center text-sm text-white/85">{active.title}</figcaption>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close photo"
                autoFocus
                className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2d2d2d] shadow-lg"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ReviewsSection() {
  const rating = business.googleRating;

  return (
    <section id="reviews" className={sectionShell} aria-labelledby="reviews-title">
      <div className={sectionContainer}>
        <SectionHeading
          id="reviews-title"
          eyebrow="Customer Reviews"
          title="What our guests are saying"
          description="Real experiences from visitors who came for the scenery and stayed for the moments."
        />

        {rating && (
          <div className="mt-6 flex flex-col items-center gap-2">
            <p className="flex items-center gap-2 text-lg text-[#2d2d2d]">
              <Star className="h-5 w-5 fill-[#f5a300] text-[#f5a300]" aria-hidden="true" />
              {rating.rating.toFixed(1)} average from {rating.count} Google reviews
            </p>
            {business.googleReviewsUrl && (
              <a
                href={business.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-emerald-700 underline-offset-4 hover:underline"
              >
                See all reviews on Google
              </a>
            )}
          </div>
        )}
      </div>

      <div className="mx-auto mt-12 max-w-6xl space-y-4 sm:px-6 md:px-10">
        <MarqueeRow reviews={reviews} direction="left" />
        <MarqueeRow reviews={[...reviews].reverse()} direction="right" />
      </div>
    </section>
  );
}

function MarqueeRow({ reviews, direction }: { reviews: Review[]; direction: 'left' | 'right' }) {
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <motion.div
        className="flex w-max gap-6 motion-reduce:!transform-none"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            duration: 45,
            ease: 'linear',
            repeat: Infinity,
          },
        }}
      >
        {duplicatedReviews.map((review, i) => (
          <TestimonialCard key={`${review.author}-${i}`} review={review} hidden={i >= reviews.length} />
        ))}
      </motion.div>
    </div>
  );
}

function TestimonialCard({ review, hidden }: { review: Review; hidden: boolean }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="flex-shrink-0 w-80 rounded-3xl bg-white/90 p-6 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur"
    >
      <div className="flex items-center gap-1 mb-4 text-[#f5a300]" role="img" aria-label="Rated 5 out of 5">
        {[0, 1, 2, 3, 4].map((star) => (
          <Star key={star} className="h-4 w-4 fill-current" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="text-base leading-relaxed text-[#2d2d2d] mb-4">&quot;{review.quote}&quot;</blockquote>
      <figcaption className="flex items-center gap-3">
        <span className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-300 flex items-center justify-center text-sm font-medium text-emerald-800" aria-hidden="true">
          {review.author.charAt(0)}
        </span>
        <span>
          <span className="block font-normal text-[#2d2d2d] text-sm">{review.author}</span>
          <span className="block text-[#6b717d] text-xs">{review.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function EventsReservationsSection({ onReserve }: { onReserve: ReserveHandler }) {
  return (
    <section id="events" className="w-full bg-[#eaf0e8] px-6 py-16 md:px-10 lg:py-24" aria-labelledby="events-title">
      <div className={sectionContainer}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeading
              id="events-title"
              align="left"
              eyebrow="Events & Reservations"
              title="Planning a special event?"
              description={`We host groups of up to ${business.maxGuests} guests for birthdays, reunions, corporate outings, wedding receptions, and pre-wedding photoshoots. Tap an occasion to start your inquiry.`}
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {eventTypes.map((event, index) => (
                <button
                  key={event.title}
                  type="button"
                  onClick={() => onReserve('event_card', event.title)}
                  className={`${index === eventTypes.length - 1 && eventTypes.length % 2 === 1 ? 'sm:col-span-2' : ''} group flex items-start gap-4 rounded-[1.5rem] bg-white/70 p-5 text-left ring-1 ring-black/5 backdrop-blur transition hover:bg-white hover:shadow-lg hover:shadow-black/5 focus:outline-none focus:ring-4 focus:ring-emerald-600/20`}
                >
                  <AppIcon icon={event.icon} size="md" />
                  <span>
                    <span className="flex items-center gap-1 text-lg font-normal text-[#2d2d2d]">
                      {event.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-60" aria-hidden="true" />
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[#4f5560]">{event.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <SectionCard className="flex flex-col justify-center text-center">
            <AppIcon icon={StarFill} className="mx-auto mb-6" />
            <h3 className="text-2xl font-normal leading-tight text-[#2d2d2d]">Reserve your table or venue</h3>
            <p className="mt-4 text-base leading-relaxed text-[#4f5560]">
              Share your preferred date, number of guests, and any special requests. We&apos;ll reply with availability and a free quote for events.
            </p>
            <button type="button" onClick={() => onReserve('events_cta')} className={`${primaryButton} mt-6`}>
              Request a reservation
            </button>
            <p className="mt-4 text-xs leading-relaxed text-[#6b717d]">
              Takes about a minute · No payment needed to inquire
            </p>
          </SectionCard>
        </div>
      </div>
    </section>
  );
}
