import { Camera, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface GradientHeroCardProps {
  hasPosted: boolean;
  userName: string;
}

export const GradientHeroCard = ({ hasPosted, userName }: GradientHeroCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative rounded-3xl overflow-hidden shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.1),_0_8px_10px_-6px_rgb(0_0_0_/_0.1)] transition-all duration-300"
      style={{
        height: '65vh',
        minHeight: '400px',
        background: hasPosted 
          ? 'linear-gradient(135deg, hsl(142 76% 36%) 0%, hsl(142 76% 46%) 100%)'
          : 'linear-gradient(135deg, hsl(239 84% 65%) 0%, hsl(270 84% 70%) 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 10s ease infinite'
      }}
    >
      {/* Mesh pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-8">
        {/* Top section with greeting */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm">
            {hasPosted ? (
              <Check className="h-8 w-8 text-white" />
            ) : (
              <Camera className="h-8 w-8 text-white" />
            )}
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              HEY {userName.toUpperCase()}
            </h1>
            
            <p className="text-lg text-white/80 max-w-md leading-relaxed">
              {hasPosted 
                ? "You showed up today! That's what champions do. 🎯"
                : "It's time to show up. Your crew is waiting. 💪"
              }
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="space-y-6">
          <Button
            onClick={() => navigate(hasPosted ? '/progress' : '/post')}
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-white hover:bg-white/90 text-primary shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] rounded-2xl"
          >
            {hasPosted ? (
              <>
                <Check className="mr-2 h-6 w-6" />
                View Progress
              </>
            ) : (
              <>
                <Camera className="mr-2 h-6 w-6" />
                Post Gym Photo
              </>
            )}
          </Button>
          
          {!hasPosted && (
            <p className="text-center text-white/60 text-sm">
              Show your crew you're putting in the work
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
