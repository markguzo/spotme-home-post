import { FeedPostCard } from './FeedPostCard';
import { LockedFeedOverlay } from './LockedFeedOverlay';
import { Post } from '@/types';

interface VerticalFeedProps {
  posts: Post[];
  isLocked: boolean;
  onPostClick: (post: Post) => void;
  currentUserId: string;
  onOpenPostModal: () => void;
}

export const VerticalFeed = ({ 
  posts, 
  isLocked, 
  onPostClick,
  currentUserId,
  onOpenPostModal
}: VerticalFeedProps) => {
  return (
    <div className="relative min-h-screen pb-32">
      {/* Feed Container */}
      <div className={`max-w-2xl mx-auto pb-8 transition-all duration-1500 ${
        isLocked 
          ? 'blur-[20px] brightness-[0.5] saturate-[0.3] opacity-70 select-none' 
          : 'blur-0 brightness-100 saturate-100 opacity-100'
      }`}>
        {posts.slice(0, isLocked ? 8 : posts.length).map((post, index) => (
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
      {isLocked && <LockedFeedOverlay friendCount={posts.length} onPostClick={onOpenPostModal} />}
    </div>
  );
};
