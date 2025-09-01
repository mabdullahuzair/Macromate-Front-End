import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, Shield, Key } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Step = "email" | "otp" | "reset";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep("otp");
      startResendCooldown();
    }, 1500);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((digit) => !digit)) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep("reset");
    }, 1500);
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/auth/login");
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

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

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
            {currentStep === "email" && (
              <Mail size={24} className="text-white" />
            )}
            {currentStep === "otp" && (
              <Shield size={24} className="text-white" />
            )}
            {currentStep === "reset" && (
              <Key size={24} className="text-white" />
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {currentStep === "email" && (
              <motion.div
                key="email-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Forgot Password?
                </h1>
                <p className="text-neutral-600">
                  Enter your email to receive a verification code
                </p>
              </motion.div>
            )}

            {currentStep === "otp" && (
              <motion.div
                key="otp-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Enter Verification Code
                </h1>
                <p className="text-neutral-600">
                  We sent a 6-digit code to
                  <br />
                  <span className="font-medium text-text-primary">{email}</span>
                </p>
              </motion.div>
            )}

            {currentStep === "reset" && (
              <motion.div
                key="reset-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Reset Password
                </h1>
                <p className="text-neutral-600">
                  Create a new secure password for your account
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Forms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100"
        >
          <AnimatePresence mode="wait">
            {/* Email Step */}
            {currentStep === "email" && (
              <motion.form
                key="email-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleEmailSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-text-primary"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                    />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 bg-neutral-50 border-neutral-200 focus:border-brand-primary focus:ring-brand-primary"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full gradient-bg text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending code...
                    </div>
                  ) : (
                    "Send Verification Code"
                  )}
                </Button>
              </motion.form>
            )}

            {/* OTP Step */}
            {currentStep === "otp" && (
              <motion.form
                key="otp-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleOtpSubmit}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-text-primary block text-center">
                    Enter 6-digit code
                  </Label>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-bold bg-neutral-50 border-neutral-200 focus:border-brand-primary focus:ring-brand-primary"
                      />
                    ))}
                  </div>

                  <div className="text-center">
                    {resendCooldown > 0 ? (
                      <p className="text-sm text-neutral-500">
                        Resend code in {resendCooldown}s
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          handleEmailSubmit(new Event("submit") as any);
                        }}
                        className="text-sm text-brand-primary hover:text-brand-secondary font-medium transition-colors"
                      >
                        Resend code
                      </button>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || otp.some((digit) => !digit)}
                  className="w-full gradient-bg text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </div>
                  ) : (
                    "Verify Code"
                  )}
                </Button>
              </motion.form>
            )}

            {/* Reset Password Step */}
            {currentStep === "reset" && (
              <motion.form
                key="reset-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleResetSubmit}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="newPassword"
                      className="text-sm font-medium text-text-primary"
                    >
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-12 bg-neutral-50 border-neutral-200 focus:border-brand-primary focus:ring-brand-primary"
                      placeholder="Enter new password"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-text-primary"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 bg-neutral-50 border-neutral-200 focus:border-brand-primary focus:ring-brand-primary"
                      placeholder="Confirm new password"
                      required
                    />
                    {confirmPassword && newPassword !== confirmPassword && (
                      <p className="text-xs text-red-500">
                        Passwords don't match
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || newPassword !== confirmPassword}
                  className="w-full gradient-bg text-white h-12 font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Resetting password...
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/auth/login"
              className="text-sm text-brand-primary hover:text-brand-secondary font-medium transition-colors"
            >
              Back to Sign In
            </Link>
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
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back to app
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
