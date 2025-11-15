import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const FilteredFeed = () => {
  const navigate = useNavigate();
  const { tag } = useParams();

  const posts = [
    { id: 1, imageUrl: "/placeholder.svg" },
    { id: 2, imageUrl: "/placeholder.svg" },
    { id: 3, imageUrl: "/placeholder.svg" },
    { id: 4, imageUrl: "/placeholder.svg" },
    { id: 5, imageUrl: "/placeholder.svg" },
    { id: 6, imageUrl: "/placeholder.svg" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 border-b border-border">
        <button onClick={() => navigate("/profile")} className="text-foreground flex items-center gap-2 mb-3">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold capitalize">{tag || "Workout"} Workouts</h1>
        <p className="text-muted-foreground text-sm mt-1">Showing your sessions for this category.</p>
      </div>

      <div className="p-4">
        {/* 3-Column Gallery Grid */}
        <div className="grid grid-cols-3 gap-2">
          {posts.map((post) => (
            <button
              key={post.id}
              onClick={() => navigate(`/photo/${post.id}`)}
              className="aspect-square bg-muted rounded-xl overflow-hidden hover:opacity-80 transition-opacity"
            >
              <img
                src={post.imageUrl}
                alt="Workout post"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilteredFeed;

