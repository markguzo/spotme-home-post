import { FeedPostCard } from './FeedPostCard';
import { PostDetailModal } from './PostDetailModal';
import { Post } from '@/types';
import { useState } from 'react';

interface VerticalFeedProps {
  posts: Post[];
  isLocked: boolean;
  onPostClick: (post: Post) => void;
  onUnlockClick: () => void;
  currentUserId: string;
  onAddComment: (postId: string, text: string) => void;
  currentUserName: string;
  currentUserAvatar: string;
  onLike: (postId: string) => void;
}

export const VerticalFeed = ({ 
  posts, 
  isLocked, 
  onPostClick,
  onUnlockClick,
  currentUserId,
  onAddComment,
  currentUserName,
  currentUserAvatar,
  onLike
}: VerticalFeedProps) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    onPostClick(post);
  };

  return (
    <>
      <div className="relative min-h-screen pb-32">
        <div className="max-w-2xl mx-auto pb-8">
          {posts.map((post, index) => (
            <FeedPostCard
              key={post.id}
              post={post}
              onPostClick={handlePostClick}
              onUnlockClick={onUnlockClick}
              isLocked={isLocked}
              currentUserId={currentUserId}
              onLike={onLike}
              style={{ 
                animationDelay: `${index * 50}ms`
              }}
            />
          ))}
        </div>
      </div>

      <PostDetailModal
        post={selectedPost}
        open={selectedPost !== null}
        onClose={() => setSelectedPost(null)}
        currentUserId={currentUserId}
        onLike={onLike}
        onAddComment={onAddComment}
        currentUserName={currentUserName}
        currentUserAvatar={currentUserAvatar}
      />
    </>
  );
};
