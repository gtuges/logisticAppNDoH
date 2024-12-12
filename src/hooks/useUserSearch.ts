import { useState, useMemo } from 'react';
import { User } from '../types/user';

export const useUserSearch = (users: User[], searchQuery: string) => {
  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    
    return users.filter(user => 
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  return filteredUsers;
};