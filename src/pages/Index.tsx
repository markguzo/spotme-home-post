import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hasApiKey } from "@/lib/openai";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if API key is set, if not go to API key setup
    if (!hasApiKey()) {
      navigate("/api-key-setup");
    } else {
      navigate("/onboarding");
    }
  }, [navigate]);

  return null;
};

export default Index;
