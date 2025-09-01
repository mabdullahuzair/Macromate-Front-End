import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Sparkles, Target, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Complete() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>({});
  const [goals, setGoals] = useState<any>({});

  useEffect(() => {
    // Load user data
    const info = JSON.parse(
      localStorage.getItem("macromate_user_info") || "{}",
    );
    const goalData = JSON.parse(
      localStorage.getItem("macromate_goals") || "{}",
    );
    setUserInfo(info);
    setGoals(goalData);

    // Mark onboarding as complete
    localStorage.setItem("macromate_onboarding_complete", "true");
  }, []);

  const handleGetStarted = () => {
    navigate("/");
  };

  const calculateBMI = () => {
    if (!userInfo.weight || !userInfo.height) return 0;

    const weight = parseFloat(userInfo.weight);
    const height = parseFloat(userInfo.height);

    let heightInMeters = height;

    // Convert height to meters
    if (userInfo.heightUnit === "ft-in") {
      if (height.toString().includes("'")) {
        const heightStr = height.toString();
        const feet = parseInt(heightStr.split("'")[0] || "0");
        const inches = parseInt(
          heightStr.split("'")[1]?.replace('"', "") || "0",
        );
        heightInMeters = (feet * 12 + inches) * 0.0254;
      } else {
        heightInMeters = height * 0.3048;
      }
    } else {
      heightInMeters = height / 100;
    }

    // Convert weight to kg if needed
    let weightInKg = weight;
    if (userInfo.weightUnit === "lbs") {
      weightInKg = weight * 0.453592;
    }

    return weightInKg / (heightInMeters * heightInMeters);
  };

  const currentBMI = calculateBMI();

  const features = [
    {
      icon: Sparkles,
      title: "AI Food Recognition",
      description: "Snap photos to instantly log meals",
    },
    {
      icon: Target,
      title: "Smart Goal Tracking",
      description: "Personalized calorie and macro targets",
    },
    {
      icon: Users,
      title: "Health App Integration",
      description: "Sync with your favorite fitness apps",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 flex flex-col">
      {/* Content */}
      <main className="flex-1 px-4 py-8 max-w-lg mx-auto w-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 text-center"
        >
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-success to-green-600 flex items-center justify-center">
              <CheckCircle size={48} className="text-white" />
            </div>
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-text-primary mb-4">
              Welcome to MacroMate, {userInfo.name?.split(" ")[0] || "there"}!
              🎉
            </h1>
            <p className="text-lg text-neutral-600 mb-2">
              Your personalized health journey starts now
            </p>
            <p className="text-sm text-neutral-500">
              We've set up everything based on your {goals.goal} weight goal
            </p>
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-brand-primary/20">
              <h3 className="font-semibold text-text-primary mb-4">
                Your Profile
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-3 bg-neutral-50 rounded-lg">
                  <div className="font-bold text-text-primary">
                    {userInfo.age}
                  </div>
                  <div className="text-neutral-600">years old</div>
                </div>
                <div className="text-center p-3 bg-neutral-50 rounded-lg">
                  <div className="font-bold text-text-primary">
                    {userInfo.weight} {userInfo.weightUnit}
                  </div>
                  <div className="text-neutral-600">current weight</div>
                </div>
                <div className="text-center p-3 bg-neutral-50 rounded-lg">
                  <div className="font-bold text-text-primary">
                    {userInfo.height}
                  </div>
                  <div className="text-neutral-600">height</div>
                </div>
                <div className="text-center p-3 bg-neutral-50 rounded-lg">
                  <div className="font-bold text-brand-primary">
                    {currentBMI > 0 ? currentBMI.toFixed(1) : "N/A"}
                  </div>
                  <div className="text-neutral-600">current BMI</div>
                </div>
              </div>

              {goals.goal !== "maintain" && goals.targetWeight && (
                <div className="mt-4 p-4 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-lg">
                  <h4 className="font-medium text-text-primary mb-2 text-center">
                    Your Goal
                  </h4>
                  <div className="flex items-center justify-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-brand-primary">
                        {goals.targetWeight} {userInfo.weightUnit}
                      </div>
                      <div className="text-neutral-600">target weight</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-success capitalize">
                        {goals.goal} weight
                      </div>
                      <div className="text-neutral-600">goal type</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-warning">
                        {goals.timeline} weeks
                      </div>
                      <div className="text-neutral-600">timeline</div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-text-primary">
              What's waiting for you:
            </h3>
            <div className="space-y-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <Card className="p-4 bg-white/60 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                          <Icon size={20} className="text-brand-primary" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-medium text-text-primary">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-neutral-600">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
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
              className="w-full gradient-bg text-white h-14 font-semibold text-lg rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
            >
              Start My Health Journey 🚀
            </Button>

            <p className="text-xs text-neutral-500 mt-4">
              You can always update your goals and preferences in Settings
            </p>
          </motion.div>
        </motion.div>
      </main>

      {/* Confetti Animation Effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>
    </div>
  );
}
