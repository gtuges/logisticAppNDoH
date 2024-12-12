import React, { createContext, useContext, useState } from 'react';
import { Batch } from '../types';

interface BatchContextType {
  activeBatch: Batch | null;
  setActiveBatch: (batch: Batch | null) => void;
}

const BatchContext = createContext<BatchContextType | undefined>(undefined);

export const BatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeBatch, setActiveBatch] = useState<Batch | null>(null);

  return (
    <BatchContext.Provider value={{ activeBatch, setActiveBatch }}>
      {children}
    </BatchContext.Provider>
  );
};

export const useBatchContext = () => {
  const context = useContext(BatchContext);
  if (context === undefined) {
    throw new Error('useBatchContext must be used within a BatchProvider');
  }
  return context;
};