import { ChevronsRight, Plus } from "lucide-react";
import React from "react";
import SearchInput from "../ui/SearchInput";
import IconButton from "../ui/IconButton";
import TooltipWrapper from "../ui/TooltipWrapper";
import { cn } from "@/lib/utils";

interface FeaturesCardProps {
  id: string;
  isOpen?: boolean;
  title: string;
  children: React.ReactNode;
  enableSearch?: boolean;
  handleCloseClick: (id: string) => void;
  childrenClassName?: string;
  enableAddIcon?: boolean;
  onAddClick?: () => void;
  onSearch?: (value: string) => void;
  addBtnTooltipTitle?:string;
  addBtnTooltipPostion?: 'top' | 'bottom' | 'left' | 'right'
}

const FeaturesCard = ({
  id,
  isOpen,
  children,
  title,
  enableSearch = true,
  handleCloseClick,
  childrenClassName,
  enableAddIcon = false,
  onAddClick,
  onSearch,
  addBtnTooltipTitle = "Add",
  addBtnTooltipPostion = 'top',
}: FeaturesCardProps) => {
  return (
    <div
      className={cn(
        "h-full hidden flex-col min-h-0 bg-white p-2 border gap-2 dark:bg-gray-900/90 dark:text-gray-300 dark:border-gray-700",
        "transform transition-all duration-300 ease-in-out",
        isOpen ? "flex w-full max-w-[15%] shrink-0 z-30" : "",
      )}
    >
      <div className="flex justify-between flex-none items-center">
        <span className="font-semibold">{title}</span>
        <div className="flex items-center">
          {enableAddIcon && (
            <div className="flex items-center">
              <TooltipWrapper title={addBtnTooltipTitle} position={addBtnTooltipPostion}>
              <IconButton
                icon={Plus}
                className="p-2 cursor-pointer"
                variant="ghost"
                onClick={onAddClick}
              />
              </TooltipWrapper>
              <span className="h-full p-2 text-gray-400">|</span>
            </div>
          )}

          <TooltipWrapper title="Collapse" position="top">
            <IconButton
              icon={ChevronsRight}
              variant="ghost"
              className="p-2 cursor-pointer"
              onClick={() => handleCloseClick(id)}
            />
          </TooltipWrapper>
        </div>
      </div>

      {enableSearch && <SearchInput onSearch={onSearch} />}

      <div
        className={cn(
          "flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200",
          childrenClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default FeaturesCard;
