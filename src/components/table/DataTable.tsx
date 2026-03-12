import { memo, useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  type ColumnDef,
  type ExpandedState,
} from "@tanstack/react-table"

import TableHeader from "./TableHeader"
import TableBody from "./TableBody"
import Pagination from "./Pagination"

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

function DataTable<TData>({
  data,
  columns,
}: DataTableProps<TData>) {
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  })

  return (
    <div className="flex flex-col h-full w-full overflow-hidden rounded-md border">
      <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <table className="w-max min-w-full border-separate border-spacing-0 table-auto">
          <TableHeader table={table} />
          <TableBody table={table} />
        </table>
      </div>
      <Pagination table={table} />
    </div>
  )
}

export default memo(DataTable) as typeof DataTable;