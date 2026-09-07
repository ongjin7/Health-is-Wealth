import { 
  Flame, 
  Utensils, 
  TrendingDown, 
  Heart, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  ChevronRight, 
  Plus, 
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
            <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">
              DASHBOARD SUMMARY
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Comparing your energy intake vs. physical burn for {timeRange}
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

        {/* 3 High-contrast metric cards matching Vibrant Palette */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
          {/* Burnt */}
          <div className="bg-emerald-50 p-4 rounded-3xl border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-black text-emerald-600 uppercase mb-1">
                <div className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
                  <span>Burnt</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">Active</span>
              </div>
              <p className="text-3xl font-black text-emerald-700 tracking-tight">
                {totalCaloriesBurnt.toLocaleString()} <span className="text-sm font-normal text-emerald-600">kcal</span>
              </p>
            </div>
            <div>
              <div className="mt-3 h-2 w-full bg-emerald-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${burnProgressPercent}%` }}
                />
              </div>
              <p className="text-[11px] mt-1.5 font-bold text-emerald-800">
                {burnProgressPercent}% of {rangeAdjective} target ({burnTarget.toLocaleString()} kcal)
              </p>
            </div>
          </div>

          {/* Intake */}
          <div className="bg-amber-50 p-4 rounded-3xl border border-amber-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-black text-amber-600 uppercase mb-1">
                <div className="flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-amber-600" />
                  <span>Intake</span>
                </div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">Budget</span>
              </div>
              <p className="text-3xl font-black text-amber-700 tracking-tight">
                {totalCaloriesIntake.toLocaleString()} <span className="text-sm font-normal text-amber-600">kcal</span>
              </p>
            </div>
            <div>
              <div className="mt-3 h-2 w-full bg-amber-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    totalCaloriesIntake <= intakeBudget ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${intakeUsagePercent}%` }}
                />
              </div>
              <p className="text-[11px] mt-1.5 font-bold text-amber-800">
                Goal: &lt; {intakeBudget.toLocaleString()} kcal ({intakeUsagePercent}% used)
              </p>
            </div>
          </div>

          {/* Active / Net */}
          <div className="bg-blue-50 p-4 rounded-3xl border border-blue-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-black text-blue-600 uppercase mb-1">
                <div className="flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 text-blue-600" />
                  <span>Active & Net</span>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">Duration</span>
              </div>
              <p className="text-3xl font-black text-blue-700 tracking-tight">
                {totalDurationMin} <span className="text-sm font-normal text-blue-600">mins</span>
              </p>
            </div>
            <div>
              <div className="mt-3 h-2 w-full bg-blue-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((totalDurationMin / durationTarget) * 100))}%` }}
                />
              </div>
              <p className="text-[11px] mt-1.5 font-bold text-blue-800">
                {Math.min(100, Math.round((totalDurationMin / durationTarget) * 100))}% of {durationTarget}m goal • Net: {netCalories > 0 ? `+${netCalories.toLocaleString()}` : netCalories.toLocaleString()} kcal
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

      {/* Goal Progress Section (Styled with deep emerald card and visual chart from Vibrant Palette) */}
      <section 
        id="personal-goals-section"
        className="card bg-emerald-800 p-5 sm:p-6 text-white rounded-[28px] shadow-sm"
      >
        <div className="flex items-center justify-between gap-2 mb-4">
          <h3 className="text-base sm:text-lg font-black uppercase tracking-tight">
            GOAL PROGRESS: <span className="text-emerald-300">LOSE 5KG / 6 MOS</span>
          </h3>
          <span className="text-xs font-black text-emerald-200 bg-emerald-900/80 px-2.5 py-1 rounded-lg border border-emerald-700">
            48% Reached
          </span>
        </div>

        {/* Visual Chart from Vibrant Palette Design */}
        <div className="bg-emerald-900/50 border border-emerald-700/60 rounded-2xl p-4 mb-4">
          <div className="flex items-end gap-3 h-32 pt-2">
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-emerald-700 rounded-t-xl flex items-center justify-center text-[10px] font-bold text-emerald-200" style={{ height: '100%' }}>
                74.5kg
              </div>
              <span className="text-[11px] text-emerald-200 font-medium">July</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-emerald-600 rounded-t-xl flex items-center justify-center text-[10px] font-bold text-emerald-100" style={{ height: '85%' }}>
                73.2kg
              </div>
              <span className="text-[11px] text-emerald-200 font-medium">August</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-emerald-500 rounded-t-xl shadow-[0_-4px_10px_rgba(16,185,129,0.5)] flex items-center justify-center text-[10px] font-black text-white" 
                style={{ height: '70%' }}
              >
                72.1kg
              </div>
              <span className="text-[10px] sm:text-[11px] font-black text-white text-center leading-tight">September (current)</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full border-2 border-dashed border-emerald-400 rounded-t-xl flex items-center justify-center text-[10px] font-bold text-emerald-300" 
                style={{ height: '55%' }}
              >
                69.5kg
              </div>
              <span className="text-[11px] text-emerald-300 font-bold">Target</span>
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

      {/* Screen 2 & Screen 3 Deep Dive Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Activity shortcut */}
        <div 
          onClick={() => onNavigateToScreen('activity')}
          className="card bg-white border border-emerald-100 rounded-[28px] p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Flame className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-black text-base text-slate-800 group-hover:text-emerald-700 transition-colors">
                Activity Deep Dive
              </h3>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
          </div>
          <p className="text-xs text-slate-600 line-clamp-2 font-medium">
            View detailed exercise logs, heart rate zones, training balance recommendations, and nearby Singapore sports facilities.
          </p>
          <div className="mt-3.5 pt-2.5 border-t border-emerald-100/70 flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>{exercises.length} activities logged</span>
            <span className="flex items-center gap-1">Open Screen 2 &rarr;</span>
          </div>
        </div>

        {/* Consumption shortcut */}
        <div 
          onClick={() => onNavigateToScreen('consumption')}
          className="card bg-white border border-emerald-100 rounded-[28px] p-5 shadow-xs hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Utensils className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-black text-base text-slate-800 group-hover:text-amber-700 transition-colors">
                Consumption Deep Dive
              </h3>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-0.5" />
          </div>
          <p className="text-xs text-slate-600 line-clamp-2 font-medium">
            Explore breakfast, lunch, dinner, and supper logs, sugar insights (sweet drinks habit), and nearby Healthier Choice dining options.
          </p>
          <div className="mt-3.5 pt-2.5 border-t border-emerald-100/70 flex items-center justify-between text-xs font-bold text-amber-700">
            <span>{foods.length} foods recorded</span>
            <span className="flex items-center gap-1">Open Screen 3 &rarr;</span>
          </div>
        </div>
      </div>

      {/* Quick Action Bar to launch input widget directly */}
      <div className="bg-emerald-500 text-white rounded-[24px] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md shadow-emerald-200">
        <div>
          <h4 className="text-base font-black leading-tight">Key In Today's Health Log</h4>
          <p className="text-xs text-emerald-100 mt-0.5 font-medium">
            Log exercise or hawker food to update your calorie balance and gamified points live
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <button
            type="button"
            onClick={() => onOpenQuickLog('exercise')}
            className="btn flex-1 sm:flex-initial bg-white text-emerald-800 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-xs hover:bg-emerald-50 transition-all -translate-y-0.5 touch-manipulation flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Exercise</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenQuickLog('food')}
            className="btn flex-1 sm:flex-initial bg-amber-500 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-xs hover:bg-amber-600 transition-all -translate-y-0.5 touch-manipulation flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Food</span>
          </button>
        </div>
      </div>
    </div>
  );
};
