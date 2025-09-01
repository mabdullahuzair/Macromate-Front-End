import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Smartphone, Watch, Activity, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface HealthIntegration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
  available: boolean;
  connected: boolean;
}

const integrations: HealthIntegration[] = [
  {
    id: "apple_health",
    name: "Apple Health",
    description: "Sync steps, workouts, and health data",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50",
    available: true,
    connected: false,
  },
  {
    id: "google_fit",
    name: "Google Fit",
    description: "Track activity and fitness metrics",
    icon: Activity,
    color: "text-green-600",
    bgColor: "bg-green-50",
    available: true,
    connected: false,
  },
  {
    id: "fitbit",
    name: "Fitbit",
    description: "Import steps, sleep, and exercise data",
    icon: Watch,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    available: true,
    connected: false,
  },
  {
    id: "garmin",
    name: "Garmin Connect",
    description: "Advanced fitness and training metrics",
    icon: Watch,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    available: true,
    connected: false,
  },
];

export default function HealthIntegrations() {
  const navigate = useNavigate();
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(
    [],
  );
  const [manualEntry, setManualEntry] = useState(false);

  const handleContinue = () => {
    const healthData = {
      connectedApps: selectedIntegrations,
      manualEntryPreferred: manualEntry,
    };

    localStorage.setItem(
      "macromate_health_integrations",
      JSON.stringify(healthData),
    );
    navigate("/onboarding/summary");
  };

  const handleIntegrationSelect = (id: string) => {
    // Simulate connection process
    setTimeout(() => {
      setSelectedIntegrations((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
      );
    }, 500);
  };

  const handleSkip = () => {
    setManualEntry(true);
    handleContinue();
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
                Connect Health Data
              </h1>
              <Progress value={98} className="w-24 h-1 mt-2" />
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
              <Smartphone size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Connect your health data
            </h2>
            <p className="text-neutral-600">
              Sync with your favorite fitness apps for more accurate tracking.
              This step is completely optional.
            </p>
          </div>

          {/* Integration Options */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">
              Available Integrations
            </h3>

            {integrations.map((integration, index) => {
              const Icon = integration.icon;
              const isConnected = selectedIntegrations.includes(integration.id);

              return (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      isConnected
                        ? "border-green-500 bg-green-50"
                        : "hover:border-neutral-200 border"
                    }`}
                    onClick={() => handleIntegrationSelect(integration.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg ${integration.bgColor} flex items-center justify-center`}
                      >
                        <Icon size={24} className={integration.color} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary">
                          {integration.name}
                        </h4>
                        <p className="text-sm text-neutral-600">
                          {integration.description}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {isConnected ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-2 text-green-600"
                          >
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                            <span className="text-sm font-medium">
                              Connected
                            </span>
                          </motion.div>
                        ) : (
                          <Button variant="outline" size="sm">
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Manual Entry Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card
              className={`p-4 cursor-pointer transition-all ${
                manualEntry
                  ? "border-brand-primary bg-brand-primary/5 border-2"
                  : "hover:border-neutral-200 border"
              }`}
              onClick={() => setManualEntry(!manualEntry)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <Smartphone size={24} className="text-neutral-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary">
                    Manual Entry
                  </h4>
                  <p className="text-sm text-neutral-600">
                    I prefer to enter my data manually
                  </p>
                </div>
                {manualEntry && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  🎯 Why connect health data?
                </h4>
                <div className="text-sm text-neutral-600 space-y-1">
                  <p>• Automatic activity and exercise tracking</p>
                  <p>• More accurate calorie burn calculations</p>
                  <p>• Seamless progress monitoring</p>
                  <p>• Better insights and recommendations</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Privacy Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="p-4 bg-gradient-to-br from-neutral-50 to-neutral-100">
              <div className="text-center">
                <h4 className="font-medium text-text-primary mb-2">
                  🔒 Your Data is Safe
                </h4>
                <p className="text-sm text-neutral-600">
                  We only read the data you authorize and never share it with
                  third parties. You can disconnect any app at any time in
                  Settings.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-4 space-y-3"
          >
            <Button
              onClick={handleContinue}
              className="w-full gradient-bg text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow"
            >
              {selectedIntegrations.length > 0 || manualEntry
                ? "Continue with Settings"
                : "Continue without Connecting"}
            </Button>

            {selectedIntegrations.length === 0 && !manualEntry && (
              <Button
                onClick={handleSkip}
                variant="outline"
                className="w-full h-12"
              >
                Skip for Now
              </Button>
            )}
          </motion.div>

          {/* Summary */}
          {(selectedIntegrations.length > 0 || manualEntry) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-center text-sm text-neutral-600"
            >
              {selectedIntegrations.length > 0 && (
                <p>
                  ✅ Connected: {selectedIntegrations.length} app
                  {selectedIntegrations.length !== 1 ? "s" : ""}
                </p>
              )}
              {manualEntry && <p>📱 Manual entry preferred</p>}
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
