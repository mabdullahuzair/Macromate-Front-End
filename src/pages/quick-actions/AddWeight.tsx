import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Scale,
  TrendingUp,
  TrendingDown,
  Calendar,
  Check,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function AddWeight() {
  const navigate = useNavigate();
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"lbs" | "kg">("lbs");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [notes, setNotes] = useState("");

  // Mock data
  const currentWeight = 165;
  const previousWeight = 167;
  const goalWeight = 160;
  const weightChange = currentWeight - previousWeight;

  const recentWeights = [
    { date: "2024-03-14", weight: 167 },
    { date: "2024-03-13", weight: 166.5 },
    { date: "2024-03-12", weight: 168 },
    { date: "2024-03-11", weight: 167.5 },
  ];

  const handleSaveWeight = () => {
    const weightValue = parseFloat(weight);
    if (weightValue > 0) {
      console.log("Saving weight:", {
        weight: weightValue,
        unit,
        date: selectedDate,
        notes,
      });
      navigate("/");
    }
  };

  const quickWeights = [
    currentWeight - 1,
    currentWeight,
    currentWeight + 1,
    currentWeight + 2,
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
                Add Weight
              </h1>
              <p className="text-sm text-neutral-600">
                Track your weight progress
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                <Scale size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Weight Progress
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-text-primary">
                    {currentWeight}
                  </div>
                  <div className="text-xs text-neutral-600">Current</div>
                </div>
                <div>
                  <div
                    className={`text-xl font-bold flex items-center justify-center gap-1 ${
                      weightChange < 0 ? "text-success" : "text-warning"
                    }`}
                  >
                    {weightChange < 0 ? (
                      <TrendingDown size={16} />
                    ) : (
                      <TrendingUp size={16} />
                    )}
                    {Math.abs(weightChange)}
                  </div>
                  <div className="text-xs text-neutral-600">Change</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-brand-primary">
                    {goalWeight}
                  </div>
                  <div className="text-xs text-neutral-600">Goal</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Weight Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold text-text-primary">
                  Today's Weight
                </Label>
                <div className="flex bg-neutral-100 rounded-lg p-1">
                  <button
                    onClick={() => setUnit("lbs")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      unit === "lbs"
                        ? "bg-white text-text-primary shadow-sm"
                        : "text-neutral-600"
                    }`}
                  >
                    lbs
                  </button>
                  <button
                    onClick={() => setUnit("kg")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      unit === "kg"
                        ? "bg-white text-text-primary shadow-sm"
                        : "text-neutral-600"
                    }`}
                  >
                    kg
                  </button>
                </div>
              </div>

              <div className="relative">
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={`Enter weight in ${unit}`}
                  className="text-center text-2xl h-16 font-bold"
                  step="0.1"
                  min="0"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 font-medium">
                  {unit}
                </div>
              </div>

              {/* Quick Select */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-600">
                  Quick Select
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {quickWeights.map((quickWeight) => (
                    <button
                      key={quickWeight}
                      onClick={() => setWeight(quickWeight.toString())}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        weight === quickWeight.toString()
                          ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                          : "border-neutral-200 text-neutral-700 hover:border-neutral-300"
                      }`}
                    >
                      <div className="text-sm font-medium">{quickWeight}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Date & Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label className="font-medium text-text-primary mb-2 block">
                  Date
                </Label>
                <div className="relative">
                  <Calendar
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                  />
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label className="font-medium text-text-primary mb-2 block">
                  Notes (Optional)
                </Label>
                <Input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about your weigh-in..."
                  className="resize-none"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recent Weights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="font-semibold text-text-primary mb-4">
              Recent Weights
            </h3>
            <div className="space-y-3">
              {recentWeights.map((entry, index) => (
                <motion.div
                  key={entry.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-text-primary">
                      {entry.weight} {unit}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  {index > 0 && (
                    <Badge
                      variant="outline"
                      className={`${
                        entry.weight < recentWeights[index - 1].weight
                          ? "text-success border-success/20 bg-success/5"
                          : "text-warning border-warning/20 bg-warning/5"
                      }`}
                    >
                      {entry.weight < recentWeights[index - 1].weight ? (
                        <TrendingDown size={12} className="mr-1" />
                      ) : (
                        <TrendingUp size={12} className="mr-1" />
                      )}
                      {Math.abs(
                        entry.weight - recentWeights[index - 1].weight,
                      ).toFixed(1)}
                    </Badge>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <Button
            onClick={handleSaveWeight}
            disabled={!weight || parseFloat(weight) <= 0}
            className="w-full gradient-bg text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
          >
            <Check size={16} className="mr-2" />
            Save Weight Entry
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
