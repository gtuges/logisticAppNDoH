import React from 'react';
import { Box, Calendar, Package, Truck } from 'lucide-react';
import { Batch } from '../../types';

interface ActiveBatchInfoProps {
  batch: Batch;
}

const ActiveBatchInfo: React.FC<ActiveBatchInfoProps> = ({ batch }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Box className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-900">Active Batch: {batch.name}</h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                batch.status === 'Completed' ? 'bg-green-50 text-green-700' :
                batch.status === 'Processing' ? 'bg-yellow-50 text-yellow-700' :
                batch.status === 'Ready' ? 'bg-blue-50 text-blue-700' :
                'bg-gray-50 text-gray-700'
              }`}>
                {batch.status}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
              <span>{batch.category}</span>
              <span>•</span>
              <span>{batch.region}</span>
              <span>•</span>
              <div className="flex items-center">
                <Package className="w-4 h-4 mr-1" />
                <span>{batch.items.toLocaleString()} items</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Created {new Date(batch.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <Truck className="w-4 h-4" />
            <span>{batch.logisticsCompany}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveBatchInfo;