import { useState } from "react";
import { Dumbbell, Calendar, Zap, Timer, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WorkoutGenerator } from "@/components/ai/WorkoutGenerator";
import { Card } from "@/components/ui/card";

export default function Workout() {
  const [activeTab, setActiveTab] = useState<"ai" | "calendar" | "history">(
    "ai",
  );

  const tabs = [
    { id: "ai", label: "AI Generate", icon: Brain },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "history", label: "History", icon: Timer },
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
            Workout Module
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            AI-powered fitness planning and tracking
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
                      ? "bg-gradient-to-r from-success to-warning text-white shadow-sm"
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
          {activeTab === "ai" && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <WorkoutGenerator />
            </motion.div>
          )}

          {activeTab === "calendar" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-success to-warning flex items-center justify-center">
                <Calendar size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                Workout Calendar
              </h2>
              <p className="text-neutral-600 mb-8 max-w-sm mx-auto">
                Plan and schedule your workouts with smart recommendations based
                on your recovery status.
              </p>

              <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
                <Card className="p-4 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-success" />
                    <span className="text-sm font-medium text-text-primary">
                      Weekly Planner
                    </span>
                  </div>
                </Card>
                <Card className="p-4 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <Zap size={20} className="text-success" />
                    <span className="text-sm font-medium text-text-primary">
                      Smart Scheduling
                    </span>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-warning to-brand-secondary flex items-center justify-center">
                <Timer size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                Workout History
              </h2>
              <p className="text-neutral-600 mb-8 max-w-sm mx-auto">
                Track your progress with detailed session analytics and
                performance trends.
              </p>

              <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
                <Card className="p-4 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <Timer size={20} className="text-warning" />
                    <span className="text-sm font-medium text-text-primary">
                      Session Analytics
                    </span>
                  </div>
                </Card>
                <Card className="p-4 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <Dumbbell size={20} className="text-warning" />
                    <span className="text-sm font-medium text-text-primary">
                      Performance Trends
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
