import { useState, useEffect, type FormEvent } from 'react';
import { 
  Flame, 
  Utensils, 
  Plus, 
  X, 
  Check, 
  Heart, 
  Timer, 
  Calendar, 
  Clock, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Minus,
  Maximize2
} from 'lucide-react';
import { ExerciseActivity, FoodConsumption, HRZone, MealType, ActivityCategory } from '../types';

interface QuickLogWidgetProps {
  isOpen: boolean;
  activeMode: 'exercise' | 'food';
  onClose: () => void;
  onOpen: (mode: 'exercise' | 'food') => void;
  onAddExercise: (exercise: ExerciseActivity) => void;
  onAddFood: (food: FoodConsumption) => void;
  onSwitchMode: (mode: 'exercise' | 'food') => void;
}

export const QuickLogWidget = ({
  isOpen,
  activeMode,
  onClose,
  onOpen,
  onAddExercise,
  onAddFood,
  onSwitchMode,
}: QuickLogWidgetProps) => {
  // Exercise state
  const [exerciseName, setExerciseName] = useState('50m Lap Swim');
  const [exerciseCategory, setExerciseCategory] = useState<ActivityCategory>('low-impact');
  const [exerciseDuration, setExerciseDuration] = useState('45');
  const [exerciseCalories, setExerciseCalories] = useState('380');
  const [exerciseHeartRate, setExerciseHeartRate] = useState('134');
  const [exerciseZone, setExerciseZone] = useState<HRZone>('Zone 2 Aerobic');
  const [exerciseBodyPart, setExerciseBodyPart] = useState<'full-body' | 'lower-body' | 'upper-body' | 'core' | 'cardio-engine'>('full-body');
  const [exerciseNotes, setExerciseNotes] = useState('');

  // Food state
  const [foodName, setFoodName] = useState('Hainanese Steamed Chicken Rice (Less Rice)');
  const [foodMealType, setFoodMealType] = useState<MealType>('lunch');
  const [foodCalories, setFoodCalories] = useState('520');
  const [foodProtein, setFoodProtein] = useState('36');
  const [foodCarbs, setFoodCarbs] = useState('56');
  const [foodFat, setFoodFat] = useState('14');
  const [foodSugarLevel, setFoodSugarLevel] = useState<'No Sugar' | 'Low Sugar' | 'Medium' | 'High'>('Low Sugar');
  const [isHealthierChoice, setIsHealthierChoice] = useState(true);
  const [foodNotes, setFoodNotes] = useState('');

  // Feedback notification
  const [successMsg, setSuccessMsg] = useState('');

  // Minimized state
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsMinimized(false);
    }
  }, [isOpen]);

  // Singapore Quick Presets for fast tapping on mobile
  const exercisePresets = [
    { name: '50m Lap Swim', duration: 45, cal: 390, hr: 132, zone: 'Zone 2 Aerobic' as HRZone, cat: 'low-impact' as ActivityCategory, body: 'full-body' as const },
    { name: 'Punggol PCN Run', duration: 30, cal: 340, hr: 160, zone: 'Zone 4 Threshold' as HRZone, cat: 'cardio' as ActivityCategory, body: 'lower-body' as const },
    { name: 'Brisk Walking', duration: 40, cal: 180, hr: 110, zone: 'Zone 1 Recovery' as HRZone, cat: 'low-impact' as ActivityCategory, body: 'lower-body' as const },
    { name: 'Singles Tennis', duration: 60, cal: 480, hr: 145, zone: 'Zone 3 Cardio' as HRZone, cat: 'sports' as ActivityCategory, body: 'full-body' as const },
    { name: 'Gym Barbell Squats', duration: 50, cal: 310, hr: 125, zone: 'Zone 2 Aerobic' as HRZone, cat: 'strength' as ActivityCategory, body: 'lower-body' as const },
    { name: 'Badminton Match', duration: 45, cal: 380, hr: 140, zone: 'Zone 3 Cardio' as HRZone, cat: 'sports' as ActivityCategory, body: 'full-body' as const },
  ];

  const foodPresets = [
    { name: 'Kaya Butter Toast (2 pcs)', meal: 'breakfast' as MealType, cal: 280, p: 6, c: 36, f: 12, sugar: 'Medium' as const, hc: false },
    { name: 'Kopi-O Kosong (Black Coffee)', meal: 'breakfast' as MealType, cal: 12, p: 1, c: 2, f: 0, sugar: 'No Sugar' as const, hc: true },
    { name: 'Hainanese Steamed Chicken Rice', meal: 'lunch' as MealType, cal: 520, p: 38, c: 58, f: 14, sugar: 'Low Sugar' as const, hc: true },
    { name: 'Sliced Fish Soup Bee Hoon', meal: 'dinner' as MealType, cal: 360, p: 32, c: 46, f: 4, sugar: 'No Sugar' as const, hc: true },
    { name: 'Thunder Tea Brown Rice', meal: 'dinner' as MealType, cal: 410, p: 18, c: 62, f: 10, sugar: 'No Sugar' as const, hc: true },
    { name: 'Iced Barley (Less Sweet)', meal: 'tea-break' as MealType, cal: 110, p: 1, c: 26, f: 0, sugar: 'Low Sugar' as const, hc: true },
  ];

  const handleExercisePreset = (preset: typeof exercisePresets[0]) => {
    setExerciseName(preset.name);
    setExerciseDuration(preset.duration.toString());
    setExerciseCalories(preset.cal.toString());
    setExerciseHeartRate(preset.hr.toString());
    setExerciseZone(preset.zone);
    setExerciseCategory(preset.cat);
    setExerciseBodyPart(preset.body);
  };

  const handleFoodPreset = (preset: typeof foodPresets[0]) => {
    setFoodName(preset.name);
    setFoodMealType(preset.meal);
    setFoodCalories(preset.cal.toString());
    setFoodProtein(preset.p.toString());
    setFoodCarbs(preset.c.toString());
    setFoodFat(preset.f.toString());
    setFoodSugarLevel(preset.sugar);
    setIsHealthierChoice(preset.hc);
  };

  const handleSaveExercise = (e: FormEvent) => {
    e.preventDefault();
    const newEx: ExerciseActivity = {
      id: `act-${Date.now()}`,
      name: exerciseName.trim() || 'General Exercise',
      category: exerciseCategory,
      date: '2026-09-06',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationMin: Number(exerciseDuration) || 30,
      activeCalories: Number(exerciseCalories) || 250,
      avgHeartRate: Number(exerciseHeartRate) || 130,
      hrZone: exerciseZone,
      targetBodyPart: exerciseBodyPart,
      notes: exerciseNotes.trim() || 'Keyed in manually via health tracker widget',
    };
    onAddExercise(newEx);
    setSuccessMsg(`Logged "${newEx.name}" (+${newEx.activeCalories} kcal burnt)!`);
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1400);
  };

  const handleSaveFood = (e: FormEvent) => {
    e.preventDefault();
    const newFd: FoodConsumption = {
      id: `food-${Date.now()}`,
      name: foodName.trim() || 'Healthy Meal',
      mealType: foodMealType,
      date: '2026-09-06',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calories: Number(foodCalories) || 400,
      proteinGrams: Number(foodProtein) || 20,
      carbsGrams: Number(foodCarbs) || 45,
      fatGrams: Number(foodFat) || 10,
      sugarLevel: foodSugarLevel,
      healthierChoiceTag: isHealthierChoice,
      notes: foodNotes.trim() || 'Keyed in via nutrition widget',
    };
    onAddFood(newFd);
    setSuccessMsg(`Logged "${newFd.name}" (${newFd.calories} kcal intake)!`);
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1400);
  };

  if (!isOpen) {
    return (
      <aside 
        aria-label="Activity input dock"
        className="fixed bottom-[74px] left-0 right-0 z-30 px-4 pointer-events-none"
      >
        <div className="max-w-4xl mx-auto flex justify-end pointer-events-auto">
          <div className="bg-white/95 rounded-full p-2 shadow-xl border border-emerald-100 flex items-center gap-2 backdrop-blur-md">
            <button
              id="open-log-exercise-dock-btn"
              type="button"
              onClick={() => {
                onOpen('exercise');
              }}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-black px-4 py-2.5 rounded-full transition-all shadow-sm min-h-[44px] touch-manipulation active:scale-95 cursor-pointer"
            >
              <Flame className="w-4 h-4 fill-white" />
              <span>Key In Exercise</span>
            </button>
            <button
              id="open-log-food-dock-btn"
              type="button"
              onClick={() => {
                onOpen('food');
              }}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-black px-4 py-2.5 rounded-full transition-all shadow-sm min-h-[44px] touch-manipulation active:scale-95 cursor-pointer"
            >
              <Utensils className="w-4 h-4" />
              <span>Key In Food</span>
            </button>
          </div>
        </div>
      </aside>
    );
  }

  if (isMinimized) {
    return (
      <aside 
        aria-label="Health record input minimized dock"
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
      >
        <div 
          id="quick-log-minimized-card"
          className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl p-2 sm:p-2.5 flex items-center gap-2 max-w-sm ring-1 ring-slate-900/5"
        >
          {/* Re-expand trigger button */}
          <button
            id="restore-quick-log-btn"
            type="button"
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 hover:bg-slate-50 p-1 rounded-xl transition-colors text-left cursor-pointer group"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              activeMode === 'exercise' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
            }`}>
              {activeMode === 'exercise' ? (
                <Flame className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              ) : (
                <Utensils className="w-4 h-4 text-amber-500" />
              )}
            </div>
            <div className="pr-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-slate-800 group-hover:text-emerald-700">
                  {activeMode === 'exercise' ? 'Key In Exercise' : 'Key In Food'}
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                  Minimized
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate max-w-[130px] sm:max-w-[170px]">
                {activeMode === 'exercise' ? (exerciseName || 'Drafting workout') : (foodName || 'Drafting meal')}
              </p>
            </div>
          </button>

          {/* Quick toggle mode and controls */}
          <div className="flex items-center gap-1 border-l border-slate-200 pl-1.5">
            <button
              type="button"
              onClick={() => onSwitchMode(activeMode === 'exercise' ? 'food' : 'exercise')}
              title={`Switch to ${activeMode === 'exercise' ? 'Food' : 'Exercise'}`}
              className="text-[10px] font-bold text-slate-600 hover:text-slate-900 px-1.5 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {activeMode === 'exercise' ? 'Food' : 'Ex.'}
            </button>

            {/* Expand button */}
            <button
              id="expand-quick-log-btn"
              type="button"
              onClick={() => setIsMinimized(false)}
              title="Expand pop-up"
              className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* Close button */}
            <button
              id="close-minimized-quick-log-btn"
              type="button"
              onClick={() => {
                setIsMinimized(false);
                onClose();
              }}
              title="Close pop-up"
              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside 
      aria-label="Activity input modal dialog"
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        id="quick-log-modal-card"
        className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl border border-slate-200 shadow-2xl p-4 sm:p-5 space-y-3 max-h-[84vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              Health Tracker Quick Log
            </span>
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              {activeMode === 'exercise' ? 'Key In Exercise Activity' : 'Key In Food & Drink'}
            </h3>
          </div>
          <div className="flex items-center gap-1.5">
            {/* Minimize button */}
            <button
              id="minimize-quick-log-btn"
              type="button"
              onClick={() => setIsMinimized(true)}
              title="Minimize pop-up"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors touch-manipulation cursor-pointer"
              aria-label="Minimize"
            >
              <Minus className="w-4 h-4" />
            </button>
            {/* Close button */}
            <button
              id="close-quick-log-btn"
              type="button"
              onClick={() => {
                setIsMinimized(false);
                onClose();
              }}
              title="Close pop-up"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors touch-manipulation cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mode Toggle Switcher */}
        <div className="grid grid-cols-2 gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => onSwitchMode('exercise')}
            className={`py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 min-h-[38px] transition-all cursor-pointer ${
              activeMode === 'exercise'
                ? 'bg-white text-emerald-700 shadow-xs border border-emerald-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
            <span>1. Exercise</span>
          </button>

          <button
            type="button"
            onClick={() => onSwitchMode('food')}
            className={`py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 min-h-[38px] transition-all cursor-pointer ${
              activeMode === 'food'
                ? 'bg-white text-amber-700 shadow-xs border border-amber-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-amber-500" />
            <span>2. Food</span>
          </button>
        </div>

        {/* Success toast banner */}
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* MODE 1: EXERCISE INPUT FORM */}
        {activeMode === 'exercise' ? (
          <form onSubmit={handleSaveExercise} className="space-y-3">
            {/* Quick Presets */}
            <div>
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Quick Presets:
              </span>
              <div className="flex flex-wrap gap-1">
                {exercisePresets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleExercisePreset(p)}
                    className="text-[10px] font-bold bg-emerald-50 border border-emerald-200/80 text-emerald-900 px-2 py-1 rounded-lg hover:bg-emerald-100 transition-colors touch-manipulation cursor-pointer"
                  >
                    {p.name} ({p.duration}m)
                  </button>
                ))}
              </div>
            </div>

            {/* Exercise Name */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                Activity Name *
              </label>
              <input
                type="text"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                placeholder="e.g. Swims, tennis, walk, runs"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-emerald-500 focus:bg-white min-h-[38px]"
                required
              />
            </div>

            {/* Duration & Calories */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5 flex items-center gap-1">
                  <Timer className="w-3 h-3 text-emerald-600" />
                  <span>Duration (Mins) *</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="360"
                  value={exerciseDuration}
                  onChange={(e) => setExerciseDuration(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-emerald-500 focus:bg-white min-h-[38px]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-emerald-600" />
                  <span>Calories (kcal) *</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="2500"
                  value={exerciseCalories}
                  onChange={(e) => setExerciseCalories(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-emerald-500 focus:bg-white min-h-[38px]"
                  required
                />
              </div>
            </div>

            {/* Heart Rate & Zone */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-500" />
                  <span>Avg Heart Rate</span>
                </label>
                <input
                  type="number"
                  min="40"
                  max="220"
                  value={exerciseHeartRate}
                  onChange={(e) => setExerciseHeartRate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-emerald-500 focus:bg-white min-h-[38px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                  Heart Rate Zone
                </label>
                <select
                  value={exerciseZone}
                  onChange={(e) => setExerciseZone(e.target.value as HRZone)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 focus:outline-emerald-500 focus:bg-white min-h-[38px]"
                >
                  <option value="Zone 1 Recovery">Zone 1 (&lt;115 bpm)</option>
                  <option value="Zone 2 Aerobic">Zone 2 (115-135 bpm)</option>
                  <option value="Zone 3 Cardio">Zone 3 (135-155 bpm)</option>
                  <option value="Zone 4 Threshold">Zone 4 (155-170 bpm)</option>
                  <option value="Zone 5 Peak">Zone 5 (&gt;170 bpm)</option>
                </select>
              </div>
            </div>

            {/* Target Body Focus */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                Focus / Muscle Group
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {(['full-body', 'lower-body', 'cardio-engine'] as const).map((part) => (
                  <button
                    key={part}
                    type="button"
                    onClick={() => setExerciseBodyPart(part)}
                    className={`py-1.5 px-1 rounded-lg font-bold border transition-all touch-manipulation capitalize cursor-pointer ${
                      exerciseBodyPart === part
                        ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {part.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <button
              id="submit-exercise-log-btn"
              type="submit"
              className="btn w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-xs transition-all -translate-y-0.5 flex items-center justify-center gap-1.5 min-h-[42px] touch-manipulation cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Record Workout</span>
            </button>
          </form>
        ) : (
          /* MODE 2: FOOD INPUT FORM */
          <form onSubmit={handleSaveFood} className="space-y-3">
            {/* Quick Presets */}
            <div>
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Quick Local Presets:
              </span>
              <div className="flex flex-wrap gap-1">
                {foodPresets.map((f, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleFoodPreset(f)}
                    className="text-[10px] font-bold bg-amber-50 border border-amber-200/80 text-amber-900 px-2 py-1 rounded-lg hover:bg-amber-100 transition-colors touch-manipulation cursor-pointer"
                  >
                    {f.name} ({f.cal}k)
                  </button>
                ))}
              </div>
            </div>

            {/* Food Name */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                Food / Drink Name *
              </label>
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="e.g. Chicken rice, fish soup, toast"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-amber-500 focus:bg-white min-h-[38px]"
                required
              />
            </div>

            {/* Meal Type & Calories */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                  Meal *
                </label>
                <select
                  value={foodMealType}
                  onChange={(e) => setFoodMealType(e.target.value as MealType)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 focus:outline-amber-500 focus:bg-white min-h-[38px]"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="supper">Supper</option>
                  <option value="tea-break">Tea Break</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-600" />
                  <span>Calories (kcal) *</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="3000"
                  value={foodCalories}
                  onChange={(e) => setFoodCalories(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:outline-amber-500 focus:bg-white min-h-[38px]"
                  required
                />
              </div>
            </div>

            {/* Sugar Level & Healthier Choice */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                  Sugar Rating
                </label>
                <select
                  value={foodSugarLevel}
                  onChange={(e) => setFoodSugarLevel(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 focus:outline-amber-500 focus:bg-white min-h-[38px]"
                >
                  <option value="No Sugar">Grade A (No Sugar)</option>
                  <option value="Low Sugar">Grade B (Low Sugar)</option>
                  <option value="Medium">Grade C (Medium)</option>
                  <option value="High">Grade D (High Sugar)</option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 rounded-xl px-2.5 py-1.5 w-full cursor-pointer min-h-[38px]">
                  <input
                    type="checkbox"
                    checked={isHealthierChoice}
                    onChange={(e) => setIsHealthierChoice(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-[11px] font-bold text-emerald-950">
                    Healthier Choice
                  </span>
                </label>
              </div>
            </div>

            {/* Macros Estimate (Protein, Carbs, Fat) */}
            <div>
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                Estimated Macros:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <div>
                  <label className="block text-[10px] text-slate-600 font-bold">Protein (g)</label>
                  <input
                    type="number"
                    value={foodProtein}
                    onChange={(e) => setFoodProtein(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-600 font-bold">Carbs (g)</label>
                  <input
                    type="number"
                    value={foodCarbs}
                    onChange={(e) => setFoodCarbs(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-600 font-bold">Fats (g)</label>
                  <input
                    type="number"
                    value={foodFat}
                    onChange={(e) => setFoodFat(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              id="submit-food-log-btn"
              type="submit"
              className="btn w-full bg-amber-500 hover:bg-amber-600 text-white font-black text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-xs transition-all -translate-y-0.5 flex items-center justify-center gap-1.5 min-h-[42px] touch-manipulation cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Record Meal</span>
            </button>
          </form>
        )}
      </div>
    </aside>
  );
};
