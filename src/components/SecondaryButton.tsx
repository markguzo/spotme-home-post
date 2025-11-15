import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const SecondaryButton = ({ 
  children, 
  className, 
  fullWidth = false,
  disabled,
  ...props 
}: SecondaryButtonProps) => {
  return (
    <button
      className={cn(
        "bg-card text-card-foreground font-medium rounded-xl px-6 py-3.5 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border disabled:opacity-50 disabled:cursor-not-allowed",
        fullWidth && "w-full",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
