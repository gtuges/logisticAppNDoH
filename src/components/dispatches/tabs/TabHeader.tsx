import React from 'react';
import { TabList, Tab } from '../../common/Tabs';

interface TabHeaderProps {
  selectedTab: number;
  onTabChange: (index: number) => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({ selectedTab, onTabChange }) => {
  const tabs = [
    { id: 0, label: 'Receipt Details' },
    { id: 1, label: 'Invoice Details' }
  ];

  return (
    <TabList>
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          selected={selectedTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabList>
  );
};

export default TabHeader;