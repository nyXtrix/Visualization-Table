import React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import IconButton from "./IconButton";

const modalVariants = cva(
  "fixed z-50 flex flex-col w-full max-w-md bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 pointer-events-auto",
  {
    variants: {
      position: {
        center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg",
        "top-right": "top-4 right-4 rounded-lg",
        "top-left": "top-4 left-4 rounded-lg",
        "bottom-right": "bottom-4 right-4 rounded-lg",
        "bottom-left": "bottom-4 left-4 rounded-lg",
      },
    },
    defaultVariants: {
      position: "center",
    },
  }
);

interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  position,
  showCloseButton = true,
  className,
  overlayClassName,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0",
        overlayClassName
      )}
      onClick={handleBackdropClick}
    >
      <div className={cn(modalVariants({ position }), className)}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
          {showCloseButton && (
            <IconButton
              icon={X}
              onClick={onClose}
              iconClassName="h-5 w-5"
              variant="ghost"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
              title="Close"
            />
          )}
        </div>

        {children && <div className="p-4 flex-1 overflow-y-auto">{children}</div>}
      </div>
    </div>
  );
};

export default Modal;
