import { useState } from 'react';
import { 
  Award, 
  Trophy, 
  Medal, 
  Flame, 
  Sparkles, 
  Heart, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  ThumbsUp, 
  ShieldCheck, 
  Target, 
  Zap, 
  Info, 
  X,
  ChevronRight
} from 'lucide-react';
import { MilestoneBadge, LeaderboardUser, PointRule, PointHistoryItem, PersonalGoal } from '../types';

interface GamificationHubProps {
  totalPoints: number;
  streakDays: number;
  goal: PersonalGoal;
  badges: MilestoneBadge[];
  leaderboardUsers: LeaderboardUser[];
  pointRules: PointRule[];
  pointHistory: PointHistoryItem[];
  onCheerUser: (userId: string) => void;
}

export const GamificationHub = ({
  totalPoints,
  streakDays,
  goal,
  badges,
  leaderboardUsers,
  pointRules,
  pointHistory,
  onCheerUser,
}: GamificationHubProps) => {
  const [activeTab, setActiveTab] = useState<'badges' | 'leaderboard' | 'points'>('badges');
  const [selectedBadge, setSelectedBadge] = useState<MilestoneBadge | null>(null);
  const [leaderboardFilter, setLeaderboardFilter] = useState<'friends' | 'all'>('friends');
  const [badgeCategoryFilter, setBadgeCategoryFilter] = useState<'all' | 'unlocked' | 'progress'>('all');

  // Calculate Level & Progress
  // Level 1: 0 - 400
  // Level 2: 401 - 800
  // Level 3: 801 - 1200
  // Level 4: 1201 - 1800 (Current)
  // Level 5: 1801 - 2500 ("Kallang Legend")
  const levelName = totalPoints >= 2500 
    ? 'Level 6: National Fitness Icon'
    : totalPoints >= 1800 
    ? 'Level 5: Kallang Legend' 
    : totalPoints >= 1200 
    ? 'Level 4: Merlion Trailblazer' 
    : totalPoints >= 800 
    ? 'Level 3: Heart Hero' 
    : totalPoints >= 400 
    ? 'Level 2: Active Citizen' 
    : 'Level 1: Health Novice';

  const nextLevelPoints = totalPoints >= 1800 ? 2500 : totalPoints >= 1200 ? 1800 : 1200;
  const prevLevelBase = totalPoints >= 1800 ? 1800 : totalPoints >= 1200 ? 1200 : 800;
  const progressToNextLevel = Math.min(100, Math.round(((totalPoints - prevLevelBase) / (nextLevelPoints - prevLevelBase)) * 100));

  // Sort and rank leaderboard users dynamically
  const sortedUsers = [...leaderboardUsers].sort((a, b) => b.points - a.points);
  const currentUserRank = sortedUsers.findIndex(u => u.isCurrentUser) + 1;
  const nextUserAbove = currentUserRank > 1 ? sortedUsers[currentUserRank - 2] : null;

  // Filtered badges
  const filteredBadges = badges.filter(b => {
    if (badgeCategoryFilter === 'unlocked') return b.isUnlocked;
    if (badgeCategoryFilter === 'progress') return !b.isUnlocked;
    return true;
  });

  const unlockedCount = badges.filter(b => b.isUnlocked).length;

  return (
    <div id="gamification-hub" className="space-y-4">
      {/* Main Gamification Banner & Level Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white rounded-[28px] p-5 sm:p-6 shadow-sm border border-emerald-700/60 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-black uppercase tracking-wider mb-1">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Singapore Health is Wealth League • Gamified Rewards</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {levelName}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 font-medium max-w-xl leading-relaxed">
              Every logged workout and cleaner hawker meal advances your <strong className="text-amber-300">5kg weight loss goal</strong> and strengthens your cardiac reserve.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-amber-400 text-amber-950 text-center px-4 py-2.5 rounded-2xl shadow-sm border border-amber-300">
              <span className="block text-[10px] font-black uppercase tracking-wider text-amber-900">Total Score</span>
              <span className="text-xl sm:text-2xl font-black">{totalPoints.toLocaleString()}</span>
              <span className="block text-[10px] font-bold text-amber-900">Health Pts</span>
            </div>
            <div className="bg-emerald-800/80 border border-emerald-600/80 text-center px-4 py-2.5 rounded-2xl">
              <span className="block text-[10px] font-black uppercase tracking-wider text-emerald-300">Daily Streak</span>
              <span className="text-xl sm:text-2xl font-black text-white flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
                {streakDays}d
              </span>
              <span className="block text-[10px] font-medium text-emerald-300">On Track</span>
            </div>
          </div>
        </div>

        {/* Level Progress Bar & Goal Tie-in */}
        <div className="mt-5 pt-4 border-t border-emerald-700/60">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-emerald-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Progress to {nextLevelPoints >= 2500 ? 'Fitness Icon' : 'Level 5 (Kallang Legend)'}
            </span>
            <span className="text-amber-300 font-black">
              {totalPoints} / {nextLevelPoints} pts ({progressToNextLevel}%)
            </span>
          </div>
          <div className="h-2.5 w-full bg-emerald-950/80 rounded-full overflow-hidden p-0.5 border border-emerald-700/50">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>

          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-emerald-200/90 font-medium">
            <span>
              🎯 <strong className="text-white">Goal Tie-in:</strong> Maintaining habit discipline for 69.5kg target weight & 64 bpm resting HR
            </span>
            {nextUserAbove && (
              <span className="text-amber-300 font-bold bg-emerald-900/90 px-2 py-0.5 rounded-lg border border-emerald-700">
                Rank #{currentUserRank} • Only {nextUserAbove.points - totalPoints} pts to overtake {nextUserAbove.name}!
              </span>
            )}
          </div>
        </div>

        {/* Hub Tab Switcher */}
        <div className="grid grid-cols-3 gap-2 mt-5 bg-emerald-950/70 p-1.5 rounded-2xl border border-emerald-700/50">
          <button
            type="button"
            id="tab-gamification-badges"
            onClick={() => setActiveTab('badges')}
            className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 touch-manipulation ${
              activeTab === 'badges'
                ? 'bg-amber-400 text-amber-950 shadow-sm -translate-y-0.5'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Milestone Badges ({unlockedCount}/{badges.length})</span>
          </button>

          <button
            type="button"
            id="tab-gamification-leaderboard"
            onClick={() => setActiveTab('leaderboard')}
            className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 touch-manipulation ${
              activeTab === 'leaderboard'
                ? 'bg-amber-400 text-amber-950 shadow-sm -translate-y-0.5'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Friends Leaderboard</span>
          </button>

          <button
            type="button"
            id="tab-gamification-points"
            onClick={() => setActiveTab('points')}
            className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 touch-manipulation ${
              activeTab === 'points'
                ? 'bg-amber-400 text-amber-950 shadow-sm -translate-y-0.5'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Point Rules & History</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MILESTONE BADGES */}
      {activeTab === 'badges' && (
        <div className="card bg-white rounded-[28px] border border-emerald-100 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-3">
            <div>
              <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Achievement Milestones & Badges</span>
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Badges unlocked as you achieve endurance distance, nutrition targets, and cardio milestones.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 bg-emerald-50/80 p-1 rounded-xl border border-emerald-100/80">
              <button
                type="button"
                onClick={() => setBadgeCategoryFilter('all')}
                className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                  badgeCategoryFilter === 'all'
                    ? 'bg-emerald-500 text-white font-black shadow-xs'
                    : 'text-emerald-800 hover:text-emerald-950'
                }`}
              >
                All ({badges.length})
              </button>
              <button
                type="button"
                onClick={() => setBadgeCategoryFilter('unlocked')}
                className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                  badgeCategoryFilter === 'unlocked'
                    ? 'bg-emerald-500 text-white font-black shadow-xs'
                    : 'text-emerald-800 hover:text-emerald-950'
                }`}
              >
                Unlocked ({unlockedCount})
              </button>
              <button
                type="button"
                onClick={() => setBadgeCategoryFilter('progress')}
                className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                  badgeCategoryFilter === 'progress'
                    ? 'bg-emerald-500 text-white font-black shadow-xs'
                    : 'text-emerald-800 hover:text-emerald-950'
                }`}
              >
                In Progress ({badges.length - unlockedCount})
              </button>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredBadges.map((badge) => {
              const isUnlocked = badge.isUnlocked;
              const percent = Math.min(100, Math.round((badge.progressCurrent / badge.progressTarget) * 100));

              return (
                <div
                  key={badge.id}
                  id={`badge-card-${badge.id}`}
                  onClick={() => setSelectedBadge(badge)}
                  className={`rounded-2xl p-4 border transition-all cursor-pointer relative group flex flex-col justify-between ${
                    isUnlocked
                      ? 'bg-emerald-50/50 border-emerald-200/90 hover:border-emerald-400 hover:shadow-md'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 opacity-80'
                  }`}
                >
                  <div>
                    {/* Top Row: Icon & Status Tag */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs border ${
                        isUnlocked 
                          ? 'bg-white border-emerald-200 shadow-emerald-100' 
                          : 'bg-slate-200/70 border-slate-300 grayscale'
                      }`}>
                        {badge.icon}
                      </div>
                      <div className="text-right">
                        {isUnlocked ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            UNLOCKED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                            {percent}% DONE
                          </span>
                        )}
                        <span className="block text-[10px] font-bold text-amber-600 mt-0.5">
                          +{badge.pointsReward} pts
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h5 className="font-black text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors">
                      {badge.title}
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                      {badge.description}
                    </p>
                  </div>

                  {/* Goal Tie-in pill */}
                  <div className="mt-3 pt-2.5 border-t border-emerald-100/80">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
                      <span>Goal Progress</span>
                      <span className="text-emerald-800 font-extrabold">
                        {badge.progressCurrent} / {badge.progressTarget} {badge.progressUnit}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          isUnlocked ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-emerald-700 font-bold mt-1.5 flex items-center gap-1 truncate">
                      <Target className="w-3 h-3 shrink-0" />
                      <span>{badge.goalTieIn}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: HYPOTHETICAL FRIENDS LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="card bg-white rounded-[28px] border border-emerald-100 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-3">
            <div>
              <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Connected Friends & Community Leaderboard</span>
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Hypothetical peers sharing health goals in Singapore (Weekly Season 36: Sengkang & Punggol)
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-emerald-50/80 p-1 rounded-xl border border-emerald-100/80">
              <button
                type="button"
                onClick={() => setLeaderboardFilter('friends')}
                className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
                  leaderboardFilter === 'friends'
                    ? 'bg-emerald-500 text-white font-black shadow-xs'
                    : 'text-emerald-800 hover:text-emerald-950'
                }`}
              >
                Friends Circle (6)
              </button>
              <button
                type="button"
                onClick={() => setLeaderboardFilter('all')}
                className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
                  leaderboardFilter === 'all'
                    ? 'bg-emerald-500 text-white font-black shadow-xs'
                    : 'text-emerald-800 hover:text-emerald-950'
                }`}
              >
                All Singapore
              </button>
            </div>
          </div>

          {/* User Status Highlight Banner */}
          <div className="bg-emerald-50 rounded-2xl p-3.5 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow-sm">
                #{currentUserRank}
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-900">
                  You are currently <strong className="text-emerald-700">Rank #{currentUserRank}</strong> among your connected friends!
                </p>
                <p className="text-[11px] text-emerald-700 font-medium">
                  {nextUserAbove ? (
                    <>Log another workout or healthy meal to close the <strong>{nextUserAbove.points - totalPoints} pt</strong> gap with {nextUserAbove.name}.</>
                  ) : (
                    <>You're leading the league! Keep your daily streak intact to stay at #1.</>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center">
              <span className="text-xs font-bold text-slate-600">Overall Goal:</span>
              <span className="text-xs font-black text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                -2.4kg / 5kg (48%)
              </span>
            </div>
          </div>

          {/* Leaderboard Table / Cards */}
          <div className="space-y-2.5">
            {sortedUsers.map((user, idx) => {
              const rank = idx + 1;
              const isCurrentUser = user.isCurrentUser;

              return (
                <div
                  key={user.id}
                  id={`leaderboard-user-${user.id}`}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCurrentUser
                      ? 'bg-emerald-100/60 border-emerald-300 shadow-xs ring-1 ring-emerald-300'
                      : 'bg-white border-slate-200/90 hover:border-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div className="w-8 flex items-center justify-center shrink-0">
                      {rank === 1 ? (
                        <span className="text-2xl" title="1st Place Gold">🥇</span>
                      ) : rank === 2 ? (
                        <span className="text-2xl" title="2nd Place Silver">🥈</span>
                      ) : rank === 3 ? (
                        <span className="text-2xl" title="3rd Place Bronze">🥉</span>
                      ) : (
                        <span className="text-sm font-black text-slate-500">#{rank}</span>
                      )}
                    </div>

                    {/* Avatar & Info */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shrink-0 border ${user.avatarBg}`}>
                      {user.avatarInitials}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-black text-sm sm:text-base ${isCurrentUser ? 'text-emerald-900' : 'text-slate-800'}`}>
                          {user.name}
                        </span>
                        {isCurrentUser && (
                          <span className="text-[10px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                            YOU
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          <Flame className="w-2.5 h-2.5 fill-amber-500" />
                          {user.streakDays}d streak
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span className="text-slate-700 font-bold">{user.goalSummary}</span>
                        <span>•</span>
                        <span className="truncate max-w-[200px] sm:max-w-xs">{user.recentActivity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Points & High-Five action */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                    <div className="sm:text-right">
                      <span className="text-base sm:text-lg font-black text-emerald-700 block leading-tight">
                        {user.points.toLocaleString()} <span className="text-xs font-bold text-slate-500">pts</span>
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {user.badgesCount} badges achieved
                      </span>
                    </div>

                    {!isCurrentUser && (
                      <button
                        type="button"
                        onClick={() => onCheerUser(user.id)}
                        className={`flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-xl border transition-all touch-manipulation active:scale-95 ${
                          user.hasCheered
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                        }`}
                        title="Cheer your friend"
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${user.hasCheered ? 'fill-amber-500 text-amber-600' : 'text-emerald-600'}`} />
                        <span>{user.hasCheered ? 'Cheered!' : 'Cheer'} ({user.cheersCount})</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: POINT RULES & AUDIT HISTORY */}
      {activeTab === 'points' && (
        <div className="card bg-white rounded-[28px] border border-emerald-100 p-5 sm:p-6 shadow-sm space-y-5">
          <div>
            <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Point System & How To Earn</span>
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Transparent point awards tied directly to your overall 6-month body transformation and heart health.
            </p>
          </div>

          {/* Point Rules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pointRules.map((rule) => (
              <div 
                key={rule.id}
                className="bg-emerald-50/40 rounded-2xl p-3.5 border border-emerald-100 flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm shrink-0">
                  +{rule.points}
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-black text-sm text-slate-900">{rule.action}</h5>
                    <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      +{rule.points} pts
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{rule.description}</p>
                  <p className="text-[10px] text-emerald-700 font-bold pt-1 flex items-center gap-1">
                    <Target className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Goal Tie-in: {rule.goalTieIn}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Point History / Audit */}
          <div className="pt-3 border-t border-emerald-100">
            <h5 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-2.5 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Recent Health Point Receipts</span>
            </h5>
            <div className="space-y-2">
              {pointHistory.map((item) => (
                <div 
                  key={item.id}
                  className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/70 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800 block">{item.description}</span>
                      <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                    </div>
                  </div>
                  <span className="font-black text-emerald-700 text-xs sm:text-sm bg-white px-2.5 py-1 rounded-lg border border-slate-200 shrink-0">
                    +{item.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Dialog for Selected Badge Details */}
      {selectedBadge && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedBadge(null)}
        >
          <div 
            className="bg-white max-w-md w-full rounded-3xl p-6 border border-emerald-100 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-4xl shadow-xs">
                {selectedBadge.icon}
              </div>
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xl font-black text-slate-900">{selectedBadge.title}</h4>
                {selectedBadge.isUnlocked && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                    UNLOCKED
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{selectedBadge.description}</p>
            </div>

            <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-600">Points Reward:</span>
                <span className="text-amber-700 font-black">+{selectedBadge.pointsReward} Health Points</span>
              </div>
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-600">Progress Recorded:</span>
                <span className="text-emerald-800 font-black">
                  {selectedBadge.progressCurrent} / {selectedBadge.progressTarget} {selectedBadge.progressUnit}
                </span>
              </div>
              {selectedBadge.unlockedDate && (
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-600">Achieved On:</span>
                  <span className="text-slate-800">{selectedBadge.unlockedDate}</span>
                </div>
              )}
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-amber-600" />
                Direct Tie-In to Overall Goals:
              </span>
              <p className="text-amber-950 font-medium leading-relaxed">
                {selectedBadge.goalTieIn}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedBadge(null)}
              className="btn w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3 rounded-2xl transition-all"
            >
              Close Badge Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
