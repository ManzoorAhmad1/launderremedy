import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeConfig = {
    success: {
      icon: <CheckCircle className="w-5 h-5" />,
      bgColor: 'bg-accent-green',
      textColor: 'text-white',
      iconColor: 'text-white',
    },
    error: {
      icon: <AlertCircle className="w-5 h-5" />,
      bgColor: 'bg-accent-red',
      textColor: 'text-white',
      iconColor: 'text-white',
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5" />,
      bgColor: 'bg-accent-yellow',
      textColor: 'text-neutral-900',
      iconColor: 'text-neutral-900',
    },
    info: {
      icon: <Info className="w-5 h-5" />,
      bgColor: 'bg-accent-blue',
      textColor: 'text-white',
      iconColor: 'text-white',
    },
  };

  const config = typeConfig[type];

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${config.bgColor} ${config.textColor} rounded-xl shadow-lg p-4 max-w-sm`}>
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 ${config.iconColor}`}>
            {config.icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              onClose?.();
            }}
            className="flex-shrink-0 ml-3 hover:opacity-80 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast container for multiple toasts
export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const showToast = (toast: Omit<ToastProps, 'onClose'>) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
};

// Hook for showing toasts
export const useToast = () => {
  const show = (message: string, type?: ToastProps['type'], duration?: number) => {
    // Implementation depends on your state management
    // You might want to use a context or global state
    console.log(`[Toast ${type}]: ${message}`);
    // In a real app, you would dispatch to a toast store
  };

  return { show };
};

export default Toast;