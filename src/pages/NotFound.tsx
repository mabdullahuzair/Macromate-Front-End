import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Illustration */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center"
        >
          <span className="text-6xl text-white font-bold">404</span>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Page Not Found
          </h1>
          <p className="text-neutral-600 mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-200"
            >
              <Home size={20} />
              Back to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-white text-text-primary border border-neutral-200 rounded-lg font-medium hover:bg-neutral-50 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
