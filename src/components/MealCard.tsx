import { motion } from "framer-motion";
import { Clock, Heart, Flame, Star } from "lucide-react";

type MealCardProps = {
  image: string;
  title: string;
  time: string;
  calories: string;
  tags: string[];
  cuisine?: string;
  onClick?: () => void;
};

const MealCard = ({ image, title, time, calories, tags, cuisine, onClick }: MealCardProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full bg-card rounded-3xl overflow-hidden shadow-md border border-border text-left"
    >
      <div className="relative h-44 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <button className="absolute top-3 right-3 w-9 h-9 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Heart className="w-5 h-5 text-accent" />
        </button>
        {cuisine && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-card/80 backdrop-blur-sm rounded-full text-xs font-bold text-foreground">
            {cuisine}
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-12">
          <h3 className="font-display font-bold text-card text-lg drop-shadow-md">{title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {time}
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-4 h-4" /> {calories}
          </span>
          <span className="flex items-center gap-1 ml-auto text-sunshine">
            <Star className="w-4 h-4 fill-sunshine" /> 4.8
          </span>
        </div>
        {tags.length > 0 && (
          <div className="flex gap-1.5 mt-2">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-mint rounded-full text-[10px] font-bold text-primary">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </motion.button>
  );
};

export default MealCard;
