import React from "react";
import { X } from "lucide-react";
import IconButton from "../ui/IconButton";

interface FieldItem {
  id: number;
  name: string;
}

interface DropzoneProps {
  title: string;
  fields?: FieldItem[];
  handleRemoveField?: (id: number) => void;
}

const Dropzone = ({
  title,
  fields = [],
  handleRemoveField
}: DropzoneProps) => {
  return (
    <div className="flex flex-col gap-1">

      <span className="text-sm font-medium text-gray-600">
        {title}
      </span>

      <div className="p-3 border border-gray-300 border-dashed rounded-sm min-h-10 flex flex-col gap-2">

        {fields.length === 0 ? (
          <span className="text-gray-400 flex justify-center items-center text-xs">
            Drag fields here
          </span>
        ) : (
          fields.map((field) => (
            <div
              key={field.id}
              className="px-2 py-1 bg-gray-100 border rounded text-sm w-full flex justify-between items-center"
            >
              <span className="truncate">
                {field.name}
              </span>

              <IconButton
                icon={X}
                className="p-0 cursor-pointer"
                iconClassName="h-4 w-4"
                variant="ghost"
                onClick={() => handleRemoveField?.(field.id)}
              />
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Dropzone;