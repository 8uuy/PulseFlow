
import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProgressData } from "@/data/mockData";

const ProgressChart = () => {
  const [data, setData] = useState(mockProgressData.weight);
  const [activeTab, setActiveTab] = useState("weight");

  useEffect(() => {
    switch (activeTab) {
      case "weight":
        setData(mockProgressData.weight);
        break;
      case "workouts":
        setData(mockProgressData.workouts);
        break;
      case "calories":
        setData(mockProgressData.calories);
        break;
      default:
        setData(mockProgressData.weight);
    }
  }, [activeTab]);

  const formatTooltip = (value: number): string => {
    if (activeTab === "weight") return `${value} كجم`;
    if (activeTab === "workouts") return `${value} تمارين`;
    if (activeTab === "calories") return `${value} سعرة`;
    return value.toString();
  };

  return (
    <div className="h-full">
      <Tabs defaultValue="weight" onValueChange={setActiveTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="weight" className="flex-1">الوزن</TabsTrigger>
          <TabsTrigger value="workouts" className="flex-1">التمارين</TabsTrigger>
          <TabsTrigger value="calories" className="flex-1">السعرات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weight" className="h-[200px]">
          <ChartDisplay data={data} dataKey="value" formatTooltip={formatTooltip} />
        </TabsContent>
        
        <TabsContent value="workouts" className="h-[200px]">
          <ChartDisplay data={data} dataKey="value" formatTooltip={formatTooltip} />
        </TabsContent>
        
        <TabsContent value="calories" className="h-[200px]">
          <ChartDisplay data={data} dataKey="value" formatTooltip={formatTooltip} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ChartDisplayProps {
  data: Array<{ date: string; value: number }>;
  dataKey: string;
  formatTooltip: (value: number) => string;
}

const ChartDisplay = ({ data, dataKey, formatTooltip }: ChartDisplayProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip 
          formatter={(value: number) => [formatTooltip(value), ""]}
          labelFormatter={(label) => `التاريخ: ${label}`}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="#0EA5E9"
          fillOpacity={1}
          fill="url(#colorValue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;
