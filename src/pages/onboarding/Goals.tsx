import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Target,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Goal = "lose" | "maintain" | "gain";
type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

interface GoalOption {
  id: Goal;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
}

const goalOptions: GoalOption[] = [
  {
    id: "lose",
    title: "Lose Weight",
    description: "Create a calorie deficit to shed pounds safely",
    icon: TrendingDown,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: "maintain",
    title: "Maintain Weight",
    description: "Keep your current weight with balanced nutrition",
    icon: Minus,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "gain",
    title: "Gain Weight",
    description: "Build muscle and increase weight in a healthy way",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
];

const activityLevels = [
  {
    id: "sedentary" as ActivityLevel,
    title: "Sedentary",
    description: "Little to no exercise",
    multiplier: 1.2,
  },
  {
    id: "light" as ActivityLevel,
    title: "Lightly Active",
    description: "Light exercise 1-3 days/week",
    multiplier: 1.375,
  },
  {
    id: "moderate" as ActivityLevel,
    title: "Moderately Active",
    description: "Moderate exercise 3-5 days/week",
    multiplier: 1.55,
  },
  {
    id: "active" as ActivityLevel,
    title: "Very Active",
    description: "Hard exercise 6-7 days/week",
    multiplier: 1.725,
  },
  {
    id: "very_active" as ActivityLevel,
    title: "Extremely Active",
    description: "Very hard exercise, physical job",
    multiplier: 1.9,
  },
];

export default function Goals() {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityLevel | null>(null);
  const [targetWeight, setTargetWeight] = useState("");
  const [timeline, setTimeline] = useState("12"); // weeks
  const [weeklyRate, setWeeklyRate] = useState("1"); // lbs per week

  // Get user info from previous step
  const userInfo = JSON.parse(
    localStorage.getItem("macromate_user_info") || "{}",
  );

  const handleContinue = () => {
    if (selectedGoal && selectedActivity && targetWeight) {
      const goalsData = {
        goal: selectedGoal,
        activityLevel: selectedActivity,
        targetWeight: parseFloat(targetWeight),
        currentWeight: parseFloat(userInfo.weight),
        timeline: parseInt(timeline),
        weeklyRate: parseFloat(weeklyRate),
        weightUnit: userInfo.weightUnit,
      };

      localStorage.setItem("macromate_goals", JSON.stringify(goalsData));
      navigate("/onboarding/permissions");
    }
  };

  const calculateCalories = () => {
    if (
      !userInfo.age ||
      !userInfo.weight ||
      !userInfo.height ||
      !selectedActivity
    )
      return 0;

    const weight = parseFloat(userInfo.weight);
    const age = parseInt(userInfo.age);
    let height = parseFloat(userInfo.height);

    // Convert height to cm if needed
    if (userInfo.heightUnit === "ft-in") {
      // Simple conversion for demo - in real app would parse properly
      height = height * 30.48; // rough conversion
    }

    // Basic BMR calculation (Mifflin-St Jeor)
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5; // for males, subtract 161 for females

    const activityMultiplier =
      activityLevels.find((a) => a.id === selectedActivity)?.multiplier || 1.2;
    const tdee = bmr * activityMultiplier;

    // Adjust based on goal
    if (selectedGoal === "lose") return Math.round(tdee - 500);
    if (selectedGoal === "gain") return Math.round(tdee + 500);
    return Math.round(tdee);
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
                Your Goals
              </h1>
              <Progress value={66} className="w-24 h-1 mt-2" />
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
              <Target size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              What's your goal?
            </h2>
            <p className="text-neutral-600">
              Let's create a personalized plan to help you achieve your health
              goals.
            </p>
          </div>

          {/* Goal Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-text-primary">Weight Goal</h3>
            {goalOptions.map((option, index) => {
              const Icon = option.icon;
              const isSelected = selectedGoal === option.id;

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
                        ? `${option.bgColor} ${option.borderColor} border-2`
                        : "hover:border-neutral-200 border"
                    }`}
                    onClick={() => setSelectedGoal(option.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg ${option.bgColor} flex items-center justify-center`}
                      >
                        <Icon size={24} className={option.color} />
                      </div>
                      <div className="flex-1">
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

          {/* Activity Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-text-primary">Activity Level</h3>
            <div className="space-y-2">
              {activityLevels.map((level, index) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <Card
                    className={`p-3 cursor-pointer transition-all ${
                      selectedActivity === level.id
                        ? "border-brand-primary bg-brand-primary/5 border-2"
                        : "hover:border-neutral-200 border"
                    }`}
                    onClick={() => setSelectedActivity(level.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-text-primary">
                          {level.title}
                        </h5>
                        <p className="text-xs text-neutral-600">
                          {level.description}
                        </p>
                      </div>
                      {selectedActivity === level.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Specific Target Weight */}
          {selectedGoal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-text-primary">
                {selectedGoal === "lose"
                  ? "How much weight do you want to lose?"
                  : selectedGoal === "gain"
                    ? "How much weight do you want to gain?"
                    : "What's your ideal weight?"}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-text-primary">
                    Target Weight
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={targetWeight}
                      onChange={(e) => setTargetWeight(e.target.value)}
                      placeholder={userInfo.weightUnit === "lbs" ? "150" : "68"}
                      className="h-12 text-center font-semibold text-lg"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm">
                      {userInfo.weightUnit}
                    </span>
                  </div>
                </div>

                {selectedGoal !== "maintain" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-text-primary">
                      Timeline
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="h-12 text-center font-semibold text-lg"
                        min="4"
                        max="52"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm">
                        weeks
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {selectedGoal !== "maintain" &&
                targetWeight &&
                userInfo.weight && (
                  <Card className="p-4 bg-gradient-to-br from-neutral-50 to-neutral-100">
                    <div className="space-y-3">
                      <h4 className="font-medium text-text-primary">
                        Goal Summary
                      </h4>
                      <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                          <div className="font-bold text-neutral-700">
                            {Math.abs(
                              parseFloat(targetWeight) -
                                parseFloat(userInfo.weight),
                            ).toFixed(1)}
                          </div>
                          <div className="text-neutral-600">
                            {userInfo.weightUnit} to {selectedGoal}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-neutral-700">
                            {timeline}
                          </div>
                          <div className="text-neutral-600">weeks</div>
                        </div>
                        <div>
                          <div className="font-bold text-brand-primary">
                            {(
                              Math.abs(
                                parseFloat(targetWeight) -
                                  parseFloat(userInfo.weight),
                              ) / parseInt(timeline)
                            ).toFixed(1)}
                          </div>
                          <div className="text-neutral-600">
                            {userInfo.weightUnit}/week
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
            </motion.div>
          )}

          {/* Calculated Calories */}
          {selectedGoal && selectedActivity && targetWeight && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
                <div className="text-center">
                  <h4 className="font-semibold text-text-primary mb-2">
                    Your Daily Calorie Goal
                  </h4>
                  <div className="text-3xl font-bold text-brand-primary mb-2">
                    {calculateCalories().toLocaleString()}
                  </div>
                  <p className="text-sm text-neutral-600">
                    Based on your {selectedGoal} weight goal and{" "}
                    {activityLevels
                      .find((a) => a.id === selectedActivity)
                      ?.title.toLowerCase()}{" "}
                    lifestyle
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-4"
          >
            <Button
              onClick={handleContinue}
              disabled={!selectedGoal || !selectedActivity || !targetWeight}
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
