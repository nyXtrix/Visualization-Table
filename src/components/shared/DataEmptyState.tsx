import { Database, Upload } from "lucide-react"
import IconButton from "../ui/IconButton"

interface DataEmptyStateProps {
  onUploadClick?: () => void
}

const DataEmptyState = ({ onUploadClick }: DataEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 py-10 gap-4">

      <Database className="w-10 h-10 text-gray-400" />

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">
          No dataset loaded
        </span>

        <span className="text-xs text-gray-500">
          Upload a CSV file to start building your table
        </span>
      </div>

      <IconButton
        icon={Upload}
        variant="primary"
        className="px-3 py-2 text-sm rounded-md cursor-pointer"
        onClick={onUploadClick}
      >
        Upload CSV
      </IconButton>

    </div>
  )
}

export default DataEmptyState