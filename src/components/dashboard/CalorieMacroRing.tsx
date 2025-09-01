import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface CalorieMacroRingProps {
  calories?: number;
  targetCalories?: number;
  protein?: number;
  targetProtein?: number;
  carbs?: number;
  targetCarbs?: number;
  fats?: number;
  targetFats?: number;
}

export function CalorieMacroRing({
  calories,
  targetCalories,
  protein,
  targetProtein,
  carbs,
  targetCarbs,
  fats,
  targetFats,
}: CalorieMacroRingProps) {
  const navigate = useNavigate();

  // Get comprehensive data from onboarding
  const personalInfo = JSON.parse(
    localStorage.getItem("macromate_personal_info") || "{}",
  );
  const goalData = JSON.parse(
    localStorage.getItem("macromate_primary_goal") || "{}",
  );
  const activityData = JSON.parse(
    localStorage.getItem("macromate_activity_level") || "{}",
  );
  const macroData = JSON.parse(
    localStorage.getItem("macromate_macro_distribution") || "{}",
  );

  // Calculate accurate daily calories if not stored
  const calculateAccurateCalories = () => {
    if (macroData.dailyCalories) return macroData.dailyCalories;

    if (!personalInfo.age || !personalInfo.weight || !personalInfo.height) {
      return 2200; // Fallback
    }

    // Use proper calculation
    let weightInKg = parseFloat(personalInfo.weight);
    let heightInCm = 0;
    const age = parseInt(personalInfo.age);
    const isMale = personalInfo.gender === "male";

    // Convert weight to kg if needed
    if (personalInfo.weightUnit === "lbs") {
      weightInKg = weightInKg / 2.205;
    }

    // Convert height to cm
    if (personalInfo.heightUnit === "ft-in") {
      if (personalInfo.height.includes("'")) {
        const parts = personalInfo.height.split("'");
        const feet = parseFloat(parts[0]);
        const inches = parseFloat(parts[1].replace('"', "")) || 0;
        heightInCm = (feet * 12 + inches) * 2.54;
      } else {
        heightInCm = parseFloat(personalInfo.height) * 30.48;
      }
    } else {
      heightInCm = parseFloat(personalInfo.height);
    }

    // Mifflin-St Jeor BMR calculation
    let bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age;
    if (isMale) {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // Apply activity multiplier
    const activityMultiplier = activityData.activityMultiplier || 1.2;
    let tdee = bmr * activityMultiplier;

    // Apply goal-based calorie adjustment
    if (goalData.calorieAdjustment) {
      if (goalData.primaryGoal === "lose") {
        tdee -= goalData.calorieAdjustment;
      } else if (goalData.primaryGoal === "gain") {
        tdee += goalData.calorieAdjustment;
      }
    }

    return Math.round(Math.max(tdee, 1200)); // Minimum 1200 calories
  };

  // Use provided props or fallback to calculated data
  const calculatedCalories = calculateAccurateCalories();
  const actualTargetCalories = targetCalories || calculatedCalories;
  const actualTargetProtein =
    targetProtein ||
    macroData.proteinGrams ||
    Math.round((calculatedCalories * 0.2) / 4);
  const actualTargetCarbs =
    targetCarbs ||
    macroData.carbGrams ||
    Math.round((calculatedCalories * 0.5) / 4);
  const actualTargetFats =
    targetFats ||
    macroData.fatGrams ||
    Math.round((calculatedCalories * 0.3) / 9);

  // Mock consumed data - in real app, this would come from today's food logs
  const actualCalories = calories || 1299;
  const actualProtein = protein || 98;
  const actualCarbs = carbs || 122;
  const actualFats = fats || 51;

  const caloriePercentage = Math.min(
    (actualCalories / actualTargetCalories) * 100,
    150,
  );
  const proteinPercentage = Math.min(
    (actualProtein / actualTargetProtein) * 100,
    100,
  );
  const carbsPercentage = Math.min(
    (actualCarbs / actualTargetCarbs) * 100,
    100,
  );
  const fatsPercentage = Math.min((actualFats / actualTargetFats) * 100, 100);

  const isOverTarget = actualCalories > actualTargetCalories;
  const isCheatMealThreshold = actualCalories > actualTargetCalories * 1.1; // 110% threshold

  const circumference = 2 * Math.PI * 45; // radius = 45
  const offset =
    circumference - (Math.min(caloriePercentage, 100) / 100) * circumference;

  const handleRingClick = () => {
    if (isCheatMealThreshold) {
      navigate("/cheat-meal-balance");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Today's Goal
        </h3>
        <div className="text-sm">
          {Math.round(caloriePercentage)}%
          {isCheatMealThreshold && (
            <AlertTriangle
              size={16}
              className="inline ml-1 text-warning animate-pulse"
            />
          )}
        </div>
      </div>

      <div className="relative mb-6">
        {/* Main Ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex items-center justify-center"
          style={{ cursor: isCheatMealThreshold ? "pointer" : "default" }}
          onClick={handleRingClick}
        >
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="6"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={
                isOverTarget
                  ? isCheatMealThreshold
                    ? "#f59e0b"
                    : "#ef4444"
                  : "url(#gradient)"
              }
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#36C9B0" />
                <stop offset="100%" stopColor="#2FA4FF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-text-primary">
                {actualCalories.toLocaleString()}
              </div>
              <div className="text-xs text-neutral-500">
                of {actualTargetCalories.toLocaleString()}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Overage Warning */}
        {isCheatMealThreshold && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-warning text-white text-xs px-2 py-1 rounded-full whitespace-nowrap"
          >
            Tap for Cheat Meal Balance
          </motion.div>
        )}
      </div>

      {/* Macros breakdown */}
      <div className="space-y-3">
        {/* Protein */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-neutral-700">
              Protein
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 bg-neutral-200 rounded-full h-1.5">
              <motion.div
                className="h-1.5 bg-red-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${proteinPercentage}%` }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
            </div>
            <span className="text-xs font-medium text-neutral-600 w-12 text-right">
              {actualProtein}g/{actualTargetProtein}g
            </span>
          </div>
        </motion.div>

        {/* Carbs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-neutral-700">Carbs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 bg-neutral-200 rounded-full h-1.5">
              <motion.div
                className="h-1.5 bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${carbsPercentage}%` }}
                transition={{ delay: 0.9, duration: 0.5 }}
              />
            </div>
            <span className="text-xs font-medium text-neutral-600 w-12 text-right">
              {actualCarbs}g/{actualTargetCarbs}g
            </span>
          </div>
        </motion.div>

        {/* Fats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="text-sm font-medium text-neutral-700">Fat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 bg-neutral-200 rounded-full h-1.5">
              <motion.div
                className="h-1.5 bg-amber-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${fatsPercentage}%` }}
                transition={{ delay: 1.0, duration: 0.5 }}
              />
            </div>
            <span className="text-xs font-medium text-neutral-600 w-12 text-right">
              {actualFats}g/{actualTargetFats}g
            </span>
          </div>
        </motion.div>
      </div>

      {/* Quick tip */}
      <div className="mt-4 text-xs text-neutral-500 text-center">
        {caloriePercentage < 80
          ? "Great progress! Keep logging your meals."
          : caloriePercentage < 110
            ? "You're on track for today's goal!"
            : "Consider the Cheat Meal Balancer for tomorrow."}
      </div>
    </div>
  );
}
