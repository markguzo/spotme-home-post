import { Camera, Lock } from 'lucide-react';
import { Button } from './ui/button';

interface LockedFeedOverlayProps {
  friendCount: number;
  onPostClick: () => void;
}

export const LockedFeedOverlay = ({ friendCount, onPostClick }: LockedFeedOverlayProps) => {
  return (
    <>
      {/* Subtle vignette overlay - doesn't block interaction */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none z-40" />
      
      {/* Floating CTA Card */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md md:bottom-auto md:top-1/2 md:-translate-y-1/2">
        <div className="bg-black/95 backdrop-blur-2xl rounded-3xl p-8 text-center border-2 border-primary/40 shadow-2xl">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark mb-3 shadow-lg">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-extrabold text-white mb-2 leading-tight">
            Post your workout to unlock the feed 👀
          </h2>
          
          <p className="text-white/80 text-base mb-1 font-semibold">
            {friendCount} friends posted today
          </p>
          
          <p className="text-sm text-white/50 mb-6">
            Scroll to see previews, post to see details
          </p>

          <Button
            onClick={onPostClick}
            size="lg"
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary via-primary to-primary-dark hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <Camera className="mr-2 h-5 w-5" />
            📸 Post Your Workout
          </Button>

          <p className="text-xs text-white/40 mt-4 font-medium">
            Swipe to preview • Post to unlock 💪
          </p>
        </div>
      </div>
    </>
  );
};
