import { Flame, Target, Sparkles } from 'lucide-react';
import { PersonalGoal } from '../types';
import { ScreenId } from './Navigation';
import cuteLogo from '../assets/images/cute_health_logo_1788763096544.jpg';

interface HeaderProps {
  goal: PersonalGoal;
  streakDays: number;
  totalPoints: number;
  activeScreen?: ScreenId;
  onSelectScreen?: (screen: ScreenId) => void;
}

export const Header = ({ 
  goal, 
  streakDays, 
  totalPoints,
  activeScreen = 'dashboard',
  onSelectScreen
}: HeaderProps) => {
  return (
    <header className="bg-white text-slate-800 border-b border-emerald-100 sticky top-0 z-30 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3">
          {/* Brand & Mascot Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div 
              id="app-logo"
              className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-300 to-amber-300 p-0.5 shadow-md shadow-emerald-200/80 shrink-0 transition-transform duration-200 hover:scale-105 hover:rotate-3 active:scale-95 cursor-pointer group"
              title="Health is Wealth Mascot"
            >
              <div className="w-full h-full bg-white rounded-[14px] overflow-hidden flex items-center justify-center relative">
                <img 
                  src={cuteLogo} 
                  alt="Cute Health is Wealth mascot" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Cute mini floating sparkle badge */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-2.5 h-2.5 text-amber-950 fill-amber-950" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-black text-emerald-800 tracking-tight leading-none">
                  HEALTH <span className="text-amber-500">IS</span> WEALTH
                </h1>
              </div>
            </div>
          </div>

          {/* Desktop Tab Navigation */}
          {onSelectScreen && (
            <nav 
              aria-label="Desktop Top Navigation"
              className="hidden md:flex items-center gap-1.5 bg-emerald-50 p-1 rounded-2xl border border-emerald-100/80"
            >
              <button
                type="button"
                onClick={() => onSelectScreen('dashboard')}
                className={`tab-btn px-5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 ${
                  activeScreen === 'dashboard'
                    ? 'bg-emerald-500 text-white shadow-sm -translate-y-0.5'
                    : 'text-emerald-700 hover:bg-emerald-100/60'
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => onSelectScreen('activity')}
                className={`tab-btn px-5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 ${
                  activeScreen === 'activity'
                    ? 'bg-emerald-500 text-white shadow-sm -translate-y-0.5'
                    : 'text-emerald-700 hover:bg-emerald-100/60'
                }`}
              >
                Activity
              </button>
              <button
                type="button"
                onClick={() => onSelectScreen('consumption')}
                className={`tab-btn px-5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 ${
                  activeScreen === 'consumption'
                    ? 'bg-emerald-500 text-white shadow-sm -translate-y-0.5'
                    : 'text-emerald-700 hover:bg-emerald-100/60'
                }`}
              >
                Consumption
              </button>
            </nav>
          )}

          {/* User Profile & Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              type="button"
              id="streak-badge"
              onClick={() => {
                if (onSelectScreen) onSelectScreen('dashboard');
                setTimeout(() => {
                  document.getElementById('gamification-hub')?.scrollIntoView({ behavior: 'smooth' });
                }, 80);
              }}
              className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200/90 px-2.5 py-1.5 rounded-xl text-amber-800 text-xs sm:text-sm font-bold shadow-2xs cursor-pointer transition-all active:scale-95 touch-manipulation"
              title="Daily Tracking Streak - Click to view League & Badges"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{streakDays}d Streak</span>
            </button>

            <button 
              type="button"
              id="points-badge"
              onClick={() => {
                if (onSelectScreen) onSelectScreen('dashboard');
                setTimeout(() => {
                  document.getElementById('gamification-hub')?.scrollIntoView({ behavior: 'smooth' });
                }, 80);
              }}
              className="hidden sm:flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 px-2.5 py-1.5 rounded-xl text-emerald-800 text-xs sm:text-sm font-bold shadow-2xs cursor-pointer transition-all active:scale-95 touch-manipulation"
              title="Health Wealth Gamified Score - Click to view Points & Leaderboard"
            >
              <Target className="w-4 h-4 text-emerald-600" />
              <span>{totalPoints.toLocaleString()} pts</span>
            </button>

            {/* SG User Pill & Avatar */}
            <div className="flex items-center gap-2 pl-1 border-l border-emerald-100">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-emerald-600 tracking-wider uppercase leading-tight">SG USER</p>
                <p className="text-xs font-bold text-slate-800 leading-tight">Lee Wei-Xiong</p>
              </div>
              <div 
                className="w-9 h-9 bg-emerald-200 text-emerald-900 font-extrabold rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xs"
                title="Lee Wei-Xiong (SG Citizen Profile)"
              >
                WX
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

