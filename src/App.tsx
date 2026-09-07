import { useState } from 'react';
import { Header } from './components/Header';
import { Navigation, ScreenId } from './components/Navigation';
import { DashboardScreen } from './components/DashboardScreen';
import { ActivityScreen } from './components/ActivityScreen';
import { ConsumptionScreen } from './components/ConsumptionScreen';
import { QuickLogWidget } from './components/QuickLogWidget';
import { 
  INITIAL_EXERCISES, 
  INITIAL_FOODS, 
  INITIAL_USER_GOAL,
  INITIAL_BADGES,
  INITIAL_LEADERBOARD_USERS,
  POINT_RULES,
  INITIAL_POINT_HISTORY
} from './data';
import { 
  ExerciseActivity, 
  FoodConsumption, 
  TimeRange, 
  PersonalGoal,
  MilestoneBadge,
  LeaderboardUser,
  PointRule,
  PointHistoryItem
} from './types';
import { Sparkles, Trophy, CheckCircle2, Target } from 'lucide-react';

export default function App() {
  // Navigation & View state
  const [activeScreen, setActiveScreen] = useState<ScreenId>('dashboard');
  const [timeRange, setTimeRange] = useState<TimeRange>('day');

  // Core Data State
  const [exercises, setExercises] = useState<ExerciseActivity[]>(INITIAL_EXERCISES);
  const [foods, setFoods] = useState<FoodConsumption[]>(INITIAL_FOODS);
  const [userGoal, setUserGoal] = useState<PersonalGoal>(INITIAL_USER_GOAL);

  // Gamification & Streak state
  const [streakDays, setStreakDays] = useState(5);
  const [healthPoints, setHealthPoints] = useState(1420);
  const [badges, setBadges] = useState<MilestoneBadge[]>(INITIAL_BADGES);
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD_USERS);
  const [pointRules] = useState<PointRule[]>(POINT_RULES);
  const [pointHistory, setPointHistory] = useState<PointHistoryItem[]>(INITIAL_POINT_HISTORY);
  const [gamificationToast, setGamificationToast] = useState<{
    text: string;
    points: number;
    goalTieIn: string;
  } | null>(null);

  // Quick Log input widget state
  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);
  const [quickLogMode, setQuickLogMode] = useState<'exercise' | 'food'>('exercise');

  // Handle adding exercise with point rules & goal tie-ins
  const handleAddExercise = (newEx: ExerciseActivity) => {
    setExercises((prev) => [newEx, ...prev]);

    // Point calculations
    const isIntense = newEx.durationMin >= 45 || newEx.hrZone.includes('Threshold') || newEx.hrZone.includes('Peak');
    const earnedPoints = isIntense ? 70 : 50;
    const newTotal = healthPoints + earnedPoints;

    setHealthPoints(newTotal);

    // Add point history audit
    const newHistoryItem: PointHistoryItem = {
      id: `pts-${Date.now()}`,
      description: `Logged ${newEx.name} (${newEx.durationMin} mins, ${newEx.activeCalories} kcal)`,
      points: earnedPoints,
      timestamp: 'Just now',
      type: 'exercise'
    };
    setPointHistory((prev) => [newHistoryItem, ...prev]);

    // Update current user score in leaderboard
    setLeaderboardUsers((prev) => 
      prev.map((user) => 
        user.isCurrentUser 
          ? { 
              ...user, 
              points: newTotal, 
              recentActivity: `${newEx.name} (${newEx.durationMin}m)` 
            } 
          : user
      )
    );

    // Show gamification feedback toast
    setGamificationToast({
      text: `Workout Logged: +${earnedPoints} Health Points!`,
      points: earnedPoints,
      goalTieIn: `Burned ${newEx.activeCalories} kcal toward today's 550 kcal target and -5kg weight loss.`
    });
    setTimeout(() => setGamificationToast(null), 5000);
  };

  // Handle adding food with point rules & goal tie-ins
  const handleAddFood = (newFood: FoodConsumption) => {
    setFoods((prev) => [newFood, ...prev]);

    // Point calculations
    let earnedPoints = 20;
    if (newFood.healthierChoiceTag) earnedPoints += 20;
    if (newFood.sugarLevel === 'No Sugar' || newFood.sugarLevel === 'Low Sugar') earnedPoints += 10;
    const newTotal = healthPoints + earnedPoints;

    setHealthPoints(newTotal);

    // Add point history audit
    const newHistoryItem: PointHistoryItem = {
      id: `pts-${Date.now()}`,
      description: `Logged ${newFood.name} (${newFood.calories} kcal${newFood.healthierChoiceTag ? ' • Healthier Choice' : ''})`,
      points: earnedPoints,
      timestamp: 'Just now',
      type: 'food'
    };
    setPointHistory((prev) => [newHistoryItem, ...prev]);

    // Update current user score in leaderboard
    setLeaderboardUsers((prev) => 
      prev.map((user) => 
        user.isCurrentUser 
          ? { 
              ...user, 
              points: newTotal, 
              recentActivity: `${newFood.name}` 
            } 
          : user
      )
    );

    // Show gamification feedback toast
    setGamificationToast({
      text: `Meal Logged: +${earnedPoints} Health Points!`,
      points: earnedPoints,
      goalTieIn: `Nutritional discipline maintains your 1,850 kcal daily budget.`
    });
    setTimeout(() => setGamificationToast(null), 5000);
  };

  // Handle friend cheer / high-five
  const handleCheerUser = (userId: string) => {
    setLeaderboardUsers((prev) => 
      prev.map((user) => {
        if (user.id === userId) {
          const hasCheered = !user.hasCheered;
          return {
            ...user,
            hasCheered,
            cheersCount: hasCheered ? user.cheersCount + 1 : user.cheersCount - 1
          };
        }
        return user;
      })
    );
  };

  const handleOpenQuickLog = (mode: 'exercise' | 'food') => {
    setQuickLogMode(mode);
    setIsQuickLogOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] flex flex-col text-slate-800 font-sans relative">
      {/* Dynamic Floating Gamification Toast Notification */}
      {gamificationToast && (
        <aside 
          aria-label="Gamification reward notification"
          className="fixed top-18 left-0 right-0 z-50 px-4 pointer-events-none flex justify-center"
        >
          <div className="pointer-events-auto bg-slate-900/95 text-white rounded-2xl p-3.5 shadow-2xl border border-emerald-500/50 backdrop-blur-md max-w-md w-full flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black shrink-0 shadow-xs">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="space-y-0.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Health Reward Unlocked
                </span>
                <span className="text-xs font-black text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded-md">
                  +{gamificationToast.points} pts
                </span>
              </div>
              <p className="text-sm font-black text-white">{gamificationToast.text}</p>
              <p className="text-xs text-emerald-200/90 font-medium flex items-center gap-1 pt-0.5">
                <Target className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{gamificationToast.goalTieIn}</span>
              </p>
            </div>
          </div>
        </aside>
      )}

      {/* Screen Header with Singapore Location, Top Navigation Tabs & Gamified Ticker */}
      <Header 
        goal={userGoal}
        streakDays={streakDays}
        totalPoints={healthPoints}
        activeScreen={activeScreen}
        onSelectScreen={(screen) => setActiveScreen(screen)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 pt-4 pb-28">
        {/* Screen 1: Dashboard */}
        {activeScreen === 'dashboard' && (
          <DashboardScreen
            exercises={exercises}
            foods={foods}
            goal={userGoal}
            timeRange={timeRange}
            onSelectTimeRange={setTimeRange}
            onNavigateToScreen={(screen) => setActiveScreen(screen)}
            onOpenQuickLog={handleOpenQuickLog}
            totalPoints={healthPoints}
            streakDays={streakDays}
            badges={badges}
            leaderboardUsers={leaderboardUsers}
            pointRules={pointRules}
            pointHistory={pointHistory}
            onCheerUser={handleCheerUser}
          />
        )}

        {/* Screen 2: Activity Page */}
        {activeScreen === 'activity' && (
          <ActivityScreen
            exercises={exercises}
            timeRange={timeRange}
            onSelectTimeRange={setTimeRange}
            onOpenQuickLog={() => handleOpenQuickLog('exercise')}
          />
        )}

        {/* Screen 3: Consumption Tracking Page */}
        {activeScreen === 'consumption' && (
          <ConsumptionScreen
            foods={foods}
            timeRange={timeRange}
            onSelectTimeRange={setTimeRange}
            onOpenQuickLog={() => handleOpenQuickLog('food')}
          />
        )}
      </main>

      {/* Bottom User-Friendly Input Widget */}
      <QuickLogWidget
        isOpen={isQuickLogOpen}
        activeMode={quickLogMode}
        onClose={() => setIsQuickLogOpen(false)}
        onOpen={handleOpenQuickLog}
        onAddExercise={handleAddExercise}
        onAddFood={handleAddFood}
        onSwitchMode={setQuickLogMode}
      />

      {/* Bottom Navigation Bar */}
      <Navigation
        activeScreen={activeScreen}
        onSelectScreen={setActiveScreen}
      />
    </div>
  );
}
