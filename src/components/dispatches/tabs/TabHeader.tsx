import React from 'react';
import { TabList, Tab } from '../../common/Tabs';
import { TABS, TabId } from '../constants';

interface TabHeaderProps {
  selectedTab: TabId;
  onTabChange: (index: TabId) => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({ selectedTab, onTabChange }) => {
  return (
    <TabList>
      {TABS.map(tab => (
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