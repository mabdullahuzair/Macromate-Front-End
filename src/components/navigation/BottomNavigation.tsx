import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Dumbbell, TrendingUp, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    id: "log",
    label: "Log",
    icon: BookOpen,
    path: "/log",
  },
  {
    id: "workout",
    label: "Workout",
    icon: Dumbbell,
    path: "/workout",
  },
  {
    id: "progress",
    label: "Progress",
    icon: TrendingUp,
    path: "/progress",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    path: "/profile",
  },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 safe-area-pb">
      <div className="flex h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 min-h-touch transition-colors duration-200",
                isActive
                  ? "text-brand-primary"
                  : "text-neutral-400 hover:text-neutral-600",
              )}
            >
              <Icon
                size={20}
                strokeWidth={1.5}
                className={cn(
                  "transition-transform duration-200",
                  isActive && "scale-110",
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive ? "text-brand-primary" : "text-neutral-400",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
