import { motion } from 'motion/react';
import { ArrowUpRight, Star } from 'lucide-react';
import { business } from '../data/business';

// Social proof in the hero: real Google rating when available, otherwise group capacity.
export default function BottomLeftCard() {
  const rating = business.googleRating;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="absolute bottom-28 right-4 left-auto hidden sm:flex md:left-6 md:right-auto md:bottom-6 lg:bottom-10 lg:left-10 p-3 md:p-4 lg:p-5 rounded-[1.2rem] md:rounded-[1.5rem] lg:rounded-[2.2rem] bg-white/30 backdrop-blur-xl flex-col gap-2 lg:gap-3 min-w-[140px] md:min-w-[150px] lg:min-w-[180px] w-fit"
    >
      {rating ? (
        <div className="flex flex-col">
          <span className="flex items-center gap-1.5 text-2xl md:text-3xl font-normal text-[rgba(30,50,90,0.9)] tracking-tight">
            <Star className="h-5 w-5 fill-[#f5a300] text-[#f5a300]" aria-hidden="true" />
            {rating.rating.toFixed(1)}
          </span>
          <span className="text-[10px] md:text-[12px] font-normal text-[rgba(30,50,90,0.7)] uppercase tracking-wider">
            {rating.count} Google reviews
          </span>
        </div>
      ) : (
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl font-normal text-[rgba(30,50,90,0.9)] tracking-tight">
            Up to {business.maxGuests}
          </span>
          <span className="text-[10px] md:text-[12px] font-normal text-[rgba(30,50,90,0.7)] uppercase tracking-wider">
            Guests for events
          </span>
        </div>
      )}
      <motion.a
        href={rating ? '#reviews' : '#events'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center bg-white rounded-full pl-1.5 pr-5 py-1.5 gap-2 hover:bg-white/90 transition-colors self-start group"
      >
        <span className="bg-[rgba(30,50,90,0.1)] p-1 rounded-full flex items-center justify-center">
          <ArrowUpRight className="w-4 h-4 text-[rgba(30,50,90,0.9)]" aria-hidden="true" />
        </span>
        <span className="text-[14px] font-normal text-[rgba(30,50,90,0.9)]">
          {rating ? 'Read reviews' : 'Plan an event'}
        </span>
      </motion.a>
    </motion.div>
  );
}
