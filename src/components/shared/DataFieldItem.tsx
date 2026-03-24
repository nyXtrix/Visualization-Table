import React, { memo, useCallback } from "react";
import type { FieldItem as Field } from "@/types/visual";
import { CalendarDays, Sigma } from "lucide-react";
import Input from "../inputs/Input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkField } from "@/store/visualSlice";
import { cn } from "@/lib/utils";

interface FieldItemProps {
  field: Field;
  tableName: string;
}

const DataFieldItem = ({ field, tableName }: FieldItemProps) => {
  const dispatch = useAppDispatch();
  const { rows, columns, values } = useAppSelector((state) => state.visual);

  const isChecked = 
    rows.some(f => f.name === field.name && f.tableName === tableName) ||
    columns.some(f => f.name === field.name && f.tableName === tableName) ||
    values.some(f => f.name === field.name && f.tableName === tableName);

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    const payload = JSON.stringify({
      field: field.name,
      tableName: tableName,
      type: field.type,
    });
    e.dataTransfer.setData("field", payload);
  }, [field.name, field.type, tableName]);

  const handleCheckboxChange = useCallback(() => {
    dispatch(checkField({ name: field.name, tableName, type: field.type }));
  }, [dispatch, field.name, field.type, tableName]);

  const isNumeric = (type?: string) => {
    if (!type) return false;
    const t = type.toUpperCase();
    return t.includes("INT") || t.includes("DOUBLE") || t.includes("FLOAT") || t.includes("DECIMAL") || t.includes("NUMERIC");
  };

  const isDate = (type?: string) => {
    if (!type) return false;
    const t = type.toUpperCase();
    return t.includes("DATE") || t.includes("TIMESTAMP") || t.includes("TIME");
  };

  return (
    <div
      className={cn(
        "px-2 py-1 flex items-center gap-2 text-xs w-full rounded hover:bg-gray-100 cursor-pointer text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 group",
        "transition-all duration-200 hover:shadow-sm hover:translate-x-0.5",
        "active:bg-gray-200 active:translate-x-0"
      )}
      draggable
      onDragStart={handleDragStart}
    >
      <div className="flex items-center gap-2 w-full min-w-0">
        <div className="shrink-0 flex items-center">
          <Input 
            type="checkbox" 
          checked={isChecked}
            onChange={handleCheckboxChange}
            className="h-4 w-4 rounded border-gray-300 checkbox-custom-style focus:ring-primary focus:border-none"
          />
        </div>
        
        <div className="flex items-center gap-1 flex-1 min-w-0 overflow-hidden" onClick={handleCheckboxChange}>
          <div className="shrink-0 flex justify-center items-center">
            {isNumeric(field.type) && (
              <Sigma className="w-3.5 h-3.5 text-gray-500" strokeWidth={2.5} />
            )}
            {isDate(field.type) && (
              <CalendarDays className="w-3.5 h-3.5 text-gray-500" strokeWidth={2.5} />
            )}
          </div>
          <span className="truncate flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
            {field.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(DataFieldItem);
