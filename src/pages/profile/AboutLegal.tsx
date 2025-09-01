import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Info,
  ExternalLink,
  Heart,
  Code,
  Shield,
  FileText,
  Github,
  Twitter,
  Mail,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AboutLegal() {
  const navigate = useNavigate();
  const [showChangelog, setShowChangelog] = useState(false);

  const appInfo = {
    version: "2.1.4",
    buildNumber: "2024.03.15",
    lastUpdate: "March 15, 2024",
  };

  const changelog = [
    {
      version: "2.1.4",
      date: "March 15, 2024",
      changes: [
        "🎉 New AI-powered cheat meal balancer",
        "🧠 Enhanced AI insights with better accuracy",
        "📱 Improved dark mode support",
        "🐛 Fixed workout sync issues with Apple Health",
        "⚡ Performance improvements for food recognition",
      ],
    },
    {
      version: "2.1.3",
      date: "March 1, 2024",
      changes: [
        "🥗 Added 500+ new food items to database",
        "💪 New workout templates for beginners",
        "📊 Enhanced progress charts with weekly views",
        "🔧 Bug fixes and stability improvements",
      ],
    },
    {
      version: "2.1.2",
      date: "February 15, 2024",
      changes: [
        "🎯 Improved calorie goal calculations",
        "🔄 Better sync reliability for connected apps",
        "🎨 UI polish and animation improvements",
        "📱 Fixed tablet layout issues",
      ],
    },
  ];

  const legalLinks = [
    {
      title: "Terms of Service",
      icon: FileText,
      description: "Our terms and conditions for using MacroMate",
      url: "/legal/terms",
    },
    {
      title: "Privacy Policy",
      icon: Shield,
      description: "How we protect and handle your personal data",
      url: "/legal/privacy",
    },
    {
      title: "Open Source Licenses",
      icon: Code,
      description: "Third-party libraries and their licenses",
      url: "/legal/licenses",
    },
    {
      title: "Data Processing Agreement",
      icon: FileText,
      description: "How we process your health data",
      url: "/legal/data-processing",
    },
  ];

  const socialLinks = [
    {
      name: "Website",
      icon: Globe,
      url: "https://macromate.app",
      color: "text-brand-primary",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/macromate",
      color: "text-neutral-700",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/macromate",
      color: "text-blue-500",
    },
    {
      name: "Support",
      icon: Mail,
      url: "mailto:support@macromate.app",
      color: "text-success",
    },
  ];

  const openSourceLibraries = [
    "React 18 - UI framework",
    "Framer Motion - Animations",
    "Radix UI - Accessible components",
    "TailwindCSS - Styling",
    "Lucide React - Icons",
    "React Router - Navigation",
    "And many more...",
  ];

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
                About & Legal
              </h1>
              <p className="text-sm text-neutral-600">
                App info, legal docs, and more
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
              <span className="text-3xl font-bold text-white">M</span>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              MacroMate
            </h2>
            <p className="text-neutral-600 mb-4">
              Your AI-powered health and fitness companion
            </p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-text-primary">
                  v{appInfo.version}
                </div>
                <div className="text-xs text-neutral-600">Version</div>
              </div>
              <div>
                <div className="text-lg font-bold text-text-primary">
                  {appInfo.buildNumber.split(".")[0]}
                </div>
                <div className="text-xs text-neutral-600">Build</div>
              </div>
              <div>
                <div className="text-lg font-bold text-text-primary">4.8</div>
                <div className="text-xs text-neutral-600">Rating</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100">
              <p className="text-sm text-neutral-600">
                Last updated: {appInfo.lastUpdate}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Changelog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                What's New
              </h3>
              <Badge className="bg-success/10 text-success border-success/20">
                Latest
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              {changelog[0].changes.slice(0, 3).map((change, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-sm text-neutral-700"
                >
                  {change}
                </motion.div>
              ))}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Info size={16} className="mr-2" />
                  View Full Changelog
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Release History</DialogTitle>
                  <DialogDescription>
                    Recent updates and improvements
                  </DialogDescription>
                </DialogHeader>
                <div className="max-h-96 overflow-y-auto space-y-6">
                  {changelog.map((release, index) => (
                    <div key={release.version}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-text-primary">
                          Version {release.version}
                        </h4>
                        <span className="text-xs text-neutral-500">
                          {release.date}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {release.changes.map((change, changeIndex) => (
                          <div
                            key={changeIndex}
                            className="text-sm text-neutral-700"
                          >
                            {change}
                          </div>
                        ))}
                      </div>
                      {index < changelog.length - 1 && (
                        <div className="mt-4 border-b border-neutral-100" />
                      )}
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </Card>
        </motion.div>

        {/* Legal Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Legal Documents
            </h3>
            <div className="space-y-3">
              {legalLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.button
                    key={link.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onClick={() => console.log(`Navigate to ${link.url}`)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className="text-neutral-600" />
                      <div className="text-left">
                        <div className="font-medium text-text-primary">
                          {link.title}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {link.description}
                        </div>
                      </div>
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-neutral-400 group-hover:text-neutral-600 transition-colors"
                    />
                  </motion.button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Open Source */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart size={20} className="text-red-500" />
              <h3 className="text-lg font-semibold text-text-primary">
                Open Source
              </h3>
            </div>
            <p className="text-sm text-neutral-600 mb-4">
              MacroMate is built with love using these amazing open source
              libraries:
            </p>
            <div className="space-y-2">
              {openSourceLibraries.map((lib, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="text-sm text-neutral-700 flex items-center gap-2"
                >
                  <Code size={12} className="text-brand-primary" />
                  {lib}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Connect With Us
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.button
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={() => console.log(`Open ${social.url}`)}
                    className="flex items-center justify-center gap-2 p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors group"
                  >
                    <Icon size={18} className={social.color} />
                    <span className="text-sm font-medium text-neutral-700 group-hover:text-text-primary transition-colors">
                      {social.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4">
            <div className="text-center text-sm text-neutral-600">
              <p className="mb-2">
                Made with{" "}
                <Heart size={14} className="inline text-red-500 mx-1" /> for a
                healthier you
              </p>
              <p>© 2024 MacroMate. All rights reserved.</p>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
