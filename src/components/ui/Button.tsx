import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "link" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "px-4 py-2 rounded font-medium transition";

    const buttonSize = {
      sm: "px-2 py-1 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    const variantStyles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-600 text-white hover:bg-gray-700",
      outline: "border border-gray-600 text-gray-600 hover:bg-gray-100",
      link: "text-blue-600 underline hover:text-blue-800",
      ghost: "text-black hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-800 dark:text-gray-300 dark:bg-transparent",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], buttonSize[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;