import { Lock } from "lucide-react";
import { Badge } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";

interface BadgeCardProps {
  badge: Badge;
  onClick: () => void;
}

export const BadgeCard = ({ badge, onClick }: BadgeCardProps) => {
  const progressPercentage = badge.progress
    ? (badge.progress / badge.requirement.count) * 100
    : 0;

  return (
    <button
      onClick={badge.unlocked ? onClick : undefined}
      disabled={!badge.unlocked}
      className={`group relative p-4 bg-[#131629] border border-[#1E3A8A]/30 rounded-xl transition-all ${
        badge.unlocked
          ? "hover:border-[#3B82F6]/50 hover:bg-[#1a1d35] active:scale-95 cursor-pointer"
          : "opacity-60 cursor-not-allowed"
      }`}
    >
      {/* Badge Icon */}
      <div className="flex items-center justify-center mb-3">
        <div
          className={`relative w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
            badge.unlocked
              ? "bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]"
              : "bg-[#0A0B14] opacity-50"
          }`}
        >
          {badge.unlocked ? (
            badge.icon
          ) : (
            <Lock className="w-6 h-6 text-gray-500" />
          )}
        </div>
      </div>

      {/* Badge Info */}
      <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1">
        {badge.name}
      </h3>
      <p className="text-xs text-gray-400 mb-3 line-clamp-2 h-8">
        {badge.description}
      </p>

      {/* Progress Bar */}
      {!badge.unlocked && badge.progress !== undefined && (
        <div className="space-y-1">
          <Progress value={progressPercentage} className="h-1.5" />
          <p className="text-xs text-gray-500 text-center">
            {badge.progress}/{badge.requirement.count}
          </p>
        </div>
      )}

      {/* Unlocked Badge */}
      {badge.unlocked && (
        <div className="flex items-center justify-center">
          <span className="text-xs text-green-400 font-medium">Unlocked</span>
        </div>
      )}

      {/* Category Tag */}
      <div className="absolute top-2 right-2">
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            badge.category === "consistency"
              ? "bg-orange-500/20 text-orange-400"
              : badge.category === "social"
              ? "bg-blue-500/20 text-blue-400"
              : "bg-purple-500/20 text-purple-400"
          }`}
        >
          {badge.category}
        </span>
      </div>
    </button>
  );
};
