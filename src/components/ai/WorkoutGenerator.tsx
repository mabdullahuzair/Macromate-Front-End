import { useState } from "react";
import {
  Brain,
  Dumbbell,
  Clock,
  Target,
  Zap,
  RefreshCw,
  Play,
  Users,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  muscle: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  equipment: string;
}

interface Workout {
  id: string;
  name: string;
  duration: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  focus: string[];
  exercises: Exercise[];
  estimatedCalories: number;
  aiReason: string;
}

export function WorkoutGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [preferences, setPreferences] = useState({
    duration: 30,
    focus: "strength",
    difficulty: "intermediate",
  });

  const mockWorkout: Workout = {
    id: "ai-workout-001",
    name: "AI Upper Body Power",
    duration: 30,
    difficulty: "Intermediate",
    focus: ["Chest", "Arms", "Shoulders"],
    estimatedCalories: 180,
    aiReason:
      "Based on your recent lower body session yesterday, focusing on upper body for balanced recovery.",
    exercises: [
      {
        id: "1",
        name: "Push-ups",
        sets: 3,
        reps: "8-12",
        muscle: "Chest",
        difficulty: "Intermediate",
        equipment: "Bodyweight",
      },
      {
        id: "2",
        name: "Pike Push-ups",
        sets: 3,
        reps: "6-10",
        muscle: "Shoulders",
        difficulty: "Intermediate",
        equipment: "Bodyweight",
      },
      {
        id: "3",
        name: "Tricep Dips",
        sets: 3,
        reps: "8-12",
        muscle: "Triceps",
        difficulty: "Intermediate",
        equipment: "Chair/Bench",
      },
      {
        id: "4",
        name: "Plank to Push-up",
        sets: 2,
        reps: "5-8",
        muscle: "Core + Chest",
        difficulty: "Advanced",
        equipment: "Bodyweight",
      },
    ],
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setWorkout(null);

    // Simulate AI generation
    setTimeout(() => {
      setWorkout(mockWorkout);
      setIsGenerating(false);
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-success/10 text-success";
      case "Intermediate":
        return "bg-warning/10 text-warning";
      case "Advanced":
        return "bg-red-100 text-red-600";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Generator Interface */}
      <Card className="p-6 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
            <Brain size={32} className="text-white" />
          </div>

          <h3 className="text-xl font-bold text-text-primary mb-2">
            AI Workout Generator
          </h3>
          <p className="text-neutral-600">
            Personalized routines based on your progress and preferences
          </p>
        </div>

        {/* Preferences */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Duration: {preferences.duration} minutes
            </label>
            <div className="flex gap-2">
              {[15, 30, 45, 60].map((duration) => (
                <button
                  key={duration}
                  onClick={() =>
                    setPreferences((prev) => ({ ...prev, duration }))
                  }
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    preferences.duration === duration
                      ? "bg-brand-primary text-white"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:border-brand-primary"
                  }`}
                >
                  {duration}m
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Focus Area
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["strength", "cardio", "flexibility", "balance"].map((focus) => (
                <button
                  key={focus}
                  onClick={() => setPreferences((prev) => ({ ...prev, focus }))}
                  className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    preferences.focus === focus
                      ? "bg-brand-primary text-white"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:border-brand-primary"
                  }`}
                >
                  {focus}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full gradient-bg text-white font-medium py-3 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <RefreshCw size={20} className="animate-spin" />
              Generating Workout...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Zap size={20} />
              Generate AI Workout
            </div>
          )}
        </Button>
      </Card>

      {/* Generation Animation */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="p-6 text-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center"
              >
                <Brain size={24} className="text-white" />
              </motion.div>

              <h4 className="font-semibold text-text-primary mb-2">
                AI Analyzing Your Data...
              </h4>
              <p className="text-sm text-neutral-600 mb-4">
                Creating the perfect workout based on your history and goals
              </p>

              <div className="space-y-2">
                {[
                  "Analyzing previous workouts...",
                  "Checking recovery status...",
                  "Optimizing exercise selection...",
                  "Calculating intensity levels...",
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.5 }}
                    className="text-xs text-neutral-500 text-left"
                  >
                    ✓ {step}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Workout */}
      <AnimatePresence>
        {workout && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Workout Header */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">
                      {workout.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Clock size={16} />
                      {workout.duration} minutes
                      <span>•</span>
                      <TrendingUp size={16} />
                      {workout.estimatedCalories} calories
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(workout.difficulty)}>
                    {workout.difficulty}
                  </Badge>
                </div>

                <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain size={16} className="text-brand-primary" />
                    <span className="text-sm font-medium text-text-primary">
                      AI Recommendation
                    </span>
                  </div>
                  <p className="text-sm text-neutral-700">{workout.aiReason}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {workout.focus.map((focus, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {focus}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 gradient-bg text-white">
                    <Play size={16} className="mr-2" />
                    Start Workout
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <RefreshCw size={16} className="mr-2" />
                    Regenerate
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Exercise List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <h4 className="font-semibold text-text-primary px-1">
                Exercise Breakdown
              </h4>

              {workout.exercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-sm font-bold text-brand-primary">
                            {index + 1}
                          </div>
                          <div>
                            <h5 className="font-medium text-text-primary">
                              {exercise.name}
                            </h5>
                            <p className="text-sm text-neutral-600">
                              {exercise.muscle} • {exercise.equipment}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium text-neutral-700">
                            {exercise.sets} sets
                          </span>
                          <span className="font-medium text-neutral-700">
                            {exercise.reps} reps
                          </span>
                          <Badge
                            className={`${getDifficultyColor(exercise.difficulty)} text-xs`}
                          >
                            {exercise.difficulty}
                          </Badge>
                        </div>
                      </div>

                      <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
                        <RefreshCw size={16} className="text-neutral-400" />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
