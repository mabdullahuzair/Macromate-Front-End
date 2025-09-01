import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Scale,
  Ruler,
  Thermometer,
  Bell,
  Moon,
  Sun,
  Monitor,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CheatMealSettings } from "@/components/settings/CheatMealSettings";

type WeightUnit = "kg" | "lbs";
type HeightUnit = "cm" | "ft-in";
type EnergyUnit = "kcal" | "kJ";
type Theme = "light" | "dark" | "system";

export default function Preferences() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    weightUnit: "lbs" as WeightUnit,
    heightUnit: "ft-in" as HeightUnit,
    energyUnit: "kcal" as EnergyUnit,
    theme: "system" as Theme,
    notifications: {
      meals: true,
      water: true,
      workout: false,
      bedtime: true,
      achievements: true,
    },
  });

  const unitSections = [
    {
      title: "Weight",
      icon: Scale,
      options: [
        { value: "kg", label: "Kilograms (kg)" },
        { value: "lbs", label: "Pounds (lbs)" },
      ],
      current: preferences.weightUnit,
      onChange: (value: WeightUnit) =>
        setPreferences({ ...preferences, weightUnit: value }),
    },
    {
      title: "Height",
      icon: Ruler,
      options: [
        { value: "cm", label: "Centimeters (cm)" },
        { value: "ft-in", label: "Feet & Inches (ft, in)" },
      ],
      current: preferences.heightUnit,
      onChange: (value: HeightUnit) =>
        setPreferences({ ...preferences, heightUnit: value }),
    },
    {
      title: "Energy",
      icon: Thermometer,
      options: [
        { value: "kcal", label: "Calories (kcal)" },
        { value: "kJ", label: "Kilojoules (kJ)" },
      ],
      current: preferences.energyUnit,
      onChange: (value: EnergyUnit) =>
        setPreferences({ ...preferences, energyUnit: value }),
    },
  ];

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const notificationSettings = [
    {
      key: "meals" as keyof typeof preferences.notifications,
      title: "Meal Reminders",
      description: "Get reminded to log your meals",
      icon: "🍽️",
    },
    {
      key: "water" as keyof typeof preferences.notifications,
      title: "Water Reminders",
      description: "Stay hydrated throughout the day",
      icon: "💧",
    },
    {
      key: "workout" as keyof typeof preferences.notifications,
      title: "Workout Reminders",
      description: "Never miss your scheduled workouts",
      icon: "💪",
    },
    {
      key: "bedtime" as keyof typeof preferences.notifications,
      title: "Bedtime Reminders",
      description: "Get better sleep with bedtime alerts",
      icon: "🛏️",
    },
    {
      key: "achievements" as keyof typeof preferences.notifications,
      title: "Achievement Alerts",
      description: "Celebrate your progress milestones",
      icon: "🏆",
    },
  ];

  const handleNotificationToggle = (
    key: keyof typeof preferences.notifications,
  ) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [key]: !preferences.notifications[key],
      },
    });
  };

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
                Preferences
              </h1>
              <p className="text-sm text-neutral-600">
                Customize your app experience
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Units */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Units of Measurement
            </h3>
            <div className="space-y-6">
              {unitSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className="text-neutral-600" />
                      <Label className="font-medium text-text-primary">
                        {section.title}
                      </Label>
                    </div>
                    <div className="grid grid-cols-2 gap-2 ml-8">
                      {section.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => section.onChange(option.value as any)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            section.current === option.value
                              ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                              : "border-neutral-200 hover:border-neutral-300 text-neutral-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {option.label}
                            </span>
                            {section.current === option.value && (
                              <Check size={16} className="text-brand-primary" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Appearance
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() =>
                      setPreferences({
                        ...preferences,
                        theme: option.value as Theme,
                      })
                    }
                    className={`p-4 rounded-lg border text-center transition-all ${
                      preferences.theme === option.value
                        ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                        : "border-neutral-200 hover:border-neutral-300 text-neutral-700"
                    }`}
                  >
                    <Icon size={24} className="mx-auto mb-2" />
                    <div className="text-sm font-medium">{option.label}</div>
                    {preferences.theme === option.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-2"
                      >
                        <Check
                          size={16}
                          className="mx-auto text-brand-primary"
                        />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell size={20} className="text-neutral-600" />
              <h3 className="text-lg font-semibold text-text-primary">
                Daily Reminders
              </h3>
            </div>
            <div className="space-y-4">
              {notificationSettings.map((setting, index) => (
                <motion.div
                  key={setting.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{setting.icon}</span>
                    <div>
                      <div className="font-medium text-text-primary">
                        {setting.title}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {setting.description}
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.notifications[setting.key]}
                    onCheckedChange={() =>
                      handleNotificationToggle(setting.key)
                    }
                  />
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Cheat Meal Balancer Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CheatMealSettings />
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <Button className="w-full gradient-bg text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow">
            Save Preferences
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
