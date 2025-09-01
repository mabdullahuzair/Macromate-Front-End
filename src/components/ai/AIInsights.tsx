import { useState } from "react";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  Lightbulb,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Insight {
  id: string;
  type: "trend" | "prediction" | "recommendation" | "pattern";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  confidence: number;
  actionable: boolean;
  data?: {
    metric: string;
    change: number;
    period: string;
  };
}

export function AIInsights() {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  const insights: Insight[] = [
    {
      id: "1",
      type: "trend",
      title: "Weekend Calorie Pattern Detected",
      description:
        "You consume 15% more calories on weekends, primarily from carbohydrates during lunch hours.",
      impact: "medium",
      confidence: 92,
      actionable: true,
      data: {
        metric: "Weekend Calories",
        change: 15,
        period: "Last 8 weeks",
      },
    },
    {
      id: "2",
      type: "prediction",
      title: "Goal Achievement Forecast",
      description:
        "Based on current trends, you're on track to reach your weight goal 2 weeks earlier than planned.",
      impact: "high",
      confidence: 87,
      actionable: false,
      data: {
        metric: "Weight Loss",
        change: -3.2,
        period: "Next 4 weeks",
      },
    },
    {
      id: "3",
      type: "recommendation",
      title: "Protein Intake Optimization",
      description:
        "Increasing morning protein by 10g could improve your afternoon energy levels and reduce snacking.",
      impact: "medium",
      confidence: 84,
      actionable: true,
      data: {
        metric: "Morning Protein",
        change: 10,
        period: "Daily",
      },
    },
    {
      id: "4",
      type: "pattern",
      title: "Sleep-Exercise Correlation",
      description:
        "Your workout performance increases by 23% when you get 7+ hours of sleep the night before.",
      impact: "high",
      confidence: 95,
      actionable: true,
      data: {
        metric: "Workout Performance",
        change: 23,
        period: "With 7+ hours sleep",
      },
    },
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "trend":
        return TrendingUp;
      case "prediction":
        return Target;
      case "recommendation":
        return Lightbulb;
      case "pattern":
        return Calendar;
      default:
        return Brain;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "low":
        return "bg-neutral-100 text-neutral-600 border-neutral-200";
      default:
        return "bg-neutral-100 text-neutral-600 border-neutral-200";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-success";
    if (confidence >= 80) return "text-warning";
    return "text-neutral-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
            <Brain size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary">
              AI Health Insights
            </h3>
            <p className="text-sm text-neutral-600">
              Personalized analysis of your health patterns
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-lg font-bold text-text-primary">
              {insights.length}
            </div>
            <div className="text-xs text-neutral-600">Active Insights</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-lg font-bold text-success">
              {Math.round(
                insights.reduce((acc, i) => acc + i.confidence, 0) /
                  insights.length,
              )}
              %
            </div>
            <div className="text-xs text-neutral-600">Avg Confidence</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-lg font-bold text-brand-primary">
              {insights.filter((i) => i.actionable).length}
            </div>
            <div className="text-xs text-neutral-600">Actionable</div>
          </div>
        </div>
      </Card>

      {/* Insights List */}
      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = getInsightIcon(insight.type);
          const isSelected = selectedInsight === insight.id;

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-brand-primary border-brand-primary"
                    : "hover:border-neutral-200"
                }`}
                onClick={() =>
                  setSelectedInsight(isSelected ? null : insight.id)
                }
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-brand-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-text-primary pr-2">
                          {insight.title}
                        </h4>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span
                            className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}
                          >
                            {insight.confidence}%
                          </span>
                          <motion.div
                            animate={{ rotate: isSelected ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight
                              size={16}
                              className="text-neutral-400"
                            />
                          </motion.div>
                        </div>
                      </div>

                      <p className="text-sm text-neutral-600 mb-3">
                        {insight.description}
                      </p>

                      <div className="flex items-center gap-2">
                        <Badge
                          className={`text-xs capitalize ${getImpactColor(insight.impact)}`}
                        >
                          {insight.impact} impact
                        </Badge>

                        <Badge variant="outline" className="text-xs capitalize">
                          {insight.type}
                        </Badge>

                        {insight.actionable && (
                          <Badge className="text-xs bg-success/10 text-success border-success/20">
                            Actionable
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-neutral-100">
                          {insight.data && (
                            <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                              <h5 className="font-medium text-text-primary mb-2">
                                Data Analysis
                              </h5>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-neutral-600">
                                    Metric:
                                  </span>
                                  <div className="font-medium text-text-primary">
                                    {insight.data.metric}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-neutral-600">
                                    Change:
                                  </span>
                                  <div
                                    className={`font-medium flex items-center gap-1 ${
                                      insight.data.change > 0
                                        ? "text-brand-primary"
                                        : "text-success"
                                    }`}
                                  >
                                    {insight.data.change > 0 ? (
                                      <TrendingUp size={14} />
                                    ) : (
                                      <TrendingDown size={14} />
                                    )}
                                    {Math.abs(insight.data.change)}
                                    {insight.type === "prediction"
                                      ? "lbs"
                                      : insight.data.metric.includes("Protein")
                                        ? "g"
                                        : "%"}
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-neutral-600">
                                    Period:
                                  </span>
                                  <div className="font-medium text-text-primary">
                                    {insight.data.period}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {insight.actionable && (
                            <div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-lg p-4">
                              <h5 className="font-medium text-text-primary mb-2 flex items-center gap-2">
                                <Lightbulb
                                  size={16}
                                  className="text-brand-primary"
                                />
                                Recommended Action
                              </h5>
                              <p className="text-sm text-neutral-700 mb-3">
                                {insight.type === "trend" &&
                                  "Consider meal planning for weekends to maintain consistent calorie intake."}
                                {insight.type === "recommendation" &&
                                  "Add a protein-rich breakfast like Greek yogurt or eggs to your morning routine."}
                                {insight.type === "pattern" &&
                                  "Prioritize getting 7+ hours of sleep before workout days for optimal performance."}
                              </p>
                              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg text-sm font-medium hover:shadow-lg transition-shadow">
                                Apply Suggestion
                                <ArrowRight size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
