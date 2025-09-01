import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Target,
  TrendingDown,
  TrendingUp,
  Minus,
  Dumbbell,
  Apple,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PrimaryGoal =
  | "lose"
  | "maintain"
  | "gain"
  | "fitness"
  | "healthy"
  | "muscle";
type WeightChangeRate = "slow" | "moderate" | "faster" | "aggressive";

interface GoalOption {
  id: PrimaryGoal;
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
  {
    id: "fitness",
    title: "Improve Fitness",
    description: "Focus on strength, endurance, and overall health",
    icon: Dumbbell,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    id: "healthy",
    title: "Eat Healthier",
    description: "Make better food choices and improve nutrition",
    icon: Apple,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    id: "muscle",
    title: "Build Muscle",
    description: "Increase muscle mass and strength",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
];

// Weight Loss Rate Options
const weightLossRates = [
  {
    id: "slow" as WeightChangeRate,
    title: "Slow & Steady",
    description: "0.25 kg / 0.5 lbs per week",
    subtitle: "Best for sustainable, long-term fat loss",
    lbsPerWeek: 0.5,
    kgPerWeek: 0.25,
    calorieDeficit: 250,
  },
  {
    id: "moderate" as WeightChangeRate,
    title: "Moderate",
    description: "0.5 kg / 1 lb per week",
    subtitle: "A balanced approach—popular and safe for most users",
    lbsPerWeek: 1,
    kgPerWeek: 0.5,
    calorieDeficit: 500,
  },
  {
    id: "faster" as WeightChangeRate,
    title: "Faster",
    description: "0.75 kg / 1.5 lbs per week",
    subtitle: "Still within healthy limits but requires higher discipline",
    lbsPerWeek: 1.5,
    kgPerWeek: 0.75,
    calorieDeficit: 750,
  },
  {
    id: "aggressive" as WeightChangeRate,
    title: "Aggressive",
    description: "1 kg / 2 lbs per week",
    subtitle:
      "Max limit for short-term goals. Only for users with significant weight to lose",
    warning: "Not suitable for everyone—can be hard to maintain",
    lbsPerWeek: 2,
    kgPerWeek: 1,
    calorieDeficit: 1000,
  },
];

// Weight Gain Rate Options
const weightGainRates = [
  {
    id: "slow" as WeightChangeRate,
    title: "Slow",
    description: "0.25 kg / 0.5 lbs per week",
    subtitle: "Ideal for lean muscle gain with minimal fat",
    lbsPerWeek: 0.5,
    kgPerWeek: 0.25,
    calorieSurplus: 250,
  },
  {
    id: "moderate" as WeightChangeRate,
    title: "Moderate",
    description: "0.5 kg / 1 lb per week",
    subtitle: "Common rate for general bulking",
    lbsPerWeek: 1,
    kgPerWeek: 0.5,
    calorieSurplus: 500,
  },
  {
    id: "faster" as WeightChangeRate,
    title: "Aggressive",
    description: "0.75 kg / 1.5 lbs per week",
    subtitle: "May lead to faster gains but can include fat mass",
    lbsPerWeek: 1.5,
    kgPerWeek: 0.75,
    calorieSurplus: 750,
  },
  {
    id: "aggressive" as WeightChangeRate,
    title: "Very Aggressive",
    description: "1 kg / 2 lbs per week",
    subtitle:
      "Only recommended for underweight users or advanced bulking cycles",
    warning: "Risk of higher fat gain",
    lbsPerWeek: 2,
    kgPerWeek: 1,
    calorieSurplus: 1000,
  },
];

export default function GoalSetting() {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<PrimaryGoal | null>(null);
  const [targetWeight, setTargetWeight] = useState("");
  const [selectedRate, setSelectedRate] = useState<WeightChangeRate | null>(
    null,
  );

  // Get basic info from previous step
  const basicInfo = JSON.parse(
    localStorage.getItem("macromate_basic_info") || "{}",
  );

  const handleContinue = () => {
    if (selectedGoal) {
      const goalData = {
        primaryGoal: selectedGoal,
        targetWeight: targetWeight ? parseFloat(targetWeight) : null,
        weightChangeRate: selectedRate,
        currentWeight: parseFloat(basicInfo.weight),
        weightUnit: basicInfo.weightUnit,
      };

      localStorage.setItem("macromate_goal_setting", JSON.stringify(goalData));
      navigate("/onboarding/activity-level");
    }
  };

  const calculateCalories = () => {
    if (
      !basicInfo.age ||
      !basicInfo.weight ||
      !basicInfo.height ||
      !selectedRate
    )
      return 0;

    const weight = parseFloat(basicInfo.weight);
    const age = parseInt(basicInfo.age);
    let height = parseFloat(basicInfo.height);

    // Convert height to cm if needed
    if (basicInfo.heightUnit === "ft-in") {
      // Simple conversion for demo - in real app would parse properly
      height = height * 30.48; // rough conversion
    }

    // Basic BMR calculation (Mifflin-St Jeor)
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5; // for males, subtract 161 for females

    const activityMultiplier = 1.2; // sedentary baseline
    const tdee = bmr * activityMultiplier;

    // Adjust based on goal and rate
    if (selectedGoal === "lose") {
      const lossRate = weightLossRates.find((r) => r.id === selectedRate);
      return Math.round(tdee - (lossRate?.calorieDeficit || 500));
    }
    if (selectedGoal === "gain") {
      const gainRate = weightGainRates.find((r) => r.id === selectedRate);
      return Math.round(tdee + (gainRate?.calorieSurplus || 500));
    }
    return Math.round(tdee);
  };

  const needsTargetWeight = selectedGoal === "lose" || selectedGoal === "gain";
  const needsRate = needsTargetWeight && targetWeight;

  const isFormValid = () => {
    if (!selectedGoal) return false;
    if (needsTargetWeight && !targetWeight) return false;
    if (needsRate && !selectedRate) return false;
    return true;
  };

  const getWeightChangeLabel = () => {
    if (selectedGoal === "lose") return "lose";
    if (selectedGoal === "gain") return "gain";
    return "change";
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
                Goal Setting
              </h1>
              <Progress value={20} className="w-24 h-1 mt-2" />
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
              What's your primary goal?
            </h2>
            <p className="text-neutral-600">
              Choose your main objective to help us personalize your experience.
            </p>
          </div>

          {/* Goal Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-text-primary">Primary Goal</h3>
            <div className="grid grid-cols-1 gap-3">
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
          </div>

          {/* Target Weight */}
          {needsTargetWeight && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <h3 className="font-semibold text-text-primary">
                What is your goal weight?
              </h3>
              <div className="relative">
                <Input
                  type="number"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  placeholder={basicInfo.weightUnit === "lbs" ? "150" : "68"}
                  className="h-12 pr-12 text-center font-semibold text-lg"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm">
                  {basicInfo.weightUnit}
                </span>
              </div>

              {targetWeight && basicInfo.weight && (
                <div className="p-3 bg-neutral-100 rounded-lg text-center">
                  <span className="text-sm text-neutral-600">
                    You want to {getWeightChangeLabel()}{" "}
                    <span className="font-semibold text-text-primary">
                      {Math.abs(
                        parseFloat(targetWeight) - parseFloat(basicInfo.weight),
                      ).toFixed(1)}{" "}
                      {basicInfo.weightUnit}
                    </span>
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {/* Rate Selection */}
          {needsRate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-text-primary">
                  How quickly do you want to {getWeightChangeLabel()} weight?
                </h3>
                <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                  ℹ️ Safe rates only
                </div>
              </div>

              <div className="space-y-3">
                {(selectedGoal === "lose"
                  ? weightLossRates
                  : weightGainRates
                ).map((rate, index) => (
                  <motion.div
                    key={rate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all ${
                        selectedRate === rate.id
                          ? "border-brand-primary bg-brand-primary/5 border-2"
                          : "hover:border-neutral-200 border"
                      }`}
                      onClick={() => setSelectedRate(rate.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-medium text-text-primary">
                              {rate.title}
                            </h5>
                            <span className="text-sm font-medium text-brand-primary">
                              {basicInfo.weightUnit === "lbs"
                                ? `${rate.lbsPerWeek} lbs/week`
                                : `${rate.kgPerWeek} kg/week`}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-600 mb-2">
                            {rate.subtitle}
                          </p>
                          {rate.warning && (
                            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg p-2">
                              <span className="text-amber-600 text-xs">⚠️</span>
                              <span className="text-xs text-amber-700">
                                {rate.warning}
                              </span>
                            </div>
                          )}
                        </div>
                        {selectedRate === rate.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center ml-3"
                          >
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Recommendation Note */}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">💡</span>
                  <p className="text-sm text-green-700">
                    <strong>Recommended:</strong> We suggest aiming for 0.5–1.0{" "}
                    {basicInfo.weightUnit}/week for healthy, sustainable
                    progress.
                  </p>
                </div>
              </div>

              {/* Aggressive Warning */}
              {selectedRate === "aggressive" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-orange-600 text-lg">⚠️</span>
                    <div>
                      <h4 className="font-medium text-orange-800 mb-1">
                        Aggressive Rate Selected
                      </h4>
                      <p className="text-sm text-orange-700">
                        This rate is harder to sustain and may not be suitable
                        for everyone. Please consult a health professional if
                        you're unsure. Consider starting with a moderate
                        approach first.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Goal Summary */}
              {targetWeight && basicInfo.weight && selectedRate && (
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
                              parseFloat(basicInfo.weight),
                          ).toFixed(1)}
                        </div>
                        <div className="text-neutral-600">
                          {basicInfo.weightUnit} to {selectedGoal}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-brand-primary">
                          {basicInfo.weightUnit === "lbs"
                            ? (selectedGoal === "lose"
                                ? weightLossRates
                                : weightGainRates
                              ).find((r) => r.id === selectedRate)?.lbsPerWeek
                            : (selectedGoal === "lose"
                                ? weightLossRates
                                : weightGainRates
                              ).find((r) => r.id === selectedRate)?.kgPerWeek}
                        </div>
                        <div className="text-neutral-600">
                          {basicInfo.weightUnit}/week
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-green-600">
                          {(
                            Math.abs(
                              parseFloat(targetWeight) -
                                parseFloat(basicInfo.weight),
                            ) /
                            (basicInfo.weightUnit === "lbs"
                              ? (selectedGoal === "lose"
                                  ? weightLossRates
                                  : weightGainRates
                                ).find((r) => r.id === selectedRate)
                                  ?.lbsPerWeek || 1
                              : (selectedGoal === "lose"
                                  ? weightLossRates
                                  : weightGainRates
                                ).find((r) => r.id === selectedRate)
                                  ?.kgPerWeek || 0.5)
                          ).toFixed(0)}
                        </div>
                        <div className="text-neutral-600">weeks needed</div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          )}

          {/* Calculated Calories */}
          {selectedGoal && selectedRate && targetWeight && (
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
                    Based on your {selectedGoal} weight goal at a{" "}
                    {(selectedGoal === "lose"
                      ? weightLossRates
                      : weightGainRates
                    )
                      .find((r) => r.id === selectedRate)
                      ?.title.toLowerCase()}{" "}
                    pace
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
