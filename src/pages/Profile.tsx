import { useNavigate } from "react-router-dom";
import profilePhoto from "@/assets/profile-photo.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { currentUser } from "@/data/mockData";
import { ArrowLeft } from "lucide-react";

const mockData = {
  name: currentUser.name,
  badge: "🏆",
  streak: currentUser.streak,
  goal: currentUser.gymGoalPerWeek,
  weeklyProgress: Array.from({ length: currentUser.gymGoalPerWeek }, (_, i) => 
    i < currentUser.weeklyWorkouts
  ),
  topWorkouts: ["Outdoor Run", "Strength", "Pilates", "Functional", "Cycling"],
  leaderboardRank: 2,
  workouts: 14,
  followers: 32,
  following: 51,
  galleryPhotos: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6],
};

const Profile = () => {
  const navigate = useNavigate();
  
  const handleWorkoutTagClick = (workout: string) => {
    navigate(`/feed/${workout.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleBadgeClick = () => {
    navigate("/badges");
  };

  const handleLeaderboardClick = () => {
    navigate("/leaderboard");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Back Button */}
      <div className="px-4 pt-4">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="px-4 py-7">
        {/* Profile Photo with Electric Glow */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-accent-blue/20 blur-2xl"></div>
            <img
              src={profilePhoto}
              alt={mockData.name}
              className="relative w-[120px] h-[120px] rounded-full border-[3px] border-accent-blue object-cover"
              style={{ boxShadow: "0 0 30px rgba(93, 95, 236, 0.4)" }}
            />
          </div>
        </div>

        {/* Single Badge Emoji - Clickable */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleBadgeClick}
            className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="View badge collection"
          >
            <span className="text-xl">{mockData.badge}</span>
          </button>
        </div>

        {/* Name */}
        <h1 className="text-center text-[32px] font-bold text-text-primary mb-6">
          {mockData.name}
        </h1>

        {/* Streak Bar - Wide Capsule (NOT a pill) */}
        <div className="mb-4 px-2">
          <div
            className="relative bg-dark-card/60 backdrop-blur-sm rounded-full px-6 py-4 border border-dark-border overflow-hidden"
            style={{ boxShadow: "0 0 15px rgba(251, 146, 60, 0.2)" }}
          >
            {/* Animated progress fill */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 animate-pulse-glow"
              style={{ width: "100%" }}
            />
            <div className="relative flex items-center justify-center gap-3">
              <span className="text-2xl">🔥</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-primary">
                  {mockData.streak} Day Streak
                </span>
                <span className="text-xs text-text-secondary">Keep it going!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Goal Bar - Wide Capsule with Progress Checkmarks */}
        <div className="mb-6 px-2">
          <div
            className="relative bg-dark-card/60 backdrop-blur-sm rounded-full px-6 py-4 border border-dark-border overflow-hidden"
            style={{ boxShadow: "0 0 15px rgba(93, 95, 236, 0.2)" }}
          >
            {/* Progress fill based on weekly completion */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
              style={{ width: `${(mockData.weeklyProgress.filter(Boolean).length / mockData.goal) * 100}%` }}
            />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-primary">
                    Goal: {mockData.goal}× / week
                  </span>
                  <span className="text-xs text-text-secondary">
                    {mockData.weeklyProgress.filter(Boolean).length} of {mockData.goal} done
                  </span>
                </div>
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: mockData.goal }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      mockData.weeklyProgress[i]
                        ? "bg-accent-blue text-white"
                        : "bg-dark-border text-text-muted"
                    }`}
                  >
                    {mockData.weeklyProgress[i] ? "✓" : ""}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Workout Tags - Pills (Distinct from Bars) */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {mockData.topWorkouts.map((workout, index) => {
            const emojiMap: Record<string, string> = {
              "Outdoor Run": "🏃",
              "Strength": "💪",
              "Pilates": "🧘",
              "Functional": "🧗",
              "Cycling": "🚴",
            };
            return (
              <button
                key={index}
                onClick={() => handleWorkoutTagClick(workout)}
                className="bg-[#1A1A1A] rounded-[20px] px-4 py-2 border border-dark-border/50 flex items-center gap-2 hover:bg-[#222222] hover:border-accent-blue/40 transition-all"
                style={{ boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)" }}
              >
                <span className="text-base">{emojiMap[workout]}</span>
                <span className="text-sm font-medium text-text-primary">
                  {workout}
                </span>
              </button>
            );
          })}
        </div>

        {/* Leaderboard Preview */}
        <div className="text-center mb-6">
          <div className="text-lg font-bold text-text-primary mb-1">
            #{mockData.leaderboardRank} Among Friends
          </div>
          <button
            onClick={handleLeaderboardClick}
            className="text-sm text-accent-blue hover:text-accent-glow transition-colors font-medium"
          >
            View Leaderboard →
          </button>
        </div>

        {/* Stats Row */}
        <div className="flex justify-center gap-10 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary mb-0.5">
              {mockData.workouts}
            </div>
            <div className="text-sm text-text-secondary">Workouts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary mb-0.5">
              {mockData.followers}
            </div>
            <div className="text-sm text-text-secondary">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary mb-0.5">
              {mockData.following}
            </div>
            <div className="text-sm text-text-secondary">Following</div>
          </div>
        </div>

        {/* Share Profile Button */}
        <div className="flex justify-center mb-7">
          <Button
            className="w-[60%] h-12 rounded-full font-medium bg-dark-card border border-dark-border text-text-primary hover:bg-[#1A1A1A]"
            style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)" }}
          >
            Share Profile
          </Button>
        </div>

        {/* Progress Gallery - BeReal Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {mockData.galleryPhotos.map((photo, index) => (
            <div
              key={index}
              className="aspect-square rounded-[16px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity"
              style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.35)" }}
            >
              <img
                src={photo}
                alt={`Workout ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-full border border-white/10">
                {index === 0 ? "2m" : index === 1 ? "1h" : `${index - 1}d`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
