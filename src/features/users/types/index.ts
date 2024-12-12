export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  status: 'Active' | 'Inactive';
  role: 'Admin' | 'User' | 'Manager';
}

export interface UserFormData extends Omit<User, 'id' | 'createdAt' | 'password'> {
  password?: string;
  confirmPassword?: string;
}