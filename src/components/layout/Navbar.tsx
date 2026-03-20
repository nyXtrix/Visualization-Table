import React from "react";
import LightLogo from '@/assets/Logo.png'
import DarkLogo from '@/assets/DarkLogo.png'
import { useTheme } from "@/context/ThemeContext";

interface NavbarProps{
    className?:string
}

const Navbar:React.FC<NavbarProps> = ({ className }) => {
  const { theme } = useTheme();
  return (
    <div className={`w-full h-full p-2 bg-white/80 text-black dark:border-b-gray-700 dark:shadow-sm dark:shadow-white/50 ${className}`}>
      <div className="flex gap-1 items-center">
        <img src={theme === 'light' ? LightLogo : DarkLogo} alt="Logo" className="h-8" />
        <h2 className="font-bold text-xl mt-1">Visualization Table</h2>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Navbar;
