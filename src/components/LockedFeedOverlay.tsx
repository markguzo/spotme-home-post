import { Camera, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

interface LockedFeedOverlayProps {
  friendCount: number;
}

export const LockedFeedOverlay = ({ friendCount }: LockedFeedOverlayProps) => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="bg-black/70 backdrop-blur-md rounded-2xl p-8 max-w-md mx-4 text-center border border-white/10">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
            <Lock className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">
          Your crew is crushing it... 👀
        </h2>
        
        <p className="text-white/70 mb-2">
          {friendCount} of your crew showed up today
        </p>
        
        <p className="text-sm text-white/50 mb-6">
          Post your session to see what they're really doing
        </p>

        <Button
          onClick={() => navigate('/post')}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 transition-opacity shadow-2xl"
        >
          <Camera className="mr-2 h-5 w-5" />
          Post Your Session
        </Button>

        <p className="text-xs text-white/40 mt-4">
          Don't let them show you up 💪
        </p>
      </div>
    </div>
  );
};
