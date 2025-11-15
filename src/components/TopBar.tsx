import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  rightContent?: React.ReactNode;
}

export const TopBar = ({ title, showBack = false, rightContent }: TopBarProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-background border-b border-border">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        {title && (
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        )}
      </div>
      {rightContent}
    </div>
  );
};
