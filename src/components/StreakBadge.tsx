import { cn } from "@/lib/utils";

interface StreakBadgeProps {
  streak: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StreakBadge = ({ streak, size = "md", className }: StreakBadgeProps) => {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2"
  };

  if (streak === 0) return null;

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1.5 bg-success/10 text-success font-semibold rounded-full",
        sizeClasses[size],
        className
      )}
    >
      <span>🔥</span>
      <span>{streak} day streak</span>
    </div>
  );
};
