import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import splashBowl from "@/assets/splash-bowl.jpg";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gradient-splash overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="w-40 h-40 rounded-full overflow-hidden shadow-2xl mb-8 border-4 border-card"
      >
        <img src={splashBowl} alt="Fresh bowl" className="w-full h-full object-cover" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-5xl font-display font-black text-primary-foreground tracking-tight"
      >
        MealJoy
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-primary-foreground/80 text-lg font-medium mt-2"
      >
        Your daily cooking companion ✨
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
        className="mt-10 h-1 w-32 rounded-full bg-primary-foreground/40 origin-left"
      />
    </motion.div>
  );
};

export default SplashScreen;
