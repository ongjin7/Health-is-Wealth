import { LayoutDashboard, Activity, Utensils } from 'lucide-react';

export type ScreenId = 'dashboard' | 'activity' | 'consumption';

interface NavigationProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
}

export const Navigation = ({ activeScreen, onSelectScreen }: NavigationProps) => {
  const navItems = [
    {
      id: 'dashboard' as ScreenId,
      label: 'Dashboard',
      sublabel: 'Summary & Goals',
      icon: LayoutDashboard,
    },
    {
      id: 'activity' as ScreenId,
      label: 'Activity',
      sublabel: 'Workouts & HR',
      icon: Activity,
    },
    {
      id: 'consumption' as ScreenId,
      label: 'Consumption',
      sublabel: 'Nutrition & Food',
      icon: Utensils,
    },
  ];

  return (
    <nav 
      id="main-navigation"
      aria-label="Main Navigation"
      className="bg-white/95 backdrop-blur-md border-t border-emerald-100 fixed bottom-0 left-0 right-0 z-40 shadow-[0_-4px_16px_rgba(16,185,129,0.08)]"
    >
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-3 gap-1.5 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => {
                  onSelectScreen(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-150 min-h-[54px] touch-manipulation ${
                  isActive
                    ? 'bg-emerald-500 text-white font-black shadow-md shadow-emerald-200 -translate-y-0.5'
                    : 'text-emerald-900/70 hover:text-emerald-950 hover:bg-emerald-50/80 font-bold'
                }`}
              >
                <div className="relative">
                  <Icon 
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'stroke-[2.5px] scale-110 text-white' : 'text-emerald-700'
                    }`} 
                  />
                  {isActive && (
                    <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-emerald-500" />
                  )}
                </div>
                <span className="text-xs sm:text-sm tracking-tight mt-0.5 leading-tight">
                  {item.label}
                </span>
                <span className={`text-[10px] hidden sm:block ${isActive ? 'text-emerald-100 font-medium' : 'text-emerald-600/70'}`}>
                  {item.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
