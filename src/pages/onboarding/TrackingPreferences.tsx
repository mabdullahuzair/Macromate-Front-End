import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Utensils,
  Droplets,
  Clock,
  Activity,
  Moon,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type MealCount = "2" | "3" | "3_snacks" | "custom";

interface MealOption {
  id: MealCount;
  title: string;
  description: string;
  icon: string;
}

const mealOptions: MealOption[] = [
  {
    id: "2",
    title: "2 meals",
    description: "Lunch and dinner, or brunch and dinner",
    icon: "🍽️",
  },
  {
    id: "3",
    title: "3 meals",
    description: "Breakfast, lunch, and dinner",
    icon: "🍳",
  },
  {
    id: "3_snacks",
    title: "3 meals + snacks",
    description: "Regular meals with healthy snacks",
    icon: "🥗",
  },
  {
    id: "custom",
    title: "Custom",
    description: "I'll track meals as needed",
    icon: "⚙️",
  },
];

interface TrackingOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  defaultEnabled: boolean;
}

const trackingOptions: TrackingOption[] = [
  {
    id: "calories",
    title: "Calories",
    description: "Track daily calorie intake",
    icon: Zap,
    color: "text-orange-600",
    defaultEnabled: true,
  },
  {
    id: "macros",
    title: "Macros",
    description: "Carbs, Protein, and Fats",
    icon: BarChart3,
    color: "text-blue-600",
    defaultEnabled: true,
  },
  {
    id: "water",
    title: "Water Intake",
    description: "Daily hydration tracking",
    icon: Droplets,
    color: "text-cyan-600",
    defaultEnabled: true,
  },
  {
    id: "fasting",
    title: "Fasting Windows",
    description: "Intermittent fasting periods",
    icon: Clock,
    color: "text-purple-600",
    defaultEnabled: false,
  },
  {
    id: "exercise",
    title: "Exercise",
    description: "Workouts and physical activity",
    icon: Activity,
    color: "text-green-600",
    defaultEnabled: true,
  },
  {
    id: "sleep",
    title: "Sleep",
    description: "Sleep duration and quality",
    icon: Moon,
    color: "text-indigo-600",
    defaultEnabled: false,
  },
];

export default function TrackingPreferences() {
  const navigate = useNavigate();
  const [selectedMealCount, setSelectedMealCount] = useState<MealCount | null>(
    null,
  );
  const [trackingSettings, setTrackingSettings] = useState<
    Record<string, boolean>
  >(
    trackingOptions.reduce(
      (acc, option) => ({ ...acc, [option.id]: option.defaultEnabled }),
      {},
    ),
  );

  const handleContinue = () => {
    if (selectedMealCount) {
      const trackingData = {
        mealsPerDay: selectedMealCount,
        trackingEnabled: trackingSettings,
      };

      localStorage.setItem(
        "macromate_tracking_preferences",
        JSON.stringify(trackingData),
      );
      navigate("/onboarding/meal-preferences");
    }
  };

  const handleTrackingToggle = (optionId: string) => {
    setTrackingSettings((prev) => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
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
                Tracking Preferences
              </h1>
              <Progress value={60} className="w-24 h-1 mt-2" />
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
              <BarChart3 size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Tracking preferences
            </h2>
            <p className="text-neutral-600">
              Customize what you'd like to track and how you structure your
              meals.
            </p>
          </div>

          {/* Meal Count Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-text-primary">
              How many meals do you eat per day?
            </h3>
            <div className="space-y-2">
              {mealOptions.map((option, index) => {
                const isSelected = selectedMealCount === option.id;

                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all ${
                        isSelected
                          ? "border-brand-primary bg-brand-primary/5 border-2"
                          : "hover:border-neutral-200 border"
                      }`}
                      onClick={() => setSelectedMealCount(option.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{option.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary">
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
                            className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center"
                          >
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Tracking Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-text-primary">
              What would you like to track?
            </h3>
            <p className="text-sm text-neutral-600 -mt-2">
              You can always change these settings later in your profile.
            </p>

            <div className="space-y-3">
              {trackingOptions.map((option, index) => {
                const Icon = option.icon;
                const isEnabled = trackingSettings[option.id];

                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <Card className="p-4 border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                            <Icon size={20} className={option.color} />
                          </div>
                          <div>
                            <h4 className="font-medium text-text-primary">
                              {option.title}
                            </h4>
                            <p className="text-sm text-neutral-600">
                              {option.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={option.id}
                            checked={isEnabled}
                            onCheckedChange={() =>
                              handleTrackingToggle(option.id)
                            }
                          />
                          <Label htmlFor={option.id} className="sr-only">
                            Toggle {option.title}
                          </Label>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-4 bg-gradient-to-br from-green-50 to-brand-primary/5 border-green-200">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  📊 Your Tracking Setup
                </h4>
                <p className="text-sm text-neutral-600">
                  You'll track{" "}
                  <span className="font-medium">
                    {Object.values(trackingSettings).filter(Boolean).length}
                  </span>{" "}
                  metrics with{" "}
                  <span className="font-medium">
                    {selectedMealCount === "3_snacks"
                      ? "3 meals + snacks"
                      : selectedMealCount === "custom"
                        ? "custom meals"
                        : `${selectedMealCount} meals`}
                  </span>{" "}
                  per day. Perfect for building healthy habits!
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="pt-4"
          >
            <Button
              onClick={handleContinue}
              disabled={!selectedMealCount}
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
