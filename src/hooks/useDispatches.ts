import { useState } from 'react';
import { Dispatch } from '../types';

const initialDispatches: Dispatch[] = [
  {
    id: '1',
    batchId: '1',
    fromFacilityId: 1, // AMS LAE
    toFacilityId: 2, // AMS BADILI
    dispatchDate: '2024-03-20',
    estimatedArrival: '2024-03-22',
    msivNumber: 'MSIV-001',
    dispatchNumber: 'DSP-001'
  },
  {
    id: '2',
    batchId: '1',
    fromFacilityId: 3, // AMS MADANG
    toFacilityId: 4, // AMS KOKOPO
    dispatchDate: '2024-03-21',
    estimatedArrival: '2024-03-23',
    msivNumber: 'MSIV-002',
    dispatchNumber: 'DSP-002'
  },
  {
    id: '3',
    batchId: '1',
    fromFacilityId: 5, // AMS HAGEN
    toFacilityId: 6, // AMS WEWAK
    dispatchDate: '2024-03-22',
    estimatedArrival: '2024-03-24',
    msivNumber: 'MSIV-003',
    dispatchNumber: 'DSP-003'
  },
  {
    id: '4',
    batchId: '1',
    fromFacilityId: 7, // BOC LAE
    toFacilityId: 8, // BOC POM
    dispatchDate: '2024-03-23',
    estimatedArrival: '2024-03-25',
    msivNumber: 'MSIV-004',
    dispatchNumber: 'DSP-004'
  },
  {
    id: '5',
    batchId: '1',
    fromFacilityId: 9, // BOC HAGEN/KALEX
    toFacilityId: 10, // LD LOGISTICS YARD - LAE
    dispatchDate: '2024-03-24',
    estimatedArrival: '2024-03-26',
    msivNumber: 'MSIV-005',
    dispatchNumber: 'DSP-005'
  },
  {
    id: '6',
    batchId: '2',
    fromFacilityId: 11, // LD LOGISTICS YARD - GOROKA
    toFacilityId: 12, // LD LOGISTICS YARD - WEWAK
    dispatchDate: '2024-03-25',
    estimatedArrival: '2024-03-27',
    msivNumber: 'MSIV-006',
    dispatchNumber: 'DSP-006'
  },
  {
    id: '7',
    batchId: '2',
    fromFacilityId: 13, // LD LOGISTICS YARD - MADANG
    toFacilityId: 14, // PROTOCOL YARD - POM
    dispatchDate: '2024-03-26',
    estimatedArrival: '2024-03-28',
    msivNumber: 'MSIV-007',
    dispatchNumber: 'DSP-007'
  },
  {
    id: '8',
    batchId: '2',
    fromFacilityId: 15, // PROTOCOL YARD - HAGEN
    toFacilityId: 16, // EXPRESS CUSTOMS LIMITED YARD - POM
    dispatchDate: '2024-03-27',
    estimatedArrival: '2024-03-29',
    msivNumber: 'MSIV-008',
    dispatchNumber: 'DSP-008'
  },
  {
    id: '9',
    batchId: '3',
    fromFacilityId: 17, // EXPRESS CUSTOMS LIMITED YARD - LAE
    toFacilityId: 18, // POST PNG YARD - LAE
    dispatchDate: '2024-03-28',
    estimatedArrival: '2024-03-30',
    msivNumber: 'MSIV-009',
    dispatchNumber: 'DSP-009'
  },
  {
    id: '10',
    batchId: '3',
    fromFacilityId: 19, // POST PNG YARD - KOKOPO
    toFacilityId: 1, // AMS LAE
    dispatchDate: '2024-03-29',
    estimatedArrival: '2024-03-31',
    msivNumber: 'MSIV-010',
    dispatchNumber: 'DSP-010'
  }
];

const useDispatches = () => {
  const [dispatches, setDispatches] = useState<Dispatch[]>(initialDispatches);

  const addDispatch = (dispatch: Omit<Dispatch, 'id'>) => {
    const lastDispatchNumber = Math.max(...dispatches.map(d => 
      parseInt(d.dispatchNumber.split('-')[1])
    ));
    
    const newDispatch = {
      ...dispatch,
      id: String(Date.now()),
      dispatchNumber: `DSP-${String(lastDispatchNumber + 1).padStart(3, '0')}`
    };
    
    setDispatches(prev => [...prev, newDispatch]);
    return newDispatch;
  };

  const updateDispatch = (id: string, dispatch: Omit<Dispatch, 'id'>) => {
    setDispatches(prev => prev.map(d => 
      d.id === id ? { ...dispatch, id } : d
    ));
  };

  const deleteDispatch = (id: string) => {
    setDispatches(prev => prev.filter(d => d.id !== id));
  };

  const getDispatchesByBatchId = (batchId: string) => {
    return dispatches.filter(d => d.batchId === batchId);
  };

  return {
    dispatches,
    addDispatch,
    updateDispatch,
    deleteDispatch,
    getDispatchesByBatchId
  };
};

export default useDispatches;