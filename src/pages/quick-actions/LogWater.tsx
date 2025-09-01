import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Droplets,
  Plus,
  Minus,
  Check,
  Coffee,
  Wine,
  Milk,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface DrinkOption {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  volume: number;
  color: string;
}

const drinkOptions: DrinkOption[] = [
  {
    id: "water",
    name: "Water",
    icon: Droplets,
    volume: 250,
    color: "text-blue-500",
  },
  {
    id: "coffee",
    name: "Coffee",
    icon: Coffee,
    volume: 200,
    color: "text-amber-600",
  },
  {
    id: "tea",
    name: "Tea",
    icon: Coffee,
    volume: 200,
    color: "text-green-600",
  },
  {
    id: "juice",
    name: "Juice",
    icon: Wine,
    volume: 200,
    color: "text-orange-500",
  },
];

export default function LogWater() {
  const navigate = useNavigate();
  const [selectedDrink, setSelectedDrink] = useState(drinkOptions[0]);
  const [volume, setVolume] = useState(250);
  const [dailyIntake, setDailyIntake] = useState(1200); // ml consumed today
  const dailyGoal = 2000; // ml

  const quickVolumes = [100, 200, 250, 500];

  const handleAddDrink = () => {
    const newIntake = dailyIntake + volume;
    setDailyIntake(newIntake);
    console.log("Adding drink:", {
      drink: selectedDrink.name,
      volume,
      totalIntake: newIntake,
    });
  };

  const adjustVolume = (increment: boolean) => {
    setVolume((prev) => {
      const newVolume = increment ? prev + 50 : prev - 50;
      return Math.max(50, Math.min(1000, newVolume));
    });
  };

  const progressPercentage = Math.min((dailyIntake / dailyGoal) * 100, 100);
  const remainingIntake = Math.max(0, dailyGoal - dailyIntake);

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
              <h1 className="text-xl font-bold text-text-primary">Log Water</h1>
              <p className="text-sm text-neutral-600">
                Track your daily hydration
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Daily Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center relative overflow-hidden">
                <Droplets size={32} className="text-white relative z-10" />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-blue-400/30"
                  initial={{ height: "0%" }}
                  animate={{ height: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Daily Hydration
              </h3>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">
                  {dailyIntake}ml
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="text-sm text-neutral-600">
                  {remainingIntake > 0
                    ? `${remainingIntake}ml remaining`
                    : "Goal achieved! 🎉"}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Drink Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <Label className="text-lg font-semibold text-text-primary mb-4 block">
              What are you drinking?
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {drinkOptions.map((drink) => {
                const Icon = drink.icon;
                return (
                  <button
                    key={drink.id}
                    onClick={() => {
                      setSelectedDrink(drink);
                      setVolume(drink.volume);
                    }}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      selectedDrink.id === drink.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <Icon size={24} className={`mx-auto mb-2 ${drink.color}`} />
                    <div className="font-medium text-text-primary">
                      {drink.name}
                    </div>
                    <div className="text-xs text-neutral-600">
                      {drink.volume}ml
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Volume Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-text-primary">
                Volume
              </Label>

              {/* Volume Adjuster */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => adjustVolume(false)}
                  className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
                >
                  <Minus size={20} className="text-neutral-600" />
                </button>
                <div className="text-center min-w-[120px]">
                  <div className="text-4xl font-bold text-text-primary">
                    {volume}
                  </div>
                  <div className="text-sm text-neutral-600">milliliters</div>
                </div>
                <button
                  onClick={() => adjustVolume(true)}
                  className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
                >
                  <Plus size={20} className="text-neutral-600" />
                </button>
              </div>

              {/* Quick Volume Options */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-600">
                  Quick Select
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {quickVolumes.map((quickVolume) => (
                    <button
                      key={quickVolume}
                      onClick={() => setVolume(quickVolume)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        volume === quickVolume
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-neutral-200 text-neutral-700 hover:border-neutral-300"
                      }`}
                    >
                      <div className="text-sm font-medium">{quickVolume}ml</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Water Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <h3 className="font-semibold text-text-primary mb-3">
              💡 Hydration Tips
            </h3>
            <div className="space-y-2 text-sm text-neutral-700">
              <p>• Drink water before, during, and after exercise</p>
              <p>• Start your day with a glass of water</p>
              <p>• Set reminders to drink water regularly</p>
              <p>• Monitor urine color as a hydration indicator</p>
            </div>
          </Card>
        </motion.div>

        {/* Recent Entries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h3 className="font-semibold text-text-primary mb-4">
              Today's Log
            </h3>
            <div className="space-y-3">
              {[
                { time: "8:30 AM", drink: "Water", amount: 250 },
                { time: "10:15 AM", drink: "Coffee", amount: 200 },
                { time: "12:30 PM", drink: "Water", amount: 300 },
                { time: "2:45 PM", drink: "Tea", amount: 200 },
                { time: "4:20 PM", drink: "Water", amount: 250 },
              ].map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Droplets size={16} className="text-blue-500" />
                    <div>
                      <div className="font-medium text-text-primary">
                        {entry.drink}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {entry.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-neutral-700">
                    {entry.amount}ml
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Add Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-4"
        >
          <Button
            onClick={handleAddDrink}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow"
          >
            <Check size={16} className="mr-2" />
            Add {volume}ml of {selectedDrink.name}
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
