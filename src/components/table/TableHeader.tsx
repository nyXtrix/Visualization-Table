import { flexRender, type Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface TableHeaderProps<TData> {
  table: Table<TData>;
}

const TableHeader = <TData,>({ table }: TableHeaderProps<TData>) => {
  return (
    <thead className="sticky top-0 z-20 select-none">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="bg-white">
          {headerGroup.headers.map((header) => {
            const isPivot = header.column.id.includes("|||");
            const isPlaceholder = header.isPlaceholder;
            const isGrouped = header.colSpan > 1;

            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{
                  left: !isPivot ? header.column.getStart("left") : undefined,
                }}
                className={cn(
                  "px-4 py-3 text-xs uppercase tracking-wider font-bold border-r border-b border-gray-300 last:border-r-0 whitespace-nowrap transition-colors",
                  !isPivot 
                    ? "bg-gray-200 text-gray-900 sticky left-0 z-30" 
                    : (isGrouped ? "bg-gray-300 text-gray-900" : "bg-gray-50 text-gray-600"),
                  isPlaceholder 
                    ? "bg-gray-200" 
                    : "",
                  isGrouped ? "text-center" : "text-left"
                )}
              >
                {!isPlaceholder &&
                  flexRender(
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
