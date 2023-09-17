import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { User } from 'shared';
import { axios } from './axios';

const api = {
  /* User endpoints */
  login: async (fingerprint: string): Promise<AxiosResponse<User.LoginDTO>> => {
    return axios.post('/login', { fingerprint });
  }
} as const;

export const useApi = <QueryName extends keyof typeof api>(
  queryName: QueryName,
  params?: Parameters<(typeof api)[QueryName]>[0]
) => {
  const query = useQuery({
    queryKey: [queryName],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TODO: fix this
    queryFn: async () => await api[queryName](...params)
  });

  return query;
};

export default api;
