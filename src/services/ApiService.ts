import { PositionsResponse } from '../models/positions';
import { Token, UsersResponse } from '../models/users';
import { useHttp } from './http.hook';

const ApiService = () => {
  const { request } = useHttp();
  const _apiBase = 'https://frontend-test-assignment-api.abz.agency/api/v1';

  const getAllUsers = async (page: number = 1) =>
    (await request(`${_apiBase}/users/?page=${page}&count=6`)) as UsersResponse;

  const getPositions = async () =>
    (await request(`${_apiBase}/positions`)) as PositionsResponse;

  const addUser = async (body: FormData, token: string) =>
    (await request(`${_apiBase}/users`, 'POST', body, {
      Token: token,
    })) as any;

  const getToken = async () => (await request(`${_apiBase}/token`)) as Token;

  return {
    getAllUsers,
    getPositions,
    addUser,
    getToken,
  };
};

export default ApiService;
