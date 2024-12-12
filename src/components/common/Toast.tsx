import { Toast, toast } from 'react-hot-toast';
import { X } from 'lucide-react';

// Custom toast styles
export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      style: {
        background: '#fff',
        color: '#1f2937',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      },
      icon: '✓',
      iconTheme: {
        primary: '#10B981',
        secondary: '#fff',
      },
    });
  },
  
  error: (message: string) => {
    toast.error(message, {
      style: {
        background: '#FEE2E2',
        color: '#991B1B',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #FCA5A5',
      },
      icon: '⚠',
      iconTheme: {
        primary: '#DC2626',
        secondary: '#FEE2E2',
      },
    });
  },

  warning: (message: string) => {
    toast(message, {
      icon: '⚠',
      style: {
        background: '#FEF3C7',
        color: '#92400E',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #FCD34D',
      },
    });
  },

  info: (message: string) => {
    toast(message, {
      icon: 'ℹ',
      style: {
        background: '#EFF6FF',
        color: '#1E40AF',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #BFDBFE',
      },
    });
  },
};

// Custom toast component
export const ToastComponent = ({ toast }: { toast: Toast }) => {
  return (
    <div
      className={`${
        toast.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {toast.message}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss()}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default showToast;