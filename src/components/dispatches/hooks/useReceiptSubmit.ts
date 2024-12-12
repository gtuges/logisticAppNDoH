import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { Receipt } from '../../../types/receipt';

export const useReceiptSubmit = () => {
  const handleSubmit = useCallback((data: Receipt) => {
    try {
      // Here you would typically make an API call to save the data
      console.log('Receipt data:', data);
      
      // Show success toast
      toast.success('Receipt details saved successfully', {
        duration: 3000,
        position: 'top-right',
      });
      
      return true;
    } catch (error) {
      // Show error toast
      toast.error('Failed to save receipt details. Please try again.', {
        duration: 4000,
        position: 'top-right',
      });
      
      return false;
    }
  }, []);

  return { handleSubmit };
};