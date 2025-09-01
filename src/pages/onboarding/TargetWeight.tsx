import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function TargetWeight() {
  const navigate = useNavigate();
  const [targetWeight, setTargetWeight] = useState("");

  // Get previous data
  const personalInfo = JSON.parse(
    localStorage.getItem("macromate_personal_info") || "{}",
  );
  const goalData = JSON.parse(
    localStorage.getItem("macromate_primary_goal") || "{}",
  );

  const currentWeight = parseFloat(personalInfo.weight);
  const isLoseGoal = goalData.primaryGoal === "lose";
  const isGainGoal = goalData.primaryGoal === "gain";

  const handleContinue = () => {
    const target = parseFloat(targetWeight);

    if (targetWeight && isValidTarget(target)) {
      const updatedGoalData = {
        ...goalData,
        targetWeight: target,
        currentWeight,
        weightUnit: personalInfo.weightUnit,
      };

      localStorage.setItem(
        "macromate_primary_goal",
        JSON.stringify(updatedGoalData),
      );
      navigate("/onboarding/weight-rate");
    }
  };

  const isValidTarget = (target: number) => {
    if (!target || !currentWeight) return false;

    const difference = Math.abs(target - currentWeight);
    const minDifference = personalInfo.weightUnit === "lbs" ? 5 : 2; // 5 lbs or 2 kg minimum
    const maxDifference = personalInfo.weightUnit === "lbs" ? 100 : 45; // 100 lbs or 45 kg maximum

    // Check if target is different enough from current
    if (difference < minDifference) return false;

    // Check if target is not too extreme
    if (difference > maxDifference) return false;

    // Check if direction matches goal
    if (isLoseGoal && target >= currentWeight) return false;
    if (isGainGoal && target <= currentWeight) return false;

    return true;
  };

  const getValidationMessage = () => {
    const target = parseFloat(targetWeight);
    if (!targetWeight) return "";

    if (!target) return "Please enter a valid weight";

    const difference = Math.abs(target - currentWeight);
    const minDifference = personalInfo.weightUnit === "lbs" ? 5 : 2;
    const maxDifference = personalInfo.weightUnit === "lbs" ? 100 : 45;

    if (difference < minDifference) {
      return `Target should be at least ${minDifference} ${personalInfo.weightUnit} different from current weight`;
    }

    if (difference > maxDifference) {
      return `Target should not be more than ${maxDifference} ${personalInfo.weightUnit} different from current weight`;
    }

    if (isLoseGoal && target >= currentWeight) {
      return "Target weight should be less than your current weight for weight loss";
    }

    if (isGainGoal && target <= currentWeight) {
      return "Target weight should be more than your current weight for weight gain";
    }

    return "";
  };

  const target = parseFloat(targetWeight);
  const isValid = targetWeight && isValidTarget(target);
  const validationMessage = getValidationMessage();

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
                Target Weight
              </h1>
              <Progress value={52} className="w-24 h-1 mt-2" />
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
              {isLoseGoal ? (
                <TrendingDown size={24} className="text-white" />
              ) : (
                <TrendingUp size={24} className="text-white" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              What's your target weight?
            </h2>
            <p className="text-neutral-600">
              Set a realistic goal that we can help you achieve safely and
              sustainably.
            </p>
          </div>

          {/* Current Weight Display */}
          <Card className="p-4 bg-gradient-to-br from-neutral-50 to-neutral-100">
            <div className="text-center">
              <h3 className="font-semibold text-text-primary mb-2">
                Current Weight
              </h3>
              <div className="text-2xl font-bold text-neutral-700">
                {currentWeight} {personalInfo.weightUnit}
              </div>
            </div>
          </Card>

          {/* Target Weight Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <Label className="text-sm font-medium text-text-primary">
              Target Weight
            </Label>
            <div className="relative">
              <Input
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                placeholder={
                  isLoseGoal
                    ? personalInfo.weightUnit === "lbs"
                      ? "140"
                      : "64"
                    : personalInfo.weightUnit === "lbs"
                      ? "170"
                      : "77"
                }
                className="h-12 pr-12 text-center font-semibold text-lg"
                step="0.1"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm">
                {personalInfo.weightUnit}
              </span>
            </div>

            {/* Validation Message */}
            {validationMessage && (
              <div
                className={`text-sm ${isValid ? "text-green-600" : "text-red-600"}`}
              >
                {validationMessage}
              </div>
            )}
          </motion.div>

          {/* Goal Summary */}
          {targetWeight && isValid && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
                <div className="text-center">
                  <h3 className="font-semibold text-text-primary mb-3">
                    Goal Summary
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-bold text-neutral-700">
                        {Math.abs(target - currentWeight).toFixed(1)}
                      </div>
                      <div className="text-neutral-600">
                        {personalInfo.weightUnit} to{" "}
                        {isLoseGoal ? "lose" : "gain"}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-brand-primary">
                        {currentWeight}
                      </div>
                      <div className="text-neutral-600">Current</div>
                    </div>
                    <div>
                      <div className="font-bold text-green-600">{target}</div>
                      <div className="text-neutral-600">Target</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  💡 Healthy Guidelines
                </h4>
                <div className="text-sm text-neutral-600 space-y-1">
                  <p>
                    • Safe {isLoseGoal ? "weight loss" : "weight gain"}: 0.5-2{" "}
                    {personalInfo.weightUnit}/week
                  </p>
                  <p>• Realistic goals lead to sustainable results</p>
                  <p>• You can always adjust your target later</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-4"
          >
            <Button
              onClick={handleContinue}
              disabled={!isValid}
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
