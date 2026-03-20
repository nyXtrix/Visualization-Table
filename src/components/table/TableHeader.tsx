import { flexRender, type Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface TableHeaderProps<TData> {
  table: Table<TData>;
}

const TableHeader = <TData,>({ table }: TableHeaderProps<TData>) => {
  return (
    <thead className="z-20 select-none">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="bg-white">
          {headerGroup.headers.map((header) => {
            const firstLeaf = header.column.getLeafColumns()[0];
            const isRowHeader = (firstLeaf?.columnDef.meta as Record<string, any>)?.isRowHeader === true;
            const isGrouped = !header.isPlaceholder && header.subHeaders && header.subHeaders.length > 0;
            
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
                  "px-4 py-3 text-xs uppercase tracking-wider font-bold border-r transition-colors border-gray-300 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600",
                  header.isPlaceholder ? "border-b-0" : "border-b",
                  isRowHeader ? "sticky left-0 z-30" : "",
                  isGrouped ? "text-center" : "text-left",
                  header.isPlaceholder ? "text-transparent" : "text-gray-800"
                )}
              >
                {!header.isPlaceholder && flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
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
