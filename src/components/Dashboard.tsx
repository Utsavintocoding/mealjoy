import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Sun, Sunrise, Moon, Globe, SlidersHorizontal, Timer, DollarSign, Leaf, Zap } from "lucide-react";
import MealCard from "@/components/MealCard";
import BottomNav from "@/components/BottomNav";
import WeeklyPlanner from "@/components/WeeklyPlanner";
import RecipeDetail from "@/components/RecipeDetail";
import PantryScreen from "@/components/PantryScreen";
import ProfileSection from "@/components/ProfileSection";
import Chatbot from "@/components/Chatbot";
import { allMeals, getCuisines, getDiets, getBudgets, type Meal } from "@/data/meals";
import { Slider } from "@/components/ui/slider";

const moodFilters = [
  { label: "All", icon: Sparkles },
  { label: "Breakfast", icon: Sunrise },
  { label: "Lunch", icon: Sun },
  { label: "Dinner", icon: Moon },
];

const Dashboard = ({ onLogout }: { onLogout?: () => void }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [activeMood, setActiveMood] = useState("All");
  const [activeCuisine, setActiveCuisine] = useState("All");
  const [activeBudget, setActiveBudget] = useState("All");
  const [activeDiet, setActiveDiet] = useState("All");
  const [maxDuration, setMaxDuration] = useState(60);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const cuisines = getCuisines();
  const diets = getDiets();
  const budgets = getBudgets();

  const filteredMeals = allMeals.filter((m) => {
    const moodMatch = activeMood === "All" || m.category === activeMood;
    const cuisineMatch = activeCuisine === "All" || m.cuisine === activeCuisine;
    const budgetMatch = activeBudget === "All" || m.budget === activeBudget;
    const dietMatch = activeDiet === "All" || m.diet.includes(activeDiet);
    const durationMatch = m.durationMin <= maxDuration;
    const searchMatch = !searchQuery || m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));
    return moodMatch && cuisineMatch && budgetMatch && dietMatch && durationMatch && searchMatch;
  });

  if (selectedRecipe) {
    return <RecipeDetail meal={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <AnimatePresence mode="wait">
        {activeTab === "home" && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 pt-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-muted-foreground font-medium">Good morning 👋</p>
                <h1 className="text-2xl font-display font-black text-foreground">What's cooking today?</h1>
              </div>
              <button onClick={() => setActiveTab("profile")} className="w-10 h-10 gradient-warm rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">MJ</span>
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-card border-2 border-border text-foreground font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                placeholder="Search recipes, ingredients..."
              />
            </div>

            {/* Quick Cook + Random */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => {
                  const quickMeals = allMeals.filter((m) => m.durationMin <= 15);
                  if (quickMeals.length > 0) setSelectedRecipe(quickMeals[Math.floor(Math.random() * quickMeals.length)]);
                }}
                className="flex-1 gradient-warm rounded-2xl p-4 flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-accent-foreground font-bold text-sm">What Can I Cook?</p>
                  <p className="text-accent-foreground/80 text-xs">Quick 15-min recipe</p>
                </div>
              </button>
              <button
                onClick={() => {
                  const r = allMeals[Math.floor(Math.random() * allMeals.length)];
                  setSelectedRecipe(r);
                }}
                className="flex-1 gradient-fresh rounded-2xl p-4 flex items-center gap-3 text-left"
              >
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-primary-foreground font-bold text-sm">Today's Pick</p>
                  <p className="text-primary-foreground/80 text-xs">Random recipe 🚀</p>
                </div>
              </button>
            </div>

            {/* Mood filters */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
              {moodFilters.map((f) => {
                const Icon = f.icon;
                return (
                  <button
                    key={f.label}
                    onClick={() => setActiveMood(f.label)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                      activeMood === f.label ? "gradient-fresh text-primary-foreground shadow-md" : "bg-card border border-border text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {f.label}
                  </button>
                );
              })}
            </div>

            {/* Cuisine filters */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
              <button onClick={() => setActiveCuisine("All")} className={`flex items-center gap-2 px-3 py-2 rounded-full font-semibold text-xs whitespace-nowrap transition-all ${activeCuisine === "All" ? "gradient-warm text-accent-foreground shadow-md" : "bg-muted text-muted-foreground"}`}>
                <Globe className="w-3.5 h-3.5" /> All Cuisines
              </button>
              {cuisines.map((c) => (
                <button key={c} onClick={() => setActiveCuisine(c)} className={`px-3 py-2 rounded-full font-semibold text-xs whitespace-nowrap transition-all ${activeCuisine === c ? "gradient-warm text-accent-foreground shadow-md" : "bg-muted text-muted-foreground"}`}>
                  {c}
                </button>
              ))}
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-3 transition-all ${showFilters ? "gradient-fresh text-primary-foreground" : "bg-card border border-border text-foreground"}`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters {(activeBudget !== "All" || activeDiet !== "All" || maxDuration < 60) && "•"}
            </button>

            {/* Expanded filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
                  <div className="bg-card rounded-2xl p-4 border border-border space-y-4">
                    {/* Duration slider */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Timer className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">Max cooking time: {maxDuration} min</span>
                      </div>
                      <Slider value={[maxDuration]} onValueChange={(v) => setMaxDuration(v[0])} min={10} max={60} step={5} />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>10 min</span><span>60 min</span>
                      </div>
                    </div>

                    {/* Budget filter */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">Budget</span>
                      </div>
                      <div className="flex gap-2">
                        {["All", ...budgets].map((b) => (
                          <button key={b} onClick={() => setActiveBudget(b)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activeBudget === b ? "gradient-fresh text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Diet filter */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">Diet</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {["All", ...diets].map((d) => (
                          <button key={d} onClick={() => setActiveDiet(d)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activeDiet === d ? "gradient-fresh text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Meals */}
            <h2 className="text-xl font-display font-bold text-foreground mb-4">Daily Suggestions ({filteredMeals.length})</h2>
            <div className="space-y-4">
              {filteredMeals.map((meal) => (
                <MealCard key={meal.id} {...meal} onClick={() => setSelectedRecipe(meal)} />
              ))}
              {filteredMeals.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No recipes found for this filter combo 🤔</p>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "planner" && (
          <motion.div key="planner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WeeklyPlanner onSelectRecipe={(meal) => setSelectedRecipe(meal)} />
          </motion.div>
        )}

        {activeTab === "pantry" && (
          <motion.div key="pantry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PantryScreen />
          </motion.div>
        )}

        {activeTab === "recipe" && (
          <motion.div key="recipe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 pt-8">
            <h1 className="text-2xl font-display font-black text-foreground mb-6">All Recipes 🍳</h1>
            <div className="space-y-4">
              {allMeals.map((meal) => (
                <MealCard key={meal.id} {...meal} onClick={() => setSelectedRecipe(meal)} />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "profile" && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 pt-8">
            <h1 className="text-2xl font-display font-black text-foreground mb-4">Profile</h1>
            <ProfileSection onLogout={onLogout} />
          </motion.div>
        )}
      </AnimatePresence>

      <Chatbot />
      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

export default Dashboard;
