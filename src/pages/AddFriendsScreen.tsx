import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { potentialFriends } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const AddFriendsScreen = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate("/leaderboard");
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [addedFriends, setAddedFriends] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const filteredFriends = potentialFriends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFriend = (friendId: string, friendName: string) => {
    setAddedFriends((prev) => new Set(prev).add(friendId));
    toast({
      title: "Friend Added!",
      description: `${friendName} has been added to your crew.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0B14] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A0B14] via-[#1E3A8A]/20 to-[#0A0B14] border-b border-[#1E3A8A]/30">
        <div className="px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/leaderboard")}
              className="p-2 hover:bg-[#131629] rounded-lg transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Add Friends</h1>
              <p className="text-sm text-gray-400">Grow your fitness crew</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name or username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#131629] border-[#1E3A8A]/30 text-white"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <Tabs defaultValue="suggested" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-[#131629]">
            <TabsTrigger
              value="suggested"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1E3A8A] data-[state=active]:to-[#3B82F6]"
            >
              Suggested
            </TabsTrigger>
            <TabsTrigger
              value="mutual"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1E3A8A] data-[state=active]:to-[#3B82F6]"
            >
              Mutual
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1E3A8A] data-[state=active]:to-[#3B82F6]"
            >
              All
            </TabsTrigger>
          </TabsList>

          <TabsContent value="suggested" className="space-y-3">
            {filteredFriends
              .sort((a, b) => b.mutualFriends - a.mutualFriends)
              .map((friend) => (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  isAdded={addedFriends.has(friend.id)}
                  onAdd={() => handleAddFriend(friend.id, friend.name)}
                />
              ))}
          </TabsContent>

          <TabsContent value="mutual" className="space-y-3">
            {filteredFriends
              .filter((f) => f.mutualFriends > 0)
              .sort((a, b) => b.mutualFriends - a.mutualFriends)
              .map((friend) => (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  isAdded={addedFriends.has(friend.id)}
                  onAdd={() => handleAddFriend(friend.id, friend.name)}
                />
              ))}
          </TabsContent>

          <TabsContent value="all" className="space-y-3">
            {filteredFriends.map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                isAdded={addedFriends.has(friend.id)}
                onAdd={() => handleAddFriend(friend.id, friend.name)}
              />
            ))}
          </TabsContent>
        </Tabs>

        {/* Import Contacts Button */}
        <div className="mt-6">
          <Button
            className="w-full bg-[#131629] border border-[#1E3A8A]/30 text-white hover:bg-[#1a1d35]"
            variant="outline"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Import from Contacts
          </Button>
        </div>
      </div>
    </div>
  );
};

interface FriendCardProps {
  friend: {
    id: string;
    name: string;
    username: string;
    photo: string;
    mutualFriends: number;
  };
  isAdded: boolean;
  onAdd: () => void;
}

const FriendCard = ({ friend, isAdded, onAdd }: FriendCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#131629] border border-[#1E3A8A]/30 rounded-lg hover:border-[#3B82F6]/50 transition-all">
      <div className="flex items-center gap-3">
        <img
          src={friend.photo}
          alt={friend.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-[#3B82F6]/50"
        />
        <div>
          <h3 className="font-semibold text-white">{friend.name}</h3>
          <p className="text-sm text-gray-400">@{friend.username}</p>
          {friend.mutualFriends > 0 && (
            <p className="text-xs text-[#3B82F6] mt-1">
              {friend.mutualFriends} mutual {friend.mutualFriends === 1 ? "friend" : "friends"}
            </p>
          )}
        </div>
      </div>

      <Button
        onClick={onAdd}
        disabled={isAdded}
        className={`${
          isAdded
            ? "bg-green-500/20 text-green-400 border border-green-400/50"
            : "bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white hover:opacity-90"
        }`}
        size="sm"
      >
        {isAdded ? "Added" : "Add"}
      </Button>
    </div>
  );
};

export default AddFriendsScreen;
