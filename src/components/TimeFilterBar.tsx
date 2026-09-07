import { Calendar, ChevronRight } from 'lucide-react';
import { TimeRange } from '../types';

interface TimeFilterBarProps {
  selectedRange: TimeRange;
  onSelectRange: (range: TimeRange) => void;
  dateLabel: string;
}

export const TimeFilterBar = ({
  selectedRange,
  onSelectRange,
  dateLabel,
}: TimeFilterBarProps) => {
  const options: { id: TimeRange; label: string }[] = [
    { id: 'day', label: 'Day' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-emerald-100 p-3 shadow-xs mb-4">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-xs sm:text-sm">
          <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="truncate">{dateLabel}</span>
        </div>
        <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          Filter View
        </span>
      </div>

      <div 
        id="time-range-segmented-control"
        className="grid grid-cols-4 gap-1.5 bg-emerald-50/80 p-1 rounded-2xl border border-emerald-100/60"
      >
        {options.map((opt) => {
          const isSelected = selectedRange === opt.id;
          return (
            <button
              key={opt.id}
              id={`filter-range-${opt.id}`}
              type="button"
              onClick={() => onSelectRange(opt.id)}
              className={`py-2 px-1 text-xs sm:text-sm font-bold rounded-xl transition-all text-center min-h-[40px] touch-manipulation flex items-center justify-center ${
                isSelected
                  ? 'bg-emerald-500 text-white font-black shadow-sm -translate-y-0.5'
                  : 'text-emerald-800/80 hover:text-emerald-950 hover:bg-emerald-100/60'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
