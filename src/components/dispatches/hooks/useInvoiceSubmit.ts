import toast from 'react-hot-toast';
import { Invoice } from '../../../types/invoice';

export const useInvoiceSubmit = () => {
  const handleSubmit = (data: Invoice) => {
    console.log('Invoice data:', data);
    toast.success('Invoice details saved successfully');
  };

  return { handleSubmit };
};