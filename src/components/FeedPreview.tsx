import { Lock } from 'lucide-react';
import { Card } from './ui/card';
import { Friend } from '@/types';

interface FeedPreviewProps {
  hasPosted: boolean;
  friends: Friend[];
}

export const FeedPreview = ({ hasPosted, friends }: FeedPreviewProps) => {
  if (!hasPosted) {
    return (
      <Card className="p-6 bg-card border-border shadow-sm">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">
              Post to unlock your crew
            </h3>
            <p className="text-sm text-muted-foreground">
              See what your friends are up to after you post
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-foreground px-1">Your Crew Today</h3>
      <div className="grid grid-cols-3 gap-3">
        {friends.map((friend) => (
          <Card
            key={friend.id}
            className="relative aspect-square overflow-hidden bg-card border-border shadow-sm"
          >
            <img
              src={friend.image}
              alt={friend.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white">
                  {friend.name}
                </span>
                {friend.pr && (
                  <span className="text-xs bg-success text-success-foreground px-1.5 py-0.5 rounded">
                    PR
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
