import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, RotateCcw } from 'lucide-react';
import { TopBar } from '@/components/TopBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { storage } from '@/lib/storage';
import { getCurrentTimestamp, formatTodayHeader } from '@/lib/date-utils';
import { updateStreakAfterPost } from '@/lib/streak';
import { toast } from 'sonner';
import { Post } from '@/types';

const PostPhoto = () => {
  const navigate = useNavigate();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [timestamp] = useState(getCurrentTimestamp());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image too large', {
          description: 'Please select an image smaller than 10MB',
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!imageUri) return;

    const user = storage.getUser();
    if (!user) return;

    const post: Post = {
      id: `p_${Date.now()}`,
      userId: user.id,
      imageUri,
      timestamp,
      meta: {
        pr: false,
      },
    };

    storage.addPost(post);
    const newStreak = updateStreakAfterPost();

    // Emit event for other components
    window.dispatchEvent(new CustomEvent('posted:today', {
      detail: { dateISO: timestamp.split('T')[0], postId: post.id },
    }));

    toast.success('Saved! Streak +1', {
      description: `${newStreak} day streak 🔥`,
    });

    navigate('/');
  };

  const handleRetake = () => {
    setImageUri(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar title="Post Photo" showBack />

      <div className="max-w-2xl mx-auto p-4 space-y-5">
        <Card className="p-6 bg-card border-border shadow-sm">
          {!imageUri ? (
            <div className="space-y-4">
              <div
                className="aspect-square border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground mb-1">
                    Upload your gym photo
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tap to select from gallery or camera
                  </p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img
                  src={imageUri}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  {formatTodayHeader()}
                </div>
              </div>
            </div>
          )}
        </Card>

        {imageUri && (
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              className="flex-1 rounded-xl border-2"
              onClick={handleRetake}
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Retake
            </Button>
            <Button
              size="lg"
              className="flex-1 rounded-xl"
              onClick={handleSave}
            >
              <Upload className="mr-2 h-5 w-5" />
              Save Post
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPhoto;
