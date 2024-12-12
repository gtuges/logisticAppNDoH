import React from 'react';
import { TabId } from '../../constants';
import ReceiptPanel from './ReceiptPanel';
import InvoicePanel from './InvoicePanel';
import AttachmentsPanel from '../../attachments/AttachmentsPanel';

interface TabContentProps {
  selectedTab: TabId;
}

const TabContent: React.FC<TabContentProps> = ({ selectedTab }) => {
  return (
    <div className="p-6">
      {selectedTab === 0 && <ReceiptPanel />}
      {selectedTab === 1 && <InvoicePanel />}
      {selectedTab === 2 && <AttachmentsPanel />}
    </div>
  );
};

export default TabContent;