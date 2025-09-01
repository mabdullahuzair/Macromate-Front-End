import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart3, RotateCcw, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface MacroSplit {
  protein: number;
  carbs: number;
  fat: number;
}

interface MacroPreset {
  id: string;
  name: string;
  description: string;
  split: MacroSplit;
  icon: string;
}

const presets: MacroPreset[] = [
  {
    id: "balanced",
    name: "Balanced (Recommended)",
    description: "Science-backed ratio for general health",
    split: { protein: 20, carbs: 50, fat: 30 },
    icon: "⚖️",
  },
  {
    id: "high_protein",
    name: "High Protein",
    description: "For fat loss and muscle gain",
    split: { protein: 30, carbs: 40, fat: 30 },
    icon: "💪",
  },
  {
    id: "low_carb",
    name: "Low Carb",
    description: "Ketogenic-style eating",
    split: { protein: 25, carbs: 25, fat: 50 },
    icon: "🥑",
  },
  {
    id: "endurance",
    name: "Endurance Focus",
    description: "For runners and athletes",
    split: { protein: 15, carbs: 60, fat: 25 },
    icon: "🏃",
  },
];

const macroLimits = {
  protein: { min: 10, max: 35 },
  carbs: { min: 30, max: 65 },
  fat: { min: 20, max: 35 },
};

export default function MacronutrientDistribution() {
  const navigate = useNavigate();
  const [macroSplit, setMacroSplit] = useState<MacroSplit>({
    protein: 20,
    carbs: 50,
    fat: 30,
  });
  const [inputMode, setInputMode] = useState(false);

  // Get previous onboarding data
  const basicInfo = JSON.parse(
    localStorage.getItem("macromate_basic_info") || "{}",
  );
  const goalSetting = JSON.parse(
    localStorage.getItem("macromate_goal_setting") || "{}",
  );
  const activityLevel = JSON.parse(
    localStorage.getItem("macromate_activity_level") || "{}",
  );

  const calculateDailyCalories = () => {
    if (!basicInfo.age || !basicInfo.weight || !basicInfo.height) return 2000;

    let weightInKg = parseFloat(basicInfo.weight);
    let heightInCm = 0;
    const age = parseInt(basicInfo.age);
    const isMale = basicInfo.gender === "male";

    // Convert weight to kg if needed
    if (basicInfo.weightUnit === "lbs") {
      weightInKg = weightInKg / 2.205;
    }

    // Convert height to cm
    if (basicInfo.heightUnit === "ft-in") {
      if (basicInfo.height.includes("'")) {
        const parts = basicInfo.height.split("'");
        const feet = parseFloat(parts[0]);
        const inches = parseFloat(parts[1].replace('"', "")) || 0;
        heightInCm = (feet * 12 + inches) * 2.54;
      } else {
        heightInCm = parseFloat(basicInfo.height) * 30.48;
      }
    } else {
      heightInCm = parseFloat(basicInfo.height);
    }

    // Mifflin-St Jeor BMR calculation
    let bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age;
    if (isMale) {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // Apply activity multiplier
    const activityMultiplier = activityLevel.activityMultiplier || 1.2;
    let tdee = bmr * activityMultiplier;

    // Apply goal-based calorie adjustment
    if (goalSetting.primaryGoal === "lose" && goalSetting.weightChangeRate) {
      const deficits = {
        slow: 250,
        moderate: 500,
        faster: 750,
        aggressive: 1000,
      };
      tdee -=
        deficits[goalSetting.weightChangeRate as keyof typeof deficits] || 500;
    } else if (
      goalSetting.primaryGoal === "gain" &&
      goalSetting.weightChangeRate
    ) {
      const surpluses = {
        slow: 250,
        moderate: 500,
        faster: 750,
        aggressive: 1000,
      };
      tdee +=
        surpluses[goalSetting.weightChangeRate as keyof typeof surpluses] ||
        500;
    }

    return Math.round(tdee);
  };

  const dailyCalories = calculateDailyCalories();

  const calculateMacroGrams = () => {
    const proteinGrams = Math.round(
      (dailyCalories * macroSplit.protein) / 100 / 4,
    );
    const carbGrams = Math.round((dailyCalories * macroSplit.carbs) / 100 / 4);
    const fatGrams = Math.round((dailyCalories * macroSplit.fat) / 100 / 9);

    return { proteinGrams, carbGrams, fatGrams };
  };

  const { proteinGrams, carbGrams, fatGrams } = calculateMacroGrams();

  const total = macroSplit.protein + macroSplit.carbs + macroSplit.fat;
  const isValid = total === 100;

  const handleSliderChange = (macro: keyof MacroSplit, value: number[]) => {
    const newValue = value[0];
    const oldValue = macroSplit[macro];
    const difference = newValue - oldValue;

    // Adjust other macros proportionally
    const otherMacros = Object.keys(macroSplit).filter(
      (m) => m !== macro,
    ) as (keyof MacroSplit)[];
    const totalOther = otherMacros.reduce((sum, m) => sum + macroSplit[m], 0);

    if (totalOther > 0) {
      const newSplit = { ...macroSplit, [macro]: newValue };

      otherMacros.forEach((m) => {
        const proportion = macroSplit[m] / totalOther;
        newSplit[m] = Math.max(
          macroLimits[m].min,
          Math.min(macroLimits[m].max, macroSplit[m] - difference * proportion),
        );
      });

      setMacroSplit(newSplit);
    }
  };

  const handleInputChange = (macro: keyof MacroSplit, value: string) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.max(
      macroLimits[macro].min,
      Math.min(macroLimits[macro].max, numValue),
    );

    setMacroSplit((prev) => ({ ...prev, [macro]: clampedValue }));
  };

  const applyPreset = (preset: MacroPreset) => {
    setMacroSplit(preset.split);
  };

  const resetToDefault = () => {
    setMacroSplit({ protein: 20, carbs: 50, fat: 30 });
  };

  const handleContinue = () => {
    if (isValid) {
      const macroData = {
        proteinPercent: macroSplit.protein,
        carbsPercent: macroSplit.carbs,
        fatPercent: macroSplit.fat,
        dailyCalories,
        proteinGrams,
        carbGrams,
        fatGrams,
      };

      localStorage.setItem(
        "macromate_macro_distribution",
        JSON.stringify(macroData),
      );
      navigate("/onboarding/tracking-preferences");
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
                Macro Distribution
              </h1>
              <Progress value={35} className="w-24 h-1 mt-2" />
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
              Macronutrient Split
            </h2>
            <p className="text-neutral-600">
              Adjust how much of your daily calories come from each
              macronutrient.
            </p>
          </div>

          {/* Daily Calories Display */}
          <Card className="p-4 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
            <div className="text-center">
              <h3 className="font-semibold text-text-primary mb-1">
                Your Daily Calorie Target
              </h3>
              <div className="text-2xl font-bold text-brand-primary">
                {dailyCalories.toLocaleString()} kcal
              </div>
              <p className="text-sm text-neutral-600">
                Based on your goals and activity level
              </p>
            </div>
          </Card>

          {/* Presets */}
          <div className="space-y-3">
            <h3 className="font-semibold text-text-primary">Quick Presets</h3>
            <div className="grid grid-cols-2 gap-3">
              {presets.map((preset, index) => (
                <motion.div
                  key={preset.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="p-3 cursor-pointer transition-all hover:border-brand-primary hover:bg-brand-primary/5"
                    onClick={() => applyPreset(preset)}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{preset.icon}</div>
                      <h4 className="font-medium text-text-primary text-sm">
                        {preset.name}
                      </h4>
                      <p className="text-xs text-neutral-600 mb-2">
                        {preset.description}
                      </p>
                      <div className="text-xs text-brand-primary font-medium">
                        {preset.split.protein}% • {preset.split.carbs}% •{" "}
                        {preset.split.fat}%
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Macro Adjustments */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-text-primary">
                Custom Distribution
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMode(!inputMode)}
                  className="text-xs"
                >
                  {inputMode ? "Sliders" : "Numbers"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetToDefault}
                  className="text-xs"
                >
                  <RotateCcw size={14} className="mr-1" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Protein */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-text-primary">
                    Protein
                  </Label>
                  <p className="text-xs text-neutral-600">
                    Supports muscle growth and repair
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-red-600">
                    {macroSplit.protein}%
                  </div>
                  <div className="text-xs text-neutral-600">
                    {proteinGrams}g
                  </div>
                </div>
              </div>

              {inputMode ? (
                <Input
                  type="number"
                  value={macroSplit.protein}
                  onChange={(e) => handleInputChange("protein", e.target.value)}
                  min={macroLimits.protein.min}
                  max={macroLimits.protein.max}
                  className="h-10"
                />
              ) : (
                <Slider
                  value={[macroSplit.protein]}
                  onValueChange={(value) =>
                    handleSliderChange("protein", value)
                  }
                  min={macroLimits.protein.min}
                  max={macroLimits.protein.max}
                  step={1}
                  className="w-full"
                />
              )}
              <div className="flex justify-between text-xs text-neutral-500">
                <span>{macroLimits.protein.min}%</span>
                <span>{macroLimits.protein.max}%</span>
              </div>
            </div>

            {/* Carbohydrates */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-text-primary">
                    Carbohydrates
                  </Label>
                  <p className="text-xs text-neutral-600">
                    Primary energy source for your body
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-blue-600">
                    {macroSplit.carbs}%
                  </div>
                  <div className="text-xs text-neutral-600">{carbGrams}g</div>
                </div>
              </div>

              {inputMode ? (
                <Input
                  type="number"
                  value={macroSplit.carbs}
                  onChange={(e) => handleInputChange("carbs", e.target.value)}
                  min={macroLimits.carbs.min}
                  max={macroLimits.carbs.max}
                  className="h-10"
                />
              ) : (
                <Slider
                  value={[macroSplit.carbs]}
                  onValueChange={(value) => handleSliderChange("carbs", value)}
                  min={macroLimits.carbs.min}
                  max={macroLimits.carbs.max}
                  step={1}
                  className="w-full"
                />
              )}
              <div className="flex justify-between text-xs text-neutral-500">
                <span>{macroLimits.carbs.min}%</span>
                <span>{macroLimits.carbs.max}%</span>
              </div>
            </div>

            {/* Fats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-text-primary">
                    Fats
                  </Label>
                  <p className="text-xs text-neutral-600">
                    Supports hormones and cell health
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-orange-600">
                    {macroSplit.fat}%
                  </div>
                  <div className="text-xs text-neutral-600">{fatGrams}g</div>
                </div>
              </div>

              {inputMode ? (
                <Input
                  type="number"
                  value={macroSplit.fat}
                  onChange={(e) => handleInputChange("fat", e.target.value)}
                  min={macroLimits.fat.min}
                  max={macroLimits.fat.max}
                  className="h-10"
                />
              ) : (
                <Slider
                  value={[macroSplit.fat]}
                  onValueChange={(value) => handleSliderChange("fat", value)}
                  min={macroLimits.fat.min}
                  max={macroLimits.fat.max}
                  step={1}
                  className="w-full"
                />
              )}
              <div className="flex justify-between text-xs text-neutral-500">
                <span>{macroLimits.fat.min}%</span>
                <span>{macroLimits.fat.max}%</span>
              </div>
            </div>
          </div>

          {/* Validation */}
          <Card
            className={`p-4 ${isValid ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg ${isValid ? "text-green-600" : "text-red-600"}`}
                >
                  {isValid ? "✅" : "❌"}
                </span>
                <div>
                  <h4
                    className={`font-medium ${isValid ? "text-green-800" : "text-red-800"}`}
                  >
                    Total: {total}%
                  </h4>
                  <p
                    className={`text-sm ${isValid ? "text-green-600" : "text-red-600"}`}
                  >
                    {isValid
                      ? "Perfect! Your macros add up to 100%"
                      : `Adjust to reach exactly 100% (currently ${total}%)`}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-4 bg-gradient-to-br from-neutral-50 to-neutral-100">
            <h4 className="font-medium text-text-primary mb-3">
              Daily Targets
            </h4>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="font-bold text-red-600">{proteinGrams}g</div>
                <div className="text-neutral-600">Protein</div>
                <div className="text-xs text-neutral-500">
                  {macroSplit.protein}%
                </div>
              </div>
              <div>
                <div className="font-bold text-blue-600">{carbGrams}g</div>
                <div className="text-neutral-600">Carbs</div>
                <div className="text-xs text-neutral-500">
                  {macroSplit.carbs}%
                </div>
              </div>
              <div>
                <div className="font-bold text-orange-600">{fatGrams}g</div>
                <div className="text-neutral-600">Fat</div>
                <div className="text-xs text-neutral-500">
                  {macroSplit.fat}%
                </div>
              </div>
            </div>
          </Card>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
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
