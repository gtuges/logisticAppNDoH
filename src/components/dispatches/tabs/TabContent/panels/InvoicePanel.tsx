import React from 'react';
import { TabPanel } from '../../../../common/Tabs';
import InvoiceForm from '../../../invoice/InvoiceForm';
import { useInvoiceSubmit } from '../../../hooks/useInvoiceSubmit';

const InvoicePanel: React.FC = () => {
  const { handleSubmit } = useInvoiceSubmit();

  return (
    <TabPanel>
      <InvoiceForm
        onSubmit={handleSubmit}
        onCancel={() => {}}
      />
    </TabPanel>
  );
};

export default InvoicePanel;