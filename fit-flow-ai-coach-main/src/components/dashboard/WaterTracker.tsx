
import { Droplet } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";

const WaterTracker = () => {
  const { waterGlasses, updateWaterGlasses } = useUser();
  const targetGlasses = 8;

  const handleIncrement = () => {
    if (waterGlasses < targetGlasses) {
      updateWaterGlasses(waterGlasses + 1);
    }
  };

  const handleDecrement = () => {
    if (waterGlasses > 0) {
      updateWaterGlasses(waterGlasses - 1);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <div className="flex justify-center mb-2">
          <span className="text-xl font-medium">{waterGlasses} / {targetGlasses} أكواب</span>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-4">
          {Array.from({ length: targetGlasses }).map((_, index) => (
            <Droplet
              key={index}
              className={cn(
                "mx-auto", 
                index < waterGlasses 
                  ? "fill-blue-400 text-blue-400" 
                  : "fill-none text-gray-300"
              )}
              size={24}
            />
          ))}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(waterGlasses / targetGlasses) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        <Button 
          onClick={handleDecrement}
          variant="outline"
          size="icon"
          className="rounded-full"
          disabled={waterGlasses <= 0}
        >
          -
        </Button>
        <Button 
          onClick={handleIncrement}
          variant="outline"
          size="icon"
          className="rounded-full"
          disabled={waterGlasses >= targetGlasses}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default WaterTracker;
