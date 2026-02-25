import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Utensils, Leaf, Flame, Zap, Coffee, Sparkles } from "lucide-react";
import onboardingImg from "@/assets/onboarding-cooking.jpg";

type OnboardingData = {
  lifestyle: string;
  diet: string;
  mood: string;
};

const OnboardingFlow = ({ onComplete }: { onComplete: (data: OnboardingData) => void }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({ lifestyle: "", diet: "", mood: "" });

  const steps = [
    {
      title: "Welcome to MealJoy! 🎉",
      subtitle: "Let's personalize your experience",
      isIntro: true,
    },
    {
      title: "Tell us about you",
      subtitle: "This helps us tailor your meals",
      key: "lifestyle" as const,
      options: [
        { label: "Student", icon: Coffee, desc: "Quick & budget-friendly meals" },
        { label: "Working Adult", icon: Utensils, desc: "Balanced & time-efficient" },
      ],
    },
    {
      title: "What's your diet?",
      subtitle: "We'll suggest meals that match",
      key: "diet" as const,
      options: [
        { label: "Vegetarian", icon: Leaf, desc: "Plant-powered goodness" },
        { label: "Keto", icon: Flame, desc: "Low-carb, high-fat" },
        { label: "Omnivore", icon: Utensils, desc: "A bit of everything" },
      ],
    },
    {
      title: "Your cooking mood?",
      subtitle: "How do you like to cook?",
      key: "mood" as const,
      options: [
        { label: "Relaxed", icon: Coffee, desc: "Take your time, enjoy it" },
        { label: "Adventurous", icon: Sparkles, desc: "Try new things!" },
        { label: "Quick & Easy", icon: Zap, desc: "In and out, done!" },
      ],
    },
  ];

  const currentStep = steps[step];

  const handleSelect = (value: string) => {
    if (currentStep.isIntro) return;
    const key = currentStep.key!;
    setData((prev) => ({ ...prev, [key]: value }));
    if (step < steps.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      onComplete({ ...data, [key]: value });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="px-6 pt-6">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? "gradient-fresh" : "bg-muted"
              }`}
            />
          ))}
        </div>
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
          {currentStep.isIntro ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-64 h-64 rounded-3xl overflow-hidden shadow-xl mb-8"
              >
                <img src={onboardingImg} alt="Cooking" className="w-full h-full object-cover" />
              </motion.div>
              <h1 className="text-3xl font-display font-black text-foreground mb-2">
                {currentStep.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-10">{currentStep.subtitle}</p>
              <button
                onClick={() => setStep(1)}
                className="gradient-fresh text-primary-foreground font-bold py-4 px-10 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
              >
                Let's Go <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-display font-black text-foreground mb-1">
                {currentStep.title}
              </h1>
              <p className="text-muted-foreground text-base mb-8">{currentStep.subtitle}</p>

              <div className="flex flex-col gap-4">
                {currentStep.options?.map((option) => {
                  const Icon = option.icon;
                  const isSelected = data[currentStep.key!] === option.label;
                  return (
                    <motion.button
                      key={option.label}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelect(option.label)}
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                        isSelected
                          ? "border-primary bg-mint shadow-md"
                          : "border-border bg-card hover:border-primary/30"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isSelected ? "gradient-fresh" : "bg-muted"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            isSelected ? "text-primary-foreground" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-lg">{option.label}</p>
                        <p className="text-muted-foreground text-sm">{option.desc}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingFlow;
