export const PERMISSIONS = [
  { id: 1, name: 'Users', description: 'Manage system users' },
  { id: 2, name: 'Roles', description: 'Manage user roles' },
  { id: 3, name: 'Batches', description: 'Manage supply batches' },
  { id: 4, name: 'Deliveries', description: 'Manage deliveries' },
  { id: 5, name: 'Facilities', description: 'Manage healthcare facilities' },
  { id: 6, name: 'Reports', description: 'Access system reports' }
] as const;

export const PERMISSION_VALUES = [
  { value: 1, label: 'View' },
  { value: 2, label: 'Read' },
  { value: 3, label: 'Update' },
  { value: 4, label: 'Delete' }
] as const;