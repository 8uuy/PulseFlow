
import { UserProfile, WorkoutType, WorkoutSession, MealEntry, ProgressData } from "@/types";

export const mockUserProfile: UserProfile = {
  name: "أحمد",
  age: 28,
  gender: "male",
  height: 178,
  weight: 75,
  goal: "lose",
  activityLevel: "moderate"
};

export const workoutTypes: WorkoutType[] = [
  { id: "1", name: "المشي", icon: "walking", caloriesBurnedPerHour: 300 },
  { id: "2", name: "الجري", icon: "running", caloriesBurnedPerHour: 600 },
  { id: "3", name: "ركوب الدراجة", icon: "bike", caloriesBurnedPerHour: 500 },
  { id: "4", name: "السباحة", icon: "swimming", caloriesBurnedPerHour: 700 },
  { id: "5", name: "تمارين القوة", icon: "dumbbell", caloriesBurnedPerHour: 450 },
  { id: "6", name: "اليوغا", icon: "yoga", caloriesBurnedPerHour: 250 }
];

export const mockWorkoutSessions: WorkoutSession[] = [
  { id: "1", type: "المشي", duration: 45, caloriesBurned: 225, date: "2023-06-01" },
  { id: "2", type: "تمارين القوة", duration: 60, caloriesBurned: 450, date: "2023-06-03" },
  { id: "3", type: "الجري", duration: 30, caloriesBurned: 300, date: "2023-06-05" }
];

export const mockMealEntries: MealEntry[] = [
  { 
    id: "1", 
    name: "فطور صحي", 
    calories: 450, 
    protein: 25, 
    carbs: 50, 
    fat: 15, 
    mealType: "breakfast", 
    date: "2023-06-05" 
  },
  { 
    id: "2", 
    name: "سلطة دجاج", 
    calories: 350, 
    protein: 30, 
    carbs: 20, 
    fat: 10, 
    mealType: "lunch", 
    date: "2023-06-05" 
  },
  { 
    id: "3", 
    name: "سمك مشوي مع خضروات", 
    calories: 400, 
    protein: 35, 
    carbs: 25, 
    fat: 15, 
    mealType: "dinner", 
    date: "2023-06-05" 
  }
];

export const mockProgressData: ProgressData = {
  weight: [
    { date: "2023-05-01", value: 78 },
    { date: "2023-05-15", value: 77 },
    { date: "2023-06-01", value: 76 },
    { date: "2023-06-15", value: 75 }
  ],
  workouts: [
    { date: "2023-05-01", value: 2 },
    { date: "2023-05-08", value: 3 },
    { date: "2023-05-15", value: 2 },
    { date: "2023-05-22", value: 4 },
    { date: "2023-05-29", value: 3 },
    { date: "2023-06-05", value: 5 }
  ],
  calories: [
    { date: "2023-06-01", value: 2200 },
    { date: "2023-06-02", value: 1950 },
    { date: "2023-06-03", value: 2100 },
    { date: "2023-06-04", value: 2000 },
    { date: "2023-06-05", value: 2150 }
  ]
};

export const mockWaterIntake = {
  amount: 4,
  date: "2023-06-05"
};

export const calculateCalorieTarget = (userProfile: UserProfile): number => {
  // Basic BMR calculation (Mifflin-St Jeor Equation)
  let bmr;
  if (userProfile.gender === 'male') {
    bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age + 5;
  } else {
    bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age - 161;
  }
  
  // Activity multiplier
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  
  let tdee = bmr * activityMultipliers[userProfile.activityLevel];
  
  // Adjust based on goal
  if (userProfile.goal === 'lose') {
    return Math.round(tdee - 500); // Deficit for weight loss
  } else if (userProfile.goal === 'gain') {
    return Math.round(tdee + 500); // Surplus for weight gain
  } else {
    return Math.round(tdee); // Maintenance
  }
};

export const calculateMacros = (calorieTarget: number) => {
  // Standard macro distribution (can be adjusted based on goals)
  const protein = Math.round((calorieTarget * 0.3) / 4); // 30% protein, 4 calories per gram
  const fat = Math.round((calorieTarget * 0.25) / 9); // 25% fat, 9 calories per gram
  const carbs = Math.round((calorieTarget * 0.45) / 4); // 45% carbs, 4 calories per gram
  
  return { protein, fat, carbs };
};
