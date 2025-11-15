import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Watch, TrendingUp, Activity, Heart, Zap } from "lucide-react";
import { analyzeWorkoutData } from "@/lib/aiService";
import { hasApiKey } from "@/lib/openai";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

// Generate fake workout data
const generateFakeData = () => {
  const days = 30;
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const didWorkout = Math.random() > 0.3; // 70% chance of workout
    
    if (didWorkout) {
      data.push({
        date: date.toISOString().split('T')[0],
        activeCalories: Math.floor(Math.random() * 200) + 300,
        totalCalories: Math.floor(Math.random() * 500) + 2000,
        heartRateAvg: Math.floor(Math.random() * 30) + 140,
        heartRateMax: Math.floor(Math.random() * 40) + 170,
        steps: Math.floor(Math.random() * 5000) + 8000,
        workoutDuration: Math.floor(Math.random() * 30) + 30,
        workoutType: ['Strength', 'Cardio', 'Mixed', 'Yoga'][Math.floor(Math.random() * 4)],
      });
    }
  }
  
  return data;
};

const AppleWatchConnect = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [workoutData, setWorkoutData] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  useEffect(() => {
    if (!hasApiKey()) {
      toast({
        title: "API Key Required",
        description: "Please set up your OpenAI API key to use AI features.",
        variant: "destructive",
      });
    }
  }, []);

  const handleConnect = () => {
    // Simulate connection
    setTimeout(() => {
      setIsConnected(true);
      const fakeData = generateFakeData();
      setWorkoutData(fakeData);
      localStorage.setItem("apple_watch_data", JSON.stringify(fakeData));
      toast({
        title: "Connected!",
        description: "Your Apple Watch data has been synced.",
      });
    }, 1500);
  };

  const handleAnalyze = async () => {
    if (!hasApiKey()) {
      toast({
        title: "API Key Required",
        description: "Please set up your OpenAI API key first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysis = await analyzeWorkoutData(workoutData);
      setAiAnalysis(analysis);
    } catch (error: any) {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze data.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const stats = workoutData.length > 0 ? {
    totalWorkouts: workoutData.length,
    avgCalories: Math.round(workoutData.reduce((sum, d) => sum + d.activeCalories, 0) / workoutData.length),
    avgHeartRate: Math.round(workoutData.reduce((sum, d) => sum + d.heartRateAvg, 0) / workoutData.length),
    totalSteps: workoutData.reduce((sum, d) => sum + d.steps, 0),
  } : null;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate("/home")} className="text-foreground">
          <ArrowLeft size={24} />
        </button>
        <Watch className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-bold">Apple Watch</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {!isConnected ? (
          <Card className="p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
              <Watch className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Connect Your Apple Watch</h2>
              <p className="text-muted-foreground">
                Sync your workout data to get AI-powered insights and track your progress
              </p>
            </div>
            <Button
              onClick={handleConnect}
              className="w-full bg-gradient-primary text-primary-foreground h-12"
            >
              Connect Apple Watch
            </Button>
            <p className="text-xs text-muted-foreground">
              For demo purposes, this will generate sample workout data
            </p>
          </Card>
        ) : (
          <>
            {/* Stats Overview */}
            {stats && (
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Workouts</span>
                  </div>
                  <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">Avg Calories</span>
                  </div>
                  <p className="text-2xl font-bold">{stats.avgCalories}</p>
                  <p className="text-xs text-muted-foreground">Per workout</p>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-muted-foreground">Avg Heart Rate</span>
                  </div>
                  <p className="text-2xl font-bold">{stats.avgHeartRate}</p>
                  <p className="text-xs text-muted-foreground">BPM</p>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-muted-foreground">Total Steps</span>
                  </div>
                  <p className="text-2xl font-bold">{(stats.totalSteps / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </Card>
              </div>
            )}

            {/* AI Analysis */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">AI Analysis</h2>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-gradient-primary text-primary-foreground"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Data"}
                </Button>
              </div>
              {aiAnalysis ? (
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-muted-foreground">{aiAnalysis}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click "Analyze Data" to get AI-powered insights about your workout patterns
                </p>
              )}
            </Card>

            {/* Recent Workouts */}
            <div>
              <h2 className="text-lg font-bold mb-4">Recent Workouts</h2>
              <div className="space-y-2">
                {workoutData.slice(-5).reverse().map((workout, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{workout.workoutType}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(workout.date).toLocaleDateString()} • {workout.workoutDuration} min
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{workout.activeCalories} cal</p>
                        <p className="text-xs text-muted-foreground">{workout.heartRateAvg} avg BPM</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AppleWatchConnect;

