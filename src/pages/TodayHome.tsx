import { useState, useEffect } from 'react';
import { CompactStatsBar } from '@/components/CompactStatsBar';
import { VerticalFeed } from '@/components/VerticalFeed';
import { storage } from '@/lib/storage';
import { hasPostedToday } from '@/lib/streak';
import { User, Post } from '@/types';

// Enhanced mock feed posts with full engagement data
const mockFeedPosts: Post[] = [
  {
    id: 'p1',
    userId: 'f1',
    userName: 'Sam',
    userAvatar: 'https://picsum.photos/seed/sam/200',
    imageUri: 'https://picsum.photos/seed/sam-workout/800',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
    caption: 'New deadlift PR! 405lbs × 3 💪 Feeling unstoppable',
    meta: {
      pr: true,
      workoutType: 'Pull Day',
      duration: 75
    },
    engagement: {
      likes: 24,
      likedBy: ['f2', 'f3', 'f4'],
      comments: [
        {
          id: 'c1',
          userId: 'f2',
          userName: 'Riley',
          userAvatar: 'https://picsum.photos/seed/riley/200',
          text: 'Beast mode! 🔥',
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'c2',
          userId: 'f3',
          userName: 'Jordan',
          userAvatar: 'https://picsum.photos/seed/jordan/200',
          text: "Let's goooo! That's insane",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
        }
      ]
    }
  },
  {
    id: 'p2',
    userId: 'f2',
    userName: 'Riley',
    userAvatar: 'https://picsum.photos/seed/riley/200',
    imageUri: 'https://picsum.photos/seed/riley-workout/800',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3h ago
    caption: 'Morning leg day complete. Squats never get easier 😅',
    meta: {
      pr: false,
      workoutType: 'Leg Day',
      duration: 60
    },
    engagement: {
      likes: 18,
      likedBy: ['f1', 'f5'],
      comments: [
        {
          id: 'c3',
          userId: 'f1',
          userName: 'Sam',
          userAvatar: 'https://picsum.photos/seed/sam/200',
          text: 'Keep grinding! 💪',
          timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString()
        }
      ]
    }
  },
  {
    id: 'p3',
    userId: 'f3',
    userName: 'Jordan',
    userAvatar: 'https://picsum.photos/seed/jordan/200',
    imageUri: 'https://picsum.photos/seed/jordan-workout/800',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5h ago
    caption: 'Early bird gets the gains 🌅',
    meta: {
      pr: false,
      workoutType: 'Full Body',
      duration: 45
    },
    engagement: {
      likes: 15,
      likedBy: ['f2', 'f4', 'f6'],
      comments: []
    }
  },
  {
    id: 'p4',
    userId: 'f4',
    userName: 'Casey',
    userAvatar: 'https://picsum.photos/seed/casey/200',
    imageUri: 'https://picsum.photos/seed/casey-workout/800',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6h ago
    caption: 'Bench press PR! 225lbs for reps 🎯',
    meta: {
      pr: true,
      workoutType: 'Push Day',
      duration: 70
    },
    engagement: {
      likes: 31,
      likedBy: ['f1', 'f2', 'f3', 'f5', 'f7'],
      comments: [
        {
          id: 'c4',
          userId: 'f5',
          userName: 'Morgan',
          userAvatar: 'https://picsum.photos/seed/morgan/200',
          text: 'Crushing it! 🔥🔥',
          timestamp: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString()
        }
      ]
    }
  },
  {
    id: 'p5',
    userId: 'f5',
    userName: 'Morgan',
    userAvatar: 'https://picsum.photos/seed/morgan/200',
    imageUri: 'https://picsum.photos/seed/morgan-workout/800',
    timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7h ago
    caption: 'Recovery day yoga and stretching 🧘',
    meta: {
      pr: false,
      workoutType: 'Recovery',
      duration: 30
    },
    engagement: {
      likes: 12,
      likedBy: ['f6', 'f8'],
      comments: []
    }
  },
  {
    id: 'p6',
    userId: 'f6',
    userName: 'Taylor',
    userAvatar: 'https://picsum.photos/seed/taylor/200',
    imageUri: 'https://picsum.photos/seed/taylor-workout/800',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8h ago
    caption: 'Back and biceps pump 💪 Feeling strong',
    meta: {
      pr: false,
      workoutType: 'Pull Day',
      duration: 65
    },
    engagement: {
      likes: 20,
      likedBy: ['f1', 'f3', 'f7'],
      comments: [
        {
          id: 'c5',
          userId: 'f7',
          userName: 'Alex',
          userAvatar: 'https://picsum.photos/seed/alex/200',
          text: 'Nice work! 💯',
          timestamp: new Date(Date.now() - 7.5 * 60 * 60 * 1000).toISOString()
        }
      ]
    }
  },
  {
    id: 'p7',
    userId: 'f7',
    userName: 'Alex',
    userAvatar: 'https://picsum.photos/seed/alex/200',
    imageUri: 'https://picsum.photos/seed/alex-workout/800',
    timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), // 9h ago
    caption: 'Shoulder day complete. Time to grow! 🚀',
    meta: {
      pr: false,
      workoutType: 'Push Day',
      duration: 55
    },
    engagement: {
      likes: 16,
      likedBy: ['f2', 'f4', 'f6', 'f8'],
      comments: []
    }
  },
  {
    id: 'p8',
    userId: 'f8',
    userName: 'Jamie',
    userAvatar: 'https://picsum.photos/seed/jamie/200',
    imageUri: 'https://picsum.photos/seed/jamie-workout/800',
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10h ago
    caption: 'Hit a new 5K PR on the treadmill! 🏃‍♂️💨',
    meta: {
      pr: true,
      workoutType: 'Cardio',
      duration: 40
    },
    engagement: {
      likes: 27,
      likedBy: ['f1', 'f2', 'f5', 'f7'],
      comments: [
        {
          id: 'c6',
          userId: 'f1',
          userName: 'Sam',
          userAvatar: 'https://picsum.photos/seed/sam/200',
          text: 'Speed demon! 🔥',
          timestamp: new Date(Date.now() - 9.5 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'c7',
          userId: 'f2',
          userName: 'Riley',
          userAvatar: 'https://picsum.photos/seed/riley/200',
          text: 'Inspired! 💪',
          timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString()
        }
      ]
    }
  },
];

const TodayHome = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posted, setPosted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Auto-clear data in dev mode on every load
    if (import.meta.env.DEV) {
      storage.clearAllData();
    }
    
    storage.initializeDefaults();
    const userData = storage.getUser();
    setUser(userData);
    setPosted(hasPostedToday());
    setStreak(storage.getStreak());

    // Dev mode debug helper
    if (import.meta.env.DEV) {
      (window as any).debugClearData = () => {
        storage.clearAllData();
        window.location.reload();
      };
    }

    // Load user post and friend posts
    const userPost = getUserPost(userData);
    if (userPost && hasPostedToday()) {
      setFeedPosts([userPost, ...mockFeedPosts]);
    } else {
      setFeedPosts(mockFeedPosts);
    }

    // Listen for post events
    const handlePostEvent = () => {
      setPosted(true);
      setStreak(storage.getStreak());
      const newUserPost = getUserPost(userData);
      if (newUserPost) {
        setFeedPosts([newUserPost, ...mockFeedPosts]);
      }
    };

    window.addEventListener('posted:today', handlePostEvent);
    return () => window.removeEventListener('posted:today', handlePostEvent);
  }, []);

  const getUserPost = (userData: User | null): Post | null => {
    if (!userData || !hasPostedToday()) return null;
    
    const posts = storage.getPosts();
    const todayPost = posts.find(p => p.userId === userData.id);
    
    if (!todayPost) return null;

    return {
      ...todayPost,
      userName: userData.name,
      userAvatar: `https://picsum.photos/seed/${userData.username}/200`,
      caption: 'Just crushed today\'s workout! 💪',
      meta: {
        ...todayPost.meta,
        workoutType: 'Push Day',
        duration: 60
      },
      engagement: {
        likes: 0,
        likedBy: [],
        comments: []
      }
    };
  };

  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post);
    // TODO: Open full-screen WorkoutDetailView
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Stats Bar */}
      <CompactStatsBar
        streak={streak}
        weeklyGoal={user.weeklyGoal}
        postsThisWeek={Math.min(streak, user.weeklyGoal)}
        todayWorkout={{
          title: 'Push Day',
          time: '6:00 PM',
        }}
      />

      {/* Vertical Feed - The Hero */}
      <VerticalFeed 
        posts={feedPosts}
        isLocked={!posted}
        onPostClick={handlePostClick}
        currentUserId={user.id}
      />
    </div>
  );
};

export default TodayHome;
