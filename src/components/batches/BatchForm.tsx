import React, { useState } from 'react';
import Button from '../common/Button';
import FormField from '../common/FormField';
import { Batch } from '../../types';

interface BatchFormProps {
  batch?: Batch | null;
  onSubmit: (data: Omit<Batch, 'id'>) => void;
  onCancel: () => void;
}

const BatchForm: React.FC<BatchFormProps> = ({ batch, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: batch?.name || '',
    category: batch?.category || '',
    status: batch?.status || 'Pending',
    items: batch?.items?.toString() || '',
    createdAt: batch?.createdAt || new Date().toISOString(),
    completedAt: batch?.completedAt,
    logisticsCompany: batch?.logisticsCompany || '',
    itemDescription: batch?.itemDescription || '',
    quantity: batch?.quantity || 0,
    totalWeightKg: batch?.totalWeightKg || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      items: parseInt(formData.items) || 0,
      quantity: parseInt(formData.quantity.toString()) || 0,
      totalWeightKg: parseFloat(formData.totalWeightKg.toString()) || 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Batch Name" required>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="form-input"
          required
        />
      </FormField>

      <FormField label="Category" required>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="form-select"
          required
        >
          <option value="">Select a category</option>
          <option value="Medical Supplies">Medical Supplies</option>
          <option value="Vaccines">Vaccines</option>
          <option value="Equipment">Equipment</option>
          <option value="Emergency">Emergency Supplies</option>
        </select>
      </FormField>

      <FormField label="Item Description" required>
        <textarea
          value={formData.itemDescription}
          onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
          className="form-textarea"
          required
          maxLength={50}
          rows={2}
          placeholder="General description of the items"
        />
      </FormField>

      <div className="grid grid-cols-3 gap-6">
        <FormField label="Number of Items" required>
          <input
            type="number"
            value={formData.items}
            onChange={(e) => setFormData({ ...formData, items: e.target.value })}
            className="form-input"
            required
            min="1"
          />
        </FormField>

        <FormField label="Quantity" required>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
            className="form-input"
            required
            min="1"
          />
        </FormField>

        <FormField label="Total Weight (kg)" required>
          <input
            type="number"
            step="0.01"
            value={formData.totalWeightKg}
            onChange={(e) => setFormData({ ...formData, totalWeightKg: parseFloat(e.target.value) })}
            className="form-input"
            required
            min="0"
          />
        </FormField>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {batch ? 'Update' : 'Create'} Batch
        </Button>
      </div>
    </form>
  );
};

export default BatchForm;