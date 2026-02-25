import { useState } from "react";
import { motion } from "framer-motion";
import meal1 from "@/assets/meal-1.jpg";
import meal2 from "@/assets/meal-2.jpg";
import meal3 from "@/assets/meal-3.jpg";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const mealTypes = ["Breakfast", "Lunch", "Dinner"];

const sampleMeals: Record<string, Record<string, { name: string; img: string } | null>> = {
  Mon: { Breakfast: null, Lunch: { name: "Buddha Bowl", img: meal2 }, Dinner: { name: "Pasta", img: meal3 } },
  Tue: { Breakfast: null, Lunch: null, Dinner: { name: "Grilled Chicken", img: meal1 } },
  Wed: { Breakfast: null, Lunch: { name: "Pasta", img: meal3 }, Dinner: null },
  Thu: { Breakfast: null, Lunch: null, Dinner: null },
  Fri: { Breakfast: null, Lunch: { name: "Buddha Bowl", img: meal2 }, Dinner: { name: "Grilled Chicken", img: meal1 } },
  Sat: { Breakfast: null, Lunch: null, Dinner: { name: "Pasta", img: meal3 } },
  Sun: { Breakfast: null, Lunch: null, Dinner: null },
};

const WeeklyPlanner = () => {
  const [selectedDay, setSelectedDay] = useState("Mon");

  return (
    <div className="px-6 pt-8">
      <h1 className="text-2xl font-display font-black text-foreground mb-2">Weekly Planner 📅</h1>
      <p className="text-muted-foreground mb-6">Tap a slot to add a meal</p>

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
          const meal = sampleMeals[selectedDay]?.[type];
          return (
            <motion.div
              key={`${selectedDay}-${type}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border-2 border-dashed p-4 flex items-center gap-4 transition-colors ${
                meal ? "border-primary/30 bg-mint" : "border-border bg-card"
              }`}
            >
              {meal ? (
                <>
                  <img
                    src={meal.img}
                    alt={meal.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-semibold uppercase">{type}</p>
                    <p className="font-bold text-foreground">{meal.name}</p>
                  </div>
                </>
              ) : (
                <div className="flex-1 text-center py-2">
                  <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
                    {type}
                  </p>
                  <p className="text-muted-foreground text-sm">+ Tap to add meal</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyPlanner;
