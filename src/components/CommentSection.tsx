import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Send } from 'lucide-react';
import { Comment } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onAddComment: (postId: string, text: string) => void;
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar: string;
}

export const CommentSection = ({
  postId,
  comments,
  onAddComment,
  currentUserId,
  currentUserName,
  currentUserAvatar
}: CommentSectionProps) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim()) {
      onAddComment(postId, commentText.trim());
      setCommentText('');
    }
  };

  return (
    <div className="px-5 pb-4 border-t border-border pt-4">
      {/* Existing Comments */}
      {comments.length > 0 && (
        <div className="space-y-3 mb-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={comment.userAvatar} />
                <AvatarFallback>{comment.userName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-sm">{comment.userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 mt-0.5">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Comment Input */}
      <div className="flex gap-2">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={currentUserAvatar} />
          <AvatarFallback>{currentUserName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex gap-2">
          <Textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="min-h-[40px] max-h-[120px] resize-none"
          />
          <Button 
            size="icon" 
            onClick={handleSubmit}
            disabled={!commentText.trim()}
            className="flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
