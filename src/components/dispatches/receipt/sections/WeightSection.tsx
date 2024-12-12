import React, { memo } from 'react';
import { Scale } from 'lucide-react';
import FormField from '../../../common/FormField';

interface WeightSectionProps {
  value: number;
  onChange: (value: number) => void;
}

const WeightSection: React.FC<WeightSectionProps> = ({ value, onChange }) => {
  return (
    <FormField 
      label="Total Weight (kg)" 
      icon={Scale}
      required
    >
      <input
        type="number"
        step="0.01"
        min="0"
        value={value || ''}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="form-input"
        required
      />
    </FormField>
  );
};

export default memo(WeightSection);