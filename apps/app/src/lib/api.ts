import { QueryFunction, QueryKey, useQuery } from '@tanstack/react-query';
import { User } from 'shared';
import { axios } from './axios';

const api = {
  /* User endpoints */
  authenticate: async (fingerprint: string | null): Promise<User.LoginDTO | null> => {
    return axios.post('/authenticate', { fingerprint });
  }
} as const;

export const useLazyQuery = (key: QueryKey, fn: QueryFunction, options = {}) => {
  const query = useQuery(key, fn, {
    ...options,
    enabled: false
  });

  return [query.refetch, query];
};

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

export const useApiLazy = <QueryName extends keyof typeof api>(
  queryName: QueryName,
  params?: Parameters<(typeof api)[QueryName]>[0]
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore TODO: fix this
  const [refetch, query] = useLazyQuery([queryName], async () => await api[queryName](...params));
  return [refetch, query];
};

export default api;
