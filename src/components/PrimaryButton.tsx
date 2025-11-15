import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const PrimaryButton = ({ 
  children, 
  className, 
  fullWidth = true,
  disabled,
  ...props 
}: PrimaryButtonProps) => {
  return (
    <button
      className={cn(
        "h-12 rounded-2xl text-white font-medium flex items-center justify-center shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition",
        fullWidth && "w-full",
        !fullWidth && "px-6",
        className
      )}
      style={{
        backgroundImage: "var(--gradient-primary)",
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
