import { ReactComponent as CarIcon } from '@/assets/icons/car.svg';
import { ReactComponent as HandIcon } from '@/assets/icons/hand.svg';
import { ReactComponent as HomeIcon } from '@/assets/icons/home.svg';
import { ReactComponent as MapIcon } from '@/assets/icons/map.svg';
import { ReactComponent as NavBackground } from '@/assets/nav.svg';
import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import ActionButton from '../atoms/action-button';

interface NavbarProps {
  asSubmit?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const Navbar = ({ asSubmit, loading, disabled }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const iconClasses = (path: string) => [
    'w-9 h-9 curesor-pointer transition duration-300 ease-in-out hover:text-red-500',
    {
      'text-red-500': location.pathname === path
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-center z-10">
      <ActionButton
        className="absolute bottom-1/2 mb-4 left-1/2 -translate-x-1/2 z-30"
        asSubmit={asSubmit}
        disabled={disabled}
        loading={loading}
      />
      <div className="z-20 w-full flex flex-row gap-16 py-4 justify-between px-6 mb-3">
        <div className="flex gap-9">
          <HomeIcon onClick={() => navigate('/')} className={cn(...iconClasses('/'))} />
          <CarIcon onClick={() => navigate('/carpooling')} className={cn(...iconClasses('/carpooling'))} />
        </div>
        <div className="flex gap-9">
          <HandIcon onClick={() => navigate('/help')} className={cn(...iconClasses('/help'))} />
          <MapIcon onClick={() => navigate('/map')} className={cn(...iconClasses('/map'))} />
        </div>
      </div>

      <NavBackground className="absolute bottom-0 left-0 w-full z-10" />
    </div>
  );
};

export default Navbar;
