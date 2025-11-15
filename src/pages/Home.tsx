import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { VerticalFeed } from '@/components/VerticalFeed';
import { PostWorkoutModal } from '@/components/PostWorkoutModal';
import { UnlockPromptModal } from '@/components/UnlockPromptModal';
import { storage } from '@/lib/storage';
import { hasPostedToday } from '@/lib/streak';
import { User, Post, Comment } from '@/types';
import { currentUser } from "@/data/mockData";
import { Trophy, Dumbbell, User as UserIcon, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Play, Check } from "lucide-react";
import gymPhoto1 from '@/assets/gym-photo-1.png';
import gymPhoto2 from '@/assets/gym-photo-2.png';
import gymPhoto3 from '@/assets/gym-photo-3.png';
import gymPhoto4 from '@/assets/gym-photo-4.png';
import gymPhoto5 from '@/assets/gym-photo-5.png';

const mockFeedPosts: Post[] = [
  {
    id: 'p1',
    userId: 'f1',
    userName: 'Sam',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    imageUri: gymPhoto1,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    caption: 'New deadlift PR! 405lbs × 3 💪 Feeling unstoppable',
    meta: { pr: true, workoutType: 'Pull Day', duration: 75 },
    engagement: {
      likes: 24,
      likedBy: ['f2', 'f3', 'f4'],
      comments: [
        { id: 'c1', userId: 'f2', userName: 'Riley', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', text: 'Beast mode! 🔥', timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString() },
        { id: 'c2', userId: 'f3', userName: 'Jordan', userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', text: "Let's goooo! That's insane", timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() }
      ],
      photoReactions: [],
      emojiReactions: []
    }
  },
  {
    id: 'p2',
    userId: 'f2',
    userName: 'Riley',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    imageUri: gymPhoto2,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    caption: 'Morning leg day complete. Squats never get easier 😅',
    meta: { pr: false, workoutType: 'Leg Day', duration: 60 },
    engagement: {
      likes: 18,
      likedBy: ['f1', 'f5'],
      comments: [
        { id: 'c3', userId: 'f1', userName: 'Sam', userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', text: 'Keep grinding! 💪', timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString() }
      ],
      photoReactions: [],
      emojiReactions: []
    }
  },
  {
    id: 'p3',
    userId: 'f3',
    userName: 'Jordan',
    userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    imageUri: gymPhoto3,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    caption: 'Early bird gets the gains 🌅',
    meta: { pr: false, workoutType: 'Full Body', duration: 45 },
    engagement: { likes: 15, likedBy: ['f2', 'f4', 'f6'], comments: [], photoReactions: [], emojiReactions: [] }
  },
  {
    id: 'p4',
    userId: 'f4',
    userName: 'Casey',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    imageUri: gymPhoto4,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    caption: 'Bench press PR! 225lbs for reps 🎯',
    meta: { pr: true, workoutType: 'Push Day', duration: 70 },
    engagement: {
      likes: 31,
      likedBy: ['f1', 'f2', 'f3', 'f5', 'f7'],
      comments: [
        { id: 'c4', userId: 'f5', userName: 'Morgan', userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop', text: 'Crushing it! 🔥🔥', timestamp: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString() }
      ],
      photoReactions: [],
      emojiReactions: []
    }
  },
  {
    id: 'p5',
    userId: 'f5',
    userName: 'Morgan',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    imageUri: gymPhoto5,
    timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    caption: 'Recovery day yoga and stretching 🧘',
    meta: { pr: false, workoutType: 'Recovery', duration: 30 },
    engagement: { likes: 12, likedBy: ['f6', 'f8'], comments: [], photoReactions: [], emojiReactions: [] }
  },
];

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  completed: boolean;
}

interface CurrentRoutine {
  id: string;
  title: string;
  exercises?: Exercise[];
  dayRoutines?: Array<{
    day: number;
    dayName: string;
    exercises: Exercise[];
    duration: number;
    focus: string[];
  }>;
  startedAt?: Date;
}

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [posted, setPosted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isUnlockPromptOpen, setIsUnlockPromptOpen] = useState(false);
  const [currentRoutine, setCurrentRoutine] = useState<any>(() => {
    const saved = localStorage.getItem('currentRoutine');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse current routine', e);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    // Initialize user from localStorage or use currentUser as fallback
    const initializeUser = () => {
      // Try to get user from localStorage first
      const storedName = localStorage.getItem("spotme_name");
      const storedUsername = localStorage.getItem("spotme_username");
      const storedGoal = localStorage.getItem("spotme_gymGoalPerWeek");
      
      if (storedName && storedUsername) {
        const userData: User = {
          id: "1",
          name: storedName,
          username: storedUsername,
          weeklyGoal: storedGoal ? parseInt(storedGoal, 10) : 4,
        };
        setUser(userData);
      } else {
        // Use currentUser as default
        const userData: User = {
          id: currentUser.id,
          name: currentUser.name,
          username: currentUser.username,
          weeklyGoal: currentUser.gymGoalPerWeek,
        };
        setUser(userData);
      }
    };

    initializeUser();
    setPosted(hasPostedToday());
    setStreak(storage.getStreak());

    // Load current routine from localStorage
    const saved = localStorage.getItem('currentRoutine');
    if (saved) {
      try {
        setCurrentRoutine(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse current routine', e);
      }
    }

    if (import.meta.env.DEV) {
      (window as any).debugClearData = () => {
        storage.clearAllData();
        window.location.reload();
      };
    }

    const handlePostEvent = () => {
      setPosted(true);
      setStreak(storage.getStreak());
      const storedName = localStorage.getItem("spotme_name");
      const storedUsername = localStorage.getItem("spotme_username");
      const userForPost = storedName && storedUsername ? {
        id: "1",
        name: storedName,
        username: storedUsername,
        weeklyGoal: 4,
      } : {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        weeklyGoal: currentUser.gymGoalPerWeek,
      };
      const newUserPost = getUserPost(userForPost);
      if (newUserPost) setFeedPosts([newUserPost, ...mockFeedPosts]);
    };

    window.addEventListener('posted:today', handlePostEvent);
    return () => window.removeEventListener('posted:today', handlePostEvent);
  }, []);

  // Initialize feed posts when user is available
  useEffect(() => {
    if (user) {
      const userPost = getUserPost(user);
      setFeedPosts(userPost && hasPostedToday() ? [userPost, ...mockFeedPosts] : mockFeedPosts);
    }
  }, [user]);

  // Check for routine from navigation state
  useEffect(() => {
    if (location.state?.routine) {
      setCurrentRoutine(location.state.routine);
      localStorage.setItem('currentRoutine', JSON.stringify(location.state.routine));
    }
  }, [location.state]);

  useEffect(() => {
    if (currentRoutine) {
      localStorage.setItem('currentRoutine', JSON.stringify(currentRoutine));
    } else {
      localStorage.removeItem('currentRoutine');
    }
  }, [currentRoutine]);

  const getUserPost = (userData: User | null): Post | null => {
    if (!userData || !hasPostedToday()) return null;
    const posts = storage.getPosts();
    const todayPost = posts.find(p => p.userId === userData.id);
    if (!todayPost) return null;

    return {
      ...todayPost,
      userName: userData.name,
      userAvatar: currentUser.photo,
      caption: 'Just crushed today\'s workout! 💪',
      meta: { ...todayPost.meta, workoutType: 'Push Day', duration: 60 },
      engagement: { likes: 0, likedBy: [], comments: [], photoReactions: [], emojiReactions: [] }
    };
  };

  const handlePostClick = (post: Post) => console.log('Post clicked:', post);

  const handleLike = (postId: string) => {
    setFeedPosts(posts =>
      posts.map(post => {
        if (post.id === postId) {
          const isLiked = post.engagement.likedBy.includes(user!.id);
          return {
            ...post,
            engagement: {
              ...post.engagement,
              likes: isLiked ? post.engagement.likes - 1 : post.engagement.likes + 1,
              likedBy: isLiked ? post.engagement.likedBy.filter(id => id !== user!.id) : [...post.engagement.likedBy, user!.id]
            }
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string, text: string) => {
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      userId: user!.id,
      userName: user!.name,
      userAvatar: currentUser.photo,
      text,
      timestamp: new Date().toISOString()
    };

    setFeedPosts(posts => 
      posts.map(post =>
        post.id === postId
          ? { ...post, engagement: { ...post.engagement, comments: [...post.engagement.comments, newComment] } }
          : post
      )
    );
    storage.addComment(postId, newComment);
  };

  const handlePostSuccess = (post: Post) => {
    setPosted(true);
    setStreak(storage.getStreak());
    setFeedPosts([post, ...mockFeedPosts]);
  };

  const handleExerciseComplete = (exerciseId: string) => {
    if (!currentRoutine) return;
    
    // Handle multi-day routines
    if (currentRoutine.dayRoutines) {
      setCurrentRoutine({
        ...currentRoutine,
        dayRoutines: currentRoutine.dayRoutines.map(day => ({
          ...day,
          exercises: day.exercises.map(ex =>
            ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
          )
        }))
      });
    } else if (currentRoutine.exercises) {
      // Handle single-day routines
      setCurrentRoutine({
        ...currentRoutine,
        exercises: currentRoutine.exercises.map(ex =>
          ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
        )
      });
    }
  };

  const handleStartRoutine = () => {
    navigate('/my-routines');
  };

  const handleCreateRoutine = () => {
    navigate('/ai-routine-generator');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Navigation Square - Enhanced Design */}
      <div className="sticky top-0 z-50 bg-background/98 backdrop-blur-xl border-b border-border/30 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-center gap-4">
            {/* Profile */}
            <button
              onClick={() => navigate("/profile")}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl hover:bg-muted/60 transition-all group active:scale-95"
            >
              <div className="relative">
                <img
                  src={currentUser.photo}
                  alt={currentUser.name}
                  className="w-11 h-11 rounded-full border-2 border-primary/50 object-cover group-hover:border-primary group-hover:scale-105 transition-all shadow-md"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background shadow-md ring-2 ring-background"></div>
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors">Profile</span>
            </button>

            {/* Trophy / Leaderboard */}
            <button
              onClick={() => navigate("/leaderboard")}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl hover:bg-muted/60 transition-all group active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-yellow-500/40 to-orange-500/30 border-2 border-yellow-500/50 flex items-center justify-center group-hover:border-yellow-500/70 group-hover:from-yellow-500/50 group-hover:to-orange-500/40 group-hover:scale-105 transition-all shadow-md">
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors">Leaderboard</span>
            </button>

            {/* Routines */}
            <button
              onClick={() => navigate("/my-routines")}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl hover:bg-muted/60 transition-all group active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/40 to-primary/30 border-2 border-primary/50 flex items-center justify-center group-hover:border-primary/70 group-hover:from-primary/50 group-hover:to-primary/40 group-hover:scale-105 transition-all shadow-md">
                <Dumbbell className="w-5 h-5 text-primary" />
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors">Routines</span>
            </button>

            {/* AI Gym Helper */}
            <button
              onClick={() => navigate("/ai-gym-helper")}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl hover:bg-muted/60 transition-all group active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500/40 to-pink-500/30 border-2 border-purple-500/50 flex items-center justify-center group-hover:border-purple-500/70 group-hover:from-purple-500/50 group-hover:to-pink-500/40 group-hover:scale-105 transition-all shadow-md">
                <Bot className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors">AI Helper</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Current Routine Section */}
        {currentRoutine ? (() => {
          // Handle both single-day and multi-day routines
          const exercises = currentRoutine.exercises || (currentRoutine.dayRoutines && currentRoutine.dayRoutines[0]?.exercises) || [];
          const isMultiDay = currentRoutine.dayRoutines && currentRoutine.dayRoutines.length > 1;
          const currentDay = currentRoutine.dayRoutines?.[0];
          
          return (
            <Card className="mb-6 p-6 bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 border-primary/20 rounded-3xl shadow-lg overflow-hidden relative">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold mb-1.5 text-foreground">Current Routine</h2>
                    <p className="text-sm text-muted-foreground font-medium">
                      {currentDay?.dayName || currentRoutine.title}
                    </p>
                    {isMultiDay && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {currentRoutine.dayRoutines.length}-day split
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={() => navigate('/routine/1', { state: { routine: currentRoutine } })}
                    className="rounded-xl bg-gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all px-4 h-9"
                  >
                    <Play className="w-4 h-4 mr-1.5" />
                    {isMultiDay ? 'View Routine' : 'Continue'}
                  </Button>
                </div>
              
                {exercises.length > 0 ? (
                  <>
                    <div className="space-y-2.5">
                      {exercises.slice(0, 3).map((exercise: any, idx: number) => (
                        <div
                          key={exercise.id || idx}
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all backdrop-blur-sm ${
                            exercise.completed
                              ? "bg-success/10 border-success/40 shadow-sm"
                              : "bg-card/50 border-border/50 hover:border-primary/30"
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <button
                              onClick={() => handleExerciseComplete(exercise.id)}
                              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all shadow-sm ${
                                exercise.completed
                                  ? "bg-success border-success shadow-success/20"
                                  : "border-muted-foreground/40 bg-background/50 hover:border-primary/50"
                              }`}
                            >
                              {exercise.completed && <Check className="w-4 h-4 text-white" />}
                            </button>
                            <div className="flex-1">
                              <div className={`font-semibold text-sm ${exercise.completed ? 'text-success' : 'text-foreground'}`}>
                                {exercise.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {exercise.sets} sets × {exercise.reps} reps
                                {exercise.weight && ` @ ${exercise.weight}lbs`}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {exercises.length > 3 && (
                      <p className="text-xs text-muted-foreground mt-3 text-center">
                        +{exercises.length - 3} more exercises
                      </p>
                    )}
                    
                    {/* Progress indicator */}
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold text-foreground">
                          {exercises.filter((e: any) => e.completed).length} / {exercises.length} exercises
                        </span>
                      </div>
                      <div className="mt-2 h-2 bg-muted/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-primary rounded-full transition-all duration-300"
                          style={{ width: `${exercises.length > 0 ? (exercises.filter((e: any) => e.completed).length / exercises.length) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">No exercises in this routine yet.</p>
                )}
              </div>
            </Card>
          );
        })() : (
          <Card className="mb-6 p-6 bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 border-primary/20 rounded-3xl shadow-lg overflow-hidden relative">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -ml-12 -mb-12"></div>
            
            <div className="relative z-10">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2 text-foreground">No Active Routine</h2>
                <p className="text-sm text-muted-foreground">Start a workout to track your progress and stay consistent</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleStartRoutine}
                  variant="outline"
                  className="flex-1 h-11 rounded-xl border-2 border-border bg-background/50 backdrop-blur-sm hover:bg-muted/50 hover:border-primary/30 transition-all font-medium"
                >
                  Browse Routines
                </Button>
                <Button
                  onClick={handleCreateRoutine}
                  className="flex-1 h-11 rounded-xl bg-gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-semibold"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Create New
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Today's Feed */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold mb-1.5 text-foreground">Today's Feed</h2>
          <p className="text-sm text-muted-foreground">See what your crew is up to</p>
        </div>
      </div>

      <VerticalFeed 
        posts={feedPosts}
        isLocked={!posted}
        onPostClick={handlePostClick}
        onUnlockClick={() => setIsUnlockPromptOpen(true)}
        currentUserId={user.id}
        onAddComment={handleAddComment}
        currentUserName={user.name}
        currentUserAvatar={currentUser.photo}
        onLike={handleLike}
      />

      <UnlockPromptModal
        isOpen={isUnlockPromptOpen}
        onClose={() => setIsUnlockPromptOpen(false)}
        onPostClick={() => setIsPostModalOpen(true)}
        friendCount={feedPosts.length}
      />

      <PostWorkoutModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onPostSuccess={handlePostSuccess}
      />
    </div>
  );
};

export default Home;
