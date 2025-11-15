import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { PrimaryButton } from "@/components/PrimaryButton";

const OnboardingDetails = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const validateUsername = (value: string) => {
    if (value.includes(" ")) {
      setUsernameError("Usernames can't contain spaces.");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (value.trim().length > 0) {
      validateUsername(value);
    } else {
      setUsernameError("");
    }
  };

  const isValid = name.trim().length > 0 && username.trim().length > 0 && !usernameError;

  const handleContinue = () => {
    if (isValid) {
      localStorage.setItem("spotme_name", name);
      localStorage.setItem("spotme_username", username);
      navigate("/onboarding/goal");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-5 pb-8 pt-10">
      <Header 
        align="left"
        title="Let's set you up" 
        subtitle="Drop your @ so your crew knows it's you."
        onBack={() => navigate("/onboarding")}
      />

      <div className="flex-1 flex flex-col justify-center gap-6">
        <h2 className="text-2xl font-bold text-white">Who's lifting?</h2>

        <div className="bg-[#111111] rounded-2xl shadow-sm border border-white/10 p-5 space-y-4">
          {/* Name Field */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Moises"
              className="mt-1 w-full rounded-xl border border-white/15 bg-[#050505] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5D5FEC] focus:border-transparent"
            />
          </div>

          {/* Username Field */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="mo_lifts"
              className="mt-1 w-full rounded-xl border border-white/15 bg-[#050505] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5D5FEC] focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">
              No spaces, no weird symbols. Think @handle, but for the gym.
            </p>
            {usernameError && (
              <p className="text-xs text-red-500 mt-1">{usernameError}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <PrimaryButton disabled={!isValid} onClick={handleContinue}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
};

export default OnboardingDetails;
