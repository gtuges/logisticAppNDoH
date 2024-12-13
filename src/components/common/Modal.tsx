import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'lg'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    'full': 'max-w-[95%]'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className={`relative bg-white rounded-xl shadow-xl w-full ${sizeClasses[size]} transform transition-all`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 
              className="text-xl font-semibold text-gray-900" 
              id="modal-title"
            >
              {title}
            </h3>
            <Button
              variant="secondary"
              onClick={onClose}
              className="!p-1.5 hover:bg-gray-100 border-0"
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;