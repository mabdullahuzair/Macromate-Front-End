import { Link } from "react-router-dom";
import { Sparkles, TrendingUp, Calendar, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function QuickAccess() {
  const quickActions = [
    {
      id: "cheat-meal-balance",
      title: "Cheat Meal Balance",
      description: "Balance your calories smartly",
      icon: Sparkles,
      path: "/cheat-meal-balance",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
    {
      id: "ai-insights",
      title: "AI Insights",
      description: "View health patterns",
      icon: TrendingUp,
      path: "/progress",
      color: "text-brand-primary",
      bgColor: "bg-brand-primary/10",
      borderColor: "border-brand-primary/20",
    },
    {
      id: "workout-planner",
      title: "Workout Planner",
      description: "Generate AI workout",
      icon: Zap,
      path: "/workout",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
  ];

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-text-primary mb-3">Quick Access</h3>
      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={action.path}
                className={`block p-3 rounded-lg border text-center transition-all hover:border-opacity-40 ${action.bgColor} ${action.borderColor}`}
              >
                <Icon size={20} className={`mx-auto mb-2 ${action.color}`} />
                <div className={`text-xs font-medium ${action.color}`}>
                  {action.title}
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  {action.description}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
