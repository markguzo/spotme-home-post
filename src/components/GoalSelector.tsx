interface GoalSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export const GoalSelector = ({ value, onChange }: GoalSelectorProps) => {
  const days = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <div className="text-5xl font-extrabold text-white">{value}</div>
      <div className="text-sm text-gray-400">days per week</div>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => onChange(day)}
            className={`px-4 py-1.5 rounded-full text-sm cursor-pointer transition border ${
              value === day
                ? "bg-gradient-to-r from-[#5D5FEC] to-[#8A88FF] text-white border-transparent"
                : "bg-black/40 border-white/20 text-white"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};
