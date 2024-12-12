import React from 'react';
import { Search } from 'lucide-react';

interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const UserSearch: React.FC<UserSearchProps> = ({ 
  value, 
  onChange,
  placeholder = 'Search users by name or email...'
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-input pl-4 pr-10"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default UserSearch;