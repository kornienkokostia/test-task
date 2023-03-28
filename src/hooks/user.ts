import { useState, useEffect } from 'react';
import { User } from '../models/users';
import ApiService from '../services/ApiService';

export const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    onRequest(currentPage);
  }, [currentPage]);

  const onRequest = async (page: number = 1) => {
    const usersResponse = await ApiService().getAllUsers(page);
    setUsers(usersResponse.users);
    setTotalPages(usersResponse.total_pages);
    console.log(usersResponse);
  };

  return { users, totalPages, currentPage, setCurrentPage, onRequest };
};
