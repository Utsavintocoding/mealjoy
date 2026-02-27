import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ChefHat } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthPage = ({ onAuth }: { onAuth: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onAuth();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account!");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-background"
    >
      <div className="w-16 h-16 gradient-fresh rounded-2xl flex items-center justify-center mb-4 shadow-lg">
        <ChefHat className="w-8 h-8 text-primary-foreground" />
      </div>
      <h1 className="text-2xl font-display font-black text-foreground mb-1">
        {isLogin ? "Welcome back!" : "Join MealJoy"}
      </h1>
      <p className="text-muted-foreground text-sm mb-8">
        {isLogin ? "Log in to your meal planner" : "Create your account to start cooking"}
      </p>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-card border-2 border-border text-foreground font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={6}
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-card border-2 border-border text-foreground font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Eye className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full gradient-fresh text-primary-foreground font-bold py-4 rounded-2xl text-lg shadow-lg disabled:opacity-60 transition-opacity"
        >
          {loading ? "Please wait..." : isLogin ? "Log In" : "Sign Up"}
        </button>
      </form>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-6 text-sm text-muted-foreground"
      >
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span className="text-primary font-bold">{isLogin ? "Sign Up" : "Log In"}</span>
      </button>
    </motion.div>
  );
};

export default AuthPage;
