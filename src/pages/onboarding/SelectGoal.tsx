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

type PrimaryGoal =
  | "lose"
  | "maintain"
  | "gain"
  | "healthy"
  | "fitness"
  | "muscle";

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
    id: "healthy",
    title: "Eat Healthier",
    description: "Make better food choices and improve nutrition",
    icon: Apple,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
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
    id: "muscle",
    title: "Build Muscle",
    description: "Increase muscle mass and strength",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
];

export default function SelectGoal() {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<PrimaryGoal | null>(null);

  const handleContinue = () => {
    if (selectedGoal) {
      const goalData = {
        primaryGoal: selectedGoal,
      };

      localStorage.setItem("macromate_primary_goal", JSON.stringify(goalData));

      // Navigate based on goal selection
      if (selectedGoal === "lose" || selectedGoal === "gain") {
        navigate("/onboarding/target-weight");
      } else {
        navigate("/onboarding/activity-level");
      }
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
                Select Your Goal
              </h1>
              <Progress value={39} className="w-24 h-1 mt-2" />
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
              Choose your main objective so we can create the perfect plan for
              you.
            </p>
          </div>

          {/* Goal Selection */}
          <div className="space-y-3">
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

          {/* Next Steps Preview */}
          {selectedGoal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 border-neutral-200">
                <div className="text-center">
                  <h4 className="font-medium text-text-primary mb-2">
                    📝 Next Steps
                  </h4>
                  <p className="text-sm text-neutral-600">
                    {selectedGoal === "lose" || selectedGoal === "gain"
                      ? `We'll help you set a realistic target weight and timeline for ${
                          selectedGoal === "lose"
                            ? "weight loss"
                            : "weight gain"
                        }.`
                      : "We'll calculate your daily calorie needs based on your activity level and create a personalized nutrition plan."}
                  </p>
                </div>
              </Card>
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
              disabled={!selectedGoal}
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
