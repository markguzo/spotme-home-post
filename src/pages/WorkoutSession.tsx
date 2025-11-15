import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const WorkoutSession = () => {
  const navigate = useNavigate();
  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const [timer, setTimer] = useState("00:12:34");

  const exercises = [
    { name: "Bench Press", sets: 3, reps: 10 },
    { name: "Incline Dumbbell Press", sets: 3, reps: 12 },
    { name: "Cable Flyes", sets: 3, reps: 15 },
  ];

  const currentExercise = exercises[0];

  const markSetComplete = () => {
    setCompletedSets([...completedSets, currentSet]);
    if (currentSet < currentExercise.sets) {
      setCurrentSet(currentSet + 1);
      toast({ title: `Set ${currentSet} completed! 💪` });
    }
  };

  const finishWorkout = () => {
    navigate("/workout-complete");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 flex items-center justify-between border-b border-border">
        <button onClick={() => navigate(-1)} className="text-foreground">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Workout Session</h1>
        <div className="w-6"></div>
      </div>

      <div className="p-6 space-y-6">
        {/* Timer */}
        <div className="bg-primary/20 p-8 rounded-2xl border border-primary/30 text-center">
          <p className="text-5xl font-bold text-foreground font-mono">{timer}</p>
        </div>

        {/* Current Exercise */}
        <div className="bg-card p-6 rounded-2xl space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{currentExercise.name}</h2>
            <p className="text-muted-foreground mt-1">
              {currentExercise.sets} sets × {currentExercise.reps} reps
            </p>
          </div>
          
          <div className="bg-muted p-4 rounded-xl">
            <p className="text-foreground text-center text-lg">
              Set <span className="font-bold text-primary">{currentSet}</span> of {currentExercise.sets}
            </p>
          </div>

          <Button
            onClick={markSetComplete}
            disabled={completedSets.includes(currentSet)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-14 text-base font-medium disabled:opacity-50"
          >
            {completedSets.includes(currentSet) ? (
              <>
                <Check className="mr-2" /> Set Complete
              </>
            ) : (
              "Mark Set Complete"
            )}
          </Button>
        </div>

        {/* Exercise Progress */}
        <div className="space-y-2">
          <h3 className="text-foreground font-semibold">Progress</h3>
          <div className="flex gap-2">
            {Array.from({ length: currentExercise.sets }).map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 h-2 rounded-full ${
                  completedSets.includes(idx + 1)
                    ? "bg-success"
                    : idx + 1 === currentSet
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* AI Tip */}
        <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
          <p className="text-muted-foreground text-sm">
            <span className="text-foreground font-semibold">✨ Form Tip:</span> Keep elbows at 45º (AI-detected)
          </p>
        </div>

        {/* Finish Button */}
        <Button
          onClick={finishWorkout}
          className="w-full bg-card hover:bg-muted text-foreground border border-border rounded-full h-12 text-base font-medium"
        >
          Finish Workout
        </Button>
      </div>
    </div>
  );
};

export default WorkoutSession;
