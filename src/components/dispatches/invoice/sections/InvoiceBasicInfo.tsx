import React from 'react';
import { Receipt, Calendar } from 'lucide-react';
import FormField from '../../../common/FormField';
import { Invoice } from '../../../../types/invoice';

interface InvoiceBasicInfoProps {
  formData: Invoice;
  onChange: (field: keyof Invoice, value: any) => void;
}

const InvoiceBasicInfo: React.FC<InvoiceBasicInfoProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField 
          label="Invoice Number" 
          icon={Receipt}
          required
        >
          <input
            type="text"
            value={formData.invoiceNumber}
            onChange={(e) => onChange('invoiceNumber', e.target.value)}
            className="form-input"
            required
            placeholder="e.g., INV-2024-001"
          />
        </FormField>

        <FormField 
          label="Invoice Date" 
          icon={Calendar}
          required
        >
          <input
            type="date"
            value={formData.invoiceDate}
            onChange={(e) => onChange('invoiceDate', e.target.value)}
            className="form-input"
            required
          />
        </FormField>
      </div>
    </div>
  );
};

export default InvoiceBasicInfo;