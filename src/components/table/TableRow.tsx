import type { Row } from "@tanstack/react-table"
import TableCell from "./TableCell"
import { cn } from "@/lib/utils";

interface TableRowProps<TData> {
  row: Row<TData>
  className?:string;
  style?: React.CSSProperties
}

export default function TableRow<TData>({
  row,
  className,
  style
}: TableRowProps<TData>) {

  return (
    <tr style={style} className={cn("w-full border hover:bg-gray-50", className)}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} cell={cell} />
      ))}
    </tr>
  )
}