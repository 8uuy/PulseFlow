
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { mockProgressData, mockWorkoutSessions, mockMealEntries } from "@/data/mockData";

const Progress = () => {
  // Calculate weekly stats
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  
  const workoutsThisWeek = mockWorkoutSessions.filter(
    workout => new Date(workout.date) >= startOfWeek
  );
  
  const caloriesBurnedThisWeek = workoutsThisWeek.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );
  
  const caloriesConsumedThisWeek = mockMealEntries.reduce(
    (total, meal) => total + meal.calories,
    0
  );
  
  // Create data for weekly activity chart
  const daysOfWeek = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  
  const weeklyActivityData = daysOfWeek.map(day => {
    return {
      day,
      workout: Math.floor(Math.random() * 90),
      nutrition: Math.floor(Math.random() * 90)
    };
  });

  return (
    <div className="min-h-screen pb-20">
      <Header title="التقدم" />
      
      <main className="container p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4">
            <h3 className="text-sm text-muted-foreground mb-1">التمارين هذا الأسبوع</h3>
            <p className="text-2xl font-bold">{workoutsThisWeek.length}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm text-muted-foreground mb-1">السعرات المحروقة</h3>
            <p className="text-2xl font-bold">{caloriesBurnedThisWeek}</p>
          </Card>
        </div>
        
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-4">النشاط الأسبوعي</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyActivityData}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                barGap={0}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="workout" name="تمارين" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="nutrition" name="تغذية" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="p-4 mb-6">
          <Tabs defaultValue="weight">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="weight" className="flex-1">الوزن</TabsTrigger>
              <TabsTrigger value="workouts" className="flex-1">التمارين</TabsTrigger>
              <TabsTrigger value="calories" className="flex-1">السعرات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weight" className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockProgressData.weight}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value} كجم`, "الوزن"]} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0EA5E9" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="workouts" className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockProgressData.workouts}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value} تمارين`, "عدد التمارين"]} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="calories" className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockProgressData.calories}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value} سعرة`, "السعرات المستهلكة"]} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold mb-4">إحصائيات هذا الشهر</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-muted-foreground">إجمالي التمارين</p>
              <p className="text-xl font-bold">23</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-muted-foreground">متوسط الوقت</p>
              <p className="text-xl font-bold">45 دقيقة</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-muted-foreground">السعرات المحروقة</p>
              <p className="text-xl font-bold">10,250</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <p className="text-sm text-muted-foreground">تغير الوزن</p>
              <p className="text-xl font-bold">-3 كجم</p>
            </div>
          </div>
        </Card>
      </main>
      
      <Navbar />
    </div>
  );
};

export default Progress;
