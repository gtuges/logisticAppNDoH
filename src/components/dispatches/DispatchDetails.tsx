import React from 'react';
import { Tabs } from '../common/Tabs';
import TabHeader from './tabs/TabHeader';
import TabContent from './tabs/TabContent';
import { useDispatchTabs } from './hooks/useDispatchTabs';
import { DispatchDataProvider } from '../../contexts/DispatchDataContext';
import { Dispatch } from '../../types';

interface DispatchDetailsProps {
  dispatch: Dispatch | null;
}

const DispatchDetails: React.FC<DispatchDetailsProps> = ({ dispatch }) => {
  const { selectedTab, handleTabChange } = useDispatchTabs();

  if (!dispatch) return null;

  return (
    <DispatchDataProvider>
      <div className="mt-6 bg-white rounded-lg shadow-sm">
        <Tabs selectedIndex={selectedTab} onChange={handleTabChange}>
          <TabHeader 
            selectedTab={selectedTab} 
            onTabChange={handleTabChange} 
          />
          <TabContent selectedTab={selectedTab} />
        </Tabs>
      </div>
    </DispatchDataProvider>
  );
};

export default DispatchDetails;