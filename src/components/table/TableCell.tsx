import {
  flexRender,
  type Cell
} from "@tanstack/react-table";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown } from "lucide-react";
import { formatDate } from "@/utils/dateFormatter";
import { formatCompactNumber } from "@/utils/numberFormatter";

interface TableCellProps<TData> {
  cell: Cell<TData, unknown>
}

const TableCell = <TData,>({
  cell
}: TableCellProps<TData>) => {
  const { tableDensity, showZebraStripes } = useAppSelector((state) => state.ui.settings);
  const isRowHeader = (cell.column.columnDef.meta as Record<string, any>)?.isRowHeader === true;
  const isRowLabelColumn = cell.column.id === "rowLabels" || (isRowHeader && cell.column.id === cell.row.getVisibleCells()[0].column.id);
  const rawValue = cell.getValue();
  const value = (
    rawValue === null || 
    rawValue === undefined || 
    String(rawValue).trim() === "" || 
    String(rawValue) === "null" || 
    String(rawValue) === "undefined" ||
    String(rawValue) === "0" ||
    (typeof rawValue === 'number' && isNaN(rawValue)) ||
    rawValue === 0
  ) ? "-" : rawValue;
  const table = cell.getContext().table;

  const allColumns = table.getVisibleLeafColumns();
  const colIndex = allColumns.findIndex((col) => col.id === cell.column.id);
  const leftOffset = isRowHeader ? colIndex * 200 : 0;

  const isDateColumn = (cell.column.columnDef.meta as any)?.isDate === true || 
                       cell.column.id.toLowerCase().includes("date") || 
                       cell.column.id.toLowerCase().includes("time");
  const isNumericValue = typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)) && value !== "");

  let displayValue: string = String(value);
  if (isDateColumn || isRowLabelColumn || value instanceof Date) {
    displayValue = formatDate(value as any);
  } else if (isNumericValue) {
    displayValue = formatCompactNumber(value);
  }
  
  const isParent = cell.row.getCanExpand();
  const localIndex = parseInt(cell.row.id.split('.').pop() || "0", 10);

  const bgClass = isParent 
    ? "bg-white dark:bg-gray-800" 
    : (showZebraStripes && localIndex % 2 === 0 ? "bg-gray-100 dark:bg-gray-900" : "bg-white dark:bg-gray-800");

    const bufferWidth = isParent ? 0 : 16;

  return (
    <td 
      style={{
        left: isRowHeader ? `${leftOffset}px` : undefined,
        width: isRowHeader ? '200px' : cell.column.getSize(),
        minWidth: isRowHeader ? '200px' : cell.column.columnDef.minSize,
        paddingLeft: isRowLabelColumn ? `${cell.row.depth * 20 + bufferWidth}px` : undefined,
      }}
      className={cn(
        "px-4 border-r border-b border-gray-300 whitespace-nowrap transition-colors dark:text-gray-300/75 dark:border-gray-700",
        tableDensity === 'compact' ? "py-1 text-xs" : "py-2 text-sm",
        isRowHeader 
          ? `${bgClass} sticky z-10 left-0 text-gray-800 font-medium` 
          : `${bgClass} text-gray-600`,
        "text-left"
      )}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        {isRowLabelColumn && isParent && (
          <button
            onClick={cell.row.getToggleExpandedHandler()}
            className="p-0.5 hover:bg-gray-300 rounded transition-colors"
          >
            {cell.row.getIsExpanded() ? (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </button>
        )}
        <span 
          className={cn(
            "text-left leading-tight",
            value === "-" ? "w-full px-1 flex justify-center" : "truncate w-full block",
            isNumericValue ? "text-right font-mono" : "text-left"
          )}
        >
          {isRowHeader ? String(displayValue) : (
            value === "-" 
              ? "-" 
              : ((cell.column.columnDef.cell && !isNumericValue) 
                  ? flexRender(cell.column.columnDef.cell, cell.getContext()) 
                  : String(displayValue))
          )}
        </span>
      </div>
    </td>
  )
}

export default TableCell;