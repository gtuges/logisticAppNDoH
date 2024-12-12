import React, { memo } from 'react';
import { FileText } from 'lucide-react';
import FormField from '../../../common/FormField';

interface DeliveryDetailsSectionProps {
  podNumber: string;
  onChange: (value: string) => void;
}

const DeliveryDetailsSection: React.FC<DeliveryDetailsSectionProps> = ({
  podNumber,
  onChange
}) => {
  return (
    <FormField 
      label="Proof of Delivery (PoD) Number" 
      icon={FileText}
      required
    >
      <input
        type="text"
        value={podNumber}
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
        required
      />
      <p className="text-xs text-gray-500 mt-1">
        Unique identifier for tracking delivery confirmation
      </p>
    </FormField>
  );
};

export default memo(DeliveryDetailsSection);