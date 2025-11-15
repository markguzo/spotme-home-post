import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Bot, Loader2 } from "lucide-react";
import { getGymHelperResponse } from "@/lib/aiService";
import { hasApiKey } from "@/lib/openai";
import { toast } from "@/hooks/use-toast";

const FormAnalysis = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToBase64 = (dataUrl: string): string => {
    return dataUrl.split(",")[1] || "";
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !preview) return;
    if (!hasApiKey()) {
      toast({
        title: "API Key Required",
        description: "Please set up your OpenAI API key first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const base64 = convertToBase64(preview);
      const response = await getGymHelperResponse(
        "Analyze my exercise form in this image/video. Provide detailed feedback on technique, posture, and any corrections needed.",
        base64
      );
      setAnalysis(response);
    } catch (error: any) {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze form.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 flex items-center gap-3 border-b border-border">
        <button onClick={() => navigate("/home")} className="text-foreground">
          <ArrowLeft size={24} />
        </button>
        <Bot className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-bold">Form Analysis</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-2">Upload Exercise Video/Photo</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Get AI-powered feedback on your exercise form and technique
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {!preview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-2xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-foreground font-medium mb-2">Tap to upload</p>
              <p className="text-sm text-muted-foreground">
                Photo or video of your exercise form
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                {selectedFile?.type.startsWith("video") ? (
                  <video
                    src={preview}
                    controls
                    className="w-full rounded-2xl max-h-96 object-cover"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Exercise form"
                    className="w-full rounded-2xl max-h-96 object-cover"
                  />
                )}
                <button
                  onClick={() => {
                    setPreview(null);
                    setSelectedFile(null);
                    setAnalysis(null);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                >
                  ×
                </button>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-gradient-primary text-primary-foreground"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4 mr-2" />
                    Analyze Form
                  </>
                )}
              </Button>
            </div>
          )}
        </Card>

        {analysis && (
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              AI Analysis
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap text-muted-foreground">{analysis}</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FormAnalysis;

