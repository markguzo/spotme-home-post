import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const WeeklyWrapUp = () => {
  const navigate = useNavigate();

  const shareWrapUp = () => {
    toast({ title: "Sharing your weekly wrap-up! 🎉" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5D5FEC] via-[#7A82FF] to-[#9F7AEA] text-white p-6 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">🔥 Your Week in Fitness</h1>
          <p className="text-white/80">Jan 15 - Jan 21, 2024</p>
        </div>

        {/* Stats Cards */}
        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <p className="text-white/80 text-sm mb-1">Weekly Goal</p>
            <p className="text-4xl font-bold">3 / 4</p>
            <p className="text-white/80 text-sm mt-1">workouts completed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <p className="text-white/80 text-sm mb-1">Top Category</p>
            <p className="text-3xl font-bold">Strength 💪</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <p className="text-white/80 text-sm mb-1">Gym Posts Logged</p>
            <p className="text-4xl font-bold">4</p>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30">
          <p className="text-white font-semibold mb-2">✨ AI Insight</p>
          <p className="text-white/90">
            You improved consistency by 12% this week. Keep up the momentum!
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button
            onClick={shareWrapUp}
            className="w-full bg-white text-[#5D5FEC] hover:bg-white/90 rounded-full h-14 text-base font-medium shadow-lg"
          >
            <Share2 className="mr-2" size={20} />
            Share Wrap-Up
          </Button>
          <Button
            onClick={() => navigate("/home")}
            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 rounded-full h-14 text-base font-medium"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyWrapUp;
