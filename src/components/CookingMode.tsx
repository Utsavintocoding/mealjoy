import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Pause, PartyPopper, Clock } from "lucide-react";
import type { Meal } from "@/data/meals";

type CookingModeProps = {
  meal: Meal;
  servings: number;
  skippedIngredients: string[];
  onClose: () => void;
};

const CookingMode = ({ meal, servings, onClose }: CookingModeProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [done, setDone] = useState(false);
  const [startTime] = useState(Date.now());

  const totalSteps = meal.steps.length;
  const stepTimeEstimate = Math.max(30, Math.round((meal.durationMin * 60) / totalSteps));

  useEffect(() => {
    setTimeLeft(stepTimeEstimate);
    setTimerRunning(false);
  }, [currentStep, stepTimeEstimate]);

  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const handleDone = () => setDone(true);

  const totalTimeTaken = Math.round((Date.now() - startTime) / 60000);

  if (done) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col items-center justify-center px-6 bg-background text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
          <PartyPopper className="w-20 h-20 text-accent mx-auto mb-4" />
        </motion.div>
        <h1 className="text-3xl font-display font-black text-foreground mb-2">Meal Complete! 🎉</h1>
        <p className="text-xl font-bold text-primary mb-1">{meal.title}</p>
        <p className="text-muted-foreground mb-2">For {servings} serving{servings > 1 ? "s" : ""}</p>
        <p className="text-muted-foreground text-sm mb-8">Total time: {totalTimeTaken} min</p>
        {/* Confetti dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={i} className="absolute w-3 h-3 rounded-full"
            style={{ background: ["#2D6A4F", "#E9C46A", "#E76F51", "#F4A261"][i % 4], left: `${Math.random() * 100}%`, top: `${Math.random() * 60}%` }}
            initial={{ opacity: 0, scale: 0, y: -50 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.5], y: [0, 100 + Math.random() * 200] }}
            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 3 }}
          />
        ))}
        <button onClick={onClose} className="w-full gradient-fresh text-primary-foreground font-bold py-4 rounded-2xl text-lg shadow-lg mb-3">
          Back to App
        </button>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-2 flex items-center justify-between">
        <button onClick={onClose} className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <span className="text-sm font-semibold text-muted-foreground">{meal.title}</span>
        <div className="w-10" />
      </div>

      {/* Progress */}
      <div className="px-6 mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div className="h-full gradient-fresh rounded-full" animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-1 text-right">Step {currentStep + 1} of {totalSteps}</p>
      </div>

      {/* Step content */}
      <div className="flex-1 px-6">
        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="w-16 h-16 gradient-fresh rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground text-2xl font-black">{currentStep + 1}</span>
            </div>
            <p className="text-foreground text-lg font-medium text-center leading-relaxed mb-6">{meal.steps[currentStep]}</p>

            {/* Tip */}
            {meal.tips && meal.tips[currentStep] && (
              <div className="bg-mint rounded-2xl p-4 mb-6">
                <p className="text-sm text-primary font-semibold">💡 Tip: {meal.tips[currentStep]}</p>
              </div>
            )}

            {/* Timer */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                <span>Estimated time for this step</span>
              </div>
              <button onClick={() => setTimerRunning(!timerRunning)}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-card border border-border">
                {timerRunning ? <Pause className="w-5 h-5 text-accent" /> : <Play className="w-5 h-5 text-primary" />}
                <span className="text-2xl font-mono font-bold text-foreground">{formatTime(timeLeft)}</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8 pt-4 flex gap-3">
        <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}
          className="flex-1 py-4 rounded-2xl bg-card border border-border font-bold text-foreground flex items-center justify-center gap-2 disabled:opacity-30">
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>
        {currentStep < totalSteps - 1 ? (
          <button onClick={() => setCurrentStep(currentStep + 1)}
            className="flex-1 py-4 rounded-2xl gradient-fresh text-primary-foreground font-bold flex items-center justify-center gap-2">
            Next Step <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button onClick={handleDone}
            className="flex-1 py-4 rounded-2xl gradient-warm text-accent-foreground font-bold flex items-center justify-center gap-2">
            Done! 🎉
          </button>
        )}
      </div>
    </div>
  );
};

export default CookingMode;
