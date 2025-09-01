import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Crown,
  Check,
  X,
  Sparkles,
  Brain,
  Camera,
  TrendingUp,
  Users,
  RotateCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type BillingPeriod = "monthly" | "annual";

interface Feature {
  name: string;
  free: boolean | string;
  pro: boolean | string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

export default function Subscription() {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [currentPlan] = useState("free"); // Current user plan

  const pricing = {
    monthly: { amount: 9.99, period: "month" },
    annual: { amount: 99.99, period: "year", savings: "17%" },
  };

  const features: Feature[] = [
    {
      name: "Basic food logging",
      free: true,
      pro: true,
    },
    {
      name: "Manual workout tracking",
      free: true,
      pro: true,
    },
    {
      name: "Basic progress charts",
      free: true,
      pro: true,
    },
    {
      name: "Health app integrations",
      free: "2 apps",
      pro: "Unlimited",
    },
    {
      name: "AI food recognition",
      free: "10/month",
      pro: "Unlimited",
      icon: Camera,
    },
    {
      name: "AI workout generator",
      free: false,
      pro: true,
      icon: Brain,
    },
    {
      name: "Advanced AI insights",
      free: false,
      pro: true,
      icon: TrendingUp,
    },
    {
      name: "Cheat meal balancer",
      free: false,
      pro: true,
      icon: Sparkles,
    },
    {
      name: "Detailed analytics",
      free: false,
      pro: true,
    },
    {
      name: "Custom meal plans",
      free: false,
      pro: true,
    },
    {
      name: "Priority support",
      free: false,
      pro: true,
    },
    {
      name: "Export data",
      free: false,
      pro: true,
    },
  ];

  const handleSubscribe = () => {
    console.log(`Subscribing to ${billingPeriod} plan`);
    // In real app, this would open payment flow
  };

  const handleRestorePurchases = () => {
    console.log("Restoring purchases...");
    // In real app, this would restore previous purchases
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
                Subscription
              </h1>
              <p className="text-sm text-neutral-600">
                Unlock the full potential of MacroMate
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                {currentPlan === "free" ? (
                  <Users size={24} className="text-white" />
                ) : (
                  <Crown size={24} className="text-white" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Current Plan:{" "}
                {currentPlan === "free" ? "Free" : "MacroMate Pro"}
              </h3>
              {currentPlan === "free" ? (
                <p className="text-sm text-neutral-600">
                  You're on the free plan. Upgrade to unlock AI-powered features
                  and advanced analytics.
                </p>
              ) : (
                <p className="text-sm text-neutral-600">
                  Your Pro subscription is active. Enjoy unlimited access to all
                  features!
                </p>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Billing Toggle */}
        {currentPlan === "free" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Label className="text-sm font-medium text-text-primary">
                    Monthly
                  </Label>
                  <Switch
                    checked={billingPeriod === "annual"}
                    onCheckedChange={(checked) =>
                      setBillingPeriod(checked ? "annual" : "monthly")
                    }
                  />
                  <Label className="text-sm font-medium text-text-primary">
                    Annual
                  </Label>
                </div>
                {billingPeriod === "annual" && (
                  <Badge className="bg-success/10 text-success border-success/20">
                    Save {pricing.annual.savings}
                  </Badge>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Pricing Card */}
        {currentPlan === "free" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 border-2 border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown size={24} className="text-brand-primary" />
                  <h3 className="text-2xl font-bold text-text-primary">
                    MacroMate Pro
                  </h3>
                </div>
                <div className="text-4xl font-bold text-text-primary mb-2">
                  ${pricing[billingPeriod].amount}
                  <span className="text-lg font-normal text-neutral-600">
                    /{pricing[billingPeriod].period}
                  </span>
                </div>
                {billingPeriod === "annual" && (
                  <p className="text-sm text-success font-medium">
                    Save ${(9.99 * 12 - 99.99).toFixed(2)} per year
                  </p>
                )}
              </div>

              <Button
                onClick={handleSubscribe}
                className="w-full gradient-bg text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow mb-4"
              >
                <Crown size={16} className="mr-2" />
                Upgrade to Pro
              </Button>

              <p className="text-xs text-center text-neutral-600">
                Start your 7-day free trial • Cancel anytime
              </p>
            </Card>
          </motion.div>
        )}

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6 text-center">
              What's Included
            </h3>

            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {Icon && (
                        <Icon size={16} className="text-brand-primary" />
                      )}
                      <span className="text-sm font-medium text-text-primary">
                        {feature.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Free Plan */}
                      <div className="text-center min-w-[60px]">
                        <div className="text-xs text-neutral-500 mb-1">
                          Free
                        </div>
                        {typeof feature.free === "boolean" ? (
                          feature.free ? (
                            <Check size={16} className="mx-auto text-success" />
                          ) : (
                            <X size={16} className="mx-auto text-neutral-400" />
                          )
                        ) : (
                          <span className="text-xs text-neutral-600">
                            {feature.free}
                          </span>
                        )}
                      </div>

                      {/* Pro Plan */}
                      <div className="text-center min-w-[60px]">
                        <div className="text-xs text-brand-primary mb-1 font-medium">
                          Pro
                        </div>
                        {typeof feature.pro === "boolean" ? (
                          feature.pro ? (
                            <Check size={16} className="mx-auto text-success" />
                          ) : (
                            <X size={16} className="mx-auto text-neutral-400" />
                          )
                        ) : (
                          <span className="text-xs text-brand-primary font-medium">
                            {feature.pro}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Restore Purchases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4">
            <Button
              onClick={handleRestorePurchases}
              variant="outline"
              className="w-full h-12"
            >
              <RotateCcw size={16} className="mr-2" />
              Restore Purchases
            </Button>
          </Card>
        </motion.div>

        {/* Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-4">
            <div className="text-center text-xs text-neutral-600 space-y-2">
              <p>
                Subscription automatically renews unless auto-renew is turned
                off at least 24-hours before the end of the current period.
              </p>
              <div className="flex justify-center gap-4">
                <button className="text-brand-primary hover:text-brand-secondary transition-colors">
                  Terms of Service
                </button>
                <button className="text-brand-primary hover:text-brand-secondary transition-colors">
                  Privacy Policy
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
