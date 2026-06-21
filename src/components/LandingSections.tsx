import {
  Building2,
  CalendarHeart,
  Camera,
  ChefHat,
  Coffee,
  Crown,
  Heart,
  History,
  Leaf,
  MapPin,
  Mountain,
  MountainSnow,
  PartyPopper,
  PhoneCall,
  Salad,
  Star,
  Sunset,
  Users,
  UtensilsCrossed,
  Wine,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  GridSkeleton,
} from './ui/Skeleton';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

type InfoCardProps = {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
};

type SellingPoint = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type Dish = {
  title: string;
  description: string;
  icon: LucideIcon;
  label: string;
};

type GalleryItem = {
  title: string;
  icon: LucideIcon;
  label: string;
  className: string;
};

type Review = {
  quote: string;
  author: string;
  role?: string;
};

type EventType = {
  title: string;
  description: string;
};

type LandingSectionsProps = {
  loading?: boolean;
};

const sectionShell = 'w-full px-6 py-16 md:px-10 lg:py-24';
const sectionContainer = 'mx-auto max-w-6xl';
const sectionHeaderCenter = 'mx-auto max-w-3xl text-center';
const sectionHeaderLeft = 'max-w-3xl';
const eyebrowText = 'text-xs font-normal uppercase tracking-[0.3em] text-[#8b919d]';
const headingText = 'mt-3 text-3xl font-normal leading-tight text-[#2d2d2d] sm:text-4xl';
const bodyText = 'mt-4 text-base leading-relaxed text-[#5e6470] opacity-80';

const sellingPoints: SellingPoint[] = [
  {
    icon: ChefHat,
    title: 'Fresh & Delicious Food',
    description: 'Prepared with quality ingredients and made for sharing with the people you love.',
  },
  {
    icon: MountainSnow,
    title: 'Scenic Mountain View',
    description: 'Perfect for relaxation, quiet conversations, and photography with a natural backdrop.',
  },
  {
    icon: Users,
    title: 'Family-Friendly Atmosphere',
    description: 'A welcoming space for families, couples, friends, and group gatherings.',
  },
  {
    icon: Camera,
    title: 'Instagram-Worthy Spots',
    description: 'Beautiful corners, open views, and warm lighting for memorable photos.',
  },
];

const dishes: Dish[] = [
  {
    icon: UtensilsCrossed,
    label: 'Signature Grill',
    title: 'Grilled Pork Belly',
    description: 'Tender, smoky pork belly served with a savory dipping sauce and rice.',
  },
  {
    icon: Salad,
    label: 'Seafood Feast',
    title: 'Seafood Platter',
    description: 'A generous mix of grilled seafood made for sharing.',
  },
  {
    icon: Coffee,
    label: 'House Brew',
    title: 'Signature Coffee',
    description: 'A rich local-inspired coffee blend crafted for slow afternoons.',
  },
  {
    icon: Heart,
    label: 'Sweet Treats',
    title: 'Homemade Desserts',
    description: 'Freshly prepared desserts with a homemade taste.',
  },
  {
    icon: ChefHat,
    label: 'Cafe Favorite',
    title: 'Bukid Breakfast Plate',
    description: 'A hearty breakfast plate with eggs, toast, and seasonal sides.',
  },
  {
    icon: UtensilsCrossed,
    label: 'Comfort Meal',
    title: 'Creamy Pasta',
    description: 'Creamy pasta tossed with savory sauce and fresh herbs.',
  },
  {
    icon: Leaf,
    label: 'Light Bite',
    title: 'Garden Salad',
    description: 'Crisp greens, fresh vegetables, and a bright house dressing.',
  },
  {
    icon: Wine,
    label: 'Cool Refreshment',
    title: 'Mountain Fruit Shake',
    description: 'A chilled fruit shake made with refreshing local flavors.',
  },
];

const galleryItems: GalleryItem[] = [
  {
    icon: Building2,
    label: 'Cafe Exterior',
    title: 'A calm entrance surrounded by nature',
    className: 'from-emerald-100 to-emerald-200',
  },
  {
    icon: UtensilsCrossed,
    label: 'Dining Area',
    title: 'Comfortable dining spaces for every gathering',
    className: 'from-amber-100 to-amber-200',
  },
  {
    icon: Mountain,
    label: 'Mountain Views',
    title: 'Wide green views from the cafe',
    className: 'from-sky-100 to-sky-200',
  },
  {
    icon: Sunset,
    label: 'Sunset Moments',
    title: 'Golden-hour views for a memorable visit',
    className: 'from-orange-100 to-orange-200',
  },
  {
    icon: Users,
    label: 'Guests Dining',
    title: 'Shared meals with family and friends',
    className: 'from-rose-100 to-rose-200',
  },
  {
    icon: Camera,
    label: 'Photo Spots',
    title: 'Beautiful corners made for photos',
    className: 'from-violet-100 to-violet-200',
  },
  {
    icon: Coffee,
    label: 'Coffee Break',
    title: 'Warm drinks with a peaceful view',
    className: 'from-lime-100 to-lime-200',
  },
];

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
  },
  {
    title: 'Family reunions',
    description: 'Give everyone room to enjoy long meals, conversations, and photos.',
  },
  {
    title: 'Corporate outings',
    description: 'Host team lunches, appreciation events, or casual company gatherings.',
  },
  {
    title: 'Wedding receptions',
    description: 'Plan an intimate celebration surrounded by nature.',
  },
  {
    title: 'Pre-wedding photoshoots',
    description: 'Capture romantic moments with scenic mountain and sunset backdrops.',
  },
];

function SectionHeading({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? sectionHeaderCenter : sectionHeaderLeft}>
      <p className={eyebrowText}>{eyebrow}</p>
      <h2 className={headingText}>{title}</h2>
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

function InfoCard({ icon: Icon, title, children }: InfoCardProps) {
  return (
    <SectionCard>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-normal text-[#2d2d2d]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#5e6470] opacity-80">{children}</p>
    </SectionCard>
  );
}

function PlaceholderImage({
  icon: Icon,
  label,
  className,
}: {
  icon: LucideIcon;
  label: string;
  className: string;
}) {
  return (
    <div className={`relative h-48 overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="h-16 w-16 text-white/70" aria-hidden="true" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-normal text-[#2d2d2d] backdrop-blur">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function LandingSections({ loading }: LandingSectionsProps) {
  return (
    <>
      {loading ? <AboutSkeleton /> : <AboutSection />}
      {loading ? <WhyVisitSkeleton /> : <WhyVisitSection />}
      {loading ? <FeaturedDishesSkeleton /> : <FeaturedDishesSection />}
      {loading ? <GallerySkeleton /> : <GallerySection />}
      {loading ? <ReviewsSkeleton /> : <ReviewsSection />}
      {loading ? <EventsSkeleton /> : <EventsReservationsSection />}
    </>
  );
}

function AboutSection() {
  return (
    <section id="about" className={sectionShell} aria-labelledby="about-title">
      <div className={sectionContainer}>
        <SectionHeading
          eyebrow="About Bukid Resto Cafe"
          title="A peaceful dining escape in the heart of nature"
          description="Nestled in the heart of nature, Bukid Resto Cafe offers a peaceful dining experience surrounded by scenic landscapes. Whether you are looking for a family gathering, romantic dinner, or a relaxing weekend getaway, our cafe provides great food and unforgettable views."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <SectionCard className="flex flex-col justify-between">
            <div>
              <p className={eyebrowText}>Our story</p>
              <p className="mt-4 text-lg leading-relaxed text-[#2d2d2d]">
                Bukid Resto Cafe began with a simple idea: create a place where people can slow down, share good meals, and enjoy the beauty of the surrounding landscape.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#5e6470] opacity-80">
                From quiet morning coffee to sunset dinners with family, the cafe is designed for moments that feel calm, personal, and worth remembering.
              </p>
            </div>
          </SectionCard>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-1">
            <InfoCard icon={History} title="Cafe history">
              Inspired by the natural beauty of the area, the cafe grew into a welcoming destination for locals, travelers, and guests celebrating meaningful occasions.
            </InfoCard>
            <InfoCard icon={Heart} title="Mission">
              To serve fresh food, warm hospitality, and peaceful views that help every guest feel relaxed, welcomed, and cared for.
            </InfoCard>
            <InfoCard icon={MapPin} title="What makes it unique">
              A blend of scenic mountain views, home-style dishes, cozy dining spaces, and photo-ready corners in one relaxing escape.
            </InfoCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSkeleton() {
  return (
    <section id="about" className={sectionShell} aria-labelledby="about-title">
      <div className={sectionContainer}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="h-3 w-32 mx-auto rounded-md bg-white/50 animate-pulse" />
          <div className="mt-3 h-10 w-3/4 mx-auto rounded-2xl bg-white/50 animate-pulse" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full mx-auto rounded-md bg-white/50 animate-pulse" />
            <div className="h-4 w-5/6 mx-auto rounded-md bg-white/50 animate-pulse" />
            <div className="h-4 w-4/6 mx-auto rounded-md bg-white/50 animate-pulse" />
          </div>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-[2rem] bg-white/80 p-6 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur sm:p-8">
            <div className="space-y-3">
              <div className="h-3 w-24 rounded-md bg-white/50 animate-pulse" />
              <div className="h-4 w-full rounded-md bg-white/50 animate-pulse" />
              <div className="h-4 w-full rounded-md bg-white/50 animate-pulse" />
              <div className="h-4 w-5/6 rounded-md bg-white/50 animate-pulse" />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-[2rem] bg-white/80 p-6 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur sm:p-8">
                <div className="flex flex-col gap-3">
                  <div className="h-3 w-24 rounded-md bg-white/50 animate-pulse" />
                  <div className="h-4 w-full rounded-md bg-white/50 animate-pulse" />
                  <div className="h-4 w-5/6 rounded-md bg-white/50 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
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
          eyebrow="Why Visit"
          title="Reasons to spend the day at Bukid Resto Cafe"
          description="Every corner is made for relaxation, good food, and memories with the people who matter most."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sellingPoints.map((point) => (
            <SectionCard key={point.title} className="flex flex-col">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm ring-1 ring-black/5">
                <point.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-normal text-[#2d2d2d]">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5e6470] opacity-80">{point.description}</p>
            </SectionCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyVisitSkeleton() {
  return (
    <section id="why-visit" className="w-full bg-[#eaf0e8] px-6 py-16 md:px-10 lg:py-24" aria-labelledby="why-visit-title">
      <div className={sectionContainer}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="h-3 w-20 mx-auto rounded-md bg-white/50 animate-pulse" />
          <div className="mt-3 h-10 w-4/5 mx-auto rounded-2xl bg-white/50 animate-pulse" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full mx-auto rounded-md bg-white/50 animate-pulse" />
            <div className="h-4 w-5/6 mx-auto rounded-md bg-white/50 animate-pulse" />
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-[2rem] bg-white/80 p-6 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur flex flex-col">
              <div className="mb-5 h-12 w-12 rounded-full bg-white/70 animate-pulse" />
              <div className="h-5 w-4/5 rounded-md bg-white/60 animate-pulse" />
              <div className="mt-3 space-y-2">
                <div className="h-4 w-full rounded-md bg-white/50 animate-pulse" />
                <div className="h-4 w-3/4 rounded-md bg-white/50 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedDishesSection() {
  return (
    <section id="featured-dishes" className={sectionShell} aria-labelledby="featured-dishes-title">
      <div className={sectionContainer}>
        <SectionHeading
          eyebrow="Featured Dishes"
          title="Best-selling food made for sharing"
          description="From grilled favorites to coffee and desserts, each dish is prepared to complement the cafe's relaxed mountain setting."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dishes.map((dish) => (
            <div
              key={dish.title}
              className="overflow-hidden rounded-[2rem] bg-white/80 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur"
            >
              <PlaceholderImage icon={dish.icon} label={dish.label} className={dish.title.includes('Coffee') ? 'from-amber-100 to-amber-200' : dish.title.includes('Salad') ? 'from-lime-100 to-lime-200' : dish.title.includes('Shake') ? 'from-sky-100 to-sky-200' : dish.title.includes('Desserts') ? 'from-rose-100 to-rose-200' : 'from-orange-100 to-orange-200'} />
              <div className="p-5">
                <h3 className="text-xl font-normal text-[#2d2d2d]">{dish.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5e6470] opacity-80">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedDishesSkeleton() {
  return (
    <section id="featured-dishes" className={sectionShell} aria-labelledby="featured-dishes-title">
      <div className={sectionContainer}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="h-3 w-28 mx-auto rounded-md bg-white/50 animate-pulse" />
          <div className="mt-3 h-10 w-4/5 mx-auto rounded-2xl bg-white/50 animate-pulse" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full mx-auto rounded-md bg-white/50 animate-pulse" />
            <div className="h-4 w-5/6 mx-auto rounded-md bg-white/50 animate-pulse" />
          </div>
        </div>
        <GridSkeleton count={8} className="mt-10 gap-6 sm:grid-cols-2 lg:grid-cols-4" />
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="w-full bg-[#eaf0e8] px-6 py-16 md:px-10 lg:py-24" aria-labelledby="gallery-title">
      <div className={sectionContainer}>
        <SectionHeading
          eyebrow="Gallery"
          title="A glimpse of the Bukid Resto Cafe experience"
          description="Explore the spaces, views, meals, and moments that make every visit feel special."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item) => (
            <div
              key={item.title}
              className={`group overflow-hidden rounded-[2rem] bg-gradient-to-br ${item.className} p-3 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur`}
            >
              <div className="relative h-48 overflow-hidden rounded-[1.5rem] bg-white/30">
                <item.icon className="absolute right-4 top-4 h-10 w-10 text-white/70" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <item.icon className="h-20 w-20 text-white/60" aria-hidden="true" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-normal text-[#2d2d2d] backdrop-blur">
                    {item.label}
                  </span>
                </div>
              </div>
              <p className="mt-4 px-1 text-sm leading-relaxed text-[#5e6470] opacity-80">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySkeleton() {
  return (
    <section id="gallery" className="w-full bg-[#eaf0e8] px-6 py-16 md:px-10 lg:py-24" aria-labelledby="gallery-title">
      <div className={sectionContainer}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="h-3 w-20 mx-auto rounded-md bg-white/50 animate-pulse" />
          <div className="mt-3 h-10 w-4/5 mx-auto rounded-2xl bg-white/50 animate-pulse" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full mx-auto rounded-md bg-white/50 animate-pulse" />
            <div className="h-4 w-5/6 mx-auto rounded-md bg-white/50 animate-pulse" />
          </div>
        </div>
        <GridSkeleton count={7} className="mt-10 gap-4 sm:grid-cols-2 lg:grid-cols-4" />
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="reviews" className={sectionShell} aria-labelledby="reviews-title">
      <div className={sectionContainer}>
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What our guests are saying"
          description="Real experiences from visitors who came for the scenery and stayed for the moments."
        />

        <div className="mt-12 space-y-4">
          <MarqueeRow reviews={reviews} direction="left" />
          <MarqueeRow reviews={reviews} direction="right" />
        </div>
      </div>
    </section>
  );
}

function ReviewsSkeleton() {
  return (
    <section id="reviews" className={sectionShell} aria-labelledby="reviews-title">
      <div className={sectionContainer}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="h-3 w-28 mx-auto rounded-md bg-white/50 animate-pulse" />
          <div className="mt-3 h-10 w-3/4 mx-auto rounded-2xl bg-white/50 animate-pulse" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full mx-auto rounded-md bg-white/50 animate-pulse" />
            <div className="h-4 w-5/6 mx-auto rounded-md bg-white/50 animate-pulse" />
          </div>
        </div>
        <div className="mt-12 space-y-4">
          <div className="flex gap-6 overflow-hidden">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-80 rounded-3xl bg-white/90 p-6 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur">
                <div className="flex items-center gap-1 mb-4">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <div key={star} className="h-4 w-4 rounded-sm bg-white/70 animate-pulse" />
                  ))}
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full rounded-md bg-white/50 animate-pulse" />
                  <div className="h-4 w-full rounded-md bg-white/50 animate-pulse" />
                  <div className="h-4 w-3/4 rounded-md bg-white/50 animate-pulse" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/70 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 w-24 rounded-md bg-white/60 animate-pulse" />
                    <div className="h-3 w-16 rounded-md bg-white/40 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeRow({ reviews, direction }: { reviews: Review[]; direction: 'left' | 'right' }) {
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          },
        }}
      >
        {duplicatedReviews.map((review, i) => (
          <TestimonialCard key={`${review.author}-${i}`} review={review} />
        ))}
      </motion.div>
    </div>
  );
}

function TestimonialCard({ review }: { review: Review }) {
  return (
    <div className="flex-shrink-0 w-80 rounded-3xl bg-white/90 p-6 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur">
      <div className="flex items-center gap-1 mb-4 text-[#d99a22]" aria-label="Five star review">
        {[0, 1, 2, 3, 4].map((star) => (
          <Star key={star} className="h-4 w-4 fill-current" aria-hidden="true" />
        ))}
      </div>
      <p className="text-base leading-relaxed text-[#2d2d2d] mb-4">
        &quot;{review.quote}&quot;
      </p>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-300 flex items-center justify-center">
          <span className="text-sm font-medium text-emerald-800">
            {review.author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-normal text-[#2d2d2d] text-sm">{review.author}</p>
          <p className="text-[#8b919d] text-xs">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

function EventsReservationsSection() {
  return (
    <section id="events" className="w-full bg-[#eaf0e8] px-6 py-16 md:px-10 lg:py-24" aria-labelledby="events-title">
      <div className={sectionContainer}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className={eyebrowText}>Events &amp; Reservations</p>
            <h2 id="events-title" className="mt-3 text-3xl font-normal leading-tight text-[#2d2d2d] sm:text-4xl">
              Planning a special event?
            </h2>
            <p className={bodyText}>
              Contact us for reservations and venue inquiries. We can help you prepare for birthdays, reunions, corporate outings, wedding receptions, and pre-wedding photoshoots.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {eventTypes.map((event) => (
                <div
                  key={event.title}
                  className="rounded-[1.5rem] bg-white/70 p-5 ring-1 ring-black/5 backdrop-blur"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    {getEventIcon(event.title)}
                  </div>
                  <h3 className="text-lg font-normal text-[#2d2d2d]">{event.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5e6470] opacity-80">{event.description}</p>
                </div>
              ))}
            </div>
          </div>

          <SectionCard className="flex flex-col justify-center text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <PhoneCall className="h-8 w-8" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-normal leading-tight text-[#2d2d2d]">Reserve your table or venue</h3>
            <p className="mt-4 text-base leading-relaxed text-[#5e6470] opacity-80">
              Let us know your event details, preferred date, number of guests, and any special requests.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[rgba(30,50,90,0.9)] px-6 py-3 text-sm font-normal text-white transition hover:bg-[rgba(30,50,90,1)] focus:outline-none focus:ring-4 focus:ring-[rgba(30,50,90,0.14)]"
            >
              Contact us for reservations
            </a>
            <p className="mt-4 text-xs leading-relaxed text-[#8b919d]">
              Use the reservation form to share your event date, guest count, and venue requests.
            </p>
          </SectionCard>
        </div>
      </div>
    </section>
  );
}

function EventsSkeleton() {
  return (
    <section id="events" className="w-full bg-[#eaf0e8] px-6 py-16 md:px-10 lg:py-24" aria-labelledby="events-title">
      <div className={sectionContainer}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="h-3 w-32 rounded-md bg-white/50 animate-pulse" />
            <div className="mt-3 h-10 w-4/5 rounded-2xl bg-white/50 animate-pulse" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full rounded-md bg-white/50 animate-pulse" />
              <div className="h-4 w-5/6 rounded-md bg-white/50 animate-pulse" />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-[1.5rem] bg-white/70 p-5 ring-1 ring-black/5 backdrop-blur">
                  <div className="mb-4 h-11 w-11 rounded-full bg-white/70 animate-pulse" />
                  <div className="h-5 w-4/5 rounded-md bg-white/60 animate-pulse" />
                  <div className="mt-2 space-y-2">
                    <div className="h-4 w-full rounded-md bg-white/50 animate-pulse" />
                    <div className="h-4 w-3/4 rounded-md bg-white/50 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] bg-white/80 p-6 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur sm:p-8 flex flex-col justify-center text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-emerald-100 animate-pulse" />
            <div className="h-7 w-4/5 mx-auto rounded-2xl bg-white/60 animate-pulse" />
            <div className="mt-4 space-y-2 mx-auto max-w-xs">
              <div className="h-4 w-full rounded-md bg-white/50 animate-pulse" />
              <div className="h-4 w-5/6 rounded-md bg-white/50 animate-pulse" />
            </div>
            <div className="mt-6 h-10 w-40 mx-auto rounded-full bg-[rgba(30,50,90,0.4)] animate-pulse" />
            <div className="mt-4 h-3 w-48 mx-auto rounded-md bg-white/30 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

function getEventIcon(title: string) {
  switch (title) {
    case 'Birthdays':
      return <PartyPopper className="h-6 w-6" aria-hidden="true" />;
    case 'Family reunions':
      return <Users className="h-6 w-6" aria-hidden="true" />;
    case 'Corporate outings':
      return <CalendarHeart className="h-6 w-6" aria-hidden="true" />;
    case 'Wedding receptions':
      return <Crown className="h-6 w-6" aria-hidden="true" />;
    case 'Pre-wedding photoshoots':
      return <Camera className="h-6 w-6" aria-hidden="true" />;
    default:
      return <PhoneCall className="h-6 w-6" aria-hidden="true" />;
  }
}
