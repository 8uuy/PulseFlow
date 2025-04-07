
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types';
import { mockUserProfile, mockMealEntries, mockWorkoutSessions, mockWaterIntake } from '@/data/mockData';
import { calculateCalorieTarget, calculateMacros } from '@/data/mockData';
import { generateFitnessProgram, calculateBMI, getWeightCategory, getBodyType } from '@/utils/fitnessUtils';
import { toast } from 'sonner';

interface UserContextProps {
  profile: UserProfile;
  updateProfile: (updatedProfile: Partial<UserProfile>) => void;
  saveProfile: () => void;
  waterGlasses: number;
  updateWaterGlasses: (glasses: number) => void;
  mealEntries: any[];
  workoutSessions: any[];
  addWorkoutSession: (workout: any) => void;
  calorieTarget: number;
  macros: { protein: number; carbs: number; fat: number };
  bmi: number;
  weightCategory: string;
  bodyType: string;
  fitnessProgram: any;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [waterGlasses, setWaterGlasses] = useState(mockWaterIntake.amount);
  const [mealEntries, setMealEntries] = useState(mockMealEntries);
  const [workoutSessions, setWorkoutSessions] = useState(mockWorkoutSessions);
  const [fitnessProgram, setFitnessProgram] = useState(null);

  const calorieTarget = calculateCalorieTarget(profile);
  const macros = calculateMacros(calorieTarget);
  const bmi = calculateBMI(profile.weight, profile.height);
  const weightCategory = getWeightCategory(bmi);
  const bodyType = getBodyType(profile);

  useEffect(() => {
    // عند تغيير بيانات المستخدم، نقوم بإعادة توليد برنامج اللياقة
    const program = generateFitnessProgram(profile);
    setFitnessProgram(program);
  }, [profile]);

  const updateProfile = (updatedProfile: Partial<UserProfile>) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      ...updatedProfile,
    }));
  };

  const saveProfile = () => {
    toast.success("تم حفظ البيانات بنجاح");
  };

  const updateWaterGlasses = (glasses: number) => {
    setWaterGlasses(glasses);
  };

  const addWorkoutSession = (workout: any) => {
    const newWorkout = {
      id: `workout-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...workout
    };
    
    setWorkoutSessions(prev => [newWorkout, ...prev]);
    toast.success(`تم إضافة تمرين ${workout.type} بنجاح!`);
  };

  return (
    <UserContext.Provider value={{
      profile,
      updateProfile,
      saveProfile,
      waterGlasses,
      updateWaterGlasses,
      mealEntries,
      workoutSessions,
      addWorkoutSession,
      calorieTarget,
      macros,
      bmi,
      weightCategory,
      bodyType,
      fitnessProgram
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
