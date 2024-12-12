import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import DispatchList from '../components/dispatches/DispatchList';
import DispatchForm from '../components/dispatches/DispatchForm';
import DispatchDetails from '../components/dispatches/DispatchDetails';
import ActiveBatchInfo from '../components/dispatches/ActiveBatchInfo';
import useDispatches from '../hooks/useDispatches';
import { useBatchContext } from '../contexts/BatchContext';
import { Dispatch } from '../types';

const DispatchesPage = () => {
  const { dispatches, addDispatch, updateDispatch, deleteDispatch } = useDispatches();
  const { activeBatch } = useBatchContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDispatch, setSelectedDispatch] = useState<Dispatch | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAdd = () => {
    if (!activeBatch) {
      toast.error('Please select an active batch first');
      return;
    }
    setSelectedDispatch(null);
    setIsModalOpen(true);
  };

  const handleEdit = (dispatch: Dispatch) => {
    setSelectedDispatch(dispatch);
    setIsModalOpen(true);
  };

  const handleSelect = (dispatch: Dispatch) => {
    setSelectedDispatch(selectedDispatch?.id === dispatch.id ? null : dispatch);
  };

  const handleSubmit = (data: Omit<Dispatch, 'id'>) => {
    if (selectedDispatch) {
      updateDispatch(selectedDispatch.id, data);
      toast.success('Delivery updated successfully');
    } else {
      const newDispatch = addDispatch(data);
      setSelectedDispatch(newDispatch);
      toast.success('Delivery created successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (dispatch: Dispatch) => {
    if (window.confirm('Are you sure you want to delete this delivery?')) {
      deleteDispatch(dispatch.id);
      if (selectedDispatch?.id === dispatch.id) {
        setSelectedDispatch(null);
      }
      toast.success('Delivery deleted successfully');
    }
  };

  const filteredDispatches = activeBatch
    ? dispatches.filter(d => d.batchId === activeBatch.id)
    : [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Deliveries</h1>
          <p className="text-gray-600 mt-1">Manage batch deliveries to facilities</p>
        </div>
        <Button 
          icon={Plus} 
          onClick={handleAdd}
          disabled={!activeBatch}
        >
          Create Delivery
        </Button>
      </div>

      {activeBatch ? (
        <ActiveBatchInfo batch={activeBatch} />
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-700">
            Please select an active batch from the Batches page to manage its deliveries.
          </p>
        </div>
      )}

      <DispatchList
        dispatches={filteredDispatches}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelect={handleSelect}
        selectedDispatchId={selectedDispatch?.id}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <DispatchDetails dispatch={selectedDispatch} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedDispatch ? 'Edit Delivery' : 'Create Delivery'}
        size="xl"
      >
        <DispatchForm
          dispatch={selectedDispatch}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          batchId={activeBatch?.id}
        />
      </Modal>
    </div>
  );
};

export default DispatchesPage;