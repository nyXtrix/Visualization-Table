import React from "react";
import type { Table } from "@tanstack/react-table";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import IconButton from "../ui/IconButton";
import Select from "../ui/Select";
import { PAGINATION_OPTIONS } from "@/constant/utils";
import Input from "../inputs/Input";

interface PaginationProps<TData> {
  table: Table<TData>;
}

export default function Pagination<TData>({ table }: PaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const [page, setPage] = React.useState<number | string>(pageIndex + 1);

  React.useEffect(() => {
    setPage(pageIndex + 1);
  }, [pageIndex]);
  return (
    <div className="flex items-center justify-between px-2 py-4 border-t bg-gray-50/50 dark:bg-gray-800">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rows per page</span>
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            options={PAGINATION_OPTIONS}
          />
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">Rows: {table.getRowCount()} Columns: {table.getAllLeafColumns().length}</span>
      </div>

      <div className="flex items-center gap-1">
        <IconButton
          icon={ChevronFirst}
          variant="ghost"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-1.5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        />
        <IconButton
          icon={ChevronLeft}
          variant="ghost"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-1.5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        />
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <span>Page</span>
          <Input
            value={page}
            onChange={(e) => {
              setPage(e.target.value);
            }}
            onKeyDown={(e)=> {
              if (e.key === "Enter") {
                const newPage = page ? Number(page) : 1;
                table.setPageIndex(newPage - 1);
                setPage(newPage);
                e.preventDefault();
                e.currentTarget.blur();
              }
            }}
            onBlur={() => {
              setPage(table.getState().pagination.pageIndex + 1);
            }}
            className="h-6 p-1.5 text-center dark:focus:ring-amber-500 focus:border-none"
            style={{ width: `${Math.max(String(page).length, 1) + 2}ch`, minWidth: '3ch' }}
          />
          <span className="flex gap-2"> of <span>{table.getPageCount() || 1} </span> </span>
        </div>
        <IconButton
          icon={ChevronRight}
          variant="ghost"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="p-1.5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        />
        <IconButton
          icon={ChevronLast}
          variant="ghost"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
          className="p-1.5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
