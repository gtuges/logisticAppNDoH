import { useState, useEffect } from 'react';
import { Invoice } from '../../../../types/invoice';
import { useDispatchData } from '../../../../contexts/DispatchDataContext';

const GST_RATE = 0.1; // 10% GST

const initialState: Invoice = {
  invoiceNumber: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  totalWeightKg: 0,
  rate: 0,
  gst: 0,
  amount: 0
};

export const useInvoiceForm = (initialInvoice?: Invoice | null) => {
  const { dispatchData } = useDispatchData();
  const [formData, setFormData] = useState<Invoice>({
    ...initialState,
    ...initialInvoice,
    totalWeightKg: dispatchData.receipt?.totalWeightKg || 0
  });

  // Update totalWeightKg when receipt data changes
  useEffect(() => {
    if (dispatchData.receipt?.totalWeightKg !== undefined) {
      setFormData(prev => ({
        ...prev,
        totalWeightKg: dispatchData.receipt?.totalWeightKg || 0
      }));
    }
  }, [dispatchData.receipt?.totalWeightKg]);

  const handleChange = (field: keyof Invoice, value: any) => {
    let parsedValue = value;
    
    // Handle numeric fields
    if (['totalWeightKg', 'rate', 'gst', 'amount'].includes(field)) {
      parsedValue = value === '' ? 0 : parseFloat(value);
      if (isNaN(parsedValue)) parsedValue = 0;
    }

    setFormData(prev => ({ ...prev, [field]: parsedValue }));
  };

  const calculateTotals = () => {
    const subtotal = (formData.totalWeightKg || 0) * (formData.rate || 0);
    const gst = subtotal * GST_RATE;
    const total = subtotal + gst;

    setFormData(prev => ({
      ...prev,
      gst: parseFloat(gst.toFixed(2)),
      amount: parseFloat(total.toFixed(2))
    }));
  };

  return {
    formData,
    handleChange,
    calculateTotals
  };
};