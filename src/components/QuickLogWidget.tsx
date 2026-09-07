import { useState, type FormEvent } from 'react';
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
  ChevronUp
} from 'lucide-react';
import { ExerciseActivity, FoodConsumption, HRZone, MealType, ActivityCategory } from '../types';

interface QuickLogWidgetProps {
  isOpen: boolean;
  activeMode: 'exercise' | 'food';
  onClose: () => void;
  onAddExercise: (exercise: ExerciseActivity) => void;
  onAddFood: (food: FoodConsumption) => void;
  onSwitchMode: (mode: 'exercise' | 'food') => void;
}

export const QuickLogWidget = ({
  isOpen,
  activeMode,
  onClose,
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
                onSwitchMode('exercise');
              }}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-black px-4 py-2.5 rounded-full transition-all shadow-sm min-h-[44px] touch-manipulation active:scale-95"
            >
              <Flame className="w-4 h-4 fill-white" />
              <span>Key In Exercise</span>
            </button>
            <button
              id="open-log-food-dock-btn"
              type="button"
              onClick={() => {
                onSwitchMode('food');
              }}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-black px-4 py-2.5 rounded-full transition-all shadow-sm min-h-[44px] touch-manipulation active:scale-95"
            >
              <Utensils className="w-4 h-4" />
              <span>Key In Food</span>
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
    >
      <div 
        id="quick-log-modal-card"
        className="bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] border border-emerald-100 shadow-2xl p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-2 border-b border-emerald-100/80 pb-3.5">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              Health Tracker Input Widget
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
              Key In Your Daily Health Record
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 flex items-center justify-center transition-colors touch-manipulation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Toggle Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-emerald-50/70 p-1.5 rounded-2xl border border-emerald-100">
          <button
            type="button"
            onClick={() => onSwitchMode('exercise')}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 min-h-[44px] transition-all ${
              activeMode === 'exercise'
                ? 'bg-white text-emerald-700 shadow-sm border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900 font-bold'
            }`}
          >
            <Flame className="w-4 h-4 text-emerald-500 fill-emerald-500" />
            <span>1. Key In Exercise</span>
          </button>

          <button
            type="button"
            onClick={() => onSwitchMode('food')}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 min-h-[44px] transition-all ${
              activeMode === 'food'
                ? 'bg-white text-amber-700 shadow-sm border border-amber-200'
                : 'text-slate-600 hover:text-slate-900 font-bold'
            }`}
          >
            <Utensils className="w-4 h-4 text-amber-500" />
            <span>2. Key In Food</span>
          </button>
        </div>

        {/* Success toast banner */}
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* MODE 1: EXERCISE INPUT FORM */}
        {activeMode === 'exercise' ? (
          <form onSubmit={handleSaveExercise} className="space-y-3.5">
            {/* Quick Presets */}
            <div>
              <span className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                Quick Tap Singapore Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {exercisePresets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleExercisePreset(p)}
                    className="text-[11px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-900 px-2.5 py-1.5 rounded-xl hover:bg-emerald-100 transition-colors touch-manipulation"
                  >
                    {p.name} ({p.duration}m)
                  </button>
                ))}
              </div>
            </div>

            {/* Exercise Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Exercise Activity Name *
              </label>
              <input
                type="text"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                placeholder="e.g. Swims, tennis, walk, basketball, runs"
                className="w-full bg-emerald-50/40 border border-emerald-200/80 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-slate-900 focus:outline-emerald-500 focus:bg-white min-h-[44px]"
                required
              />
            </div>

            {/* Duration & Calories */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Duration (Mins) *</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="360"
                  value={exerciseDuration}
                  onChange={(e) => setExerciseDuration(e.target.value)}
                  className="w-full bg-emerald-50/40 border border-emerald-200/80 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-slate-900 focus:outline-emerald-500 focus:bg-white min-h-[44px]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Calories Burnt (kcal) *</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="2500"
                  value={exerciseCalories}
                  onChange={(e) => setExerciseCalories(e.target.value)}
                  className="w-full bg-emerald-50/40 border border-emerald-200/80 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-slate-900 focus:outline-emerald-500 focus:bg-white min-h-[44px]"
                  required
                />
              </div>
            </div>

            {/* Heart Rate & Zone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>Avg Heart Rate (bpm)</span>
                </label>
                <input
                  type="number"
                  min="40"
                  max="220"
                  value={exerciseHeartRate}
                  onChange={(e) => setExerciseHeartRate(e.target.value)}
                  className="w-full bg-emerald-50/40 border border-emerald-200/80 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-slate-900 focus:outline-emerald-500 focus:bg-white min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Heart Rate Zone Recorded
                </label>
                <select
                  value={exerciseZone}
                  onChange={(e) => setExerciseZone(e.target.value as HRZone)}
                  className="w-full bg-emerald-50/40 border border-emerald-200/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-emerald-500 focus:bg-white min-h-[44px]"
                >
                  <option value="Zone 1 Recovery">Zone 1 Recovery (&lt;115 bpm)</option>
                  <option value="Zone 2 Aerobic">Zone 2 Aerobic (115-135 bpm)</option>
                  <option value="Zone 3 Cardio">Zone 3 Cardio (135-155 bpm)</option>
                  <option value="Zone 4 Threshold">Zone 4 Threshold (155-170 bpm)</option>
                  <option value="Zone 5 Peak">Zone 5 Peak (&gt;170 bpm)</option>
                </select>
              </div>
            </div>

            {/* Target Body Focus */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Exercise Focus / Muscle Group
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {(['full-body', 'lower-body', 'cardio-engine'] as const).map((part) => (
                  <button
                    key={part}
                    type="button"
                    onClick={() => setExerciseBodyPart(part)}
                    className={`py-2 px-1 rounded-xl font-bold border transition-all touch-manipulation capitalize ${
                      exerciseBodyPart === part
                        ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                        : 'bg-emerald-50/40 text-slate-600 border-emerald-100'
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
              className="btn w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm sm:text-base py-3.5 px-4 rounded-2xl shadow-sm transition-all -translate-y-0.5 flex items-center justify-center gap-2 min-h-[48px] touch-manipulation"
            >
              <Check className="w-5 h-5" />
              <span>Record Workout & Update Burnt Calories</span>
            </button>
          </form>
        ) : (
          /* MODE 2: FOOD INPUT FORM */
          <form onSubmit={handleSaveFood} className="space-y-3.5">
            {/* Quick Presets */}
            <div>
              <span className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                Quick Tap Local Food Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {foodPresets.map((f, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleFoodPreset(f)}
                    className="text-[11px] font-bold bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-1.5 rounded-xl hover:bg-amber-100 transition-colors touch-manipulation"
                  >
                    {f.name} ({f.cal} kcal)
                  </button>
                ))}
              </div>
            </div>

            {/* Food Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Food or Drink Name *
              </label>
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="e.g. Kaya butter toast, ice coffee, prawn noodle, chicken rice"
                className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-slate-900 focus:outline-amber-500 focus:bg-white min-h-[44px]"
                required
              />
            </div>

            {/* Meal Type & Calories */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Meal Category *
                </label>
                <select
                  value={foodMealType}
                  onChange={(e) => setFoodMealType(e.target.value as MealType)}
                  className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-amber-500 focus:bg-white min-h-[44px]"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="supper">Supper</option>
                  <option value="tea-break">Tea Break</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>Calories Estimate (kcal) *</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="3000"
                  value={foodCalories}
                  onChange={(e) => setFoodCalories(e.target.value)}
                  className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm sm:text-base text-slate-900 focus:outline-amber-500 focus:bg-white min-h-[44px]"
                  required
                />
              </div>
            </div>

            {/* Sugar Level & Healthier Choice */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Sugar Rating
                </label>
                <select
                  value={foodSugarLevel}
                  onChange={(e) => setFoodSugarLevel(e.target.value as any)}
                  className="w-full bg-amber-50/40 border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-amber-500 focus:bg-white min-h-[44px]"
                >
                  <option value="No Sugar">Grade A (No Sugar)</option>
                  <option value="Low Sugar">Grade B (Low Sugar)</option>
                  <option value="Medium">Grade C (Medium Sugar)</option>
                  <option value="High">Grade D (High Sugar)</option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2.5 w-full cursor-pointer min-h-[44px]">
                  <input
                    type="checkbox"
                    checked={isHealthierChoice}
                    onChange={(e) => setIsHealthierChoice(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-emerald-950">
                    Healthier Choice
                  </span>
                </label>
              </div>
            </div>

            {/* Macros Estimate (Protein, Carbs, Fat) */}
            <div>
              <span className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
                Estimated Macros (Grams):
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-600 font-bold">Protein (g)</label>
                  <input
                    type="number"
                    value={foodProtein}
                    onChange={(e) => setFoodProtein(e.target.value)}
                    className="w-full bg-emerald-50/40 border border-emerald-200/80 rounded-lg px-2 py-1.5 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-600 font-bold">Carbs (g)</label>
                  <input
                    type="number"
                    value={foodCarbs}
                    onChange={(e) => setFoodCarbs(e.target.value)}
                    className="w-full bg-blue-50/40 border border-blue-200/80 rounded-lg px-2 py-1.5 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-600 font-bold">Fats (g)</label>
                  <input
                    type="number"
                    value={foodFat}
                    onChange={(e) => setFoodFat(e.target.value)}
                    className="w-full bg-rose-50/40 border border-rose-200/80 rounded-lg px-2 py-1.5 text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              id="submit-food-log-btn"
              type="submit"
              className="btn w-full bg-amber-500 hover:bg-amber-600 text-white font-black text-sm sm:text-base py-3.5 px-4 rounded-2xl shadow-sm transition-all -translate-y-0.5 flex items-center justify-center gap-2 min-h-[48px] touch-manipulation"
            >
              <Check className="w-5 h-5" />
              <span>Record Meal & Update Calorie Intake</span>
            </button>
          </form>
        )}
      </div>
    </aside>
  );
};
