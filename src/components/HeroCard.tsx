import { Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useNavigate } from 'react-router-dom';

interface HeroCardProps {
  hasPosted: boolean;
}

export const HeroCard = ({ hasPosted }: HeroCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-6 bg-card border-border shadow-sm">
      <div className="text-center space-y-4">
        {!hasPosted ? (
          <>
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                You haven't posted yet
              </h2>
              <p className="text-muted-foreground">
                Share your gym session to unlock your crew's feed
              </p>
            </div>
            <Button
              onClick={() => navigate('/post')}
              size="lg"
              className="w-full rounded-xl"
            >
              <Camera className="mr-2 h-5 w-5" />
              Post Gym Photo
            </Button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center">
              <span className="text-3xl">💪</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Nice work!
              </h2>
              <p className="text-muted-foreground">
                You've checked in today
              </p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="w-full rounded-xl border-2"
              onClick={() => navigate('/progress')}
            >
              View Progress
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};
