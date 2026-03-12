import React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

type Position = "top" | "bottom" | "left" | "right";

interface TooltipWrapperProps {
  title: string;
  position?: Position;
  children: React.ReactNode;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  title,
  position = "top",
  children,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>

        <TooltipContent side={position} sideOffset={0}>
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;