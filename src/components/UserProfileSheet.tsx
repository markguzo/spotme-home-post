import { useState } from "react";
import { X, Trophy, Calendar } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Friend, todaysWorkouts, badges } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";

interface UserProfileSheetProps {
  user: Friend | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserProfileSheet = ({ user, open, onOpenChange }: UserProfileSheetProps) => {
  if (!user) return null;

  const completionPercentage = (user.weeklyWorkouts / user.gymGoalPerWeek) * 100;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] bg-[#0A0B14] border-t border-[#1E3A8A]/30 overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white text-2xl">{user.name}'s Profile</SheetTitle>
            <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </SheetHeader>

        {/* Completion Circle */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#1E3A8A"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - completionPercentage / 100)}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{Math.round(completionPercentage)}%</span>
              <span className="text-xs text-gray-400">Complete</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            {user.weeklyWorkouts} of {user.gymGoalPerWeek} workouts this week
          </p>
        </div>

        {/* Today's Workouts */}
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#3B82F6]" />
            Today's Workout
          </h3>
          <div className="bg-[#131629] border border-[#1E3A8A]/30 rounded-xl p-4 space-y-3">
            {todaysWorkouts.map((workout, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{workout.exercise}</p>
                  <p className="text-gray-400 text-sm">
                    {workout.sets} × {workout.reps} @ {workout.weight}lb
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#3B82F6]" />
            Badges
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {badges.slice(0, 4).map((badge) => {
              const progressPercentage = badge.progress
                ? (badge.progress / badge.requirement.count) * 100
                : 0;
              
              return (
                <div
                  key={badge.id}
                  className={`bg-[#131629] border border-[#1E3A8A]/30 rounded-xl p-4 text-center ${
                    badge.unlocked ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <p className="text-white text-sm font-medium mb-1">{badge.name}</p>
                  {!badge.unlocked && badge.progress !== undefined && (
                    <div className="space-y-1">
                      <Progress value={progressPercentage} className="h-1" />
                      <p className="text-xs text-gray-400">
                        {badge.progress}/{badge.requirement.count}
                      </p>
                    </div>
                  )}
                  {badge.unlocked && (
                    <p className="text-xs text-[#3B82F6]">Unlocked</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Photos */}
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3">Recent Photos</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-[#131629] border border-[#1E3A8A]/30 rounded-lg" />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
