import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Clock,
  Plus,
  Minus,
  Check,
  Utensils,
  Scan,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  serving: string;
}

const mockFoodItems: FoodItem[] = [
  {
    id: "1",
    name: "Chicken Breast",
    brand: "Fresh",
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    serving: "100g",
  },
  {
    id: "2",
    name: "Brown Rice",
    brand: "Uncle Ben's",
    calories: 123,
    protein: 2.6,
    carbs: 23,
    fats: 0.9,
    serving: "100g cooked",
  },
  {
    id: "3",
    name: "Greek Yogurt",
    brand: "Chobani",
    calories: 100,
    protein: 17,
    carbs: 6,
    fats: 0,
    serving: "170g",
  },
  {
    id: "4",
    name: "Avocado",
    brand: "Fresh",
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fats: 14.7,
    serving: "100g",
  },
];

export default function ManualMeal() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mealType, setMealType] = useState("lunch");

  const filteredFoods = mockFoodItems.filter(
    (food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.brand?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const mealTypes = [
    { id: "breakfast", label: "Breakfast", icon: "🌅" },
    { id: "lunch", label: "Lunch", icon: "☀️" },
    { id: "dinner", label: "Dinner", icon: "🌙" },
    { id: "snack", label: "Snack", icon: "🍎" },
  ];

  const handleAddFood = () => {
    if (selectedFood) {
      console.log("Adding food:", {
        food: selectedFood,
        quantity,
        mealType,
        totalCalories: selectedFood.calories * quantity,
      });
      // Navigate back or show success
      navigate("/");
    }
  };

  const adjustQuantity = (increment: boolean) => {
    setQuantity((prev) => {
      const newQuantity = increment ? prev + 0.5 : prev - 0.5;
      return Math.max(0.5, newQuantity);
    });
  };

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
                Manual Food Entry
              </h1>
              <p className="text-sm text-neutral-600">
                Search and add food to your diary
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Meal Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4">
            <Label className="text-sm font-medium text-text-primary mb-3 block">
              Meal Type
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {mealTypes.map((meal) => (
                <button
                  key={meal.id}
                  onClick={() => setMealType(meal.id)}
                  className={`p-3 rounded-lg text-center transition-all ${
                    mealType === meal.id
                      ? "bg-brand-primary text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  <div className="text-lg mb-1">{meal.icon}</div>
                  <div className="text-xs font-medium">{meal.label}</div>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4">
            <div className="space-y-4">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for food..."
                  className="pl-10 pr-10 h-12"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                  <Scan size={20} />
                </button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setSearchQuery("chicken")}
                >
                  Chicken
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setSearchQuery("rice")}
                >
                  Rice
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setSearchQuery("yogurt")}
                >
                  Yogurt
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Search Results */}
        <AnimatePresence>
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              <h3 className="font-semibold text-text-primary px-1">
                Search Results ({filteredFoods.length})
              </h3>
              {filteredFoods.map((food, index) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      selectedFood?.id === food.id
                        ? "ring-2 ring-brand-primary border-brand-primary"
                        : "hover:border-neutral-200"
                    }`}
                    onClick={() => setSelectedFood(food)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-text-primary">
                          {food.name}
                        </h4>
                        {food.brand && (
                          <p className="text-sm text-neutral-600">
                            {food.brand}
                          </p>
                        )}
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {food.calories} cal
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {food.serving}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right text-sm text-neutral-600">
                        <div>P: {food.protein}g</div>
                        <div>C: {food.carbs}g</div>
                        <div>F: {food.fats}g</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Food Details */}
        <AnimatePresence>
          {selectedFood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6 border-brand-primary/20 bg-brand-primary/5">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                      <Utensils size={20} className="text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        {selectedFood.name}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {selectedFood.brand} • {selectedFood.serving}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="space-y-3">
                    <Label className="font-medium text-text-primary">
                      Quantity
                    </Label>
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => adjustQuantity(false)}
                        className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50"
                      >
                        <Minus size={16} className="text-neutral-600" />
                      </button>
                      <div className="text-center min-w-[80px]">
                        <div className="text-2xl font-bold text-text-primary">
                          {quantity}x
                        </div>
                        <div className="text-xs text-neutral-600">servings</div>
                      </div>
                      <button
                        onClick={() => adjustQuantity(true)}
                        className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50"
                      >
                        <Plus size={16} className="text-neutral-600" />
                      </button>
                    </div>
                  </div>

                  {/* Nutrition Summary */}
                  <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-text-primary">
                        {Math.round(selectedFood.calories * quantity)}
                      </div>
                      <div className="text-xs text-neutral-600">Calories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-success">
                        {Math.round(selectedFood.protein * quantity * 10) / 10}g
                      </div>
                      <div className="text-xs text-neutral-600">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-warning">
                        {Math.round(selectedFood.carbs * quantity * 10) / 10}g
                      </div>
                      <div className="text-xs text-neutral-600">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-brand-primary">
                        {Math.round(selectedFood.fats * quantity * 10) / 10}g
                      </div>
                      <div className="text-xs text-neutral-600">Fats</div>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddFood}
                    className="w-full gradient-bg text-white h-12 font-medium"
                  >
                    <Check size={16} className="mr-2" />
                    Add to {mealTypes.find((m) => m.id === mealType)?.label}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Custom Food */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 border-dashed border-2 border-neutral-200">
            <div className="text-center">
              <Plus size={32} className="mx-auto mb-3 text-neutral-400" />
              <h4 className="font-semibold text-text-primary mb-2">
                Can't find your food?
              </h4>
              <p className="text-sm text-neutral-600 mb-4">
                Create a custom food entry with nutrition facts
              </p>
              <Button
                variant="outline"
                className="border-brand-primary/20 text-brand-primary hover:bg-brand-primary/5"
              >
                Create Custom Food
              </Button>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
