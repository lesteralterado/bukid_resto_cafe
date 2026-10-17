import { useState } from 'react';
import { cn } from '../../utils/cn';
import { blurPlaceholder, imageSrcSet, sizedImage } from '../../utils/cloudinary';

type SmartImageProps = {
  src: string;
  alt: string;
  aspect?: string;
  width?: number;
  widths?: number[];
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

// Right-sized, lazy image with a blurred preview and no layout shift.
export default function SmartImage({
  src,
  alt,
  aspect = '4:3',
  width = 640,
  widths = [320, 480, 640, 960],
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
  className,
  imgClassName,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [w, h] = aspect.split(':').map(Number);
  const blur = blurPlaceholder(src, aspect);

  return (
    <div
      className={cn('relative overflow-hidden bg-[#e7ebe4]', className)}
      style={{
        aspectRatio: `${w} / ${h}`,
        backgroundImage: blur && !loaded ? `url(${blur})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!loaded && !failed && <div className="absolute inset-0 animate-pulse bg-white/20" />}
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-100 to-amber-100 px-4 text-center text-sm text-[#5e6470]">
          {alt}
        </div>
      ) : (
        <img
          src={sizedImage(src, { width, aspect })}
          srcSet={imageSrcSet(src, widths, aspect)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={Math.round((width * h) / w)}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
