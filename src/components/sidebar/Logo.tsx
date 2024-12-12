import React from 'react';
import { LayoutDashboard } from 'lucide-react';

interface LogoProps {
  isExpanded: boolean;
}

const Logo: React.FC<LogoProps> = ({ isExpanded }) => {
  return (
    <div className={`
      flex items-center gap-2 p-4 h-16 border-b border-gray-100
      ${isExpanded ? 'justify-start' : 'justify-center'}
    `}>
      <div className="flex-shrink-0 text-blue-600">
        <LayoutDashboard className="w-8 h-8" />
      </div>
      {isExpanded && (
        <h1 className="text-xl font-bold transition-opacity duration-200">
          PNG Health
        </h1>
      )}
    </div>
  );
};

export default Logo;