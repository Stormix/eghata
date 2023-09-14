import { createContext, useContext, useState } from 'react';

type AppProviderProps = {
  children: React.ReactNode;
};

type AppProviderState = {
  showBackButton?: boolean;
  setShowBackButton?: (show: boolean) => void;
};

const initialState: AppProviderState = {
  showBackButton: false,
  setShowBackButton: () => {}
};

const AppProviderContext = createContext<AppProviderState>(initialState);

export default function AppProvider({ children }: AppProviderProps) {
  const [showBackButton, setShowBackButton] = useState(false);
  const value = {
    showBackButton,
    setShowBackButton
  };

  return <AppProviderContext.Provider value={value}>{children}</AppProviderContext.Provider>;
}

export const useApp = () => {
  const context = useContext(AppProviderContext);

  if (context === undefined) throw new Error('useApp must be used within a AppProvider');

  return context;
};
