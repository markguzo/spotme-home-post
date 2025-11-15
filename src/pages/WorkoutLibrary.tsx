import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

type WorkoutCategory = "All" | "Strength" | "Cardio" | "Mobility" | "Mixed" | "Favorites";

interface Routine {
  id: string;
  title: string;
  emoji: string;
  tags: string[];
  lastCompleted: string;
  exercises: number;
  duration: number;
  isFavorite: boolean;
}

const mockRoutines: Routine[] = [
  {
    id: "1",
    title: "Push Day",
    emoji: "🔥",
    tags: ["Strength", "Upper Body"],
    lastCompleted: "2 days ago",
    exercises: 5,
    duration: 32,
    isFavorite: true,
  },
  {
    id: "2",
    title: "Glutes + Lower Body",
    emoji: "💪",
    tags: ["Strength", "Lower Body"],
    lastCompleted: "4 days ago",
    exercises: 6,
    duration: 40,
    isFavorite: false,
  },
  {
    id: "3",
    title: "Morning Cardio Blast",
    emoji: "🏃",
    tags: ["Cardio"],
    lastCompleted: "1 day ago",
    exercises: 4,
    duration: 20,
    isFavorite: true,
  },
  {
    id: "4",
    title: "Full Body Stretch",
    emoji: "🧘",
    tags: ["Mobility"],
    lastCompleted: "5 days ago",
    exercises: 8,
    duration: 15,
    isFavorite: false,
  },
];

const categories: { label: string; emoji: string; value: WorkoutCategory }[] = [
  { label: "Strength", emoji: "🏋️", value: "Strength" },
  { label: "Cardio", emoji: "🏃", value: "Cardio" },
  { label: "Mobility", emoji: "🧘", value: "Mobility" },
  { label: "Mixed", emoji: "🌀", value: "Mixed" },
  { label: "Favorites", emoji: "⭐", value: "Favorites" },
];

const suggestions = [
  { title: "15-Min Outdoor Run Boost", emoji: "🏃", category: "Cardio" },
  { title: "10-Min Stretch Reset", emoji: "🧘", category: "Mobility" },
  { title: "Dorm-Friendly Bodyweight Strength", emoji: "🏋️", category: "Strength" },
];

export default function WorkoutLibrary() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategory>("All");

  const filteredRoutines = mockRoutines.filter((routine) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Favorites") return routine.isFavorite;
    return routine.tags.includes(selectedCategory);
  });

  const handleAIInsightClick = () => {
    navigate('/ai-insight');
  };

  const handleRoutineClick = (routine: Routine) => {
    navigate('/routine/1');
  };

  const handleCreateRoutine = () => {
    navigate('/create-routine');
  };

  const handleSuggestionClick = (suggestion: typeof suggestions[0]) => {
    navigate('/routine/1');
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/profile")} className="text-foreground">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">📘 My Workout Library</h1>
          </div>
          <Button
            size="icon"
            className="bg-primary/20 hover:bg-primary/30 text-primary rounded-full shadow-glow"
            onClick={handleCreateRoutine}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 space-y-6 mt-6">
        {/* AI Insight Banner */}
        <Card
          className="bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30 p-5 cursor-pointer hover:shadow-glow transition-all duration-300"
          onClick={handleAIInsightClick}
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-semibold mb-1">AI Insight</div>
              <div className="text-sm text-muted-foreground">
                Your strength workouts are your most consistent this month.
              </div>
            </div>
          </div>
        </Card>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant={selectedCategory === "All" ? "default" : "outline"}
            className="rounded-full px-4 py-2 text-sm whitespace-nowrap"
            onClick={() => setSelectedCategory("All")}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={selectedCategory === cat.value ? "default" : "outline"}
              className="rounded-full px-4 py-2 text-sm whitespace-nowrap"
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.emoji} {cat.label}
            </Button>
          ))}
        </div>

        {/* Saved Routines */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Routines</h2>
          {filteredRoutines.map((routine) => (
            <Card
              key={routine.id}
              className="bg-card border-border p-5 cursor-pointer hover:shadow-glow transition-all duration-300"
              onClick={() => handleRoutineClick(routine)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{routine.emoji}</span>
                    <h3 className="font-bold text-lg">{routine.title}</h3>
                    {routine.isFavorite && <span className="text-sm">⭐</span>}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Last done: {routine.lastCompleted}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {routine.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-muted/50 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {routine.exercises} exercises • ~{routine.duration} min
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-4" />
              </div>
            </Card>
          ))}
        </div>

        {/* Create Routine Button */}
        <Button
          className="w-full py-6 rounded-full bg-gradient-to-r from-primary/30 to-primary/20 hover:from-primary/40 hover:to-primary/30 text-foreground font-semibold shadow-glow"
          onClick={handleCreateRoutine}
        >
          ➕ Create Your Own Routine
        </Button>

        {/* Smart Suggestions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">✨ Suggested For Today</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {suggestions.map((suggestion, idx) => (
              <Card
                key={idx}
                className="min-w-[240px] bg-card border-border p-4 cursor-pointer hover:shadow-glow transition-all duration-300"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="text-2xl mb-2">{suggestion.emoji}</div>
                <div className="font-semibold text-sm mb-1">{suggestion.title}</div>
                <div className="text-xs text-muted-foreground">{suggestion.category}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

