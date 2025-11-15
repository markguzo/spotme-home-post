import { FeedPostCard } from './FeedPostCard';
import { LockedFeedOverlay } from './LockedFeedOverlay';
import { Post } from '@/types';

interface VerticalFeedProps {
  posts: Post[];
  isLocked: boolean;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onPostClick: (post: Post) => void;
  currentUserId: string;
}

export const VerticalFeed = ({ 
  posts, 
  isLocked, 
  onLike, 
  onComment, 
  onPostClick,
  currentUserId 
}: VerticalFeedProps) => {
  return (
    <div className="relative min-h-[85vh]">
      {/* Feed Container */}
      <div className={`max-w-2xl mx-auto pb-8 ${isLocked ? 'blur-3xl brightness-75' : ''} transition-all duration-1000`}>
        {posts.slice(0, isLocked ? 4 : posts.length).map((post, index) => (
          <FeedPostCard
            key={post.id}
            post={post}
            onLike={onLike}
            onComment={onComment}
            onPostClick={onPostClick}
            isLocked={isLocked}
            currentUserId={currentUserId}
            style={{ 
              animationDelay: !isLocked ? `${index * 50}ms` : '0ms'
            }}
          />
        ))}
      </div>

      {/* Locked Overlay */}
      {isLocked && <LockedFeedOverlay friendCount={posts.length} />}
    </div>
  );
};
