import React from 'react';
import { Scale, DollarSign, Calculator } from 'lucide-react';
import FormField from '../../../common/FormField';
import Button from '../../../common/Button';
import { Invoice } from '../../../../types/invoice';
import { formatCurrency } from '../../../../utils/format';

interface InvoiceCalculationsProps {
  formData: Invoice;
  onChange: (field: keyof Invoice, value: any) => void;
  onCalculate: () => void;
}

const InvoiceCalculations: React.FC<InvoiceCalculationsProps> = ({ 
  formData, 
  onChange,
  onCalculate
}) => {
  const handleNumericChange = (field: keyof Invoice, value: string) => {
    onChange(field, value === '' ? 0 : parseFloat(value));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Calculations</h3>
        <Button 
          type="button"
          variant="secondary" 
          size="sm"
          icon={Calculator}
          onClick={onCalculate}
        >
          Calculate Totals
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField 
          label="Total Weight (kg)" 
          icon={Scale}
          required
        >
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.totalWeightKg || ''}
            onChange={(e) => handleNumericChange('totalWeightKg', e.target.value)}
            className="form-input"
            required
          />
        </FormField>

        <FormField 
          label="Rate per kg" 
          icon={DollarSign}
          required
        >
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.rate || ''}
            onChange={(e) => handleNumericChange('rate', e.target.value)}
            className="form-input"
            required
          />
        </FormField>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subtotal
            </label>
            <p className="mt-1 text-lg font-semibold">
              {formatCurrency((formData.totalWeightKg || 0) * (formData.rate || 0))}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              GST (10%)
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-600">
              {formatCurrency(formData.gst || 0)}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(formData.amount || 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCalculations;