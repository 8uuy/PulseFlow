
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockUserProfile } from "@/data/mockData";

interface HeaderProps {
  title: string;
  showNotification?: boolean;
}

const Header = ({ title, showNotification = true }: HeaderProps) => {
  const user = mockUserProfile;

  return (
    <div className="sticky top-0 z-10 bg-white border-b py-4 px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">مرحبًا, {user.name}! 👋</p>
        </div>
        
        {showNotification && (
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={24} />
            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
