import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, CheckCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const email = "alex@example.com"; // In real app, this would come from state/props

  useEffect(() => {
    // Simulate checking verification status
    const checkVerification = () => {
      // In real app, this would poll the API
      console.log("Checking verification status...");
    };

    const interval = setInterval(checkVerification, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleResendEmail = async () => {
    setIsResending(true);

    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      startResendCooldown();
    }, 1500);
  };

  const startResendCooldown = () => {
    setResendCooldown(60);
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleContinue = () => {
    navigate("/onboarding/personal-info");
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-success flex items-center justify-center"
          >
            <CheckCircle size={48} className="text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Email Verified!
          </h1>
          <p className="text-neutral-600 mb-8">
            Welcome to MacroMate! Your account has been successfully verified
            and you're ready to start your health journey.
          </p>

          <Button
            onClick={handleContinue}
            className="w-full gradient-bg text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center"
          >
            <Mail size={24} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Check Your Email
          </h1>
          <p className="text-neutral-600">
            We sent a verification link to
            <br />
            <span className="font-medium text-text-primary">{email}</span>
          </p>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 text-center"
        >
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                What's next?
              </h3>
              <ol className="text-left text-sm text-neutral-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-brand-primary text-white rounded-full text-xs flex items-center justify-center font-medium">
                    1
                  </span>
                  Check your email inbox (and spam folder)
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-brand-primary text-white rounded-full text-xs flex items-center justify-center font-medium">
                    2
                  </span>
                  Click the "Verify Email" button in the email
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-brand-primary text-white rounded-full text-xs flex items-center justify-center font-medium">
                    3
                  </span>
                  Return here to complete your setup
                </li>
              </ol>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <p className="text-sm text-neutral-600 mb-4">
                Didn't receive the email?
              </p>

              {resendCooldown > 0 ? (
                <Button variant="outline" disabled className="w-full">
                  Resend in {resendCooldown}s
                </Button>
              ) : (
                <Button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  variant="outline"
                  className="w-full"
                >
                  {isResending ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw size={16} className="animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    "Resend Email"
                  )}
                </Button>
              )}
            </div>

            {/* Continue Button */}
            <Button
              onClick={() => setIsVerified(true)}
              className="w-full gradient-bg text-white font-medium rounded-lg hover:shadow-lg transition-shadow"
            >
              I've verified my email
            </Button>
          </div>
        </motion.div>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <button
            onClick={() => navigate("/auth/signup")}
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Sign Up
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
