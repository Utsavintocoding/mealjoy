import { useState, useEffect } from "react";
import { Edit3, LogOut, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { allMeals } from "@/data/meals";
import { toast } from "sonner";

const ProfileSection = ({ onLogout }: { onLogout?: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("MealJoy User");
  const [mood, setMood] = useState("Quick & Easy 🚀");
  const [editName, setEditName] = useState(name);
  const [editMood, setEditMood] = useState(mood);
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setEmail(user.email || "");
    const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
    if (data) {
      if (data.name) { setName(data.name); setEditName(data.name); }
      if (data.cooking_mood) { setMood(data.cooking_mood); setEditMood(data.cooking_mood); }
    }
  };

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("profiles").update({ name: editName, cooking_mood: editMood }).eq("user_id", user.id);
    if (error) { toast.error("Failed to save profile"); return; }
    setName(editName);
    setMood(editMood);
    setIsEditing(false);
    toast.success("Profile updated!");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout?.();
  };

  return (
    <div className="bg-card rounded-3xl p-6 border border-border text-center">
      <div className="w-20 h-20 gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center">
        <span className="text-primary-foreground text-2xl font-bold">{name.slice(0, 2).toUpperCase()}</span>
      </div>

      {isEditing ? (
        <div className="space-y-3 text-left">
          <input className="w-full p-3 rounded-2xl bg-background border-2 border-border text-foreground font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" placeholder="Your Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
          <input className="w-full p-3 rounded-2xl bg-background border-2 border-border text-foreground font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" placeholder="Cooking Mood" value={editMood} onChange={(e) => setEditMood(e.target.value)} />
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className="flex-1 gradient-fresh text-primary-foreground font-bold py-3 rounded-2xl flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> Save
            </button>
            <button onClick={() => setIsEditing(false)} className="flex-1 bg-muted text-muted-foreground font-bold py-3 rounded-2xl flex items-center justify-center gap-2">
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-display font-bold text-foreground">{name}</h2>
          <p className="text-muted-foreground text-sm mt-1">Cooking mood: {mood}</p>
          {email && <p className="text-muted-foreground text-xs mt-1">{email}</p>}
          <button
            onClick={() => { setEditName(name); setEditMood(mood); setIsEditing(true); }}
            className="mt-3 px-4 py-2 rounded-full bg-mint text-primary font-semibold text-sm inline-flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        </>
      )}

      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          { label: "Recipes", value: String(allMeals.length) },
          { label: "Favorites", value: "5" },
          { label: "Planned", value: "7" },
        ].map((stat) => (
          <div key={stat.label} className="bg-mint rounded-2xl p-3">
            <p className="text-xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <button onClick={handleLogout} className="mt-6 w-full py-3 rounded-2xl bg-destructive/10 text-destructive font-bold flex items-center justify-center gap-2 transition-colors hover:bg-destructive/20">
        <LogOut className="w-4 h-4" /> Log Out
      </button>
    </div>
  );
};

export default ProfileSection;
