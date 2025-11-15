import { useState } from 'react';
import { Heart, MessageCircle, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Post } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface FeedPostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onPostClick: (post: Post) => void;
  isLocked: boolean;
  currentUserId: string;
  style?: React.CSSProperties;
}

export const FeedPostCard = ({ 
  post, 
  onLike, 
  onComment, 
  onPostClick,
  isLocked,
  currentUserId,
  style 
}: FeedPostCardProps) => {
  const [commentText, setCommentText] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isLiked, setIsLiked] = useState(post.engagement.likedBy.includes(currentUserId));
  const [likeCount, setLikeCount] = useState(post.engagement.likes);

  const handleLike = () => {
    if (isLocked) return;
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    onLike(post.id);
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim() || isLocked) return;
    onComment(post.id, commentText);
    setCommentText('');
    setShowCommentInput(false);
  };

  const handleDoubleClick = () => {
    if (isLocked || isLiked) return;
    handleLike();
  };

  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });
  const isUserPost = post.userId === currentUserId;

  return (
    <div 
      className="bg-card border border-border rounded-2xl overflow-hidden mb-4 mx-4 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
      style={style}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/10">
            <AvatarImage src={post.userAvatar} />
            <AvatarFallback>{post.userName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{post.userName}</span>
              {isUserPost && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-bold">
                  You
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
          </div>
        </div>
        
        {post.meta.pr && (
          <div className="bg-amber-500 rounded-full p-2 shadow-lg">
            <Star className="h-4 w-4 text-white fill-white" />
          </div>
        )}
      </div>

      {/* Image */}
      <div 
        className="relative aspect-square w-full overflow-hidden cursor-pointer group"
        onClick={() => !isLocked && onPostClick(post)}
        onDoubleClick={handleDoubleClick}
      >
        <img 
          src={post.imageUri} 
          alt={`${post.userName}'s workout`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Engagement Bar */}
      <div className="p-4 space-y-3">
        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto hover:bg-transparent group"
            onClick={handleLike}
            disabled={isLocked}
          >
            <Heart 
              className={`h-6 w-6 transition-all duration-200 ${
                isLiked 
                  ? 'fill-red-500 text-red-500 scale-110' 
                  : 'text-foreground group-hover:text-red-500 group-hover:scale-110'
              }`}
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto hover:bg-transparent group"
            onClick={() => !isLocked && setShowCommentInput(!showCommentInput)}
            disabled={isLocked}
          >
            <MessageCircle className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
          </Button>
        </div>

        {/* Likes Count */}
        <div className="text-sm font-semibold text-foreground">
          {likeCount} {likeCount === 1 ? 'like' : 'likes'}
        </div>

        {/* Caption */}
        {post.caption && (
          <div className="text-sm">
            <span className="font-semibold text-foreground">{post.userName}</span>{' '}
            <span className="text-foreground">{post.caption}</span>
          </div>
        )}

        {/* Workout Meta */}
        {post.meta.workoutType && (
          <div className="text-xs text-muted-foreground">
            {post.meta.workoutType}
            {post.meta.duration && ` • ${post.meta.duration} min`}
          </div>
        )}

        {/* Comments Preview */}
        {post.engagement.comments.length > 0 && (
          <div className="space-y-2">
            <button 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => !isLocked && onPostClick(post)}
              disabled={isLocked}
            >
              View all {post.engagement.comments.length} comments
            </button>
            {post.engagement.comments.slice(0, 2).map((comment) => (
              <div key={comment.id} className="text-sm">
                <span className="font-semibold text-foreground">{comment.userName}</span>{' '}
                <span className="text-foreground">{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Comment Input */}
        {showCommentInput && !isLocked && (
          <div className="flex items-center gap-2 pt-2 border-t border-border animate-fade-in">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <Button
              size="sm"
              onClick={handleCommentSubmit}
              disabled={!commentText.trim()}
              className="h-8 px-4"
            >
              Post
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
