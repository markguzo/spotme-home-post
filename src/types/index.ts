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

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
}

export interface PhotoReaction {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  photoUri: string;
  timestamp: string;
}

export interface EmojiReaction {
  emoji: string;
  count: number;
  userIds: string[];
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  imageUri: string;
  timestamp: string;
  caption?: string;
  meta: {
    pr: boolean;
    workoutType?: string;
    duration?: number;
  };
  engagement: {
    likes: number;
    likedBy: string[];
    comments: Comment[];
    photoReactions: PhotoReaction[];
    emojiReactions: EmojiReaction[];
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
  LIKES: 'spotme:likes',
  LIKED_POSTS: 'spotme:likedPosts',
  COMMENTS: 'spotme:comments',
} as const;
