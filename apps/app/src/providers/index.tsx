import i18n from '@/lib/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import AppProvider from './app-provider';
import ThemeProvider from './theme-provider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n} defaultNS={'common'}>
          <ThemeProvider defaultTheme="light" storageKey="theme">
            <AppProvider>{children}</AppProvider>
          </ThemeProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;
