import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  Fingerprint,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Key,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SecurityPrivacy() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    biometricLock: true,
    autoLock: true,
    dataSharing: false,
    analytics: true,
    crashReports: true,
  });
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const securitySettings = [
    {
      key: "biometricLock" as keyof typeof settings,
      title: "Biometric Lock",
      description: "Use Face ID or Touch ID to unlock the app",
      icon: Fingerprint,
      color: "text-brand-primary",
    },
    {
      key: "autoLock" as keyof typeof settings,
      title: "Auto Lock",
      description: "Lock app automatically when not in use",
      icon: Lock,
      color: "text-success",
    },
  ];

  const privacySettings = [
    {
      key: "dataSharing" as keyof typeof settings,
      title: "Data Sharing",
      description: "Share anonymized data to improve MacroMate",
      icon: Eye,
      color: "text-warning",
    },
    {
      key: "analytics" as keyof typeof settings,
      title: "Analytics",
      description: "Help us improve the app with usage analytics",
      icon: Shield,
      color: "text-brand-secondary",
    },
    {
      key: "crashReports" as keyof typeof settings,
      title: "Crash Reports",
      description: "Automatically send crash reports to help fix bugs",
      icon: AlertTriangle,
      color: "text-red-500",
    },
  ];

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleChangePassword = () => {
    console.log("Change password:", passwordData);
    setShowChangePassword(false);
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const handleExportData = () => {
    console.log("Exporting data...");
    // Simulate file download
    const link = document.createElement("a");
    link.href = "data:text/plain;charset=utf-8,MacroMate Data Export";
    link.download = "macromate-data-export.json";
    link.click();
  };

  const handleDeleteAccount = () => {
    console.log("Account deletion requested");
    // In real app, this would trigger account deletion flow
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
                Security & Privacy
              </h1>
              <p className="text-sm text-neutral-600">
                Protect your data and account
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={20} className="text-brand-primary" />
              <h3 className="text-lg font-semibold text-text-primary">
                Security
              </h3>
            </div>

            <div className="space-y-4">
              {securitySettings.map((setting, index) => {
                const Icon = setting.icon;
                return (
                  <motion.div
                    key={setting.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className={setting.color} />
                      <div>
                        <div className="font-medium text-text-primary">
                          {setting.title}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {setting.description}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={settings[setting.key]}
                      onCheckedChange={() => handleToggle(setting.key)}
                    />
                  </motion.div>
                );
              })}

              {/* Change Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-2 border-t border-neutral-100"
              >
                <Button
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  variant="outline"
                  className="w-full justify-start h-12"
                >
                  <Key size={20} className="mr-3 text-neutral-600" />
                  Change Password
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Change Password Form */}
        <AnimatePresence>
          {showChangePassword && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card className="p-6">
                <h4 className="font-semibold text-text-primary mb-4">
                  Change Password
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      key: "current",
                      label: "Current Password",
                      placeholder: "Enter current password",
                    },
                    {
                      key: "new",
                      label: "New Password",
                      placeholder: "Enter new password",
                    },
                    {
                      key: "confirm",
                      label: "Confirm Password",
                      placeholder: "Confirm new password",
                    },
                  ].map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label className="text-sm font-medium text-text-primary">
                        {field.label}
                      </Label>
                      <div className="relative">
                        <Input
                          type={
                            showPasswords[
                              field.key as keyof typeof showPasswords
                            ]
                              ? "text"
                              : "password"
                          }
                          value={
                            passwordData[field.key as keyof typeof passwordData]
                          }
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              [field.key]: e.target.value,
                            })
                          }
                          className="pr-10"
                          placeholder={field.placeholder}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords({
                              ...showPasswords,
                              [field.key]:
                                !showPasswords[
                                  field.key as keyof typeof showPasswords
                                ],
                            })
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        >
                          {showPasswords[
                            field.key as keyof typeof showPasswords
                          ] ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={() => setShowChangePassword(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleChangePassword}
                      className="flex-1 gradient-bg text-white"
                    >
                      Update Password
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Privacy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye size={20} className="text-warning" />
              <h3 className="text-lg font-semibold text-text-primary">
                Privacy
              </h3>
            </div>

            <div className="space-y-4">
              {privacySettings.map((setting, index) => {
                const Icon = setting.icon;
                return (
                  <motion.div
                    key={setting.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className={setting.color} />
                      <div>
                        <div className="font-medium text-text-primary">
                          {setting.title}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {setting.description}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={settings[setting.key]}
                      onCheckedChange={() => handleToggle(setting.key)}
                    />
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Data Management
            </h3>

            <div className="space-y-3">
              <Button
                onClick={handleExportData}
                variant="outline"
                className="w-full justify-start h-12"
              >
                <Download size={20} className="mr-3 text-brand-primary" />
                Export My Data
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 size={20} className="mr-3 text-red-600" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle size={20} />
                      Delete Account
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove all your data from our servers.
                      <br />
                      <br />
                      <strong>What will be deleted:</strong>
                      <ul className="mt-2 list-disc list-inside text-sm">
                        <li>All your health and fitness data</li>
                        <li>Meal logs and nutrition history</li>
                        <li>Workout records and progress</li>
                        <li>Personal settings and preferences</li>
                      </ul>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        </motion.div>

        {/* Privacy Policy Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-neutral-600">
                Learn more about how we protect your data
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <button className="text-brand-primary hover:text-brand-secondary transition-colors">
                  Privacy Policy
                </button>
                <button className="text-brand-primary hover:text-brand-secondary transition-colors">
                  Terms of Service
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
