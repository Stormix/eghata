import { QueryFunction, QueryKey, useQuery } from '@tanstack/react-query';
import { LoginDTO } from 'shared';
import { axios } from './axios';

const api = {
  /* User endpoints */
  authenticate: async (fingerprint: string | null): Promise<LoginDTO | null> => {
    return axios.post('/authenticate', { fingerprint });
  },

  /* Help Request endpoints */
  createHelpRequest: async (data: FormData) => {
    return axios.post('/help-requests', data);
  },

  createHelpOffer: async (data: FormData) => {
    return axios.post('/offers', data);
  },

  /* Get a help request */
  getHelpRequest: async (id: string) => {
    return axios.get(`/help-requests/${id}`);
  },
  /* Get a help offer */
  getHelpOffer: async (id: string) => {
    return axios.get(`/offers/${id}`);
  },
  /* Get a carpooling request/offer */
  getCarpoolingRequest: async (id: string) => {
    return axios.get(`/carpooling-ads/${id}`);
  }
} as const;

export const useLazyQuery = (key: QueryKey, fn: QueryFunction, options = {}) => {
  const query = useQuery(key, fn, {
    ...options,
    enabled: false
  });

  return [query.refetch, query];
};

// export const useApi = <QueryName extends keyof typeof api>(
//   queryName: QueryName,
//   params?: Parameters<(typeof api)[QueryName]>[0]
// ) => {
//   const query = useQuery({
//     queryKey: [queryName],
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore TODO: fix this
//     queryFn: async () => await api[queryName](...params)
//   });

//   return query;
// };

// export const useApiMutation = <QueryName extends keyof typeof api>(
//   queryName: QueryName,
//   params?: Parameters<(typeof api)[QueryName]>[0]
// ) => {
//   const mutation = useMutation({
//     mutationKey: [queryName],
//     mutationFn: async () => await api[queryName](...params)
//   });
// };

// export const useApiLazy = <QueryName extends keyof typeof api>(
//   queryName: QueryName,
//   params?: Parameters<(typeof api)[QueryName]>[0]
// ) => {
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore TODO: fix this
//   const [refetch, query] = useLazyQuery([queryName], async () => await api[queryName](...params));
//   return [refetch, query];
// };

export default api;
