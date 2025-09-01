import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChefHat, X, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const popularCuisines = [
  "Italian",
  "Mexican",
  "Chinese",
  "Indian",
  "Thai",
  "Japanese",
  "Mediterranean",
  "American",
  "French",
  "Korean",
  "Middle Eastern",
  "Vietnamese",
];

const commonDislikes = [
  "Seafood",
  "Mushrooms",
  "Onions",
  "Garlic",
  "Spicy food",
  "Cilantro",
  "Olives",
  "Tomatoes",
  "Avocado",
  "Cheese",
  "Eggs",
  "Nuts",
];

export default function FoodPreferences() {
  const navigate = useNavigate();
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [customCuisine, setCustomCuisine] = useState("");
  const [selectedDislikes, setSelectedDislikes] = useState<string[]>([]);
  const [customDislike, setCustomDislike] = useState("");

  const handleContinue = () => {
    const foodPreferencesData = {
      favoriteCuisines: selectedCuisines,
      foodDislikes: selectedDislikes,
    };

    localStorage.setItem(
      "macromate_food_preferences",
      JSON.stringify(foodPreferencesData),
    );
    navigate("/onboarding/tracking-preferences");
  };

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine],
    );
  };

  const handleDislikeToggle = (dislike: string) => {
    setSelectedDislikes((prev) =>
      prev.includes(dislike)
        ? prev.filter((d) => d !== dislike)
        : [...prev, dislike],
    );
  };

  const addCustomCuisine = () => {
    if (
      customCuisine.trim() &&
      !selectedCuisines.includes(customCuisine.trim())
    ) {
      setSelectedCuisines((prev) => [...prev, customCuisine.trim()]);
      setCustomCuisine("");
    }
  };

  const addCustomDislike = () => {
    if (
      customDislike.trim() &&
      !selectedDislikes.includes(customDislike.trim())
    ) {
      setSelectedDislikes((prev) => [...prev, customDislike.trim()]);
      setCustomDislike("");
    }
  };

  const removeCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) => prev.filter((c) => c !== cuisine));
  };

  const removeDislike = (dislike: string) => {
    setSelectedDislikes((prev) => prev.filter((d) => d !== dislike));
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
                Food Preferences
              </h1>
              <Progress value={50} className="w-24 h-1 mt-2" />
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
              <ChefHat size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Food preferences
            </h2>
            <p className="text-neutral-600">
              Help us understand your taste preferences to provide better meal
              suggestions. This is completely optional!
            </p>
          </div>

          {/* Favorite Cuisines */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">
              Any favorite cuisines? (Optional)
            </h3>

            {/* Selected Cuisines Display */}
            {selectedCuisines.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex flex-wrap gap-2"
              >
                {selectedCuisines.map((cuisine) => (
                  <Badge
                    key={cuisine}
                    variant="secondary"
                    className="px-3 py-1 bg-brand-primary/10 text-brand-primary border-brand-primary/20"
                  >
                    {cuisine}
                    <button
                      onClick={() => removeCuisine(cuisine)}
                      className="ml-2 hover:text-red-500 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </motion.div>
            )}

            {/* Cuisine Selection Grid */}
            <div className="grid grid-cols-2 gap-2">
              {popularCuisines.map((cuisine, index) => (
                <motion.button
                  key={cuisine}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleCuisineToggle(cuisine)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    selectedCuisines.includes(cuisine)
                      ? "bg-brand-primary/10 border-brand-primary text-brand-primary"
                      : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  {cuisine}
                </motion.button>
              ))}
            </div>

            {/* Custom Cuisine Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-2"
            >
              <Input
                type="text"
                value={customCuisine}
                onChange={(e) => setCustomCuisine(e.target.value)}
                placeholder="Add custom cuisine..."
                className="h-10"
                onKeyPress={(e) => e.key === "Enter" && addCustomCuisine()}
              />
              <Button
                onClick={addCustomCuisine}
                disabled={!customCuisine.trim()}
                variant="outline"
                size="sm"
                className="px-3 h-10"
              >
                <Plus size={16} />
              </Button>
            </motion.div>
          </div>

          {/* Food Dislikes */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">
              Any foods you dislike or want to avoid? (Optional)
            </h3>

            {/* Selected Dislikes Display */}
            {selectedDislikes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex flex-wrap gap-2"
              >
                {selectedDislikes.map((dislike) => (
                  <Badge
                    key={dislike}
                    variant="secondary"
                    className="px-3 py-1 bg-red-50 text-red-600 border-red-200"
                  >
                    {dislike}
                    <button
                      onClick={() => removeDislike(dislike)}
                      className="ml-2 hover:text-red-700 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </motion.div>
            )}

            {/* Dislikes Selection Grid */}
            <div className="grid grid-cols-2 gap-2">
              {commonDislikes.map((dislike, index) => (
                <motion.button
                  key={dislike}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.03 }}
                  onClick={() => handleDislikeToggle(dislike)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    selectedDislikes.includes(dislike)
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300"
                  }`}
                >
                  {dislike}
                </motion.button>
              ))}
            </div>

            {/* Custom Dislike Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-2"
            >
              <Input
                type="text"
                value={customDislike}
                onChange={(e) => setCustomDislike(e.target.value)}
                placeholder="Add food to avoid..."
                className="h-10"
                onKeyPress={(e) => e.key === "Enter" && addCustomDislike()}
              />
              <Button
                onClick={addCustomDislike}
                disabled={!customDislike.trim()}
                variant="outline"
                size="sm"
                className="px-3 h-10"
              >
                <Plus size={16} />
              </Button>
            </motion.div>
          </div>

          {/* Skip Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 border-neutral-200">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  💡 Don't worry!
                </h4>
                <p className="text-sm text-neutral-600">
                  You can always update these preferences later in your profile
                  settings. We'll use this to customize your meal
                  recommendations.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
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
