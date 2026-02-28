import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Flame, Users, ChevronRight } from "lucide-react";
import type { Meal } from "@/data/meals";
import StartCookingSheet from "./StartCookingSheet";
import CookingMode from "./CookingMode";
import { toast } from "sonner";

type RecipeDetailProps = {
  meal: Meal;
  onBack: () => void;
  onAddToPlanner?: (meal: Meal) => void;
};

const RecipeDetail = ({ meal, onBack, onAddToPlanner }: RecipeDetailProps) => {
  const [showStartSheet, setShowStartSheet] = useState(false);
  const [cookingMode, setCookingMode] = useState<{ servings: number; skipped: string[] } | null>(null);

  if (cookingMode) {
    return <CookingMode meal={meal} servings={cookingMode.servings} skippedIngredients={cookingMode.skipped} onClose={() => { setCookingMode(null); onBack(); }} />;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        <img src={meal.image} alt={meal.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <button onClick={onBack} className="absolute top-6 left-4 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="absolute bottom-4 left-6 right-6">
          <span className="inline-block px-2.5 py-1 bg-card/80 backdrop-blur-sm rounded-full text-xs font-bold text-foreground mb-2">{meal.cuisine}</span>
          <h1 className="text-2xl font-display font-black text-card">{meal.title}</h1>
        </div>
      </div>

      <div className="px-6 pt-6">
        {/* Tags */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {meal.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-mint rounded-full text-xs font-bold text-primary">{tag}</span>
          ))}
          {meal.diet.map((d) => (
            <span key={d} className="px-3 py-1 bg-peach rounded-full text-xs font-bold text-accent">{d}</span>
          ))}
          <span className="px-3 py-1 bg-muted rounded-full text-xs font-bold text-muted-foreground">{meal.difficulty}</span>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-6">
          {[
            { icon: Clock, value: meal.time, label: "Cook time" },
            { icon: Flame, value: meal.calories, label: "Calories" },
            { icon: Users, value: "2", label: "Servings" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex-1 bg-card rounded-2xl p-3 border border-border text-center">
                <Icon className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="font-bold text-foreground text-sm">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Add to planner */}
        {onAddToPlanner && (
          <button onClick={() => { onAddToPlanner(meal); toast.success(`${meal.title} added to planner!`); }}
            className="w-full mb-4 py-3 rounded-2xl bg-mint text-primary font-bold text-sm flex items-center justify-center gap-2 border border-primary/20">
            + Add to Planner
          </button>
        )}

        {/* Ingredients */}
        <h2 className="text-xl font-display font-bold text-foreground mb-3">Ingredients</h2>
        <div className="bg-peach rounded-2xl p-4 mb-6 space-y-2">
          {meal.ingredients.map((ing, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-foreground text-sm font-medium">{ing}</span>
            </div>
          ))}
        </div>

        {/* Steps */}
        <h2 className="text-xl font-display font-bold text-foreground mb-4">Step-by-Step Guide</h2>
        <div className="space-y-4">
          {meal.steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex gap-4">
              <div className="w-8 h-8 min-w-[2rem] gradient-fresh rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">{i + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-foreground font-medium pt-1 text-sm leading-relaxed">{step}</p>
                {meal.tips && meal.tips[i] && (
                  <p className="text-xs text-primary bg-mint rounded-xl px-3 py-2 mt-2">💡 {meal.tips[i]}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={() => setShowStartSheet(true)}
          className="w-full mt-8 gradient-warm text-accent-foreground font-bold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
          Start Cooking <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {showStartSheet && (
        <StartCookingSheet meal={meal} onClose={() => setShowStartSheet(false)}
          onStart={(servings, skipped) => { setShowStartSheet(false); setCookingMode({ servings, skipped }); }} />
      )}
    </div>
  );
};

export default RecipeDetail;
