import { ReactComponent as CarIcon } from '@/assets/icons/car.svg';
import { ReactComponent as HandIcon } from '@/assets/icons/hand.svg';
import { ReactComponent as HomeIcon } from '@/assets/icons/home.svg';
import { ReactComponent as MapIcon } from '@/assets/icons/map.svg';
import { ReactComponent as NavCenter } from '@/assets/nav-center.svg';
import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import ActionButton from '../atoms/action-button';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  asSubmit?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const Navbar = ({ asSubmit, loading, disabled }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { i18n } = useTranslation();
  const ar = i18n.language === 'ar-ma';

  const iconClasses = (path: string) => [
    'w-9 h-9 curesor-pointer transition duration-300 ease-in-out hover:text-red-500',
    {
      'text-red-500': location.pathname === path
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 z-10 flex justify-center w-full">
      <ActionButton
        className="absolute z-30 mb-4 -translate-x-1/2 bottom-1/2 left-1/2"
        asSubmit={asSubmit}
        disabled={disabled}
        loading={loading}
      />
      <div className="z-20 flex flex-row justify-center w-full px-6 py-4 mb-3 gap-28 ">
        <div className="flex gap-9">
          <HomeIcon onClick={() => navigate('/')} className={cn(...iconClasses('/'))} />
          <CarIcon onClick={() => navigate('/carpooling')} className={cn(...iconClasses('/carpooling'))} />
        </div>
        <div className="flex gap-9">
          <HandIcon onClick={() => navigate('/help')} className={cn(...iconClasses('/help'))} />
          <MapIcon onClick={() => navigate('/map')} className={cn(...iconClasses('/map'))} />
        </div>
      </div>
      {/* nav bar dynamic background */}
      <div
        className={cn('absolute bottom-0 flex items-end left-0 z-10 w-full h-[94px]', {
          'flex-row-reverse': ar,
          'flex-row': !ar
        })}
      >
        <div className=" h-full flex-1 navbar-shadow bg-white  rounded-l-[40px]"></div>
        <NavCenter className="z-11" />
        <div className=" h-full flex-1  navbar-shadow bg-white  rounded-r-[40px]"></div>
      </div>
    </div>
  );
};

export default Navbar;
