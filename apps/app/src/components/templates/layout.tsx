import Providers from '@/providers';
import { isBrowser } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../molecules/header';
import Navbar from '../molecules/navbar';

const Layout = () => {
  const { i18n } = useTranslation();

  const hideHeaderRoutes = ['/map', '/detail'];
  const hideNavbarRoutes = ['/detail', '/help-request', '/help-offer', '/transport-offer', '/transport-request'];
  const location = useLocation();

  document.body.dir = i18n.dir();

  return (
    <div>
      {isBrowser ? (
        <div className="flex w-screen h-screen bg-current">
          <div className="flex m-auto flex-col">
            <img src="/logo-light.png" alt="logo" className="h-32 mx-auto my-8" />
            <h1 className="text-center text-white">Coming Soon...</h1>
          </div>
        </div>
      ) : (
        <div>
          <Providers>
            {!hideHeaderRoutes.some((route) => location.pathname.includes(route)) && <Header />}
            <main className="flex flex-col w-screen overflow-auto h-[calc(100vh-200px)]">
              <Outlet />
              {!hideNavbarRoutes.some((route) => location.pathname.includes(route)) && <Navbar />}
            </main>
          </Providers>
        </div>
      )}
    </div>
  );
};

export default Layout;
