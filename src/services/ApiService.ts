import { UsersResponse } from '../models/users';
import { useHttp } from './http.hook';

const ApiService = () => {
  const { request } = useHttp();
  const _apiBase = 'https://frontend-test-assignment-api.abz.agency/api/v1';

  const getAllUsers = async (page: number = 1) =>
    (await request(`${_apiBase}/users/?page=${page}&count=6`)) as UsersResponse;

  return {
    getAllUsers,
  };
};

export default ApiService;
