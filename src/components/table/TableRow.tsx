import {
  type Row
} from "@tanstack/react-table"
import TableCell from "./TableCell"
import { cn } from "@/lib/utils"

interface TableRowProps<TData> {
  row: Row<TData>
  className?: string
  style?: React.CSSProperties
}

const TableRow = <TData,>({
  row,
  className,
  style
}: TableRowProps<TData>) => {
  return (
    <tr 
      className={cn("hover:bg-gray-50 transition-colors group", className)}
      style={style}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} cell={cell} />
      ))}
    </tr>
  )
}

export default TableRow;