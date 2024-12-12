import React, { useState } from 'react';
import Button from '../common/Button';
import { Delivery } from '../../types';

interface DeliveryFormProps {
  delivery?: Delivery | null;
  onSubmit: (data: Omit<Delivery, 'id'>) => void;
  onCancel: () => void;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({ delivery, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    facility: delivery?.facility || '',
    region: delivery?.region || 'Southern',
    status: delivery?.status || 'Scheduled',
    date: delivery?.date || new Date().toISOString().split('T')[0],
    items: delivery?.items || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Facility</label>
        <input
          type="text"
          value={formData.facility}
          onChange={(e) => setFormData({ ...formData, facility: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Region</label>
          <select
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option>Highlands</option>
            <option>Momase</option>
            <option>Southern</option>
            <option>New Guinea Islands</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Delivery['status'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option>Scheduled</option>
            <option>In Transit</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Items</label>
          <input
            type="number"
            value={formData.items}
            onChange={(e) => setFormData({ ...formData, items: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="1"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {delivery ? 'Update' : 'Create'} Delivery
        </Button>
      </div>
    </form>
  );
};

export default DeliveryForm;