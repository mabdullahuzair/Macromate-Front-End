import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Utensils, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type MealCount = "2" | "3" | "4" | "custom";

interface MealOption {
  id: MealCount;
  title: string;
  description: string;
  icon: string;
  times?: string[];
}

const mealOptions: MealOption[] = [
  {
    id: "2",
    title: "2 meals",
    description: "Lunch and dinner, or brunch and dinner",
    icon: "🍽️",
    times: ["12:00 PM", "7:00 PM"],
  },
  {
    id: "3",
    title: "3 meals",
    description: "Traditional breakfast, lunch, and dinner",
    icon: "🍳",
    times: ["8:00 AM", "1:00 PM", "7:00 PM"],
  },
  {
    id: "4",
    title: "4 meals",
    description: "3 meals + 1 snack for better appetite control",
    icon: "🥗",
    times: ["8:00 AM", "12:00 PM", "3:00 PM", "7:00 PM"],
  },
  {
    id: "custom",
    title: "Custom",
    description: "I'll set my own meal schedule",
    icon: "⚙️",
  },
];

const favoriteCuisines = [
  "Italian",
  "Mexican",
  "Chinese",
  "Indian",
  "Thai",
  "Japanese",
  "Mediterranean",
  "American",
  "French",
  "Korean",
  "Middle Eastern",
  "Vietnamese",
];

export default function MealPreferences() {
  const navigate = useNavigate();
  const [selectedMealCount, setSelectedMealCount] = useState<MealCount | null>(
    null,
  );
  const [customMealCount, setCustomMealCount] = useState("");
  const [mealTimes, setMealTimes] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const handleContinue = () => {
    if (selectedMealCount) {
      const mealData = {
        mealCount:
          selectedMealCount === "custom" ? customMealCount : selectedMealCount,
        mealTimes,
        favoriteCuisines: selectedCuisines,
      };

      localStorage.setItem(
        "macromate_meal_preferences",
        JSON.stringify(mealData),
      );
      navigate("/onboarding/notifications");
    }
  };

  const handleMealCountSelect = (option: MealOption) => {
    setSelectedMealCount(option.id);
    if (option.times) {
      setMealTimes(option.times);
    } else {
      setMealTimes([]);
    }
  };

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine],
    );
  };

  const updateMealTime = (index: number, time: string) => {
    const newTimes = [...mealTimes];
    newTimes[index] = time;
    setMealTimes(newTimes);
  };

  const isFormValid = () => {
    if (!selectedMealCount) return false;
    if (selectedMealCount === "custom" && !customMealCount) return false;
    return true;
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
                Meal Preferences
              </h1>
              <Progress value={85} className="w-24 h-1 mt-2" />
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
              <Utensils size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Meal preferences
            </h2>
            <p className="text-neutral-600">
              Help us understand your eating schedule and food preferences.
            </p>
          </div>

          {/* Meal Count Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">
              How many meals do you eat per day?
            </h3>
            <div className="space-y-3">
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
                      onClick={() => handleMealCountSelect(option)}
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

            {/* Custom Meal Count */}
            {selectedMealCount === "custom" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-2"
              >
                <Label className="text-sm font-medium text-text-primary">
                  Number of meals per day
                </Label>
                <Input
                  type="number"
                  value={customMealCount}
                  onChange={(e) => setCustomMealCount(e.target.value)}
                  placeholder="5"
                  className="h-12"
                  min="2"
                  max="8"
                />
              </motion.div>
            )}
          </div>

          {/* Meal Times */}
          {selectedMealCount &&
            selectedMealCount !== "custom" &&
            mealTimes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h3 className="font-semibold text-text-primary">
                  Typical meal times (optional)
                </h3>
                <div className="space-y-3">
                  {mealTimes.map((time, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Clock size={16} className="text-neutral-500" />
                      <span className="text-sm font-medium text-text-primary w-16">
                        Meal {index + 1}:
                      </span>
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => updateMealTime(index, e.target.value)}
                        className="h-10"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          {/* Favorite Cuisines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-text-primary">
              Favorite cuisines (optional)
            </h3>
            <p className="text-sm text-neutral-600">
              Select cuisines you enjoy for personalized meal suggestions.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {favoriteCuisines.map((cuisine, index) => (
                <motion.button
                  key={cuisine}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.03 }}
                  onClick={() => handleCuisineToggle(cuisine)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    selectedCuisines.includes(cuisine)
                      ? "bg-brand-primary/10 border-brand-primary text-brand-primary"
                      : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  {cuisine}
                </motion.button>
              ))}
            </div>

            {selectedCuisines.length > 0 && (
              <div className="text-sm text-neutral-600">
                Selected: {selectedCuisines.join(", ")}
              </div>
            )}
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  📱 Meal Tracking Made Easy
                </h4>
                <p className="text-sm text-neutral-600">
                  We'll use your preferences to suggest meal times and provide
                  personalized food recommendations. You can always adjust these
                  settings later.
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
              disabled={!isFormValid()}
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
