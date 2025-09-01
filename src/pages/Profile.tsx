import { Link } from "react-router-dom";
import {
  User,
  Settings,
  Shield,
  CreditCard,
  Info,
  Smartphone,
  ChevronRight,
  Crown,
  Bell,
  Eye,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Profile() {
  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    isPro: false,
    streak: 12,
  };

  const profileSections = [
    {
      id: "overview",
      title: "Profile Overview",
      description: "Personal info, stats, and bio",
      icon: User,
      path: "/profile/overview",
      color: "text-brand-primary",
    },
    {
      id: "preferences",
      title: "Preferences",
      description: "Units, notifications, and theme",
      icon: Settings,
      path: "/profile/preferences",
      color: "text-neutral-600",
    },
    {
      id: "connected-apps",
      title: "Connected Apps",
      description: "Health app integrations",
      icon: Smartphone,
      path: "/profile/connected-apps",
      color: "text-success",
      badge: "3 connected",
    },
    {
      id: "security",
      title: "Security & Privacy",
      description: "Password, biometrics, and data",
      icon: Shield,
      path: "/profile/security-privacy",
      color: "text-warning",
    },
    {
      id: "subscription",
      title: "Subscription",
      description: user.isPro ? "Manage Pro features" : "Upgrade to Pro",
      icon: CreditCard,
      path: "/profile/subscription",
      color: "text-brand-secondary",
      badge: user.isPro ? "Pro" : "Free",
      badgeVariant: user.isPro ? "success" : "outline",
    },
    {
      id: "about",
      title: "About & Legal",
      description: "Version, changelog, and legal docs",
      icon: Info,
      path: "/profile/about-legal",
      color: "text-neutral-600",
    },
  ];

  const quickActions = [
    {
      title: "Notifications",
      icon: Bell,
      path: "/profile/preferences",
      description: "Meal and workout reminders",
    },
    {
      title: "Privacy",
      icon: Eye,
      path: "/profile/security-privacy",
      description: "Data sharing settings",
    },
    {
      title: "Upgrade",
      icon: Crown,
      path: "/profile/subscription",
      description: "Unlock AI features",
      highlight: !user.isPro,
    },
  ];

  const handleSignOut = () => {
    console.log("Sign out");
    // In real app, this would handle sign out
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
          <h1 className="text-xl font-bold text-text-primary">Profile</h1>
          <p className="text-sm text-neutral-600 mt-1">
            Manage your account and settings
          </p>
        </div>
      </motion.header>

      {/* Content */}
      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Link to="/profile/overview">
            <Card className="p-6 hover:border-neutral-200 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                  <AvatarFallback className="text-xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-text-primary">
                    {user.name}
                  </h2>
                  <p className="text-sm text-neutral-600 mb-2">{user.email}</p>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={
                        user.isPro
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-neutral-100 text-neutral-600"
                      }
                    >
                      {user.isPro ? (
                        <>
                          <Crown size={12} className="mr-1" />
                          Pro Member
                        </>
                      ) : (
                        "Free Plan"
                      )}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      🔥 {user.streak} day streak
                    </Badge>
                  </div>
                </div>

                <ChevronRight size={20} className="text-neutral-400" />
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Link
                      to={action.path}
                      className={`block p-3 rounded-lg border text-center transition-all hover:border-neutral-300 ${
                        action.highlight
                          ? "border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5"
                          : "border-neutral-200"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={`mx-auto mb-2 ${
                          action.highlight
                            ? "text-brand-primary"
                            : "text-neutral-600"
                        }`}
                      />
                      <div
                        className={`text-xs font-medium ${
                          action.highlight
                            ? "text-brand-primary"
                            : "text-text-primary"
                        }`}
                      >
                        {action.title}
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">
                        {action.description}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Profile Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h3 className="font-semibold text-text-primary px-1">Settings</h3>

          {profileSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link to={section.path}>
                  <Card className="p-4 hover:border-neutral-200 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-neutral-50 flex items-center justify-center">
                        <Icon size={20} className={section.color} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-text-primary">
                            {section.title}
                          </h4>
                          {section.badge && (
                            <Badge
                              variant={
                                section.badgeVariant === "success"
                                  ? "default"
                                  : "outline"
                              }
                              className={
                                section.badgeVariant === "success"
                                  ? "bg-success/10 text-success border-success/20"
                                  : ""
                              }
                            >
                              {section.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600">
                          {section.description}
                        </p>
                      </div>

                      <ChevronRight size={16} className="text-neutral-400" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Sign Out */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-4">
            <div className="text-center text-sm text-neutral-600">
              <p className="mb-1">MacroMate v2.1.4</p>
              <p>Your AI-powered health companion</p>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
