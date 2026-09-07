import { useState } from 'react';
import { 
  Utensils, 
  Coffee, 
  Moon, 
  Sun, 
  Sunset, 
  Clock, 
  Sparkles, 
  AlertCircle, 
  MapPin, 
  Plus, 
  CheckCircle2, 
  Heart,
  Droplet,
  Flame,
  Info
} from 'lucide-react';
import { FoodConsumption, TimeRange, MealType, NearbyHealthyFood, ConsumptionRecommendation } from '../types';
import { TimeFilterBar } from './TimeFilterBar';
import { NEARBY_HEALTHY_FOODS, CONSUMPTION_RECOMMENDATIONS } from '../data';
import { isDateInTimeRange, TIME_RANGE_LABELS } from '../utils/dateFilter';

interface ConsumptionScreenProps {
  foods: FoodConsumption[];
  timeRange: TimeRange;
  onSelectTimeRange: (range: TimeRange) => void;
  onOpenQuickLog: (mode: 'food') => void;
}

export const ConsumptionScreen = ({
  foods,
  timeRange,
  onSelectTimeRange,
  onOpenQuickLog,
}: ConsumptionScreenProps) => {
  const [selectedMealFilter, setSelectedMealFilter] = useState<'all' | MealType>('all');

  // Filter by time range
  const timeFilteredFoods = foods.filter((fd) => isDateInTimeRange(fd.date, timeRange));

  // Filter by meal type
  const displayFoods = selectedMealFilter === 'all'
    ? timeFilteredFoods
    : timeFilteredFoods.filter((fd) => fd.mealType === selectedMealFilter);

  // Stats
  const totalCalories = displayFoods.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = displayFoods.reduce((sum, item) => sum + item.proteinGrams, 0);
  const totalCarbs = displayFoods.reduce((sum, item) => sum + item.carbsGrams, 0);
  const totalFat = displayFoods.reduce((sum, item) => sum + item.fatGrams, 0);
  const healthierChoiceCount = displayFoods.filter((f) => f.healthierChoiceTag).length;

  const mealFilterOptions: { id: 'all' | MealType; label: string; icon: typeof Sun }[] = [
    { id: 'all', label: 'All Meals', icon: Utensils },
    { id: 'breakfast', label: 'Breakfast', icon: Sun },
    { id: 'lunch', label: 'Lunch', icon: Sun },
    { id: 'tea-break', label: 'Tea Breaks', icon: Coffee },
    { id: 'dinner', label: 'Dinner', icon: Sunset },
    { id: 'supper', label: 'Supper', icon: Moon },
  ];

  const getMealBadgeColor = (meal: MealType) => {
    switch (meal) {
      case 'breakfast':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'lunch':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'tea-break':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'dinner':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'supper':
        return 'bg-purple-100 text-purple-800 border-purple-200';
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
            <Utensils className="w-6 h-6 text-emerald-600" />
            <span>Food Consumption Tracking</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Track local Singapore meals, calories, sugar, and healthier choices
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenQuickLog('food')}
          className="btn bg-emerald-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm hover:bg-emerald-600 transition-all -translate-y-0.5 flex items-center gap-1.5 touch-manipulation shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Key In Food</span>
        </button>
      </div>

      {/* Meal Category Filter Pills */}
      <div className="bg-white p-3 rounded-[24px] border border-emerald-100 shadow-xs">
        <div className="text-[10px] font-black text-emerald-800 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
          <span>Filter by Meal Type</span>
          <span className="text-emerald-700 font-bold">{displayFoods.length} items shown</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {mealFilterOptions.map((opt) => {
            const isSelected = selectedMealFilter === opt.id;
            return (
              <button
                key={opt.id}
                id={`filter-meal-${opt.id}`}
                type="button"
                onClick={() => setSelectedMealFilter(opt.id)}
                className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl transition-all min-h-[38px] touch-manipulation flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-sm -translate-y-0.5 font-black'
                    : 'bg-emerald-50/70 text-emerald-800/80 hover:bg-emerald-100 hover:text-emerald-950 font-bold'
                }`}
              >
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Aggregate Nutrition & Macro Summary Bar matching Vibrant Palette cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 shadow-xs">
          <span className="block text-[10px] text-amber-600 font-black uppercase">Total Intake</span>
          <span className="text-lg sm:text-xl font-black text-amber-700">
            {totalCalories.toLocaleString()}
          </span>
          <span className="block text-[10px] text-amber-800 font-medium">kcal total</span>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 shadow-xs">
          <span className="block text-[10px] text-emerald-600 font-black uppercase">Protein</span>
          <span className="text-lg sm:text-xl font-black text-emerald-700">
            {totalProtein}g
          </span>
          <span className="block text-[10px] text-emerald-800 font-medium">Lean muscle</span>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 shadow-xs">
          <span className="block text-[10px] text-blue-600 font-black uppercase">Carbs</span>
          <span className="text-lg sm:text-xl font-black text-blue-700">
            {totalCarbs}g
          </span>
          <span className="block text-[10px] text-blue-800 font-medium">Energy</span>
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3 shadow-xs">
          <span className="block text-[10px] text-rose-600 font-black uppercase">Fats</span>
          <span className="text-lg sm:text-xl font-black text-rose-700">
            {totalFat}g
          </span>
          <span className="block text-[10px] text-rose-800 font-medium">Lipids</span>
        </div>
      </div>

      {/* Consumption Habit Insights & Recommendations (Required by prompt) */}
      <section 
        id="consumption-insights-section"
        className="space-y-3"
      >
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-700">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Consumption Habit Recommendations & Insights</span>
        </div>

        {CONSUMPTION_RECOMMENDATIONS.map((rec, idx) => (
          <div
            key={idx}
            className={`rounded-[24px] p-4 sm:p-5 border shadow-xs ${
              rec.type === 'alert'
                ? 'bg-amber-50/90 border-amber-200 text-amber-950'
                : rec.type === 'tip'
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                : 'bg-blue-50/90 border-blue-200 text-blue-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {rec.type === 'alert' ? (
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
              ) : rec.type === 'tip' ? (
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                  <Info className="w-4 h-4" />
                </div>
              )}
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-black text-sm sm:text-base leading-snug">
                    {rec.title}
                  </h3>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-white/90 border border-slate-200/80">
                    {rec.highlightStat}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {rec.message}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <span className="text-emerald-700">Healthier Choice Switch:</span>
                  <span>{rec.actionPrompt}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Detailed Food Consumption Log List */}
      <section 
        id="food-detailed-logs"
        className="card bg-white rounded-[28px] border border-emerald-100 p-5 sm:p-6 shadow-sm"
      >
        <div className="flex items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">
              Detailed Food Log ({displayFoods.length} items)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Singapore hawker, cafe, and home foods with estimated calories & sugar ratings
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {displayFoods.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm font-medium">
              No food consumption logged for this selected meal filter and time period.
            </div>
          ) : (
            displayFoods.map((food) => (
              <div
                key={food.id}
                id={`food-card-${food.id}`}
                className="bg-emerald-50/30 rounded-2xl p-4 border border-emerald-100/90 hover:border-emerald-300 transition-all space-y-2.5"
              >
                {/* Header: Name, Meal Type Badge, Time & Date */}
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-black text-sm sm:text-base text-slate-900 leading-snug">
                        {food.name}
                      </h4>
                      {food.healthierChoiceTag && (
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Healthier Choice
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span className="font-bold text-slate-700">{food.date}</span>
                      <span>•</span>
                      <span>{food.time}</span>
                      <span>•</span>
                      <span className="font-bold capitalize text-emerald-700">{food.mealType}</span>
                    </div>
                  </div>

                  {/* Calorie Pill */}
                  <div className="text-right">
                    <span className="text-base sm:text-lg font-black text-emerald-800">
                      {food.calories} kcal
                    </span>
                    <span className={`block text-[10px] font-black ${
                      food.sugarLevel === 'No Sugar' 
                        ? 'text-emerald-600' 
                        : food.sugarLevel === 'Low Sugar' 
                        ? 'text-emerald-500' 
                        : food.sugarLevel === 'Medium' 
                        ? 'text-amber-600' 
                        : 'text-rose-600'
                    }`}>
                      {food.sugarLevel}
                    </span>
                  </div>
                </div>

                {/* Macro Nutrients breakdown */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-100/80 text-center text-xs">
                  <div className="bg-white rounded-xl py-1.5 border border-emerald-100/70 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block font-bold uppercase">Protein</span>
                    <span className="font-black text-slate-900">{food.proteinGrams}g</span>
                  </div>
                  <div className="bg-white rounded-xl py-1.5 border border-emerald-100/70 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block font-bold uppercase">Carbs</span>
                    <span className="font-black text-slate-900">{food.carbsGrams}g</span>
                  </div>
                  <div className="bg-white rounded-xl py-1.5 border border-emerald-100/70 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block font-bold uppercase">Fats</span>
                    <span className="font-black text-slate-900">{food.fatGrams}g</span>
                  </div>
                </div>

                {food.notes && (
                  <p className="text-xs text-slate-600 bg-white/90 rounded-xl px-3 py-1.5 border border-emerald-100 font-medium">
                    <span className="font-bold text-slate-800">Notes:</span> {food.notes}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Recommended Nearby Healthier Choice Food Options (Required by prompt) */}
      <section 
        id="nearby-healthy-food-section"
        className="card bg-white rounded-[28px] border border-emerald-100 p-5 sm:p-6 shadow-sm space-y-3"
      >
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Consumer Location: Sengkang / Compass One Area</span>
            </div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight mt-0.5 uppercase">
              Recommended Nearby Healthier Choice Food Options
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Nearby eateries providing balanced macros, lean proteins, and Singapore Healthier Choice meals
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {NEARBY_HEALTHY_FOODS.map((spot) => (
            <div
              key={spot.id}
              id={`nearby-food-${spot.id}`}
              className="bg-emerald-50/30 rounded-2xl p-4 border border-emerald-100/90 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-black text-sm sm:text-base text-slate-900">
                    {spot.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black">
                    {spot.badge}
                  </span>
                  {spot.healthierChoiceApproved && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Healthier Choice Approved
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {spot.cuisine} • <span className="text-slate-800 font-bold">{spot.neighborhood}</span>
                </p>
                <p className="text-xs text-slate-700">
                  <span className="font-bold text-slate-900">Signature Dish:</span> {spot.signatureDish}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5 font-medium">
                  <span>Estimated Calorie Range: <strong className="text-emerald-700 font-bold">{spot.calorieRange}</strong></span>
                </div>
              </div>

              {/* Distance & walking time */}
              <div className="sm:text-right shrink-0 bg-white sm:bg-transparent p-2 sm:p-0 rounded-xl border sm:border-0 border-emerald-100 flex sm:flex-col items-center sm:items-end justify-between">
                <span className="text-base sm:text-lg font-black text-emerald-700">
                  {spot.distanceKm} km away
                </span>
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  ~{spot.walkingMins} mins walk
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
