import { useState } from "react";
import { Sparkles, Info, Sliders } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

export function CheatMealSettings() {
  const [settings, setSettings] = useState({
    autoBalance: true,
    threshold: 110,
    adjustment: 70,
    notifications: true,
  });

  const handleThresholdChange = (value: number[]) => {
    setSettings({ ...settings, threshold: value[0] });
  };

  const handleAdjustmentChange = (value: number[]) => {
    setSettings({ ...settings, adjustment: value[0] });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
          <Sparkles size={20} className="text-warning" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            Cheat Meal Balancer
          </h3>
          <p className="text-sm text-neutral-600">
            Smart calorie adjustment settings
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Auto Balance Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium text-text-primary">
              Auto Balance
            </Label>
            <p className="text-sm text-neutral-600">
              Automatically suggest balance when over target
            </p>
          </div>
          <Switch
            checked={settings.autoBalance}
            onCheckedChange={(checked) =>
              setSettings({ ...settings, autoBalance: checked })
            }
          />
        </div>

        {/* Threshold Setting */}
        <motion.div
          initial={{ opacity: settings.autoBalance ? 1 : 0.5 }}
          animate={{ opacity: settings.autoBalance ? 1 : 0.5 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <Label className="font-medium text-text-primary">
              Trigger Threshold
            </Label>
            <Badge variant="outline" className="text-xs">
              {settings.threshold}% of goal
            </Badge>
          </div>
          <p className="text-sm text-neutral-600">
            Show cheat meal balance when calories exceed this percentage
          </p>
          <Slider
            value={[settings.threshold]}
            onValueChange={handleThresholdChange}
            min={105}
            max={150}
            step={5}
            disabled={!settings.autoBalance}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-neutral-500">
            <span>105%</span>
            <span>150%</span>
          </div>
        </motion.div>

        {/* Adjustment Percentage */}
        <motion.div
          initial={{ opacity: settings.autoBalance ? 1 : 0.5 }}
          animate={{ opacity: settings.autoBalance ? 1 : 0.5 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <Label className="font-medium text-text-primary">
              Balance Adjustment
            </Label>
            <Badge variant="outline" className="text-xs">
              {settings.adjustment}% reduction
            </Badge>
          </div>
          <p className="text-sm text-neutral-600">
            How much to reduce tomorrow's calories
          </p>
          <Slider
            value={[settings.adjustment]}
            onValueChange={handleAdjustmentChange}
            min={50}
            max={100}
            step={5}
            disabled={!settings.autoBalance}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-neutral-500">
            <span>50%</span>
            <span>100%</span>
          </div>
        </motion.div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium text-text-primary">
              Notifications
            </Label>
            <p className="text-sm text-neutral-600">
              Get notified when balance is suggested
            </p>
          </div>
          <Switch
            checked={settings.notifications}
            onCheckedChange={(checked) =>
              setSettings({ ...settings, notifications: checked })
            }
          />
        </div>

        {/* Info Box */}
        <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info
              size={16}
              className="text-brand-primary mt-0.5 flex-shrink-0"
            />
            <div className="text-sm">
              <p className="text-text-primary font-medium mb-1">How it works</p>
              <p className="text-neutral-600">
                When you exceed your calorie goal, our AI calculates a balanced
                reduction for the next day to maintain your weekly average while
                allowing flexibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
