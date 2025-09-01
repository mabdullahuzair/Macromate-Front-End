import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Ruler, Scale, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function PersonalInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    heightUnit: "ft-in" as "ft-in" | "cm",
    weightUnit: "lbs" as "lbs" | "kg",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (
      !formData.age ||
      parseInt(formData.age) < 13 ||
      parseInt(formData.age) > 100
    ) {
      newErrors.age = "Please enter a valid age (13-100)";
    }
    if (!formData.height || parseFloat(formData.height) <= 0) {
      newErrors.height = "Please enter a valid height";
    }
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      newErrors.weight = "Please enter a valid weight";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Store user data (in real app, this would go to state management)
      localStorage.setItem("macromate_user_info", JSON.stringify(formData));
      navigate("/onboarding/goals");
    }
  };

  const formatHeight = (value: string) => {
    if (formData.heightUnit === "ft-in" && value.length >= 1) {
      // Auto-format as X'Y"
      const nums = value.replace(/[^0-9]/g, "");
      if (nums.length <= 1) return nums;
      if (nums.length === 2) return `${nums[0]}'${nums[1]}"`;
      return `${nums[0]}'${nums.slice(1, 3)}"`;
    }
    return value;
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
                Personal Info
              </h1>
              <Progress value={33} className="w-24 h-1 mt-2" />
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
              <User size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Tell us about yourself
            </h2>
            <p className="text-neutral-600">
              This helps us personalize your MacroMate experience and set
              accurate goals.
            </p>
          </div>

          {/* Form */}
          <Card className="p-6 space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-text-primary"
              >
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your name"
                className={`h-12 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label
                htmlFor="age"
                className="text-sm font-medium text-text-primary"
              >
                Age
              </Label>
              <div className="relative">
                <Calendar
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                />
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  placeholder="Enter your age"
                  className={`pl-10 h-12 ${errors.age ? "border-red-500" : ""}`}
                  min="13"
                  max="100"
                />
              </div>
              {errors.age && (
                <p className="text-xs text-red-500">{errors.age}</p>
              )}
            </div>

            {/* Height */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-text-primary">
                Height
              </Label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Ruler
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                  />
                  <Input
                    value={formatHeight(formData.height)}
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                    placeholder={
                      formData.heightUnit === "ft-in" ? "5'9\"" : "175"
                    }
                    className={`pl-10 h-12 ${errors.height ? "border-red-500" : ""}`}
                  />
                </div>
                <div className="flex bg-neutral-100 rounded-lg p-1">
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        heightUnit: "ft-in",
                        height: "",
                      })
                    }
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      formData.heightUnit === "ft-in"
                        ? "bg-white text-text-primary shadow-sm"
                        : "text-neutral-600"
                    }`}
                  >
                    ft/in
                  </button>
                  <button
                    onClick={() =>
                      setFormData({ ...formData, heightUnit: "cm", height: "" })
                    }
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      formData.heightUnit === "cm"
                        ? "bg-white text-text-primary shadow-sm"
                        : "text-neutral-600"
                    }`}
                  >
                    cm
                  </button>
                </div>
              </div>
              {errors.height && (
                <p className="text-xs text-red-500">{errors.height}</p>
              )}
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-text-primary">
                Weight
              </Label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Scale
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                  />
                  <Input
                    type="number"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    placeholder={formData.weightUnit === "lbs" ? "150" : "68"}
                    className={`pl-10 h-12 ${errors.weight ? "border-red-500" : ""}`}
                    step="0.1"
                  />
                </div>
                <div className="flex bg-neutral-100 rounded-lg p-1">
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        weightUnit: "lbs",
                        weight: "",
                      })
                    }
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      formData.weightUnit === "lbs"
                        ? "bg-white text-text-primary shadow-sm"
                        : "text-neutral-600"
                    }`}
                  >
                    lbs
                  </button>
                  <button
                    onClick={() =>
                      setFormData({ ...formData, weightUnit: "kg", weight: "" })
                    }
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      formData.weightUnit === "kg"
                        ? "bg-white text-text-primary shadow-sm"
                        : "text-neutral-600"
                    }`}
                  >
                    kg
                  </button>
                </div>
              </div>
              {errors.weight && (
                <p className="text-xs text-red-500">{errors.weight}</p>
              )}
            </div>
          </Card>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pt-4"
          >
            <Button
              onClick={handleContinue}
              className="w-full gradient-bg text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow"
            >
              Continue
            </Button>
          </motion.div>

          {/* Privacy Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <p className="text-xs text-neutral-500">
              🔒 Your information is kept private and secure
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
