import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trophy, TrendingUp, Calendar, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RankInsightsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRank: number;
  userWorkouts: number;
  topUserName: string;
  topUserWorkouts: number;
  weeklyGoal: number;
}

export const RankInsightsModal = ({
  open,
  onOpenChange,
  userRank,
  userWorkouts,
  topUserName,
  topUserWorkouts,
  weeklyGoal,
}: RankInsightsModalProps) => {
  const isFirstPlace = userRank === 1;
  const workoutGap = topUserWorkouts - userWorkouts;
  const daysLeftInWeek = 7 - new Date().getDay();
  const progressPercentage = (userWorkouts / weeklyGoal) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#131629] border-[#1E3A8A]/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#3B82F6]" />
            Your Rank Insights
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {isFirstPlace ? (
            <>
              {/* First Place Celebration */}
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                    🎉 You're in First Place!
                  </h3>
                  <p className="text-gray-300">
                    You've completed <span className="font-bold text-[#3B82F6]">{userWorkouts}/{weeklyGoal}</span> workouts this week
                  </p>
                </div>
              </div>

              {/* Lead Stats */}
              <div className="bg-[#0A0B14] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-gray-400">Your Lead</span>
                  </div>
                  <span className="font-bold text-green-400">+{workoutGap} workout{workoutGap !== 1 ? 's' : ''}</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              {/* Motivation */}
              <div className="bg-gradient-to-br from-[#1E3A8A]/30 to-[#3B82F6]/20 rounded-xl p-4 border border-[#3B82F6]/30">
                <p className="text-center text-sm text-gray-300">
                  Keep going to maintain your lead! 💪
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Catch-Up Challenge */}
              <div className="text-center space-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-full flex items-center justify-center mx-auto">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Catch Up Challenge</h3>
              </div>

              {/* Gap Analysis */}
              <div className="bg-[#0A0B14] rounded-xl p-4 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Gap to Close</span>
                    <span className="font-bold text-[#3B82F6]">{workoutGap} workout{workoutGap !== 1 ? 's' : ''}</span>
                  </div>
                  <Progress 
                    value={(userWorkouts / topUserWorkouts) * 100} 
                    className="h-2" 
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>You: {userWorkouts}</span>
                    <span>{topUserName}: {topUserWorkouts}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1E3A8A]/30">
                  <p className="text-sm text-gray-300 mb-2">
                    You need to complete <span className="font-bold text-[#3B82F6]">{workoutGap} more workout{workoutGap !== 1 ? 's' : ''}</span> to reach #1
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{daysLeftInWeek} day{daysLeftInWeek !== 1 ? 's' : ''} left this week</span>
                  </div>
                </div>
              </div>

              {/* Motivation */}
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-500/30">
                <p className="text-center text-sm text-gray-300">
                  You're currently <span className="font-bold text-orange-400">{workoutGap} workout{workoutGap !== 1 ? 's' : ''}</span> behind {topUserName}. Let's catch up! 🔥
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

