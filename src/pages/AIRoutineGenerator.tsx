import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { hasApiKey } from "@/lib/openai";

type QuestionStep = 
  | "goal"
  | "experience"
  | "frequency"
  | "duration"
  | "equipment"
  | "focus"
  | "generating";

interface Answers {
  goal: string;
  experience: string;
  frequency: string;
  duration: string;
  equipment: string[];
  focus: string[];
}

const goals = [
  { id: "build-muscle", label: "Build Muscle", emoji: "💪", desc: "Gain strength and size" },
  { id: "lose-weight", label: "Lose Weight", emoji: "🔥", desc: "Burn calories and fat" },
  { id: "get-stronger", label: "Get Stronger", emoji: "🏋️", desc: "Increase power and strength" },
  { id: "endurance", label: "Build Endurance", emoji: "🏃", desc: "Improve stamina" },
  { id: "flexibility", label: "Flexibility", emoji: "🧘", desc: "Improve mobility" },
  { id: "general", label: "General Fitness", emoji: "✨", desc: "Stay active and healthy" },
];

const experienceLevels = [
  { id: "beginner", label: "Beginner", emoji: "🌱", desc: "New to working out" },
  { id: "intermediate", label: "Intermediate", emoji: "⚡", desc: "Some experience" },
  { id: "advanced", label: "Advanced", emoji: "🔥", desc: "Very experienced" },
];

const frequencies = [
  { id: "2-3", label: "2-3 times/week", emoji: "📅" },
  { id: "4-5", label: "4-5 times/week", emoji: "💪" },
  { id: "6-7", label: "6-7 times/week", emoji: "🔥" },
];

const durations = [
  { id: "15", label: "15 minutes", emoji: "⚡" },
  { id: "30", label: "30 minutes", emoji: "⏱️" },
  { id: "45", label: "45 minutes", emoji: "💪" },
  { id: "60", label: "60+ minutes", emoji: "🏋️" },
];

const equipment = [
  { id: "bodyweight", label: "Bodyweight Only", emoji: "🤸" },
  { id: "dumbbells", label: "Dumbbells", emoji: "🏋️" },
  { id: "barbell", label: "Barbell", emoji: "⚖️" },
  { id: "machines", label: "Gym Machines", emoji: "🏢" },
  { id: "cardio", label: "Cardio Equipment", emoji: "🏃" },
];

const focusAreas = [
  { id: "upper", label: "Upper Body", emoji: "💪" },
  { id: "lower", label: "Lower Body", emoji: "🦵" },
  { id: "core", label: "Core", emoji: "🔥" },
  { id: "full", label: "Full Body", emoji: "🌟" },
  { id: "cardio", label: "Cardio", emoji: "❤️" },
];

export default function AIRoutineGenerator() {
  const navigate = useNavigate();
  const [step, setStep] = useState<QuestionStep>("goal");

  // Check for API key on mount
  useEffect(() => {
    if (!hasApiKey()) {
      toast({
        title: "API Key Required",
        description: "Please set up your OpenAI API key to use AI features.",
        variant: "destructive",
      });
      navigate("/api-key-setup");
    }
  }, [navigate]);
  const [answers, setAnswers] = useState<Answers>({
    goal: "",
    experience: "",
    frequency: "",
    duration: "",
    equipment: [],
    focus: [],
  });

  const handleAnswer = (key: keyof Answers, value: string | string[]) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    const steps: QuestionStep[] = ["goal", "experience", "frequency", "duration", "equipment", "focus", "generating"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: QuestionStep[] = ["goal", "experience", "frequency", "duration", "equipment", "focus", "generating"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const canProceed = () => {
    switch (step) {
      case "goal":
        return !!answers.goal;
      case "experience":
        return !!answers.experience;
      case "frequency":
        return !!answers.frequency;
      case "duration":
        return !!answers.duration;
      case "equipment":
        return answers.equipment.length > 0;
      case "focus":
        return answers.focus.length > 0;
      default:
        return false;
    }
  };

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setStep("generating");
    setIsGenerating(true);
    setError(null);
    
    try {
      const { generateWorkoutRoutine } = await import("@/lib/aiService");
      
      const workout = await generateWorkoutRoutine(
        answers.goal,
        answers.experience,
        answers.frequency,
        answers.duration,
        answers.equipment,
        answers.focus
      );
      
      // Save to localStorage and navigate
      const routine = {
        id: `routine_${Date.now()}`,
        title: workout.title,
        exercises: workout.exercises.map((ex, idx) => ({
          id: `ex_${idx}`,
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps,
          weight: ex.weight,
          completed: false,
        })),
      };
      
      localStorage.setItem('currentRoutine', JSON.stringify(routine));
      
      navigate("/home", { 
        state: { 
          message: "Your AI-generated routine has been created!",
          routine: routine
        } 
      });
    } catch (err: any) {
      console.error("Error generating routine:", err);
      setError(err.message || "Failed to generate routine. Please try again.");
      setStep("focus"); // Go back to last step
    } finally {
      setIsGenerating(false);
    }
  };

  const generateWorkoutFromAnswers = (answers: Answers) => {
    const goalMap: Record<string, string> = {
      "build-muscle": "Muscle Builder",
      "lose-weight": "Fat Burner",
      "get-stronger": "Strength Builder",
      "endurance": "Endurance Builder",
      "flexibility": "Flexibility Flow",
      "general": "All-Around Fitness",
    };

    const title = `${goalMap[answers.goal] || "Custom"} Routine`;

    // Generate exercises based on answers
    const exercises: Array<{ name: string; sets: number; reps: number; weight?: number }> = [];

    if (answers.focus.includes("upper") || answers.focus.includes("full")) {
      exercises.push(
        { name: "Bench Press", sets: 4, reps: answers.experience === "beginner" ? 8 : 6, weight: answers.experience === "beginner" ? 135 : 185 },
        { name: "Shoulder Press", sets: 3, reps: 10, weight: answers.experience === "beginner" ? 45 : 75 },
        { name: "Bicep Curls", sets: 3, reps: 12, weight: answers.experience === "beginner" ? 20 : 35 }
      );
    }

    if (answers.focus.includes("lower") || answers.focus.includes("full")) {
      exercises.push(
        { name: "Squats", sets: 4, reps: answers.experience === "beginner" ? 10 : 8, weight: answers.experience === "beginner" ? 95 : 225 },
        { name: "Romanian Deadlifts", sets: 3, reps: 10, weight: answers.experience === "beginner" ? 135 : 185 },
        { name: "Lunges", sets: 3, reps: 12 }
      );
    }

    if (answers.focus.includes("core")) {
      exercises.push(
        { name: "Plank", sets: 3, reps: 1 },
        { name: "Russian Twists", sets: 3, reps: 20 },
        { name: "Leg Raises", sets: 3, reps: 15 }
      );
    }

    if (answers.focus.includes("cardio")) {
      exercises.push(
        { name: "Running", sets: 1, reps: 1 },
        { name: "Jump Rope", sets: 3, reps: 1 },
        { name: "Burpees", sets: 3, reps: 10 }
      );
    }

    // If no specific focus, add full body
    if (exercises.length === 0) {
      exercises.push(
        { name: "Push-ups", sets: 3, reps: 15 },
        { name: "Squats", sets: 3, reps: 15 },
        { name: "Plank", sets: 3, reps: 1 },
        { name: "Jumping Jacks", sets: 3, reps: 20 }
      );
    }

    return { title, exercises };
  };

  const toggleArrayAnswer = (key: "equipment" | "focus", value: string) => {
    setAnswers(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value],
    }));
  };

  const progress = (() => {
    const steps = ["goal", "experience", "frequency", "duration", "equipment", "focus"];
    return ((steps.indexOf(step) + 1) / steps.length) * 100;
  })();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-4">
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={() => navigate("/my-routines")}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-primary rounded-xl">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">AI Routine Generator</h1>
            </div>
          </div>
          
          {/* Progress Bar */}
          {step !== "generating" && (
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-8">
        <AnimatePresence mode="wait">
          {step === "goal" && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">What's your main goal? 🎯</h2>
                <p className="text-muted-foreground">Choose what you want to achieve</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {goals.map((goal) => (
                  <Card
                    key={goal.id}
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      answers.goal === goal.id
                        ? "bg-gradient-primary border-primary/50 scale-105 shadow-lg"
                        : "bg-card border-border hover:border-primary/30 hover:scale-102"
                    }`}
                    onClick={() => handleAnswer("goal", goal.id)}
                  >
                    <div className="text-3xl mb-2">{goal.emoji}</div>
                    <div className="font-semibold mb-1">{goal.label}</div>
                    <div className="text-xs text-muted-foreground">{goal.desc}</div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {step === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">What's your experience level? 📊</h2>
                <p className="text-muted-foreground">Help us customize the intensity</p>
              </div>
              <div className="space-y-3">
                {experienceLevels.map((level) => (
                  <Card
                    key={level.id}
                    className={`p-5 cursor-pointer transition-all duration-200 ${
                      answers.experience === level.id
                        ? "bg-gradient-primary border-primary/50 scale-105 shadow-lg"
                        : "bg-card border-border hover:border-primary/30 hover:scale-102"
                    }`}
                    onClick={() => handleAnswer("experience", level.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{level.emoji}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg mb-1">{level.label}</div>
                        <div className="text-sm text-muted-foreground">{level.desc}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {step === "frequency" && (
            <motion.div
              key="frequency"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">How often can you workout? 📅</h2>
                <p className="text-muted-foreground">Be realistic about your schedule</p>
              </div>
              <div className="space-y-3">
                {frequencies.map((freq) => (
                  <Card
                    key={freq.id}
                    className={`p-5 cursor-pointer transition-all duration-200 ${
                      answers.frequency === freq.id
                        ? "bg-gradient-primary border-primary/50 scale-105 shadow-lg"
                        : "bg-card border-border hover:border-primary/30 hover:scale-102"
                    }`}
                    onClick={() => handleAnswer("frequency", freq.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{freq.emoji}</div>
                      <div className="font-semibold text-lg">{freq.label}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {step === "duration" && (
            <motion.div
              key="duration"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">How long per session? ⏱️</h2>
                <p className="text-muted-foreground">Choose your preferred workout length</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {durations.map((dur) => (
                  <Card
                    key={dur.id}
                    className={`p-5 cursor-pointer transition-all duration-200 text-center ${
                      answers.duration === dur.id
                        ? "bg-gradient-primary border-primary/50 scale-105 shadow-lg"
                        : "bg-card border-border hover:border-primary/30 hover:scale-102"
                    }`}
                    onClick={() => handleAnswer("duration", dur.id)}
                  >
                    <div className="text-3xl mb-2">{dur.emoji}</div>
                    <div className="font-semibold">{dur.label}</div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {step === "equipment" && (
            <motion.div
              key="equipment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">What equipment do you have? 🏋️</h2>
                <p className="text-muted-foreground">Select all that apply</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {equipment.map((eq) => (
                  <Card
                    key={eq.id}
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      answers.equipment.includes(eq.id)
                        ? "bg-gradient-primary border-primary/50 scale-105 shadow-lg"
                        : "bg-card border-border hover:border-primary/30 hover:scale-102"
                    }`}
                    onClick={() => toggleArrayAnswer("equipment", eq.id)}
                  >
                    <div className="text-2xl mb-2">{eq.emoji}</div>
                    <div className="font-semibold text-sm">{eq.label}</div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {step === "focus" && (
            <motion.div
              key="focus"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">What areas to focus on? 🎯</h2>
                <p className="text-muted-foreground">Select all that interest you</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {focusAreas.map((area) => (
                  <Card
                    key={area.id}
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      answers.focus.includes(area.id)
                        ? "bg-gradient-primary border-primary/50 scale-105 shadow-lg"
                        : "bg-card border-border hover:border-primary/30 hover:scale-102"
                    }`}
                    onClick={() => toggleArrayAnswer("focus", area.id)}
                  >
                    <div className="text-2xl mb-2">{area.emoji}</div>
                    <div className="font-semibold text-sm">{area.label}</div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {step === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 space-y-6"
            >
              {error ? (
                <>
                  <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-12 h-12 text-destructive" />
                  </div>
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-destructive">Generation Failed</h2>
                    <p className="text-muted-foreground">{error}</p>
                  </div>
                  <Button onClick={() => setStep("focus")} className="mt-4">
                    Go Back
                  </Button>
                </>
              ) : (
                <>
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-primary-foreground animate-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-primary rounded-full animate-ping opacity-20" />
                  </div>
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">Creating Your Perfect Routine</h2>
                    <p className="text-muted-foreground">Our AI is analyzing your preferences...</p>
                  </div>
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step !== "generating" && (
          <div className="flex gap-3 mt-8">
            {step !== "goal" && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12 rounded-2xl border-2 font-semibold"
              >
                Back
              </Button>
            )}
            {step !== "focus" ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 h-12 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleGenerate}
                disabled={!canProceed()}
                className="flex-1 h-12 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Routine
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

