import React from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "px-3 py-1 bg-white dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer dark:focus:ring-amber-500",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;
