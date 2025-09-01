import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const healthConditions = [
  {
    id: "diabetes_type1",
    label: "Diabetes (Type 1)",
    description: "Affects insulin production",
  },
  {
    id: "diabetes_type2",
    label: "Diabetes (Type 2)",
    description: "Affects blood sugar regulation",
  },
  {
    id: "thyroid_hypo",
    label: "Hypothyroidism",
    description: "Underactive thyroid gland",
  },
  {
    id: "thyroid_hyper",
    label: "Hyperthyroidism",
    description: "Overactive thyroid gland",
  },
  {
    id: "pcos",
    label: "PCOS",
    description: "Polycystic ovary syndrome",
  },
  {
    id: "hypertension",
    label: "High Blood Pressure",
    description: "Elevated blood pressure",
  },
  {
    id: "high_cholesterol",
    label: "High Cholesterol",
    description: "Elevated blood cholesterol levels",
  },
  {
    id: "heart_disease",
    label: "Heart Disease",
    description: "Cardiovascular conditions",
  },
  {
    id: "kidney_disease",
    label: "Kidney Disease",
    description: "Chronic kidney conditions",
  },
  {
    id: "celiac",
    label: "Celiac Disease",
    description: "Gluten intolerance disorder",
  },
];

export default function HealthConditions() {
  const navigate = useNavigate();
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [otherConditions, setOtherConditions] = useState("");
  const [takingMedications, setTakingMedications] = useState<boolean | null>(
    null,
  );
  const [medications, setMedications] = useState("");

  const handleContinue = () => {
    const healthData = {
      conditions: selectedConditions,
      otherConditions,
      takingMedications,
      medications: takingMedications ? medications : "",
    };

    localStorage.setItem(
      "macromate_health_conditions",
      JSON.stringify(healthData),
    );
    navigate("/onboarding/lifestyle-motivation");
  };

  const handleConditionToggle = (conditionId: string) => {
    setSelectedConditions((prev) =>
      prev.includes(conditionId)
        ? prev.filter((id) => id !== conditionId)
        : [...prev, conditionId],
    );
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
                Health Information
              </h1>
              <Progress value={70} className="w-24 h-1 mt-2" />
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
              <Heart size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Health conditions
            </h2>
            <p className="text-neutral-600">
              This helps us provide more accurate recommendations. All
              information is completely optional and kept private.
            </p>
          </div>

          {/* Privacy Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-text-primary">
                    Your privacy is protected
                  </h4>
                  <p className="text-sm text-neutral-600">
                    This information is encrypted and never shared. You can skip
                    this section if you prefer.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Medical Conditions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">
              Do you have any of these medical conditions? (Optional)
            </h3>

            <div className="space-y-3">
              {healthConditions.map((condition, index) => (
                <motion.div
                  key={condition.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.03 }}
                  className="flex items-start space-x-3"
                >
                  <Checkbox
                    id={condition.id}
                    checked={selectedConditions.includes(condition.id)}
                    onCheckedChange={() => handleConditionToggle(condition.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={condition.id}
                      className="text-sm font-medium text-text-primary cursor-pointer"
                    >
                      {condition.label}
                    </Label>
                    <p className="text-xs text-neutral-600 mt-1">
                      {condition.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* None option */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-3 pt-2 border-t border-neutral-200"
              >
                <Checkbox
                  id="none"
                  checked={selectedConditions.includes("none")}
                  onCheckedChange={() => {
                    if (selectedConditions.includes("none")) {
                      setSelectedConditions([]);
                    } else {
                      setSelectedConditions(["none"]);
                    }
                  }}
                />
                <Label
                  htmlFor="none"
                  className="text-sm font-medium text-text-primary cursor-pointer"
                >
                  None of the above
                </Label>
              </motion.div>
            </div>

            {/* Other Conditions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-text-primary">
                Other conditions (optional)
              </Label>
              <Input
                type="text"
                value={otherConditions}
                onChange={(e) => setOtherConditions(e.target.value)}
                placeholder="e.g., Fibromyalgia, IBS, etc."
                className="h-12"
              />
            </motion.div>
          </div>

          {/* Medications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-text-primary">
              Are you currently taking any medications?
            </h3>

            <div className="space-y-3">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={takingMedications === true ? "default" : "outline"}
                  onClick={() => setTakingMedications(true)}
                  className="flex-1 h-12"
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  variant={takingMedications === false ? "default" : "outline"}
                  onClick={() => {
                    setTakingMedications(false);
                    setMedications("");
                  }}
                  className="flex-1 h-12"
                >
                  No
                </Button>
              </div>

              {takingMedications === true && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <Label className="text-sm font-medium text-text-primary">
                    Please list your medications (optional)
                  </Label>
                  <Input
                    type="text"
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    placeholder="e.g., Metformin, Levothyroxine, etc."
                    className="h-12"
                  />
                  <p className="text-xs text-neutral-600">
                    This helps us provide more accurate calorie and nutrition
                    recommendations.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  ⚠️ Important Disclaimer
                </h4>
                <p className="text-sm text-neutral-600">
                  This app provides general nutrition information only. Always
                  consult your healthcare provider before making dietary
                  changes, especially if you have medical conditions.
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
              className="w-full gradient-bg text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow"
            >
              Continue
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
