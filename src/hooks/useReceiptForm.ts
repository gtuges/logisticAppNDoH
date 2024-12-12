import { useState, useCallback, useEffect } from 'react';
import { Receipt } from '../types/receipt';
import { sampleReceiptData } from '../data/sampleData';

// During development, use sample data as initial state
const initialState: Receipt = process.env.NODE_ENV === 'development' 
  ? sampleReceiptData 
  : {
      durationMin: 0,
      receivingOfficer: '',
      receivingOfficerDesignation: '',
      receivingOfficerPhone: '',
      transportModes: [],
      podNumber: '',
      isPodAttached: false,
      isPhoNotified: false,
      totalWeightKg: 0
    };

export const useReceiptForm = (savedReceipt: Receipt | null) => {
  const [formData, setFormData] = useState<Receipt>(() => ({
    ...initialState,
    ...savedReceipt
  }));

  useEffect(() => {
    if (savedReceipt) {
      setFormData(prev => ({
        ...prev,
        ...savedReceipt
      }));
    }
  }, [savedReceipt]);

  const handleFormChange = useCallback((field: keyof Receipt, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  return {
    formData,
    handleFormChange
  };
};