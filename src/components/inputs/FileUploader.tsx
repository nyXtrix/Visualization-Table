import React from "react";
import { Upload } from "lucide-react";
import InputWithIcon from "./InputWithIcon";

interface FileUploaderProps {
  label?: string;
  error?: string;
  accept?: string;
  onChange?: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  error,
  accept,
  onChange,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange?.(file);
  };

  return (
    <InputWithIcon
      type="file"
      label={label}
      error={error}
      accept={accept}
      icon={Upload}
      iconPosition="right"
      onChange={handleFileChange}
    />
  );
};

export default FileUploader;