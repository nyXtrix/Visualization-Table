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
  const table = cell.getContext().table;
  const rowIndex = cell.row.index;
  const isEven = rowIndex % 2 === 0;

  const allColumns = table.getVisibleLeafColumns();
  const colIndex = allColumns.findIndex((col) => col.id === cell.column.id);
  const leftOffset = !isPivot ? colIndex * 200 : 0;

  const isNumber = (val: any) => {
    if (typeof val === "number") return true;
    if (typeof val === "string") {
      const trimmed = val.trim();
      return trimmed !== "" && !isNaN(Number(trimmed));
    }
    return false;
  };

  const isNumericValue = isNumber(value);

  const regularBg = isEven ? "bg-white" : "bg-gray-100";
  const stickyBg = isEven ? "bg-gray-100" : "bg-gray-200";

  return (
    <td 
      style={{
        left: !isPivot ? `${leftOffset}px` : undefined,
        width: !isPivot ? '200px' : cell.column.getSize(),
        minWidth: !isPivot ? '200px' : cell.column.columnDef.minSize,
      }}
      className={cn(
        "px-4 py-2 text-sm border-r border-b border-gray-300 whitespace-nowrap transition-colors",
        !isPivot 
          ? `${stickyBg} text-gray-800 font-medium shadow-sm` 
          : `${regularBg} text-gray-600`,
        isNumericValue ? "text-right font-mono" : "text-left"
      )}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <span className={cn(
          "truncate",
          isNumericValue ? "text-right" : "text-left w-full leading-tight"
        )}>
          {!isPivot ? String(value ?? "") : flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )}
        </span>
      </div>
    </td>
  )
}

export default TableCell;