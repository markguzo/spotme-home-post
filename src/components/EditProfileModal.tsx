import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPhoto: string;
  currentName: string;
  currentUsername: string;
  currentGoal: number;
}

export const EditProfileModal = ({
  open,
  onOpenChange,
  currentPhoto,
  currentName,
  currentUsername,
  currentGoal,
}: EditProfileModalProps) => {
  const [name, setName] = useState(currentName);
  const [username, setUsername] = useState(currentUsername);
  const [bio, setBio] = useState("");
  const [goal, setGoal] = useState(currentGoal);
  const [photoPreview, setPhotoPreview] = useState(currentPhoto);
  const { toast } = useToast();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#131629] border-[#1E3A8A]/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Photo Upload */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={photoPreview}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover ring-2 ring-[#3B82F6]"
              />
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 p-2 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] rounded-full cursor-pointer hover:opacity-90 transition-all"
              >
                <Camera className="w-4 h-4 text-white" />
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
            <p className="text-sm text-gray-400">Upload a new profile picture</p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#0A0B14] border-[#1E3A8A]/30 text-white"
            />
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-300">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#0A0B14] border-[#1E3A8A]/30 text-white"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-gray-300">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about your fitness journey..."
              className="bg-[#0A0B14] border-[#1E3A8A]/30 text-white resize-none"
              rows={3}
            />
          </div>

          {/* Weekly Goal */}
          <div className="space-y-2">
            <Label htmlFor="goal" className="text-gray-300">
              Weekly Workout Goal
            </Label>
            <Input
              id="goal"
              type="number"
              value={goal}
              onChange={(e) => setGoal(parseInt(e.target.value))}
              className="bg-[#0A0B14] border-[#1E3A8A]/30 text-white"
              min={1}
              max={7}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 bg-[#0A0B14] border-[#1E3A8A]/30 text-gray-300 hover:bg-[#131629]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white hover:opacity-90"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
