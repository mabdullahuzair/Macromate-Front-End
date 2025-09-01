import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";

// Main app pages
import Home from "./pages/Home";
import Log from "./pages/Log";
import Workout from "./pages/Workout";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import CheatMealBalance from "./pages/CheatMealBalance";
import NotFound from "./pages/NotFound";

// Authentication pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";

// Profile pages
import ProfileOverview from "./pages/profile/ProfileOverview";
import Preferences from "./pages/profile/Preferences";
import ConnectedApps from "./pages/profile/ConnectedApps";
import SecurityPrivacy from "./pages/profile/SecurityPrivacy";
import Subscription from "./pages/profile/Subscription";
import AboutLegal from "./pages/profile/AboutLegal";

// Quick Action pages
import SnapMeal from "./pages/quick-actions/SnapMeal";
import ManualMeal from "./pages/quick-actions/ManualMeal";
import AddWeight from "./pages/quick-actions/AddWeight";
import LogWater from "./pages/quick-actions/LogWater";

// Onboarding pages
import {
  Welcome,
  PersonalInfoSetup,
  BodyMetrics,
  SelectGoal,
  TargetWeight,
  WeightRate,
  ActivityLevel,
  DietaryPreferences,
  MacronutrientDistribution,
  TrackingPreferences,
  MealPreferences,
  Notifications,
  HealthIntegrations,
  OnboardingSummary,
  // Legacy pages
  BasicInfo,
  GoalSetting,
  FoodPreferences,
  HealthConditions,
  LifestyleMotivation,
  UnitsPreference,
  FinalComplete,
  PersonalInfo,
  Goals,
  Permissions,
  Complete,
} from "./pages/onboarding";

// Guards
import { OnboardingGuard } from "./components/OnboardingGuard";

// Splash
import Splash from "./pages/Splash";

const queryClient = new QueryClient();

// MacroMate App - Force refresh to fix blank screen issue
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <OnboardingGuard>
          <div className="min-h-screen bg-neutral-50">
            <Routes>
              {/* Splash Screen */}
              <Route path="/splash" element={<Splash />} />

              {/* Main App Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/log" element={<Log />} />
              <Route path="/workout" element={<Workout />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/cheat-meal-balance"
                element={<CheatMealBalance />}
              />

              {/* Authentication Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route
                path="/auth/forgot-password"
                element={<ForgotPassword />}
              />
              <Route path="/auth/verify-email" element={<VerifyEmail />} />

              {/* Profile Sub-routes */}
              <Route path="/profile/overview" element={<ProfileOverview />} />
              <Route path="/profile/preferences" element={<Preferences />} />
              <Route
                path="/profile/connected-apps"
                element={<ConnectedApps />}
              />
              <Route
                path="/profile/security-privacy"
                element={<SecurityPrivacy />}
              />
              <Route path="/profile/subscription" element={<Subscription />} />
              <Route path="/profile/about-legal" element={<AboutLegal />} />

              {/* Quick Action Routes */}
              <Route path="/quick-actions/snap-meal" element={<SnapMeal />} />
              <Route
                path="/quick-actions/manual-meal"
                element={<ManualMeal />}
              />
              <Route path="/quick-actions/add-weight" element={<AddWeight />} />
              <Route path="/quick-actions/log-water" element={<LogWater />} />

              {/* Complete 15-Screen Onboarding Flow */}
              <Route path="/onboarding/welcome" element={<Welcome />} />
              <Route
                path="/onboarding/personal-info"
                element={<PersonalInfoSetup />}
              />
              <Route
                path="/onboarding/body-metrics"
                element={<BodyMetrics />}
              />
              <Route path="/onboarding/select-goal" element={<SelectGoal />} />
              <Route
                path="/onboarding/target-weight"
                element={<TargetWeight />}
              />
              <Route path="/onboarding/weight-rate" element={<WeightRate />} />
              <Route
                path="/onboarding/activity-level"
                element={<ActivityLevel />}
              />
              <Route
                path="/onboarding/dietary-preferences"
                element={<DietaryPreferences />}
              />
              <Route
                path="/onboarding/macro-distribution"
                element={<MacronutrientDistribution />}
              />
              <Route
                path="/onboarding/tracking-preferences"
                element={<TrackingPreferences />}
              />
              <Route
                path="/onboarding/meal-preferences"
                element={<MealPreferences />}
              />
              <Route
                path="/onboarding/notifications"
                element={<Notifications />}
              />
              <Route
                path="/onboarding/health-integrations"
                element={<HealthIntegrations />}
              />
              <Route
                path="/onboarding/summary"
                element={<OnboardingSummary />}
              />

              {/* Legacy Onboarding Routes */}
              <Route path="/onboarding/basic-info" element={<BasicInfo />} />
              <Route
                path="/onboarding/goal-setting"
                element={<GoalSetting />}
              />
              <Route
                path="/onboarding/food-preferences"
                element={<FoodPreferences />}
              />
              <Route
                path="/onboarding/health-conditions"
                element={<HealthConditions />}
              />
              <Route
                path="/onboarding/lifestyle-motivation"
                element={<LifestyleMotivation />}
              />
              <Route
                path="/onboarding/units-preference"
                element={<UnitsPreference />}
              />
              <Route
                path="/onboarding/final-complete"
                element={<FinalComplete />}
              />

              {/* Legacy Onboarding Routes (for fallback) */}
              <Route
                path="/onboarding/personal-info"
                element={<PersonalInfo />}
              />
              <Route path="/onboarding/goals" element={<Goals />} />
              <Route path="/onboarding/permissions" element={<Permissions />} />
              <Route path="/onboarding/complete" element={<Complete />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Only show bottom navigation on main app routes */}
            <Routes>
              <Route path="/" element={<BottomNavigation />} />
              <Route path="/log" element={<BottomNavigation />} />
              <Route path="/workout" element={<BottomNavigation />} />
              <Route path="/progress" element={<BottomNavigation />} />
              <Route path="/profile" element={<BottomNavigation />} />
              <Route
                path="/cheat-meal-balance"
                element={<BottomNavigation />}
              />
            </Routes>
          </div>
        </OnboardingGuard>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
