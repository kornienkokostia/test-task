import { useState, useEffect } from 'react';
import { User } from '../models/users';
import ApiService from '../services/ApiService';

export const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersLoading, setUsersLoading] = useState<boolean>(true);

  useEffect(() => {
    updateUsers(currentPage);
  }, [currentPage]);

  const updateUsers = async (page: number = 1) => {
    const usersResponse = await ApiService().getAllUsers(page);

    if (page === 1) {
      setUsers(usersResponse.users);
    } else {
      setUsers([...users, ...usersResponse.users]);
    }
    if (totalPages === null) {
      setTotalPages(usersResponse.total_pages);
    }
    setUsersLoading(false);
  };

  return {
    users,
    totalPages,
    currentPage,
    setCurrentPage,
    updateUsers,
    usersLoading,
  };
};
