import { cn } from "@/lib/utils";

interface FeedCardProps {
  userName: string;
  userAvatar: string;
  photoUrl: string;
  workoutType?: string;
  timestamp: string;
  streak?: number;
  className?: string;
}

export const FeedCard = ({ 
  userName, 
  userAvatar, 
  photoUrl, 
  workoutType,
  timestamp,
  streak,
  className 
}: FeedCardProps) => {
  return (
    <div className={cn("bg-card rounded-2xl shadow-card overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <img 
          src={userAvatar} 
          alt={userName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="font-semibold text-sm text-foreground">{userName}</p>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
        {streak && streak > 0 && (
          <div className="flex items-center gap-1 bg-success/10 text-success px-2.5 py-1 rounded-full">
            <span className="text-xs font-semibold">🔥 {streak}</span>
          </div>
        )}
      </div>

      {/* Photo */}
      <div className="aspect-square bg-muted">
        <img 
          src={photoUrl} 
          alt="Workout"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Footer */}
      {workoutType && (
        <div className="p-4">
          <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
            {workoutType}
          </span>
        </div>
      )}
    </div>
  );
};
