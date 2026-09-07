import { SlidersHorizontal } from 'lucide-react';
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
    <div 
      id="time-filter-widget"
      className="bg-slate-100/90 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-1.5 sm:p-2 mb-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
    >
      <div className="flex items-center gap-2 px-1.5 py-0.5 min-w-0">
        <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </div>
        <div className="min-w-0 text-xs">
          <span className="font-bold text-slate-700 truncate block">{dateLabel}</span>
        </div>
      </div>

      <div 
        id="time-range-segmented-control"
        className="grid grid-cols-4 gap-1 bg-slate-200/70 p-1 rounded-xl sm:w-80"
      >
        {options.map((opt) => {
          const isSelected = selectedRange === opt.id;
          return (
            <button
              key={opt.id}
              id={`filter-range-${opt.id}`}
              type="button"
              onClick={() => onSelectRange(opt.id)}
              className={`py-1.5 px-2.5 text-xs font-bold rounded-lg transition-all text-center min-h-[34px] touch-manipulation flex items-center justify-center ${
                isSelected
                  ? 'bg-white text-emerald-700 font-black shadow-xs ring-1 ring-slate-900/5'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/40'
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
