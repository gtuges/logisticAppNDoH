import { useState } from 'react';
import { TabId } from '../constants';

export const useDispatchTabs = (initialTab: TabId = 0) => {
  const [selectedTab, setSelectedTab] = useState<TabId>(initialTab);

  const handleTabChange = (tabId: TabId) => {
    setSelectedTab(tabId);
  };

  return {
    selectedTab,
    handleTabChange
  };
};