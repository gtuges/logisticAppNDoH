import React, { useState } from 'react';
import { Box, CheckCircle2, Search } from 'lucide-react';
import { Batch } from '../../types';
import { useBatchContext } from '../../contexts/BatchContext';

interface BatchSelectorProps {
  batches: Batch[];
}

const BatchSelector: React.FC<BatchSelectorProps> = ({ batches }) => {
  const { activeBatch, setActiveBatch } = useBatchContext();
  const [searchQuery, setSearchQuery] = useState('');

  const handleBatchSelect = (batch: Batch) => {
    setActiveBatch(batch.id === activeBatch?.id ? null : batch);
  };

  const filteredBatches = batches.filter(batch => {
    const searchLower = searchQuery.toLowerCase();
    return (
      batch.name.toLowerCase().includes(searchLower) ||
      batch.category.toLowerCase().includes(searchLower) ||
      batch.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Active Batch Selection</h2>
        <p className="text-sm text-gray-600">Select a single batch to work with for dispatches and deliveries</p>
      </div>
      
      <div className="p-4">
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search batches by name, category, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="grid gap-4">
          {filteredBatches.length > 0 ? (
            filteredBatches.map((batch) => (
              <div
                key={batch.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  activeBatch?.id === batch.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
                onClick={() => handleBatchSelect(batch)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Box className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="font-medium">{batch.name}</h3>
                      <div className="text-sm text-gray-600">
                        <span>{batch.category}</span>
                        <span className="mx-2">•</span>
                        <span>{batch.region}</span>
                        <span className="mx-2">•</span>
                        <span>{batch.items.toLocaleString()} items</span>
                      </div>
                    </div>
                  </div>
                  {activeBatch?.id === batch.id && (
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No batches found matching your search criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchSelector;