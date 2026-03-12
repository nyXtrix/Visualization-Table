import { useAppSelector } from '@/store/hooks';
import Toast from './Toast';

const ToastContainer = () => {
  const toasts = useAppSelector((state) => state.toast.toasts);

  return (
    <div 
      className="fixed top-4 right-4 z-100 flex flex-col gap-3 pointer-events-none"
      style={{ minWidth: '320px', maxWidth: '400px' }}
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
