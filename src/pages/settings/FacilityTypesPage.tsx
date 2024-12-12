import React, { useState } from 'react';
import { Plus, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Table from '../../components/common/Table';
import FormField from '../../components/common/FormField';
import { FacilityType, facilityTypes as initialTypes } from '../../types/facilities';

const FacilityTypesPage = () => {
  const [facilityTypes, setFacilityTypes] = useState<FacilityType[]>(initialTypes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<FacilityType | null>(null);

  const columns = [
    { 
      key: 'name',
      header: 'Type Name',
      render: (value: string) => (
        <div className="flex items-center">
          <Building2 className="w-4 h-4 text-gray-400 mr-2" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    { 
      key: 'description',
      header: 'Description'
    }
  ];

  const handleAdd = () => {
    setSelectedType(null);
    setIsModalOpen(true);
  };

  const handleEdit = (type: FacilityType) => {
    setSelectedType(type);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: { name: string; description: string }) => {
    if (selectedType) {
      setFacilityTypes(types =>
        types.map(type =>
          type.id === selectedType.id
            ? { ...type, ...data }
            : type
        )
      );
      toast.success('Facility type updated successfully');
    } else {
      const newId = Math.max(...facilityTypes.map(t => t.id)) + 1;
      setFacilityTypes(types => [...types, { id: newId, ...data }]);
      toast.success('Facility type created successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (type: FacilityType) => {
    if (window.confirm('Are you sure you want to delete this facility type?')) {
      setFacilityTypes(types => types.filter(t => t.id !== type.id));
      toast.success('Facility type deleted successfully');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Facility Types</h1>
          <p className="text-gray-600 mt-1">Manage different types of healthcare facilities</p>
        </div>
        <Button icon={Plus} onClick={handleAdd}>Add Facility Type</Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table
          columns={columns}
          data={facilityTypes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedType ? 'Edit Facility Type' : 'Add Facility Type'}
        size="lg"
      >
        <FacilityTypeForm
          facilityType={selectedType}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

interface FacilityTypeFormProps {
  facilityType?: FacilityType | null;
  onSubmit: (data: { name: string; description: string }) => void;
  onCancel: () => void;
}

const FacilityTypeForm: React.FC<FacilityTypeFormProps> = ({
  facilityType,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: facilityType?.name || '',
    description: facilityType?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Type Name" required>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="form-input"
          required
          maxLength={100}
        />
      </FormField>

      <FormField label="Description" required>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="form-textarea"
          required
          rows={3}
        />
      </FormField>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {facilityType ? 'Update' : 'Create'} Facility Type
        </Button>
      </div>
    </form>
  );
};

export default FacilityTypesPage;