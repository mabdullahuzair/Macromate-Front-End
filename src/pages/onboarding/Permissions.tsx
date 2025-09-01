import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Smartphone, Camera, Bell, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Permission {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  required: boolean;
  granted: boolean;
}

export default function Permissions() {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "health",
      title: "Health & Fitness",
      description:
        "Sync with Apple Health or Google Fit for automatic tracking",
      icon: Smartphone,
      required: false,
      granted: false,
    },
    {
      id: "camera",
      title: "Camera Access",
      description: "Take photos of your meals for AI food recognition",
      icon: Camera,
      required: false,
      granted: false,
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Get reminders for meals, water, and workouts",
      icon: Bell,
      required: false,
      granted: false,
    },
  ]);

  const handlePermissionToggle = (id: string) => {
    setPermissions((prev) =>
      prev.map((permission) =>
        permission.id === id
          ? { ...permission, granted: !permission.granted }
          : permission,
      ),
    );
  };

  const handleContinue = () => {
    // Store permissions in localStorage
    const permissionsData = permissions.reduce(
      (acc, perm) => ({
        ...acc,
        [perm.id]: perm.granted,
      }),
      {},
    );

    localStorage.setItem(
      "macromate_permissions",
      JSON.stringify(permissionsData),
    );
    navigate("/onboarding/complete");
  };

  const handleSkip = () => {
    navigate("/onboarding/complete");
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
                Permissions
              </h1>
              <Progress value={90} className="w-24 h-1 mt-2" />
            </div>
            <button
              onClick={handleSkip}
              className="text-sm text-brand-primary hover:text-brand-secondary font-medium"
            >
              Skip
            </button>
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
              <Smartphone size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Enable features
            </h2>
            <p className="text-neutral-600">
              Grant permissions to unlock MacroMate's full potential. You can
              change these later in settings.
            </p>
          </div>

          {/* Permissions List */}
          <div className="space-y-4">
            {permissions.map((permission, index) => {
              const Icon = permission.icon;

              return (
                <motion.div
                  key={permission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={24} className="text-brand-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-text-primary">
                            {permission.title}
                          </h4>
                          {permission.required && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600">
                          {permission.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handlePermissionToggle(permission.id)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          permission.granted
                            ? "bg-success text-white"
                            : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200"
                        }`}
                      >
                        {permission.granted ? (
                          <Check size={20} />
                        ) : (
                          <X size={20} />
                        )}
                      </button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="text-sm">
                  <p className="text-blue-900 font-medium mb-1">
                    Privacy First
                  </p>
                  <p className="text-blue-700">
                    MacroMate only accesses data you explicitly allow. Your
                    health information stays on your device and is never shared
                    without permission.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-text-primary">
              What you'll get:
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                  <Check size={12} className="text-success" />
                </div>
                <span className="text-neutral-700">
                  Automatic step and workout tracking
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                  <Check size={12} className="text-success" />
                </div>
                <span className="text-neutral-700">
                  AI-powered food recognition from photos
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                  <Check size={12} className="text-success" />
                </div>
                <span className="text-neutral-700">
                  Smart reminders to stay on track
                </span>
              </div>
            </div>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-4 space-y-3"
          >
            <Button
              onClick={handleContinue}
              className="w-full gradient-bg text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow"
            >
              {permissions.some((p) => p.granted)
                ? "Continue with Selected Permissions"
                : "Continue without Permissions"}
            </Button>

            {permissions.some((p) => p.granted) && (
              <p className="text-xs text-center text-neutral-500">
                You can enable additional permissions later in Settings
              </p>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
