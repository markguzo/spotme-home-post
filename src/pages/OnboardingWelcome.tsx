import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryButton } from "@/components/PrimaryButton";

const OnboardingWelcome = () => {
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [positionIndex, setPositionIndex] = useState(0);

  const motivationalQuotes = [
    "Day 1 starts when you do.",
    "Future you is watching.",
    "No cap, no excuses, just reps.",
    "Show up now, scroll later.",
    "You don't need motivation, you need receipts.",
    "If you went, you get the receipt.",
  ];

  const quotePositions = [
    "left-6 top-24",
    "right-6 top-28",
    "left-6 top-40",
    "right-10 top-44",
    "left-10 top-56",
    "right-10 top-60",
  ];

  const gymImages = [
    "/images/gym-1.jpg",
    "/images/gym-2.jpg",
    "/images/gym-3.jpg",
    "/images/gym-4.jpg",
    "/images/gym-5.jpg",
    "/images/gym-6.jpg",
    "/images/gym-7.jpg",
    "/images/gym-8.jpg",
    "/images/gym-9.jpg",
    "/images/gym-10.jpg",
    "/images/gym-11.jpg",
    "/images/gym-12.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
      setPositionIndex((prev) => (prev + 1) % quotePositions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Grid of Gym Photos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 gap-1 opacity-65">
          {gymImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt=""
              className="w-full h-full object-cover grayscale"
            />
          ))}
        </div>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-5 pb-8 pt-10">
        {/* Header - Dark Mode */}
        <div className="w-full flex flex-col gap-1 mb-6 items-center text-center">
          <h1 className="text-xl font-semibold text-white">SpotMe</h1>
        </div>

        {/* Hero Section - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
          <h2 className="text-4xl font-extrabold text-white">
            Show up. Get spotted.
          </h2>
          <p className="text-base font-semibold text-gray-200">The "I went to the gym" receipt.</p>
          
          {/* Dark Mode Streak Badge */}
          <div className="mt-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5">
              <div className="w-2 h-2 rounded-full bg-[#5D5FEC]" />
              <span className="text-sm font-medium text-gray-100">
                Your streak starts today
              </span>
            </div>
          </div>
        </div>

        {/* Rotating Motivational Quote */}
        <AnimatePresence mode="wait">
          <motion.p
            key={quoteIndex}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className={`absolute max-w-xs text-sm md:text-base text-gray-200/85 italic pointer-events-none ${quotePositions[positionIndex]}`}
          >
            "{motivationalQuotes[quoteIndex]}"
          </motion.p>
        </AnimatePresence>

        {/* Bottom Actions */}
        <div className="mt-6 space-y-3">
          <PrimaryButton onClick={() => navigate("/onboarding/details")}>
            Let's get it 💪
          </PrimaryButton>
          <button
            onClick={() => navigate("/login")}
            className="w-full h-12 rounded-2xl bg-transparent border border-white/30 text-white font-medium flex items-center justify-center active:scale-95 transition"
          >
            I already have an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWelcome;
