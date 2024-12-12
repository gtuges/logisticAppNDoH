export interface Permission {
  id: number;
  name: string;
  description: string;
  value: number; // 1: View, 2: Read, 3: Update, 4: Delete
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: number[]; // Array of permission IDs
}

export interface RolePermission {
  roleId: number;
  permissionId: number;
  value: number;
}

export interface RoleFormData {
  name: string;
  description: string;
  permissions: RolePermission[];
}