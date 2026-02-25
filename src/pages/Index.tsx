import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import OnboardingFlow from "@/components/OnboardingFlow";
import ProfileSetup from "@/components/ProfileSetup";
import Dashboard from "@/components/Dashboard";

type AppPhase = "splash" | "onboarding" | "profile" | "dashboard";

const Index = () => {
  const [phase, setPhase] = useState<AppPhase>("splash");

  const handleLogout = () => {
    setPhase("splash");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === "splash" && (
          <SplashScreen key="splash" onComplete={() => setPhase("onboarding")} />
        )}
        {phase === "onboarding" && (
          <OnboardingFlow key="onboarding" onComplete={() => setPhase("profile")} />
        )}
        {phase === "profile" && (
          <ProfileSetup key="profile" onComplete={() => setPhase("dashboard")} />
        )}
        {phase === "dashboard" && <Dashboard key="dashboard" onLogout={handleLogout} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
