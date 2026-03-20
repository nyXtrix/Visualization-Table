import React, { memo } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "@/context/ThemeContext";

interface AppLayoutProps {
  children: React.ReactNode;
   activeItems: string[];
  handlePrimaryActionButtonClick: (id: string) => void;
  isSidebarPrimaryActionsEnabled?:boolean;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (isOpen: boolean) => void;
}

const AppLayout = ({ 
  children, 
  activeItems, 
  handlePrimaryActionButtonClick, 
  isSidebarPrimaryActionsEnabled=true,
  isSettingsOpen,
  setIsSettingsOpen
}: AppLayoutProps) => {

  return (
    <ThemeProvider>
    <div className="h-dvh flex flex-col bg-gray-100 text-black dark:bg-gray-90">
      <Navbar className="border bg-white h-max dark:bg-gray-900 dark:text-white"/>

      <div className="flex flex-1 min-h-0 p-2 dark:bg-gray-900">
        <main className="flex flex-1 min-h-0 min-w-0 overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
          {children}
        </main>

        <Sidebar
          activeItem={activeItems}
          handlePrimaryActionButtonClick={handlePrimaryActionButtonClick}
          className="border h-full"
          isPrimaryActionsDisabled={!isSidebarPrimaryActionsEnabled}
          isSettingsOpen={isSettingsOpen}
          setIsSettingsOpen={setIsSettingsOpen}
        />
      </div>
    </div>
    </ThemeProvider>
  );
};

export default memo(AppLayout);
