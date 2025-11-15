import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { PrimaryButton } from "@/components/PrimaryButton";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/connect");
  };

  const isValid = username.trim().length > 0 && password.trim().length > 0;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-5 pb-8 pt-10">
      <Header 
        align="left"
        title="Welcome back" 
        subtitle="Log in to keep your receipts."
        onBack={() => navigate("/onboarding")}
      />

      <div className="flex-1 flex flex-col justify-center gap-6">
        <div className="bg-[#111111] rounded-2xl shadow-sm border border-white/10 p-5 space-y-4">
          {/* Username/Email Field */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Username or Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="mo_lifts"
              className="mt-1 w-full rounded-xl border border-white/15 bg-[#050505] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5D5FEC] focus:border-transparent"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border border-white/15 bg-[#050505] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5D5FEC] focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">
              Forgot your password?
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <PrimaryButton disabled={!isValid} onClick={handleLogin}>
          Log in & keep my streak
        </PrimaryButton>
        <button
          onClick={() => navigate("/onboarding")}
          className="w-full text-sm text-gray-400 hover:text-white transition text-center"
        >
          New here? Start your streak
        </button>
      </div>
    </div>
  );
};

export default Login;
