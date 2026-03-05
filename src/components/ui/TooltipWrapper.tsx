import React from "react";

type Position = "top" | "bottom" | "left" | "right";

interface TooltipWrapperProps {
  title: string;
  position?: Position;
  children: React.ReactNode;
}

const positionClasses: Record<Position, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  title,
  position = "top",
  children,
}) => {
  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={`pointer-events-none absolute z-100 hidden group-hover:block whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs  text-white shadow-lg ${positionClasses[position]}`}
      >
        {title}
      </div>
    </div>
  );
};

export default TooltipWrapper;
