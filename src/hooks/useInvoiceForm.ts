import { useState, useEffect, useCallback } from 'react';
import { Invoice } from '../types/invoice';
import { sampleInvoiceData } from '../data/sampleData';

const GST_RATE = 0.1; // 10% GST

// During development, use sample data as initial state
const initialState: Invoice = process.env.NODE_ENV === 'development'
  ? sampleInvoiceData
  : {
      invoiceNumber: '',
      invoiceDate: new Date().toISOString().split('T')[0],
      totalWeightKg: 0,
      rate: 0,
      gst: 0,
      amount: 0
    };

export const useInvoiceForm = (savedInvoice: Invoice | null, initialWeight: number = 0) => {
  const [formData, setFormData] = useState<Invoice>(() => ({
    ...initialState,
    totalWeightKg: initialWeight || initialState.totalWeightKg
  }));

  useEffect(() => {
    if (savedInvoice) {
      setFormData(prev => ({
        ...prev,
        ...savedInvoice
      }));
    }
  }, [savedInvoice]);

  useEffect(() => {
    if (initialWeight > 0) {
      setFormData(prev => ({
        ...prev,
        totalWeightKg: initialWeight
      }));
    }
  }, [initialWeight]);

  const calculateTotals = useCallback(() => {
    const subtotal = formData.totalWeightKg * formData.rate;
    const gst = subtotal * GST_RATE;
    const total = subtotal + gst;

    setFormData(prev => ({
      ...prev,
      gst: parseFloat(gst.toFixed(2)),
      amount: parseFloat(total.toFixed(2))
    }));
  }, [formData.totalWeightKg, formData.rate]);

  const handleChange = useCallback((field: keyof Invoice, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  return {
    formData,
    handleChange,
    calculateTotals
  };
};