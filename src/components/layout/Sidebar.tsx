import React from "react";
import {
  SIDEBAR_PRIMARY_ACTIONS,
  SIDEBAR_SECONDARY_ACTIONS,
} from "@/constant/utils";
import IconButton from "@/components/ui/IconButton";
import TooltipWrapper from "@/components/ui/TooltipWrapper";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsSettingsOpen, toggleSidebarItem } from "@/store/uiSlice";
import SettingsModal from "@/components/layout/SettingsModal";

interface SidebarProps {
  className?: string;
  isPrimaryActionsDisabled: boolean;
  isSecondaryActionDisabled?: boolean;
  settingsModalPosition?: 'center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  isPrimaryActionsDisabled,
  isSecondaryActionDisabled = false,
}) => {
  const dispatch = useAppDispatch();
  const { activeSidebarItems: activeItem, isSettingsOpen } = useAppSelector((state) => state.ui);

  return (
    <div
      className={cn("flex flex-col justify-between w-max right-10 h-[calc(100vh-66)] bg-white/50 py-5 px-2 dark:bg-gray-900/50 dark:border-white/20",className)}
    >
      <div className="flex flex-col gap-2">
        {SIDEBAR_PRIMARY_ACTIONS.map((action) => (
          <TooltipWrapper key={action.id} title={action.title} position="left">
            <IconButton
              icon={action.icon}
              className={cn("p-2! cursor-pointer rounded-md transition-all", activeItem.includes(action.id) ? "bg-primary/10 text-primary dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/40 dark:text-primary" : "hover:bg-gray-100 dark:hover:bg-gray-800", isPrimaryActionsDisabled ? "opacity-50 cursor-not-allowed" : "")}
              variant="ghost"
              onClick={() => dispatch(toggleSidebarItem(action.id))}
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
              className={cn("p-2! cursor-pointer rounded-md transition-all", activeItem.includes(action.id) ? "" : "hover:bg-gray-100 dark:hover:bg-primary/20 text-primary dark:text-primary", isSecondaryActionDisabled ? "opacity-50 cursor-not-allowed" : "" )}
              disabled={isSecondaryActionDisabled}
              onClick={() => {
                if (action.id === "settings") {
                  dispatch(setIsSettingsOpen(true));
                }
              }}
            />
          </TooltipWrapper>
        ))}
        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => dispatch(setIsSettingsOpen(false))} 
        />
      </div>
    </div>
  );
};

export default Sidebar;
