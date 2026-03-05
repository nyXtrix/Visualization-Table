import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
   activeItems: string[];
  handlePrimaryActionButtonClick: (id: string) => void;
  isSidebarPrimaryActionsEnabled?:boolean;
}

const AppLayout = ({ children, activeItems, handlePrimaryActionButtonClick, isSidebarPrimaryActionsEnabled=true }: AppLayoutProps) => {


  return (
    <div className="h-dvh flex flex-col bg-gray-100">
      <Navbar className="border bg-white h-max" />

      <div className="flex flex-1 min-h-0 p-2">
        <main className="flex flex-1 min-h-0 overflow-hidden">
          {children}
        </main>

        <Sidebar
          activeItem={activeItems}
          handlePrimaryActionButtonClick={handlePrimaryActionButtonClick}
          className="border h-full"
          isPrimaryActionsDisabled={!isSidebarPrimaryActionsEnabled}
        />
      </div>
    </div>
  );
};

export default AppLayout;
