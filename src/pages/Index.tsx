import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hasApiKey } from "@/lib/openai";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Always check API key first
    if (!hasApiKey()) {
      navigate("/api-key-setup");
      return;
    }
    
    // Then check if onboarding is completed
    const onboardingCompleted = localStorage.getItem("onboarding_completed");
    
    if (!onboardingCompleted) {
      // New user - must complete onboarding first
      navigate("/onboarding");
    } else {
      // Onboarding completed - go to home (feed will be locked until they post)
      navigate("/home");
    }
  }, [navigate]);

  return null;
};

export default Index;
