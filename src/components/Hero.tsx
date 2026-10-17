import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Navbar from './Navbar';
import HeroBadge from './HeroBadge';
import BottomLeftCard from './BottomLeftCard';
import BottomRightCorner from './BottomRightCorner';
import { videoPoster, videoSource } from '../utils/cloudinary';
import type { ReserveSource } from '../App';

type HeroProps = {
  onReserveTable: (source: ReserveSource) => void;
};

const HERO_VIDEO =
  'https://res.cloudinary.com/dhxi75eld/video/upload/v1781970485/kling_20260620_VIDEO_Cinematic__6060_0_mptyqg.mp4';

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

// The poster is always shown first (fast LCP). The video only loads after the page has finished
// loading, and never on data-saver, 2G, or reduced-motion devices.
function shouldPlayVideo() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function HeroMedia() {
  const [videoWidth, setVideoWidth] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!shouldPlayVideo()) return;
    const start = () => setVideoWidth(window.matchMedia('(min-width: 768px)').matches ? 1280 : 720);
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, []);

  return (
    <>
      <img
        src={videoPoster(HERO_VIDEO, 1280)}
        srcSet={`${videoPoster(HERO_VIDEO, 720)} 720w, ${videoPoster(HERO_VIDEO, 1280)} 1280w, ${videoPoster(HERO_VIDEO, 1920)} 1920w`}
        sizes="100vw"
        alt="Bukid Resto Cafe at sunset, surrounded by trees and string lights"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 z-0 h-full w-full object-cover object-[65%] lg:object-center"
      />
      {videoWidth && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 z-0 h-full w-full object-cover object-[65%] transition-opacity duration-700 lg:object-center ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={videoSource(HERO_VIDEO, videoWidth, 'vp9')} type="video/webm" />
          <source src={videoSource(HERO_VIDEO, videoWidth, 'h264')} type="video/mp4" />
        </video>
      )}
    </>
  );
}

export default function Hero({ onReserveTable }: HeroProps) {
  return (
    <div className="w-full h-[100svh] min-h-[600px] flex items-center justify-center p-3 md:p-5 bg-[#f0f0f0]">
      <section className="relative w-full h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-none flex flex-col items-center bg-[#3a4a3a] group">
        <HeroMedia />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/45 via-black/25 to-black/40 md:from-black/35 md:via-black/20" />
        <div className="relative z-10 w-full h-full flex flex-col items-center">
          <Navbar onReserveTable={() => onReserveTable('navbar')} />
          <div className="w-full flex flex-col items-center pt-4 md:pt-8 px-6 text-center max-w-4xl">
            <HeroBadge />
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-normal
              text-[#FFFFFF]
              mb-3 tracking-tight leading-[1.05]"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A peaceful dining escape in the heart of nature
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-[#FFFFFF] opacity-90 leading-relaxed max-w-xl font-normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Fresh Filipino favorites, signature coffee, and a mountain view to slow down with. Perfect for family days, dates, and celebrations.
            </motion.p>
            <motion.div
              className="mt-6 flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <button
                type="button"
                onClick={() => onReserveTable('hero')}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[rgba(30,50,90,0.95)] shadow-lg shadow-black/10 transition hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-white/40"
              >
                Reserve a Table
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href="#featured-dishes"
                className="inline-flex items-center rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-normal text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                View Menu
              </a>
            </motion.div>
          </div>
          <BottomLeftCard />
          <BottomRightCorner />
        </div>
      </section>
    </div>
  );
}
