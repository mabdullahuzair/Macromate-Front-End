import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface OnboardingGuardProps {
  children: React.ReactNode;
}

export function OnboardingGuard({ children }: OnboardingGuardProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = () => {
      // --- FIX APPLIED HERE ---
      // Check if the localStorage item exists AND its value is the string 'true'
      const onboardingIsActuallyComplete =
        localStorage.getItem("macromate_onboarding_complete") === "true";

      const isOnboardingRoute = location.pathname.startsWith("/onboarding");
      const isAuthRoute = location.pathname.startsWith("/auth");
      const isSplashRoute = location.pathname === "/splash";

      // --- Debugging logs (you can remove these later) ---
      console.log("OnboardingGuard running for:", location.pathname);
      console.log("  Onboarding Is Actually Complete:", onboardingIsActuallyComplete);
      console.log("  Is Onboarding Route:", isOnboardingRoute);
      console.log("  Is Auth Route:", isAuthRoute);
      console.log("  Is Splash Route:", isSplashRoute);
      // --- End Debugging logs ---


      // If on splash route, let it handle routing - always allow splash
      if (isSplashRoute) {
        console.log("  On Splash Route, allowing.");
        setIsChecking(false);
        return;
      }

      // Scenario 1: User hasn't completed onboarding AND is trying to access a route
      // that is NOT onboarding, NOT auth, and NOT splash. Redirect them to splash.
      if (!onboardingIsActuallyComplete && !isOnboardingRoute && !isAuthRoute) {
        console.log("  Incomplete onboarding, not on valid start page, redirecting to /splash");
        navigate("/splash", { replace: true });
      }
      // Scenario 2: User HAS completed onboarding AND is trying to access an onboarding route.
      // Redirect them to the main app dashboard.
      else if (onboardingIsActuallyComplete && isOnboardingRoute) {
        console.log("  Onboarding complete, on onboarding route, redirecting to /");
        navigate("/", { replace: true });
      }
      // Scenario 3: All other cases (incomplete on onboarding/auth, complete on non-onboarding/non-auth)
      // Allow access.
      else {
        console.log("  Allowing access.");
        // No redirect needed, proceed to render children
      }


      setIsChecking(false); // Finish checking after potential redirect or decision to allow
    };

    // Using a setTimeout of 0 can help ensure localStorage is fully ready,
    // though often not strictly necessary for simple gets/sets.
    // If you still see flashes or issues, you could increase this slightly,
    // but ideally, localStorage access is synchronous.
    // const timer = setTimeout(() => {
    checkOnboardingStatus();
    // }, 0);

    // Clean up timer if component unmounts before check finishes (less likely with 0ms)
    // return () => clearTimeout(timer);

  }, [location.pathname, navigate]); // Re-run effect when path changes or navigate changes

  // Render a loading spinner while the check is in progress
  if (isChecking) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center animate-pulse">
            <span className="text-2xl font-bold text-white">M</span>
          </div>
          <p className="text-neutral-600">Loading MacroMate...</p>
        </div>
      </div>
    );
  }

  // Once checking is done and no redirect occurred, render the children (the requested route component)
  return <>{children}</>;
}