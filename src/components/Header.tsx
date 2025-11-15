interface HeaderProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  onBack?: () => void;
  className?: string;
}

export const Header = ({ title, subtitle, align = "center", onBack, className }: HeaderProps) => {
  if (onBack) {
    return (
      <div className={`w-full mb-6 ${className || ""}`}>
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition backdrop-blur-sm"
          >
            ←
          </button>
        </div>
        <div className={`flex flex-col gap-1 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col gap-1 mb-6 ${align === "center" ? "items-center text-center" : "items-start text-left"} ${className || ""}`}>
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
    </div>
  );
};
