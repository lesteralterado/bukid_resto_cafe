import Navbar from './Navbar';
import HeroBadge from './HeroBadge';
import BottomLeftCard from './BottomLeftCard';
import BottomRightCorner from './BottomRightCorner';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <div className="w-full h-screen flex items-center justify-center p-3 md:p-5 bg-[#f0f0f0]">
      <section className="relative w-full max-w-[1536px] h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-none flex flex-col items-center bg-white/10 group">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0"
          src="https://res.cloudinary.com/dhxi75eld/video/upload/v1781970485/kling_20260620_VIDEO_Cinematic__6060_0_mptyqg.mp4"
        />
        <div className="absolute inset-0 z-[1] bg-black/25" />
        <div className="relative z-10 w-full h-full flex flex-col items-center">
          <Navbar />
          <div className="w-full flex flex-col items-center pt-8 px-6 text-center max-w-4xl">
            <HeroBadge />
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-normal 
              text-[#FFFFFF] 
              mb-2 tracking-tight leading-[1.05]"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Fluid Asset Streams
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-[#FFFFFF] opacity-80 leading-relaxed max-w-xl font-normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Access Smart Vaults, stake RIVR, NFTs, transform rigid holdings into liquid cash instantly.
            </motion.p>
          </div>
          <BottomLeftCard />
          <BottomRightCorner />
        </div>
      </section>
    </div>
  );
}
