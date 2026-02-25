import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { allMeals, getMealsByCategory, type Meal } from "@/data/meals";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const mealTypes: Array<"Breakfast" | "Lunch" | "Dinner"> = ["Breakfast", "Lunch", "Dinner"];

const WeeklyPlanner = ({ onSelectRecipe }: { onSelectRecipe: (meal: Meal) => void }) => {
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [plannedMeals, setPlannedMeals] = useState<Record<string, Record<string, Meal | null>>>(() => {
    const init: Record<string, Record<string, Meal | null>> = {};
    days.forEach((d) => {
      init[d] = { Breakfast: null, Lunch: null, Dinner: null };
    });
    // Pre-fill some slots
    init["Mon"]["Lunch"] = allMeals[10]; // Buddha Bowl
    init["Mon"]["Dinner"] = allMeals[8]; // Pad Thai
    init["Fri"]["Dinner"] = allMeals[0]; // Butter Chicken
    return init;
  });
  const [pickerOpen, setPickerOpen] = useState<{ day: string; type: string } | null>(null);

  const handlePickMeal = (meal: Meal) => {
    if (!pickerOpen) return;
    setPlannedMeals((prev) => ({
      ...prev,
      [pickerOpen.day]: { ...prev[pickerOpen.day], [pickerOpen.type]: meal },
    }));
    setPickerOpen(null);
  };

  const handleClearSlot = (day: string, type: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlannedMeals((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: null },
    }));
  };

  const pickerMeals = pickerOpen ? getMealsByCategory(pickerOpen.type) : [];

  return (
    <div className="px-6 pt-8">
      <h1 className="text-2xl font-display font-black text-foreground mb-2">Weekly Planner 📅</h1>
      <p className="text-muted-foreground mb-6">Tap a slot to add or change a meal</p>

      {/* Day selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-3 rounded-2xl font-bold text-sm min-w-[52px] transition-all ${
              selectedDay === day
                ? "gradient-fresh text-primary-foreground shadow-md"
                : "bg-card border border-border text-foreground"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Meal slots */}
      <div className="space-y-4">
        {mealTypes.map((type) => {
          const meal = plannedMeals[selectedDay]?.[type];
          return (
            <motion.button
              key={`${selectedDay}-${type}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => meal ? onSelectRecipe(meal) : setPickerOpen({ day: selectedDay, type })}
              className={`w-full rounded-2xl border-2 border-dashed p-4 flex items-center gap-4 transition-colors text-left ${
                meal ? "border-primary/30 bg-mint" : "border-border bg-card"
              }`}
            >
              {meal ? (
                <>
                  <img
                    src={meal.image}
                    alt={meal.title}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-semibold uppercase">{type}</p>
                    <p className="font-bold text-foreground">{meal.title}</p>
                    <p className="text-xs text-muted-foreground">{meal.cuisine} · {meal.time}</p>
                  </div>
                  <button
                    onClick={(e) => handleClearSlot(selectedDay, type, e)}
                    className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </>
              ) : (
                <div className="flex-1 text-center py-2">
                  <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
                    {type}
                  </p>
                  <p className="text-muted-foreground text-sm">+ Tap to add meal</p>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Meal Picker Modal */}
      <AnimatePresence>
        {pickerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-50 flex items-end"
            onClick={() => setPickerOpen(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md mx-auto bg-card rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-display font-bold text-foreground mb-1">
                Pick a {pickerOpen.type} meal
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {pickerMeals.length} {pickerOpen.type.toLowerCase()} options
              </p>
              <div className="space-y-3">
                {pickerMeals.map((meal) => (
                  <button
                    key={meal.id}
                    onClick={() => handlePickMeal(meal)}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl bg-background border border-border text-left transition-colors hover:border-primary"
                  >
                    <img src={meal.image} alt={meal.title} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-bold text-foreground text-sm">{meal.title}</p>
                      <p className="text-xs text-muted-foreground">{meal.cuisine} · {meal.time} · {meal.calories}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeeklyPlanner;
