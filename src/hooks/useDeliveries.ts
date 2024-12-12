import { useState } from 'react';
import { Delivery } from '../types';

const initialDeliveries: Delivery[] = [
  {
    id: '1',
    facility: 'Port Moresby General Hospital',
    region: 'Southern',
    status: 'In Transit',
    date: '2024-03-20',
    items: 245
  },
  {
    id: '2',
    facility: 'Goroka Base Hospital',
    region: 'Highlands',
    status: 'Delivered',
    date: '2024-03-19',
    items: 180
  },
  {
    id: '3',
    facility: 'Lae International Hospital',
    region: 'Momase',
    status: 'Scheduled',
    date: '2024-03-21',
    items: 320
  }
];

export const useDeliveries = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);

  const addDelivery = (delivery: Omit<Delivery, 'id'>) => {
    const newDelivery = {
      ...delivery,
      id: String(Date.now())
    };
    setDeliveries([...deliveries, newDelivery]);
  };

  const updateDelivery = (id: string, delivery: Omit<Delivery, 'id'>) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { ...delivery, id } : d
    ));
  };

  const deleteDelivery = (id: string) => {
    setDeliveries(deliveries.filter(d => d.id !== id));
  };

  return {
    deliveries,
    addDelivery,
    updateDelivery,
    deleteDelivery
  };
};

export default useDeliveries;