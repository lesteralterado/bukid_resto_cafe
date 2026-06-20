import { motion } from 'motion/react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { useCallback } from 'react';

export default function Navbar() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-10 w-full relative z-10">
      <div className="flex-1 hidden md:block" />
      <ul className="hidden md:flex items-center gap-8 text-white font-normal text-sm">
        <li>
          <a
            href="#about"
            className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-1 group"
            onClick={(event) => {
              event.preventDefault();
              scrollTo('about');
            }}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#why-visit"
            className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-1 group"
            onClick={(event) => {
              event.preventDefault();
              scrollTo('why-visit');
            }}
          >
            Why Visit <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </li>
        <li>
          <a
            href="#featured-dishes"
            className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-1 group"
            onClick={(event) => {
              event.preventDefault();
              scrollTo('featured-dishes');
            }}
          >
            Featured Dishes
          </a>
        </li>
        <li>
          <a
            href="#events"
            className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-1 group"
            onClick={(event) => {
              event.preventDefault();
              scrollTo('events');
            }}
          >
            Events <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </li>
      </ul>
      <div className="md:hidden">
        <span className="font-regular tracking-tighter text-xl text-white">Bukid</span>
      </div>
      <div className="flex-1 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center bg-[rgba(30,50,90,0.8)] text-white rounded-full pl-2 pr-4 md:pr-6 py-1.5 md:py-2 gap-2 md:gap-3 hover:bg-[rgba(30,50,90,1)] transition-colors group"
        >
          <div className="bg-white/20 p-1 md:p-1.5 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className="text-xs md:text-sm font-normal">Reserve a Table</span>
        </motion.button>
      </div>
    </nav>
  );
}

