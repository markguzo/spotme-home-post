import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { PrimaryButton } from "@/components/PrimaryButton";
import { GoalSelector } from "@/components/GoalSelector";

const OnboardingGoal = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gymGoalPerWeek, setGymGoalPerWeek] = useState(3);
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<string>("");
  const [mainGoal, setMainGoal] = useState<string>("");
  const [workoutTypes, setWorkoutTypes] = useState<string[]>([]);

  useEffect(() => {
    const storedName = localStorage.getItem("spotme_name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const timeOptions = [
    { value: "early-morning", label: "Early morning" },
    { value: "morning", label: "Morning" },
    { value: "afternoon", label: "Afternoon" },
    { value: "evening", label: "Evening" },
    { value: "varies", label: "It changes" },
  ];

  const goalOptions = [
    { value: "build-muscle", label: "Build muscle" },
    { value: "lose-fat", label: "Lose fat" },
    { value: "stay-consistent", label: "Stay consistent" },
    { value: "get-stronger", label: "Get stronger" },
    { value: "feel-better", label: "Feel better" },
  ];

  const workoutOptions = [
    { value: "weights", label: "Weights" },
    { value: "cardio", label: "Cardio" },
    { value: "classes", label: "Classes" },
    { value: "sports", label: "Sports" },
    { value: "mixed", label: "Mixed / combo" },
  ];

  const toggleWorkoutType = (value: string) => {
    if (workoutTypes.includes(value)) {
      setWorkoutTypes(workoutTypes.filter(t => t !== value));
    } else {
      setWorkoutTypes([...workoutTypes, value]);
    }
  };

  const handleContinue = () => {
    localStorage.setItem("spotme_goal", gymGoalPerWeek.toString());
    localStorage.setItem("spotme_time_slot", preferredTimeSlot);
    localStorage.setItem("spotme_main_goal", mainGoal);
    localStorage.setItem("spotme_workout_types", JSON.stringify(workoutTypes));
    navigate("/connect");
  };

  const handleSkip = () => {
    localStorage.setItem("spotme_goal", "3");
    localStorage.setItem("spotme_time_slot", "evening");
    localStorage.setItem("spotme_main_goal", "stay-consistent");
    localStorage.setItem("spotme_workout_types", JSON.stringify(["weights"]));
    navigate("/connect");
  };

  const isValid = gymGoalPerWeek > 0 && preferredTimeSlot && mainGoal && workoutTypes.length > 0;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-5 pb-8 pt-10">
      <Header 
        align="left"
        title="Dial in your routine" 
        subtitle="Be honest. This is between you and the app."
        onBack={() => navigate("/onboarding/details")}
      />

      <div className="flex-1 overflow-y-auto space-y-6 pb-4">
        <div className="bg-[#111111] rounded-2xl border border-white/10 shadow-sm p-6 space-y-6">
          
          {/* Q1: Days per week */}
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              How often
            </div>
            <h3 className="mt-2 text-lg font-semibold text-white">
              How many days per week do you want to hit the gym?
            </h3>
            <GoalSelector value={gymGoalPerWeek} onChange={setGymGoalPerWeek} />
          </div>

          {/* Q2: When do you usually go */}
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Timing
            </div>
            <h3 className="mt-2 text-lg font-semibold text-white">
              When do you usually go to the gym?
            </h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {timeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPreferredTimeSlot(option.value)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${
                    preferredTimeSlot === option.value
                      ? "bg-gradient-to-r from-[#5D5FEC] to-[#8A88FF] border-transparent text-white"
                      : "border-white/20 bg-black/40 text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q3: Main goal */}
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Goals
            </div>
            <h3 className="mt-2 text-lg font-semibold text-white">
              What's your main goal right now?
            </h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {goalOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setMainGoal(option.value)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${
                    mainGoal === option.value
                      ? "bg-gradient-to-r from-[#5D5FEC] to-[#8A88FF] border-transparent text-white"
                      : "border-white/20 bg-black/40 text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q4: Workout style */}
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              How you train
            </div>
            <h3 className="mt-2 text-lg font-semibold text-white">
              What kind of workouts do you usually do?
            </h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {workoutOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleWorkoutType(option.value)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${
                    workoutTypes.includes(option.value)
                      ? "bg-gradient-to-r from-[#5D5FEC] to-[#8A88FF] border-transparent text-white"
                      : "border-white/20 bg-black/40 text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <PrimaryButton disabled={!isValid} onClick={handleContinue}>
          Save and continue
        </PrimaryButton>
        <button
          onClick={handleSkip}
          className="w-full h-12 rounded-2xl bg-transparent border border-white/30 text-white font-medium flex items-center justify-center active:scale-95 transition"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default OnboardingGoal;
