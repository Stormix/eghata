import { cn } from '@/lib/utils';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Input } from './input';
import { useTranslation } from 'react-i18next';

const SearchInput = ({ className }: { className?: string }) => {
  const { t, i18n } = useTranslation();
  const ar = i18n.language === 'ar-ma';

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className={cn('relative w-full my-2')}>
        <Input
          type="text"
          placeholder={t('Search')}
          className={cn(' focus:outline-none focus:bg-white ', {
            'pr-2': ar,
            'pr-8': !ar
          })}
        />
        <MagnifyingGlassIcon
          className={cn('absolute w-6 h-6 -translate-y-1/2 top-1/2 ', {
            'left-2': ar,
            'right-2': !ar
          })}
        />
      </div>
    </div>
  );
};

export default SearchInput;
