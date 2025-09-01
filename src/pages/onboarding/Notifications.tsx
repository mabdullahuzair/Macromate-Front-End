import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Clock, Droplets, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  enabled: boolean;
  time?: string;
  color: string;
}

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "meal_logging",
      title: "Meal Logging Reminders",
      description: "Gentle reminders to log your meals",
      icon: Bell,
      enabled: true,
      time: "12:00",
      color: "text-blue-600",
    },
    {
      id: "water_intake",
      title: "Water Intake Reminders",
      description: "Stay hydrated throughout the day",
      icon: Droplets,
      enabled: true,
      time: "09:00",
      color: "text-cyan-600",
    },
    {
      id: "daily_checkin",
      title: "Daily Check-ins",
      description: "Review your progress and plan ahead",
      icon: Clock,
      enabled: false,
      time: "20:00",
      color: "text-green-600",
    },
    {
      id: "motivational",
      title: "Motivational Messages",
      description: "Encouraging tips and insights",
      icon: MessageCircle,
      enabled: false,
      time: "08:00",
      color: "text-purple-600",
    },
  ]);

  const handleContinue = () => {
    const notificationData = {
      notifications: notifications.reduce(
        (acc, notif) => ({
          ...acc,
          [notif.id]: {
            enabled: notif.enabled,
            time: notif.time,
          },
        }),
        {},
      ),
    };

    localStorage.setItem(
      "macromate_notifications",
      JSON.stringify(notificationData),
    );
    navigate("/onboarding/health-integrations");
  };

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif,
      ),
    );
  };

  const updateTime = (id: string, time: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, time } : notif)),
    );
  };

  const enabledCount = notifications.filter((n) => n.enabled).length;

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
                Set Reminders
              </h1>
              <Progress value={92} className="w-24 h-1 mt-2" />
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
              <Bell size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Set up reminders
            </h2>
            <p className="text-neutral-600">
              Choose helpful reminders to stay on track with your health goals.
              You can adjust these anytime.
            </p>
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            {notifications.map((notification, index) => {
              const Icon = notification.icon;

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 border">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                            <Icon size={20} className={notification.color} />
                          </div>
                          <div>
                            <h4 className="font-medium text-text-primary">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-neutral-600">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={notification.enabled}
                          onCheckedChange={() =>
                            toggleNotification(notification.id)
                          }
                        />
                      </div>

                      {/* Time Setting */}
                      {notification.enabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="ml-13 border-l-2 border-neutral-100 pl-4"
                        >
                          <div className="flex items-center gap-3">
                            <Label className="text-sm font-medium text-text-primary">
                              Time:
                            </Label>
                            <Input
                              type="time"
                              value={notification.time}
                              onChange={(e) =>
                                updateTime(notification.id, e.target.value)
                              }
                              className="w-32 h-8"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  📱 Notification Summary
                </h4>
                <p className="text-sm text-neutral-600">
                  You've enabled <strong>{enabledCount}</strong> reminder
                  {enabledCount !== 1 ? "s" : ""}. These will help you stay
                  consistent with your health journey.
                </p>
                {enabledCount === 0 && (
                  <p className="text-xs text-amber-700 mt-2 bg-amber-50 border border-amber-200 rounded p-2">
                    💡 Consider enabling at least meal logging reminders to help
                    build healthy habits.
                  </p>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Privacy Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-4 bg-gradient-to-br from-neutral-50 to-neutral-100">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  🔒 Privacy & Control
                </h4>
                <p className="text-sm text-neutral-600">
                  All notifications are local to your device. You can turn them
                  on or off anytime in Settings. We respect your preferences and
                  won't spam you.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
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
