import React from 'react';
import { Box, Clock, Package } from 'lucide-react';
import Button from '../common/Button';
import { Batch } from '../../types';

interface BatchListProps {
  batches: Batch[];
  onEdit: (batch: Batch) => void;
  onDelete: (batch: Batch) => void;
  onSelect: (batch: Batch) => void;
  activeBatchId?: string;
}

const BatchList: React.FC<BatchListProps> = ({ 
  batches, 
  onEdit, 
  onDelete,
  onSelect,
  activeBatchId 
}) => {
  const columns = [
    { 
      key: 'name',
      header: 'Name',
      render: (value: string, batch: Batch) => (
        <div className="flex items-center">
          <Box className="w-4 h-4 text-gray-400 mr-2" />
          <div>
            <span className="font-medium">{value}</span>
            <p className="text-sm text-gray-500">{batch.itemDescription || 'No description'}</p>
          </div>
        </div>
      )
    },
    { key: 'category', header: 'Category' },
    { 
      key: 'status',
      header: 'Status',
      render: (value: Batch['status']) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Completed' ? 'bg-green-50 text-green-700' :
          value === 'Processing' ? 'bg-yellow-50 text-yellow-700' :
          value === 'Ready' ? 'bg-blue-50 text-blue-700' :
          'bg-gray-50 text-gray-700'
        }`}>
          {value === 'Processing' && <Clock className="w-3 h-3 mr-1" />}
          {value}
        </span>
      )
    },
    { 
      key: 'quantity',
      header: 'Quantity',
      render: (value: number) => (value || 0).toLocaleString()
    },
    { 
      key: 'totalWeightKg',
      header: 'Weight (kg)',
      render: (value: number) => (value || 0).toFixed(2)
    },
    {
      key: 'logisticsCompany',
      header: 'Logistics Company'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {batches.map((batch) => (
              <tr 
                key={batch.id}
                onClick={() => onSelect(batch)}
                className={`cursor-pointer transition-colors ${
                  activeBatchId === batch.id 
                    ? 'bg-blue-50 hover:bg-blue-100'
                    : 'hover:bg-gray-50'
                }`}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-sm text-gray-900">
                    {column.render 
                      ? column.render(batch[column.key as keyof Batch], batch)
                      : batch[column.key as keyof Batch]?.toString() || '-'}
                  </td>
                ))}
                <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(batch);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(batch);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BatchList;