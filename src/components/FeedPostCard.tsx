import { Heart, MessageCircle, Share2, Dumbbell, Lock, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Post } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

interface FeedPostCardProps {
  post: Post;
  onPostClick: (post: Post) => void;
  onUnlockClick: () => void;
  isLocked: boolean;
  currentUserId: string;
  onLike: (postId: string) => void;
  style?: React.CSSProperties;
}

const QUICK_EMOJIS = ['💪', '🔥', '👏'];

export const FeedPostCard = ({ 
  post, 
  onPostClick,
  onUnlockClick,
  isLocked,
  currentUserId,
  onLike,
  style 
}: FeedPostCardProps) => {
  const [showHeart, setShowHeart] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });
  const isUserPost = post.userId === currentUserId;
  const isLiked = post.engagement.likedBy.includes(currentUserId);

  const handleCardClick = () => {
    if (isLocked) {
      onUnlockClick();
    }
  };

  const handleDoubleClick = () => {
    if (!isLocked && !isLiked) {
      onLike(post.id);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLocked) {
      onLike(post.id);
    }
  };

  const handleEmojiClick = (e: React.MouseEvent, emoji: string) => {
    e.stopPropagation();
    setSelectedEmojis(prev => 
      prev.includes(emoji) ? prev.filter(e => e !== emoji) : [...prev, emoji]
    );
  };

  return (
    <div 
      className={`bg-gradient-to-br from-card via-card to-card/80 rounded-3xl overflow-hidden mb-6 mx-4 shadow-xl transition-all duration-300 relative border border-border/30 ${
        isLocked ? 'cursor-pointer hover:scale-[1.02] hover:shadow-2xl' : 'hover:shadow-2xl'
      } animate-in fade-in slide-in-from-bottom-4`}
      style={style}
      onClick={isLocked ? handleCardClick : undefined}
    >
      {/* LOCKED STATE: Premium frosted glass overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/60 to-background/90 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" 
               style={{ backgroundSize: '200% 100%' }} />
          
          <div className="relative z-20 text-center px-6">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full animate-pulse" />
              <div className="relative bg-gradient-to-br from-primary via-primary-dark to-primary/80 rounded-full p-5 shadow-2xl">
                <Lock className="h-10 w-10 text-white drop-shadow-lg" strokeWidth={2.5} />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
              Post to Unlock
            </h3>
            <p className="text-sm text-white/80 font-medium drop-shadow">
              Tap to share your workout
            </p>
          </div>
          
          <div className="absolute inset-0 rounded-3xl border border-primary/20 shadow-[inset_0_0_20px_rgba(124,124,250,0.1)]" />
        </div>
      )}

      {/* UNLOCKED: Glass morphism header */}
      {!isLocked && (
        <div className="relative bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-md border-b border-border/20">
          <div className="flex items-center gap-3 p-5">
            <Avatar className="h-12 w-12 border-2 border-primary/30 ring-2 ring-background/50 shadow-lg">
              <AvatarImage src={post.userAvatar} />
              <AvatarFallback>{post.userName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base truncate">
                  {isUserPost ? 'You' : post.userName}
                </span>
                {isUserPost && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">You</Badge>
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
        </div>
      )}

      {/* Large Workout Image with floating engagement */}
      <div 
        className="relative aspect-[4/5] w-full overflow-hidden cursor-pointer group"
        onDoubleClick={handleDoubleClick}
        onClick={() => !isLocked && onPostClick(post)}
      >
        <img 
          src={post.imageUri} 
          alt={`${post.userName}'s workout`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Double-tap heart animation */}
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart 
              className="h-32 w-32 fill-white text-white animate-[heart-burst_0.6s_ease-out]"
            />
          </div>
        )}

        {/* Floating Engagement Buttons - Only when unlocked */}
        {!isLocked && (
          <>
            {/* Quick Emoji Reactions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {QUICK_EMOJIS.map((emoji, idx) => (
                <button
                  key={emoji}
                  onClick={(e) => handleEmojiClick(e, emoji)}
                  className={`bg-background/80 backdrop-blur-md border border-border/30 rounded-full w-12 h-12 flex items-center justify-center text-2xl hover:scale-110 transition-all duration-200 shadow-lg ${
                    selectedEmojis.includes(emoji) ? 'ring-2 ring-primary scale-110' : ''
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Main Actions - Always visible */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-3">
              <button
                onClick={handleLikeClick}
                className="bg-background/90 backdrop-blur-md border border-border/30 rounded-full w-14 h-14 flex flex-col items-center justify-center hover:scale-110 transition-all duration-200 shadow-xl group/like"
              >
                <Heart
                  className={`h-6 w-6 transition-all duration-300 ${
                    isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-foreground group-hover/like:text-red-500'
                  }`}
                />
                <span className="text-xs font-bold mt-0.5">{post.engagement.likes}</span>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPostClick(post);
                }}
                className="bg-background/90 backdrop-blur-md border border-border/30 rounded-full w-14 h-14 flex flex-col items-center justify-center hover:scale-110 transition-all duration-200 shadow-xl"
              >
                <MessageCircle className="h-6 w-6 text-foreground" />
                <span className="text-xs font-bold mt-0.5">{post.engagement.comments.length}</span>
              </button>
              
              <button
                onClick={(e) => e.stopPropagation()}
                className="bg-background/90 backdrop-blur-md border border-border/30 rounded-full w-14 h-14 flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-xl"
              >
                <Share2 className="h-6 w-6 text-foreground" />
              </button>
            </div>
          </>
        )}
        
        {/* Workout Badge Overlay - Only when unlocked */}
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
        <div className="px-5 py-4 bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm">
          <p className="text-foreground text-base leading-relaxed">{post.caption}</p>
        </div>
      )}
    </div>
  );
};
