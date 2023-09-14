import { cn } from '@/lib/utils';
import { useApp } from '@/providers/app-provider';
import BackButton from '../atoms/back-button';
import Language from '../atoms/language';

const Header = () => {
  const { showBackButton } = useApp();
  return (
    <header className="flex justify-between h-10 m-6">
      <BackButton
        className={cn({
          'opacity-0': !showBackButton
        })}
      />
      <img src="/logo.png" alt="logo" className="object-cover h-full" />
      <Language />
    </header>
  );
};

export default Header;
