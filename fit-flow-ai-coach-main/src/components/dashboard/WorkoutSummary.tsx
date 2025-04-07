
import { Dumbbell, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const WorkoutSummary = () => {
  const navigate = useNavigate();
  const { workoutSessions } = useUser();
  
  // Get the most recent workout
  const latestWorkout = workoutSessions.length > 0 
    ? [...workoutSessions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0]
    : null;
  
  // Calculate total workouts this week
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  
  const workoutsThisWeek = workoutSessions.filter(
    workout => new Date(workout.date) >= oneWeekAgo
  );
  
  const totalWorkoutsThisWeek = workoutsThisWeek.length;
  
  // Calculate total calories burned this week
  const totalCaloriesBurnedThisWeek = workoutsThisWeek.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const handleAddWorkout = () => {
    navigate("/workouts");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="fitness-stat bg-blue-50">
            <Dumbbell className="mb-2 text-primary" size={24} />
            <span className="text-2xl font-bold">{totalWorkoutsThisWeek}</span>
            <span className="text-xs text-muted-foreground">تمارين هذا الأسبوع</span>
          </div>
          <div className="fitness-stat bg-green-50">
            <Activity className="mb-2 text-green-600" size={24} />
            <span className="text-2xl font-bold">{totalCaloriesBurnedThisWeek}</span>
            <span className="text-xs text-muted-foreground">سعرات محروقة</span>
          </div>
        </div>
        
        {latestWorkout && (
          <div className="border rounded-lg p-3 mb-4">
            <div className="text-sm text-muted-foreground mb-1">آخر تمرين</div>
            <div className="flex justify-between">
              <span className="font-medium">{latestWorkout.type}</span>
              <span>{latestWorkout.duration} دقيقة</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {latestWorkout.caloriesBurned} سعرة
            </div>
          </div>
        )}
      </div>
      
      <Button className="w-full mt-4" onClick={handleAddWorkout}>
        <Dumbbell className="mr-2 h-4 w-4" /> إضافة تمرين جديد
      </Button>
    </div>
  );
};

export default WorkoutSummary;
