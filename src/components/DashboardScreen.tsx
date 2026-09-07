import { 
  Flame, 
  Utensils, 
  TrendingDown, 
  Heart, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  ChevronRight, 
  Sparkles,
  ArrowUpRight,
  Footprints,
  Timer
} from 'lucide-react';
import { ExerciseActivity, FoodConsumption, PersonalGoal, TimeRange, MilestoneBadge, LeaderboardUser, PointRule, PointHistoryItem } from '../types';
import { TimeFilterBar } from './TimeFilterBar';
import { GamificationHub } from './GamificationHub';
import { isDateInTimeRange, TIME_RANGE_LABELS } from '../utils/dateFilter';

interface DashboardScreenProps {
  exercises: ExerciseActivity[];
  foods: FoodConsumption[];
  goal: PersonalGoal;
  timeRange: TimeRange;
  onSelectTimeRange: (range: TimeRange) => void;
  onNavigateToScreen: (screen: 'dashboard' | 'activity' | 'consumption') => void;
  onOpenQuickLog: (mode: 'exercise' | 'food') => void;
  totalPoints: number;
  streakDays: number;
  badges: MilestoneBadge[];
  leaderboardUsers: LeaderboardUser[];
  pointRules: PointRule[];
  pointHistory: PointHistoryItem[];
  onCheerUser: (userId: string) => void;
}

export const DashboardScreen = ({
  exercises,
  foods,
  goal,
  timeRange,
  onSelectTimeRange,
  onNavigateToScreen,
  onOpenQuickLog,
  totalPoints,
  streakDays,
  badges,
  leaderboardUsers,
  pointRules,
  pointHistory,
  onCheerUser,
}: DashboardScreenProps) => {
  // Filter data based on selected time range
  const filteredExercises = exercises.filter((ex) => isDateInTimeRange(ex.date, timeRange));
  const filteredFoods = foods.filter((fd) => isDateInTimeRange(fd.date, timeRange));

  // Calculate totals
  const totalCaloriesBurnt = filteredExercises.reduce((sum, ex) => sum + ex.activeCalories, 0);
  const totalCaloriesIntake = filteredFoods.reduce((sum, fd) => sum + fd.calories, 0);
  const totalDurationMin = filteredExercises.reduce((sum, ex) => sum + ex.durationMin, 0);

  // Scaled targets according to timeRange
  const burnTarget = 
    timeRange === 'day' ? goal.dailyBurnTarget :
    timeRange === 'week' ? goal.dailyBurnTarget * 7 :
    timeRange === 'month' ? goal.dailyBurnTarget * 16 :
    goal.dailyBurnTarget * 45;

  const intakeBudget = 
    timeRange === 'day' ? goal.dailyCalorieBudget :
    timeRange === 'week' ? goal.dailyCalorieBudget * 7 :
    timeRange === 'month' ? goal.dailyCalorieBudget * 16 :
    goal.dailyCalorieBudget * 45;

  const durationTarget = 
    timeRange === 'day' ? 45 :
    timeRange === 'week' ? 300 :
    timeRange === 'month' ? 800 :
    2000;

  const netCalories = totalCaloriesIntake - totalCaloriesBurnt;
  const burnProgressPercent = Math.min(100, Math.round((totalCaloriesBurnt / burnTarget) * 100));
  const intakeUsagePercent = Math.min(100, Math.round((totalCaloriesIntake / intakeBudget) * 100));
  const isBurnTargetHit = totalCaloriesBurnt >= burnTarget;
  const isIntakeWithinBudget = totalCaloriesIntake <= intakeBudget;
  const isOverallTargetHit = isBurnTargetHit && isIntakeWithinBudget;

  const rangeAdjective = 
    timeRange === 'day' ? 'daily' : 
    timeRange === 'week' ? 'weekly' : 
    timeRange === 'month' ? 'monthly' : 'annual';

  return (
    <div className="space-y-4 pb-8">
      {/* Time Filter Segment */}
      <TimeFilterBar
        selectedRange={timeRange}
        onSelectRange={onSelectTimeRange}
        dateLabel={TIME_RANGE_LABELS[timeRange]}
      />

      {/* Hero Calories & Target Card */}
      <section 
        id="calories-summary-card"
        className="card bg-white rounded-[28px] border border-emerald-100 p-5 sm:p-6 shadow-sm"
      >
        <div className="flex items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Summary
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Energy Intake vs Physical burn
            </p>
          </div>

          {/* Hit / Miss Status Pill */}
          <div 
            id="target-hit-badge"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black shrink-0 ${
              isOverallTargetHit 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                : 'bg-amber-100 text-amber-800 border border-amber-200'
            }`}
          >
            {isOverallTargetHit ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Target Hit! 🎯</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>On Track ({burnProgressPercent}% burn)</span>
              </>
            )}
          </div>
        </div>

        {/* 3 High-contrast metric cards side-by-side on iPhone 15 Pro Max and desktop */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 my-3">
          {/* Burnt */}
          <div className="bg-emerald-50 p-2 sm:p-3.5 rounded-2xl sm:rounded-3xl border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[11px] sm:text-xs font-black text-emerald-600 uppercase mb-1">
                <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500 shrink-0" />
                <span>Burnt</span>
              </div>
              <p className="text-base min-[400px]:text-xl sm:text-2xl lg:text-3xl font-black text-emerald-700 tracking-tight leading-tight">
                {totalCaloriesBurnt.toLocaleString()} <span className="text-[10px] min-[400px]:text-xs sm:text-sm font-normal text-emerald-600">kcal</span>
              </p>
            </div>
            <div>
              <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 w-full bg-emerald-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${burnProgressPercent}%` }}
                />
              </div>
              <p className="text-[10px] sm:text-[11px] mt-1 sm:mt-1.5 font-bold text-emerald-800 leading-tight">
                {burnProgressPercent}% of {burnTarget.toLocaleString()} kcal
              </p>
            </div>
          </div>

          {/* Intake */}
          <div className="bg-amber-50 p-2 sm:p-3.5 rounded-2xl sm:rounded-3xl border border-amber-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[11px] sm:text-xs font-black text-amber-600 uppercase mb-1">
                <Utensils className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Intake</span>
              </div>
              <p className="text-base min-[400px]:text-xl sm:text-2xl lg:text-3xl font-black text-amber-700 tracking-tight leading-tight">
                {totalCaloriesIntake.toLocaleString()} <span className="text-[10px] min-[400px]:text-xs sm:text-sm font-normal text-amber-600">kcal</span>
              </p>
            </div>
            <div>
              <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 w-full bg-amber-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    totalCaloriesIntake <= intakeBudget ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${intakeUsagePercent}%` }}
                />
              </div>
              <p className="text-[10px] sm:text-[11px] mt-1 sm:mt-1.5 font-bold text-amber-800 leading-tight">
                Goal: &lt; {intakeBudget.toLocaleString()} kcal ({intakeUsagePercent}%)
              </p>
            </div>
          </div>

          {/* Active / Net */}
          <div className="bg-blue-50 p-2 sm:p-3.5 rounded-2xl sm:rounded-3xl border border-blue-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[11px] sm:text-xs font-black text-blue-600 uppercase mb-1">
                <Timer className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Active & Net</span>
              </div>
              <p className="text-base min-[400px]:text-xl sm:text-2xl lg:text-3xl font-black text-blue-700 tracking-tight leading-tight">
                {totalDurationMin} <span className="text-[10px] min-[400px]:text-xs sm:text-sm font-normal text-blue-600">mins</span>
              </p>
            </div>
            <div>
              <div className="mt-2 sm:mt-3 h-1.5 sm:h-2 w-full bg-blue-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((totalDurationMin / durationTarget) * 100))}%` }}
                />
              </div>
              <p className="text-[10px] sm:text-[11px] mt-1 sm:mt-1.5 font-bold text-blue-800 leading-tight">
                {Math.min(100, Math.round((totalDurationMin / durationTarget) * 100))}% • Net: {netCalories > 0 ? `+${netCalories.toLocaleString()}` : netCalories.toLocaleString()} kcal
              </p>
            </div>
          </div>
        </div>

        {/* Target Evaluation Quote Banner */}
        <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-200">
          <p className="text-xs sm:text-sm font-medium italic text-amber-900 leading-relaxed">
            "{isOverallTargetHit 
              ? `You're doing great! You successfully hit your exercise burn target (${totalCaloriesBurnt.toLocaleString()} kcal) while staying within your budget. Keep this momentum going!` 
              : `You're doing great! You have burnt ${totalCaloriesBurnt.toLocaleString()} kcal so far in this ${timeRange}. Only ${Math.max(0, burnTarget - totalCaloriesBurnt).toLocaleString()} more calories to burn to hit your ${timeRange} goal!`}"
          </p>
        </div>
      </section>

      {/* Quick Deep Dive Navigation - Compact Cool Icon Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          id="btn-goto-activity-deepdive"
          onClick={() => onNavigateToScreen('activity')}
          className="group flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-white border border-emerald-200/80 hover:border-emerald-400 hover:shadow-md transition-all active:scale-98 cursor-pointer touch-manipulation shadow-2xs"
          title="Activity Deep Dive"
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-xs shadow-emerald-500/25 group-hover:scale-105 transition-transform shrink-0">
              <Flame className="w-5 h-5 fill-white/20 text-white" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block leading-none mb-0.5">Deep Dive</span>
              <span className="text-xs sm:text-sm font-black text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight">Activity</span>
            </div>
          </div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </button>

        <button
          type="button"
          id="btn-goto-consumption-deepdive"
          onClick={() => onNavigateToScreen('consumption')}
          className="group flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-white border border-amber-200/80 hover:border-amber-400 hover:shadow-md transition-all active:scale-98 cursor-pointer touch-manipulation shadow-2xs"
          title="Consumption Deep Dive"
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center shadow-xs shadow-amber-500/25 group-hover:scale-105 transition-transform shrink-0">
              <Utensils className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 block leading-none mb-0.5">Deep Dive</span>
              <span className="text-xs sm:text-sm font-black text-slate-800 group-hover:text-amber-700 transition-colors leading-tight">Consumption</span>
            </div>
          </div>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all shrink-0">
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </button>
      </div>

      {/* Goal Progress Section (Styled with deep emerald card and visual chart from Vibrant Palette) */}
      <section 
        id="personal-goals-section"
        className="card bg-emerald-800 p-5 sm:p-6 text-white rounded-[28px] shadow-sm"
      >
        <div className="flex items-center justify-between gap-2 mb-4">
          <h3 className="text-base sm:text-lg font-black tracking-tight">
            Your Goal: <span className="text-emerald-300">Lose 5KG in 6 months</span>
          </h3>
          <span className="text-xs font-black text-emerald-200 bg-emerald-900/80 px-2.5 py-1 rounded-lg border border-emerald-700">
            48% Reached
          </span>
        </div>

        {/* Visual Chart from Vibrant Palette Design */}
        <div className="bg-emerald-900/50 border border-emerald-700/60 rounded-2xl p-4 mb-4">
          <div className="flex items-end gap-3 h-28 pt-2 pb-1 border-b border-emerald-700/50">
            {/* July: 74.5kg (Start) */}
            <div className="flex-1 h-full flex items-end">
              <div 
                className="w-full bg-emerald-700 rounded-t-xl flex items-center justify-center text-[10px] font-bold text-emerald-200 transition-all duration-300 shadow-xs" 
                style={{ height: '100%' }}
              >
                74.5kg
              </div>
            </div>
            {/* August: 73.2kg */}
            <div className="flex-1 h-full flex items-end">
              <div 
                className="w-full bg-emerald-600 rounded-t-xl flex items-center justify-center text-[10px] font-bold text-emerald-100 transition-all duration-300 shadow-xs" 
                style={{ height: '82%' }}
              >
                73.2kg
              </div>
            </div>
            {/* September: 72.1kg */}
            <div className="flex-1 h-full flex items-end">
              <div 
                className="w-full bg-emerald-500 rounded-t-xl shadow-[0_-4px_12px_rgba(16,185,129,0.6)] flex items-center justify-center text-[10px] font-black text-white transition-all duration-300" 
                style={{ height: '68%' }}
              >
                72.1kg
              </div>
            </div>
            {/* Target: 69.5kg */}
            <div className="flex-1 h-full flex items-end">
              <div 
                className="w-full border-2 border-dashed border-emerald-400 bg-emerald-800/40 rounded-t-xl flex items-center justify-center text-[10px] font-bold text-emerald-300 transition-all duration-300" 
                style={{ height: '48%' }}
              >
                69.5kg
              </div>
            </div>
          </div>

          {/* Month & Target Labels aligned at the exact same level */}
          <div className="flex items-center gap-3 pt-2.5">
            <div className="flex-1 text-center flex items-center justify-center">
              <span className="text-[11px] text-emerald-200 font-semibold leading-none">July</span>
            </div>
            <div className="flex-1 text-center flex items-center justify-center">
              <span className="text-[11px] text-emerald-200 font-semibold leading-none">August</span>
            </div>
            <div className="flex-1 text-center flex items-center justify-center">
              <span className="text-[11px] text-white font-black leading-none">September</span>
            </div>
            <div className="flex-1 text-center flex items-center justify-center">
              <span className="text-[11px] text-emerald-300 font-bold leading-none">Target</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-emerald-900/60 rounded-xl p-3 border border-emerald-700/60 flex items-center justify-between text-xs">
            <div>
              <span className="text-emerald-300 text-[10px] font-bold uppercase block">Current vs. Target</span>
              <span className="font-extrabold text-white text-sm">72.1 kg &rarr; 69.5 kg</span>
            </div>
            <span className="text-emerald-300 font-bold bg-emerald-800/80 px-2 py-1 rounded-md">
              -2.4 kg achieved
            </span>
          </div>

          <div className="bg-emerald-900/60 rounded-xl p-3 border border-emerald-700/60 flex items-center justify-between text-xs">
            <div>
              <span className="text-emerald-300 text-[10px] font-bold uppercase block">Resting Pulse & Aerobic</span>
              <span className="font-extrabold text-white text-sm">64 bpm • 165 mins Zone 2</span>
            </div>
            <span className="text-emerald-300 font-bold bg-emerald-800/80 px-2 py-1 rounded-md">
              Target Met! (-8 bpm)
            </span>
          </div>
        </div>
      </section>

      {/* Gamified Health Rewards, Point System, Milestone Badges & Friends Leaderboard */}
      <GamificationHub
        totalPoints={totalPoints}
        streakDays={streakDays}
        goal={goal}
        badges={badges}
        leaderboardUsers={leaderboardUsers}
        pointRules={pointRules}
        pointHistory={pointHistory}
        onCheerUser={onCheerUser}
      />
    </div>
  );
};
