import { useState, useEffect } from 'react';
import { TopBar } from '@/components/TopBar';
import { GradientHeroCard } from '@/components/GradientHeroCard';
import { StreakRow } from '@/components/StreakRow';
import { WorkoutCard } from '@/components/WorkoutCard';
import { FeedPreview } from '@/components/FeedPreview';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { storage } from '@/lib/storage';
import { hasPostedToday } from '@/lib/streak';
import { formatTodayHeader } from '@/lib/date-utils';
import { User, Friend } from '@/types';

const mockFriends: Friend[] = [
  { id: 'f1', name: 'Sam', pr: true, image: 'https://picsum.photos/seed/sam/400' },
  { id: 'f2', name: 'Riley', pr: false, image: 'https://picsum.photos/seed/riley/400' },
  { id: 'f3', name: 'Jordan', pr: false, image: 'https://picsum.photos/seed/jordan/400' },
];

const TodayHome = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posted, setPosted] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    storage.initializeDefaults();
    const userData = storage.getUser();
    setUser(userData);
    setPosted(hasPostedToday());
    setStreak(storage.getStreak());

    // Listen for post events
    const handlePostEvent = () => {
      setPosted(true);
      setStreak(storage.getStreak());
    };

    window.addEventListener('posted:today', handlePostEvent);
    return () => window.removeEventListener('posted:today', handlePostEvent);
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <TopBar
        title={formatTodayHeader()}
        rightContent={
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground font-medium">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
        }
      />

      <div className="max-w-2xl mx-auto p-4 space-y-8">
        <GradientHeroCard hasPosted={posted} userName={user.name} />

        <StreakRow 
          streak={streak} 
          weeklyGoal={user.weeklyGoal}
          postsThisWeek={Math.min(streak, user.weeklyGoal)}
        />

        <WorkoutCard
          workout={{
            title: 'Push Day',
            time: '6:00 PM',
            durationMin: 60,
          }}
        />

        <FeedPreview hasPosted={posted} friends={mockFriends} />

        <p className="text-center text-sm text-muted-foreground py-4">
          Keep showing up. Your crew is counting on you. 💪
        </p>
      </div>
    </div>
  );
};

export default TodayHome;
