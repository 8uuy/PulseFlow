
import { useState } from "react";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coffee, Plus, ChevronRight } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const Nutrition = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { calorieTarget, macros, mealEntries } = useUser();
  
  const filteredMeals = activeTab === "all" 
    ? mealEntries 
    : mealEntries.filter(meal => meal.mealType === activeTab);

  const consumedCalories = mealEntries.reduce(
    (total, meal) => total + meal.calories,
    0
  );
  
  // Calculate remaining calories
  const remainingCalories = calorieTarget - consumedCalories;
  
  return (
    <div className="min-h-screen pb-20">
      <Header title="التغذية" />
      
      <main className="container p-4">
        <Card className="p-4 mb-6">
          <div className="flex justify-between mb-2">
            <div>
              <p className="text-sm text-muted-foreground">السعرات المستهلكة</p>
              <p className="text-xl font-bold">{consumedCalories}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">السعرات المتبقية</p>
              <p className="text-xl font-bold">{remainingCalories > 0 ? remainingCalories : 0}</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((consumedCalories / calorieTarget) * 100, 100)}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <MacroCard label="بروتين" consumed={mealEntries.reduce((total, meal) => total + meal.protein, 0)} target={macros.protein} color="#8B5CF6" />
            <MacroCard label="كربوهيدرات" consumed={mealEntries.reduce((total, meal) => total + meal.carbs, 0)} target={macros.carbs} color="#10B981" />
            <MacroCard label="دهون" consumed={mealEntries.reduce((total, meal) => total + meal.fat, 0)} target={macros.fat} color="#F59E0B" />
          </div>
        </Card>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1">الكل</TabsTrigger>
            <TabsTrigger value="breakfast" className="flex-1">فطور</TabsTrigger>
            <TabsTrigger value="lunch" className="flex-1">غداء</TabsTrigger>
            <TabsTrigger value="dinner" className="flex-1">عشاء</TabsTrigger>
            <TabsTrigger value="snack" className="flex-1">وجبة خفيفة</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {filteredMeals.map((meal) => (
                <Card key={meal.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-full mr-3">
                        <Coffee className="text-primary" size={16} />
                      </div>
                      <div>
                        <h3 className="font-medium">{meal.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {meal.protein}g بروتين • {meal.carbs}g كربوهيدرات • {meal.fat}g دهون
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{meal.calories} سعرة</span>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <Button className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg">
          <Plus size={24} />
        </Button>
      </main>
      
      <Navbar />
    </div>
  );
};

interface MacroCardProps {
  label: string;
  consumed: number;
  target: number;
  color: string;
}

const MacroCard = ({ label, consumed, target, color }: MacroCardProps) => {
  const percentage = Math.min(Math.round((consumed / target) * 100), 100);
  
  return (
    <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
      <div className="w-full h-1 bg-gray-200 rounded-full mb-1">
        <div 
          className="h-1 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
      <span className="text-xs font-medium">{label}</span>
      <span className="text-xs">{consumed}g/{target}g</span>
    </div>
  );
};

export default Nutrition;
