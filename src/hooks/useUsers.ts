import { useState } from 'react';
import { User } from '../types/user';

const initialUsers: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '$2a$12$abc123456hashvalue1',
    createdAt: '2024-12-01 10:00:00',
    status: 'Active',
    role: 'Admin'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    password: '$2a$12$abc123456hashvalue2',
    createdAt: '2024-12-01 11:00:00',
    status: 'Active',
    role: 'Manager'
  },
  {
    id: 3,
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    password: '$2a$12$abc123456hashvalue3',
    createdAt: '2024-12-01 12:00:00',
    status: 'Active',
    role: 'User'
  },
  {
    id: 4,
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    password: '$2a$12$abc123456hashvalue4',
    createdAt: '2024-12-01 13:00:00',
    status: 'Inactive',
    role: 'User'
  },
  {
    id: 5,
    firstName: 'Chris',
    lastName: 'Brown',
    email: 'chris.brown@example.com',
    password: '$2a$12$abc123456hashvalue5',
    createdAt: '2024-12-01 14:00:00',
    status: 'Active',
    role: 'Manager'
  }
];

export const useUsers = (itemsPerPage: number = 10) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: Math.max(...users.map(u => u.id)) + 1,
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (id: number, userData: Partial<Omit<User, 'id' | 'createdAt'>>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...userData } : user
    ));
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    // Adjust current page if necessary
    if (paginatedUsers.length === 1 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const getUserById = (id: number) => {
    return users.find(user => user.id === id);
  };

  return {
    users: paginatedUsers,
    totalUsers: users.length,
    currentPage,
    totalPages,
    setCurrentPage,
    addUser,
    updateUser,
    deleteUser,
    getUserById
  };
};