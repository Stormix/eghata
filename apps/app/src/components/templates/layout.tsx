import Providers from '@/providers';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import Header from '../molecules/header';
import Navbar from '../molecules/navbar';

const Layout = () => {
  const { i18n } = useTranslation();

  document.body.dir = i18n.dir();

  return (
    <Providers>
      <Header />
      <main className="flex flex-col w-screen h-screen overflow-hidden px-4">
        <Outlet />
        <Navbar />
      </main>
    </Providers>
  );
};

export default Layout;
