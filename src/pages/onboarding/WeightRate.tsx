import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type WeightChangeRate = "slow" | "moderate" | "faster" | "aggressive";

interface RateOption {
  id: WeightChangeRate;
  title: string;
  description: string;
  subtitle: string;
  lbsPerWeek: number;
  kgPerWeek: number;
  calorieChange: number;
  warning?: string;
}

// Weight Loss Rate Options
const weightLossRates: RateOption[] = [
  {
    id: "slow",
    title: "Slow & Steady",
    description: "0.25 kg / 0.5 lbs per week",
    subtitle: "Best for sustainable, long-term fat loss",
    lbsPerWeek: 0.5,
    kgPerWeek: 0.25,
    calorieChange: 250,
  },
  {
    id: "moderate",
    title: "Moderate",
    description: "0.5 kg / 1 lb per week",
    subtitle: "A balanced approach—popular and safe for most users",
    lbsPerWeek: 1,
    kgPerWeek: 0.5,
    calorieChange: 500,
  },
  {
    id: "faster",
    title: "Faster",
    description: "0.75 kg / 1.5 lbs per week",
    subtitle: "Still within healthy limits but requires higher discipline",
    lbsPerWeek: 1.5,
    kgPerWeek: 0.75,
    calorieChange: 750,
  },
  {
    id: "aggressive",
    title: "Aggressive",
    description: "1 kg / 2 lbs per week",
    subtitle:
      "Max limit for short-term goals. Only for users with significant weight to lose",
    warning: "Not suitable for everyone—can be hard to maintain",
    lbsPerWeek: 2,
    kgPerWeek: 1,
    calorieChange: 1000,
  },
];

// Weight Gain Rate Options
const weightGainRates: RateOption[] = [
  {
    id: "slow",
    title: "Slow",
    description: "0.25 kg / 0.5 lbs per week",
    subtitle: "Ideal for lean muscle gain with minimal fat",
    lbsPerWeek: 0.5,
    kgPerWeek: 0.25,
    calorieChange: 250,
  },
  {
    id: "moderate",
    title: "Moderate",
    description: "0.5 kg / 1 lb per week",
    subtitle: "Common rate for general bulking",
    lbsPerWeek: 1,
    kgPerWeek: 0.5,
    calorieChange: 500,
  },
  {
    id: "faster",
    title: "Aggressive",
    description: "0.75 kg / 1.5 lbs per week",
    subtitle: "May lead to faster gains but can include fat mass",
    lbsPerWeek: 1.5,
    kgPerWeek: 0.75,
    calorieChange: 750,
  },
  {
    id: "aggressive",
    title: "Max",
    description: "1 kg / 2 lbs per week",
    subtitle:
      "Only recommended for underweight users or advanced bulking cycles",
    warning: "Risk of higher fat gain",
    lbsPerWeek: 2,
    kgPerWeek: 1,
    calorieChange: 1000,
  },
];

export default function WeightRate() {
  const navigate = useNavigate();
  const [selectedRate, setSelectedRate] = useState<WeightChangeRate | null>(
    null,
  );

  // Get previous data
  const personalInfo = JSON.parse(
    localStorage.getItem("macromate_personal_info") || "{}",
  );
  const goalData = JSON.parse(
    localStorage.getItem("macromate_primary_goal") || "{}",
  );

  const isLoseGoal = goalData.primaryGoal === "lose";
  const rates = isLoseGoal ? weightLossRates : weightGainRates;

  const handleContinue = () => {
    if (selectedRate) {
      const updatedGoalData = {
        ...goalData,
        weightChangeRate: selectedRate,
        calorieAdjustment:
          rates.find((r) => r.id === selectedRate)?.calorieChange || 500,
      };

      localStorage.setItem(
        "macromate_primary_goal",
        JSON.stringify(updatedGoalData),
      );
      navigate("/onboarding/activity-level");
    }
  };

  const getTimelineEstimate = () => {
    if (!selectedRate || !goalData.targetWeight || !goalData.currentWeight)
      return null;

    const weightDifference = Math.abs(
      goalData.targetWeight - goalData.currentWeight,
    );
    const ratePerWeek =
      personalInfo.weightUnit === "lbs"
        ? rates.find((r) => r.id === selectedRate)?.lbsPerWeek
        : rates.find((r) => r.id === selectedRate)?.kgPerWeek;

    if (!ratePerWeek) return null;

    return Math.ceil(weightDifference / ratePerWeek);
  };

  const estimatedWeeks = getTimelineEstimate();

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
                Rate of Progress
              </h1>
              <Progress value={65} className="w-24 h-1 mt-2" />
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
              <Gauge size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              How fast do you want to {isLoseGoal ? "lose" : "gain"} weight?
            </h2>
            <p className="text-neutral-600">
              Choose a safe, sustainable pace that fits your lifestyle.
            </p>
          </div>

          {/* Safety Banner */}
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <span className="text-blue-600">ℹ️</span>
            <p className="text-sm text-blue-700">
              <strong>Safe rates only:</strong> All options are within medically
              recommended guidelines.
            </p>
          </div>

          {/* Rate Options */}
          <div className="space-y-3">
            {rates.map((rate, index) => (
              <motion.div
                key={rate.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
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
                          {personalInfo.weightUnit === "lbs"
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

          {/* Recommendation */}
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-green-600">💡</span>
              <p className="text-sm text-green-700">
                <strong>Recommended:</strong> We suggest 0.5–1.0{" "}
                {personalInfo.weightUnit}/week for healthy, sustainable
                progress.
              </p>
            </div>
          </div>

          {/* Timeline Estimate */}
          {selectedRate && estimatedWeeks && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-4 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
                <div className="text-center">
                  <h3 className="font-semibold text-text-primary mb-2">
                    Estimated Timeline
                  </h3>
                  <div className="text-2xl font-bold text-brand-primary mb-1">
                    {estimatedWeeks} weeks
                  </div>
                  <p className="text-sm text-neutral-600">
                    To reach your goal of {goalData.targetWeight}{" "}
                    {personalInfo.weightUnit}
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

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
                    This rate is harder to sustain and may not be suitable for
                    everyone. Please consult a health professional if you're
                    unsure. Consider starting with a moderate approach first.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-4"
          >
            <Button
              onClick={handleContinue}
              disabled={!selectedRate}
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
