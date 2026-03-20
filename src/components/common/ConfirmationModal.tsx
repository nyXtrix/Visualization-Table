import React from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import IconButton from '../ui/IconButton';
import { cn } from '@/lib/utils';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
  variant?: 'danger' | 'primary';
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
  variant = 'primary'
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200 dark:bg-gray-900/50" 
        onClick={onClose}
      />
      <div 
        className={cn(
          "relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-gray-100 dark:border-gray-700 dark:bg-gray-800",
          "flex flex-col gap-0"
        )}
      >
        <div className="px-6 pt-6 pb-2 flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 leading-tight dark:text-gray-300">
            {title}
          </h3>
          <IconButton
            icon={X}
            variant="ghost"
            className="p-1 hover:bg-gray-100 -mr-1 -mt-1 group dark:hover:bg-gray-700 cursor-pointer"
            iconClassName="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
            onClick={onClose}
          />
        </div>
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
          {description && (
            <p className="text-sm text-gray-500 leading-relaxed font-sans dark:text-gray-400">
              {description}
            </p>
          )}
          
          {children && (
            <div className="w-full text-sm text-gray-700">
              {children}
            </div>
          )}
        </div>
        <div className="px-6 py-4 bg-gray-50/50 flex justify-end gap-3 border-t border-gray-100 dark:bg-gray-800/50 dark:border-gray-600">
          <Button
            variant="ghost"
            className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 font-semibold text-sm transition-colors rounded-lg dark:hover:bg-gray-600 cursor-pointer dark:text-gray-400"
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            className={cn(
              "px-5 py-2 font-bold text-sm transition-all shadow-md active:scale-[0.97] rounded-lg cursor-pointer",
              variant === 'danger' ? "bg-red-600 hover:bg-red-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
            )}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
      );
};

export default ConfirmationModal;