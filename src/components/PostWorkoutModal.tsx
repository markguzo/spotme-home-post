import { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { storage } from '@/lib/storage';
import { updateStreakAfterPost } from '@/lib/streak';
import { Post } from '@/types';
import { toast } from '@/hooks/use-toast';

interface PostWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostSuccess: (post: Post) => void;
}

const WORKOUT_TYPES = [
  'Chest',
  'Back',
  'Legs',
  'Cardio',
  'Arms',
  'Shoulders',
  'Full Body',
  'Other'
];

export const PostWorkoutModal = ({ isOpen, onClose, onPostSuccess }: PostWorkoutModalProps) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [workoutType, setWorkoutType] = useState<string>('');
  const [customWorkout, setCustomWorkout] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isPosting, setIsPosting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    // Validation
    if (!imageUri) {
      toast({
        title: "Photo required",
        description: "Please upload a workout photo",
        variant: "destructive"
      });
      return;
    }
    if (!workoutType) {
      toast({
        title: "Workout type required",
        description: "Please select a workout type",
        variant: "destructive"
      });
      return;
    }
    if (workoutType === 'Other' && !customWorkout.trim()) {
      toast({
        title: "Custom workout required",
        description: "Please enter a custom workout type",
        variant: "destructive"
      });
      return;
    }
    if (!duration || parseInt(duration) <= 0) {
      toast({
        title: "Duration required",
        description: "Please enter workout duration",
        variant: "destructive"
      });
      return;
    }

    setIsPosting(true);

    // Create post object
    const user = storage.getUser();
    if (!user) return;
    
    const finalWorkoutType = workoutType === 'Other' ? customWorkout : workoutType;
    
    const post: Post = {
      id: `p_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userAvatar: `https://picsum.photos/seed/${user.username}/200`,
      imageUri,
      timestamp: new Date().toISOString(),
      caption: description.trim() || undefined,
      meta: {
        pr: false,
        workoutType: finalWorkoutType,
        duration: parseInt(duration)
      },
      engagement: {
        likes: 0,
        likedBy: [],
        comments: [],
        photoReactions: [],
        emojiReactions: []
      }
    };

    // Save post
    storage.addPost(post);
    const newStreak = updateStreakAfterPost();

    // Emit event
    window.dispatchEvent(new CustomEvent('posted:today', {
      detail: { dateISO: post.timestamp.split('T')[0], postId: post.id }
    }));

    // Success feedback
    toast({
      title: "Workout posted! 🎉",
      description: `${newStreak} day streak 🔥`
    });

    // Reset form
    setImageUri(null);
    setWorkoutType('');
    setCustomWorkout('');
    setDuration('');
    setDescription('');
    setIsPosting(false);

    // Notify parent
    onPostSuccess(post);
    
    // Close modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Post Your Workout</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Photo Upload */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Workout Photo</Label>
            {!imageUri ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-12 cursor-pointer hover:border-primary transition-colors bg-muted/30">
                <Camera className="h-12 w-12 text-muted-foreground mb-3" />
                <span className="text-sm text-muted-foreground font-medium">
                  Click to upload photo
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src={imageUri} 
                  alt="Workout preview" 
                  className="w-full aspect-square object-cover"
                />
                <button
                  onClick={() => setImageUri(null)}
                  className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full p-2 hover:bg-black/90 transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
            )}
          </div>

          {/* Workout Type */}
          <div>
            <Label htmlFor="workout-type" className="text-base font-semibold mb-3 block">
              Workout Type
            </Label>
            <Select value={workoutType} onValueChange={setWorkoutType}>
              <SelectTrigger id="workout-type" className="h-12">
                <SelectValue placeholder="Select workout type" />
              </SelectTrigger>
              <SelectContent>
                {WORKOUT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Workout Input */}
          {workoutType === 'Other' && (
            <div>
              <Label htmlFor="custom-workout" className="text-base font-semibold mb-3 block">
                Custom Workout Type
              </Label>
              <Input
                id="custom-workout"
                placeholder="e.g., Swimming, Yoga, Boxing"
                value={customWorkout}
                onChange={(e) => setCustomWorkout(e.target.value)}
                className="h-12"
              />
            </div>
          )}

          {/* Duration */}
          <div>
            <Label htmlFor="duration" className="text-base font-semibold mb-3 block">
              Duration (minutes)
            </Label>
            <Input
              id="duration"
              type="number"
              placeholder="e.g., 60"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="1"
              className="h-12"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-base font-semibold mb-3 block">
              Description (optional)
            </Label>
            <Textarea
              id="description"
              placeholder="How was your workout? Any PRs? 💪"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] resize-none"
              maxLength={200}
            />
            <div className="text-xs text-muted-foreground mt-1 text-right">
              {description.length}/200
            </div>
          </div>
        </div>

        {/* Post Button */}
        <Button
          onClick={handlePost}
          disabled={isPosting}
          size="lg"
          className="w-full h-14 text-lg font-bold"
        >
          {isPosting ? 'Posting...' : 'Post Workout 🔥'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
