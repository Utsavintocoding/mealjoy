import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ChefHat } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { allMeals, getMealsByPantry, type Meal } from "@/data/meals";

type Message = { role: "user" | "bot"; text: string; meals?: Meal[] };

const quickReplies = [
  "What can I cook with my pantry?",
  "Suggest a quick dinner",
  "Budget-friendly meals",
  "Vegetarian options",
  "Substitute for eggs?",
  "Make me a grocery list",
];

const substitutions: Record<string, string> = {
  eggs: "Flax eggs (1 tbsp ground flax + 3 tbsp water), mashed banana, or applesauce",
  butter: "Coconut oil, olive oil, or avocado",
  milk: "Oat milk, almond milk, coconut milk, or soy milk",
  cream: "Coconut cream or cashew cream",
  cheese: "Nutritional yeast, cashew cheese, or tofu ricotta",
  flour: "Almond flour, oat flour, or coconut flour",
  "soy sauce": "Coconut aminos or tamari",
  rice: "Quinoa, cauliflower rice, or couscous",
  pasta: "Zucchini noodles, rice noodles, or spaghetti squash",
  chicken: "Tofu, tempeh, chickpeas, or jackfruit",
  beef: "Mushrooms, lentils, or black beans",
  pork: "Chicken, turkey, or tempeh",
  sugar: "Honey, maple syrup, or stevia",
  bread: "Lettuce wraps, rice cakes, or tortillas",
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi there! 👋 I'm your MealJoy assistant. Ask me about recipes, ingredient substitutions, or what you can cook with your pantry!" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const getPantryItems = async (): Promise<string[]> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data } = await supabase.from("pantry_items").select("ingredient_name").eq("user_id", user.id);
    return data?.map((d) => d.ingredient_name) || [];
  };

  const processMessage = async (text: string) => {
    const lower = text.toLowerCase();
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");

    // Pantry-based suggestions
    if (lower.includes("pantry") || lower.includes("what can i cook") || lower.includes("what do i have")) {
      const pantry = await getPantryItems();
      if (pantry.length === 0) {
        setMessages((prev) => [...prev, { role: "bot", text: "Your pantry is empty! Add some ingredients in the Pantry tab first, then I can suggest recipes 🥕" }]);
        return;
      }
      const matches = getMealsByPantry(pantry);
      if (matches.length === 0) {
        setMessages((prev) => [...prev, { role: "bot", text: `I couldn't find great matches with your ${pantry.length} ingredients. Try adding more staples like rice, eggs, or onion!` }]);
      } else {
        setMessages((prev) => [...prev, {
          role: "bot",
          text: `Based on your pantry (${pantry.join(", ")}), here are my top picks:`,
          meals: matches.slice(0, 5),
        }]);
      }
      return;
    }

    // Substitution
    if (lower.includes("substitute") || lower.includes("replacement") || lower.includes("instead of") || lower.includes("alternative")) {
      const found = Object.entries(substitutions).find(([key]) => lower.includes(key));
      if (found) {
        setMessages((prev) => [...prev, { role: "bot", text: `Great alternatives for **${found[0]}**: ${found[1]} 🔄` }]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: "I can help with substitutions! Try asking about specific ingredients like eggs, butter, milk, cheese, chicken, etc." }]);
      }
      return;
    }

    // Grocery list
    if (lower.includes("grocery") || lower.includes("shopping list")) {
      const pantry = await getPantryItems();
      const pantryLower = pantry.map((p) => p.toLowerCase());
      const suggested = allMeals.slice(0, 5);
      const allIngredients = [...new Set(suggested.flatMap((m) => m.ingredients))];
      const needed = allIngredients.filter((ing) => !pantryLower.some((p) => ing.toLowerCase().includes(p)));
      setMessages((prev) => [...prev, {
        role: "bot",
        text: `🛒 **Grocery List** (for 5 popular recipes):\n${needed.map((i) => `• ${i}`).join("\n")}\n\nYou already have: ${pantry.length > 0 ? pantry.join(", ") : "nothing yet"}`,
      }]);
      return;
    }

    // Quick dinner
    if (lower.includes("quick") || lower.includes("fast") || (lower.includes("dinner") && lower.includes("quick"))) {
      const quickMeals = allMeals.filter((m) => m.durationMin <= 15);
      setMessages((prev) => [...prev, {
        role: "bot",
        text: "Here are some quick meals (15 min or less):",
        meals: quickMeals.slice(0, 5),
      }]);
      return;
    }

    // Budget
    if (lower.includes("budget") || lower.includes("cheap") || lower.includes("affordable")) {
      const budgetMeals = allMeals.filter((m) => m.budget === "Budget");
      setMessages((prev) => [...prev, {
        role: "bot",
        text: "Here are budget-friendly options 💰:",
        meals: budgetMeals.slice(0, 5),
      }]);
      return;
    }

    // Vegetarian/Vegan
    if (lower.includes("vegetarian") || lower.includes("vegan") || lower.includes("veggie")) {
      const vegMeals = allMeals.filter((m) => m.diet.includes("Vegetarian") || m.diet.includes("Vegan"));
      setMessages((prev) => [...prev, {
        role: "bot",
        text: "Here are vegetarian/vegan options 🌿:",
        meals: vegMeals.slice(0, 5),
      }]);
      return;
    }

    // Diet-specific
    if (lower.includes("keto")) {
      const ketoMeals = allMeals.filter((m) => m.diet.includes("Keto"));
      setMessages((prev) => [...prev, {
        role: "bot",
        text: "Keto-friendly meals 🥑:",
        meals: ketoMeals.length > 0 ? ketoMeals : allMeals.filter((m) => m.tags.includes("High Protein")).slice(0, 3),
      }]);
      return;
    }

    // Cuisine-specific
    const cuisines = ["indian", "japanese", "mexican", "italian", "thai", "mediterranean", "korean", "american", "chinese", "ethiopian", "vietnamese", "greek", "middle eastern"];
    const matchedCuisine = cuisines.find((c) => lower.includes(c));
    if (matchedCuisine) {
      const meals = allMeals.filter((m) => m.cuisine.toLowerCase() === matchedCuisine);
      setMessages((prev) => [...prev, {
        role: "bot",
        text: `Here are ${matchedCuisine.charAt(0).toUpperCase() + matchedCuisine.slice(1)} dishes 🍽️:`,
        meals: meals.slice(0, 5),
      }]);
      return;
    }

    // Category
    if (lower.includes("breakfast")) {
      setMessages((prev) => [...prev, { role: "bot", text: "Breakfast ideas 🌅:", meals: allMeals.filter((m) => m.category === "Breakfast").slice(0, 5) }]);
      return;
    }
    if (lower.includes("lunch")) {
      setMessages((prev) => [...prev, { role: "bot", text: "Lunch picks 🌞:", meals: allMeals.filter((m) => m.category === "Lunch").slice(0, 5) }]);
      return;
    }
    if (lower.includes("dinner")) {
      setMessages((prev) => [...prev, { role: "bot", text: "Dinner ideas 🌙:", meals: allMeals.filter((m) => m.category === "Dinner").slice(0, 5) }]);
      return;
    }

    // Default
    setMessages((prev) => [...prev, {
      role: "bot",
      text: "I can help with:\n• Recipe suggestions by cuisine, diet, or budget\n• What to cook with your pantry ingredients\n• Ingredient substitutions\n• Grocery list generation\n\nTry one of the quick replies below! 👇",
    }]);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-24 right-4 z-50 w-14 h-14 gradient-warm rounded-full shadow-xl flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6 text-accent-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed inset-x-2 bottom-20 top-12 z-50 bg-card rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden max-w-md mx-auto"
          >
            {/* Header */}
            <div className="gradient-fresh px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-primary-foreground" />
                <span className="text-primary-foreground font-bold">MealJoy Assistant</span>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <X className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                      msg.role === "user"
                        ? "gradient-fresh text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                    {msg.meals && msg.meals.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {msg.meals.map((m) => (
                          <div key={m.id} className="flex items-center gap-2 p-2 bg-card rounded-xl border border-border">
                            <img src={m.image} alt={m.title} className="w-10 h-10 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-foreground text-xs truncate">{m.title}</p>
                              <p className="text-muted-foreground text-[10px]">{m.cuisine} · {m.time} · {m.budget}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick replies */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => processMessage(q)}
                  className="px-3 py-1.5 rounded-full bg-mint text-primary text-xs font-semibold whitespace-nowrap shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && input.trim() && processMessage(input)}
                placeholder="Ask me anything about food..."
                className="flex-1 px-4 py-2.5 rounded-2xl bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
              <button
                onClick={() => input.trim() && processMessage(input)}
                className="w-10 h-10 gradient-fresh rounded-xl flex items-center justify-center"
              >
                <Send className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
