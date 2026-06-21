import { cn } from "../../utils/cn";

type SkeletonProps = {
  className?: string;
};

function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse bg-white/50 ring-1 ring-black/5", className)} />
  );
}

function HeroSkeleton() {
  return (
    <div className="w-full h-screen flex items-center justify-center p-3 md:p-5 bg-[#f0f0f0]">
      <section className="relative w-full max-w-[1536px] h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden flex flex-col items-center bg-white/10">
        <Skeleton className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 w-full h-full flex flex-col items-center pt-8 px-6 text-center max-w-4xl">
          <div className="mt-8 w-20 h-10 rounded-full bg-white/60 animate-pulse" />
          <Skeleton className="mt-8 w-4/5 h-12 md:h-16 rounded-2xl" />
          <Skeleton className="mt-4 w-3/5 h-6 md:h-7 rounded-2xl" />
        </div>
        <div className="absolute bottom-28 right-4 left-auto md:left-6 md:right-auto md:bottom-6 lg:bottom-10 lg:left-10 p-3 md:p-4 lg:p-5 rounded-[1.2rem] md:rounded-[1.5rem] lg:rounded-[2.2rem] bg-white/30 backdrop-blur-xl flex flex-col gap-2 lg:gap-3 min-w-[140px] md:min-w-[150px] lg:min-w-[180px] w-fit">
          <Skeleton className="w-16 h-6 rounded-md" />
          <Skeleton className="w-24 h-8 rounded-full" />
        </div>
        <div className="absolute bottom-0 right-0 p-3 pt-5 pl-8 sm:p-4 sm:pt-6 sm:pl-10 md:p-6 md:pt-8 md:pl-14 bg-[#f0f0f0] rounded-tl-[1.5rem] sm:rounded-tl-[2rem] md:rounded-tl-[3.5rem] flex items-center gap-3 sm:gap-4 md:gap-6">
          <Skeleton className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[rgba(30,50,90,0.05)]" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-32 h-4 rounded-md" />
            <Skeleton className="w-20 h-3 rounded-md" />
          </div>
        </div>
      </section>
    </div>
  );
}

type GridSkeletonProps = {
  count?: number;
  className?: string;
  cardClassName?: string;
};

function GridSkeleton({
  count = 12,
  className = "gap-6 sm:grid-cols-2 lg:grid-cols-4",
  cardClassName = "overflow-hidden rounded-[2rem] bg-white/80 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur",
}: GridSkeletonProps) {
  return (
    <div className={cn("mt-10 grid", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn("flex flex-col gap-4 p-5", cardClassName)}>
          <Skeleton className="h-48 w-full rounded-[1.5rem]" />
          <Skeleton className="h-5 w-4/5 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/5 rounded-md" />
        </div>
      ))}
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="rounded-[2rem] bg-white/85 p-5 shadow-lg shadow-black/5 ring-1 ring-black/5 backdrop-blur sm:p-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-10 w-full rounded-2xl" />
          </div>
        ))}
        <div className="md:col-span-2 flex flex-col gap-2">
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </div>
      <Skeleton className="mt-6 h-10 w-full rounded-full" />
    </div>
  );
}

function MapSkeleton() {
  return (
    <div className="rounded-[2rem] bg-white/70 p-3 shadow-sm ring-1 ring-black/5 backdrop-blur sm:p-4">
      <Skeleton className="h-[320px] w-full rounded-[1.5rem] md:h-[420px]" />
    </div>
  );
}

function FooterSkeleton() {
  return (
    <footer className="w-full bg-[#2d2d2d] px-6 py-10 text-white md:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-3 w-32 rounded-md bg-white/60" />
          <Skeleton className="h-6 w-48 rounded-md bg-white/30" />
          <Skeleton className="h-4 w-64 rounded-md bg-white/20" />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-3 w-16 rounded-md bg-white/60" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-4 w-24 rounded-md bg-white/30" />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-3 w-16 rounded-md bg-white/60" />
          <Skeleton className="h-4 w-40 rounded-md bg-white/30" />
          <Skeleton className="h-4 w-32 rounded-md bg-white/30" />
          <Skeleton className="h-4 w-36 rounded-md bg-white/30" />
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-4 w-48 rounded-md bg-white/20" />
        <Skeleton className="h-4 w-40 rounded-md bg-white/20" />
      </div>
    </footer>
  );
}

export {
  Skeleton,
  HeroSkeleton,
  GridSkeleton,
  FormSkeleton,
  MapSkeleton,
  FooterSkeleton,
};
