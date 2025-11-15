import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Onboarding & Auth (from repo 1)
import Index from "./pages/Index";
import ApiKeySetup from "./pages/ApiKeySetup";
import OnboardingWelcome from "./pages/OnboardingWelcome";
import OnboardingDetails from "./pages/OnboardingDetails";
import OnboardingGoal from "./pages/OnboardingGoal";
import Login from "./pages/Login";
import Connect from "./pages/Connect";
import Today from "./pages/Today";

// Current project pages
import TodayHome from "./pages/TodayHome";
import PostPhoto from "./pages/PostPhoto";
import Home from "./pages/Home";

// Feed & Social (from repo 3)
import Feed from "./pages/Feed";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import AddFriendsScreen from "./pages/AddFriendsScreen";
import BadgeUnlockScreen from "./pages/BadgeUnlockScreen";
import MyRoutines from "./pages/MyRoutines";
import AIRoutineGenerator from "./pages/AIRoutineGenerator";
import AIGymHelper from "./pages/AIGymHelper";
import AppleWatchConnect from "./pages/AppleWatchConnect";

// Profile Hub (from repo 2)
import ProfileHub from "./pages/ProfileHub";

// New Profile Hub Pages
import WorkoutLibrary from "./pages/WorkoutLibrary";
import AIInsightModal from "./pages/AIInsightModal";
import RoutineDetail from "./pages/RoutineDetail";
import CreateRoutine from "./pages/CreateRoutine";
import WorkoutSession from "./pages/WorkoutSession";
import WorkoutComplete from "./pages/WorkoutComplete";
import BadgeCollection from "./pages/BadgeCollection";
import BadgeDetail from "./pages/BadgeDetail";
import FilteredFeed from "./pages/FilteredFeed";
import PhotoViewer from "./pages/PhotoViewer";
import WeeklyWrapUp from "./pages/WeeklyWrapUp";
import Settings from "./pages/Settings";
import HealthSyncModal from "./pages/HealthSyncModal";
import InviteFriends from "./pages/InviteFriends";
import FormAnalysis from "./pages/FormAnalysis";

import NotFound from "./pages/NotFound";
import { FloatingHomeButton } from "./components/FloatingHomeButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="phone-container">
          <FloatingHomeButton />
          <Routes>
          {/* Landing/Index - redirects to API key setup or onboarding */}
          <Route path="/" element={<Index />} />
          
          {/* API Key Setup */}
          <Route path="/api-key-setup" element={<ApiKeySetup />} />
          
          {/* Onboarding Flow (from repo 1) */}
          <Route path="/onboarding" element={<OnboardingWelcome />} />
          <Route path="/onboarding/details" element={<OnboardingDetails />} />
          <Route path="/onboarding/goal" element={<OnboardingGoal />} />
          
          {/* Auth (from repo 1) */}
          <Route path="/login" element={<Login />} />
          <Route path="/connect" element={<Connect />} />
          
          {/* Main Home Screen - Unified Feed + Profile + Leaderboard */}
          <Route path="/home" element={<Home />} />
          
          {/* Today/Home Pages */}
          <Route path="/today" element={<Today />} />
          <Route path="/today-home" element={<TodayHome />} />
          
          {/* Post Photo */}
          <Route path="/post" element={<PostPhoto />} />
          <Route path="/progress" element={<TodayHome />} />
          
          {/* Feed & Social (from repo 3) */}
          <Route path="/feed" element={<Feed />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/leaderboard/add-friends" element={<AddFriendsScreen />} />
          <Route path="/leaderboard/badge/:badgeId" element={<BadgeUnlockScreen />} />
          <Route path="/my-routines" element={<MyRoutines />} />
          <Route path="/ai-routine-generator" element={<AIRoutineGenerator />} />
          <Route path="/ai-gym-helper" element={<AIGymHelper />} />
          <Route path="/apple-watch" element={<AppleWatchConnect />} />
          <Route path="/form-analysis" element={<FormAnalysis />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Profile Hub (from repo 2) */}
          <Route path="/profile-hub" element={<ProfileHub />} />
          
          {/* New Profile Hub Pages */}
          <Route path="/library" element={<WorkoutLibrary />} />
          <Route path="/ai-insight" element={<AIInsightModal />} />
          <Route path="/routine/:id" element={<RoutineDetail />} />
          <Route path="/create-routine" element={<CreateRoutine />} />
          <Route path="/workout-session" element={<WorkoutSession />} />
          <Route path="/workout-complete" element={<WorkoutComplete />} />
          <Route path="/badges" element={<BadgeCollection />} />
          <Route path="/badge/:id" element={<BadgeDetail />} />
          <Route path="/feed/:tag" element={<FilteredFeed />} />
          <Route path="/photo/:id" element={<PhotoViewer />} />
          <Route path="/weekly-wrap-up" element={<WeeklyWrapUp />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/health-sync-modal" element={<HealthSyncModal />} />
          <Route path="/invite-friends" element={<InviteFriends />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
