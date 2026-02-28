import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ChevronRight, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type OnboardingData = {
  photo: string | null;
  name: string;
  age: number;
  heightCm: number;
  weightKg: number;
  heightUnit: "cm" | "ft";
  weightUnit: "kg" | "lbs";
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
  const [data, setData] = useState<OnboardingData>({
    photo: null, name: "", age: 25, heightCm: 170, weightKg: 70,
    heightUnit: "cm", weightUnit: "kg", diets: [],
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const totalSteps = 5;

  const saveProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("profiles").update({
      name: data.name || null,
      avatar_url: data.photo || null,
      diet_preference: data.diets.join(", ") || null,
      lifestyle: `Age: ${data.age}, Height: ${data.heightCm}cm, Weight: ${data.weightKg}kg`,
    }).eq("user_id", user.id);
    toast.success(`Welcome, ${data.name || "Chef"}! Let's plan your week 🍳`);
    onComplete();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setData((d) => ({ ...d, photo: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const next = () => {
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
          {/* Step 0: Photo */}
          {step === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-36 h-36 rounded-full border-4 border-[#2D6A4F]/20 flex items-center justify-center overflow-hidden mb-6"
                style={{ background: data.photo ? "transparent" : "#2D6A4F10" }}>
                {data.photo ? (
                  <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-[#2D6A4F]/40" />
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              <button onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2D6A4F] text-white font-bold text-sm mb-4">
                <Camera className="w-4 h-4" /> Add your photo
              </button>
              <button onClick={() => { setData((d) => ({ ...d, photo: null })); next(); }}
                className="text-muted-foreground text-sm">Skip for now</button>
            </div>
          )}

          {/* Step 1: Name */}
          {step === 1 && (
            <div className="flex-1 flex flex-col">
              <h1 className="text-3xl font-display font-black text-foreground mb-2">What should we call you?</h1>
              <p className="text-muted-foreground mb-8">This is how MealFlow will greet you each day</p>
              <input
                autoFocus
                value={data.name}
                onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                placeholder="Your name"
                className="w-full p-4 rounded-2xl bg-card border-2 border-border text-foreground text-lg font-medium placeholder:text-muted-foreground focus:border-[#2D6A4F] focus:outline-none transition-colors"
              />
            </div>
          )}

          {/* Step 2: Age */}
          {step === 2 && (
            <div className="flex-1 flex flex-col">
              <h1 className="text-3xl font-display font-black text-foreground mb-2">How old are you?</h1>
              <p className="text-muted-foreground mb-8">Helps us tailor portions and nutrition</p>
              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-6">
                    <button onClick={() => setData((d) => ({ ...d, age: Math.max(13, d.age - 1) }))}
                      className="w-14 h-14 rounded-full bg-card border-2 border-border text-foreground text-2xl font-bold flex items-center justify-center active:scale-95">−</button>
                    <span className="text-6xl font-display font-black text-[#2D6A4F] w-24 text-center">{data.age}</span>
                    <button onClick={() => setData((d) => ({ ...d, age: Math.min(90, d.age + 1) }))}
                      className="w-14 h-14 rounded-full bg-card border-2 border-border text-foreground text-2xl font-bold flex items-center justify-center active:scale-95">+</button>
                  </div>
                  <p className="text-muted-foreground text-sm">years old</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Height & Weight */}
          {step === 3 && (
            <div className="flex-1 flex flex-col">
              <h1 className="text-3xl font-display font-black text-foreground mb-2">Your body stats</h1>
              <p className="text-muted-foreground mb-8">Helps us personalise calorie and portion recommendations</p>
              <div className="space-y-6">
                {/* Height */}
                <div className="bg-card rounded-2xl p-4 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-foreground">Height</span>
                    <div className="flex rounded-full bg-muted overflow-hidden">
                      {(["cm", "ft"] as const).map((u) => (
                        <button key={u} onClick={() => setData((d) => ({ ...d, heightUnit: u }))}
                          className={`px-4 py-1.5 text-xs font-bold transition-all ${data.heightUnit === u ? "bg-[#2D6A4F] text-white" : "text-muted-foreground"}`}>{u}</button>
                      ))}
                    </div>
                  </div>
                  <input type="number" value={data.heightCm}
                    onChange={(e) => setData((d) => ({ ...d, heightCm: Number(e.target.value) }))}
                    className="w-full p-3 rounded-xl bg-background border border-border text-foreground text-lg font-medium text-center focus:border-[#2D6A4F] focus:outline-none"
                  />
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    {data.heightUnit === "cm" ? "centimeters" : `≈ ${Math.floor(data.heightCm / 30.48)}′${Math.round((data.heightCm % 30.48) / 2.54)}″`}
                  </p>
                </div>
                {/* Weight */}
                <div className="bg-card rounded-2xl p-4 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-foreground">Weight</span>
                    <div className="flex rounded-full bg-muted overflow-hidden">
                      {(["kg", "lbs"] as const).map((u) => (
                        <button key={u} onClick={() => setData((d) => ({ ...d, weightUnit: u }))}
                          className={`px-4 py-1.5 text-xs font-bold transition-all ${data.weightUnit === u ? "bg-[#2D6A4F] text-white" : "text-muted-foreground"}`}>{u}</button>
                      ))}
                    </div>
                  </div>
                  <input type="number" value={data.weightKg}
                    onChange={(e) => setData((d) => ({ ...d, weightKg: Number(e.target.value) }))}
                    className="w-full p-3 rounded-xl bg-background border border-border text-foreground text-lg font-medium text-center focus:border-[#2D6A4F] focus:outline-none"
                  />
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    {data.weightUnit === "kg" ? "kilograms" : `≈ ${Math.round(data.weightKg * 2.205)} lbs`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Diet Preferences */}
          {step === 4 && (
            <div className="flex-1 flex flex-col">
              <h1 className="text-3xl font-display font-black text-foreground mb-2">Any dietary preferences?</h1>
              <p className="text-muted-foreground mb-6">Select all that apply</p>
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
      {(step > 0 || data.photo) && (
        <div className="px-6 pb-8 pt-4">
          <button onClick={next}
            className="w-full py-4 rounded-2xl text-lg font-bold shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white"
            style={{ backgroundColor: "#2D6A4F" }}>
            {step === totalSteps - 1 ? "Get Cooking →" : "Continue"}
            {step < totalSteps - 1 && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostSignupOnboarding;
