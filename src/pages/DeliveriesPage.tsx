import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import DeliveryList from '../components/deliveries/DeliveryList';
import DeliveryForm from '../components/deliveries/DeliveryForm';
import useDeliveries from '../hooks/useDeliveries';
import { Delivery } from '../types';

const DeliveriesPage = () => {
  const { deliveries, addDelivery, updateDelivery, deleteDelivery } = useDeliveries();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);

  const handleAdd = () => {
    setSelectedDelivery(null);
    setIsModalOpen(true);
  };

  const handleEdit = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: Omit<Delivery, 'id'>) => {
    if (selectedDelivery) {
      updateDelivery(selectedDelivery.id, data);
    } else {
      addDelivery(data);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (delivery: Delivery) => {
    if (confirm('Are you sure you want to delete this delivery?')) {
      deleteDelivery(delivery.id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Deliveries</h1>
          <p className="text-gray-600 mt-1">Manage and track all deliveries across regions</p>
        </div>
        <Button icon={Plus} onClick={handleAdd}>Add Delivery</Button>
      </div>

      <DeliveryList
        deliveries={deliveries}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedDelivery ? 'Edit Delivery' : 'Add Delivery'}
      >
        <DeliveryForm
          delivery={selectedDelivery}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default DeliveriesPage;