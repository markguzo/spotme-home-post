import { User, Post, Comment, STORAGE_KEYS } from '@/types';

export const storage = {
  getUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  setUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getPosts: (): Post[] => {
    const data = localStorage.getItem(STORAGE_KEYS.POSTS);
    return data ? JSON.parse(data) : [];
  },

  addPost: (post: Post): void => {
    const posts = storage.getPosts();
    posts.unshift(post);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  },

  addComment: (postId: string, comment: Comment): void => {
    const posts = storage.getPosts();
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          engagement: {
            ...post.engagement,
            comments: [...post.engagement.comments, comment]
          }
        };
      }
      return post;
    });
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updatedPosts));
  },

  getStreak: (): number => {
    const data = localStorage.getItem(STORAGE_KEYS.STREAK);
    return data ? parseInt(data, 10) : 0;
  },

  setStreak: (streak: number): void => {
    localStorage.setItem(STORAGE_KEYS.STREAK, streak.toString());
  },

  getLastPostDate: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.LAST_POST_DATE);
  },

  setLastPostDate: (date: string): void => {
    localStorage.setItem(STORAGE_KEYS.LAST_POST_DATE, date);
  },

  initializeDefaults: (): void => {
    if (!storage.getUser()) {
      storage.setUser({
        id: 'u_123',
        name: 'Alex',
        username: 'alexfit',
        weeklyGoal: 4,
      });
    }
  },

  clearAllData: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.POSTS);
    localStorage.removeItem(STORAGE_KEYS.STREAK);
    localStorage.removeItem(STORAGE_KEYS.LAST_POST_DATE);
  },
};
