import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Utensils,
  Leaf,
  Wheat,
  Fish,
  Clock,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type DietType =
  | "none"
  | "vegetarian"
  | "vegan"
  | "keto"
  | "low_carb"
  | "paleo"
  | "mediterranean"
  | "intermittent_fasting"
  | "custom";

interface DietOption {
  id: DietType;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
}

const dietOptions: DietOption[] = [
  {
    id: "none",
    title: "No Specific Diet",
    description: "I eat everything without restrictions",
    icon: Utensils,
    color: "text-neutral-600",
    bgColor: "bg-neutral-50",
    borderColor: "border-neutral-200",
  },
  {
    id: "vegetarian",
    title: "Vegetarian",
    description: "No meat, but includes dairy and eggs",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    id: "vegan",
    title: "Vegan",
    description: "No animal products at all",
    icon: Leaf,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    id: "keto",
    title: "Keto",
    description: "High fat, very low carb diet",
    icon: Heart,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    id: "low_carb",
    title: "Low-Carb",
    description: "Reduced carbohydrate intake",
    icon: Wheat,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    id: "paleo",
    title: "Paleo",
    description: "Whole foods, no processed foods",
    icon: Fish,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    id: "mediterranean",
    title: "Mediterranean",
    description: "Fish, olive oil, fruits, and vegetables",
    icon: Fish,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "intermittent_fasting",
    title: "Intermittent Fasting",
    description: "Time-restricted eating windows",
    icon: Clock,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  {
    id: "custom",
    title: "Custom Diet",
    description: "I follow my own eating plan",
    icon: Utensils,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
];

const commonAllergies = [
  { id: "dairy", label: "Dairy-free" },
  { id: "gluten", label: "Gluten-free" },
  { id: "nuts", label: "Nut allergy" },
  { id: "shellfish", label: "Shellfish allergy" },
  { id: "soy", label: "Soy allergy" },
  { id: "eggs", label: "Egg allergy" },
];

export default function DietaryPreferences() {
  const navigate = useNavigate();
  const [selectedDiet, setSelectedDiet] = useState<DietType | null>(null);
  const [customDiet, setCustomDiet] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [otherAllergies, setOtherAllergies] = useState("");

  const handleContinue = () => {
    if (selectedDiet) {
      const dietaryData = {
        dietType: selectedDiet,
        customDiet: selectedDiet === "custom" ? customDiet : "",
        allergies: selectedAllergies,
        otherAllergies,
      };

      localStorage.setItem(
        "macromate_dietary_preferences",
        JSON.stringify(dietaryData),
      );
      navigate("/onboarding/macro-distribution");
    }
  };

  const handleAllergyToggle = (allergyId: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergyId)
        ? prev.filter((id) => id !== allergyId)
        : [...prev, allergyId],
    );
  };

  const isFormValid = () => {
    if (!selectedDiet) return false;
    if (selectedDiet === "custom" && !customDiet.trim()) return false;
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
                Dietary Preferences
              </h1>
              <Progress value={40} className="w-24 h-1 mt-2" />
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
              <Utensils size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Dietary preferences
            </h2>
            <p className="text-neutral-600">
              Tell us about your eating style and any restrictions so we can
              personalize your recommendations.
            </p>
          </div>

          {/* Diet Type Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-text-primary">
              Do you follow a specific diet?
            </h3>
            <div className="space-y-2">
              {dietOptions.map((option, index) => {
                const Icon = option.icon;
                const isSelected = selectedDiet === option.id;

                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`p-3 cursor-pointer transition-all ${
                        isSelected
                          ? `${option.bgColor} ${option.borderColor} border-2`
                          : "hover:border-neutral-200 border"
                      }`}
                      onClick={() => setSelectedDiet(option.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg ${option.bgColor} flex items-center justify-center`}
                        >
                          <Icon size={20} className={option.color} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary">
                            {option.title}
                          </h4>
                          <p className="text-xs text-neutral-600">
                            {option.description}
                          </p>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Custom Diet Input */}
            {selectedDiet === "custom" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3"
              >
                <Label className="text-sm font-medium text-text-primary">
                  Please describe your custom diet
                </Label>
                <Input
                  type="text"
                  value={customDiet}
                  onChange={(e) => setCustomDiet(e.target.value)}
                  placeholder="e.g., Plant-based with occasional fish"
                  className="h-12 mt-2"
                />
              </motion.div>
            )}
          </div>

          {/* Allergies and Restrictions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-text-primary">
              Do you have any dietary restrictions or allergies?
            </h3>

            <div className="space-y-3">
              {commonAllergies.map((allergy, index) => (
                <motion.div
                  key={allergy.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center space-x-3"
                >
                  <Checkbox
                    id={allergy.id}
                    checked={selectedAllergies.includes(allergy.id)}
                    onCheckedChange={() => handleAllergyToggle(allergy.id)}
                  />
                  <Label
                    htmlFor={allergy.id}
                    className="text-sm font-medium text-text-primary cursor-pointer"
                  >
                    {allergy.label}
                  </Label>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <Label className="text-sm font-medium text-text-primary">
                  Other allergies or restrictions (optional)
                </Label>
                <Input
                  type="text"
                  value={otherAllergies}
                  onChange={(e) => setOtherAllergies(e.target.value)}
                  placeholder="e.g., Onions, garlic, specific foods..."
                  className="h-12"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Info Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  🔒 Privacy Note
                </h4>
                <p className="text-sm text-neutral-600">
                  Your dietary preferences are stored securely and used only to
                  customize your food recommendations and nutrition tracking.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
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
