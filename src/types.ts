export type TimeRange = 'day' | 'week' | 'month' | 'year';

export type HRZone = 
  | 'Zone 1 Recovery'
  | 'Zone 2 Aerobic'
  | 'Zone 3 Cardio'
  | 'Zone 4 Threshold'
  | 'Zone 5 Peak';

export type ActivityCategory = 'cardio' | 'strength' | 'low-impact' | 'sports' | 'flexibility';

export interface ExerciseActivity {
  id: string;
  name: string;
  category: ActivityCategory;
  date: string;
  time: string;
  durationMin: number;
  activeCalories: number;
  avgHeartRate: number;
  hrZone: HRZone;
  targetBodyPart: 'full-body' | 'lower-body' | 'upper-body' | 'core' | 'cardio-engine';
  notes?: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'supper' | 'tea-break';

export interface FoodConsumption {
  id: string;
  name: string;
  mealType: MealType;
  date: string;
  time: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  sugarLevel: 'No Sugar' | 'Low Sugar' | 'Medium' | 'High';
  healthierChoiceTag: boolean;
  notes?: string;
}

export interface PersonalGoal {
  id: string;
  title: string;
  category: 'weight-loss' | 'heart-health';
  targetDate: string;
  currentValue: number;
  targetValue: number;
  startValue: number;
  unit: string;
  dailyCalorieBudget: number;
  dailyBurnTarget: number;
  description: string;
}

export interface ActivityRecommendation {
  type: 'warning' | 'suggestion' | 'achievement';
  title: string;
  message: string;
  actionPrompt: string;
}

export interface ConsumptionRecommendation {
  type: 'insight' | 'tip' | 'alert';
  title: string;
  message: string;
  actionPrompt: string;
  highlightStat: string;
}

export interface NearbyFitnessLocation {
  id: string;
  name: string;
  categoryName: string;
  distanceKm: number;
  walkingMins: number;
  neighborhood: string;
  address: string;
  openHours: string;
  popularFor: string;
  badge: string;
}

export interface NearbyHealthyFood {
  id: string;
  name: string;
  cuisine: string;
  distanceKm: number;
  walkingMins: number;
  neighborhood: string;
  address: string;
  calorieRange: string;
  signatureDish: string;
  healthierChoiceApproved: boolean;
  badge: string;
}

export interface MilestoneBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'endurance' | 'nutrition' | 'sports' | 'consistency';
  goalTieIn: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  progressCurrent: number;
  progressTarget: number;
  progressUnit: string;
  pointsReward: number;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatarInitials: string;
  avatarBg: string;
  isCurrentUser: boolean;
  points: number;
  streakDays: number;
  badgesCount: number;
  goalSummary: string;
  goalCategory: 'weight-loss' | 'cardio';
  recentActivity: string;
  cheersCount: number;
  hasCheered?: boolean;
}

export interface PointRule {
  id: string;
  action: string;
  points: number;
  description: string;
  goalTieIn: string;
  icon: string;
}

export interface PointHistoryItem {
  id: string;
  description: string;
  points: number;
  timestamp: string;
  type: 'exercise' | 'food' | 'streak' | 'milestone';
}
