import React from 'react';
import { TabPanel } from '../../common/Tabs';
import ReceiptForm from '../receipt/ReceiptForm';
import InvoiceForm from '../invoice/InvoiceForm';
import toast from 'react-hot-toast';

interface TabContentProps {
  selectedTab: number;
}

const TabContent: React.FC<TabContentProps> = ({ selectedTab }) => {
  const handleReceiptSubmit = (data: any) => {
    console.log('Receipt data:', data);
    toast.success('Receipt details saved successfully');
  };

  const handleInvoiceSubmit = (data: any) => {
    console.log('Invoice data:', data);
    toast.success('Invoice details saved successfully');
  };

  return (
    <div className="p-6">
      {selectedTab === 0 && (
        <TabPanel>
          <ReceiptForm
            onSubmit={handleReceiptSubmit}
            onCancel={() => {}}
          />
        </TabPanel>
      )}
      {selectedTab === 1 && (
        <TabPanel>
          <InvoiceForm
            onSubmit={handleInvoiceSubmit}
            onCancel={() => {}}
          />
        </TabPanel>
      )}
    </div>
  );
};

export default TabContent;