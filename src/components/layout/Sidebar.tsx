import React from "react";
import {
  SIDEBAR_PRIMARY_ACTIONS,
  SIDEBAR_SECONDARY_ACTIONS,
} from "@/constant/utils";
import IconButton from "@/components/ui/IconButton";
import TooltipWrapper from "@/components/ui/TooltipWrapper";
import { cn } from "@/lib/utils";
import Modal from "@/components/ui/Modal";
import { useTheme } from "@/context/ThemeContext";

interface SidebarProps {
  activeItem: string[];
  className?: string;
  handlePrimaryActionButtonClick: (id: string) => void;
  isPrimaryActionsDisabled: boolean;
  isSecondaryActionDisabled?:boolean;
  settingsModalPosition?: 'center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  isSettingsOpen: boolean;
  setIsSettingsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeItem,
  className,
  handlePrimaryActionButtonClick,
  isPrimaryActionsDisabled,
  isSecondaryActionDisabled = false,
  isSettingsOpen,
  setIsSettingsOpen,
  settingsModalPosition = 'bottom-right',
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn("flex flex-col justify-between w-max right-10 h-[calc(100vh-66)] bg-white/50 py-5 px-2 dark:bg-gray-900/50 dark:border-white/20",className)}
    >
      <div className="flex flex-col gap-2">
        {SIDEBAR_PRIMARY_ACTIONS.map((action) => (
          <TooltipWrapper key={action.id} title={action.title} position="left">
            <IconButton
              icon={action.icon}
              className={cn("p-2! cursor-pointer rounded-md", activeItem.includes(action.id) ? "bg-gray-200 text-blue-600 dark:text-amber-500 dark:bg-gray-800" : "", isPrimaryActionsDisabled ? "opacity-50 cursor-not-allowed" : "")}
              variant="ghost"
              onClick={() => handlePrimaryActionButtonClick(action.id)}
              disabled={isPrimaryActionsDisabled}
            />
          </TooltipWrapper>
        ))}
      </div>
      <div>
        {SIDEBAR_SECONDARY_ACTIONS.map((action) => (
          <TooltipWrapper key={action.id} title={action.title} position="left">
            <IconButton
              icon={action.icon}
              variant="ghost"
              className={cn("p-2! cursor-pointer rounded-md", activeItem.includes(action.id) ? "bg-blue-600 hover:bg-blue-700 text-white" : "", isSecondaryActionDisabled ? "opacity-50 cursor-not-allowed" : "" )}
              disabled={isSecondaryActionDisabled}
              onClick={() => {
                if (action.id === "settings") {
                  setIsSettingsOpen(true);
                }
              }}
            />
          </TooltipWrapper>
        ))}
        <Modal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          title="Settings"
          description="Configure your dashboard preferences here."
          position={settingsModalPosition}
          showCloseButton
        >
          <div className="space-y-6">
            
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</p>
              <div 
                className={cn(
                  "w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-200",
                  theme === "dark" ? "bg-blue-600" : "bg-gray-200"
                )}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <div 
                  className={cn(
                    "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-200",
                    theme === "dark" ? "left-5.5" : "left-0.5"
                  )}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Sidebar;
