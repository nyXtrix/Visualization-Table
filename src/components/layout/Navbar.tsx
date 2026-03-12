import React from "react";
import Image from '@/assets/Logo.png'

interface NavbarProps{
    className?:string
}

const Navbar:React.FC<NavbarProps> = ({ className }) => {
  return (
    <div className={`w-full h-full p-2 bg-white/80 text-black border-b-gray-50/50 dark:shadow-sm dark:shadow-white/50 dark:text-white dark:bg-neutral-900/80 ${className}`}>
      <div className="flex gap-1 items-center">
        <img src={Image} alt="Logo" className="h-8" />
        <h2 className="font-bold text-xl">Visualization Table</h2>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Navbar;
