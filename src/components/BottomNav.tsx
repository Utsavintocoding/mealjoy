import { Home, CalendarDays, ChefHat, User, ShoppingBasket } from "lucide-react";

type BottomNavProps = {
  active: string;
  onNavigate: (tab: string) => void;
};

const tabs = [
  { id: "home", icon: Home, label: "Home" },
  { id: "pantry", icon: ShoppingBasket, label: "Pantry" },
  { id: "planner", icon: CalendarDays, label: "Planner" },
  { id: "recipe", icon: ChefHat, label: "Recipes" },
  { id: "profile", icon: User, label: "Profile" },
];

const BottomNav = ({ active, onNavigate }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border px-4 pb-6 pt-2 z-40">
      <div className="flex justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${isActive ? "bg-mint" : ""}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
