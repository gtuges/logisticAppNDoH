import React from 'react';

interface TabsProps {
  children: React.ReactNode;
  selectedIndex: number;
  onChange: (index: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  return <div className="tabs">{children}</div>;
};

interface TabListProps {
  children: React.ReactNode;
}

export const TabList: React.FC<TabListProps> = ({ children }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px" aria-label="Tabs">
        {children}
      </nav>
    </div>
  );
};

interface TabProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export const Tab: React.FC<TabProps> = ({ children, selected, onClick }) => {
  return (
    <button
      type="button"
      className={`
        py-4 px-6 border-b-2 font-medium text-sm outline-none focus:outline-none
        ${selected 
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface TabPanelProps {
  children: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return <div className="tab-panel">{children}</div>;
};