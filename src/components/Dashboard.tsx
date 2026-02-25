import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Sun, Sunrise, Moon, Globe } from "lucide-react";
import MealCard from "@/components/MealCard";
import BottomNav from "@/components/BottomNav";
import WeeklyPlanner from "@/components/WeeklyPlanner";
import RecipeDetail from "@/components/RecipeDetail";
import { allMeals, getCuisines, type Meal } from "@/data/meals";

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
  const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);

  const cuisines = getCuisines();

  const filteredMeals = allMeals.filter((m) => {
    const moodMatch = activeMood === "All" || m.category === activeMood;
    const cuisineMatch = activeCuisine === "All" || m.cuisine === activeCuisine;
    return moodMatch && cuisineMatch;
  });

  if (selectedRecipe) {
    return <RecipeDetail meal={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;
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
              <button
                onClick={() => setActiveTab("profile")}
                className="w-10 h-10 gradient-warm rounded-full flex items-center justify-center"
              >
                <span className="text-primary-foreground font-bold text-sm">MJ</span>
              </button>
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
            <button
              onClick={() => {
                const randomMeal = allMeals[Math.floor(Math.random() * allMeals.length)];
                setSelectedRecipe(randomMeal);
              }}
              className="w-full gradient-fresh rounded-2xl p-5 mb-6 flex items-center gap-4 text-left"
            >
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-primary-foreground font-bold">Today's pick for you!</p>
                <p className="text-primary-foreground/80 text-sm">
                  Tap to discover a random recipe 🚀
                </p>
              </div>
            </button>

            {/* Mood filters */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
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

            {/* Cuisine filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveCuisine("All")}
                className={`flex items-center gap-2 px-3 py-2 rounded-full font-semibold text-xs whitespace-nowrap transition-all ${
                  activeCuisine === "All"
                    ? "gradient-warm text-accent-foreground shadow-md"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Globe className="w-3.5 h-3.5" /> All Cuisines
              </button>
              {cuisines.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCuisine(c)}
                  className={`px-3 py-2 rounded-full font-semibold text-xs whitespace-nowrap transition-all ${
                    activeCuisine === c
                      ? "gradient-warm text-accent-foreground shadow-md"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Meals */}
            <h2 className="text-xl font-display font-bold text-foreground mb-4">
              Daily Suggestions ({filteredMeals.length})
            </h2>
            <div className="space-y-4">
              {filteredMeals.map((meal) => (
                <MealCard
                  key={meal.id}
                  {...meal}
                  onClick={() => setSelectedRecipe(meal)}
                />
              ))}
              {filteredMeals.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No recipes found for this filter combo 🤔</p>
              )}
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
            <WeeklyPlanner onSelectRecipe={(meal) => setSelectedRecipe(meal)} />
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
              {allMeals.map((meal) => (
                <MealCard
                  key={meal.id}
                  {...meal}
                  onClick={() => setSelectedRecipe(meal)}
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
            <ProfileSection onLogout={onLogout} />
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

// Inline profile section with edit + logout
import { Edit3, LogOut, Save, X } from "lucide-react";

const ProfileSection = ({ onLogout }: { onLogout?: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("MealJoy User");
  const [mood, setMood] = useState("Quick & Easy 🚀");
  const [editName, setEditName] = useState(name);
  const [editMood, setEditMood] = useState(mood);

  const handleSave = () => {
    setName(editName);
    setMood(editMood);
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-3xl p-6 border border-border text-center">
      <div className="w-20 h-20 gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center">
        <span className="text-primary-foreground text-2xl font-bold">{name.slice(0, 2).toUpperCase()}</span>
      </div>

      {isEditing ? (
        <div className="space-y-3 text-left">
          <input
            className="w-full p-3 rounded-2xl bg-background border-2 border-border text-foreground font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            placeholder="Your Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            className="w-full p-3 rounded-2xl bg-background border-2 border-border text-foreground font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            placeholder="Cooking Mood"
            value={editMood}
            onChange={(e) => setEditMood(e.target.value)}
          />
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 gradient-fresh text-primary-foreground font-bold py-3 rounded-2xl flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-muted text-muted-foreground font-bold py-3 rounded-2xl flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-display font-bold text-foreground">{name}</h2>
          <p className="text-muted-foreground text-sm mt-1">Cooking mood: {mood}</p>
          <button
            onClick={() => {
              setEditName(name);
              setEditMood(mood);
              setIsEditing(true);
            }}
            className="mt-3 px-4 py-2 rounded-full bg-mint text-primary font-semibold text-sm inline-flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        </>
      )}

      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          { label: "Recipes", value: String(allMeals.length) },
          { label: "Favorites", value: "5" },
          { label: "Planned", value: "7" },
        ].map((stat) => (
          <div key={stat.label} className="bg-mint rounded-2xl p-3">
            <p className="text-xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="mt-6 w-full py-3 rounded-2xl bg-destructive/10 text-destructive font-bold flex items-center justify-center gap-2 transition-colors hover:bg-destructive/20"
      >
        <LogOut className="w-4 h-4" /> Log Out
      </button>
    </div>
  );
};

export default Dashboard;
