import { motion } from "framer-motion";
import { Clock, Heart, ChevronRight, Flame, Star } from "lucide-react";

type MealCardProps = {
  image: string;
  title: string;
  time: string;
  calories: string;
  tags: string[];
  onClick?: () => void;
};

const MealCard = ({ image, title, time, calories, tags, onClick }: MealCardProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full bg-card rounded-3xl overflow-hidden shadow-md border border-border text-left"
    >
      <div className="relative h-44 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <button className="absolute top-3 right-3 w-9 h-9 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Heart className="w-5 h-5 text-accent" />
        </button>
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-card/80 backdrop-blur-sm rounded-full text-xs font-bold text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-foreground text-lg">{title}</h3>
        <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
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
      </div>
    </motion.button>
  );
};

export default MealCard;
