import { Flame, Target, Dumbbell, Clock } from 'lucide-react';

interface CompactStatsBarProps {
  streak: number;
  weeklyGoal: number;
  postsThisWeek: number;
  todayWorkout?: {
    title: string;
    time: string;
  };
}

export const CompactStatsBar = ({ streak, weeklyGoal, postsThisWeek, todayWorkout }: CompactStatsBarProps) => {
  return (
    <div className="sticky top-0 z-50 bg-black/85 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 text-white">
          {/* Streak */}
          <div className="flex items-center gap-2 flex-1">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-full p-1.5">
              <Flame className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold">{streak}</div>
              <div className="text-[10px] text-white/60 uppercase tracking-wide">Streak</div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-10 w-px bg-white/10" />

          {/* Weekly Goal */}
          <div className="flex items-center gap-2 flex-1">
            <div className="bg-primary/20 rounded-full p-1.5">
              <Target className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <div className="text-xl font-bold">{postsThisWeek}/{weeklyGoal}</div>
              <div className="text-[10px] text-white/60 uppercase tracking-wide">Week</div>
            </div>
          </div>

          {/* Divider */}
          {todayWorkout && <div className="h-10 w-px bg-white/10" />}

          {/* Today's Workout */}
          {todayWorkout && (
            <div className="flex items-center gap-2 flex-1">
              <div className="bg-primary/20 rounded-full p-1.5">
                <Dumbbell className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{todayWorkout.title}</div>
                <div className="text-[10px] text-white/60 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {todayWorkout.time}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
