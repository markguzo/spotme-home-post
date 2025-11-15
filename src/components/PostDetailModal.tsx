import { Heart, MessageCircle, Share2, X, Dumbbell, Star, Send } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Post, EmojiReaction } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

interface PostDetailModalProps {
  post: Post | null;
  open: boolean;
  onClose: () => void;
  currentUserId: string;
  onLike: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  currentUserName: string;
  currentUserAvatar: string;
}

const QUICK_EMOJIS = ['💪', '🔥', '👏', '💯', '⚡', '🎯'];

export const PostDetailModal = ({
  post,
  open,
  onClose,
  currentUserId,
  onLike,
  onAddComment,
  currentUserName,
  currentUserAvatar,
}: PostDetailModalProps) => {
  const [commentText, setCommentText] = useState('');
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);

  if (!post) return null;

  const isLiked = post.engagement.likedBy.includes(currentUserId);
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });
  const isUserPost = post.userId === currentUserId;

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onAddComment(post.id, commentText);
      setCommentText('');
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmojis(prev => 
      prev.includes(emoji) ? prev.filter(e => e !== emoji) : [...prev, emoji]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] p-0 gap-0 bg-background/95 backdrop-blur-xl border-border/50">
        <div className="flex h-full">
          {/* Left: Image */}
          <div className="flex-1 bg-black flex items-center justify-center relative">
            <img
              src={post.imageUri}
              alt={`${post.userName}'s workout`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Workout Badge Overlay */}
            {post.meta.workoutType && (
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-3 text-white">
                    <Dumbbell className="h-6 w-6" />
                    <div>
                      <div className="text-2xl font-bold">
                        {post.meta.workoutType}
                      </div>
                      {post.meta.duration && (
                        <div className="text-sm opacity-80">
                          {post.meta.duration} minutes
                        </div>
                      )}
                    </div>
                  </div>
                  {post.meta.pr && (
                    <div className="mt-3 text-amber-400 text-sm font-bold flex items-center gap-2">
                      <Star className="h-5 w-5 fill-current" />
                      <span>Personal Record!</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="w-[420px] flex flex-col bg-card/50 backdrop-blur-xl border-l border-border/50">
            {/* Header */}
            <div className="p-5 border-b border-border/30 bg-background/30 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/30 ring-2 ring-background">
                    <AvatarImage src={post.userAvatar} />
                    <AvatarFallback>{post.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base">
                        {isUserPost ? 'You' : post.userName}
                      </span>
                      {isUserPost && (
                        <Badge variant="secondary" className="text-xs">You</Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{timeAgo}</span>
                  </div>
                </div>
                {post.meta.pr && (
                  <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-2.5 shadow-xl">
                    <Star className="h-5 w-5 text-white fill-white" />
                  </div>
                )}
              </div>

              {/* Caption */}
              {post.caption && (
                <p className="text-foreground leading-relaxed">{post.caption}</p>
              )}
            </div>

            {/* Quick Emoji Reactions */}
            <div className="px-5 py-4 border-b border-border/30 bg-background/20">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-muted-foreground mr-2">Quick React:</span>
                {QUICK_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiClick(emoji)}
                    className={`text-2xl hover:scale-125 transition-transform duration-200 ${
                      selectedEmojis.includes(emoji) ? 'scale-125 animate-bounce' : ''
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="px-5 py-4 border-b border-border/30 bg-background/20">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => onLike(post.id)}
                  className="flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Heart
                    className={`h-6 w-6 transition-all duration-300 ${
                      isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-foreground'
                    }`}
                  />
                  <span className="font-semibold">{post.engagement.likes}</span>
                </button>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-foreground" />
                  <span className="font-semibold">{post.engagement.comments.length}</span>
                </div>
                <button className="flex items-center gap-2 hover:scale-105 transition-transform ml-auto">
                  <Share2 className="h-6 w-6 text-foreground" />
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {post.engagement.comments.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No comments yet</p>
                  <p className="text-sm">Be the first to comment!</p>
                </div>
              ) : (
                post.engagement.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 group">
                    <Avatar className="h-9 w-9 border border-border/50">
                      <AvatarImage src={comment.userAvatar} />
                      <AvatarFallback className="text-xs">{comment.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="bg-muted/50 rounded-2xl px-4 py-2.5 backdrop-blur-sm">
                        <div className="font-semibold text-sm mb-1">{comment.userName}</div>
                        <p className="text-sm leading-relaxed break-words">{comment.text}</p>
                      </div>
                      <span className="text-xs text-muted-foreground ml-4 mt-1 block">
                        {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment */}
            <div className="p-5 border-t border-border/30 bg-background/30 backdrop-blur-md">
              <div className="flex gap-3 items-start">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarImage src={currentUserAvatar} />
                  <AvatarFallback>{currentUserName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmitComment();
                      }
                    }}
                    placeholder="Add a comment..."
                    className="min-h-[44px] resize-none bg-background/50 border-border/50 rounded-2xl"
                  />
                  <Button
                    onClick={handleSubmitComment}
                    disabled={!commentText.trim()}
                    size="sm"
                    className="mt-2 rounded-full"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
