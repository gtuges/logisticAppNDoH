import React from 'react';
import { Truck, Package } from 'lucide-react';
import Table from '../common/Table';
import { Delivery } from '../../types';

interface DeliveryListProps {
  deliveries: Delivery[];
  onEdit: (delivery: Delivery) => void;
  onDelete: (delivery: Delivery) => void;
}

const DeliveryList: React.FC<DeliveryListProps> = ({ deliveries, onEdit, onDelete }) => {
  const columns = [
    { 
      key: 'facility',
      header: 'Facility',
      render: (value: string) => (
        <div className="flex items-center">
          <Package className="w-4 h-4 text-gray-400 mr-2" />
          <span>{value}</span>
        </div>
      )
    },
    { key: 'region', header: 'Region' },
    { 
      key: 'status',
      header: 'Status',
      render: (value: Delivery['status']) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Delivered' ? 'bg-green-50 text-green-700' :
          value === 'In Transit' ? 'bg-yellow-50 text-yellow-700' :
          'bg-blue-50 text-blue-700'
        }`}>
          {value === 'In Transit' && <Truck className="w-3 h-3 mr-1" />}
          {value}
        </span>
      )
    },
    { 
      key: 'date',
      header: 'Date',
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    { 
      key: 'items',
      header: 'Items',
      render: (value: number) => (
        <span className="font-medium text-gray-900">{value.toLocaleString()}</span>
      )
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <Table
        columns={columns}
        data={deliveries}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default DeliveryList;