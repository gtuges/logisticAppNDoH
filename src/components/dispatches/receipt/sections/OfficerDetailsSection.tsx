import React, { memo } from 'react';
import { User, Phone } from 'lucide-react';
import FormField from '../../../common/FormField';

interface OfficerDetailsSectionProps {
  officer: string;
  designation: string;
  phone: string;
  onOfficerChange: (value: string) => void;
  onDesignationChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

const OfficerDetailsSection: React.FC<OfficerDetailsSectionProps> = ({
  officer,
  designation,
  phone,
  onOfficerChange,
  onDesignationChange,
  onPhoneChange
}) => {
  return (
    <>
      <FormField 
        label="Receiving Officer" 
        icon={User}
        required
      >
        <input
          type="text"
          value={officer}
          onChange={(e) => onOfficerChange(e.target.value)}
          className="form-input"
          required
        />
      </FormField>

      <FormField 
        label="Designation"
      >
        <input
          type="text"
          value={designation}
          onChange={(e) => onDesignationChange(e.target.value)}
          className="form-input"
        />
      </FormField>

      <FormField 
        label="Mobile Number" 
        icon={Phone}
      >
        <input
          type="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="form-input"
        />
      </FormField>
    </>
  );
};

export default memo(OfficerDetailsSection);