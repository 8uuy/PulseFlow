
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Apple, Calendar, Clock, Droplets, PlayCircle, ChevronRight, Award } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const FitnessRecommendations = () => {
  const { profile, bmi, weightCategory, bodyType, fitnessProgram } = useUser();
  const navigate = useNavigate();
  
  if (!fitnessProgram) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>جاري تحميل البرنامج...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-20">
      <Header title="برنامجك المخصص" />
      
      <main className="container p-4">
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">ملخص برنامجك</CardTitle>
            <CardDescription>
              برنامج مخصص بناءً على وزنك وعمرك وهدفك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col items-center p-3 bg-primary/10 rounded-lg">
                <span className="text-xs text-muted-foreground mb-1">مؤشر كتلة الجسم</span>
                <span className="text-xl font-bold">{bmi.toFixed(1)}</span>
                <span className="text-sm">{weightCategory}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-primary/10 rounded-lg">
                <span className="text-xs text-muted-foreground mb-1">نوع الجسم</span>
                <span className="text-xl font-bold">{bodyType}</span>
                <span className="text-sm">{profile.gender === 'male' ? 'ذكر' : 'أنثى'}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <ProgramSummaryItem 
                icon={<Calendar size={18} />} 
                title="مدة البرنامج" 
                value={fitnessProgram.programDuration} 
              />
              <ProgramSummaryItem 
                icon={<Dumbbell size={18} />} 
                title="تمارين أسبوعية" 
                value={`${fitnessProgram.weeklyWorkouts} أيام`} 
              />
              <ProgramSummaryItem 
                icon={<Apple size={18} />} 
                title="السعرات المستهدفة" 
                value={`${fitnessProgram.calorieTarget} سعرة`} 
              />
              <ProgramSummaryItem 
                icon={<Droplets size={18} />} 
                title="كمية الماء" 
                value={`${fitnessProgram.waterIntake} لتر يومياً`} 
              />
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="workout" className="mb-6">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="workout" className="flex-1">التمارين</TabsTrigger>
            <TabsTrigger value="diet" className="flex-1">الحمية الغذائية</TabsTrigger>
          </TabsList>
          
          <TabsContent value="workout">
            <div className="space-y-4">
              <div className="bg-primary/5 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Award className="text-primary mr-2" size={20} />
                  <h3 className="font-medium">نصائح للتمارين</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  لتحقيق أفضل النتائج، مارس التمارين {fitnessProgram.weeklyWorkouts} أيام في الأسبوع مع أخذ فترات راحة كافية بين الأيام. 
                  ابدأ ببطء وقم بزيادة الشدة تدريجياً.
                </p>
              </div>
              
              {fitnessProgram.recommendedExercises.map((exercise, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="flex items-center p-4 border-b">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <Dumbbell className="text-primary" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{exercise.name}</h3>
                      <p className="text-sm text-muted-foreground">{exercise.description}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <PlayCircle size={20} />
                    </Button>
                  </div>
                  <div className="p-4 bg-gray-50 flex justify-between">
                    <div className="flex items-center">
                      <Clock size={16} className="text-muted-foreground mr-1" />
                      <span className="text-sm">{exercise.setsAndReps}</span>
                    </div>
                    <div className="text-sm text-red-500">
                      {exercise.calorieBurn} سعرة
                    </div>
                  </div>
                </Card>
              ))}
              
              <Button 
                className="w-full mt-4" 
                onClick={() => navigate('/workouts')}
              >
                استكشاف تمارين إضافية
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="diet">
            <div className="space-y-4">
              <div className="bg-primary/5 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Award className="text-primary mr-2" size={20} />
                  <h3 className="font-medium">نصائح غذائية</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  التزم بالسعرات الحرارية المستهدفة ({fitnessProgram.calorieTarget} سعرة) يومياً. 
                  احرص على شرب الماء بكمية كافية ({fitnessProgram.waterIntake} لتر) واختر الأطعمة الصحية قدر الإمكان.
                </p>
              </div>
              
              {fitnessProgram.dietPlan.map((meal, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="flex items-center p-4 border-b">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <Apple className="text-green-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{meal.mealType}</h3>
                      <p className="text-sm text-muted-foreground">{meal.description}</p>
                    </div>
                    <div className="text-sm font-medium">
                      {meal.calories} سعرة
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <h4 className="text-sm font-medium mb-2">المكونات المقترحة:</h4>
                    <ul className="text-sm space-y-1">
                      {meal.foodItems.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
              
              <Button 
                className="w-full mt-4"
                onClick={() => navigate('/nutrition')}
              >
                تصفح مزيد من الوجبات
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={() => navigate('/profile')}
          >
            تعديل البيانات
          </Button>
          <Button 
            className="flex-1" 
            onClick={() => navigate('/')}
          >
            العودة للرئيسية
          </Button>
        </div>
      </main>
      
      <Navbar />
    </div>
  );
};

interface ProgramSummaryItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const ProgramSummaryItem = ({ icon, title, value }: ProgramSummaryItemProps) => {
  return (
    <div className="flex items-center p-3 bg-muted rounded-lg">
      <div className="text-primary mr-2">
        {icon}
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{title}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
};

export default FitnessRecommendations;
