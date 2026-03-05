import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", type = "input", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          className={cn("px-3 py-2 border rounded-sm outline-none focus:ring-1 focus:ring-blue-500",
            error ? "border-red-500" : "border-gray-300",
            className)}
          {...props}
        />

        {error && (
          <span className="text-sm text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;