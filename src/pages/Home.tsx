import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalorieMacroRing } from "@/components/dashboard/CalorieMacroRing";
import { VitalsCards } from "@/components/dashboard/VitalsCards";
import { TodaysDiary } from "@/components/dashboard/TodaysDiary";
import { QuickAccess } from "@/components/dashboard/QuickAccess";
import { BMICalculator } from "@/components/dashboard/BMICalculator";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { DemoReset } from "@/components/DemoReset";
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Get user data from onboarding
  const userInfo = JSON.parse(
    localStorage.getItem("macromate_user_info") || "{}",
  );
  const goals = JSON.parse(localStorage.getItem("macromate_goals") || "{}");

  const userName = userInfo.name?.split(" ")[0] || "there";

  // Calculate target calories based on user's goals
  const calculateTargetCalories = () => {
    if (!userInfo.age || !userInfo.weight || !userInfo.height) return 2100;

    const weight = parseFloat(userInfo.weight);
    const age = parseInt(userInfo.age);
    let height = parseFloat(userInfo.height);

    // Convert height to cm if needed (rough conversion for demo)
    if (userInfo.heightUnit === "ft-in") {
      height = height * 30.48;
    }

    // Basic BMR calculation
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    const multiplier =
      activityMultipliers[
        goals.activityLevel as keyof typeof activityMultipliers
      ] || 1.55;
    const tdee = bmr * multiplier;

    // Adjust based on goal
    if (goals.goal === "lose") return Math.round(tdee - 500);
    if (goals.goal === "gain") return Math.round(tdee + 500);
    return Math.round(tdee);
  };

  const targetCalories = calculateTargetCalories();

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-neutral-100"
      >
        <div className="px-4 py-4 max-w-lg mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" alt={userName} />
                <AvatarFallback className="bg-gradient-to-br from-brand-primary to-brand-secondary text-white font-semibold">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-semibold text-text-primary">
                  {getGreeting()}, {userName}!
                </h1>
                <p className="text-sm text-neutral-600">
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                size={20}
                className={`text-neutral-600 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Calorie Macro Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CalorieMacroRing
            calories={1250}
            targetCalories={targetCalories}
            protein={95}
            targetProtein={Math.round((targetCalories * 0.25) / 4)} // 25% of calories from protein
            carbs={140}
            targetCarbs={Math.round((targetCalories * 0.45) / 4)} // 45% of calories from carbs
            fats={45}
            targetFats={Math.round((targetCalories * 0.3) / 9)} // 30% of calories from fats
          />
        </motion.div>

        {/* Vitals Cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <VitalsCards />
        </motion.div>

        {/* BMI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <BMICalculator />
        </motion.div>

        {/* Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <QuickAccess />
        </motion.div>

        {/* Today's Diary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <TodaysDiary />
        </motion.div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Demo Reset Button */}
      <DemoReset />
    </div>
  );
}
