import Button, { type ButtonProps } from "./Button";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonProps {
  iconClassName?: string;
  icon?: LucideIcon;
  iconPosition?: "right" | "left";
  className?:string;
}

export default function IconButton({
  icon: Icon,
  iconClassName = "",
  iconPosition = "left",
  children,
  className,
  ...buttonProps
}: IconButtonProps) {
  return (
    <Button {...buttonProps} className={cn("flex gap-2", className)}>
      {iconPosition === "left" && Icon && (
        <Icon className={`h-5 w-5 ${iconClassName}`} />
      )}

      {children}

      {iconPosition === "right" && Icon && (
        <Icon className={`h-5 w-5 ${iconClassName}`} />
      )}
    </Button>
  );
}