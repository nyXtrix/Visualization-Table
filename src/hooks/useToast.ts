import { useAppDispatch } from '@/store/hooks';
import { addToast, type ToastType } from '@/store/toastSlice';

interface ShowToastOptions {
  message: string;
  type: ToastType;
  description?: string;
  duration?: number;
}

export const useToast = () => {
  const dispatch = useAppDispatch();

  const showToast = ({ message, type, description, duration }: ShowToastOptions) => {
    dispatch(addToast({ message, type, description, duration }));
  };

  return { showToast };
};
