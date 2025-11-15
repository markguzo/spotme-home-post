import { Card } from './ui/card';

interface StreakRowProps {
  streak: number;
  weeklyGoal: number;
  postsThisWeek: number;
}

export const StreakRow = ({ streak, weeklyGoal, postsThisWeek }: StreakRowProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-4 bg-card border-border shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <div>
            <div className="text-2xl font-bold text-foreground">{streak}</div>
            <div className="text-sm text-muted-foreground">Day streak</div>
          </div>
        </div>
      </Card>
      
      <Card className="p-4 bg-card border-border shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {postsThisWeek}/{weeklyGoal}
            </div>
            <div className="text-sm text-muted-foreground">Week goal</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
