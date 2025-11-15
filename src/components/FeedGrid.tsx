import { PostGridItem } from './PostGridItem';
import { LockedFeedOverlay } from './LockedFeedOverlay';
import { Friend, Post } from '@/types';

interface FeedGridProps {
  friends: Friend[];
  isLocked: boolean;
  userPost?: Post;
  onOpenPostModal?: () => void;
}

export const FeedGrid = ({ friends, isLocked, userPost, onOpenPostModal }: FeedGridProps) => {
  return (
    <div className="relative min-h-[70vh]">
      {/* Grid Container */}
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-1 ${isLocked ? 'blur-2xl brightness-75' : ''} transition-all duration-1000`}>
        {/* User's Post (if posted) */}
        {userPost && !isLocked && (
          <PostGridItem
            name="You"
            image={userPost.imageUri}
            pr={userPost.meta.pr}
            isUserPost={true}
          />
        )}
        
        {/* Friend Posts */}
        {friends.map((friend) => (
          <PostGridItem
            key={friend.id}
            name={friend.name}
            image={friend.image}
            pr={friend.pr}
          />
        ))}
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <LockedFeedOverlay 
          friendCount={friends.length} 
          onPostClick={onOpenPostModal || (() => {})} 
        />
      )}
    </div>
  );
};
