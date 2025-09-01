import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, Ruler, Weight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type WeightUnit = "kg" | "lbs";
type HeightUnit = "cm" | "ft-in";
type EnergyUnit = "kcal" | "kJ";

interface UnitOption {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  options: { value: string; label: string; description: string }[];
}

const unitCategories: Record<string, UnitOption> = {
  weight: {
    title: "Weight",
    description: "How you prefer to measure body weight",
    icon: Weight,
    options: [
      { value: "kg", label: "Kilograms (kg)", description: "Metric system" },
      { value: "lbs", label: "Pounds (lbs)", description: "Imperial system" },
    ],
  },
  height: {
    title: "Height",
    description: "How you prefer to measure height",
    icon: Ruler,
    options: [
      { value: "cm", label: "Centimeters (cm)", description: "Metric system" },
      {
        value: "ft-in",
        label: "Feet & Inches",
        description: "Imperial system",
      },
    ],
  },
  energy: {
    title: "Energy",
    description: "How you prefer to measure calories",
    icon: Zap,
    options: [
      {
        value: "kcal",
        label: "Calories (kcal)",
        description: "Most common unit",
      },
      {
        value: "kJ",
        label: "Kilojoules (kJ)",
        description: "Scientific unit",
      },
    ],
  },
};

export default function UnitsPreference() {
  const navigate = useNavigate();
  const [selectedUnits, setSelectedUnits] = useState({
    weight: "lbs" as WeightUnit,
    height: "ft-in" as HeightUnit,
    energy: "kcal" as EnergyUnit,
  });

  // Get basic info to detect potential region preferences
  const basicInfo = JSON.parse(
    localStorage.getItem("macromate_basic_info") || "{}",
  );

  const handleContinue = () => {
    const unitsData = {
      weightUnit: selectedUnits.weight,
      heightUnit: selectedUnits.height,
      energyUnit: selectedUnits.energy,
    };

    localStorage.setItem(
      "macromate_units_preference",
      JSON.stringify(unitsData),
    );

    // Update basic info with final unit preferences
    if (basicInfo) {
      const updatedBasicInfo = {
        ...basicInfo,
        weightUnit: selectedUnits.weight,
        heightUnit: selectedUnits.height,
      };
      localStorage.setItem(
        "macromate_basic_info",
        JSON.stringify(updatedBasicInfo),
      );
    }

    navigate("/onboarding/final-complete");
  };

  const handleUnitChange = (category: string, value: string) => {
    setSelectedUnits((prev) => ({
      ...prev,
      [category]: value,
    }));
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
                Units Preference
              </h1>
              <Progress value={90} className="w-24 h-1 mt-2" />
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
              <Settings size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Preferred units
            </h2>
            <p className="text-neutral-600">
              Choose the measurement units you're most comfortable with. You can
              change these anytime in settings.
            </p>
          </div>

          {/* Units Selection */}
          <div className="space-y-6">
            {Object.entries(unitCategories).map(([category, config], index) => {
              const Icon = config.icon;
              const currentValue =
                selectedUnits[category as keyof typeof selectedUnits];

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                      <Icon size={20} className="text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        {config.title}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {config.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {config.options.map((option) => {
                      const isSelected = currentValue === option.value;

                      return (
                        <Card
                          key={option.value}
                          className={`p-4 cursor-pointer transition-all ${
                            isSelected
                              ? "border-brand-primary bg-brand-primary/5 border-2"
                              : "hover:border-neutral-200 border"
                          }`}
                          onClick={() =>
                            handleUnitChange(category, option.value)
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-text-primary">
                                {option.label}
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
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Current Settings Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 border-neutral-200">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-3">
                  📏 Your Settings Preview
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-brand-primary">
                      {selectedUnits.weight.toUpperCase()}
                    </div>
                    <div className="text-neutral-600">Weight</div>
                  </div>
                  <div>
                    <div className="font-semibold text-brand-primary">
                      {selectedUnits.height === "ft-in" ? "FT/IN" : "CM"}
                    </div>
                    <div className="text-neutral-600">Height</div>
                  </div>
                  <div>
                    <div className="font-semibold text-brand-primary">
                      {selectedUnits.energy.toUpperCase()}
                    </div>
                    <div className="text-neutral-600">Energy</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Regional Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  💡 Quick Tip
                </h4>
                <p className="text-sm text-neutral-600">
                  Most people prefer the units they grew up with. The app will
                  automatically convert between units as needed for calculations
                  and comparisons.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-4"
          >
            <Button
              onClick={handleContinue}
              className="w-full gradient-bg text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow"
            >
              Complete Setup
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
