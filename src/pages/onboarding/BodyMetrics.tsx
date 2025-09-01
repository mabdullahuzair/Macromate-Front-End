import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Ruler, Weight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function BodyMetrics() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    heightFeet: "",
    heightInches: "",
    heightCm: "",
    weight: "",
  });

  // Get personal info from previous step
  const personalInfo = JSON.parse(
    localStorage.getItem("macromate_personal_info") || "{}",
  );

  const handleContinue = () => {
    // Validate based on unit preferences
    const isHeightValid =
      personalInfo.heightUnit === "ft-in"
        ? formData.heightFeet && formData.heightInches
        : formData.heightCm;

    if (isHeightValid && formData.weight) {
      // Format height consistently
      let height = "";
      if (personalInfo.heightUnit === "ft-in") {
        height = `${formData.heightFeet}'${formData.heightInches}"`;
      } else {
        height = formData.heightCm;
      }

      const bodyMetrics = {
        height,
        weight: formData.weight,
        heightUnit: personalInfo.heightUnit,
        weightUnit: personalInfo.weightUnit,
      };

      // Combine with personal info
      const completePersonalData = {
        ...personalInfo,
        ...bodyMetrics,
      };

      localStorage.setItem(
        "macromate_personal_info",
        JSON.stringify(completePersonalData),
      );
      navigate("/onboarding/select-goal");
    }
  };

  const isFormValid = () => {
    const isHeightValid =
      personalInfo.heightUnit === "ft-in"
        ? formData.heightFeet && formData.heightInches
        : formData.heightCm;
    return isHeightValid && formData.weight;
  };

  // Calculate BMI for feedback
  const calculateBMI = () => {
    if (!formData.weight) return null;

    let weightInKg = parseFloat(formData.weight);
    let heightInM = 0;

    // Convert weight to kg if needed
    if (personalInfo.weightUnit === "lbs") {
      weightInKg = weightInKg / 2.205;
    }

    // Convert height to meters
    if (personalInfo.heightUnit === "ft-in") {
      if (formData.heightFeet && formData.heightInches) {
        const feet = parseFloat(formData.heightFeet);
        const inches = parseFloat(formData.heightInches);
        heightInM = (feet * 12 + inches) * 0.0254;
      }
    } else {
      if (formData.heightCm) {
        heightInM = parseFloat(formData.heightCm) / 100;
      }
    }

    if (heightInM === 0) return null;
    return weightInKg / (heightInM * heightInM);
  };

  const bmi = calculateBMI();

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { label: "Normal", color: "text-green-600" };
    if (bmi < 30) return { label: "Overweight", color: "text-orange-600" };
    return { label: "Obese", color: "text-red-600" };
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
                Body Metrics
              </h1>
              <Progress value={26} className="w-24 h-1 mt-2" />
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
              <Ruler size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Your body metrics
            </h2>
            <p className="text-neutral-600">
              These measurements help us calculate accurate calorie and
              nutrition targets.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Height */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-text-primary">
                Height
              </Label>

              {personalInfo.heightUnit === "ft-in" ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-neutral-600">Feet</Label>
                    <Input
                      type="number"
                      value={formData.heightFeet}
                      onChange={(e) =>
                        setFormData({ ...formData, heightFeet: e.target.value })
                      }
                      placeholder="5"
                      className="h-12"
                      min="3"
                      max="8"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-neutral-600">Inches</Label>
                    <Input
                      type="number"
                      value={formData.heightInches}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          heightInches: e.target.value,
                        })
                      }
                      placeholder="9"
                      className="h-12"
                      min="0"
                      max="11"
                    />
                  </div>
                </div>
              ) : (
                <Input
                  type="number"
                  value={formData.heightCm}
                  onChange={(e) =>
                    setFormData({ ...formData, heightCm: e.target.value })
                  }
                  placeholder="175"
                  className="h-12"
                  min="100"
                  max="250"
                />
              )}
            </motion.div>

            {/* Weight */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-text-primary">
                Current Weight
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  placeholder={personalInfo.weightUnit === "lbs" ? "150" : "68"}
                  className="h-12 pr-12"
                  step="0.1"
                  min="50"
                  max={personalInfo.weightUnit === "lbs" ? "800" : "363"}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm">
                  {personalInfo.weightUnit}
                </span>
              </div>
            </motion.div>
          </div>

          {/* BMI Display */}
          {bmi && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
                <div className="text-center">
                  <h3 className="font-semibold text-text-primary mb-2">
                    Your BMI
                  </h3>
                  <div className="text-2xl font-bold text-brand-primary mb-1">
                    {bmi.toFixed(1)}
                  </div>
                  <div
                    className={`text-sm font-medium ${getBMICategory(bmi).color}`}
                  >
                    {getBMICategory(bmi).label}
                  </div>
                  <p className="text-xs text-neutral-600 mt-2">
                    BMI is a general health indicator. We'll create a
                    personalized plan based on your goals.
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Info Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  💡 Why we need this
                </h4>
                <p className="text-sm text-neutral-600">
                  Your height and weight help us calculate your Basal Metabolic
                  Rate (BMR) and determine accurate calorie targets for your
                  goals.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
