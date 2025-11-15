export interface User {
  id: string;
  name: string;
  username: string;
  weeklyGoal: number;
}

export interface Session {
  dateISO: string;
  hasPostedToday: boolean;
  streakCount: number;
  todayWorkout?: {
    title: string;
    time: string;
    durationMin: number;
  };
}

export interface Post {
  id: string;
  userId: string;
  imageUri: string;
  timestamp: string;
  meta: {
    pr: boolean;
  };
}

export interface Friend {
  id: string;
  name: string;
  pr: boolean;
  image: string;
}

export const STORAGE_KEYS = {
  USER: 'spotme:user',
  POSTS: 'spotme:posts',
  STREAK: 'spotme:streak',
  LAST_POST_DATE: 'spotme:lastPostDate',
} as const;
