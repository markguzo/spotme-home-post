import { Camera, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

interface LockedFeedOverlayProps {
  friendCount: number;
}

export const LockedFeedOverlay = ({ friendCount }: LockedFeedOverlayProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-sm">
      <div className="bg-black/95 backdrop-blur-2xl rounded-3xl p-12 max-w-xl mx-4 text-center border-2 border-primary/40 shadow-2xl">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark mb-4 shadow-lg">
            <Lock className="h-10 w-10 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-white mb-3 leading-tight">
          Your crew is working out right now 👀
        </h2>
        
        <p className="text-white/90 text-lg mb-2 font-semibold">
          {friendCount} friends crushed their sessions today
        </p>
        
        <p className="text-base text-white/60 mb-8">
          Post your workout to see what they're doing
        </p>

        <Button
          onClick={() => navigate('/post')}
          size="lg"
          className="w-full h-16 text-xl font-bold bg-gradient-to-r from-primary via-primary to-primary-dark hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl animate-pulse"
        >
          <Camera className="mr-3 h-6 w-6" />
          📸 Post Your Workout
        </Button>

        <p className="text-sm text-white/50 mt-5 font-medium">
          Don't miss out on the action 💪
        </p>
      </div>
    </div>
  );
};
