import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormFieldProps {
  label: string;
  icon?: LucideIcon;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  icon: Icon,
  error,
  required,
  className = '',
  children
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        <div className="flex items-center gap-1.5">
          {Icon && <Icon className="w-4 h-4 text-gray-500" />}
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </div>
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;