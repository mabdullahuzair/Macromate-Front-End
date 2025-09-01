import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Calendar, Users } from "lucide-react";
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
];

export default function PersonalInfoSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    weightUnit: "lbs",
    heightUnit: "ft-in",
  });

  const handleContinue = () => {
    if (formData.fullName && formData.dateOfBirth && formData.gender) {
      // Calculate age from date of birth
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const finalAge =
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ? age - 1
          : age;

      // Check minimum age requirement
      if (finalAge < 13) {
        alert("You must be at least 13 years old to use MacroMate.");
        return;
      }

      const personalInfo = {
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        age: finalAge,
        gender: formData.gender,
        weightUnit: formData.weightUnit,
        heightUnit: formData.heightUnit,
      };

      localStorage.setItem(
        "macromate_personal_info",
        JSON.stringify(personalInfo),
      );
      navigate("/onboarding/body-metrics");
    }
  };

  const isFormValid = () => {
    return formData.fullName && formData.dateOfBirth && formData.gender;
  };

  // Calculate age for validation
  const getAge = () => {
    if (!formData.dateOfBirth) return 0;
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    return monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ? age - 1
      : age;
  };

  const currentAge = getAge();

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
                Personal Information
              </h1>
              <Progress value={13} className="w-24 h-1 mt-2" />
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
              Let's get to know you
            </h2>
            <p className="text-neutral-600">
              We need some basic information to personalize your experience.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-text-primary">
                Full Name
              </Label>
              <Input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Enter your full name"
                className="h-12"
              />
            </motion.div>

            {/* Date of Birth */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-text-primary">
                Date of Birth
              </Label>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                className="h-12"
                max={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 13),
                  )
                    .toISOString()
                    .split("T")[0]
                }
              />
              {formData.dateOfBirth && (
                <div className="text-sm text-neutral-600">
                  {currentAge >= 13 ? (
                    <span className="text-green-600">
                      ✓ Age: {currentAge} years old
                    </span>
                  ) : (
                    <span className="text-red-600">
                      ⚠ You must be at least 13 years old
                    </span>
                  )}
                </div>
              )}
            </motion.div>

            {/* Gender */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
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
            </motion.div>

            {/* Preferred Units */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-text-primary">
                Preferred Units
              </h3>

              {/* Weight Units */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-text-primary">
                  Weight Units
                </Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={
                      formData.weightUnit === "lbs" ? "default" : "outline"
                    }
                    onClick={() =>
                      setFormData({ ...formData, weightUnit: "lbs" })
                    }
                    className="flex-1 h-12"
                  >
                    Pounds (lbs)
                  </Button>
                  <Button
                    type="button"
                    variant={
                      formData.weightUnit === "kg" ? "default" : "outline"
                    }
                    onClick={() =>
                      setFormData({ ...formData, weightUnit: "kg" })
                    }
                    className="flex-1 h-12"
                  >
                    Kilograms (kg)
                  </Button>
                </div>
              </div>

              {/* Height Units */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-text-primary">
                  Height Units
                </Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={
                      formData.heightUnit === "ft-in" ? "default" : "outline"
                    }
                    onClick={() =>
                      setFormData({ ...formData, heightUnit: "ft-in" })
                    }
                    className="flex-1 h-12"
                  >
                    Feet & Inches
                  </Button>
                  <Button
                    type="button"
                    variant={
                      formData.heightUnit === "cm" ? "default" : "outline"
                    }
                    onClick={() =>
                      setFormData({ ...formData, heightUnit: "cm" })
                    }
                    className="flex-1 h-12"
                  >
                    Centimeters (cm)
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Privacy Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  🔒 Privacy First
                </h4>
                <p className="text-sm text-neutral-600">
                  Your personal information is encrypted and never shared. We
                  use this data only to calculate accurate nutrition
                  recommendations.
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
              disabled={!isFormValid() || currentAge < 13}
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
