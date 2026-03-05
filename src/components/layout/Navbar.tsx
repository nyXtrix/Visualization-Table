import React from "react";

interface NavbarProps{
    className?:string
}

const Navbar:React.FC<NavbarProps> = ({ className }) => {
  return (
    <div className={`w-full h-full p-2 ${className}`}>
      <div className="flex gap-2 items-center">
        <img src="src/assets/PivotLogo.webp" className="h-8" />
        <h2 className="font-medium text-xl">Pivot Table</h2>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Navbar;
