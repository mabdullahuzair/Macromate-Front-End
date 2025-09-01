import {
  Plus,
  Coffee,
  Utensils,
  Apple,
  Moon,
  Dumbbell,
  Scale,
} from "lucide-react";
import { motion } from "framer-motion";

interface DiaryEntry {
  id: string;
  type: "meal" | "workout" | "weight" | "water";
  time: string;
  title: string;
  subtitle?: string;
  calories?: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const diaryEntries: DiaryEntry[] = [
  {
    id: "1",
    type: "meal",
    time: "8:30 AM",
    title: "Breakfast",
    subtitle: "Oatmeal with berries",
    calories: 320,
    icon: Coffee,
  },
  {
    id: "2",
    type: "meal",
    time: "1:15 PM",
    title: "Lunch",
    subtitle: "Grilled chicken salad",
    calories: 450,
    icon: Utensils,
  },
  {
    id: "3",
    type: "meal",
    time: "3:45 PM",
    title: "Snack",
    subtitle: "Apple with almond butter",
    calories: 180,
    icon: Apple,
  },
  {
    id: "4",
    type: "workout",
    time: "6:00 PM",
    title: "Upper Body Workout",
    subtitle: "45 min • Chest & Arms",
    calories: 280,
    icon: Dumbbell,
  },
];

function DiaryEntryCard({ entry }: { entry: DiaryEntry }) {
  const Icon = entry.icon;

  const typeColors = {
    meal: "text-brand-primary",
    workout: "text-success",
    weight: "text-warning",
    water: "text-brand-secondary",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-neutral-100 hover:border-neutral-200 transition-all duration-200"
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center">
          <Icon size={20} className={typeColors[entry.type]} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium text-text-primary truncate">
            {entry.title}
          </h4>
          <span className="text-sm text-neutral-500 flex-shrink-0">
            {entry.time}
          </span>
        </div>

        {entry.subtitle && (
          <p className="text-sm text-neutral-600 truncate">{entry.subtitle}</p>
        )}

        {entry.calories && (
          <p className="text-xs text-neutral-500 mt-1">
            {entry.calories} calories
          </p>
        )}
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 px-6"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-50 flex items-center justify-center">
        <Utensils size={24} className="text-neutral-400" />
      </div>
      <h3 className="text-lg font-medium text-text-primary mb-2">
        No entries yet today
      </h3>
      <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
        Start logging your meals, workouts, and other activities to track your
        progress.
      </p>
      <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-200">
        <Plus size={16} />
        Add Entry
      </button>
    </motion.div>
  );
}

export function TodaysDiary() {
  const hasEntries = diaryEntries.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-semibold text-text-primary">
          Today's Diary
        </h3>
        {hasEntries && (
          <button className="text-sm text-brand-primary font-medium hover:text-brand-secondary transition-colors">
            View All
          </button>
        )}
      </div>

      <div className="bg-neutral-50 rounded-xl p-1">
        {hasEntries ? (
          <div className="space-y-2">
            {diaryEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <DiaryEntryCard entry={entry} />
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
