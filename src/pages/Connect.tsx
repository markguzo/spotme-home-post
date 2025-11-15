import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const fitnessCreators = [
  {
    id: "creator-1",
    name: "Quincy",
    username: "@quincy_runs",
    photo: "/images/creators/quincy.jpg",
    followersLabel: "Followed by 1.1K users",
  },
  {
    id: "creator-2",
    name: "Sasha Sloan",
    username: "@sasha_strength",
    photo: "/images/creators/sasha.jpg",
    followersLabel: "Push / pull / legs splits",
  },
  {
    id: "creator-3",
    name: "Marcus Chen",
    username: "@marcus_moves",
    photo: "/images/creators/marcus.jpg",
    followersLabel: "Calisthenics & mobility",
  },
  {
    id: "creator-4",
    name: "Riley Park",
    username: "@riley.park",
    photo: "/images/creators/riley.jpg",
    followersLabel: "Early morning routines",
  },
];

const recommendedFriends = [
  {
    id: "friend-1",
    name: "Carter",
    username: "@cartie.pepe",
    photo: "/images/friends/carter.jpg",
    note: "Works out at your gym",
  },
  {
    id: "friend-2",
    name: "Jordan Lee",
    username: "@jlee_fit",
    photo: "/images/friends/jordan.jpg",
    note: "3-day streak",
  },
  {
    id: "friend-3",
    name: "Alex Rivera",
    username: "@alex.lifts",
    photo: "/images/friends/alex.jpg",
    note: "Morning gym crew",
  },
];

const friendRequests = [
  {
    id: "req-1",
    name: "Liam",
    username: "@lil.lofty",
    photo: "/images/friends/liam.jpg",
    note: "Sent you a spot request",
  },
  {
    id: "req-2",
    name: "Taylor Swift",
    username: "@tswift_gains",
    photo: "/images/friends/taylor.jpg",
    note: "From suggested friends",
  },
];

const Connect = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Mark onboarding as completed and go to home
    localStorage.setItem("onboarding_completed", "true");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="px-4 pt-10 pb-32 overflow-y-auto flex-1">
        <Header 
          title="Connect" 
          align="left"
          onBack={() => navigate(-1)}
        />
        <p className="mt-2 text-sm text-gray-400">
          Follow creators and friends so your feed isn't empty on Day 1.
        </p>

        {/* Section 1: Fitness Creators */}
        <section className="mt-6">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-100 uppercase tracking-wide">
              Fitness creators
            </h2>
            <span className="text-xs text-gray-500">
              Daily workouts & routines
            </span>
          </div>

          <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 divide-y divide-neutral-800">
            {fitnessCreators.map((creator) => (
              <div
                key={creator.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden bg-neutral-700">
                    {creator.photo ? (
                      <img
                        src={creator.photo}
                        alt={creator.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-neutral-600 to-neutral-800" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-100">
                      {creator.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {creator.followersLabel}
                    </p>
                  </div>
                </div>

                <button className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#5D5FEC] text-white hover:bg-[#4d4fdc] transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Recommended Friends */}
        <section className="mt-6">
          <h2 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-2">
            Recommended friends
          </h2>

          <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 divide-y divide-neutral-800">
            {recommendedFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden bg-neutral-700">
                    {friend.photo ? (
                      <img
                        src={friend.photo}
                        alt={friend.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-neutral-600 to-neutral-800" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-100">
                      {friend.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {friend.username} · {friend.note}
                    </p>
                  </div>
                </div>

                <button className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#5D5FEC] text-white">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Friend Requests */}
        <section className="mt-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-100 uppercase tracking-wide mb-2">
            Friend requests
          </h2>

          <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 divide-y divide-neutral-800">
            {friendRequests.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden bg-neutral-700">
                    {req.photo ? (
                      <img
                        src={req.photo}
                        alt={req.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-neutral-600 to-neutral-800" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-100">
                      {req.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {req.username} · {req.note}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#5D5FEC] text-white">
                    Accept
                  </button>
                  <button className="text-xs px-2 py-1 rounded-full bg-transparent text-gray-500 border border-neutral-700">
                    Ignore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom CTA Buttons */}
      <div className="sticky bottom-0 px-4 pb-6 pt-4 bg-gradient-to-t from-black via-black/90 to-transparent">
        <button 
          onClick={handleContinue}
          className="w-full rounded-full py-3.5 text-sm font-semibold bg-[#5D5FEC] text-white shadow-lg"
        >
          Continue
        </button>
        <button 
          onClick={handleContinue}
          className="mt-3 w-full rounded-full py-3 text-sm font-medium text-gray-300 border border-neutral-800 bg-transparent"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default Connect;
