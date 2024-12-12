import { useState, useCallback, useEffect } from 'react';
import { Receipt } from '../../../../types/receipt';
import { sampleReceiptData } from '../../../../data/sampleData';

// Use sample data in development mode
const getInitialState = (savedReceipt: Receipt | null): Receipt => {
  if (process.env.NODE_ENV === 'development' && !savedReceipt) {
    return { ...sampleReceiptData };
  }
  
  return {
    durationMin: 0,
    receivingOfficer: '',
    receivingOfficerDesignation: '',
    receivingOfficerPhone: '',
    transportModes: [],
    podNumber: '',
    isPodAttached: false,
    isPhoNotified: false,
    totalWeightKg: 0,
    ...savedReceipt
  };
};

export const useReceiptForm = (savedReceipt: Receipt | null) => {
  const [formData, setFormData] = useState<Receipt>(() => 
    getInitialState(savedReceipt)
  );

  // Update form when savedReceipt changes
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