import i18n from '@/lib/i18n';
import ThemeProvider from '@/providers/theme-provider';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import AppProvider from './app-provider';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AppProvider>
        <I18nextProvider i18n={i18n} defaultNS={'common'}>
          <ThemeProvider defaultTheme="light" storageKey="theme">
            {children}
          </ThemeProvider>
        </I18nextProvider>
      </AppProvider>
    </>
  );
};

export default Providers;
