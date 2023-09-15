import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type AppProviderProps = {
  children: React.ReactNode;
};

type AppProviderState = {
  showBackButton: boolean;
};

const initialState: AppProviderState = {
  showBackButton: false
};

const AppProviderContext = createContext<AppProviderState>(initialState);

export default function AppProvider({ children }: AppProviderProps) {
  const location = useLocation();
  const [showBackButton, setShowBackButton] = useState(location.pathname !== '/');

  const value = {
    showBackButton
  };

  useEffect(() => {
    setShowBackButton(location.pathname !== '/');
  }, [location]);

  return <AppProviderContext.Provider value={value}>{children}</AppProviderContext.Provider>;
}

export const useApp = () => {
  const context = useContext(AppProviderContext);

  if (context === undefined) throw new Error('useApp must be used within a AppProvider');

  return context;
};
