import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
}

const CreateRoutine = () => {
  const navigate = useNavigate();
  const [routineName, setRoutineName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: "", sets: "", reps: "" }
  ]);

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "" }]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, field: keyof Exercise, value: string) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const addSuggestedExercise = (name: string) => {
    setExercises([...exercises, { name, sets: "3", reps: "10" }]);
    toast({ title: `Added ${name}` });
  };

  const saveRoutine = () => {
    toast({ title: "Routine saved successfully!" });
    navigate("/library");
  };

  const suggestedExercises = ["Bench Press", "Lat Pulldown", "Shoulder Press"];

  return (
    <div className="min-h-screen bg-background text-foreground pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate("/library")} className="text-foreground">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Create New Routine</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Routine Name */}
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Routine Name</label>
          <Input
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            placeholder="e.g., Push Day, Leg Day..."
            className="bg-card border-border rounded-xl h-12"
          />
        </div>

        {/* Exercises Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Exercises</h2>
          
          {exercises.map((exercise, index) => (
            <div key={index} className="bg-card p-4 rounded-xl space-y-3">
              <div className="flex items-start justify-between">
                <Input
                  value={exercise.name}
                  onChange={(e) => updateExercise(index, "name", e.target.value)}
                  placeholder="Exercise name"
                  className="bg-muted border-border rounded-lg flex-1"
                />
                {exercises.length > 1 && (
                  <button
                    onClick={() => removeExercise(index)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  value={exercise.sets}
                  onChange={(e) => updateExercise(index, "sets", e.target.value)}
                  placeholder="Sets"
                  className="bg-muted border-border rounded-lg"
                />
                <Input
                  value={exercise.reps}
                  onChange={(e) => updateExercise(index, "reps", e.target.value)}
                  placeholder="Reps"
                  className="bg-muted border-border rounded-lg"
                />
              </div>
            </div>
          ))}

          <Button
            onClick={addExercise}
            className="w-full bg-card hover:bg-muted text-foreground border border-border rounded-full h-12"
          >
            <Plus size={20} className="mr-2" />
            Add Exercise
          </Button>
        </div>

        {/* AI Suggestions */}
        <div className="bg-primary/20 p-4 rounded-2xl border border-primary/30 space-y-3">
          <h3 className="text-foreground font-semibold">✨ Suggested Exercises</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedExercises.map((exercise) => (
              <button
                key={exercise}
                onClick={() => addSuggestedExercise(exercise)}
                className="px-4 py-2 bg-muted hover:bg-primary/30 rounded-full text-sm text-foreground transition-colors"
              >
                + {exercise}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <Button 
          onClick={saveRoutine}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 text-base font-medium"
        >
          Save Routine
        </Button>
      </div>
    </div>
  );
};

export default CreateRoutine;
