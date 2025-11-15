import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hasApiKey } from "@/lib/openai";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboarding_completed");
    
    if (!hasApiKey()) {
      navigate("/api-key-setup");
    } else if (!onboardingCompleted) {
      navigate("/onboarding");
    } else {
      navigate("/home");
    }
  }, [navigate]);

  return null;
};

export default Index;
