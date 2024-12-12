import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CollapseButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

const CollapseButton: React.FC<CollapseButtonProps> = ({ isExpanded, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        absolute -right-3 top-8 p-1 bg-white rounded-full border border-gray-200
        shadow-sm hover:bg-gray-50 transition-transform duration-300
        ${isExpanded ? 'transform rotate-180' : ''}
        hidden lg:block
      `}
    >
      <ChevronRight className="w-4 h-4 text-gray-600" />
    </button>
  );
};

export default CollapseButton;