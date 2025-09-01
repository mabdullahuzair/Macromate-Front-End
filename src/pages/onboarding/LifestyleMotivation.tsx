import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Eye,
  Heart,
  Trophy,
  Bell,
  BellOff,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Motivation = "appearance" | "health" | "performance" | "other";

interface MotivationOption {
  id: Motivation;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
}

const motivationOptions: MotivationOption[] = [
  {
    id: "appearance",
    title: "Appearance",
    description: "Look and feel better in my body",
    icon: Eye,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
  {
    id: "health",
    title: "Health",
    description: "Improve overall health and prevent disease",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: "performance",
    title: "Athletic Performance",
    description: "Enhance physical performance and endurance",
    icon: Trophy,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    id: "other",
    title: "Other",
    description: "I have my own reasons",
    icon: Star,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

export default function LifestyleMotivation() {
  const navigate = useNavigate();
  const [selectedMotivation, setSelectedMotivation] =
    useState<Motivation | null>(null);
  const [customMotivation, setCustomMotivation] = useState("");
  const [wantsReminders, setWantsReminders] = useState<boolean | null>(null);

  const handleContinue = () => {
    if (selectedMotivation && wantsReminders !== null) {
      const motivationData = {
        primaryMotivation: selectedMotivation,
        customMotivation:
          selectedMotivation === "other" ? customMotivation : "",
        wantsReminders,
      };

      localStorage.setItem(
        "macromate_lifestyle_motivation",
        JSON.stringify(motivationData),
      );
      navigate("/onboarding/units-preference");
    }
  };

  const isFormValid = () => {
    if (!selectedMotivation || wantsReminders === null) return false;
    if (selectedMotivation === "other" && !customMotivation.trim())
      return false;
    return true;
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
                Motivation & Lifestyle
              </h1>
              <Progress value={80} className="w-24 h-1 mt-2" />
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
              <Star size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              What motivates you?
            </h2>
            <p className="text-neutral-600">
              Understanding your motivation helps us provide better support and
              keep you engaged on your journey.
            </p>
          </div>

          {/* Motivation Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-text-primary">
              What's your primary motivation for using this app?
            </h3>
            <div className="space-y-3">
              {motivationOptions.map((option, index) => {
                const Icon = option.icon;
                const isSelected = selectedMotivation === option.id;

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
                      onClick={() => setSelectedMotivation(option.id)}
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

            {/* Custom Motivation Input */}
            {selectedMotivation === "other" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3"
              >
                <Label className="text-sm font-medium text-text-primary">
                  Please tell us what motivates you
                </Label>
                <Input
                  type="text"
                  value={customMotivation}
                  onChange={(e) => setCustomMotivation(e.target.value)}
                  placeholder="e.g., Feel more confident, set a good example for my kids..."
                  className="h-12 mt-2"
                />
              </motion.div>
            )}
          </div>

          {/* Reminders Preference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-text-primary">
              Would you like reminders and motivational messages?
            </h3>
            <p className="text-sm text-neutral-600 -mt-2">
              We can send gentle reminders to log meals, drink water, and
              motivational tips to keep you on track.
            </p>

            <div className="space-y-3">
              <Card
                className={`p-4 cursor-pointer transition-all ${
                  wantsReminders === true
                    ? "border-brand-primary bg-brand-primary/5 border-2"
                    : "hover:border-neutral-200 border"
                }`}
                onClick={() => setWantsReminders(true)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                    <Bell size={24} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">
                      Yes, I'd like reminders
                    </h4>
                    <p className="text-sm text-neutral-600">
                      Help me stay on track with gentle notifications
                    </p>
                  </div>
                  {wantsReminders === true && (
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

              <Card
                className={`p-4 cursor-pointer transition-all ${
                  wantsReminders === false
                    ? "border-brand-primary bg-brand-primary/5 border-2"
                    : "hover:border-neutral-200 border"
                }`}
                onClick={() => setWantsReminders(false)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-neutral-50 flex items-center justify-center">
                    <BellOff size={24} className="text-neutral-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">
                      No reminders
                    </h4>
                    <p className="text-sm text-neutral-600">
                      I'll track on my own schedule
                    </p>
                  </div>
                  {wantsReminders === false && (
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
            </div>
          </motion.div>

          {/* Encouragement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  🎯 You're doing great!
                </h4>
                <p className="text-sm text-neutral-600">
                  Having a clear motivation is one of the strongest predictors
                  of success. We're here to support you every step of the way!
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-4"
          >
            <Button
              onClick={handleContinue}
              disabled={!isFormValid()}
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
