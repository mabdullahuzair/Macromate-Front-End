import { useState } from "react";
import { TrendingUp, Award, Brain, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AIInsights } from "@/components/ai/AIInsights";
import { Card } from "@/components/ui/card";

export default function Progress() {
  const [activeTab, setActiveTab] = useState<
    "insights" | "metrics" | "achievements"
  >("insights");

  const tabs = [
    { id: "insights", label: "AI Insights", icon: Brain },
    { id: "metrics", label: "Metrics", icon: BarChart3 },
    { id: "achievements", label: "Achievements", icon: Award },
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
          <h1 className="text-xl font-bold text-text-primary">
            Progress & Insights
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            AI-powered health analytics and trends
          </p>
        </div>
      </motion.header>

      {/* Tab Navigation */}
      <div className="px-4 py-4 max-w-lg mx-auto">
        <div className="bg-white rounded-lg p-1 shadow-sm border border-neutral-100">
          <div className="grid grid-cols-3 gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-warning to-brand-secondary text-white shadow-sm"
                      : "text-neutral-600 hover:text-text-primary"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <main className="px-4 pb-8 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "insights" && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <AIInsights />
            </motion.div>
          )}

          {activeTab === "metrics" && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-warning to-brand-secondary flex items-center justify-center">
                <BarChart3 size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                Health Metrics
              </h2>
              <p className="text-neutral-600 mb-8 max-w-sm mx-auto">
                Detailed charts and analytics for weight, calories, steps,
                sleep, and more with trend analysis.
              </p>

              <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
                <Card className="p-4 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <TrendingUp size={20} className="text-warning" />
                    <span className="text-sm font-medium text-text-primary">
                      Weight Trends
                    </span>
                  </div>
                </Card>
                <Card className="p-4 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <BarChart3 size={20} className="text-warning" />
                    <span className="text-sm font-medium text-text-primary">
                      Calorie Analytics
                    </span>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-secondary to-brand-primary flex items-center justify-center">
                <Award size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                Achievements
              </h2>
              <p className="text-neutral-600 mb-8 max-w-sm mx-auto">
                Unlock badges and celebrate milestones on your health journey
                with gamified progress tracking.
              </p>

              <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
                <Card className="p-4 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <Award size={20} className="text-brand-primary" />
                    <span className="text-sm font-medium text-text-primary">
                      Badge Collection
                    </span>
                  </div>
                </Card>
                <Card className="p-4 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <TrendingUp size={20} className="text-brand-primary" />
                    <span className="text-sm font-medium text-text-primary">
                      Streak Tracking
                    </span>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
