import { Star, Dumbbell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Post } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface FeedPostCardProps {
  post: Post;
  onPostClick: (post: Post) => void;
  isLocked: boolean;
  currentUserId: string;
  style?: React.CSSProperties;
}

export const FeedPostCard = ({ 
  post, 
  onPostClick,
  isLocked,
  currentUserId,
  style 
}: FeedPostCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });
  const isUserPost = post.userId === currentUserId;

  return (
    <div 
      className="bg-card rounded-3xl overflow-hidden mb-6 mx-4 shadow-lg transition-all duration-300 animate-fade-in"
      style={style}
      onClick={() => !isLocked && onPostClick(post)}
    >
      {/* Header - Hidden when locked */}
      {!isLocked && (
        <div className="flex items-center gap-3 p-5 pb-3">
          <Avatar className="h-11 w-11 ring-2 ring-primary/20">
            <AvatarImage src={post.userAvatar} />
            <AvatarFallback>{post.userName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground text-base">{post.userName}</span>
              {isUserPost && (
                <Badge variant="default" className="text-xs px-2 py-0 h-5">
                  You
                </Badge>
              )}
            </div>
            <span className="text-sm text-muted-foreground font-medium">{timeAgo}</span>
          </div>
          
          {post.meta.pr && (
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-2.5 shadow-xl">
              <Star className="h-5 w-5 text-white fill-white" />
            </div>
          )}
        </div>
      )}

      {/* Locked State Header Placeholder */}
      {isLocked && (
        <div className="flex items-center gap-3 p-5 pb-3 opacity-40">
          <div className="h-11 w-11 rounded-full bg-muted animate-pulse" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            <div className="h-3 w-16 bg-muted rounded animate-pulse" />
          </div>
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
    </div>
  );
};
