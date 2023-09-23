import Providers from '@/providers';
import ThemeProvider, { useTheme } from '@/providers/theme-provider';
import { Suspense } from 'react';
import { isBrowser } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import LoadingSpinner from '../atoms/loading-spinner';
import Header from '../molecules/header';
import Navbar from '../molecules/navbar';

const Logo = () => {
  const { theme, systemTheme } = useTheme();

  if (theme === 'system') {
    return (
      <img src={systemTheme === 'dark' ? '/logo-light.svg' : 'logo.svg'} alt="logo" className="h-32 mx-auto my-8" />
    );
  }

  return <img src={theme === 'dark' ? '/logo-light.svg' : 'logo.svg'} alt="logo" className="h-32 mx-auto my-8" />;
};

const Layout = () => {
  const { i18n } = useTranslation();

  const hideHeaderRoutes = ['/map', '/detail'];
  const hideNavbarRoutes = ['/detail', '/help-request', '/help-offer', '/transport-offer', '/transport-request'];
  const location = useLocation();

  document.body.dir = i18n.dir();

  if (isBrowser) {
    return (
      <ThemeProvider>
        <div className="flex w-screen h-screen bg-background">
          <div className="flex m-auto flex-col">
            <Logo />
            <h1 className="text-center text-primary	">Coming Soon...</h1>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Providers>
        <div className="">
          {!hideHeaderRoutes.some((route) => location.pathname.includes(route)) && <Header />}
          <main className="flex flex-col flex-grow overflow-y-auto w-full">
            <Outlet />
            {!hideNavbarRoutes.some((route) => location.pathname.includes(route)) && <Navbar />}
          </main>
        </div>
      </Providers>
    </Suspense>
  );
};

export default Layout;
