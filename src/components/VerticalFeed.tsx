import { FeedPostCard } from './FeedPostCard';
import { LockedFeedOverlay } from './LockedFeedOverlay';
import { Post } from '@/types';

interface VerticalFeedProps {
  posts: Post[];
  isLocked: boolean;
  onPostClick: (post: Post) => void;
  currentUserId: string;
}

export const VerticalFeed = ({ 
  posts, 
  isLocked, 
  onPostClick,
  currentUserId 
}: VerticalFeedProps) => {
  return (
    <div className="relative min-h-[85vh]">
      {/* Feed Container */}
      <div className={`max-w-2xl mx-auto pb-8 transition-all duration-1500 ${
        isLocked 
          ? 'blur-[50px] brightness-[0.3] saturate-0 pointer-events-none select-none' 
          : 'blur-0 brightness-100'
      }`}>
        {posts.slice(0, isLocked ? 6 : posts.length).map((post, index) => (
          <FeedPostCard
            key={post.id}
            post={post}
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
