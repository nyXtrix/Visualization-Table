import React from "react";
import IconButton from "../../components/ui/IconButton";
import { FolderOpen, Upload } from "lucide-react";

const EmptyState = () => {
  return (
    <div className=" flex flex-col gap-2 h-full w-full justify-center items-center bg-white border">
      <div>
        <FolderOpen className="h-10 w-10" strokeWidth={1.5} />
      </div>
      <h3 className="font-medium text-lg">
        Upload a CSV or Excel file to get started!
      </h3>
      <div>
        <IconButton icon={Upload} className="cursor-pointer">
          Upload
        </IconButton>
      </div>
    </div>
  );
};

export default EmptyState;
