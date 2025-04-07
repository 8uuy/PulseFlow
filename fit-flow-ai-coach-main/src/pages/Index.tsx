
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import DashboardCard from "@/components/dashboard/DashboardCard";
import CalorieCounter from "@/components/dashboard/CalorieCounter";
import WorkoutSummary from "@/components/dashboard/WorkoutSummary";
import WaterTracker from "@/components/dashboard/WaterTracker";
import ProgressChart from "@/components/dashboard/ProgressChart";
import { Activity, Droplet, BarChart3, Utensils } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen pb-20">
      <Header title="لوحة البيانات" />
      
      <main className="container p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <DashboardCard 
            title="السعرات الحرارية" 
            icon={<Utensils size={20} />}
            className="col-span-1"
          >
            <CalorieCounter />
          </DashboardCard>
          
          <DashboardCard 
            title="تتبع الماء" 
            icon={<Droplet size={20} />}
            className="col-span-1"
          >
            <WaterTracker />
          </DashboardCard>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-4">
          <DashboardCard 
            title="ملخص التمارين" 
            icon={<Activity size={20} />}
          >
            <WorkoutSummary />
          </DashboardCard>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <DashboardCard 
            title="تتبع التقدم" 
            icon={<BarChart3 size={20} />}
          >
            <ProgressChart />
          </DashboardCard>
        </div>
      </main>
      
      <Navbar />
    </div>
  );
};

export default Index;
