import { 
  Flame, 
  Heart, 
  Timer, 
  Activity, 
  AlertTriangle, 
  MapPin, 
  Plus, 
  Clock, 
  Award,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { ExerciseActivity, TimeRange, HRZone, NearbyFitnessLocation, ActivityRecommendation } from '../types';
import { TimeFilterBar } from './TimeFilterBar';
import { NEARBY_FITNESS_LOCATIONS, ACTIVITY_RECOMMENDATIONS } from '../data';
import { isDateInTimeRange, TIME_RANGE_LABELS } from '../utils/dateFilter';

interface ActivityScreenProps {
  exercises: ExerciseActivity[];
  timeRange: TimeRange;
  onSelectTimeRange: (range: TimeRange) => void;
  onOpenQuickLog: (mode: 'exercise') => void;
}

export const ActivityScreen = ({
  exercises,
  timeRange,
  onSelectTimeRange,
  onOpenQuickLog,
}: ActivityScreenProps) => {
  // Filter by time range
  const filteredExercises = exercises.filter((ex) => isDateInTimeRange(ex.date, timeRange));

  const totalCalories = filteredExercises.reduce((sum, item) => sum + item.activeCalories, 0);
  const totalMins = filteredExercises.reduce((sum, item) => sum + item.durationMin, 0);
  const avgHeartRate = filteredExercises.length > 0
    ? Math.round(filteredExercises.reduce((sum, item) => sum + item.avgHeartRate, 0) / filteredExercises.length)
    : 0;

  const getZoneBadgeColor = (zone: HRZone) => {
    switch (zone) {
      case 'Zone 1 Recovery':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Zone 2 Aerobic':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Zone 3 Cardio':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Zone 4 Threshold':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Zone 5 Peak':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Time Filter Segment */}
      <TimeFilterBar
        selectedRange={timeRange}
        onSelectRange={onSelectTimeRange}
        dateLabel={TIME_RANGE_LABELS[timeRange]}
      />

      {/* Screen Title & Quick Add button */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-600" />
            <span>Exercise & Activity Deep Dive</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Workouts logged via tracker or manually keyed in ({filteredExercises.length} in this period)
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenQuickLog('exercise')}
          className="btn bg-emerald-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm hover:bg-emerald-600 transition-all -translate-y-0.5 flex items-center gap-1.5 touch-manipulation shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Key In Workout</span>
        </button>
      </div>

      {/* High-level Aggregate Metrics Bar matching Vibrant Palette cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-4 text-center shadow-xs">
          <div className="flex items-center justify-center gap-1 text-xs text-emerald-600 font-black uppercase mb-1">
            <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
            <span>Active Burnt</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">
            {totalCalories.toLocaleString()} <span className="text-xs font-normal">kcal</span>
          </div>
          <div className="text-[11px] text-emerald-800 font-bold mt-1">Total calories expended</div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-3xl p-4 text-center shadow-xs">
          <div className="flex items-center justify-center gap-1 text-xs text-amber-600 font-black uppercase mb-1">
            <Timer className="w-3.5 h-3.5 text-amber-600" />
            <span>Active Time</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-700">
            {totalMins} <span className="text-xs font-normal">mins</span>
          </div>
          <div className="text-[11px] text-amber-800 font-bold mt-1">Exercise duration</div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-4 text-center shadow-xs">
          <div className="flex items-center justify-center gap-1 text-xs text-blue-600 font-black uppercase mb-1">
            <Heart className="w-3.5 h-3.5 text-blue-600" />
            <span>Avg Workout HR</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-700">
            {avgHeartRate} <span className="text-xs font-normal">bpm</span>
          </div>
          <div className="text-[11px] text-blue-800 font-bold mt-1">Aerobic pulse average</div>
        </div>
      </div>

      {/* Activity Level Recommendations (Required by prompt) */}
      <section 
        id="activity-recommendations-section"
        className="space-y-3"
      >
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-700">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Activity Level Recommendations & Insights</span>
        </div>

        {ACTIVITY_RECOMMENDATIONS.map((rec, idx) => (
          <div
            key={idx}
            className={`rounded-[24px] p-4 sm:p-5 border shadow-xs ${
              rec.type === 'warning'
                ? 'bg-amber-50/90 border-amber-200 text-amber-950'
                : rec.type === 'suggestion'
                ? 'bg-blue-50/90 border-blue-200 text-blue-950'
                : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {rec.type === 'warning' ? (
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              ) : rec.type === 'suggestion' ? (
                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                  <Info className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
              )}
              <div className="space-y-1 flex-1">
                <h3 className="font-black text-sm sm:text-base leading-snug">
                  {rec.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {rec.message}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <span className="text-emerald-700">Recommended Next Step:</span>
                  <span>{rec.actionPrompt}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Detailed Exercise Log Table / List */}
      <section 
        id="exercise-detailed-logs"
        className="card bg-white rounded-[28px] border border-emerald-100 p-5 sm:p-6 shadow-sm"
      >
        <div className="flex items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">
              Detailed Exercise Log ({filteredExercises.length} sessions)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Complete records with date, time, duration, active calories, avg HR & recorded zone
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {filteredExercises.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm font-medium">
              No exercises logged for this selected time period.
            </div>
          ) : (
            filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                id={`exercise-card-${exercise.id}`}
                className="bg-emerald-50/40 rounded-2xl p-4 border border-emerald-100 hover:border-emerald-300 transition-all space-y-2.5"
              >
                {/* Header: Name, Category, Date & Time */}
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-black text-sm sm:text-base text-slate-900 leading-snug">
                      {exercise.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-medium">
                      <span className="font-bold text-slate-700">{exercise.date}</span>
                      <span>•</span>
                      <span>{exercise.time}</span>
                      <span>•</span>
                      <span className="capitalize font-bold text-emerald-700">{exercise.category}</span>
                    </div>
                  </div>

                  {/* HR Zone Badge */}
                  <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getZoneBadgeColor(exercise.hrZone)}`}>
                    {exercise.hrZone}
                  </div>
                </div>

                {/* 4 Core Metrics Grid */}
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-emerald-100/80 text-center">
                  <div className="bg-white rounded-xl py-2 px-1 border border-emerald-100/70 shadow-2xs">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">Duration</span>
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      {exercise.durationMin} mins
                    </span>
                  </div>

                  <div className="bg-white rounded-xl py-2 px-1 border border-emerald-100/70 shadow-2xs">
                    <span className="block text-[10px] text-emerald-600 font-bold uppercase">Burnt</span>
                    <span className="text-xs sm:text-sm font-black text-emerald-700">
                      {exercise.activeCalories} kcal
                    </span>
                  </div>

                  <div className="bg-white rounded-xl py-2 px-1 border border-emerald-100/70 shadow-2xs">
                    <span className="block text-[10px] text-rose-600 font-bold uppercase">Avg HR</span>
                    <span className="text-xs sm:text-sm font-black text-rose-600 flex items-center justify-center gap-0.5">
                      <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                      {exercise.avgHeartRate} bpm
                    </span>
                  </div>

                  <div className="bg-white rounded-xl py-2 px-1 border border-emerald-100/70 shadow-2xs">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">Target</span>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 capitalize truncate">
                      {exercise.targetBodyPart}
                    </span>
                  </div>
                </div>

                {exercise.notes && (
                  <p className="text-xs text-slate-600 bg-white/90 rounded-xl px-3 py-1.5 border border-emerald-100 font-medium">
                    <span className="font-bold text-slate-800">Notes:</span> {exercise.notes}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Recommended Nearby Physical Activity Locations (Required by prompt) */}
      <section 
        id="nearby-activity-locations-section"
        className="card bg-white rounded-[28px] border border-emerald-100 p-5 sm:p-6 shadow-sm space-y-3"
      >
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Consumer Location: Sengkang / Punggol</span>
            </div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight mt-0.5 uppercase">
              Recommended Nearby Physical Activity Locations
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Selected facilities nearby to support swimming, strength, cardio and recovery
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {NEARBY_FITNESS_LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              id={`nearby-loc-${loc.id}`}
              className="bg-emerald-50/30 rounded-2xl p-4 border border-emerald-100/90 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-sm sm:text-base text-slate-900">
                    {loc.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black">
                    {loc.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {loc.categoryName} • <span className="text-slate-800 font-bold">{loc.neighborhood}</span>
                </p>
                <p className="text-xs text-slate-500">
                  {loc.popularFor}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1 font-medium">
                  <span>Hours: <strong className="text-slate-700">{loc.openHours}</strong></span>
                </div>
              </div>

              {/* Distance & Walking time pill */}
              <div className="sm:text-right shrink-0 bg-white sm:bg-transparent p-2 sm:p-0 rounded-xl border sm:border-0 border-emerald-100 flex sm:flex-col items-center sm:items-end justify-between">
                <span className="text-base sm:text-lg font-black text-emerald-700">
                  {loc.distanceKm} km away
                </span>
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  ~{loc.walkingMins} mins walk
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
