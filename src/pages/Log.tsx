import { useState } from "react";
import { Camera, Search, BarChart3, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FoodRecognition } from "@/components/ai/FoodRecognition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Log() {
  const [activeTab, setActiveTab] = useState<"scan" | "search" | "timeline">(
    "scan",
  );

  const tabs = [
    { id: "scan", label: "AI Scan", icon: Brain },
    { id: "search", label: "Search", icon: Search },
    { id: "timeline", label: "Timeline", icon: BarChart3 },
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
          <h1 className="text-xl font-bold text-text-primary">Food Logging</h1>
          <p className="text-sm text-neutral-600 mt-1">
            Track your meals with AI-powered recognition
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
                      ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-sm"
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
          {activeTab === "scan" && (
            <motion.div
              key="scan"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <FoodRecognition />
            </motion.div>
          )}

          {activeTab === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-secondary to-brand-primary flex items-center justify-center">
                <Search size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                Manual Food Search
              </h2>
              <p className="text-neutral-600 mb-8 max-w-sm mx-auto">
                Search our comprehensive food database with barcode scanning and
                custom food creation.
              </p>

              <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
                <Card className="p-4 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <Search size={20} className="text-brand-primary" />
                    <span className="text-sm font-medium text-text-primary">
                      Search Database
                    </span>
                  </div>
                </Card>
                <Card className="p-4 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <Camera size={20} className="text-brand-primary" />
                    <span className="text-sm font-medium text-text-primary">
                      Barcode Scanner
                    </span>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "timeline" && (
            <motion.div
              key="timeline"
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
                Meal Timeline
              </h2>
              <p className="text-neutral-600 mb-8 max-w-sm mx-auto">
                View and edit your daily meal history with nutritional breakdown
                and photos.
              </p>

              <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
                <Card className="p-4 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <BarChart3 size={20} className="text-warning" />
                    <span className="text-sm font-medium text-text-primary">
                      Daily Timeline
                    </span>
                  </div>
                </Card>
                <Card className="p-4 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <Camera size={20} className="text-warning" />
                    <span className="text-sm font-medium text-text-primary">
                      Meal Photos
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
