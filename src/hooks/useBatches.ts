import { useState } from 'react';
import { Batch } from '../types';

const initialBatches: Batch[] = [
  {
    id: '1',
    name: 'Medical Supplies Q1',
    category: 'Medical',
    status: 'Processing',
    items: 1500,
    createdAt: '2024-03-15',
    region: 'Southern',
    logisticsCompany: 'Southern Region Carriers'
  },
  {
    id: '2',
    name: 'Vaccines Batch #245',
    category: 'Vaccines',
    status: 'Ready',
    items: 800,
    createdAt: '2024-03-18',
    region: 'Highlands',
    logisticsCompany: 'Highlands Logistics Ltd'
  },
  {
    id: '3',
    name: 'Emergency Supplies',
    category: 'Emergency',
    status: 'Completed',
    items: 350,
    createdAt: '2024-03-10',
    completedAt: '2024-03-12',
    region: 'Momase',
    logisticsCompany: 'Momase Transport Services'
  }
];

const useBatches = () => {
  const [batches, setBatches] = useState<Batch[]>(initialBatches);

  const addBatch = (batch: Omit<Batch, 'id'>) => {
    const newBatch = {
      ...batch,
      id: String(Date.now())
    };
    setBatches([...batches, newBatch]);
  };

  const updateBatch = (id: string, batch: Omit<Batch, 'id'>) => {
    setBatches(batches.map(b => 
      b.id === id ? { ...batch, id } : b
    ));
  };

  const deleteBatch = (id: string) => {
    setBatches(batches.filter(b => b.id !== id));
  };

  return {
    batches,
    addBatch,
    updateBatch,
    deleteBatch
  };
};

export default useBatches;