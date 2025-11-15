import { useNavigate, useParams } from "react-router-dom";
import { X, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PhotoViewer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const sharePhoto = () => {
    toast({ title: "Photo shared! 📸" });
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-background/80 to-transparent p-4 flex items-center justify-between z-10">
        <button onClick={() => navigate(-1)} className="text-foreground">
          <X size={28} />
        </button>
        <button onClick={sharePhoto} className="text-foreground">
          <Share2 size={24} />
        </button>
      </div>

      {/* Full-Screen Image */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src="/placeholder.svg"
          alt="Workout"
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Bottom Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="px-3 py-1 bg-primary/30 backdrop-blur-sm rounded-full text-sm text-foreground border border-primary/50">
              🏃 Outdoor Run
            </span>
            <p className="text-muted-foreground text-sm mt-2">2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoViewer;
