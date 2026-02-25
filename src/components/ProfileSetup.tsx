import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, ChevronRight, User } from "lucide-react";

const ProfileSetup = ({ onComplete }: { onComplete: () => void }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

  const fields = [
    { value: name, set: true },
    { value: age, set: true },
    { value: height, set: true },
    { value: weight, set: true },
    { value: goal, set: true },
  ];
  const filled = fields.filter((f) => f.value.trim()).length;
  const progress = (filled / fields.length) * 100;

  const goals = ["Lose Weight", "Gain Muscle", "Eat Healthier", "Save Time"];

  return (
    <div className="min-h-screen bg-background px-6 pt-8 pb-6 flex flex-col">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-black text-foreground mb-1">Set Up Profile</h1>
        <p className="text-muted-foreground mb-6">Optional — customize your experience</p>

        {/* Progress bar */}
        <div className="h-2 w-full bg-muted rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full gradient-fresh rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-8">
          <button className="relative w-24 h-24 rounded-full bg-mint flex items-center justify-center border-4 border-primary/20">
            <User className="w-10 h-10 text-primary" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 gradient-fresh rounded-full flex items-center justify-center shadow-md">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </div>
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <input
            className="w-full p-4 rounded-2xl bg-card border-2 border-border text-foreground font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-3">
            <input
              className="p-4 rounded-2xl bg-card border-2 border-border text-foreground font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              className="p-4 rounded-2xl bg-card border-2 border-border text-foreground font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <input
              className="p-4 rounded-2xl bg-card border-2 border-border text-foreground font-medium placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {/* Goals */}
          <div>
            <p className="font-bold text-foreground mb-3">Dietary Goal</p>
            <div className="flex flex-wrap gap-2">
              {goals.map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                    goal === g
                      ? "gradient-fresh text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-primary/10"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-auto pt-8">
        <button
          onClick={onComplete}
          className="w-full gradient-fresh text-primary-foreground font-bold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Continue <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={onComplete}
          className="w-full text-muted-foreground font-medium py-3 mt-2 text-center"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;
