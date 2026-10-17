import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarCheck, MessageCircle, Navigation, Phone } from 'lucide-react';
import { business, telUrl } from '../data/business';
import { track } from '../utils/analytics';

type MobileActionBarProps = {
  onReserve: () => void;
};

const secondary =
  'flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-2 text-[11px] text-[#2d2d2d] transition active:bg-black/5';

// Phones: sticky Call / Message / Reserve bar once the hero is scrolled past.
// Desktop: a floating Messenger bubble (only when a Messenger link is configured).
export default function MobileActionBar({ onReserve }: MobileActionBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            aria-label="Quick actions"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
            className="fixed inset-x-3 bottom-3 z-50 flex items-stretch gap-1 rounded-[1.6rem] bg-white/90 p-1.5 shadow-2xl shadow-black/20 ring-1 ring-black/5 backdrop-blur-xl md:hidden"
            style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
          >
            {telUrl ? (
              <a href={telUrl} onClick={() => track('call_click', { source: 'mobile_bar' })} className={secondary}>
                <Phone className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                Call
              </a>
            ) : (
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('directions_click', { source: 'mobile_bar' })}
                className={secondary}
              >
                <Navigation className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                Directions
              </a>
            )}
            {business.messengerUrl && (
              <a
                href={business.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('messenger_click', { source: 'mobile_bar' })}
                className={secondary}
              >
                <MessageCircle className="h-5 w-5 text-[#0a7cff]" aria-hidden="true" />
                Message
              </a>
            )}
            <button
              type="button"
              onClick={onReserve}
              className="flex flex-[1.6] items-center justify-center gap-2 rounded-2xl bg-[rgba(30,50,90,0.95)] px-4 text-sm text-white transition active:bg-[rgba(30,50,90,1)]"
            >
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Reserve a Table
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {business.messengerUrl && (
        <a
          href={business.messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('messenger_click', { source: 'floating_bubble' })}
          aria-label="Message us on Messenger"
          className="fixed bottom-5 right-5 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#00b2ff] to-[#006aff] text-white shadow-xl shadow-black/20 transition hover:scale-105 md:flex"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </a>
      )}
    </>
  );
}
