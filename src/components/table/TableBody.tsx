import type { Table } from "@tanstack/react-table"
import TableRow from "./TableRow"

interface TableBodyProps<TData> {
  table: Table<TData>
}

export default function TableBody<TData>({
  table
}: TableBodyProps<TData>) {

  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} row={row} />
      ))}
    </tbody>
  )
}