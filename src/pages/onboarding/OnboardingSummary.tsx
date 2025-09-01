import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Sparkles, TrendingUp, Target, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function OnboardingSummary() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  // Get all stored data
  const personalInfo = JSON.parse(
    localStorage.getItem("macromate_personal_info") || "{}",
  );
  const primaryGoal = JSON.parse(
    localStorage.getItem("macromate_primary_goal") || "{}",
  );
  const activityLevel = JSON.parse(
    localStorage.getItem("macromate_activity_level") || "{}",
  );
  const macroDistribution = JSON.parse(
    localStorage.getItem("macromate_macro_distribution") || "{}",
  );
  const dietaryPreferences = JSON.parse(
    localStorage.getItem("macromate_dietary_preferences") || "{}",
  );
  const trackingPreferences = JSON.parse(
    localStorage.getItem("macromate_tracking_preferences") || "{}",
  );
  const mealPreferences = JSON.parse(
    localStorage.getItem("macromate_meal_preferences") || "{}",
  );
  const notifications = JSON.parse(
    localStorage.getItem("macromate_notifications") || "{}",
  );
  const healthIntegrations = JSON.parse(
    localStorage.getItem("macromate_health_integrations") || "{}",
  );

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const calculateBMI = () => {
    if (!personalInfo.weight || !personalInfo.height) return 0;

    let weightInKg = parseFloat(personalInfo.weight);
    let heightInM = 0;

    // Convert weight to kg if needed
    if (personalInfo.weightUnit === "lbs") {
      weightInKg = weightInKg / 2.205;
    }

    // Convert height to meters
    if (personalInfo.heightUnit === "ft-in") {
      if (personalInfo.height.includes("'")) {
        const parts = personalInfo.height.split("'");
        const feet = parseFloat(parts[0]);
        const inches = parseFloat(parts[1].replace('"', "")) || 0;
        heightInM = (feet * 12 + inches) * 0.0254;
      } else {
        heightInM = parseFloat(personalInfo.height) * 0.3048;
      }
    } else {
      heightInM = parseFloat(personalInfo.height) / 100;
    }

    return weightInKg / (heightInM * heightInM);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { label: "Normal", color: "text-green-600" };
    if (bmi < 30) return { label: "Overweight", color: "text-orange-600" };
    return { label: "Obese", color: "text-red-600" };
  };

  const calculateDailyCalories = () => {
    if (!personalInfo.age || !personalInfo.weight || !personalInfo.height)
      return 2000;

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
    const activityMultiplier = activityLevel.activityMultiplier || 1.2;
    let tdee = bmr * activityMultiplier;

    // Apply goal-based calorie adjustment
    if (primaryGoal.calorieAdjustment) {
      if (primaryGoal.primaryGoal === "lose") {
        tdee -= primaryGoal.calorieAdjustment;
      } else if (primaryGoal.primaryGoal === "gain") {
        tdee += primaryGoal.calorieAdjustment;
      }
    }

    return Math.round(tdee);
  };

  const handleGetStarted = () => {
    // Mark onboarding as complete
    localStorage.setItem("macromate_onboarding_complete", "true");
    navigate("/");
  };

  const bmi = calculateBMI();
  const bmiCategory = getBMICategory(bmi);
  const dailyCalories =
    macroDistribution.dailyCalories || calculateDailyCalories();

  const enabledNotifications = Object.values(
    notifications.notifications || {},
  ).filter((n: any) => n.enabled).length;

  const connectedApps = healthIntegrations.connectedApps?.length || 0;

  const trackingCount = Object.values(
    trackingPreferences.trackingEnabled || {},
  ).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-brand-primary rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: "easeOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-neutral-100 safe-area-pt"
      >
        <div className="px-4 py-4 max-w-lg mx-auto">
          <div className="text-center">
            <h1 className="text-lg font-semibold text-text-primary">
              Setup Complete!
            </h1>
            <Progress value={100} className="w-24 h-1 mt-2 mx-auto" />
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center"
            >
              <CheckCircle size={32} className="text-white" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-text-primary mb-2"
            >
              Welcome to MacroMate, {personalInfo.fullName || personalInfo.name}
              ! 🎉
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-neutral-600"
            >
              Your personalized nutrition and fitness journey starts now. Here's
              your complete profile summary.
            </motion.p>
          </div>

          {/* Profile Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            {/* Personal Stats */}
            <Card className="p-5 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Target size={20} className="text-brand-primary" />
                <h3 className="font-semibold text-text-primary">
                  Personal Profile
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-neutral-600">Age</div>
                  <div className="font-semibold text-text-primary">
                    {personalInfo.age} years old
                  </div>
                </div>
                <div>
                  <div className="text-neutral-600">Current Weight</div>
                  <div className="font-semibold text-text-primary">
                    {personalInfo.weight} {personalInfo.weightUnit}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-600">Height</div>
                  <div className="font-semibold text-text-primary">
                    {personalInfo.height}{" "}
                    {personalInfo.heightUnit === "cm" ? "cm" : ""}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-600">BMI</div>
                  <div className="font-semibold text-text-primary">
                    {bmi.toFixed(1)}{" "}
                    <span className={`text-xs ${bmiCategory.color}`}>
                      ({bmiCategory.label})
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Goal Summary */}
            <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp size={20} className="text-green-600" />
                <h3 className="font-semibold text-text-primary">Your Goals</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Primary Goal:</span>
                  <span className="font-semibold text-text-primary capitalize">
                    {primaryGoal.primaryGoal === "lose"
                      ? "Lose Weight"
                      : primaryGoal.primaryGoal === "gain"
                        ? "Gain Weight"
                        : primaryGoal.primaryGoal === "maintain"
                          ? "Maintain Weight"
                          : primaryGoal.primaryGoal?.replace("_", " ") ||
                            "Improve Health"}
                  </span>
                </div>
                {primaryGoal.targetWeight && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Target Weight:</span>
                    <span className="font-semibold text-text-primary">
                      {primaryGoal.targetWeight} {personalInfo.weightUnit}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-600">Activity Level:</span>
                  <span className="font-semibold text-text-primary capitalize">
                    {activityLevel.activityLevel?.replace("_", " ") ||
                      "Moderate"}
                  </span>
                </div>
              </div>
            </Card>

            {/* Daily Targets */}
            <Card className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={20} className="text-orange-600" />
                <h3 className="font-semibold text-text-primary">
                  Daily Targets
                </h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {dailyCalories.toLocaleString()}
                </div>
                <div className="text-sm text-neutral-600 mb-4">
                  kcal per day
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="text-center">
                    <div className="font-semibold text-red-600">
                      {macroDistribution.proteinGrams || 100}g
                    </div>
                    <div className="text-neutral-600">Protein</div>
                    <div className="text-xs text-neutral-500">
                      {macroDistribution.proteinPercent || 20}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">
                      {macroDistribution.carbGrams || 250}g
                    </div>
                    <div className="text-neutral-600">Carbs</div>
                    <div className="text-xs text-neutral-500">
                      {macroDistribution.carbsPercent || 50}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-orange-600">
                      {macroDistribution.fatGrams || 67}g
                    </div>
                    <div className="text-neutral-600">Fat</div>
                    <div className="text-xs text-neutral-500">
                      {macroDistribution.fatPercent || 30}%
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Preferences Summary */}
            <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="text-center">
                <h3 className="font-semibold text-text-primary mb-4">
                  🎯 Your Personalized Setup
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-text-primary">
                      {trackingCount} metrics
                    </div>
                    <div className="text-neutral-600">to track</div>
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">
                      {mealPreferences.mealCount || 3} meals
                    </div>
                    <div className="text-neutral-600">per day</div>
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">
                      {dietaryPreferences.dietType === "none"
                        ? "All foods"
                        : dietaryPreferences.dietType?.replace("_", " ") ||
                          "Balanced"}
                    </div>
                    <div className="text-neutral-600">diet style</div>
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">
                      {enabledNotifications} reminders
                    </div>
                    <div className="text-neutral-600">enabled</div>
                  </div>
                </div>
                {connectedApps > 0 && (
                  <div className="mt-3 text-center">
                    <div className="font-medium text-brand-primary">
                      {connectedApps} health app{connectedApps !== 1 ? "s" : ""}{" "}
                      connected
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Get Started Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="pt-6"
          >
            <Button
              onClick={handleGetStarted}
              className="w-full gradient-bg text-white h-14 font-semibold text-lg rounded-xl hover:shadow-lg transition-shadow"
            >
              Start Using MacroMate 🚀
            </Button>
          </motion.div>

          {/* Edit Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-center text-sm text-neutral-600"
          >
            <p className="flex items-center justify-center gap-1">
              <Edit size={14} />
              You can update any of these settings anytime in your Profile
            </p>
          </motion.div>

          {/* Fun Fact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="text-center text-sm text-neutral-600"
          >
            <p>
              🎉 You've joined over 1 million people on their health journey!
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
