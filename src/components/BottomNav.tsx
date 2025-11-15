import { Home, TrendingUp, User, Dumbbell } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-2xl mx-auto px-5 py-3 flex items-center justify-around">
        <NavLink
          to="/home"
          className={cn(
            "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors"
          )}
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <Home className={cn("w-5 h-5", isActive && "fill-current")} />
              <span className="text-xs font-medium">Home</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/leaderboard"
          className={cn(
            "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors"
          )}
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <TrendingUp className={cn("w-5 h-5", isActive && "fill-current")} />
              <span className="text-xs font-medium">Leaderboard</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/my-routines"
          className={cn(
            "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors"
          )}
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <Dumbbell className={cn("w-5 h-5", isActive && "fill-current")} />
              <span className="text-xs font-medium">Routines</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/profile"
          className={cn(
            "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors"
          )}
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <User className={cn("w-5 h-5", isActive && "fill-current")} />
              <span className="text-xs font-medium">Profile</span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
