import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";

type PreloaderProps = {
  onComplete: () => void;
};

function Preloader({ onComplete }: PreloaderProps) {
  const [skip, setSkip] = useState(false);

  const handleSkip = useCallback(() => {
    setSkip(true);
  }, []);

  useEffect(() => {
    if (!skip) return;
    const timer = setTimeout(() => {
      onComplete();
    }, 500);
    return () => clearTimeout(timer);
  }, [skip, onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSkip();
    }, 2000);

    return () => clearTimeout(timer);
  }, [handleSkip]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleSkip]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: skip ? 0 : 1, y: skip ? "-100%" : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2d2d2d] cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label="Skip preloader"
      onClick={handleSkip}
      onTouchStart={handleSkip}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-emerald-200"
        >
          <img src="/favicon2.svg" alt="Bukid Resto Cafe" className="h-10 w-10" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-normal tracking-tight text-white md:text-3xl">
            Bukid Resto Cafe
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Nature, food, and unforgettable views
          </p>
        </div>
        <p className="text-xs text-white/50">
          tap or press any key to continue
        </p>
      </div>
    </motion.div>
  );
}

export default Preloader;
