
import { useState } from "react";
import { Home, Dumbbell, Coffee, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white z-50">
      <div className="flex justify-around items-center p-2">
        <NavItem 
          to="/" 
          icon={<Home size={24} />} 
          label="الرئيسية" 
          active={activeItem === "/"} 
          onClick={() => setActiveItem("/")}
        />
        <NavItem 
          to="/workouts" 
          icon={<Dumbbell size={24} />} 
          label="التمارين" 
          active={activeItem === "/workouts"} 
          onClick={() => setActiveItem("/workouts")}
        />
        <NavItem 
          to="/nutrition" 
          icon={<Coffee size={24} />} 
          label="التغذية" 
          active={activeItem === "/nutrition"} 
          onClick={() => setActiveItem("/nutrition")}
        />
        <NavItem 
          to="/progress" 
          icon={<BarChart3 size={24} />} 
          label="التقدم" 
          active={activeItem === "/progress"} 
          onClick={() => setActiveItem("/progress")}
        />
        <NavItem 
          to="/profile" 
          icon={<User size={24} />} 
          label="الملف" 
          active={activeItem === "/profile"} 
          onClick={() => setActiveItem("/profile")}
        />
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ to, icon, label, active, onClick }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex flex-col items-center p-2 rounded-md transition-colors", 
        active ? "text-primary" : "text-gray-500"
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default Navbar;
