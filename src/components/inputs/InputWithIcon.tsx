import React from "react";
import type { LucideIcon } from "lucide-react";
import Input from "./Input";
import { cn } from "@/lib/utils";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  iconPosition?: "left" | "right";
  label?: string;
  error?: string;
  iconClassName?:string;
}

const InputWithIcon = React.forwardRef<
  HTMLInputElement,
  InputWithIconProps
>(({ icon: Icon, iconPosition = "left", className = "",iconClassName, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {iconPosition === "left" && (
        <Icon className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400", iconClassName)} />
      )}

      <Input
        ref={ref}
        className={`${
          iconPosition === "left" ? "pl-9" : "pr-9"
        } ${className}`}
        {...props}
      />

      {iconPosition === "right" && (
        <Icon className={cn("absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400", iconClassName)} />
      )}
    </div>
  );
});

InputWithIcon.displayName = "InputWithIcon";

export default InputWithIcon;