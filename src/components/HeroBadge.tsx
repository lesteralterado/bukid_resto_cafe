import { motion } from 'motion/react';

export default function HeroBadge() {
  return (
    <motion.div
      className="mb-6 inline-flex items-center gap-2 text-white rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-[#5E6470] shadow-sm backdrop-blur-md"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
      Smart liquidity infrastructure
    </motion.div>
  );
}
