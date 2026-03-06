import React, { useRef, useState } from "react";
import { FileText, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Input from "./Input";

interface FileUploaderProps {
  label?: string;
  error?: string;
  title:string;
  description?:string;
  icon?: LucideIcon;
  accept?: string;
  onChange?: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  error,
  title,
  description,
  icon: Icon,
  accept,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFile = (file: File | null) => {
    if (file) setFileName(file.name);
    onChange?.(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] || null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0] || null);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <Input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleInputChange}
      />

      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-lg p-8 cursor-pointer transition-all",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50",
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {Icon && <Icon className="h-8 w-8 text-gray-400" />}

        {!fileName ? (<div className="text-center">
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>):

         (
          <div className="flex items-start gap-2 text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded">
            <FileText className="h-4 w-4" />
            {fileName}
          </div>
        )}
      </div>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default FileUploader;
