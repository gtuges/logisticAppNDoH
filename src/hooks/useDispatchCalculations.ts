import { useMemo } from 'react';
import { Receipt } from '../types/receipt';
import { Invoice } from '../types/invoice';

interface CalculationResult {
  totalWeightKg: number;
  subtotal: number;
  gst: number;
  total: number;
}

const GST_RATE = 0.1; // 10% GST

export const useDispatchCalculations = (receipt: Receipt | null, rate: number = 0) => {
  const calculations = useMemo<CalculationResult>(() => {
    const totalWeightKg = receipt?.totalWeightKg || 0;
    const subtotal = totalWeightKg * rate;
    const gst = subtotal * GST_RATE;
    const total = subtotal + gst;

    return {
      totalWeightKg,
      subtotal,
      gst,
      total
    };
  }, [receipt, rate]);

  return calculations;
};