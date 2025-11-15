import { useNavigate, useLocation } from "react-router-dom";
import { Home as HomeIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingHomeButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't show on home page or onboarding pages
  const hideOnPaths = ['/home', '/', '/onboarding', '/onboarding/details', '/onboarding/goal', '/login', '/connect'];
  const shouldHide = hideOnPaths.includes(location.pathname);

  return (
    <AnimatePresence>
      {!shouldHide && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/home")}
          className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-gradient-primary text-primary-foreground shadow-[0_4px_20px_rgba(93,95,236,0.4)] flex items-center justify-center hover:shadow-[0_6px_30px_rgba(93,95,236,0.6)] transition-all border-2 border-primary/20"
          aria-label="Go to Home"
        >
          <HomeIcon className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

