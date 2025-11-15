import { Lock, Camera } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';

interface UnlockPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostClick: () => void;
  friendCount: number;
}

export const UnlockPromptModal = ({ 
  isOpen, 
  onClose, 
  onPostClick,
  friendCount 
}: UnlockPromptModalProps) => {
  const handlePostClick = () => {
    onClose();
    onPostClick();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark mb-4 shadow-xl">
            <Lock className="h-10 w-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-extrabold mb-2">
            Post to Unlock the Feed 👀
          </h2>
          
          <p className="text-muted-foreground text-base mb-1">
            {friendCount} friends posted today
          </p>
          
          <p className="text-sm text-muted-foreground mb-6">
            Share your workout to see everyone's posts
          </p>

          <Button
            onClick={handlePostClick}
            size="lg"
            className="w-full h-14 text-lg font-bold"
          >
            <Camera className="mr-2 h-5 w-5" />
            📸 Post Your Workout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
