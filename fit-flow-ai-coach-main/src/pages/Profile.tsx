
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, User, BellRing, Shield, LogOut, ChevronRight, Dumbbell } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const Profile = () => {
  const { profile, updateProfile, saveProfile, calorieTarget } = useUser();
  const navigate = useNavigate();
  
  const handleInputChange = (key: keyof typeof profile, value: string | number) => {
    updateProfile({
      [key]: value
    });
  };
  
  const handleSaveChanges = () => {
    saveProfile();
  };
  
  const handleSaveGoals = () => {
    saveProfile();
  };
  
  const handleGenderChange = (value: string) => {
    updateProfile({
      gender: value as "male" | "female"
    });
  };
  
  return (
    <div className="min-h-screen pb-20">
      <Header title="الملف الشخصي" showNotification={false} />
      
      <main className="container p-4">
        <Card className="p-6 flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
            {profile.name.charAt(0)}
          </div>
          <h2 className="text-xl font-bold mb-1">{profile.name}</h2>
          <p className="text-sm text-muted-foreground mb-3">
            {profile.age} سنة • {profile.height} سم • {profile.weight} كجم
          </p>
          <p className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
            هدفك: {profile.goal === "lose" ? "إنقاص الوزن" : profile.goal === "gain" ? "زيادة الوزن" : "الحفاظ على الوزن"}
          </p>
          
          <Button 
            className="mt-4 w-full"
            onClick={() => navigate('/fitness-plan')}
            variant="outline"
          >
            <Dumbbell className="mr-2 h-4 w-4" />
            عرض برنامجك المخصص
          </Button>
        </Card>
        
        <Tabs defaultValue="info">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="info" className="flex-1">المعلومات الشخصية</TabsTrigger>
            <TabsTrigger value="goals" className="flex-1">الأهداف</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">الإعدادات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <Card className="p-4 mb-4">
              <h3 className="font-semibold mb-4">المعلومات الأساسية</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">الاسم</Label>
                  <Input 
                    id="name" 
                    value={profile.name} 
                    onChange={(e) => handleInputChange("name", e.target.value)} 
                    className="mt-1" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="age">العمر</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    value={profile.age} 
                    onChange={(e) => handleInputChange("age", parseInt(e.target.value))} 
                    className="mt-1" 
                  />
                </div>
                
                <div>
                  <Label>الجنس</Label>
                  <RadioGroup 
                    value={profile.gender} 
                    onValueChange={handleGenderChange} 
                    className="flex space-x-4 mt-1"
                  >
                    <div className="flex items-center space-x-2 ml-4">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">ذكر</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">أنثى</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="height">الطول (سم)</Label>
                  <Input 
                    id="height" 
                    type="number" 
                    value={profile.height} 
                    onChange={(e) => handleInputChange("height", parseInt(e.target.value))} 
                    className="mt-1" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="weight">الوزن (كجم)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    value={profile.weight} 
                    onChange={(e) => handleInputChange("weight", parseInt(e.target.value))} 
                    className="mt-1" 
                  />
                </div>
              </div>
            </Card>
            
            <Button className="w-full" onClick={handleSaveChanges}>حفظ التغييرات</Button>
          </TabsContent>
          
          <TabsContent value="goals">
            <Card className="p-4 mb-4">
              <h3 className="font-semibold mb-4">أهدافك الصحية</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="goal">هدفك</Label>
                  <Select 
                    defaultValue={profile.goal}
                    onValueChange={(value) => handleInputChange("goal", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="اختر هدفك" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose">إنقاص الوزن</SelectItem>
                      <SelectItem value="maintain">الحفاظ على الوزن</SelectItem>
                      <SelectItem value="gain">زيادة الوزن</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="activity">مستوى النشاط</Label>
                  <Select 
                    defaultValue={profile.activityLevel}
                    onValueChange={(value) => handleInputChange("activityLevel", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="اختر مستوى نشاطك" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">قليل الحركة</SelectItem>
                      <SelectItem value="light">نشاط خفيف</SelectItem>
                      <SelectItem value="moderate">نشاط متوسط</SelectItem>
                      <SelectItem value="active">نشاط عالي</SelectItem>
                      <SelectItem value="very_active">نشاط مكثف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="targetCalories">السعرات الحرارية اليومية</Label>
                  <div className="flex items-center mt-1">
                    <Input 
                      id="targetCalories" 
                      type="number" 
                      value={calorieTarget} 
                      readOnly
                      className="mr-2" 
                    />
                    <span className="text-sm text-muted-foreground">سعرة</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    *يتم حسابها تلقائيًا بناءً على بياناتك
                  </p>
                </div>
              </div>
            </Card>
            
            <Button className="w-full" onClick={handleSaveGoals}>حفظ الأهداف</Button>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-4">
              <SettingsItem 
                icon={<User size={20} />} 
                title="إدارة الحساب" 
                description="تعديل بيانات الحساب والإعدادات" 
              />
              <SettingsItem 
                icon={<BellRing size={20} />} 
                title="الإشعارات" 
                description="إدارة إعدادات الإشعارات والتذكيرات" 
              />
              <SettingsItem 
                icon={<Shield size={20} />} 
                title="الخصوصية والأمان" 
                description="التحكم في الخصوصية وإعدادات الأمان" 
              />
              <SettingsItem 
                icon={<Settings size={20} />} 
                title="الإعدادات العامة" 
                description="تخصيص التطبيق حسب احتياجاتك" 
              />
              
              <div className="pt-4">
                <Button variant="destructive" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  تسجيل الخروج
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Navbar />
    </div>
  );
};

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SettingsItem = ({ icon, title, description }: SettingsItemProps) => {
  return (
    <Card className="p-4 hover:shadow-md cursor-pointer transition-all">
      <div className="flex items-center">
        <div className="bg-muted p-2 rounded-full mr-3">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <ChevronRight size={20} className="text-muted-foreground" />
      </div>
    </Card>
  );
};

export default Profile;
