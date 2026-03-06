import React, { memo, useCallback } from "react";
import type { FieldItem as Field } from "@/types/visual";
import { CalendarDays, Sigma } from "lucide-react";
import Input from "../inputs/Input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkField } from "@/store/visualSlice";

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
      className="px-2 py-1 flex items-center gap-2 text-xs w-full rounded hover:bg-gray-100 cursor-pointer text-gray-700 group"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="flex items-center gap-2 w-full min-w-0">
        <div className="flex-shrink-0 flex items-center">
          <Input 
            type="checkbox" 
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </div>
        
        <div className="flex items-center gap-1 flex-1 min-w-0 overflow-hidden" onClick={handleCheckboxChange}>
          <div className="flex-shrink-0 flex justify-center items-center">
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
