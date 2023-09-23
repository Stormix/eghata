import { cn } from '@/lib/utils';
import { useApp } from '@/providers/app-provider';
import { useTheme } from '@/providers/theme-provider';
import BackButton from '../atoms/back-button';
import Language from '../atoms/language';

const Header = () => {
  const { showBackButton } = useApp();
  const { theme } = useTheme();

  return (
    <header className="flex justify-between w-full p-6 rtl:flex-row-reverse">
      <BackButton
        className={cn({
          'opacity-0': !showBackButton
        })}
      />
      <img src={theme === 'dark' ? '/logo-light.svg' : 'logo.svg'} alt="logo" className="object-cover h-10" />
      <Language />
    </header>
  );
};

export default Header;
