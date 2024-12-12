import React from 'react';
import { TabPanel } from '../../common/Tabs';
import ReceiptForm from '../receipt/ReceiptForm';
import InvoiceForm from '../invoice/InvoiceForm';
import AttachmentsPanel from '../attachments/AttachmentsPanel';
import { TabId } from '../constants';

interface TabContentProps {
  selectedTab: TabId;
}

const TabContent: React.FC<TabContentProps> = ({ selectedTab }) => {
  return (
    <div className="p-6">
      {selectedTab === 0 && (
        <TabPanel>
          <ReceiptForm onCancel={() => {}} />
        </TabPanel>
      )}
      {selectedTab === 1 && (
        <TabPanel>
          <InvoiceForm onCancel={() => {}} />
        </TabPanel>
      )}
      {selectedTab === 2 && <AttachmentsPanel />}
    </div>
  );
};

export default TabContent;