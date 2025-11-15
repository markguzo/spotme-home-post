import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trophy, Calendar, Dumbbell } from "lucide-react";
import { Friend } from "@/data/mockData";

interface PRDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: Friend | null;
}

export const PRDetailModal = ({ open, onOpenChange, user }: PRDetailModalProps) => {
  if (!user || !user.prDetails) return null;

  const { exercise, weight, reps, date } = user.prDetails;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#131629] border-[#1E3A8A]/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Personal Record</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src={user.photo}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-[#3B82F6]"
            />
            <div>
              <h3 className="font-bold text-lg text-white">{user.name}</h3>
              <p className="text-sm text-gray-400">@{user.username}</p>
            </div>
          </div>

          {/* PR Details Card */}
          <div className="p-6 bg-gradient-to-br from-[#1E3A8A]/30 to-[#3B82F6]/20 rounded-xl border border-[#3B82F6]/30">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-[#3B82F6]/20 rounded-full">
                <Trophy className="w-8 h-8 text-[#3B82F6]" />
              </div>
            </div>

            <h4 className="text-center text-2xl font-bold text-white mb-2">{exercise}</h4>

            <div className="flex items-center justify-center gap-2 mb-4">
              <Dumbbell className="w-5 h-5 text-[#3B82F6]" />
              <span className="text-3xl font-bold text-white">{weight} lbs</span>
            </div>

            <div className="text-center">
              <span className="text-gray-400 text-sm">
                {reps} {reps === 1 ? "rep" : "reps"}
              </span>
            </div>
          </div>

          {/* Date Achieved */}
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Achieved on {formattedDate}</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#0A0B14] rounded-lg border border-[#1E3A8A]/30 text-center">
              <p className="text-xs text-gray-400 mb-1">Current Streak</p>
              <p className="text-xl font-bold text-white">{user.streak} days</p>
            </div>
            <div className="p-3 bg-[#0A0B14] rounded-lg border border-[#1E3A8A]/30 text-center">
              <p className="text-xs text-gray-400 mb-1">Weekly Goal</p>
              <p className="text-xl font-bold text-white">
                {user.weeklyWorkouts}/{user.gymGoalPerWeek}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
