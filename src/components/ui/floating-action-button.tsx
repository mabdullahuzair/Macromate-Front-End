import React, { useState } from "react";
import { Plus, Camera, Edit3, Scale, Droplets, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface FABMenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick: () => void;
}

export function FloatingActionButton() {
  const navigate = useNavigate();

  const fabMenuItems: FABMenuItem[] = [
    {
      id: "snap-meal",
      label: "Snap Meal",
      icon: Camera,
      onClick: () => navigate("/quick-actions/snap-meal"),
    },
    {
      id: "manual-meal",
      label: "Manual Meal",
      icon: Edit3,
      onClick: () => navigate("/quick-actions/manual-meal"),
    },
    {
      id: "cheat-meal-balance",
      label: "Cheat Meal Balance",
      icon: Sparkles,
      onClick: () => navigate("/cheat-meal-balance"),
    },
    {
      id: "add-weight",
      label: "Add Weight",
      icon: Scale,
      onClick: () => navigate("/quick-actions/add-weight"),
    },
    {
      id: "log-water",
      label: "Log Water",
      icon: Droplets,
      onClick: () => navigate("/quick-actions/log-water"),
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-20 right-4 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 flex flex-col gap-3"
          >
            {fabMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 bg-white rounded-full shadow-lg border border-neutral-200 py-3 px-4 hover:shadow-xl transition-shadow duration-200"
                >
                  <Icon size={20} className="text-neutral-600" />
                  <span className="text-sm font-medium text-text-primary whitespace-nowrap">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleMenu}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-250",
          "bg-gradient-to-br from-brand-primary to-brand-secondary",
          "hover:shadow-xl active:scale-95",
          isOpen && "rotate-45",
        )}
      >
        <Plus size={24} className="text-white" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
