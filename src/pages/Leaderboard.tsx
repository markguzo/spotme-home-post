import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { AddFriendsFlow } from "@/components/AddFriendsFlow";
import { UserProfileSheet } from "@/components/UserProfileSheet";
import { EditProfileModal } from "@/components/EditProfileModal";
import { CrewManagementModal } from "@/components/CrewManagementModal";
import { PRDetailModal } from "@/components/PRDetailModal";
import { RankInsightsModal } from "@/components/RankInsightsModal";
import { BadgeCard } from "@/components/BadgeCard";
import { currentUser, friends, Friend, badges } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { ArrowLeft, Trophy, UserPlus, Edit, Award } from "lucide-react";

type Tab = "weekly" | "monthly" | "badges";

const Leaderboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasSeenAddFriends, setHasSeenAddFriends] = useState(() => {
    return localStorage.getItem("hasSeenAddFriends") === "true";
  });
  const [activeTab, setActiveTab] = useState<Tab>(
    (location.state?.activeTab as Tab) || "weekly"
  );
  const [selectedUser, setSelectedUser] = useState<Friend | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [crewModalOpen, setCrewModalOpen] = useState(false);
  const [prModalOpen, setPrModalOpen] = useState(false);
  const [rankModalOpen, setRankModalOpen] = useState(false);

  const handleAddFriendsComplete = () => {
    localStorage.setItem("hasSeenAddFriends", "true");
    setHasSeenAddFriends(true);
  };

  if (!hasSeenAddFriends) {
    return <AddFriendsFlow onComplete={handleAddFriendsComplete} />;
  }

  const allUsers = [
    { ...currentUser, isCurrentUser: true },
    ...friends.map(f => ({ ...f, isCurrentUser: false }))
  ];

  // Calculate monthly stats
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const daysElapsed = new Date().getDate();

  const sortedUsers = [...allUsers].sort((a, b) => {
    if (activeTab === "monthly") {
      // For monthly: calculate days based on weekly goal
      const monthlyGoalA = Math.ceil((a.gymGoalPerWeek / 7) * daysInMonth);
      const monthlyGoalB = Math.ceil((b.gymGoalPerWeek / 7) * daysInMonth);
      const monthlyDaysA = Math.ceil((a.weeklyWorkouts / 7) * daysElapsed);
      const monthlyDaysB = Math.ceil((b.weeklyWorkouts / 7) * daysElapsed);
      return monthlyDaysB - monthlyDaysA;
    } else {
      // For weekly: use weekly workouts
      const progressA = (a.weeklyWorkouts / a.gymGoalPerWeek) * 100;
      const progressB = (b.weeklyWorkouts / b.gymGoalPerWeek) * 100;
      return progressB - progressA;
    }
  });

  const currentUserRank = sortedUsers.findIndex(u => u.isCurrentUser) + 1;

  const handleUserClick = (user: any) => {
    if (!user.isCurrentUser) {
      setSelectedUser(user as Friend);
      setSheetOpen(true);
    }
  };

  const handlePRClick = (user: Friend) => {
    setSelectedUser(user);
    setPrModalOpen(true);
  };

  const userStats = {
    maxPR: 225,
    badgeCount: badges.filter(b => b.unlocked).length,
    streak: currentUser.streak,
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-background via-primary/20 to-background border-b border-border">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/home")} className="p-2 hover:bg-muted rounded-lg transition-all">
                <ArrowLeft className="w-6 h-6 text-foreground" />
              </button>
              <img src={currentUser.photo} alt={currentUser.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-primary" />
              <div>
                <h2 className="text-foreground font-bold text-xl">{currentUser.name}</h2>
                <p className="text-muted-foreground text-sm">@{currentUser.username}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditProfileOpen(true)} className="p-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-all">
                <Edit className="w-5 h-5 text-primary" />
              </button>
              <button onClick={() => setCrewModalOpen(true)} className="px-4 py-2 bg-gradient-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-all">
                Join Crew
              </button>
            </div>
          </div>

          <Header title="Leaderboard" subtitle={`You're #${currentUserRank} this week`} />
        </div>

        {/* Tabs */}
        <div className="px-4">
          <div className="flex gap-2 pb-4">
            <button
              onClick={() => setActiveTab("weekly")}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all",
                activeTab === "weekly"
                  ? "bg-gradient-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              )}
            >
              Weekly
            </button>
            <button
              onClick={() => setActiveTab("monthly")}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all",
                activeTab === "monthly"
                  ? "bg-gradient-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveTab("badges")}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all",
                activeTab === "badges"
                  ? "bg-gradient-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              )}
            >
              Badges
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Weekly/Monthly View */}
        {(activeTab === "weekly" || activeTab === "monthly") && (
          <div className="space-y-6">
            {/* Add Friends Button */}
            <button 
              onClick={() => navigate("/leaderboard/add-friends")}
              className="w-full bg-card border border-border rounded-xl p-4 flex items-center justify-center gap-2 hover:border-primary/50 transition-all active:scale-95"
            >
              <UserPlus className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">Add More Friends</span>
            </button>

            {/* Your rank card */}
            <button 
              onClick={() => setRankModalOpen(true)}
              className="w-full bg-primary/20 rounded-2xl p-5 border border-primary/30 hover:border-primary/50 transition-all cursor-pointer active:scale-95 text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Your Rank</span>
                </div>
                <span className="text-2xl font-bold text-primary">#{currentUserRank}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {activeTab === "monthly" 
                  ? `${Math.ceil((currentUser.weeklyWorkouts / 7) * daysElapsed)} of ${Math.ceil((currentUser.gymGoalPerWeek / 7) * daysInMonth)} days completed`
                  : `${currentUser.weeklyWorkouts} of ${currentUser.gymGoalPerWeek} workouts completed`
                } • Tap for insights
              </p>
            </button>

            {/* Crew Rankings */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Crew Rankings
              </h3>
              {sortedUsers.map((user, index) => {
                const monthlyGoal = Math.ceil((user.gymGoalPerWeek / 7) * daysInMonth);
                const monthlyDays = Math.ceil((user.weeklyWorkouts / 7) * daysElapsed);
                
                return (
                  <div key={user.id} onClick={() => handleUserClick(user)} className="cursor-pointer">
                    <LeaderboardCard
                      rank={index + 1}
                      name={user.name}
                      photo={user.photo}
                      streak={user.streak}
                      weeklyWorkouts={user.weeklyWorkouts}
                      weeklyGoal={user.gymGoalPerWeek}
                      pr={user.id !== currentUser.id ? (user as any).pr : undefined}
                      isCurrentUser={user.isCurrentUser}
                      isMonthly={activeTab === "monthly"}
                      monthlyDays={monthlyDays}
                      monthlyGoal={monthlyGoal}
                    />
                  </div>
                );
              })}
            </div>

            {/* PR Section */}
            <div className="space-y-3 mt-8">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Recent PRs 🔥
              </h3>
              {friends
                .filter(f => f.pr)
                .slice(0, 3)
                .map(friend => (
                  <button
                    key={friend.id}
                    onClick={() => handlePRClick(friend)}
                    className="w-full bg-card border border-primary/30 rounded-xl p-4 flex items-center gap-3 hover:border-primary/50 transition-all cursor-pointer active:scale-95"
                  >
                    <img
                      src={friend.photo}
                      alt={friend.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-foreground">{friend.name}</p>
                      <p className="text-sm text-primary font-medium">{friend.pr}</p>
                    </div>
                    <Trophy className="w-5 h-5 text-primary" />
                  </button>
                ))}
            </div>
          </div>
        )}

        {activeTab === "badges" && (
          <div>
            <div className="mb-4 p-4 bg-primary/20 rounded-xl border border-primary/30">
              <h3 className="text-foreground font-semibold mb-2">Badge Collection</h3>
              <p className="text-sm text-muted-foreground">{badges.filter(b => b.unlocked).length} of {badges.length} badges unlocked</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => (
                <BadgeCard 
                  key={badge.id} 
                  badge={badge} 
                  onClick={() => {
                    if (badge.unlocked) {
                      navigate(`/leaderboard/badge/${badge.id}`);
                    }
                  }} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <UserProfileSheet user={selectedUser} open={sheetOpen} onOpenChange={setSheetOpen} />
      <EditProfileModal open={editProfileOpen} onOpenChange={setEditProfileOpen} currentPhoto={currentUser.photo} currentName={currentUser.name} currentUsername={currentUser.username} currentGoal={currentUser.gymGoalPerWeek} />
      <CrewManagementModal open={crewModalOpen} onOpenChange={setCrewModalOpen} userStats={userStats} />
      <PRDetailModal open={prModalOpen} onOpenChange={setPrModalOpen} user={selectedUser} />
      <RankInsightsModal 
        open={rankModalOpen} 
        onOpenChange={setRankModalOpen} 
        userRank={currentUserRank}
        userWorkouts={currentUser.weeklyWorkouts}
        topUserName={sortedUsers[0]?.name || ""}
        topUserWorkouts={sortedUsers[0]?.weeklyWorkouts || 0}
        weeklyGoal={currentUser.gymGoalPerWeek}
      />
    </div>
  );
};

export default Leaderboard;
