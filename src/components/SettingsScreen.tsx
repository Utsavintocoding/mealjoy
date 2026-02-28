import { useState, useEffect } from "react";
import { ArrowLeft, Bell, Ruler, User, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SettingsScreen = ({ onBack }: { onBack: () => void }) => {
  const [notifications, setNotifications] = useState(true);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setEmail(user.email || "");
    });
  }, []);

  return (
    <div className="px-6 pt-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-2xl font-display font-black text-foreground">Settings</h1>
      </div>

      <div className="space-y-4">
        {/* Account */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <User className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground">Account</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>{email || "Not logged in"}</span>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">Notifications</span>
            </div>
            <button onClick={() => setNotifications(!notifications)}
              className={`w-12 h-7 rounded-full transition-colors ${notifications ? "bg-primary" : "bg-muted"} relative`}>
              <div className={`w-5 h-5 rounded-full bg-card absolute top-1 transition-transform ${notifications ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Meal reminders and cooking tips</p>
        </div>

        {/* Units */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <Ruler className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground">Measurement Units</span>
          </div>
          <div className="flex gap-2">
            {(["metric", "imperial"] as const).map((u) => (
              <button key={u} onClick={() => setUnits(u)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${units === u ? "gradient-fresh text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {u === "metric" ? "Metric (cm/kg)" : "Imperial (ft/lbs)"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
