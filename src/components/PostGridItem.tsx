import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface PostGridItemProps {
  name: string;
  image: string;
  pr: boolean;
  timestamp?: string;
  isUserPost?: boolean;
}

export const PostGridItem = ({ name, image, pr, isUserPost }: PostGridItemProps) => {
  return (
    <div className={`relative aspect-square group cursor-pointer overflow-hidden rounded-sm ${isUserPost ? 'ring-2 ring-primary' : ''}`}>
      {/* Post Image */}
      <img 
        src={image} 
        alt={`${name}'s workout`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
      />
      
      {/* PR Badge */}
      {pr && (
        <div className="absolute top-2 right-2 bg-amber-500 rounded-full p-1.5 shadow-lg">
          <Star className="h-3 w-3 text-white fill-white" />
        </div>
      )}

      {/* Name Badge */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6 border border-white/30">
            <AvatarImage src={image} />
            <AvatarFallback className="text-[10px]">{name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-white text-sm font-semibold truncate">{name}</span>
        </div>
      </div>

      {/* User Post Indicator */}
      {isUserPost && (
        <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          You
        </div>
      )}
    </div>
  );
};
