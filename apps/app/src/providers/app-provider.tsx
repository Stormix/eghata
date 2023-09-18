import useFingerprint from '@/hooks/useFingerprint';
import api from '@/lib/api';
import { useStore } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type AppProviderProps = {
  children: React.ReactNode;
};

type AppProviderState = {
  showBackButton: boolean;
  authenticated?: boolean;
};

const initialState: AppProviderState = {
  showBackButton: false,
  authenticated: false
};

const AppProviderContext = createContext<AppProviderState>(initialState);

export default function AppProvider({ children }: AppProviderProps) {
  const location = useLocation();
  const [showBackButton, setShowBackButton] = useState(location.pathname !== '/');
  const { fingerprint } = useFingerprint();
  const { token, setToken } = useStore();

  const { isLoading } = useQuery({
    queryKey: ['authenticate'],
    queryFn: () => api.authenticate(fingerprint),
    onSuccess: (data) => {
      const token = data?.token.token;
      if (token) setToken(token);
    },
    enabled: !token
  });

  const value = {
    showBackButton,
    authenticated: !!token
  };

  useEffect(() => {
    setShowBackButton(location.pathname !== '/');
  }, [location]);

  if (isLoading) <div>Loading...</div>;
  return <AppProviderContext.Provider value={value}>{children}</AppProviderContext.Provider>;
}

export const useApp = () => {
  const context = useContext(AppProviderContext);
  if (context === undefined) throw new Error('useApp must be used within a AppProvider');

  return context;
};
