import { FeedPostCard } from './FeedPostCard';
import { Post } from '@/types';

interface VerticalFeedProps {
  posts: Post[];
  isLocked: boolean;
  onPostClick: (post: Post) => void;
  onUnlockClick: () => void;
  currentUserId: string;
  onAddComment: (postId: string, text: string) => void;
  currentUserName: string;
  currentUserAvatar: string;
}

export const VerticalFeed = ({ 
  posts, 
  isLocked, 
  onPostClick,
  onUnlockClick,
  currentUserId,
  onAddComment,
  currentUserName,
  currentUserAvatar
}: VerticalFeedProps) => {
  return (
    <div className="relative min-h-screen pb-32">
      {/* Feed Container - No global blur anymore */}
      <div className="max-w-2xl mx-auto pb-8">
        {posts.map((post, index) => (
          <FeedPostCard
            key={post.id}
            post={post}
            onPostClick={onPostClick}
            onUnlockClick={onUnlockClick}
            isLocked={isLocked}
            currentUserId={currentUserId}
            onAddComment={onAddComment}
            currentUserName={currentUserName}
            currentUserAvatar={currentUserAvatar}
            style={{ 
              animationDelay: `${index * 50}ms`
            }}
          />
        ))}
      </div>
    </div>
  );
};
