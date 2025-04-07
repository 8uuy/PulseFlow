
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Dumbbell, Clock, Flame, ChevronRight, Plus, Search
} from "lucide-react";
import { workoutTypes } from "@/data/mockData";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/contexts/UserContext";

const Workouts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddWorkoutOpen, setIsAddWorkoutOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [workoutDuration, setWorkoutDuration] = useState("30");
  const navigate = useNavigate();
  const { workoutSessions, addWorkoutSession } = useUser();
  
  const filteredWorkoutTypes = workoutTypes.filter(workout =>
    workout.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleWorkoutTypeClick = (workoutId: string) => {
    const workout = workoutTypes.find(w => w.id === workoutId);
    if (workout) {
      toast(`اخترت تمرين: ${workout.name}`);
      setSelectedWorkout(workout.id);
      setIsAddWorkoutOpen(true);
    }
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleAddWorkout = () => {
    setIsAddWorkoutOpen(true);
  };
  
  const handleSaveWorkout = () => {
    const workout = workoutTypes.find(w => w.id === selectedWorkout);
    if (workout) {
      const duration = parseInt(workoutDuration);
      // حساب السعرات المحروقة بناءً على المدة
      const caloriesBurned = Math.round(workout.caloriesBurnedPerHour * (duration / 60));
      
      addWorkoutSession({
        type: workout.name,
        duration: duration,
        caloriesBurned: caloriesBurned
      });
      
      setIsAddWorkoutOpen(false);
      setSelectedWorkout(null);
      setWorkoutDuration("30");
    } else {
      toast.error("الرجاء اختيار نوع التمرين");
    }
  };
  
  return (
    <div className="min-h-screen pb-20">
      <Header title="التمارين" />
      
      <main className="container p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="ابحث عن تمارين"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4"
          />
        </div>
        
        <h2 className="text-lg font-semibold mb-4">أنواع التمارين</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {filteredWorkoutTypes.map((workout) => (
            <Card 
              key={workout.id} 
              className="p-4 flex items-center hover:shadow-md cursor-pointer transition-all"
              onClick={() => handleWorkoutTypeClick(workout.id)}
            >
              <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-3">
                <Dumbbell className="text-primary" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{workout.name}</h3>
                <p className="text-xs text-muted-foreground">{workout.caloriesBurnedPerHour} سعرة/ساعة</p>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </Card>
          ))}
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">تاريخ التمارين</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            عرض الكل
          </Button>
        </div>
        
        <div className="space-y-4">
          {workoutSessions.map((session) => (
            <Card key={session.id} className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-full mr-3">
                    <Dumbbell className="text-primary" size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">{session.type}</h3>
                    <p className="text-xs text-muted-foreground">{session.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end text-sm">
                    <Clock size={14} className="text-gray-400 mr-1" />
                    <span>{session.duration} دقيقة</span>
                  </div>
                  <div className="flex items-center justify-end text-sm text-red-500">
                    <Flame size={14} className="mr-1" />
                    <span>{session.caloriesBurned} سعرة</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <Button 
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg"
          onClick={handleAddWorkout}
        >
          <Plus size={24} />
        </Button>
      </main>
      
      <Dialog open={isAddWorkoutOpen} onOpenChange={setIsAddWorkoutOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">إضافة تمرين جديد</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workout-type" className="text-right col-span-1">
                نوع التمرين
              </Label>
              <Select 
                value={selectedWorkout || ""} 
                onValueChange={setSelectedWorkout}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر نوع التمرين" />
                </SelectTrigger>
                <SelectContent>
                  {workoutTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name} ({type.caloriesBurnedPerHour} سعرة/ساعة)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right col-span-1">
                المدة (دقائق)
              </Label>
              <Input
                id="duration"
                type="number"
                value={workoutDuration}
                onChange={(e) => setWorkoutDuration(e.target.value)}
                className="col-span-3"
                min="1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveWorkout} className="w-full">
              حفظ التمرين
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Navbar />
    </div>
  );
};

export default Workouts;
