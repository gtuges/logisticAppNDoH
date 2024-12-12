import React, { useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { useDispatchData } from '../../../contexts/DispatchDataContext';
import InvoiceBasicInfo from './sections/InvoiceBasicInfo';
import InvoiceCalculations from './sections/InvoiceCalculations';
import { useInvoiceForm } from '../../../hooks/useInvoiceForm';
import Button from '../../common/Button';
import { Invoice } from '../../../types/invoice';

interface InvoiceFormProps {
  invoice?: Invoice | null;
  onSubmit: (data: Invoice) => void;
  onCancel: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoice, onSubmit, onCancel }) => {
  const { dispatchData } = useDispatchData();
  const { formData, handleChange, calculateTotals } = useInvoiceForm(
    invoice,
    dispatchData.receipt?.totalWeightKg
  );

  // Auto-calculate totals when weight or rate changes
  useEffect(() => {
    if (formData.totalWeightKg > 0 && formData.rate > 0) {
      calculateTotals();
    }
  }, [formData.totalWeightKg, formData.rate, calculateTotals]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <InvoiceBasicInfo 
        formData={formData} 
        onChange={handleChange} 
      />

      <InvoiceCalculations
        formData={formData}
        onChange={handleChange}
        onCalculate={calculateTotals}
      />

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" icon={Calculator}>
          Save Invoice
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;