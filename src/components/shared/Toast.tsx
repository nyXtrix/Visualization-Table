import { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { removeToast, type ToastItem } from '@/store/toastSlice';
import { cn } from '@/lib/utils';

interface ToastProps {
  toast: ToastItem;
}

const Toast = ({ toast }: ToastProps) => {
  const dispatch = useAppDispatch();
  const { id, message, description, type, duration = 5000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(id));
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, dispatch]);

  const variants = {
    success: {
      bg: 'bg-emerald-50 border-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      text: 'text-emerald-800',
      desc: 'text-emerald-600',
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      text: 'text-amber-800',
      desc: 'text-amber-600',
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      text: 'text-red-800',
      desc: 'text-red-600',
    },
  };

  const variant = variants[type];

  return (
    <div
      className={cn(
        'flex w-full max-w-sm rounded-lg border shadow-lg overflow-hidden animate-in slide-in-from-right duration-300 p-4 relative',
        variant.bg
      )}
    >
      <div className="shrink-0">{variant.icon}</div>
      <div className="ml-3 mr-6 flex-1">
        <h3 className={cn('text-sm font-semibold', variant.text)}>{message}</h3>
        {description && <p className={cn('mt-1 text-xs leading-relaxed', variant.desc)}>{description}</p>}
      </div>
      <button
        onClick={() => dispatch(removeToast(id))}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
