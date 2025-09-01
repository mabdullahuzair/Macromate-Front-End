import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  FlashlightOff,
  Flashlight,
  RotateCcw,
  Image,
  CheckCircle,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FoodRecognition } from "@/components/ai/FoodRecognition";

export default function SnapMeal() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTakePhoto = () => {
    // In a real app, this would open the camera
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        setIsProcessing(true);

        // Simulate processing time
        setTimeout(() => {
          setIsProcessing(false);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsProcessing(false);
  };

  const handleUsePhoto = () => {
    console.log("Using photo for food recognition");
    // In real app, this would process the image
  };

  const handleGallery = () => {
    fileInputRef.current?.click();
  };

  if (capturedImage) {
    return (
      <div className="min-h-screen bg-black text-white pb-20">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent"
        >
          <div className="px-4 py-4 max-w-lg mx-auto">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full bg-black/30 backdrop-blur-sm"
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
              <h1 className="text-lg font-semibold">Food Captured</h1>
              <div className="w-10" />
            </div>
          </div>
        </motion.header>

        {/* Image Preview */}
        <div className="relative h-screen flex items-center justify-center">
          <img
            src={capturedImage}
            alt="Captured food"
            className="max-w-full max-h-full object-contain"
          />

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-white/30 border-t-white"
                />
                <p className="text-white font-medium">
                  AI analyzing your food...
                </p>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-20 left-0 right-0 px-4">
          <div className="max-w-lg mx-auto flex gap-4">
            <Button
              onClick={handleRetake}
              variant="outline"
              className="flex-1 bg-black/30 border-white/20 text-white hover:bg-black/50"
            >
              <RotateCcw size={16} className="mr-2" />
              Retake
            </Button>
            <Button
              onClick={handleUsePhoto}
              disabled={isProcessing}
              className="flex-1 gradient-bg text-white"
            >
              <CheckCircle size={16} className="mr-2" />
              {isProcessing ? "Processing..." : "Use Photo"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent"
      >
        <div className="px-4 py-4 max-w-lg mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-black/30 backdrop-blur-sm"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-lg font-semibold">Snap Meal</h1>
            <button
              onClick={() => setFlashEnabled(!flashEnabled)}
              className="p-2 rounded-full bg-black/30 backdrop-blur-sm"
            >
              {flashEnabled ? (
                <Flashlight size={20} className="text-yellow-400" />
              ) : (
                <FlashlightOff size={20} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Camera Viewfinder */}
      <div className="relative h-screen bg-gray-900 flex items-center justify-center">
        {/* Simulated camera view */}
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center"
          >
            <Camera size={64} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400">Point camera at your meal</p>
          </motion.div>
        </div>

        {/* Camera Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full opacity-30">
            <defs>
              <pattern
                id="grid"
                width="33.333%"
                height="33.333%"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 33.333 0 L 33.333 33.333 M 0 33.333 L 33.333 33.333"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Focus Frame */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-x-16 inset-y-32 border-2 border-white/50 rounded-lg pointer-events-none"
        />
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-20 left-0 right-0 px-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-8">
            {/* Gallery Button */}
            <button
              onClick={handleGallery}
              className="w-12 h-12 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center"
            >
              <Image size={24} className="text-white" />
            </button>

            {/* Capture Button */}
            <motion.button
              onClick={handleTakePhoto}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-white flex items-center justify-center relative"
            >
              <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-300" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
                className="absolute inset-2 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary"
              />
            </motion.button>

            {/* Switch Camera Button */}
            <button className="w-12 h-12 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <RotateCcw size={24} className="text-white" />
            </button>
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6"
          >
            <p className="text-sm text-gray-300 mb-2">
              Tap the capture button to take a photo
            </p>
            <p className="text-xs text-gray-400">
              Our AI will identify your food and nutrition info
            </p>
          </motion.div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
