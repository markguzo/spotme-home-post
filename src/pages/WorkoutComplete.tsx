import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const WorkoutComplete = () => {
  const navigate = useNavigate();

  const shareWorkout = () => {
    toast({ title: "Sharing to friends! 🎉" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5D5FEC] via-[#7A82FF] to-[#9F7AEA] text-white flex items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-md animate-scale-in">
        {/* Celebration Emoji */}
        <div className="text-8xl animate-bounce">
          🔥💪
        </div>

        {/* Title */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Workout Complete!</h1>
          <p className="text-white/80 text-lg">You finished Push Day</p>
        </div>

        {/* Stats */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-white/80">Streak</span>
            <span className="text-2xl font-bold">+1 🔥</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">Weekly Goal Progress</span>
            <span className="text-2xl font-bold">3 / 4</span>
          </div>
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div className="bg-white h-full w-3/4 rounded-full"></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button
            onClick={shareWorkout}
            className="w-full bg-white text-[#5D5FEC] hover:bg-white/90 rounded-full h-14 text-base font-medium shadow-lg"
          >
            <Share2 className="mr-2" size={20} />
            Share to Friends
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

export default WorkoutComplete;
