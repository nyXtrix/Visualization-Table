import {
  flexRender,
  type Cell
} from "@tanstack/react-table"
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown } from "lucide-react";

interface TableCellProps<TData> {
  cell: Cell<TData, unknown>
}

const TableCell = <TData,>({
  cell
}: TableCellProps<TData>) => {
  const isRowHeader = (cell.column.columnDef.meta as Record<string, any>)?.isRowHeader === true;
  const isRowLabelColumn = cell.column.id === "rowLabels" || (isRowHeader && cell.column.id === cell.row.getVisibleCells()[0].column.id);
  const value = cell.getValue();
  const table = cell.getContext().table;

  const allColumns = table.getVisibleLeafColumns();
  const colIndex = allColumns.findIndex((col) => col.id === cell.column.id);
  const leftOffset = isRowHeader ? colIndex * 200 : 0;

  const isNumber = (val: any) => {
    if (typeof val === "number") return true;
    if (typeof val === "string") {
      const trimmed = val.trim();
      return trimmed !== "" && !isNaN(Number(trimmed));
    }
    return false;
  };

  const isNumericValue = isNumber(value);

  const isParent = cell.row.getCanExpand();
  const localIndex = parseInt(cell.row.id.split('.').pop() || "0", 10);

  const bgClass = isParent 
    ? "bg-white dark:bg-gray-800" 
    : (localIndex % 2 === 0 ? "bg-gray-100 dark:bg-gray-900" : "bg-white dark:bg-gray-800");

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
        "px-4 py-2 text-sm border-r border-b border-gray-300 whitespace-nowrap transition-colors dark:text-gray-300/75 dark:border-gray-700",
        isRowHeader 
          ? `${bgClass} sticky z-10 left-0 text-gray-800 font-medium` 
          : `${bgClass} text-gray-600`,
        isNumericValue ? "text-right font-mono" : "text-left"
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
        <span className={cn(
          "truncate",
          isNumericValue ? "text-right" : "text-left w-full leading-tight"
        )}>
          {isRowHeader ? String(value ?? "") : flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )}
        </span>
      </div>
    </td>
  )
}

export default TableCell;