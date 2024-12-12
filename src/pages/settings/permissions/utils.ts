import { PERMISSIONS, PERMISSION_VALUES } from './constants';

export const getPermissionLabel = (permissionId: number): string => {
  const permission = PERMISSIONS.find(p => p.id === permissionId);
  return permission?.name || 'Unknown';
};

export const getPermissionValueLabel = (value: number): string => {
  const permValue = PERMISSION_VALUES.find(v => v.value === value);
  return permValue?.label || 'Unknown';
};