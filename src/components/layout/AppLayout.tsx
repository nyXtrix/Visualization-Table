import React, { memo } from "react";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAppSelector } from "@/store/hooks";
import { useCustomization } from "@/hooks/useCustomization";

interface AppLayoutProps {
  children: React.ReactNode;
  isSidebarPrimaryActionsEnabled?: boolean;
}

const AppLayout = ({ 
  children, 
  isSidebarPrimaryActionsEnabled = true,
}: AppLayoutProps) => {
  useCustomization();
  const { sidebarSide } = useAppSelector((state) => state.ui.settings);

  return (
    <div className="h-dvh flex flex-col bg-gray-100 text-black dark:bg-gray-900">
      <Navbar className="border bg-white h-max dark:bg-gray-900 dark:text-white"/>

      <div className={cn(
        "flex flex-1 min-h-0 p-2 dark:bg-gray-900",
        sidebarSide === 'left' ? "flex-row-reverse" : "flex-row"
      )}>
        <main className="flex flex-1 min-h-0 min-w-0 overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
          {children}
        </main>

        <Sidebar
          isPrimaryActionsDisabled={!isSidebarPrimaryActionsEnabled}
          className={cn(
            "border h-full",
            sidebarSide === 'left' ? "border-r" : "border-l"
          )}
        />
      </div>
    </div>
  );
};

export default memo(AppLayout);
