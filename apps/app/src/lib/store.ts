import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { STORAGE_KEY } from './config';

export interface State {
  token: string;
  setToken: (token: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      token: '',
      setToken: (token: string) => set({ token })
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
