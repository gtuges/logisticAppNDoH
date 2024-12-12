import React from 'react';
import { TabPanel } from '../../../../common/Tabs';
import ReceiptForm from '../../../receipt/ReceiptForm';
import { useReceiptSubmit } from '../../../hooks/useReceiptSubmit';

const ReceiptPanel: React.FC = () => {
  const { handleSubmit } = useReceiptSubmit();

  return (
    <TabPanel>
      <ReceiptForm
        onSubmit={handleSubmit}
        onCancel={() => {}}
      />
    </TabPanel>
  );
};

export default ReceiptPanel;