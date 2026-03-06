import {
  flexRender,
  type Cell
} from "@tanstack/react-table"
import { cn } from "@/lib/utils";

interface TableCellProps<TData> {
  cell: Cell<TData, unknown>
}

const TableCell = <TData,>({
  cell
}: TableCellProps<TData>) => {
  const isPivot = cell.column.id.includes("|||");
  const value = cell.getValue();
  
  const isNumber = (val: any) => {
    if (typeof val === "number") return true;
    if (typeof val === "string") {
      const trimmed = val.trim();
      return trimmed !== "" && !isNaN(Number(trimmed));
    }
    return false;
  };

  const isNumericValue = isNumber(value);

  return (
    <td 
      style={{
        left: !isPivot ? cell.column.getStart("left") : undefined,
      }}
      className={cn(
        "px-4 py-2 text-sm border-r border-b border-gray-300 whitespace-nowrap transition-colors",
        !isPivot 
          ? "bg-gray-100 text-gray-800 font-medium sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" 
          : "bg-white text-gray-600",
        isNumericValue ? "text-right font-mono" : "text-left"
      )}
    >
      {flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      )}
    </td>
  )
}

export default TableCell;