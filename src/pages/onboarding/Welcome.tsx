import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Target, BarChart3, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Target,
    title: "Personalized Goals",
    description: "Custom calorie and macro targets based on your goals",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: BarChart3,
    title: "Smart Tracking",
    description: "Easy meal logging with AI-powered food recognition",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Heart,
    title: "Health Insights",
    description: "Progress tracking and actionable health recommendations",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
];

export default function Welcome() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleGetStarted = () => {
    navigate("/onboarding/personal-info");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="safe-area-pt p-4"
      >
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center"
          >
            <span className="text-3xl font-bold text-white">M</span>
          </motion.div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Welcome Message */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-text-primary mb-4"
            >
              Welcome to MacroMate! 🎉
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-neutral-600 mb-2"
            >
              Your AI-powered nutrition companion
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-neutral-500"
            >
              Let's create a personalized plan that fits your lifestyle and
              helps you achieve your health goals.
            </motion.p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl font-semibold text-text-primary text-center mb-6"
            >
              What we'll personalize for you:
            </motion.h2>

            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Card className="p-4 border border-neutral-200 hover:border-brand-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center`}
                      >
                        <Icon size={24} className={feature.color} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary">
                          {feature.title}
                        </h3>
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

          {/* Setup Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-center"
          >
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles size={20} className="text-amber-600" />
                <h3 className="font-semibold text-amber-800">Quick Setup</h3>
              </div>
              <p className="text-sm text-amber-700 mb-4">
                We'll ask you a few questions to create your perfect nutrition
                plan. This takes just 2-3 minutes.
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-amber-600">
                <span>📊 Your Goals</span>
                <span>📏 Body Metrics</span>
                <span>🍽️ Food Preferences</span>
              </div>
            </Card>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="pt-4"
          >
            <Button
              onClick={handleGetStarted}
              className="w-full gradient-bg text-white h-14 font-semibold text-lg rounded-xl hover:shadow-lg transition-shadow"
            >
              Start Setup
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-center text-sm text-neutral-500"
          >
            <p>
              🔒 Your data is private and secure. You can update preferences
              anytime.
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
