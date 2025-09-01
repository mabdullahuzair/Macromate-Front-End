import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Activity,
  Armchair,
  PersonStanding,
  Bike,
  Zap,
  Flame,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type ActivityLevel =
  | "sedentary"
  | "lightly_active"
  | "moderately_active"
  | "very_active"
  | "super_active";

interface ActivityOption {
  id: ActivityLevel;
  title: string;
  description: string;
  details: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  multiplier: number;
}

const activityOptions: ActivityOption[] = [
  {
    id: "sedentary",
    title: "Sedentary",
    description: "Little to no exercise",
    details: "Desk job, no regular exercise, minimal walking",
    icon: Armchair,
    color: "text-neutral-600",
    bgColor: "bg-neutral-50",
    borderColor: "border-neutral-200",
    multiplier: 1.2,
  },
  {
    id: "lightly_active",
    title: "Lightly Active",
    description: "Light exercise 1–3 days/week",
    details: "Light workouts, walking, or sports occasionally",
    icon: PersonStanding,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    multiplier: 1.375,
  },
  {
    id: "moderately_active",
    title: "Moderately Active",
    description: "Moderate exercise 3–5 days/week",
    details: "Regular workouts, active lifestyle, consistent training",
    icon: Bike,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    multiplier: 1.55,
  },
  {
    id: "very_active",
    title: "Very Active",
    description: "Hard exercise 6–7 days/week",
    details: "Daily intense workouts, training programs, active job",
    icon: Zap,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    multiplier: 1.725,
  },
  {
    id: "super_active",
    title: "Super Active",
    description: "Twice per day, heavy workouts",
    details: "Multiple daily workouts, physical job, competitive athlete",
    icon: Flame,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    multiplier: 1.9,
  },
];

export default function ActivityLevel() {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityLevel | null>(null);

  const handleContinue = () => {
    if (selectedActivity) {
      const activityData = {
        activityLevel: selectedActivity,
        activityMultiplier:
          activityOptions.find((a) => a.id === selectedActivity)?.multiplier ||
          1.2,
      };

      localStorage.setItem(
        "macromate_activity_level",
        JSON.stringify(activityData),
      );
      navigate("/onboarding/dietary-preferences");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-neutral-100 safe-area-pt"
      >
        <div className="px-4 py-4 max-w-lg mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <ArrowLeft size={20} className="text-neutral-600" />
            </button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-text-primary">
                Activity Level
              </h1>
              <Progress value={30} className="w-24 h-1 mt-2" />
            </div>
            <div className="w-8" />
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Welcome */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
              <Activity size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              How active are you?
            </h2>
            <p className="text-neutral-600">
              Your activity level helps us calculate your daily calorie needs
              more accurately.
            </p>
          </div>

          {/* Activity Selection */}
          <div className="space-y-3">
            {activityOptions.map((option, index) => {
              const Icon = option.icon;
              const isSelected = selectedActivity === option.id;

              return (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected
                        ? `${option.bgColor} ${option.borderColor} border-2`
                        : "hover:border-neutral-200 border"
                    }`}
                    onClick={() => setSelectedActivity(option.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg ${option.bgColor} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon size={24} className={option.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-text-primary">
                              {option.title}
                            </h4>
                            <p className="text-sm text-neutral-600">
                              {option.description}
                            </p>
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0 ml-3"
                            >
                              <div className="w-2 h-2 rounded-full bg-white" />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500">
                          {option.details}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs font-medium text-brand-primary bg-brand-primary/10 px-2 py-1 rounded">
                            Activity Factor: {option.multiplier}x
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-brand-primary/5 border-blue-200">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  💡 How we use this information
                </h4>
                <p className="text-sm text-neutral-600">
                  Your activity level helps us calculate your Total Daily Energy
                  Expenditure (TDEE) to provide accurate calorie and macro
                  recommendations.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-4"
          >
            <Button
              onClick={handleContinue}
              disabled={!selectedActivity}
              className="w-full gradient-bg text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              Continue
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
