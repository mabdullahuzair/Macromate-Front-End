import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Calendar, Ruler, Weight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
  { value: "custom", label: "Custom" },
];

export default function BasicInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    customGender: "",
    age: "",
    heightFeet: "",
    heightInches: "",
    heightCm: "",
    weight: "",
    heightUnit: "ft-in",
    weightUnit: "lbs",
  });

  const handleContinue = () => {
    if (
      formData.name &&
      formData.gender &&
      formData.age &&
      ((formData.heightUnit === "ft-in" &&
        formData.heightFeet &&
        formData.heightInches) ||
        (formData.heightUnit === "cm" && formData.heightCm)) &&
      formData.weight
    ) {
      // Calculate height in consistent format
      let height = "";
      if (formData.heightUnit === "ft-in") {
        height = `${formData.heightFeet}'${formData.heightInches}"`;
      } else {
        height = formData.heightCm;
      }

      const basicInfo = {
        name: formData.name,
        gender:
          formData.gender === "custom"
            ? formData.customGender
            : formData.gender,
        age: formData.age,
        height,
        weight: formData.weight,
        heightUnit: formData.heightUnit,
        weightUnit: formData.weightUnit,
      };

      localStorage.setItem("macromate_basic_info", JSON.stringify(basicInfo));
      navigate("/onboarding/goal-setting");
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.gender &&
      (formData.gender !== "custom" || formData.customGender) &&
      formData.age &&
      ((formData.heightUnit === "ft-in" &&
        formData.heightFeet &&
        formData.heightInches) ||
        (formData.heightUnit === "cm" && formData.heightCm)) &&
      formData.weight
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
              onClick={() => navigate("/auth/signup")}
              className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <ArrowLeft size={20} className="text-neutral-600" />
            </button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-text-primary">
                Basic Information
              </h1>
              <Progress value={10} className="w-24 h-1 mt-2" />
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
              Let's start with some basic information to personalize your
              experience.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-text-primary">
                What's your name?
              </Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your full name"
                className="h-12"
              />
            </motion.div>

            {/* Gender */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-text-primary">
                Gender
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {formData.gender === "custom" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2"
                >
                  <Input
                    type="text"
                    value={formData.customGender}
                    onChange={(e) =>
                      setFormData({ ...formData, customGender: e.target.value })
                    }
                    placeholder="Please specify"
                    className="h-12"
                  />
                </motion.div>
              )}
            </motion.div>

            {/* Age */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-text-primary">
                Age
              </Label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                placeholder="Enter your age"
                className="h-12"
                min="13"
                max="120"
              />
            </motion.div>

            {/* Height */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-text-primary">
                Height
              </Label>

              {/* Unit Toggle */}
              <div className="flex gap-2 mb-3">
                <Button
                  type="button"
                  variant={
                    formData.heightUnit === "ft-in" ? "default" : "outline"
                  }
                  onClick={() =>
                    setFormData({ ...formData, heightUnit: "ft-in" })
                  }
                  className="flex-1 h-10"
                >
                  ft/in
                </Button>
                <Button
                  type="button"
                  variant={formData.heightUnit === "cm" ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, heightUnit: "cm" })}
                  className="flex-1 h-10"
                >
                  cm
                </Button>
              </div>

              {formData.heightUnit === "ft-in" ? (
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
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-text-primary">
                Current Weight
              </Label>

              {/* Unit Toggle */}
              <div className="flex gap-2 mb-3">
                <Button
                  type="button"
                  variant={
                    formData.weightUnit === "lbs" ? "default" : "outline"
                  }
                  onClick={() =>
                    setFormData({ ...formData, weightUnit: "lbs" })
                  }
                  className="flex-1 h-10"
                >
                  lbs
                </Button>
                <Button
                  type="button"
                  variant={formData.weightUnit === "kg" ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, weightUnit: "kg" })}
                  className="flex-1 h-10"
                >
                  kg
                </Button>
              </div>

              <div className="relative">
                <Input
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  placeholder={formData.weightUnit === "lbs" ? "150" : "68"}
                  className="h-12 pr-12"
                  step="0.1"
                  min="50"
                  max={formData.weightUnit === "lbs" ? "800" : "363"}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm">
                  {formData.weightUnit}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
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
