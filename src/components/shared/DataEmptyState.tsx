import { Database } from "lucide-react";
import FileUploader from "../inputs/FileUploader";

interface DataEmptyStateProps {
  fileUploadChnage: (file: File | null) => void;
}

const DataEmptyState = ({ fileUploadChnage }: DataEmptyStateProps) => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-50">

      <div className="flex flex-col items-center text-center gap-6 p-10 bg-white border rounded-xl shadow-sm max-w-md">

        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gray-100">
          <Database className="h-6 w-6 text-gray-500" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800">
            Upload your dataset
          </h3>

          <p className="text-sm text-gray-500">
            Start by uploading a CSV file to explore and build visualizations.
          </p>
        </div>

        <FileUploader
          accept=".csv"
          title="Upload CSV file"
          description="Click to browse or drag & drop"
          onChange={fileUploadChnage}
        />

        <p className="text-xs text-gray-400">
          Supported format: CSV
        </p>

      </div>
    </div>
  );
};

export default DataEmptyState;