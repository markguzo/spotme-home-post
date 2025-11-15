import { UserPlus } from "lucide-react";
import { potentialFriends } from "@/data/mockData";
import { PrimaryButton } from "./PrimaryButton";

interface AddFriendsFlowProps {
  onComplete: () => void;
}

export const AddFriendsFlow = ({ onComplete }: AddFriendsFlowProps) => {
  return (
    <div className="min-h-screen bg-[#0A0B14] pb-20">
      <div className="max-w-2xl mx-auto px-5 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Find Your Crew</h1>
          <p className="text-gray-400">Add friends to compete and stay motivated</p>
        </div>

        <div className="space-y-3 mb-6">
          {potentialFriends.map((friend) => (
            <div
              key={friend.id}
              className="bg-[#131629] border border-[#1E3A8A]/30 rounded-xl p-4 flex items-center justify-between hover:border-[#3B82F6]/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <img
                  src={friend.photo}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#1E3A8A]"
                />
                <div>
                  <p className="font-semibold text-white">{friend.name}</p>
                  <p className="text-sm text-gray-400">@{friend.username}</p>
                  <p className="text-xs text-[#3B82F6]">{friend.mutualFriends} mutual friends</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all">
                Add
              </button>
            </div>
          ))}
        </div>

        <PrimaryButton onClick={onComplete}>Continue to Leaderboard</PrimaryButton>
      </div>
    </div>
  );
};
