import React, { useState } from 'react';
import FormField from '../../../../components/common/FormField';
import Button from '../../../../components/common/Button';
import PermissionMatrix from './PermissionMatrix';
import { Role, RoleFormData } from '../../../../types/permission';

interface RoleFormProps {
  role?: Role | null;
  onSubmit: (data: RoleFormData) => void;
  onCancel: () => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ role, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<RoleFormData>({
    name: role?.name || '',
    description: role?.description || '',
    permissions: role?.permissions.map(p => ({
      roleId: role.id,
      permissionId: p,
      value: 1
    })) || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Role Name" required>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="form-input"
          required
        />
      </FormField>

      <FormField label="Description" required>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="form-textarea"
          required
        />
      </FormField>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Permissions</h3>
        <PermissionMatrix
          permissions={formData.permissions}
          onChange={(permissions) => setFormData({ ...formData, permissions })}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {role ? 'Update' : 'Create'} Role
        </Button>
      </div>
    </form>
  );
};