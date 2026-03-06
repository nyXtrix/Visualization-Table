import { useCallback, useState } from "react";
import { X, MoreVertical, Check } from "lucide-react";
import IconButton from "../ui/IconButton";
import { AGGREGATION_OPTIONS } from "@/constant/utils";
import type { AggregationType } from "@/types/visual";
import Button from "../ui/Button";
import { cn } from "@/lib/utils";

interface FieldItem {
  id: number;
  name: string;
  tableName: string;
  type?: string;
  aggregation?: string;
}

interface DropzoneProps {
  title: string;
  fields?: FieldItem[];
  handleRemoveField?: (id: number) => void;
  handleDropField?: (fileName: string, tableName: string, type?: string) => void;
  onUpdateAggregation?: (index: number, agg: AggregationType) => void;
}

const Dropzone = ({
  title,
  fields = [],
  handleRemoveField,
  handleDropField,
  onUpdateAggregation,
}: DropzoneProps) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, field: FieldItem) => {
    const payload = JSON.stringify({
      field: field.name,
      tableName: field.tableName,
      type: field.type,
    });
    e.dataTransfer.setData("field", payload);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const payload = e.dataTransfer.getData("field");
    if (!payload) return;
    try {
      const { field, tableName, type } = JSON.parse(payload);
      handleDropField?.(field, tableName, type);
    } catch (err) {
      console.error("Failed to parse drop payload", err);
    }
  }, [handleDropField]);

  const getAggTitle = (agg?: string) => {
    if (!agg) return "";
    return agg.charAt(0).toUpperCase() + agg.slice(1).replace("_", " ");
  };

  const getOptionsForType = (type?: string) => {
    const t = (type || "").toUpperCase();
    if (t.includes("INT") || t.includes("DOUBLE") || t.includes("FLOAT") || t.includes("DECIMAL") || t.includes("NUMERIC")) return AGGREGATION_OPTIONS.NUMERIC;
    if (t.includes("DATE") || t.includes("TIMESTAMP")) return AGGREGATION_OPTIONS.DATE;
    return AGGREGATION_OPTIONS.STRING;
  };

  return (
    <div
      className="flex flex-col gap-1"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <span className="text-sm font-medium text-gray-600 font-sans">{title}</span>

      <div className="p-3 border border-gray-300 border-dashed rounded-md min-h-12 flex flex-col gap-2 bg-gray-50/20">
        {fields.length === 0 ? (
          <span className="text-gray-400 flex justify-center items-center text-xs h-6">
            Drag fields here
          </span>
        ) : (
          fields.map((field, index) => (
            <div
              key={`${field.id}-${index}`}
              draggable
              onDragStart={(e) => handleDragStart(e, field)}
              className={cn(
                "relative group px-2 py-1.5 bg-white border border-gray-200 rounded text-xs w-full flex justify-between items-center shadow-sm hover:border-violet-300 cursor-pointer transition-colors active:scale-[0.98]",
                openMenuIndex === index ? "z-[101]" : "z-0"
              )}
            >
              <div className="flex items-center gap-1.5 truncate flex-1">
                <span className="text-gray-700 truncate">
                  {field.aggregation ? `${getAggTitle(field.aggregation)} of ` : ""}
                  <span className="font-medium">{field.name}</span>
                </span>
              </div>

              <div className="flex items-center gap-0.5">
                {field.aggregation && (
                  <div className="relative">
                    <IconButton
                      icon={MoreVertical}
                      className="p-0.5 hover:bg-gray-100 rounded"
                      iconClassName="text-gray-400 h-3 w-3 cursor-pointer"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuIndex(openMenuIndex === index ? null : index);
                      }}
                    />
                    
                    {openMenuIndex === index && (
                      <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-[100] py-1 animate-in fade-in zoom-in duration-100">
                        <div className="px-2 py-1 text-[10px] uppercase text-gray-400 font-semibold border-b border-gray-50 mb-1">
                          Aggregate by
                        </div>
                        {getOptionsForType(field.type).map((opt) => (
                          <Button
                            key={opt.value}
                            variant="ghost"
                            className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-violet-50 text-left text-gray-700 transition-colors cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateAggregation?.(index, opt.value);
                              setOpenMenuIndex(null);
                            }}
                          >
                            <span>{opt.label}</span>
                            {field.aggregation === opt.value && (
                              <Check className="h-3 w-3 text-violet-500" />
                            )}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                <IconButton
                  icon={X}
                  className="p-0.5 hover:bg-red-50 group-hover:opacity-100 transition-opacity"
                  iconClassName="text-gray-400 hover:text-red-500 h-3 w-3 cursor-pointer"
                  variant="ghost"
                  onClick={() => handleRemoveField?.(field.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
      {openMenuIndex !== null && (
        <div 
          className="fixed inset-0 z-[90]" 
          onClick={() => setOpenMenuIndex(null)}
        />
      )}
    </div>
  );
};

export default Dropzone;
