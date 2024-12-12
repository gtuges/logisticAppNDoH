import React from 'react';
import { TabId } from '../../constants';
import ReceiptPanel from './ReceiptPanel';
import InvoicePanel from './InvoicePanel';

interface TabContentProps {
  selectedTab: TabId;
}

const TabContent: React.FC<TabContentProps> = ({ selectedTab }) => {
  return (
    <div className="p-6">
      {selectedTab === 0 && <ReceiptPanel />}
      {selectedTab === 1 && <InvoicePanel />}
    </div>
  );
};

export default TabContent;