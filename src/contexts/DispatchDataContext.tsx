import React, { createContext, useContext, useState, useCallback } from 'react';
import { Receipt } from '../types/receipt';
import { Invoice } from '../types/invoice';

interface DispatchData {
  receipt: Receipt | null;
  invoice: Invoice | null;
}

interface DispatchDataContextType {
  dispatchData: DispatchData;
  setReceiptData: (data: Receipt | ((prev: Receipt | null) => Receipt)) => void;
  setInvoiceData: (data: Invoice) => void;
  clearData: () => void;
}

const initialState: DispatchData = {
  receipt: null,
  invoice: null
};

const DispatchDataContext = createContext<DispatchDataContextType | undefined>(undefined);

export const DispatchDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dispatchData, setDispatchData] = useState<DispatchData>(initialState);

  const setReceiptData = useCallback((data: Receipt | ((prev: Receipt | null) => Receipt)) => {
    setDispatchData(prev => ({
      ...prev,
      receipt: typeof data === 'function' ? data(prev.receipt) : data
    }));
  }, []);

  const setInvoiceData = useCallback((data: Invoice) => {
    setDispatchData(prev => ({ ...prev, invoice: data }));
  }, []);

  const clearData = useCallback(() => {
    setDispatchData(initialState);
  }, []);

  return (
    <DispatchDataContext.Provider value={{ 
      dispatchData, 
      setReceiptData, 
      setInvoiceData, 
      clearData 
    }}>
      {children}
    </DispatchDataContext.Provider>
  );
};

export const useDispatchData = () => {
  const context = useContext(DispatchDataContext);
  if (context === undefined) {
    throw new Error('useDispatchData must be used within a DispatchDataProvider');
  }
  return context;
};