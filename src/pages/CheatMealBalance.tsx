import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Brain,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  Sparkles,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CheatMealBalance() {
  const navigate = useNavigate();
  const [isAccepted, setIsAccepted] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);

  // Sample data - in real app this would come from API
  const todayIntake = 2310; // 110% of 2100 target
  const targetCalories = 2100;
  const overage = todayIntake - targetCalories;
  const tomorrowTarget = targetCalories - Math.round(overage * 0.7); // AI calculated adjustment

  const handleAccept = () => {
    setIsAccepted(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const aiInsights = [
    {
      icon: Brain,
      title: "Smart Adjustment",
      description:
        "Your tomorrow's target is reduced by 70% of today's overage for optimal balance.",
      confidence: 94,
    },
    {
      icon: TrendingUp,
      title: "Weekly Pattern",
      description:
        "You typically exceed calories on weekends. Consider lighter breakfast tomorrow.",
      confidence: 87,
    },
    {
      icon: Clock,
      title: "Timing Optimization",
      description:
        "Your metabolism is highest at 2 PM. Schedule your largest meal then tomorrow.",
      confidence: 91,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-neutral-100"
      >
        <div className="px-4 py-4 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <ArrowLeft size={20} className="text-neutral-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-text-primary">
                Cheat-Meal Balance
              </h1>
              <p className="text-sm text-neutral-600">
                AI-powered calorie adjustment
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Alert Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-6 border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={24} className="text-warning" />
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  Calorie Goal Exceeded
                </h2>
                <p className="text-sm text-neutral-600">
                  {Math.round((todayIntake / targetCalories - 1) * 100)}% over
                  today's target
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Today's Intake</span>
                <span className="font-bold text-warning">
                  {todayIntake.toLocaleString()} cal
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-neutral-600">Target</span>
                <span className="font-medium text-neutral-700">
                  {targetCalories.toLocaleString()} cal
                </span>
              </div>
              <div className="flex justify-between items-center mt-1 pt-2 border-t border-neutral-100">
                <span className="text-sm font-medium text-neutral-700">
                  Overage
                </span>
                <span className="font-bold text-red-600">+{overage} cal</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Seesaw Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold text-text-primary mb-6">
              Balance Adjustment
            </h3>

            {/* Seesaw SVG Illustration */}
            <div className="relative mb-6">
              <svg viewBox="0 0 300 120" className="w-full h-24 mx-auto">
                {/* Fulcrum */}
                <polygon
                  points="140,90 150,70 160,90"
                  fill="#64748B"
                  className="drop-shadow-sm"
                />

                {/* Seesaw beam - tilted */}
                <motion.line
                  x1="80"
                  y1="80"
                  x2="220"
                  y2="65"
                  stroke="#1F3042"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -5 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ transformOrigin: "150px 72px" }}
                />

                {/* Today (heavier side) */}
                <motion.g
                  initial={{ y: 0 }}
                  animate={{ y: 8 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <rect
                    x="70"
                    y="60"
                    width="40"
                    height="25"
                    rx="4"
                    fill="#FFB259"
                    className="drop-shadow-sm"
                  />
                  <text
                    x="90"
                    y="77"
                    textAnchor="middle"
                    fontSize="10"
                    fill="white"
                    fontWeight="600"
                  >
                    Today
                  </text>
                </motion.g>

                {/* Tomorrow (lighter side) */}
                <motion.g
                  initial={{ y: 0 }}
                  animate={{ y: -5 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <rect
                    x="190"
                    y="50"
                    width="40"
                    height="20"
                    rx="4"
                    fill="#3AB795"
                    className="drop-shadow-sm"
                  />
                  <text
                    x="210"
                    y="63"
                    textAnchor="middle"
                    fontSize="10"
                    fill="white"
                    fontWeight="600"
                  >
                    Tomorrow
                  </text>
                </motion.g>
              </svg>
            </div>

            <p className="text-sm text-neutral-600 mb-4">
              Our AI balances your calorie intake across days for sustainable
              progress
            </p>
          </Card>
        </motion.div>

        {/* AI Recommendation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                <Brain size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">
                  AI Recommendation
                </h3>
                <p className="text-xs text-neutral-600">
                  Powered by your personal data
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">
                  Tomorrow's Target
                </span>
                <div className="flex items-center gap-2">
                  <Target size={16} className="text-brand-primary" />
                  <span className="font-bold text-brand-primary">
                    {tomorrowTarget.toLocaleString()} cal
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Adjustment</span>
                <span className="font-medium text-success">
                  -{Math.abs(tomorrowTarget - targetCalories)} cal
                </span>
              </div>

              <div className="pt-2 border-t border-neutral-100">
                <p className="text-xs text-neutral-600">
                  This 70% reduction helps maintain your weekly calorie average
                  while allowing flexibility.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* AI Insights Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => setShowAIInsights(!showAIInsights)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-neutral-100 hover:border-neutral-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Sparkles size={20} className="text-brand-primary" />
              <span className="font-medium text-text-primary">
                View AI Insights
              </span>
            </div>
            <motion.div
              animate={{ rotate: showAIInsights ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <TrendingUp size={16} className="text-neutral-400" />
            </motion.div>
          </button>
        </motion.div>

        {/* AI Insights Panel */}
        <AnimatePresence>
          {showAIInsights && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              {aiInsights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon size={16} className="text-brand-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-text-primary">
                              {insight.title}
                            </h4>
                            <span className="text-xs text-success font-medium">
                              {insight.confidence}% confident
                            </span>
                          </div>
                          <p className="text-sm text-neutral-600">
                            {insight.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3 pt-4"
        >
          <AnimatePresence mode="wait">
            {!isAccepted ? (
              <motion.div
                key="buttons"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-3"
              >
                <Button
                  onClick={handleAccept}
                  className="w-full gradient-bg text-white font-medium py-4 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle size={20} />
                    Accept AI Recommendation
                  </div>
                </Button>

                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="w-full py-4 rounded-lg"
                >
                  Keep Original Target
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-success flex items-center justify-center"
                >
                  <CheckCircle size={32} className="text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Balance Accepted!
                </h3>
                <p className="text-neutral-600">
                  Your targets have been updated. Tomorrow's goal:{" "}
                  {tomorrowTarget.toLocaleString()} calories
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
