import { storage } from './storage';
import { format, parseISO, differenceInDays } from 'date-fns';

export const getTodayISO = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const hasPostedToday = (): boolean => {
  const lastPostDate = storage.getLastPostDate();
  const today = getTodayISO();
  return lastPostDate === today;
};

export const calculateStreak = (lastPostDate: string | null, currentStreak: number): number => {
  if (!lastPostDate) return 0;

  const today = new Date();
  const lastPost = parseISO(lastPostDate);
  const daysDiff = differenceInDays(today, lastPost);

  if (daysDiff === 0) {
    // Already posted today
    return currentStreak;
  } else if (daysDiff === 1) {
    // Posted yesterday, continue streak
    return currentStreak + 1;
  } else {
    // Streak broken, reset to 1
    return 1;
  }
};

export const updateStreakAfterPost = (): number => {
  const lastPostDate = storage.getLastPostDate();
  const currentStreak = storage.getStreak();
  const today = getTodayISO();

  const newStreak = calculateStreak(lastPostDate, currentStreak);
  
  storage.setStreak(newStreak);
  storage.setLastPostDate(today);

  return newStreak;
};
