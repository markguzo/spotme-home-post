import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Bot, Send, Loader2, MessageSquare, Sparkles } from "lucide-react";
import { modifyRoutineWithAI } from "@/lib/aiService";
import { hasApiKey } from "@/lib/openai";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
}

const RoutineDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm here to help you modify your routine. Tell me what you'd like to change or any problems you're experiencing.",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatting, setIsChatting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Load routine from localStorage or use default
  const [routine, setRoutine] = useState<any>(() => {
    const saved = localStorage.getItem("currentRoutine");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse routine", e);
      }
    }
    return {
      id: "default",
      title: "Push Day",
      isAIGenerated: false,
      dayRoutines: [{
        day: 1,
        dayName: "Push Day",
        exercises: [
          { name: "Bench Press", sets: 3, reps: 10 },
          { name: "Incline Dumbbell Press", sets: 3, reps: 12 },
          { name: "Cable Flyes", sets: 3, reps: 15 },
          { name: "Overhead Press", sets: 3, reps: 8 },
          { name: "Lateral Raises", sets: 3, reps: 12 },
        ],
      }],
    };
  });

  const currentDay = routine.dayRoutines?.[0] || routine.dayRoutines?.[parseInt(id || "0")] || routine.dayRoutines?.[0];
  const exercises = currentDay?.exercises || routine.exercises || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatSend = async () => {
    if (!chatInput.trim() || isChatting) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsChatting(true);

    try {
      if (!hasApiKey()) {
        throw new Error("API key required");
      }

      // Get current routine structure
      const routineForAI = {
        title: routine.title,
        exercises: exercises.map((ex: Exercise) => ({
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps,
          weight: ex.weight,
        })),
        duration: currentDay?.duration || 45,
      };

      const modified = await modifyRoutineWithAI(routineForAI, chatInput);
      
      // Update exercises
      if (routine.dayRoutines) {
        const updatedRoutine = {
          ...routine,
          dayRoutines: routine.dayRoutines.map((day: any, idx: number) => 
            idx === 0 ? {
              ...day,
              exercises: modified.exercises.map((ex: any, exIdx: number) => ({
                id: `ex_${idx}_${exIdx}`,
                name: ex.name,
                sets: ex.sets,
                reps: ex.reps,
                weight: ex.weight,
                rest: ex.rest,
                notes: ex.notes,
                completed: false,
              })),
            } : day
          ),
        };
        setRoutine(updatedRoutine);
        localStorage.setItem("currentRoutine", JSON.stringify(updatedRoutine));
      } else {
        const updatedRoutine = {
          ...routine,
          exercises: modified.exercises.map((ex: any, idx: number) => ({
            id: `ex_${idx}`,
            name: ex.name,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight,
            completed: false,
          })),
        };
        setRoutine(updatedRoutine);
        localStorage.setItem("currentRoutine", JSON.stringify(updatedRoutine));
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I've updated your routine based on your feedback! The changes have been applied. Is there anything else you'd like to adjust?`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I'm sorry, I couldn't process that request. ${error.message || "Please try again."}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate("/my-routines")} className="text-foreground">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">{currentDay?.dayName || routine.title}</h1>
        {routine.isAIGenerated && (
          <div className="ml-auto flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
            <Sparkles className="w-3 h-3" />
            AI Generated
          </div>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Routine Info */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">{routine.title}</h2>
              {routine.isAIGenerated && (
                <p className="text-sm text-muted-foreground mt-1">
                  Generated based on your goals and preferences
                </p>
              )}
            </div>
            <Button
              onClick={() => setShowChatbot(!showChatbot)}
              className="bg-gradient-primary text-primary-foreground"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat with AI
            </Button>
          </div>
          
          {routine.dayRoutines && routine.dayRoutines.length > 1 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Weekly Split:</p>
              <div className="flex gap-2 flex-wrap">
                {routine.dayRoutines.map((day: any) => (
                  <button
                    key={day.day}
                    onClick={() => navigate(`/routine/${day.day}`)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      currentDay?.day === day.day
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {day.dayName}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Exercises List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Exercises</h2>
          <div className="bg-card rounded-2xl overflow-hidden divide-y divide-border">
            {exercises.map((exercise: any, idx: number) => (
              <div key={exercise.id || idx} className="p-4">
                <p className="text-foreground font-medium">{exercise.name}</p>
                <p className="text-muted-foreground text-sm mt-1">
                  {exercise.sets} × {exercise.reps} reps
                  {exercise.weight && ` @ ${exercise.weight}lbs`}
                  {exercise.rest && ` • ${exercise.rest}s rest`}
                </p>
                {exercise.notes && (
                  <p className="text-xs text-muted-foreground mt-1 italic">{exercise.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chatbot Panel */}
        {showChatbot && (
          <Card className="p-4 h-[400px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">AI Routine Assistant</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isChatting && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-2xl">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isChatting && handleChatSend()}
                placeholder="Tell me what you'd like to change..."
                disabled={isChatting}
                className="flex-1"
              />
              <Button
                onClick={handleChatSend}
                disabled={isChatting || !chatInput.trim()}
                className="bg-gradient-primary text-primary-foreground"
              >
                {isChatting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/workout-session', { state: { routine: currentDay } })}
            className="w-full bg-gradient-primary text-primary-foreground rounded-full h-12 text-base font-medium"
          >
            Start Workout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoutineDetail;
