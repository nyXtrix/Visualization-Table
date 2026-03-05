import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
} from "@tanstack/react-table"

import TableHeader from "./TableHeader"
import TableBody from "./TableBody"

interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
}

export default function DataTable<TData>({
  data,
  columns
}: DataTableProps<TData>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="w-full overflow-auto rounded-md border">
      <table className="w-full border-collapse">
        <TableHeader table={table} />
        <TableBody table={table} />
      </table>
    </div>
  )
}