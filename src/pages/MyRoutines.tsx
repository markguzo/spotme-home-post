import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, Sparkles, Play, Star, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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

interface InfluencerRoutine {
  id: string;
  title: string;
  emoji: string;
  influencer: string;
  influencerPhoto: string;
  followers: string;
  rating: number;
  completed: number;
  tags: string[];
  duration: number;
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

const influencerRoutines: InfluencerRoutine[] = [
  {
    id: "inf1",
    title: "6-Week Shred Program",
    emoji: "🔥",
    influencer: "Chris Bumstead",
    influencerPhoto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop",
    followers: "2.5M",
    rating: 4.9,
    completed: 12500,
    tags: ["Strength", "Cutting"],
    duration: 45,
  },
  {
    id: "inf2",
    title: "Glute Builder Challenge",
    emoji: "🍑",
    influencer: "Stephanie Buttermore",
    influencerPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    followers: "1.8M",
    rating: 4.8,
    completed: 8900,
    tags: ["Lower Body", "Strength"],
    duration: 35,
  },
  {
    id: "inf3",
    title: "HIIT Fat Burner",
    emoji: "⚡",
    influencer: "Joe Wicks",
    influencerPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    followers: "3.2M",
    rating: 4.7,
    completed: 15200,
    tags: ["Cardio", "HIIT"],
    duration: 25,
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

export default function MyRoutines() {
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
    navigate(`/routine/${routine.id}`);
  };

  const handleStartWorkout = (routine: Routine) => {
    navigate(`/workout-session`, { state: { routineId: routine.id } });
  };

  const handleCreateRoutine = () => {
    navigate('/create-routine');
  };

  const handleAIRoutine = () => {
    navigate('/ai-routine-generator');
  };

  const handleSuggestionClick = (suggestion: typeof suggestions[0]) => {
    navigate('/routine/1');
  };

  const handleInfluencerRoutine = (routine: InfluencerRoutine) => {
    navigate(`/routine/${routine.id}`, { state: { influencer: true } });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">My Routines</h1>
          <Button
            size="icon"
            className="h-11 w-11 rounded-2xl bg-gradient-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105"
            onClick={handleCreateRoutine}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 space-y-6 mt-6">
        {/* Hero Actions */}
        <div className="grid grid-cols-2 gap-3">
          {/* AI Generator Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card
              className="p-5 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-purple-600/20 border-purple-500/30 rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300 glow-primary"
              onClick={handleAIRoutine}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-gradient-primary rounded-2xl">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">AI Generator</h3>
                  <p className="text-xs text-muted-foreground">Create custom routine</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Start Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              className="p-5 bg-gradient-to-br from-orange-600/20 via-red-600/20 to-orange-600/20 border-orange-500/30 rounded-3xl cursor-pointer hover:scale-105 transition-all duration-300 glow-primary"
              onClick={() => navigate("/library")}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">Quick Start</h3>
                  <p className="text-xs text-muted-foreground">Start workout now</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Influencer Routines Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Influencer Routines</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
              onClick={() => navigate("/influencer-routines")}
            >
              See All
            </Button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {influencerRoutines.map((routine) => (
              <Card
                key={routine.id}
                className="min-w-[280px] bg-card border-border rounded-3xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 card-elevated"
                onClick={() => handleInfluencerRoutine(routine)}
              >
                <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/10">
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold">{routine.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-4xl mb-1">{routine.emoji}</div>
                    <h3 className="font-bold text-lg mb-1">{routine.title}</h3>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={routine.influencerPhoto}
                      alt={routine.influencer}
                      className="w-8 h-8 rounded-full border-2 border-primary/30"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{routine.influencer}</div>
                      <div className="text-xs text-muted-foreground">{routine.followers} followers</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Zap className="w-3 h-3" />
                      <span>{routine.duration} min</span>
                    </div>
                    <div className="text-muted-foreground">
                      {routine.completed.toLocaleString()} completed
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {routine.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* AI Insight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card
            className="bg-gradient-to-r from-primary/20 via-primary/15 to-primary/20 border-primary/30 p-5 cursor-pointer hover:scale-102 transition-all duration-300 rounded-3xl glow-primary"
            onClick={handleAIInsightClick}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gradient-primary rounded-xl">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold mb-1">AI Insight</div>
                <div className="text-sm text-muted-foreground">
                  Your strength workouts are your most consistent this month.
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        >
          <Button
            variant={selectedCategory === "All" ? "default" : "outline"}
            className={`rounded-2xl px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === "All"
                ? "bg-gradient-primary text-primary-foreground shadow-lg"
                : "bg-card border-border hover:border-primary/50"
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={selectedCategory === cat.value ? "default" : "outline"}
              className={`rounded-2xl px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? "bg-gradient-primary text-primary-foreground shadow-lg"
                  : "bg-card border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.emoji} {cat.label}
            </Button>
          ))}
        </motion.div>

        {/* Your Routines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold">Your Routines</h2>
          {filteredRoutines.map((routine, index) => (
            <motion.div
              key={routine.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <Card className="bg-card border-border rounded-3xl overflow-hidden hover:scale-102 transition-all duration-300 card-elevated">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => handleRoutineClick(routine)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-4xl">{routine.emoji}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg">{routine.title}</h3>
                            {routine.isFavorite && (
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Last done: {routine.lastCompleted}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {routine.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-muted/60 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        {routine.exercises} exercises • ~{routine.duration} min
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        className="h-10 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartWorkout(routine);
                        }}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </Button>
                      <button
                        className="p-2 hover:bg-muted rounded-xl transition-colors"
                        onClick={() => handleRoutineClick(routine)}
                      >
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Create Routine Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button
            className="w-full h-14 rounded-3xl bg-gradient-primary text-primary-foreground font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            onClick={handleCreateRoutine}
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your Own Routine
          </Button>
        </motion.div>

        {/* Smart Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold">✨ Suggested For Today</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {suggestions.map((suggestion, idx) => (
              <Card
                key={idx}
                className="min-w-[200px] bg-card border-border rounded-3xl p-5 cursor-pointer hover:scale-105 transition-all duration-300 card-elevated"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="text-4xl mb-3">{suggestion.emoji}</div>
                <div className="font-bold text-sm mb-1">{suggestion.title}</div>
                <div className="text-xs text-muted-foreground">{suggestion.category}</div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
