import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import IconButton from "../ui/IconButton";
import Select from "../ui/Select";
import { PAGINATION_OPTIONS } from "@/constant/utils";

interface PaginationProps<TData> {
  table: Table<TData>;
}

export default function Pagination<TData>({ table }: PaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 py-4 border-t bg-gray-50/50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Rows per page</span>
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            options={PAGINATION_OPTIONS}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <IconButton
          icon={ChevronLeft}
          variant="ghost"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-1.5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        />
        <div className="text-sm font-medium text-gray-700">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() || 1}
        </div>
        <IconButton
          icon={ChevronRight}
          variant="ghost"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="p-1.5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
