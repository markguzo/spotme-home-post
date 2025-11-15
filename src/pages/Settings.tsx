import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const Settings = () => {
  const navigate = useNavigate();
  const [blurFace, setBlurFace] = useState(false);
  const [hideLocation, setHideLocation] = useState(false);
  const [privateGallery, setPrivateGallery] = useState(false);
  const [gymReminders, setGymReminders] = useState(true);
  const [aiNudges, setAiNudges] = useState(true);
  const [postAlerts, setPostAlerts] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate(-1)} className="text-foreground">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="divide-y divide-border">
        {/* Account Section */}
        <div className="p-6 space-y-4">
          <h2 className="text-foreground font-semibold text-lg">Account</h2>
          <button className="w-full flex items-center justify-between p-4 bg-card rounded-xl hover:bg-muted">
            <span className="text-foreground">Edit Profile</span>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-card rounded-xl hover:bg-muted">
            <span className="text-foreground">Change Weekly Goal</span>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Privacy Section */}
        <div className="p-6 space-y-4">
          <h2 className="text-foreground font-semibold text-lg">Privacy</h2>
          
          <div className="flex items-center justify-between p-4 bg-card rounded-xl">
            <div>
              <p className="text-foreground">Blur My Face Automatically</p>
              <p className="text-muted-foreground text-sm mt-1">AI will blur faces in photos</p>
            </div>
            <Switch checked={blurFace} onCheckedChange={setBlurFace} />
          </div>

          <div className="flex items-center justify-between p-4 bg-card rounded-xl">
            <div>
              <p className="text-foreground">Hide Location on Posts</p>
              <p className="text-muted-foreground text-sm mt-1">Don't show gym location</p>
            </div>
            <Switch checked={hideLocation} onCheckedChange={setHideLocation} />
          </div>

          <div className="flex items-center justify-between p-4 bg-card rounded-xl">
            <div>
              <p className="text-foreground">Keep Gallery Private</p>
              <p className="text-muted-foreground text-sm mt-1">Only you can see your posts</p>
            </div>
            <Switch checked={privateGallery} onCheckedChange={setPrivateGallery} />
          </div>
        </div>

        {/* Health Sync Section */}
        <div className="p-6 space-y-4">
          <h2 className="text-foreground font-semibold text-lg">Health Sync</h2>
          <button 
            onClick={() => navigate('/health-sync-modal')}
            className="w-full flex items-center justify-between p-4 bg-card rounded-xl hover:bg-muted"
          >
            <div>
              <p className="text-foreground">Apple Health Connect</p>
              <p className="text-muted-foreground text-sm mt-1">Not connected</p>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Notifications Section */}
        <div className="p-6 space-y-4">
          <h2 className="text-foreground font-semibold text-lg">Notifications</h2>
          
          <div className="flex items-center justify-between p-4 bg-card rounded-xl">
            <span className="text-foreground">Gym-day Reminders</span>
            <Switch checked={gymReminders} onCheckedChange={setGymReminders} />
          </div>

          <div className="flex items-center justify-between p-4 bg-card rounded-xl">
            <span className="text-foreground">AI Nudges</span>
            <Switch checked={aiNudges} onCheckedChange={setAiNudges} />
          </div>

          <div className="flex items-center justify-between p-4 bg-card rounded-xl">
            <span className="text-foreground">Post Window Alerts</span>
            <Switch checked={postAlerts} onCheckedChange={setPostAlerts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
