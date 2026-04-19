import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type OnboardingData = {
  name: string;
  diets: string[];
};

const dietOptions = [
  { label: "No Restriction", emoji: "🍽️", desc: "I eat everything" },
  { label: "Vegetarian", emoji: "🥬", desc: "No meat or fish" },
  { label: "Vegan", emoji: "🌱", desc: "No animal products" },
  { label: "Gluten-Free", emoji: "🌾", desc: "No wheat or gluten" },
  { label: "Keto", emoji: "🥑", desc: "Low-carb, high-fat" },
  { label: "High Protein", emoji: "💪", desc: "Protein-focused meals" },
];

const PostSignupOnboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({ name: "", diets: [] });
  const totalSteps = 2;

  const saveProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("profiles").update({
      name: data.name || "Chef",
      diet_preference: data.diets.join(", ") || null,
    }).eq("user_id", user.id);
    toast.success(`Welcome, ${data.name || "Chef"}! Let's plan your week 🍳`);
    onComplete();
  };

  const next = () => {
    if (step === 0 && !data.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (step < totalSteps - 1) setStep(step + 1);
    else saveProfile();
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF7F2" }}>
      {/* Progress */}
      <div className="px-6 pt-6">
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? "bg-[#2D6A4F]" : "bg-[#2D6A4F]/20"}`} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-right">Step {step + 1} of {totalSteps}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col px-6 pt-8"
        >
          {/* Step 0: Name */}
          {step === 0 && (
            <div className="flex-1 flex flex-col">
              <h1 className="text-3xl font-display font-black text-foreground mb-2">What should we call you?</h1>
              <p className="text-muted-foreground mb-8">This is how MealJoy will greet you each day</p>
              <input
                autoFocus
                value={data.name}
                onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && next()}
                placeholder="Your name"
                className="w-full p-4 rounded-2xl bg-card border-2 border-border text-foreground text-lg font-medium placeholder:text-muted-foreground focus:border-[#2D6A4F] focus:outline-none transition-colors"
              />
            </div>
          )}

          {/* Step 1: Diet Preferences */}
          {step === 1 && (
            <div className="flex-1 flex flex-col">
              <h1 className="text-3xl font-display font-black text-foreground mb-2">Any dietary preferences?</h1>
              <p className="text-muted-foreground mb-6">Select all that apply (optional)</p>
              <div className="grid grid-cols-2 gap-3">
                {dietOptions.map((d) => {
                  const selected = data.diets.includes(d.label);
                  return (
                    <button key={d.label}
                      onClick={() => setData((prev) => ({
                        ...prev,
                        diets: selected ? prev.diets.filter((x) => x !== d.label) : [...prev.diets, d.label],
                      }))}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${selected ? "border-[#2D6A4F] bg-[#2D6A4F]/10" : "border-border bg-card"}`}>
                      <span className="text-2xl">{d.emoji}</span>
                      <p className="font-bold text-foreground text-sm mt-1">{d.label}</p>
                      <p className="text-muted-foreground text-xs">{d.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <div className="px-6 pb-8 pt-4">
        <button onClick={next}
          className="w-full py-4 rounded-2xl text-lg font-bold shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white"
          style={{ backgroundColor: "#2D6A4F" }}>
          {step === totalSteps - 1 ? "Get Cooking →" : "Continue"}
          {step < totalSteps - 1 && <ChevronRight className="w-5 h-5" />}
        </button>
        {step === 1 && (
          <button onClick={saveProfile} className="w-full text-center text-muted-foreground text-sm mt-3">
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
};

export default PostSignupOnboarding;
