import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { PrimaryButton } from "@/components/PrimaryButton";
import { FeedCard } from "@/components/FeedCard";
import { StreakBadge } from "@/components/StreakBadge";
import { currentUser, posts, friends } from "@/data/mockData";

const Feed = () => {
  const navigate = useNavigate();
  const [hasPostedToday, setHasPostedToday] = useState(currentUser.postedToday);

  const handlePostWorkout = () => {
    // In real app, this would open camera/upload flow
    setHasPostedToday(true);
  };

  const feedPosts = posts.map(post => {
    const friend = friends.find(f => f.id === post.userId);
    return {
      ...post,
      userName: friend?.name || "Unknown",
      userAvatar: friend?.photo || "",
      streak: friend?.streak || 0
    };
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => navigate("/home")}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <Header title="Today" />
            <StreakBadge streak={currentUser.streak} size="sm" />
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Post Prompt or Success Message */}
        {!hasPostedToday ? (
          <div className="bg-card rounded-2xl shadow-card p-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground mb-1">
                Post your workout
              </h2>
              <p className="text-sm text-muted-foreground">
                Share your gym session to unlock your crew's feed
              </p>
            </div>
            <PrimaryButton 
              onClick={handlePostWorkout}
              fullWidth
            >
              📸 Post Workout
            </PrimaryButton>
          </div>
        ) : (
          <div className="bg-success/10 border-2 border-success/20 rounded-2xl p-4 text-center">
            <p className="text-success font-semibold">
              Nice work! 🎉 Your streak is now {currentUser.streak} days
            </p>
          </div>
        )}

        {/* Feed - Locked or Unlocked */}
        {!hasPostedToday ? (
          <div className="relative">
            {/* Blurred preview */}
            <div className="blur-sm pointer-events-none opacity-50 space-y-4">
              {feedPosts.slice(0, 2).map(post => (
                <FeedCard key={post.id} {...post} />
              ))}
            </div>
            
            {/* Lock overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-card rounded-2xl shadow-lg p-6 max-w-xs text-center">
                <div className="text-4xl mb-2">🔒</div>
                <p className="font-semibold text-foreground mb-1">
                  Feed locked
                </p>
                <p className="text-sm text-muted-foreground">
                  Post to unlock your crew
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Your Crew
            </h3>
            {feedPosts.map(post => (
              <FeedCard key={post.id} {...post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
