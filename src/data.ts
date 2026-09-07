import { 
  ExerciseActivity, 
  FoodConsumption, 
  PersonalGoal, 
  ActivityRecommendation, 
  ConsumptionRecommendation, 
  NearbyFitnessLocation, 
  NearbyHealthyFood,
  MilestoneBadge,
  LeaderboardUser,
  PointRule,
  PointHistoryItem
} from './types';

export const INITIAL_USER_GOAL: PersonalGoal = {
  id: 'goal-1',
  title: 'Your Goal: Lose 5KG in 6 months',
  category: 'weight-loss',
  targetDate: '2026-12-31',
  startValue: 74.5,
  currentValue: 72.1,
  targetValue: 69.5,
  unit: 'kg',
  dailyCalorieBudget: 1850,
  dailyBurnTarget: 550,
  description: 'Targeting a sustainable 500 kcal daily deficit via daily movement and cleaner local hawker choices.'
};

export const INITIAL_HEART_HEALTH_METRIC = {
  restingHeartRate: 64, // bpm (down from 72 bpm)
  cardioFitnessScore: 'Good (VO2 max ~41)',
  weeklyZoneMinutes: 165, // WHO recommends 150 mins
  targetZoneMinutes: 150
};

// At least 14 rows of realistic Exercise Activities in Singapore
export const INITIAL_EXERCISES: ExerciseActivity[] = [
  {
    id: 'act-001',
    name: '50m Olympic Pool Lap Swim',
    category: 'low-impact',
    date: '2026-09-06',
    time: '07:15 AM',
    durationMin: 45,
    activeCalories: 390,
    avgHeartRate: 132,
    hrZone: 'Zone 2 Aerobic',
    targetBodyPart: 'full-body',
    notes: 'Freestyle and breaststroke drills at Sengkang Aquatic Centre.'
  },
  {
    id: 'act-002',
    name: 'Marina Bay Waterfront Evening Run',
    category: 'cardio',
    date: '2026-09-05',
    time: '06:45 PM',
    durationMin: 42,
    activeCalories: 480,
    avgHeartRate: 164,
    hrZone: 'Zone 4 Threshold',
    targetBodyPart: 'lower-body',
    notes: 'Fast 6.2km tempo run along the promenade.'
  },
  {
    id: 'act-003',
    name: 'Singles Tennis Rally Session',
    category: 'sports',
    date: '2026-09-05',
    time: '08:30 AM',
    durationMin: 60,
    activeCalories: 510,
    avgHeartRate: 148,
    hrZone: 'Zone 3 Cardio',
    targetBodyPart: 'full-body',
    notes: 'Court drills and match play with Marcus.'
  },
  {
    id: 'act-004',
    name: 'Brisk Nature Walk @ Punggol Waterway',
    category: 'low-impact',
    date: '2026-09-04',
    time: '06:20 PM',
    durationMin: 50,
    activeCalories: 230,
    avgHeartRate: 108,
    hrZone: 'Zone 1 Recovery',
    targetBodyPart: 'lower-body',
    notes: 'Sunset recovery stroll, 5,600 steps recorded.'
  },
  {
    id: 'act-005',
    name: 'Half-Court Basketball 3v3',
    category: 'sports',
    date: '2026-09-04',
    time: '07:30 AM',
    durationMin: 45,
    activeCalories: 420,
    avgHeartRate: 155,
    hrZone: 'Zone 4 Threshold',
    targetBodyPart: 'full-body',
    notes: 'Community court scrimmages with team.'
  },
  {
    id: 'act-006',
    name: 'East Coast Park Coastal Cycling',
    category: 'cardio',
    date: '2026-09-03',
    time: '05:45 PM',
    durationMin: 70,
    activeCalories: 560,
    avgHeartRate: 139,
    hrZone: 'Zone 2 Aerobic',
    targetBodyPart: 'lower-body',
    notes: 'Park connector ride from Bedok to Marina Barrage.'
  },
  {
    id: 'act-007',
    name: 'High Intensity Interval Training (HIIT)',
    category: 'cardio',
    date: '2026-09-02',
    time: '12:15 PM',
    durationMin: 35,
    activeCalories: 380,
    avgHeartRate: 171,
    hrZone: 'Zone 5 Peak',
    targetBodyPart: 'cardio-engine',
    notes: 'Lunch express circuit: kettlebells, burpees, assault bike.'
  },
  {
    id: 'act-008',
    name: 'Badminton Doubles Match',
    category: 'sports',
    date: '2026-09-01',
    time: '07:00 PM',
    durationMin: 60,
    activeCalories: 460,
    avgHeartRate: 145,
    hrZone: 'Zone 3 Cardio',
    targetBodyPart: 'full-body',
    notes: 'High agility footwork and jump smashes.'
  },
  {
    id: 'act-009',
    name: 'Lower-Body Barbell Strength & Squats',
    category: 'strength',
    date: '2026-08-31',
    time: '06:30 PM',
    durationMin: 55,
    activeCalories: 340,
    avgHeartRate: 128,
    hrZone: 'Zone 2 Aerobic',
    targetBodyPart: 'lower-body',
    notes: 'Heavy squats, Romanian deadlifts, Bulgarian split squats.'
  },
  {
    id: 'act-010',
    name: 'Upper-Body Hypertrophy & Pull-ups',
    category: 'strength',
    date: '2026-08-30',
    time: '08:00 AM',
    durationMin: 50,
    activeCalories: 310,
    avgHeartRate: 122,
    hrZone: 'Zone 2 Aerobic',
    targetBodyPart: 'upper-body',
    notes: 'Weighted pull-ups, dumbbell bench press, face pulls.'
  },
  {
    id: 'act-011',
    name: 'Pilates Core Flow & Mobility',
    category: 'flexibility',
    date: '2026-08-29',
    time: '10:00 AM',
    durationMin: 45,
    activeCalories: 195,
    avgHeartRate: 104,
    hrZone: 'Zone 1 Recovery',
    targetBodyPart: 'core',
    notes: 'Reformer-style mat work emphasizing posture and lumbar support.'
  },
  {
    id: 'act-012',
    name: 'MacRitchie Reservoir Trail Hike',
    category: 'cardio',
    date: '2026-08-28',
    time: '07:00 AM',
    durationMin: 90,
    activeCalories: 620,
    avgHeartRate: 136,
    hrZone: 'Zone 2 Aerobic',
    targetBodyPart: 'lower-body',
    notes: 'TreeTop walk route, 11km through nature reserve.'
  },
  {
    id: 'act-013',
    name: 'Aqua Aerobics & Water Resistance',
    category: 'low-impact',
    date: '2026-08-27',
    time: '06:15 PM',
    durationMin: 40,
    activeCalories: 280,
    avgHeartRate: 118,
    hrZone: 'Zone 2 Aerobic',
    targetBodyPart: 'full-body',
    notes: 'Zero joint stress active recovery session.'
  },
  {
    id: 'act-014',
    name: 'Indoor Bouldering & Grip Conditioning',
    category: 'strength',
    date: '2026-08-26',
    time: '07:30 PM',
    durationMin: 60,
    activeCalories: 390,
    avgHeartRate: 126,
    hrZone: 'Zone 2 Aerobic',
    targetBodyPart: 'upper-body',
    notes: 'Completed 6 V3/V4 bouldering problem sets.'
  },
  {
    id: 'act-015',
    name: 'Bedok Reservoir 5km Sunset Jog',
    category: 'cardio',
    date: '2026-08-15',
    time: '06:30 PM',
    durationMin: 38,
    activeCalories: 450,
    avgHeartRate: 152,
    hrZone: 'Zone 3 Cardio',
    targetBodyPart: 'lower-body',
    notes: 'Smooth gravel path loop around reservoir perimeter.'
  },
  {
    id: 'act-016',
    name: 'Pasir Ris Park Calisthenics & Push-ups',
    category: 'strength',
    date: '2026-08-10',
    time: '07:45 AM',
    durationMin: 45,
    activeCalories: 320,
    avgHeartRate: 124,
    hrZone: 'Zone 2 Aerobic',
    targetBodyPart: 'upper-body',
    notes: 'Dips, pull-ups, push-ups and core hollow holds at fitness corner.'
  },
  {
    id: 'act-017',
    name: 'Jurong Lake Gardens 10km Endurance Run',
    category: 'cardio',
    date: '2026-07-28',
    time: '06:15 AM',
    durationMin: 62,
    activeCalories: 720,
    avgHeartRate: 161,
    hrZone: 'Zone 4 Threshold',
    targetBodyPart: 'lower-body',
    notes: 'Long aerobic progression run along the boardwalk.'
  },
  {
    id: 'act-018',
    name: 'OCBC Arena Squash Match vs Darren',
    category: 'sports',
    date: '2026-07-14',
    time: '07:15 PM',
    durationMin: 50,
    activeCalories: 510,
    avgHeartRate: 158,
    hrZone: 'Zone 4 Threshold',
    targetBodyPart: 'full-body',
    notes: 'Intense 4-set rally match with rapid direction changes.'
  },
  {
    id: 'act-019',
    name: 'Sentosa Palawan Beach Open Water Swim',
    category: 'low-impact',
    date: '2026-06-30',
    time: '08:00 AM',
    durationMin: 55,
    activeCalories: 480,
    avgHeartRate: 142,
    hrZone: 'Zone 3 Cardio',
    targetBodyPart: 'full-body',
    notes: '1.8km continuous coastal swim in calm waters.'
  },
  {
    id: 'act-020',
    name: 'Mount Faber Southern Ridges Stair Climb',
    category: 'strength',
    date: '2026-06-12',
    time: '06:45 AM',
    durationMin: 65,
    activeCalories: 590,
    avgHeartRate: 156,
    hrZone: 'Zone 4 Threshold',
    targetBodyPart: 'lower-body',
    notes: 'Henderson Waves elevation climbs targeting glutes and calves.'
  },
  {
    id: 'act-021',
    name: 'Sports Hub Track 400m Intervals',
    category: 'cardio',
    date: '2026-05-25',
    time: '07:00 PM',
    durationMin: 40,
    activeCalories: 440,
    avgHeartRate: 173,
    hrZone: 'Zone 5 Peak',
    targetBodyPart: 'cardio-engine',
    notes: '8x 400m repeats with 90s recovery on stadium 100PLUS promenade track.'
  },
  {
    id: 'act-022',
    name: 'Bishan-Ang Mo Kio Park River Trail Run',
    category: 'cardio',
    date: '2026-05-08',
    time: '06:30 PM',
    durationMin: 48,
    activeCalories: 530,
    avgHeartRate: 147,
    hrZone: 'Zone 3 Cardio',
    targetBodyPart: 'lower-body',
    notes: 'Evening tempo pace following the naturalized canal.'
  },
  {
    id: 'act-023',
    name: 'Fort Canning Hill Sprints & Core Flow',
    category: 'cardio',
    date: '2026-04-18',
    time: '07:30 AM',
    durationMin: 35,
    activeCalories: 410,
    avgHeartRate: 168,
    hrZone: 'Zone 5 Peak',
    targetBodyPart: 'cardio-engine',
    notes: 'Steep hill charge repeats followed by mobility flow.'
  },
  {
    id: 'act-024',
    name: 'Kallang River Kayaking Endurance',
    category: 'low-impact',
    date: '2026-03-22',
    time: '09:00 AM',
    durationMin: 60,
    activeCalories: 380,
    avgHeartRate: 130,
    hrZone: 'Zone 2 Aerobic',
    targetBodyPart: 'upper-body',
    notes: 'Paddle session from Water Sports Centre to Marina Basin.'
  },
  {
    id: 'act-025',
    name: 'Coney Island Coastal Bike Tour',
    category: 'cardio',
    date: '2026-02-15',
    time: '08:15 AM',
    durationMin: 80,
    activeCalories: 640,
    avgHeartRate: 135,
    hrZone: 'Zone 2 Aerobic',
    targetBodyPart: 'lower-body',
    notes: '22km leisure aerobic gravel ride across nature park.'
  },
  {
    id: 'act-026',
    name: 'Standard Chartered 15km Base Building Run',
    category: 'cardio',
    date: '2026-01-20',
    time: '06:00 AM',
    durationMin: 85,
    activeCalories: 980,
    avgHeartRate: 150,
    hrZone: 'Zone 3 Cardio',
    targetBodyPart: 'lower-body',
    notes: 'Early morning long slow distance run from East Coast to Gardens by the Bay.'
  }
];

// At least 14 rows of realistic local Singapore food consumption records
export const INITIAL_FOODS: FoodConsumption[] = [
  {
    id: 'food-001',
    name: 'Kaya Butter Toast (Brown Bread, 2 slices)',
    mealType: 'breakfast',
    date: '2026-09-06',
    time: '08:15 AM',
    calories: 280,
    proteinGrams: 6,
    carbsGrams: 36,
    fatGrams: 12,
    sugarLevel: 'Medium',
    healthierChoiceTag: false,
    notes: 'Classic local breakfast with half-boiled eggs.'
  },
  {
    id: 'food-002',
    name: 'Kopi-O Kosong (Hot Black Coffee, No Sugar)',
    mealType: 'breakfast',
    date: '2026-09-06',
    time: '08:20 AM',
    calories: 12,
    proteinGrams: 1,
    carbsGrams: 2,
    fatGrams: 0,
    sugarLevel: 'No Sugar',
    healthierChoiceTag: true,
    notes: 'Zero added condensed milk, clean caffeine boost.'
  },
  {
    id: 'food-003',
    name: 'Hainanese Steamed Chicken Breast Rice (Less Rice)',
    mealType: 'lunch',
    date: '2026-09-06',
    time: '12:45 PM',
    calories: 520,
    proteinGrams: 38,
    carbsGrams: 58,
    fatGrams: 14,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: true,
    notes: 'Skin removed, ginger chili sauce on the side.'
  },
  {
    id: 'food-004',
    name: 'Iced Barley Drink (Less Sweet)',
    mealType: 'tea-break',
    date: '2026-09-06',
    time: '03:30 PM',
    calories: 110,
    proteinGrams: 1,
    carbsGrams: 26,
    fatGrams: 0,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: true,
    notes: 'Brewed with pandan leaves and cooked pearl barley.'
  },
  {
    id: 'food-005',
    name: 'Sliced Fish Soup Bee Hoon (No Milk, Extra Greens)',
    mealType: 'dinner',
    date: '2026-09-05',
    time: '07:15 PM',
    calories: 360,
    proteinGrams: 32,
    carbsGrams: 46,
    fatGrams: 4,
    sugarLevel: 'No Sugar',
    healthierChoiceTag: true,
    notes: 'Fresh snakehead fish slices with bittergourd and chye sim.'
  },
  {
    id: 'food-006',
    name: 'Traditional Prawn Noodle Soup (Yellow Noodle)',
    mealType: 'lunch',
    date: '2026-09-05',
    time: '01:00 PM',
    calories: 490,
    proteinGrams: 24,
    carbsGrams: 65,
    fatGrams: 15,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: false,
    notes: 'Savory broth with 4 large tiger prawns and kang kong.'
  },
  {
    id: 'food-007',
    name: 'Iced Sweet Coffee (Kopi Peng with Condensed Milk)',
    mealType: 'tea-break',
    date: '2026-09-05',
    time: '04:15 PM',
    calories: 220,
    proteinGrams: 3,
    carbsGrams: 34,
    fatGrams: 8,
    sugarLevel: 'High',
    healthierChoiceTag: false,
    notes: 'Afternoon sugar indulgence at coffee shop.'
  },
  {
    id: 'food-008',
    name: 'Thunder Tea Brown Rice Bowl (Hakka Lei Cha)',
    mealType: 'dinner',
    date: '2026-09-04',
    time: '07:00 PM',
    calories: 410,
    proteinGrams: 18,
    carbsGrams: 62,
    fatGrams: 10,
    sugarLevel: 'No Sugar',
    healthierChoiceTag: true,
    notes: 'Brown rice with mint herb soup, long beans, tofu, dried radish.'
  },
  {
    id: 'food-009',
    name: 'Yong Tau Foo Clear Broth (6 Items + Bee Hoon)',
    mealType: 'lunch',
    date: '2026-09-04',
    time: '12:30 PM',
    calories: 370,
    proteinGrams: 26,
    carbsGrams: 45,
    fatGrams: 8,
    sugarLevel: 'No Sugar',
    healthierChoiceTag: true,
    notes: 'Steamed fish paste tofu, lady finger, tomato, mushrooms.'
  },
  {
    id: 'food-010',
    name: 'Warm Grass Jelly with Soya Bean Curd (No Syrup)',
    mealType: 'supper',
    date: '2026-09-03',
    time: '09:30 PM',
    calories: 130,
    proteinGrams: 7,
    carbsGrams: 16,
    fatGrams: 3,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: true,
    notes: 'Light protein snack to satisfy evening cravings.'
  },
  {
    id: 'food-011',
    name: 'Plain Roti Prata (1 pc) + Fish Curry Gravy',
    mealType: 'supper',
    date: '2026-09-02',
    time: '10:15 PM',
    calories: 340,
    proteinGrams: 6,
    carbsGrams: 42,
    fatGrams: 17,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: false,
    notes: 'Late night snack after evening gym session.'
  },
  {
    id: 'food-012',
    name: 'Miso Salmon & Roasted Pumpkin Quinoa Bowl',
    mealType: 'dinner',
    date: '2026-09-02',
    time: '07:00 PM',
    calories: 540,
    proteinGrams: 36,
    carbsGrams: 48,
    fatGrams: 21,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: true,
    notes: 'Omega-3 rich dinner with edamame and sesame dressing.'
  },
  {
    id: 'food-013',
    name: 'Tropical Fruit Plate (Papaya, Watermelon, Guava)',
    mealType: 'breakfast',
    date: '2026-09-01',
    time: '08:00 AM',
    calories: 140,
    proteinGrams: 2,
    carbsGrams: 32,
    fatGrams: 1,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: true,
    notes: 'Freshly cut local fruits rich in vitamin C and hydration.'
  },
  {
    id: 'food-014',
    name: 'Steamed Crystal Dumplings & Century Egg Porridge',
    mealType: 'lunch',
    date: '2026-09-01',
    time: '01:15 PM',
    calories: 460,
    proteinGrams: 22,
    carbsGrams: 68,
    fatGrams: 11,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: true,
    notes: 'Lean pork century egg congee with chives and white pepper.'
  },
  {
    id: 'food-015',
    name: 'Maxwell Market Tian Tian Steamed Chicken Breast',
    mealType: 'lunch',
    date: '2026-08-18',
    time: '12:30 PM',
    calories: 380,
    proteinGrams: 34,
    carbsGrams: 42,
    fatGrams: 8,
    sugarLevel: 'No Sugar',
    healthierChoiceTag: true,
    notes: 'Skinless tender chicken breast with cucumber slices and ginger broth.'
  },
  {
    id: 'food-016',
    name: 'Amoy Street Grilled Tempeh & Edamame Quinoa Bowl',
    mealType: 'lunch',
    date: '2026-08-12',
    time: '01:00 PM',
    calories: 420,
    proteinGrams: 22,
    carbsGrams: 52,
    fatGrams: 12,
    sugarLevel: 'No Sugar',
    healthierChoiceTag: true,
    notes: 'Plant-based high fiber lunch with tahini lime dressing.'
  },
  {
    id: 'food-017',
    name: 'Chinatown Herbal Ginseng Black Chicken Soup',
    mealType: 'dinner',
    date: '2026-07-28',
    time: '07:30 PM',
    calories: 310,
    proteinGrams: 36,
    carbsGrams: 14,
    fatGrams: 6,
    sugarLevel: 'No Sugar',
    healthierChoiceTag: true,
    notes: 'Double-boiled restorative broth with wolfberries and red dates.'
  },
  {
    id: 'food-018',
    name: 'Fresh Dragonfruit & Greek Yogurt Protein Bowl',
    mealType: 'breakfast',
    date: '2026-07-15',
    time: '08:00 AM',
    calories: 210,
    proteinGrams: 16,
    carbsGrams: 28,
    fatGrams: 3,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: true,
    notes: 'Red dragonfruit with unsweetened Greek yogurt and chia seeds.'
  },
  {
    id: 'food-019',
    name: 'Sentosa Grilled Sea Bass with Steamed Bok Choy',
    mealType: 'dinner',
    date: '2026-06-30',
    time: '07:15 PM',
    calories: 480,
    proteinGrams: 42,
    carbsGrams: 32,
    fatGrams: 14,
    sugarLevel: 'No Sugar',
    healthierChoiceTag: true,
    notes: 'Fresh catch barramundi fillet with fragrant jasmine brown rice.'
  },
  {
    id: 'food-020',
    name: 'Tiong Bahru Steamed Rice Rolls (Chee Cheong Fun, Light Soy)',
    mealType: 'breakfast',
    date: '2026-06-12',
    time: '08:30 AM',
    calories: 260,
    proteinGrams: 8,
    carbsGrams: 48,
    fatGrams: 4,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: true,
    notes: 'Handmade silky steamed rice sheets with roasted sesame and light soy.'
  },
  {
    id: 'food-021',
    name: 'Old Airport Road Sliced Beef Kway Teow Soup',
    mealType: 'lunch',
    date: '2026-05-25',
    time: '12:45 PM',
    calories: 460,
    proteinGrams: 30,
    carbsGrams: 60,
    fatGrams: 9,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: true,
    notes: 'Clear aromatic beef broth with lean tender slices and bean sprouts.'
  },
  {
    id: 'food-022',
    name: 'Whampoa Soy Milk Curd (Beancurd Kosong, No Sugar)',
    mealType: 'tea-break',
    date: '2026-05-08',
    time: '04:00 PM',
    calories: 95,
    proteinGrams: 7,
    carbsGrams: 8,
    fatGrams: 3,
    sugarLevel: 'No Sugar',
    healthierChoiceTag: true,
    notes: 'Silken organic beancurd without sugar syrup.'
  },
  {
    id: 'food-023',
    name: 'Lau Pa Sat Chicken Satay (6 Sticks, Lean Breast) & Cucumber',
    mealType: 'dinner',
    date: '2026-04-18',
    time: '07:45 PM',
    calories: 390,
    proteinGrams: 32,
    carbsGrams: 28,
    fatGrams: 14,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: true,
    notes: 'Flame-grilled lean skewers with peanut sauce enjoyed in moderation.'
  },
  {
    id: 'food-024',
    name: 'Newton Food Centre Sambal Kang Kong & Steamed Brown Rice',
    mealType: 'dinner',
    date: '2026-03-22',
    time: '07:00 PM',
    calories: 380,
    proteinGrams: 12,
    carbsGrams: 54,
    fatGrams: 11,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: true,
    notes: 'Stir-fried water spinach with garlic chili and high fiber rice.'
  },
  {
    id: 'food-025',
    name: 'Tekka Centre Roti Prata with Dhal Curry Gravy',
    mealType: 'breakfast',
    date: '2026-02-15',
    time: '09:00 AM',
    calories: 320,
    proteinGrams: 10,
    carbsGrams: 44,
    fatGrams: 12,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: false,
    notes: 'Crispy dough with plant-protein lentil curry.'
  },
  {
    id: 'food-026',
    name: 'Chomp Chomp BBQ Stingray with Calamansi & Brown Rice',
    mealType: 'dinner',
    date: '2026-01-20',
    time: '07:30 PM',
    calories: 440,
    proteinGrams: 38,
    carbsGrams: 46,
    fatGrams: 10,
    sugarLevel: 'Low Sugar',
    healthierChoiceTag: true,
    notes: 'Grilled skate wing wrapped in banana leaf with fresh calamansi lime.'
  }
];

export const ACTIVITY_RECOMMENDATIONS: ActivityRecommendation[] = [
  {
    type: 'warning',
    title: 'Cardio Intensity & Recovery Balance Alert',
    message: 'We noticed you logged 4 consecutive high-intensity cardio days (tempo runs, HIIT, and basketball) totaling 2,200 kcal. Your resting heart rate spiked by +4 bpm this morning.',
    actionPrompt: 'Remember to take active rest or swap your next session for a low-impact exercise like a 40-minute swim or easy park walk.'
  },
  {
    type: 'suggestion',
    title: 'Lower-Body Muscle Balance Note',
    message: 'You have logged 3 leg-heavy sessions this week (squats, runs, cycling). Your upper back and posterior chain could benefit from balancing volume.',
    actionPrompt: 'Consider an upper-body resistance routine or a core reformer pilates session before your next weekend run.'
  },
  {
    type: 'achievement',
    title: 'Heart Health Goal On Track! 🔥',
    message: 'You clocked 165 minutes in aerobic Zone 2 & 3 this week, exceeding Singapore National Physical Activity guideline by 10%.',
    actionPrompt: 'Keep maintaining this steady aerobic volume to strengthen your left ventricular stroke volume.'
  }
];

export const CONSUMPTION_RECOMMENDATIONS: ConsumptionRecommendation[] = [
  {
    type: 'alert',
    title: 'Sweetened Drink Habit Insight',
    message: 'We noticed you logged 4 cups of sweetened beverages (e.g. Kopi Peng, sweetened barley) this week, contributing approx. 640 liquid calories.',
    actionPrompt: 'Aim to replace 1 sweetened drink daily with Kopi-O Kosong or iced water with lemon. This saves ~180 kcal/day and will help you hit your -5kg goal 3 weeks sooner!',
    highlightStat: 'Potential deficit: -1,260 kcal/wk'
  },
  {
    type: 'tip',
    title: 'Hawker Food Healthier Choice Boost',
    message: 'Your lunch choices (steamed chicken breast with less rice, sliced fish soup) maintained a high 35g+ protein average with under 500 kcal.',
    actionPrompt: 'Keep asking hawkers for "less oil, soup on the side, no evaporated milk" to trim hidden sodium and saturated fats.',
    highlightStat: 'Healthy Choice ratio: 71%'
  },
  {
    type: 'insight',
    title: 'Supper & Late Night Cravings',
    message: 'Logging plain prata at 10:15 PM pushed your evening calorie load over budget. Late night carb spikes can also interrupt deep restorative sleep.',
    actionPrompt: 'If hungry after 9 PM, opt for warm unflavored soya beancurd or a small handful of unsalted roasted almonds.',
    highlightStat: 'Late-night avg: 235 kcal'
  }
];

// Realistic Singapore physical activity spots (invented compliant names)
export const NEARBY_FITNESS_LOCATIONS: NearbyFitnessLocation[] = [
  {
    id: 'fit-loc-1',
    name: 'Sengkang Sports & Aquatic Complex',
    categoryName: 'Public Swimming & Gym',
    distanceKm: 0.6,
    walkingMins: 8,
    neighborhood: 'Sengkang West (near MRT)',
    address: '57 Anchorvale Road, Singapore 544964',
    openHours: '06:30 AM - 09:45 PM Daily',
    popularFor: '50m Olympic Lap Pools & Public Fitness Gym',
    badge: 'Low-Impact Swim'
  },
  {
    id: 'fit-loc-2',
    name: 'Apex 24/7 Fitness Studio (Sengkang)',
    categoryName: 'Round-the-Clock Gym',
    distanceKm: 0.9,
    walkingMins: 11,
    neighborhood: 'Compassvale Bow',
    address: '11 Rivervale Crescent, Singapore 545082',
    openHours: 'Open 24 Hours (Staffed 10am - 8pm)',
    popularFor: 'Free Weights, Squat Racks & Cardio Zone',
    badge: 'Strength Training'
  },
  {
    id: 'fit-loc-3',
    name: 'Boutique Functional Training Hub (BFT Sengkang)',
    categoryName: 'Group HIIT & Conditioning',
    distanceKm: 1.2,
    walkingMins: 15,
    neighborhood: 'Sengkang Grand Mall #02-14',
    address: '1 Sengkang Square, Singapore 545078',
    openHours: '06:00 AM - 08:30 PM Weekdays',
    popularFor: 'Heart-rate tracked group cardio & circuit intervals',
    badge: 'Cardio Intervals'
  },
  {
    id: 'fit-loc-4',
    name: 'Punggol Waterway Park & Connector (PCN)',
    categoryName: 'Outdoor Nature Running & Cycling',
    distanceKm: 0.4,
    walkingMins: 5,
    neighborhood: 'Anchorvale PCN Link',
    address: 'Sentul Crescent, Singapore 828723',
    openHours: 'Lighted 24 Hours Daily',
    popularFor: 'Paved scenic trail, sunrise walking & distance jogging',
    badge: 'Scenic Free Trail'
  },
  {
    id: 'fit-loc-5',
    name: 'Anchorvale Community Sports Hall',
    categoryName: 'Indoor Badminton & Table Tennis',
    distanceKm: 0.7,
    walkingMins: 9,
    neighborhood: 'Anchorvale Walk',
    address: '59 Anchorvale Road, Singapore 544965',
    openHours: '07:00 AM - 10:00 PM Daily',
    popularFor: 'Wooden sprung court badminton & social leagues',
    badge: 'Racket Sports'
  }
];

// Realistic Singapore healthier dining options (invented compliant names)
export const NEARBY_HEALTHY_FOODS: NearbyHealthyFood[] = [
  {
    id: 'food-loc-1',
    name: 'FreshSub Deli & Grain Wraps',
    cuisine: 'Custom Fresh Sandwiches & Protein Wraps',
    distanceKm: 0.5,
    walkingMins: 6,
    neighborhood: 'Compass One #B1-28',
    address: '1 Sengkang Square, Singapore 545078',
    calorieRange: '320 - 490 kcal',
    signatureDish: 'Roasted Chicken Breast 6-inch on Multigrain (No Mayo)',
    healthierChoiceApproved: true,
    badge: 'High Protein / Lean'
  },
  {
    id: 'food-loc-2',
    name: 'Grains & Green Bowl Co.',
    cuisine: 'Warm Quinoa & Wholesome Protein Bowls',
    distanceKm: 0.6,
    walkingMins: 8,
    neighborhood: 'Sengkang Grand Mall #01-32',
    address: '3 Sengkang Square, Singapore 545079',
    calorieRange: '380 - 540 kcal',
    signatureDish: 'Grilled Salmon Bowl with Edamame & Roasted Sesame',
    healthierChoiceApproved: true,
    badge: 'Omega-3 Superfood'
  },
  {
    id: 'food-loc-3',
    name: 'GreenSalad & Protein Harvest Stop',
    cuisine: 'Nutritious Custom Salads & Broth Bowls',
    distanceKm: 0.8,
    walkingMins: 10,
    neighborhood: 'Rivervale Mall #01-12',
    address: '11 Rivervale Crescent, Singapore 545082',
    calorieRange: '290 - 450 kcal',
    signatureDish: 'Iron Goddess Warm Spinach Salad with Seared Tofu',
    healthierChoiceApproved: true,
    badge: '100% Plant Power'
  },
  {
    id: 'food-loc-4',
    name: 'Traditional Sliced Fish Soup @ Kopitiam',
    cuisine: 'Singapore Hawker Healthier Choice',
    distanceKm: 0.3,
    walkingMins: 4,
    neighborhood: 'Anchorvale Village Hawker Centre #02-08',
    address: '339 Anchorvale Road, Singapore 540339',
    calorieRange: '310 - 390 kcal',
    signatureDish: 'Fresh Batang Fish Bee Hoon Soup (Clear broth, extra chye sim)',
    healthierChoiceApproved: true,
    badge: 'Hawker Approved Choice'
  },
  {
    id: 'food-loc-5',
    name: 'Ah Seng Pure Fruit & Fresh Juice Bar',
    cuisine: 'Cut Fruits & No-Sugar Fresh Cold Pressed',
    distanceKm: 0.4,
    walkingMins: 5,
    neighborhood: 'Compass One #B1-18',
    address: '1 Sengkang Square, Singapore 545078',
    calorieRange: '80 - 150 kcal',
    signatureDish: 'Fresh Dragonfruit + Guava Slices + Celery Green Extract',
    healthierChoiceApproved: true,
    badge: 'Zero Added Sugar'
  }
];

export const INITIAL_BADGES: MilestoneBadge[] = [
  {
    id: 'badge-marathon',
    title: 'Marathon Finisher',
    description: 'Accumulate 42.2 km of continuous running, brisk walking, or cycling endurance workouts.',
    icon: '🏅',
    category: 'endurance',
    goalTieIn: 'Builds sustained aerobic calorie burn to achieve your -5kg weight loss target',
    isUnlocked: true,
    unlockedDate: '5 Sep 2026',
    progressCurrent: 42.2,
    progressTarget: 42.2,
    progressUnit: 'km',
    pointsReward: 250
  },
  {
    id: 'badge-healthy-eater',
    title: 'Healthy Eater',
    description: 'Log 10+ Singapore Healthier Choice certified or low-sugar hawker and home meals.',
    icon: '🥗',
    category: 'nutrition',
    goalTieIn: 'Reinforces adherence to your 1,850 kcal daily budget without sacrificing local taste',
    isUnlocked: true,
    unlockedDate: '6 Sep 2026',
    progressCurrent: 10,
    progressTarget: 10,
    progressUnit: 'meals',
    pointsReward: 150
  },
  {
    id: 'badge-grand-slam',
    title: 'Grand Slam Champion',
    description: 'Complete 5 high-intensity racquet sport or court endurance sessions (Tennis singles, Badminton).',
    icon: '🎾',
    category: 'sports',
    goalTieIn: 'Accelerates VO2 max and builds cardiac output to reach 64 bpm resting heart rate',
    isUnlocked: true,
    unlockedDate: '5 Sep 2026',
    progressCurrent: 5,
    progressTarget: 5,
    progressUnit: 'sessions',
    pointsReward: 200
  },
  {
    id: 'badge-sengkang-swimmer',
    title: 'Sengkang Swimmer',
    description: 'Log 3+ Olympic pool lap swimming sessions at Sengkang or Singapore Sports Hub centres.',
    icon: '🏊‍♂️',
    category: 'endurance',
    goalTieIn: 'Provides full-body low-impact active recovery while expending 390+ active kcal',
    isUnlocked: true,
    unlockedDate: '6 Sep 2026',
    progressCurrent: 3,
    progressTarget: 3,
    progressUnit: 'sessions',
    pointsReward: 120
  },
  {
    id: 'badge-cardio-titan',
    title: 'Cardio Titan (Zone 2)',
    description: 'Log 150+ weekly minutes in the optimal Zone 2 Aerobic fat oxidation zone.',
    icon: '❤️',
    category: 'endurance',
    goalTieIn: 'Aligns with WHO cardiovascular guidelines and maximizes daily fat burn efficiency',
    isUnlocked: true,
    unlockedDate: '4 Sep 2026',
    progressCurrent: 165,
    progressTarget: 150,
    progressUnit: 'mins',
    pointsReward: 180
  },
  {
    id: 'badge-streak-crusher',
    title: 'Century Deficit Streak',
    description: 'Maintain 7 consecutive days with daily active burn and net caloric deficit achieved.',
    icon: '🔥',
    category: 'consistency',
    goalTieIn: 'Guarantees the steady 500 kcal deficit required to drop 5kg over 6 months',
    isUnlocked: false,
    progressCurrent: 5,
    progressTarget: 7,
    progressUnit: 'days',
    pointsReward: 300
  }
];

export const POINT_RULES: PointRule[] = [
  {
    id: 'rule-workout',
    action: 'Log Any Exercise / Workout',
    points: 50,
    description: 'Key in any physical workout (swim, run, tennis, cycling, gym).',
    goalTieIn: 'Contributes to your 550 kcal/day burn target and heart fitness.',
    icon: 'Flame'
  },
  {
    id: 'rule-intensity',
    action: 'Endurance & Zone 4/5 Bonus',
    points: 20,
    description: 'Workouts exceeding 45 minutes or sustaining Zone 4 Threshold pulse.',
    goalTieIn: 'Expands VO2 max for dropping resting pulse to 64 bpm.',
    icon: 'Zap'
  },
  {
    id: 'rule-healthier-food',
    action: 'Healthier Choice Meal Log',
    points: 40,
    description: 'Key in a meal tagged with Singapore Healthier Choice Symbol.',
    goalTieIn: 'Keeps total daily intake safely under the 1,850 kcal budget.',
    icon: 'CheckCircle2'
  },
  {
    id: 'rule-low-sugar',
    action: 'Zero / Low Sugar Drink or Snack',
    points: 20,
    description: 'Choose Nutri-Grade A or B beverages (Kopi O Kosong, Green Tea).',
    goalTieIn: 'Prevents insulin spikes that slow down fat loss progress.',
    icon: 'Sparkles'
  },
  {
    id: 'rule-daily-target',
    action: 'Daily Deficit Achieved',
    points: 50,
    description: 'Burn target (550 kcal) hit while staying within meal budget.',
    goalTieIn: 'Directly secures the -5kg body composition transformation.',
    icon: 'Target'
  },
  {
    id: 'rule-milestone',
    action: 'Milestone Badge Unlock',
    points: 150,
    description: 'Unlock key milestones like Marathon Finisher or Grand Slam Champion.',
    goalTieIn: 'Recognizes progressive achievements on your 6-month journey.',
    icon: 'Award'
  }
];

export const INITIAL_LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    id: 'user-cheryl',
    name: 'Cheryl Tan',
    avatarInitials: 'CT',
    avatarBg: 'bg-purple-100 text-purple-800 border-purple-200',
    isCurrentUser: false,
    points: 2180,
    streakDays: 7,
    badgesCount: 8,
    goalSummary: '-4.8kg / 5kg lost (96% reached)',
    goalCategory: 'weight-loss',
    recentActivity: 'East Coast 10km Tempo Run',
    cheersCount: 14,
    hasCheered: false
  },
  {
    id: 'user-marcus',
    name: 'Marcus Lim',
    avatarInitials: 'ML',
    avatarBg: 'bg-sky-100 text-sky-800 border-sky-200',
    isCurrentUser: false,
    points: 1890,
    streakDays: 6,
    badgesCount: 6,
    goalSummary: 'Resting HR 58 bpm (Cardio Met)',
    goalCategory: 'cardio',
    recentActivity: 'Singles Tennis Rally with Wei-Xiong',
    cheersCount: 9,
    hasCheered: false
  },
  {
    id: 'user-current',
    name: 'Lee Wei-Xiong (You)',
    avatarInitials: 'LW',
    avatarBg: 'bg-emerald-500 text-white border-emerald-400',
    isCurrentUser: true,
    points: 1420,
    streakDays: 5,
    badgesCount: 5,
    goalSummary: '-2.4kg / 5kg lost (48% reached)',
    goalCategory: 'weight-loss',
    recentActivity: '50m Olympic Pool Swim (Sengkang)',
    cheersCount: 12,
    hasCheered: false
  },
  {
    id: 'user-priya',
    name: 'Priya Nair',
    avatarInitials: 'PN',
    avatarBg: 'bg-pink-100 text-pink-800 border-pink-200',
    isCurrentUser: false,
    points: 1340,
    streakDays: 4,
    badgesCount: 5,
    goalSummary: '-3.1kg / 4kg lost (78% reached)',
    goalCategory: 'weight-loss',
    recentActivity: 'Power Vinyasa Yoga & Core Flow',
    cheersCount: 7,
    hasCheered: false
  },
  {
    id: 'user-darren',
    name: 'Darren Goh',
    avatarInitials: 'DG',
    avatarBg: 'bg-amber-100 text-amber-800 border-amber-200',
    isCurrentUser: false,
    points: 1150,
    streakDays: 3,
    badgesCount: 4,
    goalSummary: '160m Zone 2 Met (Resting 66 bpm)',
    goalCategory: 'cardio',
    recentActivity: 'Punggol Waterway Cycle Stroll',
    cheersCount: 5,
    hasCheered: false
  },
  {
    id: 'user-siti',
    name: 'Siti Rahmah',
    avatarInitials: 'SR',
    avatarBg: 'bg-teal-100 text-teal-800 border-teal-200',
    isCurrentUser: false,
    points: 980,
    streakDays: 5,
    badgesCount: 3,
    goalSummary: '-1.8kg / 4kg lost (45% reached)',
    goalCategory: 'weight-loss',
    recentActivity: 'Brisk Walk & Thunder Tea Rice',
    cheersCount: 8,
    hasCheered: false
  }
];

export const INITIAL_POINT_HISTORY: PointHistoryItem[] = [
  {
    id: 'pts-01',
    description: 'Logged 50m Olympic Pool Lap Swim (45 mins)',
    points: 70,
    timestamp: 'Today, 7:15 AM',
    type: 'exercise'
  },
  {
    id: 'pts-02',
    description: 'Logged Sliced Fish Bee Hoon (Healthier Choice + Low Sugar)',
    points: 40,
    timestamp: 'Today, 12:45 PM',
    type: 'food'
  },
  {
    id: 'pts-03',
    description: 'Unlocked Badge: Marathon Finisher (42.2km logged)',
    points: 250,
    timestamp: 'Yesterday',
    type: 'milestone'
  },
  {
    id: 'pts-04',
    description: 'Logged Singles Tennis Rally Session (Zone 3 Cardio)',
    points: 70,
    timestamp: '5 Sep 2026',
    type: 'exercise'
  },
  {
    id: 'pts-05',
    description: 'Logged Yong Tau Foo Clear Soup (Healthier Choice)',
    points: 40,
    timestamp: '5 Sep 2026',
    type: 'food'
  },
  {
    id: 'pts-06',
    description: 'Unlocked Badge: Grand Slam Champion (5 Court Sessions)',
    points: 200,
    timestamp: '5 Sep 2026',
    type: 'milestone'
  },
  {
    id: 'pts-07',
    description: '5-Day Consecutive Health Tracking Streak Bonus',
    points: 100,
    timestamp: '4 Sep 2026',
    type: 'streak'
  }
];
