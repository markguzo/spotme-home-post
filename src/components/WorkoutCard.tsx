import { Clock, Dumbbell } from 'lucide-react';
import { Card } from './ui/card';

interface WorkoutCardProps {
  workout?: {
    title: string;
    time: string;
    durationMin: number;
  };
}

export const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  if (!workout) {
    return (
      <Card className="p-5 bg-card border-border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
            <Dumbbell className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">No workout planned</h3>
            <p className="text-sm text-muted-foreground">Add one in your calendar</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5 bg-card border-border shadow-sm">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Dumbbell className="h-5 w-5 text-primary" />
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Today's Plan
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-1">
            {workout.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {workout.time}
            </div>
            <div>{workout.durationMin} min</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
