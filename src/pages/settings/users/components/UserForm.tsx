import React, { useState } from 'react';
import { User as UserType, UserFormData } from '../../../../types/user';
import Button from '../../../../components/common/Button';
import FormField from '../../../../components/common/FormField';

interface UserFormProps {
  user?: UserType | null;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<UserFormData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    role: user?.role || 'User',
    status: user?.status || 'Active',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!user && !formData.password) {
      newErrors.password = 'Password is required for new users';
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const { confirmPassword, ...submitData } = formData;
      if (!submitData.password) {
        delete submitData.password;
      }
      onSubmit(submitData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <FormField 
          label="First Name" 
          error={errors.firstName}
          required
        >
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="form-input"
            required
          />
        </FormField>

        <FormField 
          label="Last Name"
          error={errors.lastName}
          required
        >
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="form-input"
            required
          />
        </FormField>
      </div>

      <FormField 
        label="Email"
        error={errors.email}
        required
      >
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="form-input"
          required
        />
      </FormField>

      <div className="grid grid-cols-2 gap-6">
        <FormField label="Role" required>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserType['role'] })}
            className="form-select"
            required
          >
            <option value="User">User</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </FormField>

        <FormField label="Status" required>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as UserType['status'] })}
            className="form-select"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </FormField>
      </div>

      {(!user || formData.password) && (
        <div className="grid grid-cols-2 gap-6">
          <FormField 
            label={user ? 'New Password' : 'Password'}
            error={errors.password}
            required={!user}
          >
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="form-input"
              required={!user}
            />
          </FormField>

          <FormField 
            label="Confirm Password"
            error={errors.confirmPassword}
            required={!user || !!formData.password}
          >
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="form-input"
              required={!user || !!formData.password}
            />
          </FormField>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {user ? 'Update' : 'Create'} User
        </Button>
      </div>
    </form>
  );
};

export default UserForm;