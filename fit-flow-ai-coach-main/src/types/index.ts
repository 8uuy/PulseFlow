
export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  goal: 'lose' | 'maintain' | 'gain';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

export interface WorkoutType {
  id: string;
  name: string;
  icon: string;
  caloriesBurnedPerHour: number;
}

export interface WorkoutSession {
  id: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  date: string;
}

export interface MealEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: string;
}

export interface WaterIntake {
  amount: number;
  date: string;
}

export interface ProgressData {
  weight: { date: string; value: number }[];
  workouts: { date: string; value: number }[];
  calories: { date: string; value: number }[];
}
