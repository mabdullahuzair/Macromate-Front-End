import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Smartphone,
  Activity,
  Watch,
  Unlink,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ConnectedApp {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  status: "connected" | "disconnected" | "syncing" | "error";
  lastSync: string;
  dataTypes: string[];
  isEnabled: boolean;
  description: string;
}

export default function ConnectedApps() {
  const navigate = useNavigate();
  const [apps, setApps] = useState<ConnectedApp[]>([
    {
      id: "apple-health",
      name: "Apple Health",
      icon: Smartphone,
      status: "connected",
      lastSync: "2 minutes ago",
      dataTypes: ["Steps", "Heart Rate", "Sleep", "Weight"],
      isEnabled: true,
      description: "Sync health data from your iPhone",
    },
    {
      id: "google-fit",
      name: "Google Fit",
      icon: Activity,
      status: "disconnected",
      lastSync: "Never",
      dataTypes: ["Steps", "Workouts", "Heart Rate"],
      isEnabled: false,
      description: "Import fitness data from Google Fit",
    },
    {
      id: "garmin",
      name: "Garmin Connect",
      icon: Watch,
      status: "error",
      lastSync: "3 hours ago",
      dataTypes: ["Workouts", "Heart Rate", "Sleep", "Stress"],
      isEnabled: true,
      description: "Connect your Garmin devices",
    },
    {
      id: "fitbit",
      name: "Fitbit",
      icon: Activity,
      status: "syncing",
      lastSync: "Syncing...",
      dataTypes: ["Steps", "Sleep", "Heart Rate", "Weight"],
      isEnabled: true,
      description: "Sync data from your Fitbit devices",
    },
  ]);

  const getStatusBadge = (status: ConnectedApp["status"]) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-success/10 text-success border-success/20">
            <CheckCircle size={12} className="mr-1" />
            Connected
          </Badge>
        );
      case "disconnected":
        return (
          <Badge variant="outline" className="text-neutral-600">
            <XCircle size={12} className="mr-1" />
            Disconnected
          </Badge>
        );
      case "syncing":
        return (
          <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">
            <div className="w-3 h-3 mr-1 border border-brand-primary border-t-transparent rounded-full animate-spin" />
            Syncing
          </Badge>
        );
      case "error":
        return (
          <Badge className="bg-red-100 text-red-600 border-red-200">
            <AlertCircle size={12} className="mr-1" />
            Error
          </Badge>
        );
    }
  };

  const handleConnect = (appId: string) => {
    setApps(
      apps.map((app) =>
        app.id === appId
          ? {
              ...app,
              status: "syncing" as const,
              lastSync: "Connecting...",
            }
          : app,
      ),
    );

    // Simulate connection process
    setTimeout(() => {
      setApps(
        apps.map((app) =>
          app.id === appId
            ? {
                ...app,
                status: "connected" as const,
                lastSync: "Just now",
                isEnabled: true,
              }
            : app,
        ),
      );
    }, 2000);
  };

  const handleDisconnect = (appId: string) => {
    setApps(
      apps.map((app) =>
        app.id === appId
          ? {
              ...app,
              status: "disconnected" as const,
              lastSync: "Never",
              isEnabled: false,
            }
          : app,
      ),
    );
  };

  const handleToggle = (appId: string) => {
    setApps(
      apps.map((app) =>
        app.id === appId ? { ...app, isEnabled: !app.isEnabled } : app,
      ),
    );
  };

  const connectedCount = apps.filter(
    (app) => app.status === "connected",
  ).length;

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
                Connected Apps
              </h1>
              <p className="text-sm text-neutral-600">
                {connectedCount} of {apps.length} apps connected
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                <Activity size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Sync Your Health Data
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                Connect your favorite health and fitness apps to get a complete
                picture of your wellness journey.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-brand-primary">
                    {connectedCount}
                  </div>
                  <div className="text-xs text-neutral-600">Connected</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">24/7</div>
                  <div className="text-xs text-neutral-600">Auto Sync</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">
                    {apps
                      .filter((app) => app.status === "connected")
                      .reduce((acc, app) => acc + app.dataTypes.length, 0)}
                  </div>
                  <div className="text-xs text-neutral-600">Data Types</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Apps List */}
        <div className="space-y-4">
          {apps.map((app, index) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-neutral-50 flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-neutral-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-text-primary">
                          {app.name}
                        </h4>
                        {getStatusBadge(app.status)}
                      </div>

                      <p className="text-sm text-neutral-600 mb-3">
                        {app.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {app.dataTypes.map((type) => (
                          <Badge
                            key={type}
                            variant="outline"
                            className="text-xs"
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-500">
                          Last sync: {app.lastSync}
                        </span>

                        <div className="flex items-center gap-3">
                          {app.status === "connected" && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-neutral-600">
                                Sync
                              </span>
                              <Switch
                                checked={app.isEnabled}
                                onCheckedChange={() => handleToggle(app.id)}
                                size="sm"
                              />
                            </div>
                          )}

                          {app.status === "connected" ? (
                            <Button
                              onClick={() => handleDisconnect(app.id)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Unlink size={14} className="mr-1" />
                              Disconnect
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleConnect(app.id)}
                              size="sm"
                              className="gradient-bg text-white"
                              disabled={app.status === "syncing"}
                            >
                              {app.status === "syncing" ? (
                                <>
                                  <div className="w-3 h-3 mr-2 border border-white border-t-transparent rounded-full animate-spin" />
                                  Connecting...
                                </>
                              ) : (
                                <>
                                  <Plus size={14} className="mr-1" />
                                  Connect
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>

                      {app.status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                        >
                          <p className="text-sm text-red-700">
                            Connection failed. Check your account permissions
                            and try reconnecting.
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Add More Apps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 text-center border-dashed border-2 border-neutral-200">
            <Plus size={32} className="mx-auto mb-3 text-neutral-400" />
            <h4 className="font-semibold text-text-primary mb-2">
              Request New Integration
            </h4>
            <p className="text-sm text-neutral-600 mb-4">
              Don't see your favorite app? Let us know which integrations you'd
              like to see next.
            </p>
            <Button
              variant="outline"
              className="border-brand-primary/20 text-brand-primary hover:bg-brand-primary/5"
            >
              Suggest an App
            </Button>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
