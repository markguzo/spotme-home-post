import { useState, useEffect } from 'react';
import { CompactStatsBar } from '@/components/CompactStatsBar';
import { FeedGrid } from '@/components/FeedGrid';
import { storage } from '@/lib/storage';
import { hasPostedToday } from '@/lib/streak';
import { User, Friend, Post } from '@/types';

const mockFriends: Friend[] = [
  { id: 'f1', name: 'Sam', pr: true, image: 'https://picsum.photos/seed/sam/400' },
  { id: 'f2', name: 'Riley', pr: false, image: 'https://picsum.photos/seed/riley/400' },
  { id: 'f3', name: 'Jordan', pr: false, image: 'https://picsum.photos/seed/jordan/400' },
  { id: 'f4', name: 'Casey', pr: true, image: 'https://picsum.photos/seed/casey/400' },
  { id: 'f5', name: 'Morgan', pr: false, image: 'https://picsum.photos/seed/morgan/400' },
  { id: 'f6', name: 'Taylor', pr: false, image: 'https://picsum.photos/seed/taylor/400' },
  { id: 'f7', name: 'Alex', pr: false, image: 'https://picsum.photos/seed/alex/400' },
  { id: 'f8', name: 'Jamie', pr: true, image: 'https://picsum.photos/seed/jamie/400' },
];

const TodayHome = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posted, setPosted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [userPost, setUserPost] = useState<Post | null>(null);

  useEffect(() => {
    storage.initializeDefaults();
    const userData = storage.getUser();
    setUser(userData);
    setPosted(hasPostedToday());
    setStreak(storage.getStreak());

    // Get user's latest post if posted today
    if (hasPostedToday()) {
      const posts = storage.getPosts();
      const todayPost = posts.find(p => p.userId === userData?.id);
      setUserPost(todayPost || null);
    }

    // Listen for post events
    const handlePostEvent = () => {
      setPosted(true);
      setStreak(storage.getStreak());
      const posts = storage.getPosts();
      const todayPost = posts.find(p => p.userId === user?.id);
      setUserPost(todayPost || null);
    };

    window.addEventListener('posted:today', handlePostEvent);
    return () => window.removeEventListener('posted:today', handlePostEvent);
  }, [user?.id]);

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

      {/* Feed Grid - The Hero */}
      <div className="max-w-2xl mx-auto p-4">
        <FeedGrid
          friends={mockFriends}
          isLocked={!posted}
          userPost={userPost || undefined}
        />

        <p className="text-center text-sm text-muted-foreground py-6 mt-4">
          Keep showing up. Your crew is counting on you. 💪
        </p>
      </div>
    </div>
  );
};

export default TodayHome;
