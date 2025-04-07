
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useUser } from "@/contexts/UserContext";

const CalorieCounter = () => {
  const { calorieTarget, macros, mealEntries } = useUser();
  
  // Calculate calories consumed today
  const consumedCalories = mealEntries.reduce(
    (total, meal) => total + meal.calories,
    0
  );
  
  // Calculate remaining calories
  const remainingCalories = calorieTarget - consumedCalories;
  
  // Data for pie chart
  const data = [
    { name: "تم استهلاكه", value: consumedCalories },
    { name: "متبقي", value: remainingCalories > 0 ? remainingCalories : 0 }
  ];
  
  const COLORS = ["#0EA5E9", "#E5E7EB"];
  
  // Calculate macro nutrients consumed
  const consumedProtein = mealEntries.reduce(
    (total, meal) => total + meal.protein,
    0
  );
  
  const consumedCarbs = mealEntries.reduce(
    (total, meal) => total + meal.carbs,
    0
  );
  
  const consumedFat = mealEntries.reduce(
    (total, meal) => total + meal.fat,
    0
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <div className="text-left">
            <div className="text-sm text-muted-foreground">تم استهلاكه</div>
            <div className="text-xl font-bold">{consumedCalories}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">الهدف</div>
            <div className="text-xl font-bold">{calorieTarget}</div>
          </div>
        </div>
        
        {/* Calories Pie Chart */}
        <div className="h-[150px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend 
                verticalAlign="bottom" 
                height={20}
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Macros */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        <MacroProgress 
          label="بروتين" 
          consumed={consumedProtein} 
          target={macros.protein} 
          color="#8B5CF6" 
        />
        <MacroProgress 
          label="كربوهيدرات" 
          consumed={consumedCarbs} 
          target={macros.carbs} 
          color="#10B981" 
        />
        <MacroProgress 
          label="دهون" 
          consumed={consumedFat} 
          target={macros.fat} 
          color="#F59E0B" 
        />
      </div>
    </div>
  );
};

interface MacroProgressProps {
  label: string;
  consumed: number;
  target: number;
  color: string;
}

const MacroProgress = ({ label, consumed, target, color }: MacroProgressProps) => {
  const percentage = Math.min(Math.round((consumed / target) * 100), 100);
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-1 bg-gray-200 rounded-full mb-1">
        <div 
          className="h-1 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
      <span className="text-xs">{label}</span>
      <span className="text-xs font-medium">{consumed}g/{target}g</span>
    </div>
  );
};

export default CalorieCounter;
