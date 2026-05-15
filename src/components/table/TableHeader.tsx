import { flexRender, type Table } from "@tanstack/react-table";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { cn } from "@/lib/utils";
import { setSortConfig, removeSort } from "@/store/visualSlice";
import { 
  Menu, 
  ChevronUp, 
  ChevronDown, 
  ArrowUpAZ, 
  ArrowDownZA, 
  X 
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import IconButton from "../ui/IconButton";

interface TableHeaderProps<TData> {
  table: Table<TData>;
}

const TableHeader = <TData,>({ table }: TableHeaderProps<TData>) => {
  const { tableDensity } = useAppSelector((state) => state.ui.settings);
  const { sortConfig } = useAppSelector((state) => state.visual);
  const dispatch = useAppDispatch();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <thead className="z-20 select-none">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="bg-white">
          {headerGroup.headers.map((header) => {
            const firstLeaf = header.column.getLeafColumns()[0];
            const isRowHeader = (firstLeaf?.columnDef.meta as Record<string, any>)?.isRowHeader === true;
            const isGrouped = !header.isPlaceholder && header.subHeaders && header.subHeaders.length > 0;
            const columnId = header.column.id;
            const isSorted = sortConfig?.columnId === columnId;
            const isSortedAsc = isSorted && sortConfig?.direction === 'asc';
            const isSortedDesc = isSorted && sortConfig?.direction === 'desc';

            const allColumns = table.getVisibleLeafColumns();
            const colIndex = allColumns.findIndex(
              (col) => col.id === firstLeaf?.id,
            );
            const leftOffset = isRowHeader ? colIndex * 200 : 0;

            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{
                  left: isRowHeader ? `${leftOffset}px` : undefined,
                  width: isRowHeader ? "200px" : header.column.getSize(),
                  minWidth: isRowHeader ? "200px" : header.column.getSize(),
                }}
                className={cn(
                  "px-4 uppercase tracking-wider font-bold border-r transition-colors border-gray-300 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 group",
                  tableDensity === 'compact' ? "py-1.5 text-[10px]" : "py-3 text-xs",
                  header.isPlaceholder ? "border-b-0" : "border-b",
                  isRowHeader ? "sticky left-0 z-30" : "",
                  isGrouped ? "text-center" : "text-left",
                  header.isPlaceholder ? "text-transparent" : "text-gray-800"
                )}
              >
                {!header.isPlaceholder && (
                  <div className={cn(
                    "flex items-center gap-1",
                    isGrouped ? "justify-center" : "justify-between"
                  )}>
                    <div className="flex items-center gap-1 overflow-hidden truncate">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {isSorted && (
                        sortConfig.direction === 'asc' ? <ChevronUp size={14} className="shrink-0" /> : <ChevronDown size={14} className="shrink-0" />
                      )}
                    </div>
                    
                    {!isRowHeader && !isGrouped && (
                      <div className="relative">
                        <IconButton
                          onClick={() => setOpenMenuId(openMenuId === header.id ? null : header.id)}
                          className={cn(
                            "p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-opacity",
                            openMenuId === header.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          )}
                          icon={Menu}
                          iconClassName="h-3 w-3"
                          variant="ghost"
                          size="sm"
                        />

                        {openMenuId === header.id && (
                          <div
                            ref={menuRef}
                            className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50 overflow-hidden"
                          >
                            {!isSortedAsc && (
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(setSortConfig({ columnId, direction: 'asc' }));
                                  setOpenMenuId(null);
                                }}
                                icon={ArrowUpAZ}
                                iconClassName="h-3 w-3"
                                variant="ghost"
                                size="sm"
                                className="w-full text-left px-3 py-2 text-[11px] flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 normal-case font-medium"
                              >
                                Sort Ascending
                              </IconButton>
                            )}
                            {!isSortedDesc && (
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(setSortConfig({ columnId, direction: 'desc' }));
                                  setOpenMenuId(null);
                                }}
                                icon={ArrowDownZA}
                                iconClassName="h-3 w-3"
                                variant="ghost"
                                size="sm"
                                className="w-full text-left px-3 py-2 text-[11px] flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 normal-case font-medium"
                              >
                                Sort Descending
                              </IconButton>
                            )}
                            {isSorted && (
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(removeSort());
                                  setOpenMenuId(null);
                                }}
                                icon={X}
                                iconClassName="h-3 w-3"
                                variant="ghost"
                                size="sm"
                                className="w-full text-left px-3 py-2 text-[11px] flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 normal-case font-medium border-t border-gray-200 dark:border-gray-700"
                              >
                                Remove Sort
                              </IconButton>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
