import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserSearch from '../../../components/users/UserSearch';
import { useUsers } from '../../../hooks/useUsers';
import { useUserSearch } from '../../../hooks/useUserSearch';
import { User, UserFormData } from '../../../types/user';

const ITEMS_PER_PAGE = 10;

const UsersPage = () => {
  const { 
    users: allUsers, 
    totalUsers,
    currentPage, 
    totalPages, 
    setCurrentPage,
    addUser, 
    updateUser, 
    deleteUser 
  } = useUsers(ITEMS_PER_PAGE);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on search query
  const filteredUsers = useUserSearch(allUsers, searchQuery);

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: UserFormData) => {
    try {
      if (selectedUser) {
        updateUser(selectedUser.id, data);
        toast.success('User updated successfully');
      } else {
        addUser({
          ...data,
          password: data.password || '$2a$12$defaultHashValue'
        });
        toast.success('User created successfully');
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleDelete = (user: User) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(user.id);
      toast.success('User deleted successfully');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-gray-600 mt-1">
            Manage system users and their access ({totalUsers} total users)
          </p>
        </div>
        <Button icon={Plus} onClick={handleAdd}>
          Add User
        </Button>
      </div>

      <div className="mb-6">
        <UserSearch
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      <UserList
        users={filteredUsers}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? 'Edit User' : 'Add User'}
        size="xl"
      >
        <UserForm
          user={selectedUser}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default UsersPage;