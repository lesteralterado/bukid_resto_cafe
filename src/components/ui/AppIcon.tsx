import type { Icon } from '@phosphor-icons/react';
import { cn } from '../../utils/cn';

// Frosted-glass icon chip that matches the landing page's glass cards: soft white gradient,
// light ring, inner highlight, and a single emerald accent glyph.
const sizes = {
  sm: { box: 'h-9 w-9 rounded-xl', glyph: 18 },
  md: { box: 'h-11 w-11 rounded-2xl', glyph: 22 },
  lg: { box: 'h-12 w-12 rounded-2xl', glyph: 24 },
};

type AppIconProps = {
  icon: Icon;
  size?: keyof typeof sizes;
  className?: string;
};

export default function AppIcon({ icon: Glyph, size = 'lg', className }: AppIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center text-emerald-700 backdrop-blur-md',
        'bg-gradient-to-b from-white/95 to-emerald-50/60 ring-1 ring-black/5',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_12px_-6px_rgba(30,50,90,0.25)]',
        sizes[size].box,
        className,
      )}
    >
      <Glyph size={sizes[size].glyph} weight="duotone" />
    </span>
  );
}
