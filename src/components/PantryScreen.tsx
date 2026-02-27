import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Search, ShoppingBasket } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PantryScreen = () => {
  const [items, setItems] = useState<{ id: string; ingredient_name: string }[]>([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("pantry_items")
      .select("id, ingredient_name")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (!error && data) setItems(data);
    setLoading(false);
  };

  const addItem = async () => {
    const trimmed = newItem.trim();
    if (!trimmed) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("pantry_items")
      .insert({ user_id: user.id, ingredient_name: trimmed })
      .select("id, ingredient_name")
      .single();
    if (error) {
      toast.error("Failed to add item");
      return;
    }
    if (data) setItems((prev) => [data, ...prev]);
    setNewItem("");
  };

  const removeItem = async (id: string) => {
    await supabase.from("pantry_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const filtered = items.filter((i) =>
    i.ingredient_name.toLowerCase().includes(search.toLowerCase())
  );

  const commonIngredients = [
    "Rice", "Eggs", "Chicken", "Onion", "Garlic", "Tomato", "Potato",
    "Butter", "Milk", "Cheese", "Bread", "Pasta", "Olive Oil", "Salt",
    "Pepper", "Flour", "Sugar", "Soy Sauce", "Coconut Milk", "Lemon",
    "Avocado", "Bell Pepper", "Mushrooms", "Tofu", "Beans",
  ];

  const suggestedIngredients = commonIngredients.filter(
    (c) => !items.some((i) => i.ingredient_name.toLowerCase() === c.toLowerCase())
  );

  return (
    <div className="px-6 pt-8 pb-4">
      <div className="flex items-center gap-3 mb-2">
        <ShoppingBasket className="w-7 h-7 text-primary" />
        <h1 className="text-2xl font-display font-black text-foreground">My Pantry</h1>
      </div>
      <p className="text-muted-foreground text-sm mb-6">Add what you have — the chatbot will suggest recipes!</p>

      {/* Add item */}
      <div className="flex gap-2 mb-4">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add ingredient..."
          className="flex-1 px-4 py-3 rounded-2xl bg-card border-2 border-border text-foreground font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
        />
        <button
          onClick={addItem}
          className="w-12 h-12 gradient-fresh rounded-2xl flex items-center justify-center shadow-md"
        >
          <Plus className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      {/* Quick add suggestions */}
      {suggestedIngredients.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground font-semibold mb-2">Quick add:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedIngredients.slice(0, 12).map((s) => (
              <button
                key={s}
                onClick={async () => {
                  setNewItem(s);
                  const { data: { user } } = await supabase.auth.getUser();
                  if (!user) return;
                  const { data, error } = await supabase
                    .from("pantry_items")
                    .insert({ user_id: user.id, ingredient_name: s })
                    .select("id, ingredient_name")
                    .single();
                  if (!error && data) setItems((prev) => [data, ...prev]);
                  setNewItem("");
                }}
                className="px-3 py-1.5 rounded-full bg-mint text-primary text-xs font-semibold transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      {items.length > 5 && (
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pantry..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      )}

      {/* Items list */}
      <div className="space-y-2">
        <AnimatePresence>
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between px-4 py-3 bg-card rounded-2xl border border-border"
            >
              <span className="font-medium text-foreground">{item.ingredient_name}</span>
              <button
                onClick={() => removeItem(item.id)}
                className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5 text-destructive" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {!loading && items.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            Your pantry is empty! Add some ingredients above 🥕
          </p>
        )}
      </div>

      <div className="mt-4 p-4 bg-mint rounded-2xl">
        <p className="text-sm font-semibold text-primary">
          💡 {items.length} ingredient{items.length !== 1 ? "s" : ""} in pantry
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Use the chatbot to find recipes with what you have!
        </p>
      </div>
    </div>
  );
};

export default PantryScreen;
