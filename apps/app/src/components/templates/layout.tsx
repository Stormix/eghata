import Providers from '@/providers';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../molecules/header';
import Navbar from '../molecules/navbar';

const Layout = () => {
  const { i18n } = useTranslation();

  document.body.dir = i18n.dir();

  const hideHeaderRoutes = ['/map'];

  const location = useLocation();
  return (
    <Providers>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <main className="flex flex-col w-screen h-screen overflow-hidden">
        <Outlet />
        <Navbar />
      </main>
    </Providers>
  );
};

export default Layout;
