import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import SplashScreen from "@/components/SplashScreen";
import OnboardingFlow from "@/components/OnboardingFlow";
import ProfileSetup from "@/components/ProfileSetup";
import Dashboard from "@/components/Dashboard";
import AuthPage from "@/components/AuthPage";

type AppPhase = "splash" | "auth" | "onboarding" | "profile" | "dashboard";

const Index = () => {
  const [phase, setPhase] = useState<AppPhase>("splash");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setPhase("dashboard");
      }
      setCheckingAuth(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setPhase("dashboard");
      }
      setCheckingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = () => {
    setPhase("splash");
  };

  if (checkingAuth && phase === "splash") {
    return <div className="max-w-md mx-auto min-h-screen bg-background" />;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === "splash" && (
          <SplashScreen key="splash" onComplete={() => setPhase("auth")} />
        )}
        {phase === "auth" && (
          <AuthPage key="auth" onAuth={() => setPhase("dashboard")} />
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
