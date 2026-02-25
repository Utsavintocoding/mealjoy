import { motion } from "framer-motion";
import { ArrowLeft, Clock, Flame, Users, ChevronRight } from "lucide-react";

type RecipeDetailProps = {
  meal: { image: string; title: string; time: string; calories: string };
  onBack: () => void;
};

const steps = [
  "Prep all vegetables — wash, peel, and chop into bite-sized pieces.",
  "Heat oil in a pan over medium-high heat until shimmering.",
  "Cook the protein for 5-6 minutes, turning once halfway through.",
  "Add vegetables and cook for 3-4 minutes until tender-crisp.",
  "Season with salt, pepper, and your favorite spices to taste.",
  "Plate up and garnish with fresh herbs. Enjoy! 🎉",
];

const ingredients = [
  "2 chicken breasts (or tofu)",
  "1 cup mixed vegetables",
  "2 tbsp olive oil",
  "1 clove garlic, minced",
  "Salt & pepper to taste",
  "Fresh herbs for garnish",
];

const RecipeDetail = ({ meal, onBack }: RecipeDetailProps) => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        <img src={meal.image} alt={meal.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-6 left-4 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="absolute bottom-4 left-6 right-6">
          <h1 className="text-2xl font-display font-black text-card">{meal.title}</h1>
        </div>
      </div>

      <div className="px-6 pt-6">
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

        {/* Ingredients */}
        <h2 className="text-xl font-display font-bold text-foreground mb-3">Ingredients</h2>
        <div className="bg-peach rounded-2xl p-4 mb-6 space-y-2">
          {ingredients.map((ing, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-foreground text-sm font-medium">{ing}</span>
            </div>
          ))}
        </div>

        {/* Steps */}
        <h2 className="text-xl font-display font-bold text-foreground mb-4">
          Step-by-Step Guide
        </h2>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 min-w-[2rem] gradient-fresh rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">{i + 1}</span>
              </div>
              <p className="text-foreground font-medium pt-1 text-sm leading-relaxed">{step}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <button className="w-full mt-8 gradient-warm text-accent-foreground font-bold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
          Start Cooking <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
