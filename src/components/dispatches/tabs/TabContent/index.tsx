import React from 'react';
import { TabId } from '../../constants';
import { TabContentProps } from './types';
import ReceiptPanel from './panels/ReceiptPanel';
import InvoicePanel from './panels/InvoicePanel';
import AttachmentsPanel from './panels/AttachmentsPanel';

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