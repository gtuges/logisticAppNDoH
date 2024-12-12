import { useState } from 'react';
import { Role } from '../types/permission';

const initialRoles: Role[] = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full system access',
    permissions: [1, 2, 3, 4, 5, 6]
  },
  {
    id: 2,
    name: 'Manager',
    description: 'Manage operations and reports',
    permissions: [1, 3, 4, 6]
  },
  {
    id: 3,
    name: 'User',
    description: 'Basic system access',
    permissions: [3, 4]
  }
];

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);

  const addRole = (roleData: Omit<Role, 'id'>) => {
    const newRole: Role = {
      ...roleData,
      id: Math.max(...roles.map(r => r.id)) + 1
    };
    setRoles(prev => [...prev, newRole]);
  };

  const updateRole = (id: number, roleData: Omit<Role, 'id'>) => {
    setRoles(prev => prev.map(role =>
      role.id === id ? { ...roleData, id } : role
    ));
  };

  const deleteRole = (id: number) => {
    setRoles(prev => prev.filter(role => role.id !== id));
  };

  return {
    roles,
    addRole,
    updateRole,
    deleteRole
  };
};