import Providers from '@/providers';
import { isBrowser } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../molecules/header';
import Navbar from '../molecules/navbar';
import { useTheme } from '@/providers/theme-provider';


const Logo = () => {
  const {theme} = useTheme();
  
  return (
    <img src={theme === 'dark' ? '/logo-light.svg' : 'logo.svg'} alt="logo" className="h-32 mx-auto my-8" />
  )
}

const Layout = () => {
  const { i18n } = useTranslation();

  const hideHeaderRoutes = ['/map', '/detail'];
  const hideNavbarRoutes = ['/detail', '/help-request', '/help-offer', '/transport-offer', '/transport-request'];
  const location = useLocation();

  document.body.dir = i18n.dir();

  return (
   
          <Providers>
      {isBrowser ? (
        <div className="flex w-screen h-screen bg-current">
          <div className="flex m-auto flex-col">
          <img src="/logo-light.svg" alt="logo" className="h-32 mx-auto my-8" />
            <Logo />
            <h1 className="text-center text-white	">Coming Soon...</h1>
          </div>
        </div>
      ) : (
    
          <Providers>
            {!hideHeaderRoutes.some((route) => location.pathname.includes(route)) && <Header />}
            <main className="flex flex-col w-screen overflow-auto h-[calc(100vh-100px)]">
              <Outlet />
              {!hideNavbarRoutes.some((route) => location.pathname.includes(route)) && <Navbar />}
            </main>
        <div className="h-32"></div> 
         
      )}
   </Providers>
  );
};

export default Layout;
