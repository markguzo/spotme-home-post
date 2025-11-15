import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { Badge, badges as allBadges } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";

const BadgeUnlockScreen = () => {
  const navigate = useNavigate();
  const { badgeId } = useParams();
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  const badge = allBadges.find((b) => b.id === badgeId);

  // Redirect if badge doesn't exist or isn't unlocked
  useEffect(() => {
    if (!badge) {
      navigate("/leaderboard");
      return;
    }
    if (!badge.unlocked) {
      // Redirect to leaderboard with message
      navigate("/leaderboard", { 
        state: { message: "This badge is locked. Keep working to unlock it!" } 
      });
    }
  }, [badge, navigate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHolding && !unlocked) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            triggerUnlock();
            return 100;
          }
          return newProgress;
        });
      }, 40);
    } else if (!isHolding && progress < 100) {
      // Reset if released early
      setProgress(0);
    }

    return () => clearInterval(interval);
  }, [isHolding, unlocked, progress]);

  const triggerUnlock = () => {
    setUnlocked(true);
    
    // Confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#3B82F6", "#60A5FA", "#93C5FD"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#3B82F6", "#60A5FA", "#93C5FD"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Redirect after delay
    setTimeout(() => {
      navigate("/leaderboard");
    }, 2500);
  };

  const handleTouchStart = () => setIsHolding(true);
  const handleTouchEnd = () => setIsHolding(false);

  if (!badge || !badge.unlocked) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-border">
        <button
          onClick={() => navigate("/leaderboard")}
          className="p-2 hover:bg-muted rounded-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 space-y-8">
        {/* Badge Info */}
        <div className="text-center space-y-2">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-5xl mb-4 ${
              unlocked
                ? "bg-gradient-primary animate-pulse"
                : "bg-card border-2 border-border"
            }`}
          >
            {badge.icon}
          </div>
          <h1 className="text-3xl font-bold text-foreground">{badge.name}</h1>
          <p className="text-muted-foreground max-w-md">{badge.description}</p>
          
          {/* Category Badge */}
          <div className="inline-block mt-2">
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                badge.category === "consistency"
                  ? "bg-orange-500/20 text-orange-400"
                  : badge.category === "social"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-purple-500/20 text-purple-400"
              }`}
            >
              {badge.category.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Interactive Area */}
        {!unlocked ? (
          <div className="relative w-full max-w-sm">
            <div className="text-center mb-6">
              <p className="text-foreground text-lg font-medium mb-2">
                Tap and hold to unlock
              </p>
              <div className="flex items-center justify-center gap-2">
                <Progress value={progress} className="h-2 w-48" />
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Exercise Animation Area */}
            <div
              onMouseDown={handleTouchStart}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className={`relative w-full aspect-square rounded-2xl border-4 cursor-pointer select-none transition-all ${
                isHolding
                  ? "border-primary bg-primary/20 scale-95"
                  : "border-border bg-card"
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`transition-transform duration-200 ${
                    isHolding
                      ? badge.animationType === "squat"
                        ? "translate-y-12"
                        : badge.animationType === "bench"
                        ? "scale-90"
                        : badge.animationType === "deadlift"
                        ? "translate-y-8 scale-95"
                        : "translate-y-4"
                      : ""
                  }`}
                >
                  {badge.animationType === "squat" && (
                    <div className="text-6xl">🧍</div>
                  )}
                  {badge.animationType === "bench" && (
                    <div className="text-6xl">🏋️</div>
                  )}
                  {badge.animationType === "deadlift" && (
                    <div className="text-6xl">💪</div>
                  )}
                  {badge.animationType === "pushup" && (
                    <div className="text-6xl">🤸</div>
                  )}
                </div>
              </div>

              {/* Progress Ring */}
              {progress > 0 && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#3B82F6]/30 to-transparent transition-all"
                    style={{ height: `${progress}%`, bottom: 0, top: "auto" }}
                  />
                </div>
              )}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Hold down to complete the rep and unlock your badge
            </p>
          </div>
        ) : (
          <div className="text-center space-y-4 animate-scale-in">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-primary animate-pulse">
              <Trophy className="w-16 h-16 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Badge Unlocked!</h2>
            <p className="text-muted-foreground">Congratulations on your achievement!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeUnlockScreen;
