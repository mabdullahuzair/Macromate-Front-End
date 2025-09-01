import { Footprints, Moon, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VitalCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  value: string;
  target: string;
  progress: number;
  status: "good" | "warning" | "poor";
  unit?: string;
}

function VitalCard({
  icon: Icon,
  title,
  value,
  target,
  progress,
  status,
  unit,
}: VitalCardProps) {
  const statusColors = {
    good: "from-success/10 to-success/5 border-success/20 text-success",
    warning: "from-warning/10 to-warning/5 border-warning/20 text-warning",
    poor: "from-red-50 to-red-25 border-red-200 text-red-600",
  };

  const iconColors = {
    good: "text-success",
    warning: "text-warning",
    poor: "text-red-600",
  };

  const progressColors = {
    good: "bg-success",
    warning: "bg-warning",
    poor: "bg-red-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-xl p-4 border bg-gradient-to-br",
        statusColors[status],
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <Icon size={20} className={iconColors[status]} />
        <span className="text-xs font-medium opacity-70">{unit}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-text-primary">{value}</span>
          <span className="text-sm text-neutral-500">/ {target}</span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-text-primary">
              {title}
            </span>
            <span className="text-xs text-neutral-500">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full bg-neutral-100 rounded-full h-1.5">
            <motion.div
              className={cn("h-1.5 rounded-full", progressColors[status])}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function VitalsCards() {
  const vitals = [
    {
      icon: Footprints,
      title: "Steps",
      value: "8,247",
      target: "10,000",
      progress: 82.47,
      status: "good" as const,
      unit: "steps",
    },
    {
      icon: Moon,
      title: "Sleep",
      value: "6.5",
      target: "8.0",
      progress: 81.25,
      status: "warning" as const,
      unit: "hours",
    },
    {
      icon: Activity,
      title: "Heart Rate",
      value: "72",
      target: "65",
      progress: 110.77,
      status: "warning" as const,
      unit: "bpm",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary px-1">
        Health Vitals
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {vitals.map((vital, index) => (
          <motion.div
            key={vital.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <VitalCard {...vital} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
