import { createContext, useCallback, useContext, useState } from 'react';
import Toaster from '../components/ui/Toaster';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type }]);
    // console.log(toasts, message, type, id);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);
  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className='toaster-container'>
        {toasts.map((toast) => (
          <Toaster
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
