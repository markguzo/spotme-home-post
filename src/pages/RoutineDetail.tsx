import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Bot, Send, Loader2 } from "lucide-react";
import { modifyRoutineWithAI } from "@/lib/aiService";
import { hasApiKey } from "@/lib/openai";
import { toast } from "@/hooks/use-toast";

const RoutineDetail = () => {
  const navigate = useNavigate();
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [isModifying, setIsModifying] = useState(false);
  const [exercises, setExercises] = useState([
    { name: "Bench Press", sets: 3, reps: 10 },
    { name: "Incline Dumbbell Press", sets: 3, reps: 12 },
    { name: "Cable Flyes", sets: 3, reps: 15 },
    { name: "Overhead Press", sets: 3, reps: 8 },
    { name: "Lateral Raises", sets: 3, reps: 12 },
  ]);

  const handleAIModify = async () => {
    if (!hasApiKey()) {
      toast({
        title: "API Key Required",
        description: "Please set up your OpenAI API key first.",
        variant: "destructive",
      });
      return;
    }

    setIsModifying(true);
    try {
      const routine = {
        title: "Push Day",
        exercises: exercises.map(ex => ({
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps,
        })),
        duration: 32,
      };

      const modified = await modifyRoutineWithAI(routine, aiInput);
      setExercises(modified.exercises.map(ex => ({
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
      })));
      setAiInput("");
      toast({
        title: "Routine Modified!",
        description: "Your routine has been updated based on your request.",
      });
    } catch (error: any) {
      toast({
        title: "Modification Failed",
        description: error.message || "Failed to modify routine.",
        variant: "destructive",
      });
    } finally {
      setIsModifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate("/library")} className="text-foreground">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">🔥 Push Day</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Routine Info Card */}
        <div className="bg-card p-6 rounded-2xl space-y-3">
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-muted rounded-full text-sm text-foreground">Strength</span>
            <span className="px-3 py-1 bg-muted rounded-full text-sm text-foreground">Upper Body</span>
          </div>
          <p className="text-muted-foreground text-sm">Estimated time: 32 min</p>
          <p className="text-muted-foreground text-sm">Last completed: 2 days ago</p>
        </div>

        {/* Exercises List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Exercises</h2>
          <div className="bg-card rounded-2xl overflow-hidden divide-y divide-border">
            {exercises.map((exercise, idx) => (
              <div key={idx} className="p-4">
                <p className="text-foreground font-medium">{exercise.name}</p>
                <p className="text-muted-foreground text-sm mt-1">
                  {exercise.sets} × {exercise.reps} reps
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/workout-session')}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 text-base font-medium"
          >
            Start Workout
          </Button>
          <Button 
            onClick={() => setIsAIOpen(true)}
            className="w-full bg-gradient-primary text-primary-foreground rounded-full h-12 text-base font-medium"
          >
            <Bot className="w-4 h-4 mr-2" />
            Modify with AI
          </Button>
          <Button 
            onClick={() => navigate('/create-routine')}
            className="w-full bg-card hover:bg-muted text-foreground border border-border rounded-full h-12 text-base font-medium"
          >
            Edit Routine
          </Button>
        </div>
      </div>

      {/* AI Chat Dialog */}
      <Dialog open={isAIOpen} onOpenChange={setIsAIOpen}>
        <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              AI Routine Modifier
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Tell me how you'd like to modify this routine. For example:
                <br />• "Add more leg exercises"
                <br />• "Reduce the number of sets"
                <br />• "Make it more beginner-friendly"
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Describe your changes..."
                onKeyPress={(e) => e.key === "Enter" && !isModifying && handleAIModify()}
                disabled={isModifying}
              />
              <Button
                onClick={handleAIModify}
                disabled={isModifying || !aiInput.trim()}
                className="bg-gradient-primary text-primary-foreground"
              >
                {isModifying ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoutineDetail;
