
import { UserProfile } from "@/types";

interface Exercise {
  name: string;
  description: string;
  setsAndReps: string;
  calorieBurn: number;
}

interface DietRecommendation {
  mealType: string;
  foodItems: string[];
  description: string;
  calories: number;
}

export interface FitnessProgram {
  weeklyWorkouts: number;
  programDuration: string;
  recommendedExercises: Exercise[];
  dietPlan: DietRecommendation[];
  calorieTarget: number;
  waterIntake: number;
}

// حساب مؤشر كتلة الجسم
export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

// تحديد فئة الوزن بناءً على مؤشر كتلة الجسم
export const getWeightCategory = (bmi: number): string => {
  if (bmi < 18.5) return "نقص في الوزن";
  if (bmi >= 18.5 && bmi < 25) return "وزن طبيعي";
  if (bmi >= 25 && bmi < 30) return "زيادة في الوزن";
  if (bmi >= 30) return "سمنة";
  return "غير معروف";
};

// تحديد نوع الجسم المناسب للتمارين
export const getBodyType = (profile: UserProfile): string => {
  const bmi = calculateBMI(profile.weight, profile.height);
  
  if (bmi < 18.5) return "نحيف";
  if (bmi >= 18.5 && bmi < 25) {
    if (profile.age < 30) return "متوسط نشط";
    return "متوسط";
  }
  if (bmi >= 25 && bmi < 30) return "قوي";
  return "قوي بوزن زائد";
};

// توليد برنامج لياقة مخصص بناءً على ملف المستخدم
export const generateFitnessProgram = (profile: UserProfile): FitnessProgram => {
  const bmi = calculateBMI(profile.weight, profile.height);
  const weightCategory = getWeightCategory(bmi);
  const bodyType = getBodyType(profile);
  const calorieTarget = calculateCalorieTargetForProgram(profile, bmi);
  
  let weeklyWorkouts = 3; // افتراضي
  let programDuration = "8-12 أسبوع";
  let waterIntake = Math.round(profile.weight * 0.033); // حساب كمية الماء بالليتر
  
  // تعديل عدد التمارين الأسبوعية بناءً على العمر والوزن
  if (profile.age < 30) {
    weeklyWorkouts = weightCategory === "وزن طبيعي" ? 4 : 5;
  } else if (profile.age < 50) {
    weeklyWorkouts = weightCategory === "وزن طبيعي" ? 3 : 4;
  } else {
    weeklyWorkouts = weightCategory === "وزن طبيعي" ? 3 : 3;
  }
  
  // تحديد مدة البرنامج بناءً على هدف المستخدم
  if (profile.goal === "lose") {
    programDuration = "12-16 أسبوع";
  } else if (profile.goal === "gain") {
    programDuration = "16-20 أسبوع";
  }
  
  // إنشاء قائمة التمارين المناسبة
  const recommendedExercises = generateExercises(profile, weightCategory, bodyType);
  
  // إنشاء خطة الحمية الغذائية
  const dietPlan = generateDietPlan(profile, calorieTarget, weightCategory);
  
  return {
    weeklyWorkouts,
    programDuration,
    recommendedExercises,
    dietPlan,
    calorieTarget,
    waterIntake
  };
};

// حساب السعرات الحرارية المستهدفة للبرنامج
const calculateCalorieTargetForProgram = (profile: UserProfile, bmi: number): number => {
  // حساب BMR (معدل الأيض الأساسي) باستخدام معادلة Mifflin-St Jeor
  let bmr = 0;
  if (profile.gender === 'male') {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  } else {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  }
  
  // معامل النشاط
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  
  let tdee = bmr * activityMultipliers[profile.activityLevel];
  
  // تعديل السعرات بناءً على الهدف
  if (profile.goal === 'lose') {
    // الخفض يعتمد على مؤشر كتلة الجسم
    const deficit = bmi > 30 ? 750 : (bmi > 25 ? 600 : 500);
    return Math.round(tdee - deficit);
  } else if (profile.goal === 'gain') {
    const surplus = 500;
    return Math.round(tdee + surplus);
  } else {
    return Math.round(tdee);
  }
};

// توليد قائمة التمارين المناسبة
const generateExercises = (profile: UserProfile, weightCategory: string, bodyType: string): Exercise[] => {
  const exercises: Exercise[] = [];
  
  // تمارين للمبتدئين أو كبار السن
  if (profile.age > 50 || (profile.age > 40 && weightCategory === "سمنة")) {
    exercises.push(
      {
        name: "المشي",
        description: "مشي بسرعة متوسطة",
        setsAndReps: "30-45 دقيقة، 3-5 مرات في الأسبوع",
        calorieBurn: 250
      },
      {
        name: "تمارين المرونة",
        description: "تمارين إطالة خفيفة لجميع عضلات الجسم",
        setsAndReps: "15-20 دقيقة، يومياً",
        calorieBurn: 120
      },
      {
        name: "تمارين التوازن",
        description: "تمارين بسيطة لتحسين التوازن والثبات",
        setsAndReps: "10-15 دقيقة، 3 مرات في الأسبوع",
        calorieBurn: 100
      }
    );
  }
  
  // إضافة تمارين مناسبة للجميع
  if (weightCategory === "نقص في الوزن" || profile.goal === "gain") {
    exercises.push(
      {
        name: "تمارين القوة",
        description: "رفع أوزان متوسطة لبناء العضلات",
        setsAndReps: "3 مجموعات، 8-12 تكرار، 3-4 مرات في الأسبوع",
        calorieBurn: 300
      },
      {
        name: "تمارين الضغط",
        description: "تمارين الضغط لتقوية عضلات الصدر والذراعين",
        setsAndReps: "3 مجموعات، 10-15 تكرار، 3 مرات في الأسبوع",
        calorieBurn: 180
      }
    );
  }
  
  if (weightCategory === "زيادة في الوزن" || weightCategory === "سمنة" || profile.goal === "lose") {
    exercises.push(
      {
        name: "تمارين هوائية",
        description: "جري خفيف أو استخدام جهاز المشي",
        setsAndReps: "30-45 دقيقة، 4-5 مرات في الأسبوع",
        calorieBurn: 400
      },
      {
        name: "تمارين القفز",
        description: "تمارين قفز متنوعة لحرق السعرات",
        setsAndReps: "3 مجموعات، 30 ثانية لكل تمرين، 3 مرات في الأسبوع",
        calorieBurn: 350
      }
    );
  }
  
  // تمارين إضافية لجميع الفئات
  exercises.push(
    {
      name: "تمارين البطن",
      description: "تمارين متنوعة لعضلات البطن",
      setsAndReps: "3 مجموعات، 15-20 تكرار، 3-4 مرات في الأسبوع",
      calorieBurn: 200
    },
    {
      name: "تمارين الظهر",
      description: "تمارين لتقوية عضلات الظهر",
      setsAndReps: "3 مجموعات، 12-15 تكرار، 2-3 مرات في الأسبوع",
      calorieBurn: 220
    }
  );
  
  return exercises;
};

// توليد خطة الحمية الغذائية
const generateDietPlan = (profile: UserProfile, calorieTarget: number, weightCategory: string): DietRecommendation[] => {
  const dietPlan: DietRecommendation[] = [];
  
  // حساب توزيع السعرات على الوجبات
  const breakfastCalories = Math.round(calorieTarget * 0.25);
  const lunchCalories = Math.round(calorieTarget * 0.35);
  const dinnerCalories = Math.round(calorieTarget * 0.25);
  const snackCalories = Math.round(calorieTarget * 0.15);
  
  // وجبة الإفطار
  let breakfastItems: string[] = [];
  if (profile.goal === "lose") {
    breakfastItems = ["بيضة مسلوقة", "شريحة خبز أسمر", "خضار طازجة", "كوب شاي بدون سكر"];
  } else if (profile.goal === "gain") {
    breakfastItems = ["3 بيضات مخفوقة", "شريحتان من خبز القمح الكامل", "ملعقة عسل", "كوب حليب"];
  } else {
    breakfastItems = ["بيضتان", "شريحة خبز أسمر", "ملعقة زيت زيتون", "كوب شاي"];
  }
  dietPlan.push({
    mealType: "الإفطار",
    foodItems: breakfastItems,
    description: "وجبة متوازنة لبداية اليوم",
    calories: breakfastCalories
  });
  
  // وجبة الغداء
  let lunchItems: string[] = [];
  if (weightCategory === "نقص في الوزن" || profile.goal === "gain") {
    lunchItems = ["صدر دجاج مشوي (150 جرام)", "كوب أرز بني", "سلطة خضار", "ملعقة زيت زيتون"];
  } else {
    lunchItems = ["سمك مشوي (120 جرام)", "نصف كوب أرز بني", "سلطة خضار كبيرة", "نصف ملعقة زيت زيتون"];
  }
  dietPlan.push({
    mealType: "الغداء",
    foodItems: lunchItems,
    description: "وجبة غنية بالبروتين والألياف",
    calories: lunchCalories
  });
  
  // وجبة العشاء
  let dinnerItems: string[] = [];
  if (profile.goal === "lose") {
    dinnerItems = ["شوربة خضار", "سلطة مع حبوب (كينوا أو برغل)", "100 جرام جبن قليل الدسم"];
  } else {
    dinnerItems = ["120 جرام لحم مشوي", "خضار مطبوخة", "سلطة خضار", "نصف رغيف خبز أسمر"];
  }
  dietPlan.push({
    mealType: "العشاء",
    foodItems: dinnerItems,
    description: "وجبة خفيفة ومغذية للمساء",
    calories: dinnerCalories
  });
  
  // وجبة خفيفة
  let snackItems: string[] = [];
  if (profile.goal === "gain") {
    snackItems = ["حفنة مكسرات (30 جرام)", "موزة", "كوب زبادي"];
  } else {
    snackItems = ["تفاحة", "حفنة صغيرة من المكسرات (15 جرام)", "كوب شاي أخضر"];
  }
  dietPlan.push({
    mealType: "وجبة خفيفة",
    foodItems: snackItems,
    description: "وجبة خفيفة بين الوجبات الرئيسية",
    calories: snackCalories
  });
  
  return dietPlan;
};
