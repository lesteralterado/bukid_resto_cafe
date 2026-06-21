import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type NavbarProps = {
  onReserveTable?: () => void;
};

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'why-visit', label: 'Why Visit', hasChevron: true },
  { id: 'featured-dishes', label: 'Featured Dishes' },
  { id: 'events', label: 'Events', hasChevron: true },
];

export default function Navbar({ onReserveTable }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleLinkClick = useCallback(
    (id: string) => {
      setIsMobileMenuOpen(false);
      setTimeout(() => scrollTo(id), 150);
    },
    [scrollTo]
  );

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      hamburgerRef.current?.setAttribute('aria-expanded', 'true');
      setTimeout(() => firstLinkRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      hamburgerRef.current?.setAttribute('aria-expanded', 'false');
      hamburgerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-10 w-full relative z-10">
      <div className="flex-1 hidden md:block" />

      <ul className="hidden md:flex items-center gap-8 text-white font-normal text-sm">
        {NAV_LINKS.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-1 group"
              onClick={(event) => {
                event.preventDefault();
                scrollTo(link.id);
              }}
            >
              {link.label}
              {link.hasChevron && (
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              )}
            </a>
          </li>
        ))}
      </ul>

      <div className="md:hidden">
        <span className="font-regular tracking-tighter text-xl text-white">Bukid</span>
      </div>

      <div className="flex-1 flex justify-end items-center gap-3">
        <motion.button
          ref={hamburgerRef}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(30,50,90,0.8)] text-white hover:bg-[rgba(30,50,90,1)] transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded="false"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReserveTable}
          className="flex items-center bg-[rgba(30,50,90,0.8)] text-white rounded-full pl-2 pr-4 md:pr-6 py-1.5 md:py-2 gap-2 md:gap-3 hover:bg-[rgba(30,50,90,1)] transition-colors group"
        >
          <div className="bg-white/20 p-1 md:p-1.5 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className="text-xs md:text-sm font-normal">Reserve a Table</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="fixed top-24 left-6 right-6 z-50 md:hidden"
            >
              <ul className="flex flex-col items-center gap-6 bg-[rgba(30,50,90,0.95)] backdrop-blur-md rounded-2xl py-8 px-6 text-white font-normal text-lg shadow-2xl">
                {NAV_LINKS.map((link, index) => (
                  <li key={link.id} className="w-full">
                    <a
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={`#${link.id}`}
                      className="cursor-pointer hover:opacity-70 transition-opacity flex items-center justify-center gap-1 group w-full"
                      onClick={(event) => {
                        event.preventDefault();
                        handleLinkClick(link.id);
                      }}
                    >
                      {link.label}
                      {link.hasChevron && (
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
