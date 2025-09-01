import { useNavigate } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DemoReset() {
  const navigate = useNavigate();

  const resetDemoData = () => {
    // Clear all onboarding data
    localStorage.removeItem("macromate_onboarding_complete");
    localStorage.removeItem("macromate_user_info");
    localStorage.removeItem("macromate_goals");
    localStorage.removeItem("macromate_permissions");

    // Navigate to splash to restart flow
    navigate("/splash");
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        onClick={resetDemoData}
        variant="outline"
        size="sm"
        className="bg-white/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-shadow"
      >
        <RotateCcw size={14} className="mr-2" />
        Demo: Reset Flow
      </Button>
    </div>
  );
}
