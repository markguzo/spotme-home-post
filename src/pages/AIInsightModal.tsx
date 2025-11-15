import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Target, TrendingUp, Flame, Dumbbell, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AIInsightModal = () => {
  const navigate = useNavigate();

  const handleAddExercise = (exerciseName: string) => {
    toast({ 
      title: `Added ${exerciseName}`,
      description: "Exercise added to your new routine"
    });
  };

  const handleCreateRoutineFromRecommendations = () => {
    toast({ 
      title: "Creating routine from recommendations...",
      description: "Opening routine builder with AI suggestions"
    });
    navigate('/create-routine');
  };

  const recommendedExercises = [
    { name: "Push-ups", reason: "Build upper body strength", sets: "3×12", difficulty: "Beginner" },
    { name: "Squats", reason: "Strengthen legs & core", sets: "3×15", difficulty: "Beginner" },
    { name: "Plank Hold", reason: "Improve core stability", sets: "3×30s", difficulty: "Beginner" },
    { name: "Lunges", reason: "Balance & leg power", sets: "3×10 each", difficulty: "Intermediate" },
    { name: "Burpees", reason: "Full body cardio boost", sets: "3×8", difficulty: "Intermediate" },
  ];

  const fitnessGoals = [
    { goal: "Build Upper Body Strength", progress: 65, target: "Push Day 2×/week" },
    { goal: "Improve Cardio Endurance", progress: 40, target: "20min runs 3×/week" },
    { goal: "Increase Flexibility", progress: 30, target: "Stretch daily" },
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-end justify-center z-50 animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-card rounded-t-[28px] border-t-2 border-primary/30 max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 pb-3">
          <h2 className="text-2xl font-bold text-foreground text-center">🔮 AI Workout Insight</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6">
          <div className="flex flex-col gap-6 pb-6">
          
            {/* Section 1: Most Consistent Category */}
          <div className="bg-muted p-4 rounded-2xl border border-primary/20">
            <p className="text-foreground text-center">
              Your most consistent category this month: <span className="font-bold">Strength 💪</span>
            </p>
          </div>

          {/* Section 2: Weekly Progress */}
          <div className="bg-muted p-4 rounded-2xl">
            <p className="text-foreground text-sm mb-2">Weekly Goal Progress</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-muted/50 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-primary h-full w-3/4 rounded-full"></div>
              </div>
              <span className="text-foreground font-medium">3 / 4 🔥</span>
            </div>
          </div>

          {/* Section 3: AI Smart Nudge */}
          <div className="bg-primary/20 p-4 rounded-2xl border border-primary/30">
            <p className="text-foreground text-center">
              ✨ You're 1 workout away from hitting your weekly goal.
            </p>
          </div>

            {/* Section 4: Your Fitness Goals */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="text-primary" size={20} />
                <h3 className="text-foreground font-semibold">Your Fitness Goals</h3>
              </div>
              <div className="space-y-3">
                {fitnessGoals.map((goal, idx) => (
                  <div key={idx} className="bg-muted p-4 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-foreground font-medium text-sm">{goal.goal}</p>
                      <span className="text-primary text-sm font-semibold">{goal.progress}%</span>
                    </div>
                    <div className="bg-muted/50 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-muted-foreground text-xs flex items-center gap-1">
                      <TrendingUp size={12} />
                      Target: {goal.target}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Recommended Exercises */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Dumbbell className="text-primary" size={20} />
                  <h3 className="text-foreground font-semibold">Recommended Exercises</h3>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">Based on your goals and current progress</p>
              
              {/* Big AI Create Routine Button */}
              <div className="bg-gradient-primary p-4 rounded-2xl space-y-3">
                <div className="text-center space-y-2">
                  <p className="text-primary-foreground font-semibold">✨ Let AI Build Your Routine</p>
                  <p className="text-primary-foreground/80 text-sm">Perfect for beginners! AI will create a complete workout plan based on your goals.</p>
                </div>
                <Button
                  onClick={handleCreateRoutineFromRecommendations}
                  className="w-full bg-primary-foreground hover:bg-primary-foreground/90 text-primary rounded-full h-12 text-base font-semibold shadow-lg"
                >
                  🤖 Create My AI Routine
                </Button>
              </div>

              <div className="space-y-2">
                {recommendedExercises.map((exercise, idx) => (
                  <div key={idx} className="bg-muted p-4 rounded-xl space-y-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-foreground font-medium">{exercise.name}</p>
                        <p className="text-muted-foreground text-xs mt-1">{exercise.reason}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                          exercise.difficulty === 'Beginner' 
                            ? 'bg-success/20 text-success' 
                            : 'bg-orange-500/20 text-orange-500'
                        }`}>
                          {exercise.difficulty}
                        </span>
                        <button
                          onClick={() => handleAddExercise(exercise.name)}
                          className="w-7 h-7 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/30 flex items-center justify-center transition-colors"
                          aria-label="Add exercise"
                        >
                          <Plus size={14} className="text-primary" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Flame size={14} className="text-primary" />
                      <p className="text-primary text-sm font-medium">{exercise.sets}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6: AI Tips */}
            <div className="bg-primary/10 p-4 rounded-xl border border-primary/20 space-y-2">
              <h3 className="text-foreground font-semibold text-sm">💡 Pro Tips</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>• Try a quick 15-min routine today to stay on track</p>
                <p>• Your Monday workouts show the best performance</p>
                <p>• Adding mobility work once a week will improve recovery</p>
                <p>• You're 1 workout away from beating your weekly goal!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="p-6 pt-3 border-t border-border bg-card">
          <Button 
            onClick={() => navigate(-1)}
            className="w-full bg-muted hover:bg-muted/80 text-foreground border border-border rounded-full h-12 text-base font-medium"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIInsightModal;
