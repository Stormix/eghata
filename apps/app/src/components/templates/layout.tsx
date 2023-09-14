import Providers from '@/providers';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Header from '../molecules/header';
import Navbar from '../molecules/navbar';

const Layout = () => {
  const { i18n } = useTranslation();

  document.body.dir = i18n.dir();
  console.log(isMobile);
  if (isMobile) {
    return (
      <Providers>
        <Header />
        <main className="flex flex-col w-screen h-screen overflow-hidden px-4">
          <Outlet />
          <Navbar />
        </main>
      </Providers>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen gap-4 bg-sky-900">
        <img src="/logo.png" alt="logo" className="object-contain h-24" />
        <span className="text-2xl">Coming soon</span>
      </div>
    );
  }
};

export default Layout;
