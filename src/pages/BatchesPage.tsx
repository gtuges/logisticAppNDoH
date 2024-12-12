import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import BatchList from '../components/batches/BatchList';
import BatchForm from '../components/batches/BatchForm';
import RegionSelector from '../components/batches/RegionSelector';
import useBatches from '../hooks/useBatches';
import { useBatchContext } from '../contexts/BatchContext';
import { Batch, RegionName } from '../types';

const BatchesPage = () => {
  const { batches, addBatch, updateBatch, deleteBatch } = useBatches();
  const { activeBatch, setActiveBatch } = useBatchContext();
  const [selectedRegion, setSelectedRegion] = useState<RegionName | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  const handleAdd = () => {
    if (!selectedRegion) {
      toast.error('Please select a region first');
      return;
    }
    setSelectedBatch(null);
    setIsModalOpen(true);
  };

  const handleEdit = (batch: Batch) => {
    setSelectedBatch(batch);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: Omit<Batch, 'id'>) => {
    if (selectedBatch) {
      updateBatch(selectedBatch.id, data);
      toast.success('Batch updated successfully');
    } else {
      addBatch({ ...data, region: selectedRegion! });
      toast.success('Batch created successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (batch: Batch) => {
    if (confirm('Are you sure you want to delete this batch?')) {
      deleteBatch(batch.id);
      if (activeBatch?.id === batch.id) {
        setActiveBatch(null);
      }
      toast.success('Batch deleted successfully');
    }
  };

  const handleBatchSelect = (batch: Batch) => {
    setActiveBatch(activeBatch?.id === batch.id ? null : batch);
  };

  const filteredBatches = selectedRegion
    ? batches.filter(batch => batch.region === selectedRegion)
    : batches;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Batches</h1>
          <p className="text-gray-600 mt-1">Create and manage supply batches</p>
        </div>
        <Button 
          icon={Plus} 
          onClick={handleAdd}
          disabled={!selectedRegion}
        >
          Create Batch
        </Button>
      </div>

      <RegionSelector
        selectedRegion={selectedRegion}
        onRegionSelect={setSelectedRegion}
      />

      {activeBatch && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-green-800 font-medium">Active Batch</h2>
          <p className="text-green-600">Currently working with batch: {activeBatch.name}</p>
        </div>
      )}

      <BatchList
        batches={filteredBatches}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelect={handleBatchSelect}
        activeBatchId={activeBatch?.id}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedBatch ? 'Edit Batch' : 'Create Batch'}
        size="xl"
      >
        <BatchForm
          batch={selectedBatch}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default BatchesPage;