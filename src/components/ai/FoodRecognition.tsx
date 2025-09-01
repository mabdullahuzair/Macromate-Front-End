import { useState } from "react";
import {
  Camera,
  Sparkles,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RecognitionResult {
  dish: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  alternatives: string[];
}

export function FoodRecognition() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [portion, setPortion] = useState(1);

  // Simulate AI recognition
  const mockRecognition = (): RecognitionResult => ({
    dish: "Grilled Chicken Caesar Salad",
    confidence: 94,
    calories: 450,
    protein: 35,
    carbs: 12,
    fats: 28,
    alternatives: [
      "Chicken Caesar Wrap",
      "Grilled Chicken Salad",
      "Caesar Salad with Protein",
    ],
  });

  const handleScan = async () => {
    setIsScanning(true);
    setResult(null);

    // Simulate API call delay
    setTimeout(() => {
      setResult(mockRecognition());
      setIsScanning(false);
    }, 2500);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-success";
    if (confidence >= 75) return "text-warning";
    return "text-red-500";
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 90) return "bg-success/10 border-success/20";
    if (confidence >= 75) return "bg-warning/10 border-warning/20";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className="space-y-6">
      {/* Camera Interface */}
      <Card className="p-6 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
            <Camera size={32} className="text-white" />
          </div>

          <h3 className="text-xl font-bold text-text-primary mb-2">
            AI Food Recognition
          </h3>
          <p className="text-neutral-600 mb-6">
            Take a photo and let our AI identify your meal with nutritional data
          </p>

          <Button
            onClick={handleScan}
            disabled={isScanning}
            className="gradient-bg text-white font-medium px-8 py-3 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
          >
            {isScanning ? (
              <div className="flex items-center gap-2">
                <RefreshCw size={20} className="animate-spin" />
                Analyzing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles size={20} />
                Scan Food
              </div>
            )}
          </Button>
        </div>
      </Card>

      {/* Scanning Animation */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="p-6 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center"
              >
                <Sparkles size={24} className="text-white" />
              </motion.div>

              <h4 className="font-semibold text-text-primary mb-2">
                AI Processing Image...
              </h4>
              <p className="text-sm text-neutral-600">
                Identifying ingredients and calculating nutrition
              </p>

              {/* Progress dots */}
              <div className="flex justify-center gap-1 mt-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-brand-primary"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recognition Result */}
      <AnimatePresence>
        {result && !isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Confidence Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <Card className={`p-4 ${getConfidenceBg(result.confidence)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {result.confidence >= 75 ? (
                      <CheckCircle
                        size={20}
                        className={getConfidenceColor(result.confidence)}
                      />
                    ) : (
                      <AlertCircle
                        size={20}
                        className={getConfidenceColor(result.confidence)}
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-text-primary">
                        {result.dish}
                      </h4>
                      <p className="text-sm text-neutral-600">AI Identified</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-lg font-bold ${getConfidenceColor(result.confidence)}`}
                    >
                      {result.confidence}%
                    </span>
                    <p className="text-xs text-neutral-500">confidence</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Nutrition Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-text-primary">
                    Nutritional Information
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-600">Portion:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPortion(Math.max(0.5, portion - 0.5))}
                        className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-600 text-sm font-bold hover:bg-neutral-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="min-w-[2rem] text-center font-medium">
                        {portion}x
                      </span>
                      <button
                        onClick={() => setPortion(portion + 0.5)}
                        className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-600 text-sm font-bold hover:bg-neutral-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-neutral-50 rounded-lg">
                    <div className="text-2xl font-bold text-text-primary">
                      {Math.round(result.calories * portion)}
                    </div>
                    <div className="text-sm text-neutral-600">Calories</div>
                  </div>

                  <div className="text-center p-3 bg-neutral-50 rounded-lg">
                    <div className="text-2xl font-bold text-success">
                      {Math.round(result.protein * portion)}g
                    </div>
                    <div className="text-sm text-neutral-600">Protein</div>
                  </div>

                  <div className="text-center p-3 bg-neutral-50 rounded-lg">
                    <div className="text-2xl font-bold text-warning">
                      {Math.round(result.carbs * portion)}g
                    </div>
                    <div className="text-sm text-neutral-600">Carbs</div>
                  </div>

                  <div className="text-center p-3 bg-neutral-50 rounded-lg">
                    <div className="text-2xl font-bold text-brand-primary">
                      {Math.round(result.fats * portion)}g
                    </div>
                    <div className="text-sm text-neutral-600">Fats</div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button className="flex-1 gradient-bg text-white">
                    Save to Diary
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Edit Details
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Alternative Suggestions */}
            {result.confidence < 90 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="p-4">
                  <h5 className="font-medium text-text-primary mb-3">
                    Not quite right? Try these alternatives:
                  </h5>
                  <div className="space-y-2">
                    {result.alternatives.map((alt, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors text-sm text-neutral-700"
                      >
                        {alt}
                      </button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
