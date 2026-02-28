import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import SplashScreen from "@/components/SplashScreen";
import OnboardingFlow from "@/components/OnboardingFlow";
import ProfileSetup from "@/components/ProfileSetup";
import PostSignupOnboarding from "@/components/PostSignupOnboarding";
import Dashboard from "@/components/Dashboard";
import AuthPage from "@/components/AuthPage";

type AppPhase = "splash" | "auth" | "onboarding" | "profile" | "post-signup" | "dashboard";

const Index = () => {
  const [phase, setPhase] = useState<AppPhase>("splash");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Check if profile has a name (i.e. onboarding completed)
        const { data } = await supabase.from("profiles").select("name").eq("user_id", session.user.id).single();
        if (data?.name) {
          setPhase("dashboard");
        } else {
          setPhase("post-signup");
        }
      }
      setCheckingAuth(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const { data } = await supabase.from("profiles").select("name").eq("user_id", session.user.id).single();
        if (data?.name) {
          setPhase("dashboard");
        } else {
          setPhase("post-signup");
        }
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
          <AuthPage key="auth" onAuth={() => setPhase("post-signup")} />
        )}
        {phase === "post-signup" && (
          <PostSignupOnboarding key="post-signup" onComplete={() => setPhase("dashboard")} />
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
