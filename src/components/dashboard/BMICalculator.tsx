import { Scale, TrendingUp, TrendingDown, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function BMICalculator() {
  // Get user data from localStorage
  const userInfo = JSON.parse(
    localStorage.getItem("macromate_user_info") || "{}",
  );
  const goals = JSON.parse(localStorage.getItem("macromate_goals") || "{}");

  const calculateBMI = (weight: number, height: number, heightUnit: string) => {
    let heightInMeters = height;

    // Convert height to meters
    if (heightUnit === "ft-in") {
      // Parse format like "5'9\"" or simple decimal for feet
      const heightStr = height.toString();
      if (heightStr.includes("'")) {
        const feet = parseInt(heightStr.split("'")[0] || "0");
        const inches = parseInt(
          heightStr.split("'")[1]?.replace('"', "") || "0",
        );
        heightInMeters = (feet * 12 + inches) * 0.0254;
      } else {
        // Simple decimal feet (e.g., 5.75)
        heightInMeters = height * 0.3048;
      }
    } else {
      heightInMeters = height / 100; // cm to meters
    }

    // Convert weight to kg if needed
    let weightInKg = weight;
    if (userInfo.weightUnit === "lbs") {
      weightInKg = weight * 0.453592;
    }

    return weightInKg / (heightInMeters * heightInMeters);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5)
      return {
        category: "Underweight",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      };
    if (bmi < 25)
      return {
        category: "Normal",
        color: "text-success",
        bgColor: "bg-green-100",
      };
    if (bmi < 30)
      return {
        category: "Overweight",
        color: "text-warning",
        bgColor: "bg-yellow-100",
      };
    return { category: "Obese", color: "text-red-600", bgColor: "bg-red-100" };
  };

  const getBMIProgress = (currentBMI: number, targetBMI: number) => {
    const minBMI = 16;
    const maxBMI = 35;
    const totalRange = maxBMI - minBMI;

    const currentProgress = ((currentBMI - minBMI) / totalRange) * 100;
    const targetProgress = ((targetBMI - minBMI) / totalRange) * 100;

    return { currentProgress, targetProgress };
  };

  if (!userInfo.weight || !userInfo.height) {
    return null;
  }

  const currentWeight = parseFloat(userInfo.weight);
  const targetWeight = goals.targetWeight || currentWeight;
  const height = parseFloat(userInfo.height);

  const currentBMI = calculateBMI(currentWeight, height, userInfo.heightUnit);
  const targetBMI = calculateBMI(targetWeight, height, userInfo.heightUnit);

  const currentCategory = getBMICategory(currentBMI);
  const targetCategory = getBMICategory(targetBMI);

  const { currentProgress, targetProgress } = getBMIProgress(
    currentBMI,
    targetBMI,
  );
  const bmiChange = targetBMI - currentBMI;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
              <Scale size={20} className="text-brand-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">BMI Analysis</h3>
              <p className="text-sm text-neutral-600">
                Body Mass Index tracking
              </p>
            </div>
          </div>
        </div>

        {/* Current BMI */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <div className="text-2xl font-bold text-text-primary">
              {currentBMI.toFixed(1)}
            </div>
            <div className="text-sm text-neutral-600 mb-2">Current BMI</div>
            <Badge
              className={`${currentCategory.bgColor} ${currentCategory.color} border-0 text-xs`}
            >
              {currentCategory.category}
            </Badge>
          </div>

          {goals.goal !== "maintain" && (
            <div className="text-center p-4 bg-brand-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-brand-primary">
                {targetBMI.toFixed(1)}
              </div>
              <div className="text-sm text-neutral-600 mb-2">Target BMI</div>
              <Badge
                className={`${targetCategory.bgColor} ${targetCategory.color} border-0 text-xs`}
              >
                {targetCategory.category}
              </Badge>
            </div>
          )}
        </div>

        {/* BMI Range Visualization */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">BMI Range</span>
            <span className="text-neutral-500">16 - 35</span>
          </div>

          <div className="relative">
            {/* Background gradient bar */}
            <div className="h-4 rounded-full bg-gradient-to-r from-blue-200 via-green-200 via-yellow-200 to-red-200 relative overflow-hidden">
              {/* Current BMI marker */}
              <motion.div
                initial={{ left: "0%" }}
                animate={{
                  left: `${Math.min(Math.max(currentProgress, 0), 100)}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute top-0 w-1 h-full bg-text-primary"
                style={{ transform: "translateX(-50%)" }}
              />

              {/* Target BMI marker */}
              {goals.goal !== "maintain" && (
                <motion.div
                  initial={{ left: "0%" }}
                  animate={{
                    left: `${Math.min(Math.max(targetProgress, 0), 100)}%`,
                  }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  className="absolute top-0 w-1 h-full bg-brand-primary"
                  style={{ transform: "translateX(-50%)" }}
                />
              )}
            </div>

            {/* Labels */}
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>16</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
            </div>
          </div>
        </div>

        {/* BMI Change Summary */}
        {goals.goal !== "maintain" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-4 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-text-primary mb-1">BMI Goal</h4>
                <p className="text-sm text-neutral-600">
                  {goals.goal === "lose" ? "Reduce" : "Increase"} BMI by{" "}
                  <span className="font-medium text-text-primary">
                    {Math.abs(bmiChange).toFixed(1)} points
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                {bmiChange < 0 ? (
                  <TrendingDown size={20} className="text-success" />
                ) : (
                  <TrendingUp size={20} className="text-brand-primary" />
                )}
                <div className="text-right">
                  <div
                    className={`text-lg font-bold ${bmiChange < 0 ? "text-success" : "text-brand-primary"}`}
                  >
                    {bmiChange > 0 ? "+" : ""}
                    {bmiChange.toFixed(1)}
                  </div>
                  <div className="text-xs text-neutral-600">BMI change</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Health Ranges Info */}
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="text-center p-2 bg-blue-50 rounded">
            <div className="font-medium text-blue-700">Under</div>
            <div className="text-blue-600">&lt;18.5</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded">
            <div className="font-medium text-green-700">Normal</div>
            <div className="text-green-600">18.5-25</div>
          </div>
          <div className="text-center p-2 bg-yellow-50 rounded">
            <div className="font-medium text-yellow-700">Over</div>
            <div className="text-yellow-600">25-30</div>
          </div>
          <div className="text-center p-2 bg-red-50 rounded">
            <div className="font-medium text-red-700">Obese</div>
            <div className="text-red-600">30+</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
