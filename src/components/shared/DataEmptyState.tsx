import { Database } from "lucide-react";
import FileUploader from "../inputs/FileUploader";

interface DataEmptyStateProps {
  fileUploadChnage: (file: File | null) => void;
}

const DataEmptyState = ({ fileUploadChnage }: DataEmptyStateProps) => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-50 dark:bg-transparent">

      <div className="flex flex-col items-center text-center gap-6 p-10 bg-white dark:bg-gray-900 dark:shadow-md dark:shadow-gray-600 dark:border-white/30 border rounded-xl shadow-sm max-w-md">

        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 dark:bg-primary/20">
          <Database className="h-8 w-8 text-primary dark:text-primary" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
            Upload your dataset
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Start by uploading a CSV file to explore and build visualizations.
          </p>
        </div>

        <FileUploader
          accept=".csv"
          title="Upload CSV file"
          description="Click to browse or drag & drop"
          onChange={fileUploadChnage}
        />

        <p className="text-xs text-gray-400 dark:text-gray-400">
          Supported format: CSV
        </p>

      </div>
    </div>
  );
};

export default DataEmptyState;