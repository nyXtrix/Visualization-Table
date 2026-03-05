import React from "react";
import {
  SIDEBAR_PRIMARY_ACTIONS,
  SIDEBAR_SECONDARY_ACTIONS,
} from "@/constant/utils";
import IconButton from "@/components/ui/IconButton";
import TooltipWrapper from "@/components/ui/TooltipWrapper";

interface SidebarProps {
  activeItem: string[];
  className?: string;
  handlePrimaryActionButtonClick: (id: string) => void;
  isPrimaryActionsDisabled: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeItem,
  className,
  handlePrimaryActionButtonClick,
  isPrimaryActionsDisabled,
}) => {
  return (
    <div
      className={` flex flex-col justify-between w-max right-10 h-[calc(100vh-66)] bg-white/50 py-5 px-2  ${className}`}
    >
      <div className="flex flex-col gap-2">
        {SIDEBAR_PRIMARY_ACTIONS.map((action) => (
          <TooltipWrapper key={action.id} title={action.title} position="left">
            <IconButton
              icon={action.icon}
              className={`p-2! cursor-pointer rounded-md ${activeItem.includes(action.id) ? "bg-gray-200 text-blue-600" : ""} ${isPrimaryActionsDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
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
              className={`p-2! cursor-pointer rounded-md ${activeItem.includes(action.id) ? "bg-blue-600 hover:bg-blue-700 text-white" : ""} `}
            />
          </TooltipWrapper>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
