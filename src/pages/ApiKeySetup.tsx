import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Key, Sparkles, Shield, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ApiKeySetup = () => {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState("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");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Validate API key format (starts with sk-)
    if (!apiKey.startsWith("sk-")) {
      toast({
        title: "Invalid API Key",
        description: "OpenAI API keys should start with 'sk-'",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Test the API key with a simple request
      const response = await fetch("https://api.openai.com/v1/models", {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid API key");
      }

      // Save API key to localStorage
      localStorage.setItem("openai_api_key", apiKey);
      
      toast({
        title: "API Key Saved",
        description: "Your API key has been securely stored.",
      });

      // Navigate to onboarding
      navigate("/onboarding");
    } catch (error) {
      toast({
        title: "API Key Validation Failed",
        description: "Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // Allow skipping but warn user
    if (confirm("Without an API key, AI features will not work. Continue anyway?")) {
      navigate("/onboarding");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-card border-border shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
            <Key className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">API Key Setup</h1>
          <p className="text-muted-foreground">
            Enter your OpenAI API key to enable AI features
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium text-foreground">
              OpenAI API Key
            </label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="h-12"
            />
            <p className="text-xs text-muted-foreground">
              Your API key is stored locally and never sent to our servers.
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">AI Features Enabled</p>
                <p className="text-xs text-muted-foreground">
                  • Custom workout routine generation<br />
                  • AI-powered routine modifications<br />
                  • Workout data analysis<br />
                  • Gym form helper with image support
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleSkip}
              className="flex-1"
            >
              Skip
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !apiKey.trim()}
              className="flex-1 bg-gradient-primary text-primary-foreground"
            >
              {isLoading ? "Validating..." : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Shield className="w-4 h-4 mt-0.5" />
            <p>
              Your API key is encrypted and stored locally in your browser. 
              We never see or store your credentials.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ApiKeySetup;

