import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BadgeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock badge data
  const badge = {
    emoji: "🏆",
    title: "First Workout",
    description: "Complete your very first workout to unlock this badge and start your fitness journey!",
    dateEarned: "Jan 15, 2024",
  };

  const shareBadge = () => {
    toast({ title: "Badge shared! 🎉" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate("/badges")} className="text-foreground">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Badge Details</h1>
      </div>

      <div className="p-6 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] space-y-8">
        {/* Badge Emoji */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full"></div>
          <div className="relative text-9xl animate-bounce">
            {badge.emoji}
          </div>
        </div>

        {/* Badge Info */}
        <div className="text-center space-y-3 max-w-md">
          <h2 className="text-3xl font-bold text-foreground">{badge.title}</h2>
          <p className="text-muted-foreground text-lg">{badge.description}</p>
          <p className="text-primary font-medium">Earned on {badge.dateEarned}</p>
        </div>

        {/* Share Button */}
        <Button
          onClick={shareBadge}
          className="w-full max-w-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-14 text-base font-medium"
        >
          <Share2 className="mr-2" size={20} />
          Share Badge
        </Button>
      </div>
    </div>
  );
};

export default BadgeDetail;
