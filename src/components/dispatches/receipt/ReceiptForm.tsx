import React, { useCallback, memo } from 'react';
import { useDispatchData } from '../../../contexts/DispatchDataContext';
import { Receipt } from '../../../types/receipt';
import { useReceiptForm } from './hooks/useReceiptForm';
import { useReceiptSubmit } from '../hooks/useReceiptSubmit';
import Button from '../../common/Button';
import OfficerDetailsSection from './sections/OfficerDetailsSection';
import DeliveryDetailsSection from './sections/DeliveryDetailsSection';
import NotificationSection from './sections/NotificationSection';
import WeightSection from './sections/WeightSection';
import TransportModeSelector from './TransportModeSelector';
import toast from 'react-hot-toast';

interface ReceiptFormProps {
  onCancel: () => void;
}

const ReceiptForm: React.FC<ReceiptFormProps> = ({ onCancel }) => {
  const { dispatchData, setReceiptData } = useDispatchData();
  const { formData, handleFormChange } = useReceiptForm(dispatchData.receipt);
  const { handleSubmit: submitReceipt } = useReceiptSubmit();

  const handleFieldChange = useCallback((field: keyof Receipt, value: any) => {
    handleFormChange(field, value);
    setReceiptData(prev => ({
      ...prev,
      [field]: value
    }));
  }, [handleFormChange, setReceiptData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.totalWeightKg || !formData.receivingOfficer || !formData.podNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    const success = submitReceipt(formData);
    if (success) {
      setReceiptData(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Section - Weight and Transport Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <WeightSection
            value={formData.totalWeightKg}
            onChange={(value) => handleFieldChange('totalWeightKg', value)}
          />
        </div>
        <div>
          <TransportModeSelector
            selectedModes={formData.transportModes}
            onChange={(modes) => handleFieldChange('transportModes', modes)}
          />
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Officer Information</h3>
            <OfficerDetailsSection
              officer={formData.receivingOfficer}
              designation={formData.receivingOfficerDesignation}
              phone={formData.receivingOfficerPhone}
              onOfficerChange={(value) => handleFieldChange('receivingOfficer', value)}
              onDesignationChange={(value) => handleFieldChange('receivingOfficerDesignation', value)}
              onPhoneChange={(value) => handleFieldChange('receivingOfficerPhone', value)}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Information</h3>
            <DeliveryDetailsSection
              podNumber={formData.podNumber}
              onChange={(value) => handleFieldChange('podNumber', value)}
            />
            <div className="mt-6">
              <NotificationSection
                isPodAttached={formData.isPodAttached}
                isPhoNotified={formData.isPhoNotified}
                onPodAttachedChange={(value) => handleFieldChange('isPodAttached', value)}
                onPhoNotifiedChange={(value) => handleFieldChange('isPhoNotified', value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t mt-8">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Receipt
        </Button>
      </div>
    </form>
  );
};

export default memo(ReceiptForm);