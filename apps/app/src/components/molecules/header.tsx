import { cn } from '@/lib/utils';
import { useApp } from '@/providers/app-provider';
import BackButton from '../atoms/back-button';
import Language from '../atoms/language';
import { useTheme } from '@/providers/theme-provider';

const Header = () => {
  const { showBackButton } = useApp();
  const { theme } = useTheme();

  return (
    <header className="flex justify-between h-10 m-6">
      <BackButton
        className={cn({
          'opacity-0': !showBackButton
        })}
      />
      <img src={theme === 'dark' ? '/logo-light.svg' : 'logo.svg'} alt="logo" className="object-cover h-full" />
      <Language />
    </header>
  );
};

export default Header;
