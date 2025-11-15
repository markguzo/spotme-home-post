import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const HealthSyncModal = () => {
  const navigate = useNavigate();

  const connectHealth = () => {
    toast({ title: "Connecting to Apple Health..." });
    setTimeout(() => {
      toast({ title: "Apple Health connected! ✅" });
      navigate(-1);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
      <div 
        className="w-full max-w-md bg-card rounded-3xl p-6 border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          {/* Icon */}
          <div className="text-center text-6xl">
            🍎
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Connect Apple Health</h2>
          </div>

          {/* Description */}
          <div className="bg-muted p-4 rounded-xl">
            <p className="text-muted-foreground text-sm leading-relaxed">
              SpotMe uses Apple Health to improve your AI recommendations. 
              We never store sensitive biometrics, only workout type, steps, and duration.
            </p>
          </div>

          {/* What We Access */}
          <div className="space-y-2">
            <p className="text-foreground font-semibold text-sm">What we access:</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-success">✓</span>
                <span>Workout types & duration</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-success">✓</span>
                <span>Daily step count</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-success">✓</span>
                <span>Active energy burned</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={connectHealth}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 text-base font-medium"
            >
              Connect Apple Health
            </Button>
            <Button
              onClick={() => navigate(-1)}
              className="w-full bg-transparent hover:bg-muted text-muted-foreground rounded-full h-12 text-base font-medium"
            >
              Not Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSyncModal;
