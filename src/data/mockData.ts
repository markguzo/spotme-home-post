export interface User {
  id: string;
  name: string;
  username: string;
  photo: string;
  gymGoalPerWeek: number;
  streak: number;
  postedToday: boolean;
  weeklyWorkouts: number;
}

export interface Post {
  id: string;
  userId: string;
  photoUrl: string;
  timestamp: string;
  workoutType?: string;
}

export interface Friend extends User {
  lastWorkoutTime: string;
  pr?: string;
  prDetails?: {
    exercise: string;
    weight: number;
    reps: number;
    date: string;
  };
}

export interface Crew {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  memberCount: number;
  requirements?: {
    minPR?: number;
    minBadges?: number;
    minStreak?: number;
  };
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  category: "consistency" | "social" | "achievement";
  requirement: {
    type: "workouts" | "friends" | "invites" | "streak";
    count: number;
  };
  animationType: "squat" | "bench" | "deadlift" | "pushup";
  animationDuration: number;
  progress?: number;
}

export const currentUser: User = {
  id: "1",
  name: "Alex Martinez",
  username: "alex_fitness",
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  gymGoalPerWeek: 4,
  streak: 12,
  postedToday: false,
  weeklyWorkouts: 3
};

export const friends: Friend[] = [
  {
    id: "2",
    name: "Mark Thompson",
    username: "mark_fitness",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    gymGoalPerWeek: 5,
    streak: 15,
    postedToday: true,
    weeklyWorkouts: 5,
    lastWorkoutTime: "2 hours ago",
    pr: "Bench 225lb",
    prDetails: {
      exercise: "Bench Press",
      weight: 225,
      reps: 1,
      date: "2024-11-10",
    },
  },
  {
    id: "3",
    name: "Moises Rodriguez",
    username: "moises_lifts",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    gymGoalPerWeek: 4,
    streak: 8,
    postedToday: true,
    weeklyWorkouts: 4,
    lastWorkoutTime: "4 hours ago",
    pr: "Deadlift 315lb",
    prDetails: {
      exercise: "Deadlift",
      weight: 315,
      reps: 1,
      date: "2024-11-12",
    },
  },
  {
    id: "4",
    name: "Maria Garcia",
    username: "maria_strong",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    gymGoalPerWeek: 3,
    streak: 21,
    postedToday: true,
    weeklyWorkouts: 3,
    lastWorkoutTime: "1 hour ago",
    pr: "Squat 185lb",
    prDetails: {
      exercise: "Squat",
      weight: 185,
      reps: 5,
      date: "2024-11-08",
    },
  },
  {
    id: "5",
    name: "Pablo Sanchez",
    username: "pablo_gains",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    gymGoalPerWeek: 6,
    streak: 5,
    postedToday: true,
    weeklyWorkouts: 4,
    lastWorkoutTime: "5 hours ago"
  }
];

export const posts: Post[] = [
  {
    id: "1",
    userId: "2",
    photoUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop",
    timestamp: "2 hours ago",
    workoutType: "Push Day"
  },
  {
    id: "2",
    userId: "3",
    photoUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop",
    timestamp: "4 hours ago",
    workoutType: "Legs"
  },
  {
    id: "3",
    userId: "4",
    photoUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop",
    timestamp: "1 hour ago",
    workoutType: "Cardio"
  },
  {
    id: "4",
    userId: "5",
    photoUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop",
    timestamp: "5 hours ago",
    workoutType: "Pull Day"
  }
];

export const badges: Badge[] = [
  {
    id: "first-rep",
    name: "First Rep",
    icon: "🎯",
    description: "Record your first workout",
    unlocked: true,
    category: "achievement",
    requirement: { type: "workouts", count: 1 },
    animationType: "squat",
    animationDuration: 2000,
    progress: 1,
  },
  {
    id: "week-warrior",
    name: "7-Day Warrior",
    icon: "🔥",
    description: "Maintain a 7-day streak",
    unlocked: true,
    category: "consistency",
    requirement: { type: "streak", count: 7 },
    animationType: "bench",
    animationDuration: 2500,
    progress: 12,
  },
  {
    id: "squad-leader",
    name: "Squad Leader",
    icon: "👥",
    description: "Add 10 friends to your crew",
    unlocked: false,
    category: "social",
    requirement: { type: "friends", count: 10 },
    animationType: "deadlift",
    animationDuration: 3000,
    progress: 6,
  },
  {
    id: "month-master",
    name: "Month Master",
    icon: "💎",
    description: "Maintain a 30-day streak",
    unlocked: false,
    category: "consistency",
    requirement: { type: "streak", count: 30 },
    animationType: "squat",
    animationDuration: 2000,
    progress: 12,
  },
  {
    id: "iron-will",
    name: "Iron Will",
    icon: "🏋️",
    description: "Record 100 workouts",
    unlocked: false,
    category: "achievement",
    requirement: { type: "workouts", count: 100 },
    animationType: "bench",
    animationDuration: 2500,
    progress: 47,
  },
  {
    id: "social-butterfly",
    name: "Social Butterfly",
    icon: "🦋",
    description: "Add 25 friends",
    unlocked: false,
    category: "social",
    requirement: { type: "friends", count: 25 },
    animationType: "pushup",
    animationDuration: 2000,
    progress: 6,
  },
];

export const crews: Crew[] = [
  {
    id: "1",
    name: "Iron Warriors",
    description: "Elite lifters pushing heavy weight",
    isPrivate: true,
    memberCount: 24,
    requirements: {
      minPR: 300,
      minBadges: 5,
      minStreak: 14,
    },
  },
  {
    id: "2",
    name: "Morning Grinders",
    description: "Early birds who crush workouts before sunrise",
    isPrivate: false,
    memberCount: 156,
  },
  {
    id: "3",
    name: "Consistency Kings",
    description: "No excuses, just results",
    isPrivate: true,
    memberCount: 48,
    requirements: {
      minStreak: 30,
      minBadges: 3,
    },
  },
  {
    id: "4",
    name: "Fitness Fam",
    description: "Supportive community for all fitness levels",
    isPrivate: false,
    memberCount: 342,
  },
];

export const potentialFriends = [
  {
    id: "6",
    name: "Alex",
    username: "alex_fit",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    mutualFriends: 3
  },
  {
    id: "7",
    name: "Jordan",
    username: "jordan_strong",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    mutualFriends: 5
  },
  {
    id: "8",
    name: "Sam",
    username: "sam_gains",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    mutualFriends: 2
  }
];

export const todaysWorkouts = [
  { exercise: "Bench Press", sets: 4, reps: 8, weight: 185 },
  { exercise: "Incline Dumbbell Press", sets: 3, reps: 10, weight: 70 },
  { exercise: "Cable Flyes", sets: 3, reps: 12, weight: 35 },
  { exercise: "Tricep Dips", sets: 3, reps: 15, weight: 0 },
];
