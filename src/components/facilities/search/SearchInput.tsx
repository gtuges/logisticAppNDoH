import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder,
  disabled = false,
  required = false
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input pr-20"
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {value ? (
          <button
            type="button"
            onClick={onClear}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        ) : (
          <Search className="w-4 h-4 text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default SearchInput;