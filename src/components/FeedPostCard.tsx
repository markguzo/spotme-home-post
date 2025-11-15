import { Heart, MessageCircle, Share2, Dumbbell, Lock, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Post } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { CommentSection } from './CommentSection';

interface FeedPostCardProps {
  post: Post;
  onPostClick: (post: Post) => void;
  onUnlockClick: () => void;
  isLocked: boolean;
  currentUserId: string;
  onAddComment: (postId: string, text: string) => void;
  currentUserName: string;
  currentUserAvatar: string;
  style?: React.CSSProperties;
}

export const FeedPostCard = ({ 
  post, 
  onPostClick,
  onUnlockClick,
  isLocked,
  currentUserId,
  onAddComment,
  currentUserName,
  currentUserAvatar,
  style 
}: FeedPostCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });
  const isUserPost = post.userId === currentUserId;

  const handleCardClick = () => {
    if (isLocked) {
      onUnlockClick();
    } else {
      onPostClick(post);
    }
  };

  return (
    <div 
      className={`bg-card rounded-3xl overflow-hidden mb-6 mx-4 shadow-lg transition-all duration-300 relative ${
        isLocked ? 'cursor-pointer hover:scale-[1.02] hover:shadow-2xl' : 'hover:shadow-xl'
      } animate-in fade-in slide-in-from-bottom-4`}
      style={style}
      onClick={isLocked ? handleCardClick : undefined}
    >
      {/* When LOCKED: Premium frosted glass overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {/* Gradient overlay - purple to black */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/60 to-background/90 backdrop-blur-xl" />
          
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" 
               style={{ backgroundSize: '200% 100%' }} />
          
          {/* Center content */}
          <div className="relative z-20 text-center px-6">
            {/* Animated glowing lock icon */}
            <div className="relative inline-block mb-4">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full animate-pulse" />
              
              {/* Lock icon */}
              <div className="relative bg-gradient-to-br from-primary via-primary-dark to-primary/80 rounded-full p-5 shadow-2xl">
                <Lock className="h-10 w-10 text-white drop-shadow-lg" strokeWidth={2.5} />
              </div>
            </div>
            
            {/* Text content */}
            <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
              Post to Unlock
            </h3>
            <p className="text-sm text-white/80 font-medium drop-shadow">
              Tap to share your workout
            </p>
          </div>
          
          {/* Border glow effect */}
          <div className="absolute inset-0 rounded-3xl border border-primary/20 shadow-[inset_0_0_20px_rgba(124,124,250,0.1)]" />
        </div>
      )}

      {/* Header - Only show when unlocked */}
      {!isLocked && (
        <div className="flex items-center gap-3 p-5 pb-3">
          <Avatar className="h-11 w-11 border-2 border-primary/20">
            <AvatarImage src={post.userAvatar} />
            <AvatarFallback>{post.userName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base truncate">
                {isUserPost ? 'You' : post.userName}
              </span>
              {isUserPost && (
                <Badge variant="secondary" className="text-xs px-2 py-0">You</Badge>
              )}
            </div>
            <span className="text-sm text-muted-foreground">{timeAgo}</span>
          </div>
          
          {post.meta.pr && (
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-2.5 shadow-xl">
              <Star className="h-5 w-5 text-white fill-white" />
            </div>
          )}
        </div>
      )}

      {/* Large Workout Image with Badge Overlay */}
      <div className="relative aspect-[4/5] w-full overflow-hidden cursor-pointer group">
        <img 
          src={post.imageUri} 
          alt={`${post.userName}'s workout`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Workout Badge Overlay - Only show when unlocked */}
        {!isLocked && post.meta.workoutType && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pt-20">
            <div className="flex items-center gap-2 text-white">
              <Dumbbell className="h-5 w-5" />
              <span className="text-xl font-bold">
                {post.meta.workoutType}
                {post.meta.duration && (
                  <span className="text-base font-semibold ml-2 opacity-90">
                    • {post.meta.duration} min
                  </span>
                )}
              </span>
            </div>
            {post.meta.pr && (
              <div className="mt-2 text-amber-400 text-sm font-bold flex items-center gap-1">
                <Star className="h-4 w-4 fill-current" />
                <span>Personal Record!</span>
              </div>
            )}
          </div>
        )}

        {/* Locked State - Show generic icon only */}
        {isLocked && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
            <Dumbbell className="h-6 w-6 text-white opacity-50" />
          </div>
        )}
      </div>

      {/* Caption - Only show when unlocked */}
      {!isLocked && post.caption && (
        <div className="px-5 py-4">
          <p className="text-foreground text-base leading-relaxed">{post.caption}</p>
        </div>
      )}

      {/* Comments Section - Only show when unlocked */}
      {!isLocked && (
        <CommentSection
          postId={post.id}
          comments={post.engagement.comments}
          onAddComment={onAddComment}
          currentUserId={currentUserId}
          currentUserName={currentUserName}
          currentUserAvatar={currentUserAvatar}
        />
      )}
    </div>
  );
};
