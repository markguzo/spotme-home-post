import { useState, useEffect } from 'react';
import { CompactStatsBar } from '@/components/CompactStatsBar';
import { VerticalFeed } from '@/components/VerticalFeed';
import { PostWorkoutModal } from '@/components/PostWorkoutModal';
import { UnlockPromptModal } from '@/components/UnlockPromptModal';
import { storage } from '@/lib/storage';
import { hasPostedToday } from '@/lib/streak';
import { User, Post, Comment } from '@/types';
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
    userAvatar: 'https://i.pravatar.cc/200?img=12',
    imageUri: gymPhoto1,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    caption: 'New deadlift PR! 405lbs × 3 💪 Feeling unstoppable',
    meta: { pr: true, workoutType: 'Pull Day', duration: 75 },
    engagement: {
      likes: 24,
      likedBy: ['f2', 'f3', 'f4'],
      comments: [
        { id: 'c1', userId: 'f2', userName: 'Riley', userAvatar: 'https://i.pravatar.cc/200?img=45', text: 'Beast mode! 🔥', timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString() },
        { id: 'c2', userId: 'f3', userName: 'Jordan', userAvatar: 'https://i.pravatar.cc/200?img=33', text: "Let's goooo! That's insane", timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() }
      ],
      photoReactions: [],
      emojiReactions: []
    }
  },
  {
    id: 'p2',
    userId: 'f2',
    userName: 'Riley',
    userAvatar: 'https://i.pravatar.cc/200?img=45',
    imageUri: gymPhoto2,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    caption: 'Morning leg day complete. Squats never get easier 😅',
    meta: { pr: false, workoutType: 'Leg Day', duration: 60 },
    engagement: {
      likes: 18,
      likedBy: ['f1', 'f5'],
      comments: [
        { id: 'c3', userId: 'f1', userName: 'Sam', userAvatar: 'https://i.pravatar.cc/200?img=12', text: 'Keep grinding! 💪', timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString() }
      ],
      photoReactions: [],
      emojiReactions: []
    }
  },
  {
    id: 'p3',
    userId: 'f3',
    userName: 'Jordan',
    userAvatar: 'https://i.pravatar.cc/200?img=33',
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
    userAvatar: 'https://i.pravatar.cc/200?img=27',
    imageUri: gymPhoto4,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    caption: 'Bench press PR! 225lbs for reps 🎯',
    meta: { pr: true, workoutType: 'Push Day', duration: 70 },
    engagement: {
      likes: 31,
      likedBy: ['f1', 'f2', 'f3', 'f5', 'f7'],
      comments: [
        { id: 'c4', userId: 'f5', userName: 'Morgan', userAvatar: 'https://i.pravatar.cc/200?img=51', text: 'Crushing it! 🔥🔥', timestamp: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString() }
      ],
      photoReactions: [],
      emojiReactions: []
    }
  },
  {
    id: 'p5',
    userId: 'f5',
    userName: 'Morgan',
    userAvatar: 'https://i.pravatar.cc/200?img=51',
    imageUri: gymPhoto5,
    timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    caption: 'Recovery day yoga and stretching 🧘',
    meta: { pr: false, workoutType: 'Recovery', duration: 30 },
    engagement: { likes: 12, likedBy: ['f6', 'f8'], comments: [], photoReactions: [], emojiReactions: [] }
  },
];

const TodayHome = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posted, setPosted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isUnlockPromptOpen, setIsUnlockPromptOpen] = useState(false);

  useEffect(() => {
    if (import.meta.env.DEV) storage.clearAllData();
    storage.initializeDefaults();
    const userData = storage.getUser();
    setUser(userData);
    setPosted(hasPostedToday());
    setStreak(storage.getStreak());

    if (import.meta.env.DEV) {
      (window as any).debugClearData = () => {
        storage.clearAllData();
        window.location.reload();
      };
    }

    const userPost = getUserPost(userData);
    setFeedPosts(userPost && hasPostedToday() ? [userPost, ...mockFeedPosts] : mockFeedPosts);

    const handlePostEvent = () => {
      setPosted(true);
      setStreak(storage.getStreak());
      const newUserPost = getUserPost(userData);
      if (newUserPost) setFeedPosts([newUserPost, ...mockFeedPosts]);
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
      userAvatar: `https://i.pravatar.cc/200?u=${userData.username}`,
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
      userAvatar: `https://i.pravatar.cc/200?u=${user!.username}`,
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <CompactStatsBar
        streak={streak}
        weeklyGoal={user.weeklyGoal}
        postsThisWeek={Math.min(streak, user.weeklyGoal)}
        todayWorkout={{ title: 'Push Day', time: '6:00 PM' }}
      />

      <VerticalFeed 
        posts={feedPosts}
        isLocked={!posted}
        onPostClick={handlePostClick}
        onUnlockClick={() => setIsUnlockPromptOpen(true)}
        currentUserId={user.id}
        onAddComment={handleAddComment}
        currentUserName={user.name}
        currentUserAvatar={`https://i.pravatar.cc/200?u=${user.username}`}
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

export default TodayHome;
