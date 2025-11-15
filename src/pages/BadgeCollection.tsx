import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BadgeCollection = () => {
  const navigate = useNavigate();

  const badges = [
    { id: 1, emoji: "🏆", title: "First Workout", unlocked: true, date: "Jan 15, 2024" },
    { id: 2, emoji: "🔥", title: "Week Streak", unlocked: true, date: "Jan 20, 2024" },
    { id: 3, emoji: "💪", title: "Strength Master", unlocked: true, date: "Jan 25, 2024" },
    { id: 4, emoji: "🤝", title: "Team Player", unlocked: false, date: null },
    { id: 5, emoji: "⚡", title: "Speed Demon", unlocked: false, date: null },
    { id: 6, emoji: "🎯", title: "Goal Crusher", unlocked: false, date: null },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate("/profile")} className="text-foreground">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">🏆 Your Badges</h1>
      </div>

      <div className="p-6">
        {/* Badge Grid */}
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge) => (
            <button
              key={badge.id}
              onClick={() => badge.unlocked && navigate(`/badge/${badge.id}`)}
              className={`aspect-square bg-card rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all border ${
                badge.unlocked
                  ? "hover:bg-muted cursor-pointer border-border"
                  : "opacity-40 grayscale cursor-not-allowed border-border/50"
              }`}
            >
              <span className="text-5xl">{badge.emoji}</span>
              <p className="text-foreground text-xs text-center font-medium">{badge.title}</p>
              {badge.unlocked && badge.date && (
                <p className="text-muted-foreground text-[10px] text-center">{badge.date}</p>
              )}
              {!badge.unlocked && (
                <p className="text-muted-foreground text-[10px] text-center">Locked</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgeCollection;

