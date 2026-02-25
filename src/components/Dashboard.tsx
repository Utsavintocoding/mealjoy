import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Sun, Sunrise, Moon } from "lucide-react";
import MealCard from "@/components/MealCard";
import BottomNav from "@/components/BottomNav";
import WeeklyPlanner from "@/components/WeeklyPlanner";
import RecipeDetail from "@/components/RecipeDetail";
import meal1 from "@/assets/meal-1.jpg";
import meal2 from "@/assets/meal-2.jpg";
import meal3 from "@/assets/meal-3.jpg";

const meals = [
  { id: 1, image: meal1, title: "Grilled Chicken & Veggies", time: "25 min", calories: "380 kcal", tags: ["High Protein"] },
  { id: 2, image: meal2, title: "Rainbow Buddha Bowl", time: "15 min", calories: "320 kcal", tags: ["Vegetarian"] },
  { id: 3, image: meal3, title: "Classic Tomato Pasta", time: "20 min", calories: "450 kcal", tags: ["Quick"] },
];

const moodFilters = [
  { label: "All", icon: Sparkles },
  { label: "Breakfast", icon: Sunrise },
  { label: "Lunch", icon: Sun },
  { label: "Dinner", icon: Moon },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [activeMood, setActiveMood] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);

  if (selectedRecipe !== null) {
    const meal = meals.find((m) => m.id === selectedRecipe)!;
    return <RecipeDetail meal={meal} onBack={() => setSelectedRecipe(null)} />;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <AnimatePresence mode="wait">
        {activeTab === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 pt-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-muted-foreground font-medium">Good morning 👋</p>
                <h1 className="text-2xl font-display font-black text-foreground">
                  What's cooking today?
                </h1>
              </div>
              <div className="w-10 h-10 gradient-warm rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">MJ</span>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-card border-2 border-border text-foreground font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                placeholder="Search recipes, ingredients..."
              />
            </div>

            {/* Quick suggestion */}
            <div className="gradient-fresh rounded-2xl p-5 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-primary-foreground font-bold">Today's pick for you!</p>
                <p className="text-primary-foreground/80 text-sm">
                  Based on your mood: Quick & Easy 🚀
                </p>
              </div>
            </div>

            {/* Mood filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
              {moodFilters.map((f) => {
                const Icon = f.icon;
                return (
                  <button
                    key={f.label}
                    onClick={() => setActiveMood(f.label)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                      activeMood === f.label
                        ? "gradient-fresh text-primary-foreground shadow-md"
                        : "bg-card border border-border text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {f.label}
                  </button>
                );
              })}
            </div>

            {/* Meals */}
            <h2 className="text-xl font-display font-bold text-foreground mb-4">
              Daily Suggestions
            </h2>
            <div className="space-y-4">
              {meals.map((meal) => (
                <MealCard
                  key={meal.id}
                  {...meal}
                  onClick={() => setSelectedRecipe(meal.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "planner" && (
          <motion.div
            key="planner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WeeklyPlanner />
          </motion.div>
        )}

        {activeTab === "recipe" && (
          <motion.div
            key="recipe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 pt-8"
          >
            <h1 className="text-2xl font-display font-black text-foreground mb-6">
              All Recipes 🍳
            </h1>
            <div className="space-y-4">
              {meals.map((meal) => (
                <MealCard
                  key={meal.id}
                  {...meal}
                  onClick={() => setSelectedRecipe(meal.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 pt-8"
          >
            <h1 className="text-2xl font-display font-black text-foreground mb-4">Profile</h1>
            <div className="bg-card rounded-3xl p-6 border border-border text-center">
              <div className="w-20 h-20 gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-primary-foreground text-2xl font-bold">MJ</span>
              </div>
              <h2 className="text-xl font-display font-bold text-foreground">MealJoy User</h2>
              <p className="text-muted-foreground text-sm mt-1">Cooking mood: Quick & Easy 🚀</p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { label: "Recipes", value: "12" },
                  { label: "Favorites", value: "5" },
                  { label: "Planned", value: "7" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-mint rounded-2xl p-3">
                    <p className="text-xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

export default Dashboard;
