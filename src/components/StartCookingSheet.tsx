import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import type { Meal } from "@/data/meals";

type Props = {
  meal: Meal;
  onStart: (servings: number, skipped: string[]) => void;
  onClose: () => void;
};

const StartCookingSheet = ({ meal, onStart, onClose }: Props) => {
  const [servings, setServings] = useState(1);
  const [skipped, setSkipped] = useState<string[]>([]);

  const toggleSkip = (ing: string) => {
    setSkipped((prev) => prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-foreground/50 z-50 flex items-end" onClick={onClose}>
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md mx-auto bg-card rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-4" />
        <h3 className="text-xl font-display font-bold text-foreground mb-1">Let's get cooking! 🍳</h3>
        <p className="text-sm text-muted-foreground mb-6">{meal.title}</p>

        {/* Servings */}
        <div className="mb-6">
          <p className="font-semibold text-foreground mb-3">How many people are you cooking for?</p>
          <div className="flex items-center justify-center gap-6">
            <button onClick={() => setServings(Math.max(1, servings - 1))}
              className="w-12 h-12 rounded-full bg-muted flex items-center justify-center active:scale-95">
              <Minus className="w-5 h-5 text-foreground" />
            </button>
            <span className="text-4xl font-display font-black text-primary">{servings}</span>
            <button onClick={() => setServings(Math.min(10, servings + 1))}
              className="w-12 h-12 rounded-full bg-muted flex items-center justify-center active:scale-95">
              <Plus className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Skip ingredients */}
        <div className="mb-6">
          <p className="font-semibold text-foreground mb-3">Any ingredients to skip? <span className="text-muted-foreground font-normal text-sm">(optional)</span></p>
          <div className="flex flex-wrap gap-2">
            {meal.ingredients.map((ing) => (
              <button key={ing} onClick={() => toggleSkip(ing)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  skipped.includes(ing) ? "bg-destructive/10 text-destructive line-through" : "bg-muted text-foreground"
                }`}>
                {ing}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => onStart(servings, skipped)}
          className="w-full gradient-fresh text-primary-foreground font-bold py-4 rounded-2xl text-lg shadow-lg active:scale-[0.98] transition-all">
          Let's Cook! 🚀
        </button>
      </motion.div>
    </motion.div>
  );
};

export default StartCookingSheet;
